import { NextRequest, NextResponse } from 'next/server';
import Seller from '@/models/sellerModel';
import { connectDB } from '@/dbConfig/dbConfig';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password, phone, address } = await req.json();
    const existing = await Seller.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Seller already exists', status: 400 }, { status: 400 });
    }
    const seller = await Seller.create({ name, email, password, phone, address });
    const { password: _, ...sellerData } = seller.toObject();
    return NextResponse.json({ seller: sellerData, status: 201 }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
} 