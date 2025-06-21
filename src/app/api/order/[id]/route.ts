import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/orderModel";
import { connectDB } from "@/dbConfig/dbConfig";
import Group from "@/models/groupModel";
import User from "@/models/userModel";
import mongoose from "mongoose";
import Product from "@/models/productModel";


//get a single order details
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const order = await Order.findById(id)
      .populate("user", "userName mobile")
      .populate("products._id");

    if (!order) {
      return NextResponse.json(
        { error: "Order not found", status: 404 },
        { status: 404 }
      );
    }
    return NextResponse.json({ order, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}

//update the details of the product
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const update = await req.json();
    const theorder = await Order.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!theorder) {
      return NextResponse.json(
        { error: "Order not found", status: 404 },
        { status: 404 }
      );
    }
    const order = await Order.findById(id)
      .populate("user", "userName mobile")
      .populate("products._id");

    return NextResponse.json({ order, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await connectDB();
//     await Order.findByIdAndDelete(params.id);
//     return NextResponse.json({ message: 'Order deleted', status: 200 }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
//   }
// }
