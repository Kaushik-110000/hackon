'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts';

// Chart Data
const carbonData = [
  { month: 'Apr', value: 300 },
  { month: 'May', value: 350 },
  { month: 'Jun', value: 450 },
  { month: 'Jul', value: 500 },
  { month: 'Sep', value: 620 },
];

const productData = [
  { month: 'Jan', value: 3 },
  { month: 'Feb', value: 10 },
  { month: 'Mar', value: 7 },
  { month: 'Apr', value: 11 },
  { month: 'May', value: 17 },
  { month: 'Nov', value: 23 },
];

// Green shades
const tailwindShades = [
  '#86efac', // green-300
  '#4ade80', // green-400
  '#22c55e', // green-500
  '#16a34a', // green-600
  '#15803d', // green-700
  '#166534', // green-800
  '#052e16'  // green-900 
  

];

export default function ImpactCharts({ animate }) {
  const [animateCharts, setAnimateCharts] = useState(false);

  useEffect(() => {
    if (animate) {
      setAnimateCharts(true);
    }
  }, [animate]);

  // Generate value → color mapping
  const getShadeMap = (data) => {
    const sorted = [...data].sort((a, b) => a.value - b.value);
    const map = {};
    sorted.forEach((item, i) => {
      const shadeIndex = Math.min(i, tailwindShades.length - 1);
      map[item.value] = tailwindShades[shadeIndex];
    });
    return map;
  };

  const barShadeMap = getShadeMap(carbonData);
  const lineShadeMap = getShadeMap(productData);

  return (
     <div className="grid  h-80 grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {/* CO₂ Reduced */}
      <div className="bg-white h-80 w-137 p-2 rounded-xl shadow">
        <h2 className="text-md font-semibold text-gray-800 ml-4 mb-4">CO₂ Reduced</h2>
        <ResponsiveContainer width={500} height={250}>
          <BarChart data={carbonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              isAnimationActive={animateCharts}
              animationDuration={1200}
            >
              {carbonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barShadeMap[entry.value]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart: Eco Products Over Time */}
       <div className="bg-white  h-80 w-137 p-2 rounded-xl ml-18 shadow">
        <h2 className="text-md font-semibold text-gray-800 ml-3 mb-4">Eco Products Over Time</h2>
        <ResponsiveContainer width={500} height={250} >
          <LineChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#16a34a"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={lineShadeMap[payload.value]}
                  stroke="#14532d"
                  strokeWidth={1.5}
                />
              )}
              isAnimationActive={animateCharts}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
