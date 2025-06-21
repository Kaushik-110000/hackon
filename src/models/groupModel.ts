import mongoose, { Document, Schema } from 'mongoose';

// Interface for Group
export interface IGroup extends Document {
    orders: mongoose.Types.ObjectId[];       // list of Order IDs in this group
    shippingAddress: {
        name: string;
        address: string;
        city: string;
        country: string;
        phone: string;
    };
    admin: mongoose.Types.ObjectId;
    collaborators: {
        _id: mongoose.Types.ObjectId[];
        name: string;
    }
    createdAt: Date;
    updatedAt: Date;
}

// Schema for Group
const GroupSchema = new Schema<IGroup>({
    orders: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }
    ],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    collaborators: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            name: { type: String }
        }
    ],
    shippingAddress: {
        name: { type: String },
        address: { type: String },
        city: { type: String },
        country: { type: String },
        phone: { type: String },
    },
}, { timestamps: true });

// Export Group model
const Group = mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);
export default Group;
