// app/api/group/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Group from '@/models/groupModel';
import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // 1) Auth check
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

    // 2) Find user
    const theUser = await User.findOne({ mobile: decoded.mobile });
    if (!theUser) {
      return NextResponse.json(
        { error: 'User not found', status: 404 },
        { status: 404 }
      );
    }

    // 3) Parse body
    const { orderIds, shippingAddress } = await req.json();
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json(
        { error: 'orderIds array is required', status: 400 },
        { status: 400 }
      );
    }
    const { name, address, city, country, phone } = shippingAddress || {};
 
    // 4) Create group
    const newGroup = await Group.create({
      orders: orderIds,
      shippingAddress: { name, address, city, country, phone },
    });

    return NextResponse.json({ newGroup, status: 201 }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error', detail: err.message, status: 500 },
      { status: 500 }
    );
  }
}
