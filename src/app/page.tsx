"use client";
import { useContext } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCarousel from "../components/ImageCarousel";
import Nav from "../components/Nav";
import GreenScore from "../components/GreenScore";
import EcoBadge from "../components/EcoBadge";
import GreenCoin from "../components/GreenCoin";
import { UserContext } from "@/context/UserContext";
import Link from "next/link"
import { useEffect } from "react";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  // Mock eco-friendly products for the home page
  const ecoProducts = [
    {
      id: 1,
      name: "Bamboo Water Bottle - 1L",
      price: 899,
      originalPrice: 1299,
      greenScore: 95,
      carbonFootprint: 0.8,
      isEcoFriendly: true,
      badges: ['recycled', 'biodegradable'] as const,
      image: "/assests/mockProducts_images/copper_bottle.webp",
      description: "Made from sustainable bamboo, BPA-free",
      savings: "Saves 2.1kg CO₂"
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 599,
      originalPrice: 899,
      greenScore: 88,
      carbonFootprint: 1.2,
      isEcoFriendly: true,
      badges: ['organic', 'sustainable-packaging'] as const,
      image: "/assests/mockProducts_images/hyv.webp",
      description: "100% organic cotton, fair trade certified",
      savings: "Saves 1.8kg CO₂"
    },
    {
      id: 3,
      name: "Solar Power Bank 10000mAh",
      price: 1499,
      originalPrice: 1999,
      greenScore: 92,
      carbonFootprint: 0.5,
      isEcoFriendly: true,
      badges: ['energy-efficient', 'carbon-neutral'] as const,
      image: "/assests/mockProducts_images/milton_super.webp",
      description: "Solar charging capability, recycled materials",
      savings: "Saves 3.2kg CO₂"
    },
    {
      id: 4,
      name: "Bamboo Toothbrush Set (4 pcs)",
      price: 299,
      originalPrice: 499,
      greenScore: 96,
      carbonFootprint: 0.3,
      isEcoFriendly: true,
      badges: ['biodegradable', 'sustainable-packaging'] as const,
      image: "/assests/mockProducts_images/pigeon.webp",
      description: "100% biodegradable bamboo handles",
      savings: "Saves 0.9kg CO₂"
    }
  ];
  const updatedState = useContext(UserContext);

  


  return (
    <div className="bg-[#E3E6E6] bg-cover bg-center bg-no-repeat">
      <Nav/>
      {/* Main Banner */}
      <ImageCarousel />

      {/* Eco-Friendly Products Section - More subtle integration */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Eco-friendly picks</h2>
          <p className="text-sm text-gray-600">Sustainable products with environmental benefits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ecoProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-200">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <GreenScore 
                    score={product.greenScore} 
                    carbonFootprint={product.carbonFootprint}
                    isEcoFriendly={product.isEcoFriendly}
                  />
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 mb-1 text-sm line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                
                {/* Eco Badges - More compact */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.badges.map((badge) => (
                    <EcoBadge key={badge} type={badge} showLabel={false} />
                  ))}
                </div>

                {/* Carbon Savings - Subtle */}
                <div className="text-xs text-green-600 mb-2 font-medium">
                  {product.savings}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-xs text-gray-500 line-through ml-1">₹{product.originalPrice}</span>
                  </div>
                  <div className="text-xs text-green-600">
                    +{Math.round(product.greenScore * 0.1)} coins
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1">
                  <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-1.5 px-3 rounded text-xs">
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-1.5 px-3 rounded text-xs">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Green Store Banner - More Amazon-like */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Climate Pledge Friendly</h2>
              <p className="text-sm text-green-100 mb-3">Products that help reduce your carbon footprint</p>
              <div className="flex items-center gap-4 mb-3">
                <div className="text-center">
                  <div className="text-lg font-bold">45.2kg</div>
                  <div className="text-xs text-green-100">CO₂ Reduced</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">23</div>
                  <div className="text-xs text-green-100">Eco Products</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">1,250</div>
                  <div className="text-xs text-green-100">Green Coins</div>
                </div>
              </div>
                  <Link href="green-store"><button className="bg-white text-green-600 font-medium py-2 px-4 rounded text-sm hover:bg-green-50 transition-colors">
                Shop Climate Pledge Friendly
              </button></Link>
            </div>
            <div className="text-right">
              <div className="text-4xl mb-1">♻️</div>
              <p className="text-xs text-green-100">Eco-Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Group Buying Section - More compact */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Group buying opportunities</h2>
          <p className="text-sm text-gray-600 mb-4">Join group purchases to reduce shipping emissions and save money</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-green-200 rounded-lg p-3">
              <h3 className="font-medium text-green-700 mb-1 text-sm">Bamboo Products Bundle</h3>
              <p className="text-xs text-gray-600 mb-2">Join 15 others to get 20% off bamboo products</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">15/20 people</span>
                <button className="bg-green-600 text-white px-2 py-1 rounded text-xs">Join Group</button>
              </div>
            </div>
            <div className="border border-green-200 rounded-lg p-3">
              <h3 className="font-medium text-green-700 mb-1 text-sm">Organic Clothing Set</h3>
              <p className="text-xs text-gray-600 mb-2">Join 8 others to get 25% off organic clothing</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">8/12 people</span>
                <button className="bg-green-600 text-white px-2 py-1 rounded text-xs">Join Group</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner and Cards Section */}
      <section className="relative w-full min-h-[420px] bg-gradient-to-b from-[#f7d7d0] to-[#f7f7f7] flex flex-col justify-end pb-8 overflow-visible">
        <div className="absolute inset-0 flex flex-row items-start justify-between px-8 pt-8 pointer-events-none">
          <button className="pointer-events-auto bg-white bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center shadow-md mt-32 ml-[-20px] border border-gray-200">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-[#131921] mt-4">Under ₹1,499</h1>
            <p className="text-2xl text-[#131921] font-normal mt-2">Budget friendly headphones</p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-3xl font-serif text-[#d52b1e]">boat</span>
              <span className="text-3xl font-serif text-[#131921] tracking-widest">BOULT</span>
            </div>
          </div>
          <div className="flex items-end h-full pr-8">
            <img src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=180&q=80" alt="Earbuds" className="w-32 h-32 object-contain -mb-8" />
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" alt="Headphones" className="w-28 h-28 object-contain -mb-4 ml-[-30px]" />
          </div>
          <button className="pointer-events-auto bg-white bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center shadow-md mt-32 mr-[-20px] border border-gray-200">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mt-56">
          <div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold mb-3">Appliances for your home | Up to 55% off</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=120&q=80" alt="Air conditioners" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Air conditioners</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=120&q=80" alt="Refrigerators" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Refrigerators</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=120&q=80" alt="Microwaves" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Microwaves</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=120&q=80" alt="Washing machines" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Washing machines</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-auto hover:underline">See more</a>
          </div>
          <div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold mb-3">Revamp your home in style</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1503389152951-9c3d0c6b7a5a?auto=format&fit=crop&w=120&q=80" alt="Cushion covers, bedsheets" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Cushion covers, bedsheets & more</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=120&q=80" alt="Figurines, vases" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Figurines, vases & more</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=120&q=80" alt="Home storage" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Home storage</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=120&q=80" alt="Lighting solutions" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Lighting solutions</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-auto hover:underline">Explore all</a>
          </div>
          <div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold mb-3">PlayStation 5 Slim & Accessories | No Cost EMI*</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1606813909355-684e1bdc1b47?auto=format&fit=crop&w=120&q=80" alt="PS5 Slim digital edition" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 Slim digital edition</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1606813909355-684e1bdc1b47?auto=format&fit=crop&w=120&q=80" alt="PS5 Slim disc edition" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 Slim disc edition</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1606813909355-684e1bdc1b47?auto=format&fit=crop&w=120&q=80" alt="PS5 Slim Fortnite digital edition" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 Slim Fortnite digital edition</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=120&q=80" alt="PS5 DualSense Wireless Controller" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 DualSense Wireless Controller</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-auto hover:underline">See all deals</a>
          </div>
            {updatedState?.userData?._id ?  <div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold mb-3">PlayStation 5 Slim & Accessories | No Cost EMI*</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1606813909355-684e1bdc1b47?auto=format&fit=crop&w=120&q=80" alt="PS5 Slim digital edition" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 Slim digital edition</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1606813909355-684e1bdc1b47?auto=format&fit=crop&w=120&q=80" alt="PS5 Slim disc edition" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 Slim disc edition</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1606813909355-684e1bdc1b47?auto=format&fit=crop&w=120&q=80" alt="PS5 Slim Fortnite digital edition" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 Slim Fortnite digital edition</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=120&q=80" alt="PS5 DualSense Wireless Controller" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 DualSense Wireless Controller</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-auto hover:underline">See all deals</a>
          </div>:<div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px] justify-center items-center">
            <h2 className="text-lg font-bold mb-3 text-left w-full">Sign in for your best experience</h2>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded w-full mt-2 mb-4">Sign in securely</button>
          </div>}
        </div>
      </section>
    </div>
  );
}

// Custom arrow components
function CustomNextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-opacity-100 transition-all duration-200"
      onClick={onClick}
    >
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function CustomPrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-opacity-100 transition-all duration-200"
      onClick={onClick}
    >
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}
