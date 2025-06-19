import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/productModel';
import Seller from '@/models/sellerModel';
import { connectDB } from '@/dbConfig/dbConfig';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    // console.log(id)
    const product = await Product.findById(id);
    // console.log(product)
    if (!product) {
      return NextResponse.json({ error: 'Product not found', status: 404 }, { status: 404 });
    }
    return NextResponse.json({ product, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
}
