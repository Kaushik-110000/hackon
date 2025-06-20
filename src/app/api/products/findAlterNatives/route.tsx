import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connectDB } from "@/dbConfig/dbConfig";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = req.nextUrl;
        const { name = "", description = "" } = await req.json();

        const prompt = `You are currently integated in a shopping site backend and your task is to read the name and description of the product provided and give me one word answer that what is the product. Give me it in smallcase and not add any special symbols. I will later use it in my another filter code to filter products. Here is name - ${name} and description - ${description} of that product`
        const q: string = (await model.generateContent(prompt)).response.text().trim();
        console.log(q);
        const filter = q
            ? {
                $and: [
                    {
                        $or: [
                            { name: { $regex: q, $options: "i" } },
                            { category: { $regex: q, $options: "i" } },
                            { brand: { $regex: q, $options: "i" } },
                            { description: { $regex: q, $options: "i" } },
                        ],
                    },
                    { isEcoFriendly: true },
                ],
            }
            : {};

        const products = await Product.find(filter).lean();

        return NextResponse.json(
            { status: 200, query: q, count: products.length, products },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in searching of product:", error);
        return NextResponse.json(
            { status: 500, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
