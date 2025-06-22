import React from 'react';
import Nav from '../../components/Nav';
import GreenCoin from '../../components/GreenCoin';

export default function Rewards() {
  // Mock data
  const userCoins = 420;
  
  const availableRewards = [
    {
      id: 1,
      name: '₹100 Amazon Gift Card',
      coinsRequired: 500,
      originalValue: 100,
      description: 'Use for any purchase on Amazon',
      category: 'Gift Cards',
      image: '🎁',
      popular: true
    },
    {
      id: 2,
      name: 'Free Delivery Pass (1 Month)',
      coinsRequired: 300,
      originalValue: 199,
      description: 'Free delivery on all orders for 1 month',
      category: 'Shipping',
      popular: true,
      image: '🚚'
    },
    {
      id: 3,
      name: 'Bamboo Water Bottle',
      coinsRequired: 400,
      originalValue: 899,
      description: 'Eco-friendly 1L bamboo water bottle',
      category: 'Products',
      image: '🌱'
    },
    {
      id: 4,
      name: '20% Off Next Purchase',
      coinsRequired: 600,
      originalValue: 200,
      description: 'Get 20% off your next eco-friendly purchase',
      category: 'Discounts',
      image: '💰'
    },
    {
      id: 5,
      name: 'Plant a Tree Certificate',
      coinsRequired: 200,
      originalValue: 150,
      description: 'We\'ll plant a tree in your name',
      category: 'Environmental',
      image: '🌳'
    },
    {
      id: 6,
      name: 'Premium Customer Support',
      coinsRequired: 350,
      originalValue: 299,
      description: 'Priority customer support for 3 months',
      category: 'Services',
      image: '🎧'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Earned',
      coins: 95,
      description: 'Bamboo Water Bottle purchase',
      date: '2 days ago'
    },
    {
      id: 2,
      action: 'Redeemed',
      coins: -300,
      description: 'Free Delivery Pass',
      date: '1 week ago'
    },
    {
      id: 3,
      action: 'Earned',
      coins: 88,
      description: 'Organic Cotton T-Shirt purchase',
      date: '2 weeks ago'
    }
  ];

  return (
    <div className="bg-[#E3E6E6] min-h-screen">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Green Coins Rewards</h1>
          <p className="text-sm text-gray-600">Redeem your green coins for rewards and discounts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Balance Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Your Balance</h2>
                <GreenCoin coins={userCoins} size="md" />
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700 font-medium">Available for redemption</p>
                    <p className="text-xs text-green-600 mt-1">Keep shopping eco-friendly products to earn more</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl">🎯</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Rewards */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Rewards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRewards.map((reward) => (
                  <div key={reward.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-2xl">{reward.image}</div>
                      <div className="text-right">
                        {reward.popular && (
                          <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium mb-1 block">Popular</span>
                        )}
                        <div className="text-xs text-gray-500">{reward.category}</div>
                        <div className="text-xs text-green-600">Value: ₹{reward.originalValue}</div>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-gray-900 text-sm mb-2">{reward.name}</h3>
                    <p className="text-xs text-gray-600 mb-3">{reward.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">🪙</span>
                        <span className="font-semibold text-green-600 text-sm">{reward.coinsRequired}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {userCoins >= reward.coinsRequired ? (
                          <span className="text-green-600">✓ Available</span>
                        ) : (
                          <span className="text-red-600">Need {reward.coinsRequired - userCoins} more</span>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      className={`w-full py-2 px-3 rounded text-sm font-medium ${
                        userCoins >= reward.coinsRequired
                          ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={userCoins < reward.coinsRequired}
                    >
                      {userCoins >= reward.coinsRequired ? 'Redeem Now' : 'Not Enough Coins'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3">Your Impact</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Earned 🪙</span>
                  <span className="text-sm font-medium text-green-600">2,450 coins</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Redeemed ✅</span>
                  <span className="text-sm font-medium text-gray-900">1,200 coins</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CO₂ Saved 🌿</span>
                  <span className="text-sm font-medium text-green-600">45.2 kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Eco Purchases 🛒</span>
                  <span className="text-sm font-medium text-gray-900">23 items</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${
                          activity.coins > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {activity.coins > 0 ? '+' : ''}{activity.coins} coins
                        </span>
                        <span className="text-xs text-gray-500">{activity.action}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.date}</span>
                  </div>
                ))}
              </div>
              <button className="w-full text-xs text-blue-600 hover:underline mt-3">
                View all activity
              </button>
            </div>

            {/* How to Earn */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3">How to Earn More</h3>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Shop Climate Pledge Friendly products</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Choose sustainable packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Join group buying opportunities</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Complete eco-friendly challenges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 