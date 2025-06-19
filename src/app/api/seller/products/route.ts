import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/productModel';
import Seller from '@/models/sellerModel';
import { connectDB } from '@/dbConfig/dbConfig';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const sellerId = searchParams.get('sellerId');
    if (!sellerId) {
      return NextResponse.json({ error: 'sellerId required', status: 400 }, { status: 400 });
    }
    const products = await Product.find({ seller: sellerId });
    return NextResponse.json({ products, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      sellerId, name, category, brand, price, originalPrice, images,
      greenScore, carbonFootprint, isEcoFriendly, ecoBadges, greenCoins
    } = body;
    if (
      !sellerId || !name || !category || !brand ||
      price === undefined || originalPrice === undefined ||
      !images || !Array.isArray(images) || images.length === 0 ||
      greenScore === undefined || carbonFootprint === undefined ||
      isEcoFriendly === undefined || !ecoBadges || !Array.isArray(ecoBadges) || ecoBadges.length === 0 ||
      greenCoins === undefined
    ) {
      return NextResponse.json({ error: 'Missing required fields', status: 400 }, { status: 400 });
    }
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return NextResponse.json({ error: 'Seller not found', status: 404 }, { status: 404 });
    }
    const product = await Product.create({ ...body, seller: sellerId });
    seller.products.push(product._id);
    await seller.save();
    return NextResponse.json({ product, status: 201 }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
} 