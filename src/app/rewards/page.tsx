import React from 'react';
import Nav from '../../components/Nav';
import GreenCoin from '../../components/GreenCoin';

export default function Rewards() {
  // Mock data
  const userCoins = 1250;
  
  const availableRewards = [
    {
      id: 1,
      name: '₹100 Amazon Gift Card',
      coinsRequired: 500,
      originalValue: 100,
      description: 'Use for any purchase on Amazon',
      category: 'Gift Cards',
      image: '🎁'
    },
    {
      id: 2,
      name: 'Free Delivery Pass (1 Month)',
      coinsRequired: 300,
      originalValue: 199,
      description: 'Free delivery on all orders for 1 month',
      category: 'Shipping',
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🪙 Green Rewards</h1>
          <p className="text-gray-600">Redeem your green coins for amazing rewards and discounts</p>
        </div>

        {/* User Balance */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Green Coins Balance</h2>
              <div className="flex items-center gap-3">
                <GreenCoin coins={userCoins} size="lg" />
                <span className="text-green-100">Available for redemption</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">🎯</div>
              <p className="text-sm text-green-100">Keep earning!</p>
            </div>
          </div>
        </div>

        {/* Available Rewards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{reward.image}</div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{reward.category}</div>
                      <div className="text-xs text-green-600">Value: ₹{reward.originalValue}</div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{reward.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🪙</span>
                      <span className="font-bold text-green-600">{reward.coinsRequired}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {userCoins >= reward.coinsRequired ? (
                        <span className="text-green-600">✓ Available</span>
                      ) : (
                        <span className="text-red-600">Need {reward.coinsRequired - userCoins} more</span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    className={`w-full py-2 px-4 rounded font-medium text-sm ${
                      userCoins >= reward.coinsRequired
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={userCoins < reward.coinsRequired}
                  >
                    {userCoins >= reward.coinsRequired ? 'Redeem Now' : 'Not Enough Coins'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 