"use client";

import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import GreenScore from "../../components/GreenScore";
import EcoBadge from "../../components/EcoBadge";
import GreenCoin from "../../components/GreenCoin";
import axios from "axios";
import Link from "next/link";

export default function GreenStore() {
  const ecoProductsBluePrint = [
    {
      _id: 1,
      name: "Bamboo Water Bottle - 1L",
      price: 899,
      originalPrice: 1299,
      greenScore: 95,
      carbonFootprint: {
        total: 0.646,
      },
      isEcoFriendly: true,
      ecoBadges: ["recycled", "biodegradable"] as const,
      images: ["/assests/mockProducts_images/copper_bottle.webp"],
      description:
        "Made from sustainable bamboo, BPA-free, keeps drinks cold for 24 hours",
      savings: "Saves 2.1kg CO₂ vs plastic bottles",
    },
    {
      _id: 2,
      name: "Organic Cotton T-Shirt",
      price: 599,
      originalPrice: 899,
      greenScore: 88,
      carbonFootprint: {
        total: 1.2,
      },
      isEcoFriendly: true,
      ecoBadges: ["organic", "sustainable-packaging"] as const,
      images: ["/assests/mockProducts_images/hyv.webp"],
      description:
        "100% organic cotton, fair trade certified, chemical-free dyeing",
      savings: "Saves 1.8kg CO₂ vs conventional cotton",
    },
    {
      _id: 3,
      name: "Solar Power Bank 10000mAh",
      price: 1499,
      originalPrice: 1999,
      greenScore: 92,
      carbonFootprint: {
        total: 0.5,
      },
      isEcoFriendly: true,
      ecoBadges: ["energy-efficient", "carbon-neutral"] as const,
      images: ["/assests/mockProducts_images/milton_super.webp"],
      description: "Solar charging capability, made from recycled materials",
      savings: "Saves 3.2kg CO₂ vs regular power banks",
    },
    {
      _id: 4,
      name: "Bamboo Toothbrush Set (4 pcs)",
      price: 299,
      originalPrice: 499,
      greenScore: 96,
      carbonFootprint: {
        total: 0.3,
      },
      isEcoFriendly: true,
      ecoBadges: ["biodegradable", "sustainable-packaging"] as const,
      images: ["/assests/mockProducts_images/pigeon.webp"],
      description: "100% biodegradable bamboo handles, BPA-free bristles",
      savings: "Saves 0.9kg CO₂ vs plastic toothbrushes",
    },
    {
      _id: 5,
      name: "Recycled Paper Notebook Set",
      price: 199,
      originalPrice: 299,
      greenScore: 85,
      carbonFootprint: {
        total: 0.4,
      },
      isEcoFriendly: true,
      ecoBadges: ["recycled", "sustainable-packaging"] as const,
      images: ["/assests/mockProducts_images/borosil.jpg"],
      description:
        "Made from 100% recycled paper, acid-free, sustainable packaging",
      savings: "Saves 1.1kg CO₂ vs virgin paper",
    },
    {
      _id: 6,
      name: "LED Solar Garden Lights (Pack of 6)",
      price: 799,
      originalPrice: 1199,
      greenScore: 90,
      carbonFootprint: {
        total: 0.6,
      },
      isEcoFriendly: true,
      ecoBadges: ["energy-efficient", "carbon-neutral"] as const,
      images: ["/assests/mockProducts_images/zebronics.jpg"],
      description:
        "Solar-powered LED lights, weather-resistant, automatic dusk-to-dawn",
      savings: "Saves 2.5kg CO₂ vs traditional garden lights",
    },
  ];

  const [ecoProducts, setecoProducts] = useState(ecoProductsBluePrint);

  useEffect(() => {
    async function getProducts() {
      const res = await axios.get("api/products/eco");
      setecoProducts(res.data.products);
    }
    getProducts();
  }, []);

  return (
    <div className="bg-[#E3E6E6] min-h-screen">
      <Nav />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Climate Pledge Friendly
          </h1>
          <p className="text-sm text-gray-600">
            Discover eco-friendly products that help reduce your carbon
            footprint
          </p>
        </div>

        {/* Green Store Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Shop Sustainably</h2>
              <p className="text-sm text-green-100">
                Every purchase helps protect our planet. Earn green coins for
                eco-friendly choices!
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl mb-1">♻️</div>
              <p className="text-xs text-green-100">Eco-Certified Products</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-medium text-gray-700 text-sm">
              Filter by:
            </span>
            <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded text-xs font-medium">
              All Products
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-green-100 hover:text-green-700">
              High Green Score (80+)
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-green-100 hover:text-green-700">
              Organic
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-green-100 hover:text-green-700">
              Recycled
            </button>
            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-green-100 hover:text-green-700">
              Energy Efficient
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ecoProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-200"
            >
              <Link href={`/product/${product._id}`}>
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <GreenScore
                      score={product.greenScore}
                      carbonFootprint={Number(product.carbonFootprint)}
                      isEcoFriendly={product.isEcoFriendly}
                    />
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </div>
                </div>
              </Link>
              {/* Product Info */}
              <div className="p-3">
                <Link href={`/product/${product._id}`}>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Eco ecoBadges */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.ecoBadges.map((badge) => (
                      <EcoBadge key={badge} type={badge} showLabel={false} />
                    ))}
                  </div>

                  {/* Carbon Savings */}
                  <div className="text-xs text-green-600 mb-2 font-medium">
                    {product.savings}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-bold text-gray-900">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-gray-500 line-through ml-1">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                    <div className="text-xs text-green-600">
                      +{Math.round(product.greenScore * 0.1)} coins
                    </div>
                  </div>
                </Link>

                {/* Action Buttons */}
                <div className="flex gap-1">
                  <button
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-1.5 px-3 rounded text-xs"
                    onClick={() => {
                      const cart = JSON.parse(
                        localStorage.getItem("cart") || "[]"
                      );
                      cart.push(product); // assuming 'product' is in scope (map function)
                      localStorage.setItem("cart", JSON.stringify(cart));
                      alert("Product added to cart! 🛒");
                    }}
                  >
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 rounded text-xs">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Group Buying Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-6">
          <h2 className="text-lg font-semibold mb-3">
            Group buying opportunities
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Join group purchases to reduce shipping emissions and save money
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-green-200 rounded-lg p-3">
              <h3 className="font-medium text-green-700 mb-1 text-sm">
                Bamboo Products Bundle
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                Join 15 others to get 20% off bamboo products
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">15/20 people</span>
                <button className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                  Join Group
                </button>
              </div>
            </div>
            <div className="border border-green-200 rounded-lg p-3">
              <h3 className="font-medium text-green-700 mb-1 text-sm">
                Organic Clothing Set
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                Join 8 others to get 25% off organic clothing
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">8/12 people</span>
                <button className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                  Join Group
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Impact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-6">
          <h2 className="text-lg font-semibold mb-4">
            Your environmental impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">45.2kg</div>
              <p className="text-xs text-gray-600">CO₂ Reduced</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">23</div>
              <p className="text-xs text-gray-600">Eco Products Purchased</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1,250</div>
              <p className="text-xs text-gray-600">Green Coins Earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
