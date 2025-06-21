import { NextRequest, NextResponse } from 'next/server';
import Order from '@/models/orderModel';
import { connectDB } from '@/dbConfig/dbConfig';
import User from "@/models/userModel"
import jwt from "jsonwebtoken";

//create a new normal order
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("logtok")?.value;
    if (!token) {
      return NextResponse.json(
        {
          message: "Login token missing, no user",
          data: { userName: "Please login" },
          status: 210,
        },
        { status: 210 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      const resp = NextResponse.json(
        { error: "Login token error", status: 401 },
        { status: 401 }
      );
      resp.cookies.delete("logtok");
      return resp;
    }

    const theuser = await User.findOne({ mobile: decoded.mobile }).select(
      "-OTP -__v -createdAt -updatedAt"
    );


    if (!theuser) {
      return NextResponse.json(
        {
          error: "User not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    const body = await req.json();
    const {
      products,
      type = 'normal',
      shippingAddress,
      paymentInfo,
      ecoStats,
      totalCost
    } = body;

    const orderData: any = { user: theuser._id, products, type, shippingAddress, totalCost };


    if (ecoStats) orderData.ecoStats = ecoStats;

    const newOrder = await Order.create(orderData);

    return NextResponse.json({ newOrder, status: 201 }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error, status: 500 }, { status: 500 });
  }
}


//get all orders of a user
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