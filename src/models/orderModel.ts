import mongoose, { Document, Schema } from 'mongoose';


export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: {
    _id: mongoose.Types.ObjectId[];
    quantity: number;
  }
  type: 'normal' | 'group';
  
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
  totalCost: number,
  createdAt: Date;
  updatedAt: Date;
}


const OrderSchema = new Schema<IOrder>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
  }],
  
  type: { type: String, enum: ['normal', 'group'], default: 'normal' },
  shippingAddress: {
    name: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    phone: { type: String },
  },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  paymentInfo: {
    method: { type: String },
    status: { type: String },
    transactionId: { type: String },
  },
  ecoStats: {
    totalGreenCoins: { type: Number, default: 0 },
    totalCarbonSaved: { type: Number, default: 0 },
    packagingSavedPercent: { type: Number },
    shippingEmissionsReducedPercent: { type: Number },
  },
  totalCost: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
export default Order; 