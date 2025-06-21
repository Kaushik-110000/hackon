import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/productModel';
import { connectDB } from '@/dbConfig/dbConfig';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '200', 10);
    const skip = (page - 1) * limit;
    const [products, totalCount] = await Promise.all([
      Product.find({ isEcoFriendly: true }).skip(skip).limit(limit),
      Product.countDocuments({ isEcoFriendly: true })
    ]);
    const hasMore = skip + products.length < totalCount;
    return NextResponse.json({ products, hasMore, totalCount, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
} 