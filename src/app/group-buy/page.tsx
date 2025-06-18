'use client'
import React, { useState } from 'react';
import Nav from '../../components/Nav';
import GreenScore from '../../components/GreenScore';
import EcoBadge from '../../components/EcoBadge';

export default function GroupBuy() {
  const [selectedLocation, setSelectedLocation] = useState('Varanasi');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock group buy data - in real app this would come from API based on location
  const groupOrders = [
    {
      id: 1,
      productName: 'Bamboo Water Bottles (Pack of 4)',
      originalPrice: 1599,
      groupPrice: 1279,
      savings: 20,
      participants: 8,
      maxParticipants: 12,
      expiresIn: '2 days',
      location: 'Varanasi',
      category: 'Kitchen',
      productImage: '/assests/mockProducts_images/copper_bottle.webp',
      greenScore: 95,
      carbonSaved: 'Saves 8.4kg CO₂ vs individual shipping',
      description: 'Join others in your area to get 20% off on eco-friendly bamboo water bottles',
      organizer: 'Priya S.',
      joinDeadline: '2024-01-20',
      estimatedDelivery: '2024-01-25'
    },
    {
      id: 2,
      productName: 'Organic Cotton T-Shirts (Pack of 3)',
      originalPrice: 899,
      groupPrice: 674,
      savings: 25,
      participants: 15,
      maxParticipants: 20,
      expiresIn: '1 day',
      location: 'Varanasi',
      category: 'Fashion',
      productImage: '/assests/mockProducts_images/hyv.webp',
      greenScore: 88,
      carbonSaved: 'Saves 5.4kg CO₂ vs individual shipping',
      description: 'Sustainable organic cotton t-shirts with fair trade certification',
      organizer: 'Rahul M.',
      joinDeadline: '2024-01-19',
      estimatedDelivery: '2024-01-24'
    },
    {
      id: 3,
      productName: 'Solar Garden Lights (Pack of 6)',
      originalPrice: 1199,
      groupPrice: 959,
      savings: 20,
      participants: 6,
      maxParticipants: 10,
      expiresIn: '3 days',
      location: 'Varanasi',
      category: 'Home',
      productImage: '/assests/mockProducts_images/zebronics.jpg',
      greenScore: 90,
      carbonSaved: 'Saves 15kg CO₂ vs individual shipping',
      description: 'Solar-powered LED garden lights for sustainable outdoor lighting',
      organizer: 'Anita K.',
      joinDeadline: '2024-01-22',
      estimatedDelivery: '2024-01-27'
    },
    {
      id: 4,
      productName: 'Recycled Paper Notebooks (Pack of 5)',
      originalPrice: 299,
      groupPrice: 239,
      savings: 20,
      participants: 12,
      maxParticipants: 15,
      expiresIn: '4 hours',
      location: 'Varanasi',
      category: 'Office',
      productImage: '/assests/mockProducts_images/borosil.jpg',
      greenScore: 85,
      carbonSaved: 'Saves 5.5kg CO₂ vs individual shipping',
      description: '100% recycled paper notebooks with sustainable packaging',
      organizer: 'Vikram S.',
      joinDeadline: '2024-01-18',
      estimatedDelivery: '2024-01-23'
    },
    {
      id: 5,
      productName: 'Bamboo Toothbrushes (Pack of 8)',
      originalPrice: 399,
      groupPrice: 319,
      savings: 20,
      participants: 18,
      maxParticipants: 25,
      expiresIn: '5 days',
      location: 'Varanasi',
      category: 'Personal Care',
      productImage: '/assests/mockProducts_images/pigeon.webp',
      greenScore: 96,
      carbonSaved: 'Saves 7.2kg CO₂ vs individual shipping',
      description: 'Biodegradable bamboo toothbrushes with BPA-free bristles',
      organizer: 'Meera P.',
      joinDeadline: '2024-01-23',
      estimatedDelivery: '2024-01-28'
    }
  ];

  const locations = ['Varanasi', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai'];
  const categories = ['All', 'Kitchen', 'Fashion', 'Home', 'Office', 'Personal Care'];

  const filteredOrders = groupOrders.filter(order => 
    (selectedLocation === 'All' || order.location === selectedLocation) &&
    (selectedCategory === 'All' || order.category === selectedCategory)
  );

  const getProgressColor = (participants: number, maxParticipants: number) => {
    const percentage = (participants / maxParticipants) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-[#E3E6E6] min-h-screen">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Group buying</h1>
          <p className="text-sm text-gray-600">Join group orders in your area to reduce packaging and save money</p>
        </div>

        {/* Group Buy Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-1">Reduce packaging together</h2>
              <p className="text-xs text-blue-100">Join group orders to minimize shipping emissions and get better prices</p>
            </div>
            <div className="text-right">
              <div className="text-3xl mb-1">📦</div>
              <p className="text-xs text-blue-100">Eco-friendly shipping</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-700">Location:</span>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-700">Category:</span>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-700">Sort by:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                <option>Expiring soon</option>
                <option>Most participants</option>
                <option>Highest savings</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Group Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              {/* Product Image and Basic Info */}
              <div className="flex p-4">
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg mr-4 flex-shrink-0">
                  <img 
                    src={order.productImage} 
                    alt={order.productName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute -top-1 -right-1">
                    <GreenScore 
                      score={order.greenScore} 
                      carbonFootprint={0}
                      isEcoFriendly={true}
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{order.productName}</h3>
                  <p className="text-xs text-gray-600 mb-2">{order.description}</p>
                  
                  {/* Price and Savings */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">₹{order.groupPrice}</span>
                    <span className="text-xs text-gray-500 line-through">₹{order.originalPrice}</span>
                    <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                      {order.savings}% OFF
                    </span>
                  </div>

                  {/* Carbon Savings */}
                  <div className="text-xs text-green-600 font-medium mb-2">{order.carbonSaved}</div>
                </div>
              </div>

              {/* Progress and Participants */}
              <div className="px-4 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Progress: {order.participants}/{order.maxParticipants} people</span>
                  <span className="text-xs text-gray-500">Expires in {order.expiresIn}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className={`${getProgressColor(order.participants, order.maxParticipants)} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${(order.participants / order.maxParticipants) * 100}%` }}
                  ></div>
                </div>

                {/* Organizer and Details */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-gray-600">
                    Organized by <span className="font-medium">{order.organizer}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Est. delivery: {order.estimatedDelivery}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm">
                  Join Group Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-6">
          <h2 className="text-lg font-semibold mb-3">How group buying works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">Find a group order</h3>
              <p className="text-xs text-gray-600">Browse group orders in your area for products you want</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">Join the group</h3>
              <p className="text-xs text-gray-600">Add your order to the group before the deadline</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">Save together</h3>
              <p className="text-xs text-gray-600">Get better prices and reduce packaging when the group ships</p>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-6">
          <h2 className="text-lg font-semibold mb-3">Environmental impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">67%</div>
              <p className="text-xs text-gray-600">Less packaging waste</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">45%</div>
              <p className="text-xs text-gray-600">Reduced shipping emissions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">₹2,450</div>
              <p className="text-xs text-gray-600">Total savings this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 