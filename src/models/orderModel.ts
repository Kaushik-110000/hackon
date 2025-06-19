import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderProduct {
  product: mongoose.Types.ObjectId;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  greenScore?: number;
  greenCoins?: number;
  carbonFootprint?: number;
  ecoBadges?: string[];
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: IOrderProduct[];
  type: 'normal' | 'group' | 'shared';
  groupInfo?: {
    organizer: mongoose.Types.ObjectId;
    participants: mongoose.Types.ObjectId[];
    maxParticipants: number;
    expiresAt: Date;
    location?: string;
  };
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  paymentInfo?: {
    method: string;
    status: string;
    transactionId?: string;
  };
  ecoStats?: {
    totalGreenCoins: number;
    totalCarbonSaved: number;
    packagingSavedPercent?: number;
    shippingEmissionsReducedPercent?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderProductSchema = new Schema<IOrderProduct>({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  originalPrice: Number,
  quantity: Number,
  greenScore: Number,
  greenCoins: Number,
  carbonFootprint: Number,
  ecoBadges: [String],
});

const OrderSchema = new Schema<IOrder>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [OrderProductSchema],
  type: { type: String, enum: ['normal', 'group', 'shared'], default: 'normal' },
  groupInfo: {
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    maxParticipants: Number,
    expiresAt: Date,
    location: String,
  },
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    country: String,
    phone: String,
  },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  paymentInfo: {
    method: String,
    status: String,
    transactionId: String,
  },
  ecoStats: {
    totalGreenCoins: Number,
    totalCarbonSaved: Number,
    packagingSavedPercent: Number,
    shippingEmissionsReducedPercent: Number,
  },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
export default Order; 