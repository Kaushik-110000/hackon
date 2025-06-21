"use client";

import { Leaf, Star, Coins, ExternalLink } from "lucide-react";

interface ProductInfo {
  productName: string;
  ecoScore: number;
  greenCoins: number;
  material: string;
  category: string;
  description: string;
  price: string | number;
}

interface ProductCardProps {
  product: ProductInfo;
}

export function ProductCard({ product }: ProductCardProps) {
  const getEcoScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-orange-600 bg-orange-100";
  };

  const getEcoScoreText = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    return "Fair";
  };

  return (
    <div className="bg-white rounded-lg border border-green-100 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
            {product.productName}
          </h4>
          <p className="text-xs text-gray-600 mb-2">{product.category}</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-green-600">
            <span className="text-lg font-bold text-green-600">
              ₹
              {typeof product.price === "string"
                ? product.price.replace(/^\$/, "")
                : product.price}
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {/* Eco Score */}
          <div className="flex items-center space-x-1">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${getEcoScoreColor(
                product.ecoScore
              )}`}
            >
              <Leaf className="w-3 h-3" />
            </div>
            <span className="text-xs font-medium text-gray-700">
              {product.ecoScore}/100
            </span>
          </div>

          {/* Green Coins */}
          <div className="flex items-center space-x-1">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-medium text-gray-700">
              {product.greenCoins}
            </span>
          </div>
        </div>

        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${getEcoScoreColor(
            product.ecoScore
          )}`}
        >
          {getEcoScoreText(product.ecoScore)}
        </div>
      </div>

     
    </div>
  );
}
