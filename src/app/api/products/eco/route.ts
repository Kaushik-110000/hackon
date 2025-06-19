import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/productModel';
import { connectDB } from '@/dbConfig/dbConfig';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const products = await Product.find({ isEcoFriendly: true });
    // console.log(products);
    return NextResponse.json({ products, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
} 