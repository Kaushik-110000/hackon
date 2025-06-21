import { NextRequest, NextResponse } from 'next/server';
import Order from '@/models/orderModel';
import { connectDB } from '@/dbConfig/dbConfig';
import Group from '@/models/groupModel';
import User from '@/models/userModel';
import mongoose from 'mongoose';


interface Member {
  _id: mongoose.Types.ObjectId;
  userName: string;
  mobile: number;
}


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const order = await Order.findById(params.id)
      .populate('user', 'userName mobile')                

    if (!order) {
      return NextResponse.json({ error: 'Order not found', status: 404 }, { status: 404 });
    }

    let membersOfGroup: Member[] = [];

    if (order.type === 'group') {
      const group = await Group.findOne({ orders: order._id });
      if (group) {
        const agg = await Order.aggregate([
          { $match: { _id: { $in: group.orders } } },
          { $group: { _id: null, members: { $addToSet: '$user' } } }
        ]);

        const memberIds: mongoose.Types.ObjectId[] = agg.length > 0 ? agg[0].members : [];

        membersOfGroup = await User.find(
          { _id: { $in: memberIds } },
          { userName: 1, mobile: 1 }
        );
      }
    }

    return NextResponse.json({ order, membersOfGroup, status: 200 }, { status: 200 });
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

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await connectDB();
//     await Order.findByIdAndDelete(params.id);
//     return NextResponse.json({ message: 'Order deleted', status: 200 }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal Server Error', status: 500 }, { status: 500 });
//   }
// } 