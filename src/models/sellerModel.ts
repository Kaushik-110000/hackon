import mongoose, { Document, Schema } from 'mongoose';

export interface ISeller extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  products: mongoose.Types.ObjectId[];
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const SellerSchema: Schema = new Schema<ISeller>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Seller = mongoose.models.Seller || mongoose.model<ISeller>('Seller', SellerSchema);
export default Seller;
