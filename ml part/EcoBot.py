from pymongo import MongoClient
import google.generativeai as genai
from typing import List, Dict, Any
import json
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# MongoDB setup
DB_NAME = ''
PRODUCT_COLLECTION = ""

# Configure Gemini API
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('models/gemini-2.0-flash')


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

Only respond with exactly one word: "product" or "general" (no extra text).

Query: "{user_query}"
"""
        try:
            response = model.generate_content(prompt, generation_config={"temperature": 0})
            result = response.text.strip().lower()

            # print(f"[DEBUG] Query classification: '{result}'")  

            # fallback keyword rule
            if result not in ['product', 'general']:
                if any(kw in user_query.lower() for kw in ['why', 'benefit', 'costly', 'important', 'sustainable', 'eco']):
                    return "general"
                return "product"

            return result
        except Exception as e:
            print(f"[ERROR] Classification failed: {e}")
            return 'general'

    def process_query(self, user_query: str) -> Dict[str, Any]:
        try:
            query_type = self.classify_query_type(user_query)

            if query_type == "product":
                all_products = list(self.collection.find({}))
                product_info = [
                    {
                        "productName": p.get("name", ""),
                        "ecoScore": p.get("ecoScore", ""),
                        "co2Impact": p.get("carbonFootprint", {}).get("total", "N/A"),
                        "material": ", ".join([m.get("type", "") for m in p.get("materials", [])]),
                        "category": p.get("category", ""),
                        "description": p.get("description", "No description provided."),
                        "price": p.get("price", ""),
                    } for p in all_products
                ]

                llm_prompt = f"""
You are Bitmit, an expert eco-conscious shopping assistant for a green e-commerce platform 🌍.

Your mission is to help users discover **eco-friendly alternatives** to everyday products by analyzing their query and matching relevant items from the catalog below.

Be smart, precise, and human-friendly. Use insights like ecoScore, material, category, and CO2 impact to explain *why* the product fits the query and is sustainable.

User Query: "{user_query}"

Product Catalog:
{json.dumps(product_info, indent=2)}

Return only an array like:
[
  {{
    "productName": "...",
    "material": "...",
    "ecoScore": ...,
    "co2Impact": "...",
    "price": ...,
    "reason": "Explain why this product is eco-friendly and suitable for the user query in 1–2 lines."
  }}
]

Important:
- Recommend up to 5 relevant products only
- Choose the *most sustainable* alternatives based on query
- If the catalog is empty or no fit, return an empty array []
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
You are Bitmit 🛒 — a warm, friendly, and informative AI assistant for a sustainable e-commerce platform.

The user just asked: "{user_query}"

Please respond in a supportive and natural tone (like a helpful friend) in **3–5 complete sentences**. Use simple, empathetic language.

Your goal is to:
- Encourage eco-friendly choices positively 🌱
- Share helpful, real info (not vague platitudes)
- Gently motivate action, without guilt-tripping
- Include relatable, human-like tone and optional emojis

Avoid:
- Robotic tone
- Bullet points
- Technical jargon

End your reply with a thoughtful or friendly question to keep the conversation going.
Only return the final conversational message.
"""
                general_response = model.generate_content(friendly_prompt).text.strip()

                return {
                    "summary": general_response,
                    "products": []
                }

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
            print("\n🧾 Products:")
            print(json.dumps(output["products"], indent=2))

        suggestions = bot.get_suggestions(user_input)
        if suggestions:
            print("\n💡 Related Questions:")
            for i, s in enumerate(suggestions, 1):
                print(f". {s}")


if __name__ == "__main__":
    main()
