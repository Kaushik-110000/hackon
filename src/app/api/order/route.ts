import { NextRequest, NextResponse } from 'next/server';
import Order from '@/models/orderModel';
import { connectDB } from '@/dbConfig/dbConfig';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const orderData = await req.json();
    const order = await Order.create(orderData);
    return NextResponse.json({ order, status: 201 }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId required', status: 400 }, { status: 400 });
    }
    const orders = await Order.find({ user: userId });
    return NextResponse.json({ orders, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
} 