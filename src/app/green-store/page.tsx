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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  carbonSaved?: string;
  greenCoins: number;
  bestSeller?: boolean;
  sponsored?: boolean;
  colors?: number;
  rating?: number;
  ratingCount?: number;
  deal?: string;
  prime?: boolean;
  delivery?: string;
}

export default function GreenStore() {
  const [ecoProducts, setEcoProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const increment = useCartCountStore((state) => state.increment);

  // Carousel data
  const carouselSlides = [
    {
      id: 1,
      title: "Save the Planet, Save Money",
      subtitle: "Up to 40% off eco-friendly products",
      description: "Join thousands of customers making sustainable choices",
      image: "/assests/greenStore.png",
      bgColor: "from-green-500 to-emerald-600",
      cta: "Shop Now",
      badge: "🌱 Eco-Friendly"
    },
    {
      id: 2,
      title: "Earn Green Coins",
      subtitle: "Get rewarded for sustainable shopping",
      description: "Every eco-friendly purchase earns you green coins",
      image: "/assests/greenStore.avif",
      bgColor: "from-blue-500 to-cyan-600",
      cta: "Learn More",
      badge: "🪙 Green Rewards"
    },
    {
      id: 3,
      title: "Carbon Neutral Shipping",
      subtitle: "Zero carbon footprint delivery",
      description: "All our deliveries are carbon neutral",
      image: "/assests/greenStore.png",
      bgColor: "from-purple-500 to-indigo-600",
      cta: "Explore",
      badge: "♻️ Carbon Neutral"
    },
    {
      id: 4,
      title: "Group Buying Benefits",
      subtitle: "Save more with group purchases",
      description: "Join group buys to reduce packaging and costs",
      image: "/assests/greenStore.avif",
      bgColor: "from-orange-500 to-red-500",
      cta: "Join Groups",
      badge: "👥 Group Buy"
    }
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <CarouselNextArrow />,
    prevArrow: <CarouselPrevArrow />,
  };

  // Carousel arrow components
  function CarouselNextArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all duration-200"
        onClick={onClick}
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  function CarouselPrevArrow(props: any) {
    const { onClick } = props;
    return (
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all duration-200"
        onClick={onClick}
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    );
  }

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        console.log('Fetching eco products for green store...');
        const res = await axios.get(`/api/products/eco?page=1&limit=12`);
        console.log('Green store API response:', res.data);
        
        if (res.data.status === 200 && res.data.products) {
          setEcoProducts(res.data.products);
          setHasMore(res.data.hasMore);
          console.log('Products loaded:', res.data.products.length);
        } else {
          console.error('Invalid API response:', res.data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
      setLoading(false);
    }
    getProducts();
  }, []);

  // Apply filters when products or activeFilter changes
  useEffect(() => {
    if (ecoProducts.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...ecoProducts];

    switch (activeFilter) {
      case 'high-score':
        filtered = ecoProducts.filter(product => product.greenScore >= 80);
        break;
      case 'organic':
        filtered = ecoProducts.filter(product => 
          product.ecoBadges.includes('organic')
        );
        break;
      case 'recycled':
        filtered = ecoProducts.filter(product => 
          product.ecoBadges.includes('recycled') || 
          product.ecoBadges.includes('recyclable')
        );
        break;
      case 'energy-efficient':
        filtered = ecoProducts.filter(product => 
          product.ecoBadges.includes('energy-efficient')
        );
        break;
      case 'all':
      default:
        filtered = ecoProducts;
        break;
    }

    setFilteredProducts(filtered);
    console.log(`Filtered products (${activeFilter}):`, filtered.length);
  }, [ecoProducts, activeFilter]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      console.log('Loading more products, page:', nextPage);
      const res = await axios.get(`/api/products/eco?page=${nextPage}&limit=12`);
      
      if (res.data.status === 200 && res.data.products) {
        const newProducts = [...ecoProducts, ...res.data.products];
        setEcoProducts(newProducts);
        setPage(nextPage);
        setHasMore(res.data.hasMore);
        console.log('More products loaded:', res.data.products.length);
        
        // Reset filter to 'all' when loading more products
        setActiveFilter('all');
      } else {
        console.error('Invalid API response in loadMore:', res.data);
      }
    } catch (err) {
      console.error('Error loading more products:', err);
    }
    setLoadingMore(false);
  };

  return (
    <div className="bg-[#E3E6E6] min-h-screen">
      <Nav />

      {/* Fancy Carousel */}
      <div className="relative mb-6">
        <Slider {...carouselSettings} className="carousel-container">
          {carouselSlides.map((slide) => (
            <div key={slide.id} className="relative">
              <div className={`bg-gradient-to-r ${slide.bgColor} h-64 md:h-80 lg:h-96 relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4">
                  <div className="flex-1 text-white">
                    {/* Badge */}
                    <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                      <span className="text-sm font-medium">{slide.badge}</span>
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                      {slide.title}
                    </h1>
                    
                    {/* Subtitle */}
                    <h2 className="text-xl md:text-2xl font-semibold mb-3 text-white text-opacity-90">
                      {slide.subtitle}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-lg text-white text-opacity-80 mb-6 max-w-2xl">
                      {slide.description}
                    </p>
                    
                    {/* CTA Button */}
                    <button className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                      {slide.cta}
                    </button>
                  </div>
                  
                  {/* Image */}
                  <div className="lg:block flex-1 flex justify-end">
                    <div className="relative">
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        className="w-80 h-80 object-contain opacity-90"
                      />
                      {/* Floating elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

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
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
              }`}
            >
              All Products
            </button>
            <button 
              onClick={() => setActiveFilter('high-score')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeFilter === 'high-score' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
              }`}
            >
              High Green Score (80+)
            </button>
            <button 
              onClick={() => setActiveFilter('organic')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeFilter === 'organic' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
              }`}
            >
              Organic
            </button>
            <button 
              onClick={() => setActiveFilter('recycled')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeFilter === 'recycled' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
              }`}
            >
              Recycled
            </button>
            <button 
              onClick={() => setActiveFilter('energy-efficient')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeFilter === 'energy-efficient' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
              }`}
            >
              Energy Efficient
            </button>
          </div>
          {activeFilter !== 'all' && (
            <div className="mt-3 text-sm text-gray-600">
              Showing {filteredProducts.length} of {ecoProducts.length} products
            </div>
          )}
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
        ) : ecoProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No eco-friendly products found</h3>
            <p className="text-sm text-gray-600 mb-4">
              We're working on adding more sustainable products to our collection.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-green-600 text-white rounded font-medium text-sm hover:bg-green-700"
            >
              Refresh Page
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products match your filter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Try adjusting your filter criteria or browse all products.
            </p>
            <button 
              onClick={() => setActiveFilter('all')} 
              className="px-4 py-2 bg-green-600 text-white rounded font-medium text-sm hover:bg-green-700"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg p-4 flex flex-col h-full relative border-1 border-gray-100"
                >
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-2">
                    {product.bestSeller && (
                      <span className="bg-[#D14900] text-white text-xs px-2 py-0.5 rounded font-semibold">
                        Best seller
                      </span>
                    )}
                    {product.sponsored && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        Sponsored{" "}
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#888"
                            strokeWidth="2"
                          />
                          <text
                            x="12"
                            y="16"
                            textAnchor="middle"
                            fontSize="10"
                            fill="#888"
                          >
                            i
                          </text>
                        </svg>
                      </span>
                    )}
                  </div>

                  {/* Green Score Badge */}
                  <div className="absolute top-2 right-2 z-10">
                    <GreenScore
                      score={product.greenScore}
                      carbonFootprint={typeof product.carbonFootprint === 'number' ? product.carbonFootprint : product.carbonFootprint.total}
                      isEcoFriendly={product.isEcoFriendly}
                    />
                  </div>

                  <Link href={`/product/${product._id}`}>
                    {/* Product Image */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-32 h-32 object-contain cursor-pointer mx-auto mb-2"
                    />

                    {/* Colors */}
                    {product.colors && product.colors > 0 && (
                      <span className="text-xs text-blue-700 mb-1 cursor-pointer hover:underline">
                        +{product.colors} other colors/patterns
                      </span>
                    )}

                    {/* name */}
                    <div className="font-medium text-sm mb-1 line-clamp-2 min-h-[2.5em] text-black">
                      {product.name}
                    </div>

                    {/* Eco Badges */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.ecoBadges.map((badge) => (
                        <EcoBadge key={badge} type={badge} showLabel={false} />
                      ))}
                    </div>

                    {/* Carbon Savings */}
                    <div className="bg-green-50 p-2 rounded mb-2">
                      <p className="text-xs text-green-700 font-medium">
                        {product.carbonSaved || `Saves ${typeof product.carbonFootprint === 'number' ? product.carbonFootprint : product.carbonFootprint.total}kg CO₂`}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-xs mb-1">
                      <span className="text-yellow-500">★</span>
                      <span>{product.rating || 4.2}</span>
                      <span className="text-gray-500">
                        ({product.ratingCount || 100})
                      </span>
                    </div>

                    {/* Bought info */}
                    <div className="text-xs text-gray-500 mb-1">
                      {((product.rating || 4.2) + 2).toFixed(1)}k+ bought in past month
                    </div>

                    {/* Deal */}
                    {product.deal && (
                      <span className="bg-[#CC0C39] text-white text-xs px-2 py-0.5 rounded mb-1 w-fit">
                        {product.deal}
                      </span>
                    )}

                    {/* Price and Green Coins */}
                    <div className="flex items-end justify-between gap-2 mt-1">
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-medium text-gray-900">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          M.R.P: ₹{product.originalPrice}
                        </span>
                        <span className="text-xs text-green-700 font-semibold">
                          ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                        </span>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        +{Math.round(product.greenCoins)} 🪙
                      </div>
                    </div>

                    {/* Prime & Delivery */}
                    <div className="text-xs text-gray-700 mt-1">
                      {product.prime && (
                        <span className="text-blue-600 font-bold mr-1">
                          prime
                        </span>
                      )}
                      FREE delivery{" "}
                      <span className="font-semibold">{product.delivery || "Thu, 19 Jun"}</span>
                    </div>
                  </Link>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    {/* Add to cart */}
                    <button
                      className="flex-1 bg-[#FFCE12] hover:bg-yellow-500 text-black font-semibold py-1 text-sm rounded-full p-2"
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
                      Add to cart
                    </button>

                    {/* Buy Now */}
                    <button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-1 text-sm rounded-full p-2"
                      onClick={() => {
                        // Add to cart first
                        const cart = JSON.parse(
                          localStorage.getItem("cart") || "[]"
                        );
                        cart.push(product);
                        localStorage.setItem("cart", JSON.stringify(cart));
                        increment();
                        // Navigate to checkout
                        window.location.href = "/myCart";
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  className="px-6 py-2 bg-[#FFCE12] hover:bg-yellow-500 text-black font-semibold rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={loadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Loading more...
                    </div>
                  ) : (
                    'Load More'
                  )}
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
    </div>
  );
}
