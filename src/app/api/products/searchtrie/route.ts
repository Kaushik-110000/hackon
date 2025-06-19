import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connectDB } from "@/dbConfig/dbConfig";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const products = await Product.find().lean();

    const rawTokens = products.flatMap((p) => {
      const nameTokens = String(p.name).split(/\s+/);
      const categoryTokens = String(p.category).split(/\s+/);
      const brandTokens = String(p.brand).split(/\s+/);
      return [...nameTokens, ...categoryTokens, ...brandTokens];
    });

    const tokens = Array.from(new Set(rawTokens.map((t) => t.toLowerCase())));

    return NextResponse.json({ status: 200, tokens }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/products/tokens:", error);
    return NextResponse.json(
      { status: 500, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
