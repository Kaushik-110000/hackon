"use client";
import { useContext, useEffect, useState } from "react";
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
import Footer from "@/components/Footer";

interface EcoProduct {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  greenScore: number;
  carbonFootprint: number;
  isEcoFriendly: boolean;
  ecoBadges: string[];
  images: string[];
  description?: string;
  carbonSaved?: string;
  greenCoins: number;
}

export default function Home() {
  const [ecoProducts, setEcoProducts] = useState<EcoProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

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

  // Check for group ID in URL and save to session storage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = urlParams.get('grp_id');
    
    if (groupId) {
      // Save group ID to session storage for checkout auto-fill
      sessionStorage.setItem('pendingGroupId', groupId);
      console.log('Group ID detected and saved to session storage:', groupId);
      
      // Optionally show a notification to the user
      // You can add a toast notification here if needed
    }
  }, []);

  // Fetch eco-friendly products from API
  useEffect(() => {
    const fetchEcoProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching eco products for page:', currentPage);
        const response = await fetch(`/api/products/eco?page=${currentPage}&limit=4`);
        const data = await response.json();
        
        console.log('API response:', data);
        
        if (data.status === 200) {
          setEcoProducts(data.products);
          setHasMore(data.hasMore);
          setTotalPages(data.totalPages);
          console.log('Updated pagination state:', { 
            hasMore: data.hasMore, 
            totalPages: data.totalPages, 
            currentPage 
          });
        } else {
          console.error('Failed to fetch eco products:', data.error);
          // Don't reset pagination state on error
        }
      } catch (error) {
        console.error('Error fetching eco products:', error);
        // Don't reset pagination state on error
      } finally {
        setLoading(false);
      }
    };

    fetchEcoProducts();
  }, [currentPage]);

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {ecoProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-200">
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
                      {product.ecoBadges.slice(0, 2).map((badge) => (
                        <EcoBadge key={badge} type={badge as any} showLabel={false} />
                      ))}
                    </div>

                    {/* Carbon Savings - Subtle */}
                    <div className="text-xs text-green-600 mb-2 font-medium">
                      {product.carbonSaved || `Saves ${product.carbonFootprint}kg CO₂`}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                        <span className="text-xs text-gray-500 line-through ml-1">₹{product.originalPrice}</span>
                      </div>
                      <div className="text-xs text-green-600">
                        +{Math.round(product.greenCoins)} coins
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

            {/* Pagination Controls */}
            {(totalPages > 1 || hasMore) && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages || '?'}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages || prev + 1, prev + 1))}
                  disabled={!hasMore && currentPage >= (totalPages || 1)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
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
            <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750616386/Artboard_1__3_-removebg-preview_dzybpe.png" alt="Earbuds" className="w-32 h-32 object-contain -mb-8" />
            <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750616441/715jcYvT9pL_fv0xvf.jpg" alt="Headphones" className="w-28 h-28 object-contain -mb-4 ml-[-30px]" />
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
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750614988/images_uoimjo.jpg" alt="Air conditioners" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Air conditioners</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615043/shopping_r5lxct.webp" alt="Refrigerators" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Refrigerators</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615120/MC28A5025VS4_kcr65h.jpg" alt="Microwaves" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Microwaves</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615169/21433238_WG34A20PIN_PGA4_def_akaqlt.webp" alt="Washing machines" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Washing machines</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-auto hover:underline">See more</a>
          </div>
          <div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold mb-3">Revamp your home in style</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615301/71qxW9Ty1-L_ndzpq2.jpg" alt="Cushion covers, bedsheets" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Cushion covers, bedsheets & more</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615360/n2zzc_512_tagyji.jpg" alt="Figurines, vases" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Figurines, vases & more</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615402/images_trje1y.jpg" alt="Home storage" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Home storage</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615454/images_f7tvcg.jpg" alt="Lighting solutions" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Lighting solutions</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-auto hover:underline">Explore all</a>
          </div>
          <div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold mb-3">PlayStation 5 Slim & Accessories | No Cost EMI*</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615500/51afJC92cgL_zizxxp.jpg" alt="PS5 Slim digital edition" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 Slim digital edition</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615538/sony_20psd5_1_gz0pgg.jpg" alt="PS5 Slim disc edition" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 Slim disc edition</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615595/images_aynhxp.jpg" alt="PS5 Slim Fortnite digital edition" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 Slim Fortnite digital edition</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615666/images_cq6xmj.jpg" alt="PS5 DualSense Wireless Controller" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 DualSense Wireless Controller</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-auto hover:underline">See all deals</a>
          </div>
            {updatedState?.userData?._id ?  <div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold mb-3">Appliances for your home | Up to 55% offPlayStation 5 Slim & Accessories | No Cost EMI*</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750614988/images_uoimjo.jpg" alt="Air conditioners" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Air conditioners</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615043/shopping_r5lxct.webp" alt="Refrigerators" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Refrigerators</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615120/MC28A5025VS4_kcr65h.jpg" alt="Microwaves" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Microwaves</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://res.cloudinary.com/dj24ptooq/image/upload/v1750615169/21433238_WG34A20PIN_PGA4_def_akaqlt.webp" alt="Washing machines" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Washing machines</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-auto hover:underline">See all deals</a>
          </div>:<div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px] justify-center items-center">
            <h2 className="text-lg font-bold mb-3 text-left w-full">Sign in for your best experience</h2>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded w-full mt-2 mb-4">Sign in securely</button>
          </div>}
        </div>
      </section>
                <Footer />

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
