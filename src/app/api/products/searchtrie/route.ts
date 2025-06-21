import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connectDB } from "@/dbConfig/dbConfig";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

  
    const result = await Product.aggregate([
      {
        $project: {
          tokens: { $split: [{ $toLower: "$name" }, " "] }
        }
      },
      { $unwind: "$tokens" },
      { $group: { _id: "$tokens" } },
    ]);

    const tokens = result.map((r) => r._id);

    return NextResponse.json({ status: 200, tokens }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/products/tokens:", error);
    return NextResponse.json(
      { status: 500, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
