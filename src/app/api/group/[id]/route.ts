import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import Order from '@/models/orderModel';
import { connectDB } from '@/dbConfig/dbConfig';
import Group from '@/models/groupModel';
import User from '@/models/userModel';


export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();

        // 1) Find group
        const group = await Group.findById(params.id);
        if (!group) {
            return NextResponse.json({ error: 'Group not found', status: 404 }, { status: 404 });
        }

        // 2) Parse orderId
        const { orderId }: { orderId?: string } = await req.json();
        if (!orderId) {
            return NextResponse.json({ error: 'orderId is required', status: 400 }, { status: 400 });
        }

        // 3) Add to group.orders and save

        const oid = new mongoose.Types.ObjectId(orderId);

        await Group.updateMany(
            { _id: { $ne: group._id }, orders: oid },
            { $pull: { orders: oid } }
        );

        // 4) Add to this group's orders and save
        if (!group.orders.includes(oid)) {
            group.orders.push(oid);
            await group.save();
        }
        // 4) Update each order's type to 'normal'
        await Promise.all(
            group.orders.map(async (orderObjectId: mongoose.Types.ObjectId) => {
                await Order.findByIdAndUpdate(orderObjectId, { type: 'group' }, { new: true });
            })
        );

        // 5) Fetch the specific updated order
        const updatedOrder = await Order.findById(orderId);

        // 6) Aggregate members of group: unique users from all orders
        const agg = await Order.aggregate([
            { $match: { _id: { $in: group.orders } } },
            { $group: { _id: null, members: { $addToSet: '$user' } } }
        ]);
        const memberIds: mongoose.Types.ObjectId[] = agg.length > 0 ? agg[0].members : [];

        const membersOfGroup = await User.find(
            { _id: { $in: memberIds } },
            { userName: 1, mobile: 1 }
        );


        return NextResponse.json({ membersOfGroup, updatedOrder, status: 200 }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error', detail: error.message, status: 500 }, { status: 500 });
    }
}
