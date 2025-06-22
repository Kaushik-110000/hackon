import { MongoClient, Db, Collection } from "mongodb";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

// Load environment variables
const MONGO_URL = process.env.MONGO_URL!;
const GOOGLE_API_KEY = process.env.GEMINI_KEY!;

// Gemini setup
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model: GenerativeModel = genAI.getGenerativeModel({
  model: "models/gemini-2.0-flash",
  generationConfig: { temperature: 0 },
});

const DB_NAME = "test";
const PRODUCT_COLLECTION = "products";

interface Product {
  name?: string;
  greenScore?: number;
  greenCoins?: number;
  materials?: { type: string }[];
  category?: string;
  description?: string;
  price?: string | number;
}

interface ProductInfo {
  _id:mongoose.Types.ObjectId;
  productName: string;
  ecoScore: number;
  greenCoins: number;
  material: string;
  category: string;
  description: string;
  price: string | number;
}

async function classifyQueryType(userQuery: string): Promise<"product" | "general"> {
  const prompt = `
You are a smart assistant for an eco-friendly e-commerce platform.
Classify the following user query as either:
- "product" → if the user is asking about a product (e.g., recommend, buy, alternatives).
- "general" → if the user is asking about environmental topics, benefits, cost justification, sustainability, etc.
Only respond with exactly one word: "product" or "general"
Query: "${userQuery}"
  `;

  try {
    const rawResponse = await model.generateContent(prompt);
    const responseText = rawResponse?.response?.text ? await rawResponse.response.text() : "";
    const result = responseText.trim().toLowerCase();

    if (!["product", "general"].includes(result)) {
      if (
        ["why", "benefit", "costly", "important", "sustainable", "eco"].some((kw) =>
          userQuery.toLowerCase().includes(kw)
        )
      ) {
        return "general";
      }
      return "product";
    }

    return result as "product" | "general";
  } catch {
    return "general";
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {

  try {
    const { userQuery, offset = 0 } = await req.json();

    if (!userQuery) {
      return NextResponse.json({ summary: "Missing query", products: [] }, { status: 400 });
    }

    const client = await MongoClient.connect(MONGO_URL);
    const db: Db = client.db(DB_NAME);
    const collection: Collection<Product> = db.collection(PRODUCT_COLLECTION);

    const queryType = await classifyQueryType(userQuery);

    if (queryType === "product") {
      const regexPrompt = `
You are a smart backend assistant for an eco-friendly e-commerce chatbot.
Given the user query: "${userQuery}"
Your job is to:
1. Identify the core product keywords.
2. Prepare a MongoDB-compatible JSON query using $regex for matching "name", "description", or "category".
3. Return only a JSON object for MongoDB find().
Example output:

{
  "$or": [
    { "name": { "$regex": "stainless steel bottle", "$options": "i" } },
    { "description": { "$regex": "stainless steel bottle", "$options": "i" } },
    { "category": { "$regex": "bottle", "$options": "i" } }
  ]
}
      `;

      let mongoQuery = null;

      try {
        const raw = await model.generateContent(regexPrompt);
        let text = await raw.response.text();

        text = text
          .replace(/```json|```/g, "")
          .replace(/^[^{]*({[\s\S]+})[^}]*$/g, "$1");

        const parsed = JSON.parse(text);
        
        if (parsed && parsed.$or) {
          mongoQuery = parsed;
        } else {
          throw new Error("Invalid format");
        }
      } catch (err) {
        console.warn("⚠️ Fallback: Invalid Gemini regex response. Using basic keyword search.");

        const fallbackRegex = new RegExp(userQuery.split(" ").slice(0, 4).join("|"), "i");

        mongoQuery = {
          $or: [
            { name: fallbackRegex },
            { description: fallbackRegex },
            { category: fallbackRegex }
          ],
        };
      }

      const matched = await collection.find(mongoQuery).skip(offset).limit(5).toArray();

      if (!matched.length) {
        return NextResponse.json({
          summary: "No products matched your query. Try more general terms or browse our top eco-friendly picks!",
          products: [],
        });
      }

      const topProducts: ProductInfo[] = matched.map((p) => ({
        _id:p._id,
        productName: p.name || "",
        ecoScore: p.greenScore || 0,
        greenCoins: p.greenCoins || 0,
        material: (p.materials || []).map((m) => m?.type || "").join(", "),
        category: p.category || "",
        description: p.description || "No description provided.",
        price: p.price || "",
      }));

      return NextResponse.json({
        summary: `Here are some top eco-friendly product suggestions for your query 🌿`,
        products: topProducts,
        feedback: true,
      });
    } else {
      const friendlyPrompt = `
You are Sprout 🛒 — a friendly AI assistant for a green e-commerce platform.
User: "${userQuery}"
Respond in 3–5 complete sentences using a friendly tone. End with a question.
      `;

      const response = await model.generateContent(friendlyPrompt);
      const summary = response?.response?.text
        ? await response.response.text()
        : "Sorry, I couldn't generate a proper reply.";

      return NextResponse.json({
        summary: summary.trim(),
        products: [],
        feedback: true,
      });
    }
  } catch (e: any) {
    console.error("❌ Chatbot Error:", e);
    return NextResponse.json(
      {
        summary: `🌿 I'm here to help! There was a small issue, but I'm ready to assist you with eco-friendly products and green living tips.`,
        products: [],
      },
      { status: 500 }
    );
  }
}
