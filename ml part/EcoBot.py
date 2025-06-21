from pymongo import MongoClient
import google.generativeai as genai
from typing import List, Dict, Any
import json
from dotenv import load_dotenv
import os
import re

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# MongoDB setup
DB_NAME = 'test'
PRODUCT_COLLECTION = 'products'

# Configure Gemini API
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('models/gemini-2.0-flash')

def extract_keywords(text: str) -> list:
    stopwords = {"what", "is", "the", "can", "you", "show", "me", "for", "eco", "product", "recommend"}
    words = re.findall(r'\w+', text.lower())
    return [w for w in words if len(w) > 2 and w not in stopwords]

class EcoProductBot:
    def __init__(self):
        self.client = MongoClient(MONGO_URI)
        self.db = self.client[DB_NAME]
        self.collection = self.db[PRODUCT_COLLECTION]
        self.conversation_history = []

    def classify_query_type(self, user_query: str) -> str:
        prompt = f"""
You are a smart assistant for an eco-friendly e-commerce platform.
Classify the following user query as either:
- "product" → if the user is asking about a product (e.g., recommend, buy, alternatives).
- "general" → if the user is asking about environmental topics, benefits, cost justification, sustainability, etc.
Only respond with exactly one word: "product" or "general"
Query: "{user_query}"
"""
        try:
            response = model.generate_content(prompt, generation_config={"temperature": 0})
            result = response.text.strip().lower()
            if result not in ['product', 'general']:
                if any(kw in user_query.lower() for kw in ['why', 'benefit', 'costly', 'important', 'sustainable', 'eco']):
                    return "general"
                return "product"
            return result
        except:
            return 'general'

    def process_query(self, user_query: str) -> Dict[str, Any]:
        try:
            query_type = self.classify_query_type(user_query)
            if query_type == "product":
                keywords = extract_keywords(user_query)
                search_regex = '|'.join([re.escape(word) for word in keywords])
                matched_products = list(self.collection.find({
                    "$or": [
                        {"name": {"$regex": search_regex, "$options": "i"}},
                        {"description": {"$regex": search_regex, "$options": "i"}},
                        {"category": {"$regex": search_regex, "$options": "i"}},
                    ]
                }).limit(100))

                if not matched_products:
                    return {"summary": "I couldn't find any products matching your query.", "products": []}

                sorted_products = sorted(matched_products, key=lambda x: x.get("greenScore", 0), reverse=True)

                product_info = [
                    {
                        "productName": p.get("name", ""),
                        "ecoScore": p.get("greenScore", 0),
                        "greenCoins": p.get("greenCoins", 0),
                        "material": ", ".join([m.get("type", "") for m in p.get("materials", [])]),
                        "category": p.get("category", ""),
                        "description": p.get("description", "No description provided."),
                        "price": p.get("price", "")
                    } for p in sorted_products
                ]

                llm_prompt = f"""
You are Bitmit, an expert eco-conscious shopping assistant 🌿.
User Query: "{user_query}"
Product Catalog:
{json.dumps(product_info[:20], indent=2)}

Return up to 5 most relevant eco-friendly products like:
[
  {{
    "productName": "...",
    "material": "...",
    "ecoScore": ..., 
    "greenCoins": ...,
    "price": ..., 
    
  }}
]
"""
                response = model.generate_content(llm_prompt)
                response_text = response.text.strip()
                try:
                    result_json = json.loads(response_text)
                except json.JSONDecodeError:
                    start = response_text.find('[')
                    end = response_text.rfind(']') + 1
                    result_json = json.loads(response_text[start:end]) if start != -1 and end != -1 else []

                return {
                    "summary": f"Here are some top eco-friendly product suggestions for your query: '{user_query}' 🌿",
                    "products": result_json
                }
            else:
                friendly_prompt = f"""
You are Bitmit 🛒 — a friendly AI assistant for a green e-commerce platform.
User: "{user_query}"
Respond in 3–5 complete sentences using a friendly tone. End with a question.
"""
                general_response = model.generate_content(friendly_prompt).text.strip()
                return {"summary": general_response, "products": []}

        except Exception as e:
            return {"summary": f"Error: {str(e)}", "products": []}

    def get_suggestions(self, user_query: str) -> List[str]:
        suggestion_prompt = f"""
Suggest 3 eco-product related follow-up questions based on:
Current Query: {user_query}
History:
{json.dumps(self.conversation_history[-3:], indent=2)}
Return 3 questions, one per line.
"""
        try:
            response = model.generate_content(suggestion_prompt)
            return response.text.strip().split('\n')[:3]
        except:
            return []

def main():
    bot = EcoProductBot()
    print("🌿 Eco-Friendly Product Chatbot Ready!")

    while True:
        user_input = input("\n👤 Your query: ").strip()
        if user_input.lower() == 'exit':
            break

        bot.conversation_history.append(user_input)
        output = bot.process_query(user_input)

        print(f"\n📣 {output['summary']}")
        if output["products"]:
            print("\n📟 Products:")
            print(json.dumps(output["products"], indent=2))

        suggestions = bot.get_suggestions(user_input)
        if suggestions:
            print("\n💡 Related Questions:")
            for i, s in enumerate(suggestions, 1):
                print(f". {s}")

if __name__ == "__main__":
    main()
