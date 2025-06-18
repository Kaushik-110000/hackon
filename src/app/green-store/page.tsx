import React from 'react';
import Nav from '../../components/Nav';
import GreenScore from '../../components/GreenScore';
import EcoBadge from '../../components/EcoBadge';

export default function GreenStore() {
  // Mock eco-friendly products data
  const ecoProducts = [
    {
      id: 1,
      name: 'Bamboo Water Bottle - 1L',
      price: 899,
      originalPrice: 1299,
      greenScore: 95,
      carbonFootprint: 0.8,
      isEcoFriendly: true,
      badges: ['recycled', 'biodegradable'],
      image: '/public/assests/mockProducts_images/copper_bottle.webp',
      description: 'Made from sustainable bamboo, BPA-free, keeps drinks cold for 24 hours',
      savings: 'Saves 2.1kg CO₂ vs plastic bottles'
    },
    {
      id: 2,
      name: 'Organic Cotton T-Shirt',
      price: 599,
      originalPrice: 899,
      greenScore: 88,
      carbonFootprint: 1.2,
      isEcoFriendly: true,
      badges: ['organic', 'sustainable-packaging'],
      image: '/public/assests/mockProducts_images/hyv.webp',
      description: '100% organic cotton, fair trade certified, chemical-free dyeing',
      savings: 'Saves 1.8kg CO₂ vs conventional cotton'
    },
    {
      id: 3,
      name: 'Solar Power Bank 10000mAh',
      price: 1499,
      originalPrice: 1999,
      greenScore: 92,
      carbonFootprint: 0.5,
      isEcoFriendly: true,
      badges: ['energy-efficient', 'carbon-neutral'],
      image: '/public/assests/mockProducts_images/milton_super.webp',
      description: 'Solar charging capability, made from recycled materials',
      savings: 'Saves 3.2kg CO₂ vs regular power banks'
    },
    {
      id: 4,
      name: 'Bamboo Toothbrush Set (4 pcs)',
      price: 299,
      originalPrice: 499,
      greenScore: 96,
      carbonFootprint: 0.3,
      isEcoFriendly: true,
      badges: ['biodegradable', 'sustainable-packaging'],
      image: '/public/assests/mockProducts_images/pigeon.webp',
      description: '100% biodegradable bamboo handles, BPA-free bristles',
      savings: 'Saves 0.9kg CO₂ vs plastic toothbrushes'
    },
    {
      id: 5,
      name: 'Recycled Paper Notebook Set',
      price: 199,
      originalPrice: 299,
      greenScore: 85,
      carbonFootprint: 0.4,
      isEcoFriendly: true,
      badges: ['recycled', 'sustainable-packaging'],
      image: '/public/assests/mockProducts_images/borosil.jpg',
      description: 'Made from 100% recycled paper, acid-free, sustainable packaging',
      savings: 'Saves 1.1kg CO₂ vs virgin paper'
    },
    {
      id: 6,
      name: 'LED Solar Garden Lights (Pack of 6)',
      price: 799,
      originalPrice: 1199,
      greenScore: 90,
      carbonFootprint: 0.6,
      isEcoFriendly: true,
      badges: ['energy-efficient', 'carbon-neutral'],
      image: '/public/assests/mockProducts_images/zebronics.jpg',
      description: 'Solar-powered LED lights, weather-resistant, automatic dusk-to-dawn',
      savings: 'Saves 2.5kg CO₂ vs traditional garden lights'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🌱 Green Store</h1>
          <p className="text-gray-600">Discover eco-friendly products that help reduce your carbon footprint</p>
        </div>

        {/* Green Store Banner */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Shop Sustainably</h2>
              <p className="text-green-100">Every purchase helps protect our planet. Earn green coins for eco-friendly choices!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">♻️</div>
              <p className="text-sm text-green-100">Eco-Certified Products</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium text-gray-700">Filter by:</span>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">All Products</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-green-100 hover:text-green-700">High Green Score (80+)</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-green-100 hover:text-green-700">Organic</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-green-100 hover:text-green-700">Recycled</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-green-100 hover:text-green-700">Energy Efficient</button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecoProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <GreenScore 
                    score={product.greenScore} 
                    carbonFootprint={product.carbonFootprint}
                    isEcoFriendly={product.isEcoFriendly}
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                
                {/* Eco Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.badges.map((badge) => (
                    <EcoBadge key={badge} type={badge} showLabel={false} />
                  ))}
                </div>

                {/* Carbon Savings */}
                <div className="bg-green-50 p-2 rounded mb-3">
                  <p className="text-xs text-green-700 font-medium">{product.savings}</p>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    +{Math.round(product.greenScore * 0.1)} Green Coins
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded text-sm">
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Group Buying Section */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">👥 Group Buying Opportunities</h2>
          <p className="text-gray-600 mb-4">Join group purchases to reduce shipping emissions and save money!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-700 mb-2">Bamboo Products Bundle</h3>
              <p className="text-sm text-gray-600 mb-2">Join 15 others to get 20% off bamboo products</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Progress: 15/20 people</span>
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Join Group</button>
              </div>
            </div>
            <div className="border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-700 mb-2">Organic Clothing Set</h3>
              <p className="text-sm text-gray-600 mb-2">Join 8 others to get 25% off organic clothing</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Progress: 8/12 people</span>
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Join Group</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Impact */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">🌍 Your Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">45.2kg</div>
              <p className="text-sm text-gray-600">CO₂ Reduced</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">23</div>
              <p className="text-sm text-gray-600">Eco Products Purchased</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">1,250</div>
              <p className="text-sm text-gray-600">Green Coins Earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 