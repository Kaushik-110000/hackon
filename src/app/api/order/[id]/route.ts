import { NextRequest, NextResponse } from 'next/server';
import Order from '@/models/orderModel';
import { connectDB } from '@/dbConfig/dbConfig';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const order = await Order.findById(params.id);
    if (!order) {
      return NextResponse.json({ error: 'Order not found', status: 404 }, { status: 404 });
    }
    return NextResponse.json({ order, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const update = await req.json();
    const order = await Order.findByIdAndUpdate(params.id, update, { new: true });
    if (!order) {
      return NextResponse.json({ error: 'Order not found', status: 404 }, { status: 404 });
    }
    return NextResponse.json({ order, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Order.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Order deleted', status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
  }
} 