"use client";

import React, { useState, useEffect } from "react";
// import Nav from "../../components/Nav";
import Nav from "../../components/EcoNav";

import GreenScore from "../../components/GreenScore";
import EcoBadge from "../../components/EcoBadge";
import GreenCoin from "../../components/GreenCoin";
import axios from "axios";
import Link from "next/link";
import { useCartCountStore } from "@/context/cartCountStore";
import type { FC } from "react";
import ChatBotWidget from "../../components/ChatBotWidget";


interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  greenScore: number;
  carbonFootprint: number | { total: number };
  isEcoFriendly: boolean;
  ecoBadges: (
    | "recycled"
    | "biodegradable"
    | "organic"
    | "energy-efficient"
    | "carbon-neutral"
    | "sustainable-packaging"
    | "fair-trade"
    | "recyclable"
  )[];
  images: string[];
  description: string;
  savings: string;
}

export default function GreenStore() {
  const [ecoProducts, setEcoProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const increment = useCartCountStore((state) => state.increment);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/products/eco?page=1&limit=200`);
        setEcoProducts(res.data.products);
        setHasMore(res.data.hasMore);
      } catch (err) {
        // handle error
      }
      setLoading(false);
    }
    getProducts();
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await axios.get(`/api/products/eco?page=${nextPage}&limit=50`);
      setEcoProducts((prev) => [...prev, ...res.data.products]);
      setPage(nextPage);
      setHasMore(res.data.hasMore);
    } catch (err) {
      // handle error
    }
    setLoadingMore(false);
  };

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
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <svg className="animate-spin h-10 w-10 text-green-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span className="text-green-700 font-medium">Loading eco-friendly products...</span>
          </div>
        ) : (
          <>
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
                          cart.push(product);
                          localStorage.setItem("cart", JSON.stringify(cart));
                          increment();
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
            {hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  className="px-6 py-2 bg-green-600 text-white rounded font-medium text-sm hover:bg-green-700 disabled:opacity-50"
                  onClick={loadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading more...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}

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
       {/* EcoBot */}
        <ChatBotWidget />
    </div>
  );
}
