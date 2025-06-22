'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Nav from '../../../components/Nav';
import GreenScore from '../../../components/GreenScore';
import EcoBadge from '../../../components/EcoBadge';
import GreenCoin from '../../../components/GreenCoin';

export default function SharedOrderPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [userItems, setUserItems] = useState<any[]>([]);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  // Mock shared order data - in real app this would come from API
  const sharedOrder = {
    orderId: orderId,
    organizer: 'John Doe',
    organizerItems: [
      {
        id: 1,
        name: "Bamboo Water Bottle - 1L Capacity, BPA Free, Sustainable & Eco-Friendly",
        price: 899,
        originalPrice: 1299,
        quantity: 1,
        image: "/assests/mockProducts_images/copper_bottle.webp",
        greenScore: 95,
        carbonFootprint: 0.8,
        isEcoFriendly: true,
        badges: ['recycled', 'biodegradable', 'sustainable-packaging'] as const,
        savings: "Saves 2.1kg CO₂",
        greenCoins: 95
      },
      {
        id: 2,
        name: "Organic Cotton T-Shirt - 100% Natural, Fair Trade Certified",
        price: 599,
        originalPrice: 899,
        quantity: 2,
        image: "/assests/mockProducts_images/hyv.webp",
        greenScore: 88,
        carbonFootprint: 1.2,
        isEcoFriendly: true,
        badges: ['organic', 'sustainable-packaging'] as const,
        savings: "Saves 1.8kg CO₂",
        greenCoins: 88
      }
    ],
    participants: 1,
    maxParticipants: 5,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'New York, NY 10001',
      country: 'United States',
      phone: '+1 (555) 123-4567'
    }
  };

  // Available products to add
  const availableProducts = [
    {
      id: 3,
      name: "Solar Power Bank 10000mAh",
      price: 1499,
      originalPrice: 1999,
      image: "/assests/mockProducts_images/milton_super.webp",
      greenScore: 92,
      carbonFootprint: 0.5,
      isEcoFriendly: true,
      badges: ['energy-efficient', 'carbon-neutral'] as const,
      savings: "Saves 3.2kg CO₂",
      greenCoins: 92
    },
    {
      id: 4,
      name: "Bamboo Toothbrush Set (4 pcs)",
      price: 299,
      originalPrice: 499,
      image: "/assests/mockProducts_images/pigeon.webp",
      greenScore: 96,
      carbonFootprint: 0.3,
      isEcoFriendly: true,
      badges: ['biodegradable', 'sustainable-packaging'] as const,
      savings: "Saves 0.9kg CO₂",
      greenCoins: 96
    },
    {
      id: 5,
      name: "Recycled Paper Notebook Set",
      price: 199,
      originalPrice: 299,
      image: "/assests/mockProducts_images/borosil.jpg",
      greenScore: 85,
      carbonFootprint: 0.4,
      isEcoFriendly: true,
      badges: ['recycled', 'sustainable-packaging'] as const,
      savings: "Saves 1.1kg CO₂",
      greenCoins: 85
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addItemToOrder = (product: any) => {
    setUserItems(prev => [...prev, { ...product, quantity: 1 }]);
    setShowAddItemModal(false);
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setUserItems(prev => prev.filter(item => item.id !== itemId));
    } else {
      setUserItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const organizerSubtotal = sharedOrder.organizerItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const userSubtotal = userItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSubtotal = organizerSubtotal + userSubtotal;
  const totalGreenCoins = [...sharedOrder.organizerItems, ...userItems].reduce((sum, item) => sum + (item.greenCoins * item.quantity), 0);

  if (timeLeft === 0) {
    return (
      <div className="bg-[#E3E6E6] min-h-screen">
        <Nav />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-6xl mb-4">⏰</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order link has expired</h1>
            <p className="text-gray-600 mb-6">This shared order link is no longer valid. Please ask your friend to create a new one.</p>
            <button 
              onClick={() => window.history.back()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#E3E6E6] min-h-screen">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Join shared order</h1>
          <p className="text-sm text-gray-600">Order shared by {sharedOrder.organizer} • Expires in {formatTime(timeLeft)}</p>
        </div>

        {/* Time Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">⏰</span>
            <span className="text-sm font-medium text-yellow-800">Order expires in {formatTime(timeLeft)}</span>
          </div>
          <p className="text-xs text-yellow-700 mt-1">Complete your order before time runs out to join the combined shipping</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Organizer's Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Items from {sharedOrder.organizer}</h2>
              <div className="space-y-4">
                {sharedOrder.organizerItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">{item.name}</h3>
                      <div className="flex items-center gap-2 mb-1">
                        <GreenScore 
                          score={item.greenScore} 
                          carbonFootprint={item.carbonFootprint}
                          isEcoFriendly={item.isEcoFriendly}
                        />
                        <span className="text-xs text-green-600">Climate Pledge Friendly</span>
                      </div>
                      <div className="text-xs text-green-600 mb-1">{item.savings}</div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
                          <span className="text-xs text-gray-500 line-through ml-1">₹{item.originalPrice}</span>
                        </div>
                        <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your items</h2>
                <button 
                  onClick={() => setShowAddItemModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm"
                >
                  Add Items
                </button>
              </div>
              
              {userItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">🛒</div>
                  <p className="text-sm">No items added yet</p>
                  <p className="text-xs">Click "Add Items" to join this order</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">{item.name}</h3>
                        <div className="flex items-center gap-2 mb-1">
                          <GreenScore 
                            score={item.greenScore} 
                            carbonFootprint={item.carbonFootprint}
                            isEcoFriendly={item.isEcoFriendly}
                          />
                          <span className="text-xs text-green-600">Climate Pledge Friendly</span>
                        </div>
                        <div className="text-xs text-green-600 mb-1">{item.savings}</div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
                            <span className="text-xs text-gray-500 line-through ml-1">₹{item.originalPrice}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm"
                            >
                              -
                            </button>
                            <span className="text-sm text-gray-600 w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping address</h2>
              <div className="border border-gray-300 rounded-lg p-4">
                <div>
                  <p className="font-medium text-gray-900">{sharedOrder.shippingAddress.name}</p>
                  <p className="text-sm text-gray-600">{sharedOrder.shippingAddress.address}</p>
                  <p className="text-sm text-gray-600">{sharedOrder.shippingAddress.city}</p>
                  <p className="text-sm text-gray-600">{sharedOrder.shippingAddress.country}</p>
                  <p className="text-sm text-gray-600">Phone: {sharedOrder.shippingAddress.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Order summary</h2>
              
              {/* Environmental Impact */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-green-900 mb-2">🌱 Combined Impact</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Packaging saved:</span>
                    <span className="font-medium text-green-900">60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Shipping emissions:</span>
                    <span className="font-medium text-green-900">-45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Green Coins earned:</span>
                    <span className="font-medium text-green-900">{totalGreenCoins}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Organizer's items:</span>
                  <span className="text-gray-900">₹{organizerSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your items:</span>
                  <span className="text-gray-900">₹{userSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping & handling:</span>
                  <span className="text-gray-900">₹0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated tax:</span>
                  <span className="text-gray-900">₹{(totalSubtotal * 0.18).toFixed(0)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Your total:</span>
                  <span>₹{(userSubtotal + (userSubtotal * 0.18)).toFixed(0)}</span>
                </div>
              </div>

              {/* Join Order Button */}
              <button 
                disabled={userItems.length === 0}
                className={`w-full font-medium py-3 px-4 rounded-lg mt-4 ${
                  userItems.length === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {userItems.length === 0 ? 'Add items to join' : 'Join Order & Pay'}
              </button>

              {/* Info */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700">
                  You'll only pay for your items. Combined shipping reduces costs for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add items to order</h3>
              <button 
                onClick={() => setShowAddItemModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="w-full h-32 bg-gray-100 rounded overflow-hidden mb-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <GreenScore 
                      score={product.greenScore} 
                      carbonFootprint={product.carbonFootprint}
                      isEcoFriendly={product.isEcoFriendly}
                    />
                    <span className="text-xs text-green-600">Climate Pledge Friendly</span>
                  </div>
                  <div className="text-xs text-green-600 mb-2">{product.savings}</div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                      <span className="text-xs text-gray-500 line-through ml-1">₹{product.originalPrice}</span>
                    </div>
                    <span className="text-xs text-green-600">+{product.greenCoins} coins</span>
                  </div>
                  <button
                    onClick={() => addItemToOrder(product)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm"
                  >
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 