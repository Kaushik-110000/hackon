'use client'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import Nav from '../../components/Nav'
import GreenScore from '../../components/GreenScore'
import EcoBadge from '../../components/EcoBadge'
import GreenCoin from '../../components/GreenCoin'
import { UserContext } from "@/context/UserContext";
import axios from "axios"
import { useRouter } from 'next/navigation'


export default function page() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const updatedState = useContext(UserContext);
  const router = useRouter();
  // Mock cart items with eco-friendly features
  const mockcartItems = [
    {
      _id: 1,
      name: "Bamboo Water Bottle - 1L Capacity, BPA Free, Sustainable & Eco-Friendly",
      price: 899,
      originalPrice: 1299,
      quantity: 1,
      images: ["/assests/mockProducts_images/copper_bottle.webp"],
      greenScore: 95,
      carbonFootprint: { total: 0.8 },
      isEcoFriendly: true,
      badges: ['recycled', 'biodegradable', 'sustainable-packaging'] as const,
      carbonSaved: "1.5kg CO₂ compared to plastic toothbrush",
      greenCoins: 95
    },
    {
      _id: 2,
      name: "Organic Cotton T-Shirt - 100% Natural, Fair Trade Certified",
      price: 599,
      originalPrice: 899,
      quantity: 2,
      images: ["/assests/mockProducts_images/hyv.webp"],
      greenScore: 88,
      carbonFootprint: { total: 1.2 },
      isEcoFriendly: true,
      badges: ['organic', 'sustainable-packaging'] as const,
      carbonSaved: "1.9kg CO₂ compared to plastic toothbrush",
      greenCoins: 88
    }
  ];

  const [cartItems, setCartItems] = useState(mockcartItems);
  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
  const totalSavings = cartItems.reduce((sum, item) => sum + ((Number(item.originalPrice) - Number(item.price)) * Number(item.quantity)), 0);
  const totalGreenCoins = cartItems.reduce((sum, item) => sum + (Number(item.greenCoins) * Number(item.quantity)), 0);

  // const totalCarbonSaved = cartItems.reduce((sum, item) => sum + (parseFloat(item.savings.match(/\d+\.?\d*/)?.[0] || '0') * item.quantity), 0);

  const totalCarbonSaved = cartItems.reduce((sum, item) => {
    const carbonSavedStr = String(item.carbonSaved || '');
    const m = carbonSavedStr.match(/([\d]+(?:\.\d+)?)(?=\s*kg\s*CO₂)/);
    const value = parseFloat(m?.[1] || '0');
    return sum + value * Number(item.quantity || 1);
  }, 0);
  
  // Helper to update localStorage and state
  const updateCart = useCallback((updatedItems: typeof cartItems) => {
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  }, []);

  // Increase quantity
  const handleIncrease = (_id: number) => {
    const updated = cartItems.map(item =>
      item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  // Decrease quantity
  const handleDecrease = (_id: number) => {
    const item = cartItems.find(i => i._id === _id);
    if (!item) return;
    if (item.quantity > 1) {
      const updated = cartItems.map(i =>
        i._id === _id ? { ...i, quantity: i.quantity - 1 } : i
      );
      updateCart(updated);
    } else {
      // Remove from cart
      const updated = cartItems.filter(i => i._id !== _id);
      updateCart(updated);
    }
  };

  const handleCheckout = async () => {
    if (!updatedState?.userData?._id) {
      router.push("/ap/signin");
    }
    else {
      try {
        const productsPayload = cartItems.map(item => ({
          _id: item._id,
          quantity: item.quantity,
        }))

        const totalCost = cartItems.reduce(
          (sum, item) => sum + Number(item.price) * Number(item.quantity),
          0
        )
        const greenCoinsEarned = cartItems.reduce(
          (sum, item) => sum + Number(item.greenCoins) * Number(item.quantity),
          0
        )

        const orderData: any = {
          products: productsPayload,
          type: 'normal',
          totalCost,
          ecoStats: {
            totalGreenCoins: greenCoinsEarned,
            totalCarbonSaved
          }
        }

        const resp = await axios.post('/api/order', orderData)

        router.push(`/checkout/${resp.data.newOrder._id}`);

      } catch (err: any) {
        console.log('Checkout failed:', err.response?.data || err.message)
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    // 1. Read raw cart array (might contain duplicates)
    const raw = JSON.parse(localStorage.getItem('cart') || '[]');
    // 2. Merge duplicates by _id
    const merged = raw.reduce((acc: typeof mockcartItems, rawItem: any) => {
      const item = {
        ...rawItem,
        price: Number(rawItem.price) || 0,
        originalPrice: Number(rawItem.originalPrice) || 0,
        greenCoins: Number(rawItem.greenCoins) || 0,
        quantity: Number(rawItem.quantity) || 1,
      };
      const existing = acc.find((i: typeof rawItem) => i._id === item._id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as typeof mockcartItems);
    setCartItems(merged);
    setLoading(false);
  }, []);

  return (
    <div className="bg-[#E3E6E6] min-h-screen">
      <Nav />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Checkout Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Items in your cart</h2>
              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
                  </div>
                ) : (
                  (cartItems.length > 0) && cartItems.map((item) => (
                    <div key={item._id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">{item.name}</h3>

                        {/* Eco indicators */}
                        <div className="flex items-center gap-2 mb-2">
                          <GreenScore
                            score={item.greenScore}
                            carbonFootprint={item.carbonFootprint.total}
                            isEcoFriendly={item.isEcoFriendly}
                          />
                          <span className="text-xs text-green-600 font-medium">Climate Pledge Friendly</span>
                        </div>

                        {/* Eco Badges */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {(item.badges?.length > 0) && item.badges.map((badge) => (
                            <EcoBadge key={badge} type={badge} showLabel={false} />
                          ))}
                        </div>

                        {/* Carbon Savings */}
                        <div className="text-xs text-green-600 mb-2">{item.carbonSaved}</div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
                            <span className="text-xs text-gray-500 line-through ml-1">₹{item.originalPrice}</span>
                            <span className="text-xs text-green-600 ml-2">+{item.greenCoins} coins</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className="px-2 py-1 bg-gray-200 rounded text-lg font-bold"
                              onClick={() => handleDecrease(item._id)}
                              aria-label="Decrease quantity"
                            >-</button>
                            <span className="text-sm text-gray-600">{item.quantity}</span>
                            <button
                              className="px-2 py-1 bg-gray-200 rounded text-lg font-bold"
                              onClick={() => handleIncrease(item._id)}
                              aria-label="Increase quantity"
                            >+</button>
                            {/* <button className="text-blue-600 text-sm hover:underline">Edit</button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>



            <p className='text-sm'>The price and availability of items at Amazon.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price.
              Do you have a promotional code? We'll ask you to enter your claim code when it's time to pay.</p>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Order summary</h2>

              {/* Eco-friendly Impact Summary */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-green-900 mb-2">🌱 Environmental Impact</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Total CO₂ Saved:</span>
                    <span className="font-medium text-green-900">{totalCarbonSaved.toFixed(1)}kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Green Coins Earned:</span>
                    <span className="font-medium text-green-900">{totalGreenCoins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Eco-friendly Items:</span>
                    <span className="font-medium text-green-900">{cartItems.length}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                  <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping & handling:</span>
                  <span className="text-gray-900">₹0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total before tax:</span>
                  <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated tax:</span>
                  <span className="text-gray-900">₹{(subtotal * 0.18).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Total savings:</span>
                  <span>-₹{totalSavings.toLocaleString()}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Order total:</span>
                  <span>₹{(subtotal + (subtotal * 0.18)).toFixed(0)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-lg mt-4"
                onClick={() => handleCheckout()}
              >
                Proceed to Checkout
              </button>

              {/* Green Coins Info */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  {/* <span className="text-sm text-green-700">Place your order to earn : </span> */}
                  <GreenCoin coins={totalGreenCoins} showIcon={false} size="sm" />
                </div>
                <p className="text-xs text-green-600 mt-1">Redeem for discounts on future eco-friendly purchases</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}