// File: app/api/products/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connectDB } from "@/dbConfig/dbConfig";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = req.nextUrl;
    const q = searchParams.get("q")?.trim() || "";
    
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
