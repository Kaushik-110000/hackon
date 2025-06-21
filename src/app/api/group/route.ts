// app/api/group/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Group from '@/models/groupModel';
import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';
import Order from '@/models/orderModel';

//code for creation of group
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get('logtok')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Login token missing', status: 401 },
        { status: 401 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (e) {
      const resp = NextResponse.json(
        { error: 'Invalid login token', status: 401 },
        { status: 401 }
      );
      resp.cookies.delete('logtok');
      return resp;
    }

    const theUser = await User.findOne({ mobile: decoded.mobile });
    if (!theUser) {
      return NextResponse.json(
        { error: 'User not found', status: 404 },
        { status: 404 }
      );
    }

    const { orderId, shippingAddress } = await req.json();


    const { name, address, city, country, phone } = shippingAddress || {};

    const newGroup = await Group.create({
      orders: [orderId],
      shippingAddress: { name, address, city, country, phone },
      admin: theUser._id,
      collaborators: [{ _id: theUser._id, name: theUser.userName }]
    });

    const order = await Order.findById(orderId);
    order.type = 'group';
    order.groupId = newGroup._id;
    order.save();

    return NextResponse.json({ newGroup, status: 201 }, { status: 201 });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error', detail: err.message, status: 500 },
      { status: 500 }
    );
  }
}
