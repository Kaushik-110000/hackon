import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Seller from "@/models/sellerModel";
import Product from "@/models/productModel";
import CarbonFootprintCalculator from "@/utils/CarbonFootprintCalculator";

function getEcoBadges(features: any): string[] {
  const badges: string[] = [];
  if (features.isRecyclable) badges.push("recyclable");
  if (features.isBiodegradable) badges.push("biodegradable");
  if (features.organicMaterials) badges.push("organic");
  if (features.renewableEnergy) badges.push("energy-efficient");
  if (features.fairTrade) badges.push("fair-trade");
  if (features.locallySourced) badges.push("carbon-neutral");
  if (features.packagingType === "sustainable-packaging") badges.push("sustainable-packaging");
  if (features.packagingType === "recycled") badges.push("recycled");
  return badges;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { sellerId, productData, sustainabilityFeatures, purchaseAmount = 0, ...rest } = body;
    if (!sellerId) {
      return NextResponse.json({ error: "sellerId is required", status: 400 }, { status: 400 });
    }
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return NextResponse.json({ error: "Seller not found", status: 404 }, { status: 404 });
    }
    // Calculate carbon, score, coins
    const calculator = new CarbonFootprintCalculator();
    const carbonFootprint = calculator.calculateProductFootprint(productData);
    const greenScore = calculator.calculategreenScore(carbonFootprint, sustainabilityFeatures || {});
    const greenCoins = calculator.calculateGreenCoinsReward(greenScore, purchaseAmount);
    // Derive ecoBadges
    const ecoBadges = getEcoBadges(sustainabilityFeatures || {});
    // Compose product
    const product = await Product.create({
      ...rest,
      ...productData,
      seller: seller._id,
      greenScore,
      carbonFootprint,
      isEcoFriendly: greenScore >= 70,
      ecoBadges,
      greenCoins,
      sustainabilityFeatures: Object.keys(sustainabilityFeatures || {}).filter(k => !!sustainabilityFeatures[k]),
    });
    // Add product to seller's products
    seller.products.push(product._id);
    await seller.save();
    return NextResponse.json({ product, carbonFootprint, greenScore, greenCoins, status: 201 }, { status: 201 });
  } catch (err: any) {
    console.error("Error in producer POST:", err);
    return NextResponse.json({ error: "Failed to create product", detail: err.message, status: 500 }, { status: 500 });
  }
}