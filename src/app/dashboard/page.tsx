'use client';

import React from 'react';
import Nav from '../../components/Nav';
import dynamic from 'next/dynamic';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image';
import { useState,useEffect } from 'react';

import AnimatedCircularProgress from "../../components/animation/animatedCircularProgress";


const ImpactCharts = dynamic(() => import('../../components/animation/ImpactCharts'), { ssr: false });




const badgeIcons: Record<string, string> = {
  'Eco Warrior': '/assests/seeding_18144243.png',
  'Green Shopper': '/assests/eco-bag_13323431.png',
  'Carbon Conscious': '/assests/think-eco_2962134.png'
};

export default function EcoDashboard() {

   const [startAnimations, setStartAnimations] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartAnimations(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);


  const userStats = {
    greenCoins: 1250,
    carbonFootprintReduced: 620,
    ecoProductsPurchased: 23,
    totalSavings: 156.80,
    monthlyGoal: 50,
    currentMonth: 25.5,
    badges: ['Eco Warrior', 'Green Shopper', 'Carbon Conscious'],
    recentPurchases: [
      { id: 1, name: 'Bamboo Water Bottle', greenScore: 95, carbonSaved: 2.1, date: '2024-01-15' },
      { id: 2, name: 'Organic Cotton T-Shirt', greenScore: 88, carbonSaved: 1.8, date: '2024-01-12' },
      { id: 3, name: 'Solar Power Bank', greenScore: 92, carbonSaved: 3.2, date: '2024-01-10' },
    ]
  };

  const progressPercentage = (userStats.currentMonth / userStats.monthlyGoal) * 100;

  const tips = [
    {
      id: 1,
      title: '🌱 Choose eco-friendly products',
      desc: 'Look for products with high green scores (80+) to maximize your environmental impact.'
    },
    {
      id: 2,
      title: '📦 Opt for sustainable packaging',
      desc: 'Select products with minimal or recyclable packaging to reduce waste.'
    },
    {
      id: 3,
      title: '🤝 Join group buying',
      desc: 'Participate in group purchases to reduce shipping emissions and save money.'
    },
    {
      id: 4,
      title: '💚 Use green coins',
      desc: 'Redeem your green coins for exclusive eco-friendly products and discounts.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Nav />

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Row 1: Badges + Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Badges */}
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Achievements & Badges</h2>
            <div className="flex gap-4">
                  {userStats.badges.map((badge, index) => (
        <div
          key={`badge-${index}-${badge}`}
          className="flex h-50 w-50 flex-col items-center bg-emerald-50 p-3 rounded-lg w-24 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
        >
          <Image
            src={badgeIcons[badge]}
            alt={badge}
            width={50}
            height={50}
            className="mb-3 h-15 w-15 mt-4"
          />
          <span className="text-md text-center text-gray-800 mb-4 font-bold">
            {badge}
          </span>
        </div>
      ))}
            </div>
          </div>
         

          {/* Progress */}
           <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-center">
            <h2 className="text-md font-semibold text-gray-800 mb-3">Monthly Carbon Reduction Goal</h2>
          <div className ="h-50 w-50 " >

       <AnimatedCircularProgress
  progressPercentage={progressPercentage}
  animate={startAnimations}
/>

</div>
</div>

 </div>

        {/* Row 2: Charts */}
        <div className="grid h-100 w-500  grid-cols-1 md:grid-cols-2 gap-6 ">
         <ImpactCharts animate={startAnimations} />
        </div>
        

        {/* Row 3: Stats + Recent Purchases */}
        <div className="grid  grid-cols-1  md:grid-cols-2 gap-6">
          {/* Stats Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div key="green-coins" className=" rounded-xl bg-emerald-50 h-55 shadow-md p-3 border border-gray-100 flex flex-col items-center justify-center h-28  transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
              <span className="text-blue-600  mb-1"><img src="/assests/eco-friendly_5184273.png" alt="green coin" className="w-13 h-13 mb-1" /></span>
              <p className="text-lg font-bold  text-gray-900">{userStats.greenCoins.toLocaleString()}</p>
              <p className="text-xs text-2xl text-gray-600">Green Coins</p>
            </div>
            <div key="savings" className=" rounded-xl bg-emerald-50  h-55 shadow-md p-3 border border-gray-100 flex flex-col items-center justify-center h-28  transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
              <span className="text-yellow-600 text-6xl mb-1">💰</span>
              <p className="text-lg font-bold text-gray-900">₹{userStats.totalSavings.toFixed(2)}</p>
              <p className="text-xs text-gray-600">Saved</p>
            </div>
            <div key="eco-products" className=" rounded-xl bg-emerald-50 h-55 shadow-md p-3 border border-gray-100 flex flex-col items-center justify-center h-28  transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
              <span className="text-green-600 text-6xl mb-1">♻️</span>
              <p className="text-lg  font-bold text-gray-900">{userStats.ecoProductsPurchased}</p>
              <p className="text-xs text-semibold text-gray-600">Eco Products</p>
            </div>
          </div>

          {/* Recent Purchases */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-md font-semibold text-gray-800 mb-4">Recent Purchases</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-800  border-b">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Green Score</th>
                  <th className="pb-2">CO₂ Saved</th>
                  <th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {userStats.recentPurchases.map((item) => (
                  <tr key={`purchase-${item.id}`} className="border-b text-gray-800 ">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.greenScore}</td>
                    <td className="py-2">{item.carbonSaved} kg</td>
                    <td className="py-2">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Row 4: Tips Section */}
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Tips to Increase Your Green Impact 🌿</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip) => (
              <div key={`tip-${tip.id}`} className="bg-green-100 border border-green-200 rounded-lg p-4 hover:shadow-md transition">
                <h3 className="text-green-800 font-semibold mb-1 text-sm">{tip.title}</h3>
                <p className="text-xs text-gray-700">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
