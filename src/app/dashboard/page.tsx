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
    <div className="bg-gray-50 min-h-screen">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🌱 Eco Dashboard</h1>
          <p className="text-gray-600">Track your environmental impact and sustainability journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Green Coins</p>
                <p className="text-2xl font-bold text-green-600">{userStats.greenCoins}</p>
              </div>
              <div className="text-3xl">🪙</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CO₂ Reduced</p>
                <p className="text-2xl font-bold text-blue-600">{userStats.carbonFootprintReduced} kg</p>
              </div>
              <div className="text-3xl">🌍</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eco Products</p>
                <p className="text-2xl font-bold text-purple-600">{userStats.ecoProductsPurchased}</p>
              </div>
              <div className="text-3xl">♻️</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Money Saved</p>
                <p className="text-2xl font-bold text-green-600">₹{userStats.totalSavings}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
        </div>

        {/* Monthly Progress */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Monthly Carbon Reduction Goal</h2>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress: {userStats.currentMonth}kg / {userStats.monthlyGoal}kg</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {progressPercentage >= 100 
              ? "🎉 You've exceeded your monthly goal! Keep up the great work!"
              : `${userStats.monthlyGoal - userStats.currentMonth}kg more to reach your goal`
            }
          </p>
        </div>

        {/* Badges and Achievements */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">🏆 Achievements & Badges</h2>
          <div className="flex flex-wrap gap-3">
            {userStats.badges.map((badge, index) => (
              <div key={index} className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Eco Purchases */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Eco-Friendly Purchases</h2>
          <div className="space-y-4">
            {userStats.recentPurchases.map((purchase, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{purchase.name}</h3>
                  <p className="text-sm text-gray-600">Purchased on {purchase.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-green-600">Green Score</div>
                    <div className="text-lg font-bold">{purchase.greenScore}/100</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-blue-600">CO₂ Saved</div>
                    <div className="text-lg font-bold">{purchase.carbonSaved}kg</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips and Recommendations */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">💡 Tips to Increase Your Green Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-green-700 mb-2">🌱 Choose Eco-Friendly Products</h3>
              <p className="text-sm text-gray-600">Look for products with high green scores (80+) to maximize your environmental impact.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-green-700 mb-2">📦 Opt for Sustainable Packaging</h3>
              <p className="text-sm text-gray-600">Select products with minimal or recyclable packaging to reduce waste.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-green-700 mb-2">👥 Join Group Buying</h3>
              <p className="text-sm text-gray-600">Participate in group purchases to reduce shipping emissions and save money.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-green-700 mb-2">🪙 Use Green Coins</h3>
              <p className="text-sm text-gray-600">Redeem your green coins for exclusive eco-friendly products and discounts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 