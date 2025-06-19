import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  brand: string;
  description?: string;
  price: number;
  originalPrice: number;
  images: string[];
  rating?: number;
  ratingCount?: number;
  stock?: number;
  seller: mongoose.Types.ObjectId;
  greenScore: number;
  carbonFootprint: number | {
    rawMaterials?: number;
    manufacturing?: number;
    transportation?: number;
    packaging?: number;
    disposal?: number;
    total: number;
  };
  isEcoFriendly: boolean;
  ecoBadges: string[];
  greenCoins: number;
  carbonSaved?: string;
  sustainabilityFeatures?: string[];
  materials?: { type: string; weight: number }[];
  packaging?: { type: string; weight: number };
  disposal?: { isRecyclable: boolean; isBiodegradable: boolean };
  manufacturing?: { energyConsumption: number; energyType: string };
  transportation?: { mode: string; distance: number; weight: number }[];
  recycledContent?: number;
  organicMaterials?: boolean;
  renewableEnergy?: boolean;
  fairTrade?: boolean;
  locallySourced?: boolean;
  isReusable?: boolean;
  colors?: string[];
  sizes?: string[];
  deal?: string;
  bestSeller?: boolean;
  sponsored?: boolean;
  prime?: boolean;
  delivery?: string;
}

const ProductSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  images: [{ type: String }],
  rating: { type: Number },
  ratingCount: { type: Number },
  stock: { type: Number, default: 0 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  greenScore: { type: Number, required: true },
  carbonFootprint: { type: Schema.Types.Mixed, required: true },
  isEcoFriendly: { type: Boolean, required: true },
  ecoBadges: [{ type: String }],
  greenCoins: { type: Number, required: true },
  carbonSaved: { type: String },
  sustainabilityFeatures: [{ type: String }],
  materials: [{ type: { type: String }, weight: Number }],
  packaging: { type: { type: String }, weight: Number },
  disposal: { isRecyclable: Boolean, isBiodegradable: Boolean },
  manufacturing: { energyConsumption: Number, energyType: String },
  transportation: [{ mode: String, distance: Number, weight: Number }],
  recycledContent: { type: Number },
  organicMaterials: { type: Boolean },
  renewableEnergy: { type: Boolean },
  fairTrade: { type: Boolean },
  locallySourced: { type: Boolean },
  isReusable: { type: Boolean },
  colors: [{ type: String }],
  sizes: [{ type: String }],
  deal: { type: String },
  bestSeller: { type: Boolean },
  sponsored: { type: Boolean },
  prime: { type: Boolean },
  delivery: { type: String },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default Product;     