import React from 'react';
import Nav from '../../components/Nav';
import GreenCoin from '../../components/GreenCoin';

export default function EcoDashboard() {
  // Mock data - in real app this would come from API
  const userStats = {
    greenCoins: 1250,
    carbonFootprintReduced: 45.2, // kg CO2
    ecoProductsPurchased: 23,
    totalSavings: 156.80, // in currency
    monthlyGoal: 60, // kg CO2
    currentMonth: 28.5, // kg CO2
    badges: ['Eco Warrior', 'Green Shopper', 'Carbon Conscious'],
    recentPurchases: [
      { name: 'Bamboo Water Bottle', greenScore: 95, carbonSaved: 2.1, date: '2024-01-15' },
      { name: 'Organic Cotton T-Shirt', greenScore: 88, carbonSaved: 1.8, date: '2024-01-12' },
      { name: 'Solar Power Bank', greenScore: 92, carbonSaved: 3.2, date: '2024-01-10' },
    ]
  };

  const progressPercentage = (userStats.currentMonth / userStats.monthlyGoal) * 100;

  return (
    <div className="bg-[#E3E6E6] min-h-screen">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your environmental impact</h1>
          <p className="text-sm text-gray-600">Track your sustainability journey and carbon footprint reduction</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Green Coins</p>
                <p className="text-xl font-bold text-green-600">{userStats.greenCoins}</p>
              </div>
              <div className="text-2xl">🪙</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">CO₂ Reduced</p>
                <p className="text-xl font-bold text-blue-600">{userStats.carbonFootprintReduced} kg</p>
              </div>
              <div className="text-2xl">🌍</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Eco Products</p>
                <p className="text-xl font-bold text-purple-600">{userStats.ecoProductsPurchased}</p>
              </div>
              <div className="text-2xl">♻️</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Money Saved</p>
                <p className="text-xl font-bold text-green-600">₹{userStats.totalSavings}</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </div>
        </div>

        {/* Monthly Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Monthly carbon reduction goal</h2>
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>{userStats.currentMonth}kg / {userStats.monthlyGoal}kg</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            {progressPercentage >= 100 
              ? "You've exceeded your monthly goal! Keep up the great work!"
              : `${userStats.monthlyGoal - userStats.currentMonth}kg more to reach your goal`
            }
          </p>
        </div>

        {/* Badges and Achievements */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Achievements & badges</h2>
          <div className="flex flex-wrap gap-2">
            {userStats.badges.map((badge, index) => (
              <div key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-medium border border-green-200">
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Eco Purchases */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Recent eco-friendly purchases</h2>
          <div className="space-y-3">
            {userStats.recentPurchases.map((purchase, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{purchase.name}</h3>
                  <p className="text-xs text-gray-600">Purchased on {purchase.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-xs font-medium text-green-600">Green Score</div>
                    <div className="text-sm font-bold">{purchase.greenScore}/100</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium text-blue-600">CO₂ Saved</div>
                    <div className="text-sm font-bold">{purchase.carbonSaved}kg</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips and Recommendations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-semibold mb-3">Tips to increase your green impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <h3 className="font-medium text-green-700 mb-1 text-sm">Choose eco-friendly products</h3>
              <p className="text-xs text-gray-600">Look for products with high green scores (80+) to maximize your environmental impact.</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <h3 className="font-medium text-green-700 mb-1 text-sm">Opt for sustainable packaging</h3>
              <p className="text-xs text-gray-600">Select products with minimal or recyclable packaging to reduce waste.</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <h3 className="font-medium text-green-700 mb-1 text-sm">Join group buying</h3>
              <p className="text-xs text-gray-600">Participate in group purchases to reduce shipping emissions and save money.</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <h3 className="font-medium text-green-700 mb-1 text-sm">Use green coins</h3>
              <p className="text-xs text-gray-600">Redeem your green coins for exclusive eco-friendly products and discounts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 