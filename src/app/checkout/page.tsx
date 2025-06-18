import React from 'react'
import Nav from '../../components/Nav'
import GreenScore from '../../components/GreenScore'
import EcoBadge from '../../components/EcoBadge'
import GreenCoin from '../../components/GreenCoin'

export default function CheckoutPage() {
  // Mock cart items with eco-friendly features
  const cartItems = [
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
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const totalGreenCoins = cartItems.reduce((sum, item) => sum + (item.greenCoins * item.quantity), 0);
  const totalCarbonSaved = cartItems.reduce((sum, item) => sum + (parseFloat(item.savings.match(/\d+\.?\d*/)?.[0] || '0') * item.quantity), 0);

  return (
    <div className="bg-[#E3E6E6] min-h-screen">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Checkout Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Items in your cart</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
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
                          carbonFootprint={item.carbonFootprint}
                          isEcoFriendly={item.isEcoFriendly}
                        />
                        <span className="text-xs text-green-600 font-medium">Climate Pledge Friendly</span>
                      </div>
                      
                      {/* Eco Badges */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.badges.map((badge) => (
                          <EcoBadge key={badge} type={badge} showLabel={false} />
                        ))}
                      </div>

                      {/* Carbon Savings */}
                      <div className="text-xs text-green-600 mb-2">{item.savings}</div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
                          <span className="text-xs text-gray-500 line-through ml-1">₹{item.originalPrice}</span>
                          <span className="text-xs text-green-600 ml-2">+{item.greenCoins} coins</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                          <button className="text-blue-600 text-sm hover:underline">Edit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping address</h2>
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-600">123 Main Street</p>
                    <p className="text-sm text-gray-600">Apartment 4B</p>
                    <p className="text-sm text-gray-600">New York, NY 10001</p>
                    <p className="text-sm text-gray-600">United States</p>
                    <p className="text-sm text-gray-600">Phone: +1 (555) 123-4567</p>
                  </div>
                  <button className="text-blue-600 text-sm hover:underline">Change</button>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Payment method</h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer">
                  <input type="radio" name="payment" className="text-blue-600" defaultChecked />
                  <span className="ml-3 text-sm">Credit or debit card</span>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer">
                  <input type="radio" name="payment" className="text-blue-600" />
                  <span className="ml-3 text-sm">Amazon Pay</span>
                </label>
              </div>
            </div>
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
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-lg mt-4">
                Place your order
              </button>

              {/* Green Coins Info */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Earn Green Coins:</span>
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