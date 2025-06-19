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
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found', status: 404 }, { status: 404 });
    }
    return NextResponse.json({ product, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    const { sellerId, ...updateFields } = body;
    if (!sellerId) {
      return NextResponse.json({ error: 'sellerId required', status: 400 }, { status: 400 });
    }
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found', status: 404 }, { status: 404 });
    }
    if (product.seller.toString() !== sellerId) {
      return NextResponse.json({ error: 'Not allowed', status: 403 }, { status: 403 });
    }
    Object.assign(product, updateFields);
    await product.save();
    return NextResponse.json({ product, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { sellerId } = await req.json();
    if (!sellerId) {
      return NextResponse.json({ error: 'sellerId required', status: 400 }, { status: 400 });
    }
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found', status: 404 }, { status: 404 });
    }
    if (product.seller.toString() !== sellerId) {
      return NextResponse.json({ error: 'Not allowed', status: 403 }, { status: 403 });
    }
    await Product.deleteOne({ _id: params.id });
    await Seller.findByIdAndUpdate(sellerId, { $pull: { products: params.id } });
    return NextResponse.json({ message: 'Product deleted', status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
} 