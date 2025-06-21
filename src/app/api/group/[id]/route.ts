import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/orderModel";
import { connectDB } from "@/dbConfig/dbConfig";
import Group from "@/models/groupModel";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import Product from "@/models/productModel";
//code for joining the group using group ID

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    //search group
    const { id } = await context.params;
    const gid = id;
    const group = await Group.findById(gid);
    if (!group) {
      return NextResponse.json(
        { error: "Group not found", status: 404 },
        { status: 404 }
      );
    }

    //get the user
    const token = req.cookies.get("logtok")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Login token missing", status: 401 },
        { status: 401 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (e) {
      const resp = NextResponse.json(
        { error: "Invalid login token", status: 401 },
        { status: 401 }
      );
      resp.cookies.delete("logtok");
      return resp;
    }

    const theUser = await User.findOne({ mobile: decoded.mobile });
    if (!theUser) {
      return NextResponse.json(
        { error: "User not found", status: 404 },
        { status: 404 }
      );
    }

    const { orderId }: { orderId?: string } = await req.json();
    if (!orderId) {
      return NextResponse.json(
        { error: "orderId is required", status: 400 },
        { status: 400 }
      );
    }

    const oid = new mongoose.Types.ObjectId(orderId);

    //remove that order from all other groups
    await Group.updateMany(
      { _id: { $ne: group._id }, orders: oid },
      { $pull: { orders: oid } }
    );

    //  Add to this group's orders and save
    group.orders.push(oid);
    group.collaborators.push({ _id: theUser._id, name: theUser.userName });

    await group.save();

    // Update the order's type to 'group'
    await Order.findByIdAndUpdate(oid, { type: "group", groupId: group._id });

    return NextResponse.json({ group, status: 200 }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error", detail: error.message, status: 500 },
      { status: 500 }
    );
  }
}

//code for getting a single group - return all details inside group
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const group = await Group.findById(id)
      .populate({
        path: "orders",
        model: Order,
        populate: {
          path: "products._id",
          model: "Product",
        },
      })
      .populate("admin", "userName mobile") // populate admin with desired fields
      .populate("collaborators._id", "userName mobile"); // populate collaborators

    if (!group) {
      return NextResponse.json(
        { error: "Group not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: group }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}

//update the address of the groupp
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const gid = id;
    const update = await req.json();
    const thegroup = await Group.findByIdAndUpdate(gid, update, {
      new: true,
    });

    if (!thegroup) {
      return NextResponse.json(
        { error: "Group not found", status: 404 },
        { status: 404 }
      );
    }

    const group = await Group.findById(gid)
      .populate({
        path: "orders",
        model: Order,
        populate: {
          path: "products._id",
          model: "Product",
        },
      })
      .populate("admin", "userName mobile")
      .populate("collaborators._id", "userName mobile");

    return NextResponse.json({ group, status: 200 }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
