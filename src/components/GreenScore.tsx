import React from 'react';

interface GreenScoreProps {
  score: number; // 0-100
  carbonFootprint: number; // in kg CO2
  isEcoFriendly: boolean;
  showDetails?: boolean;
}

export default function GreenScore({ score, carbonFootprint, isEcoFriendly, showDetails = false }: GreenScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-700 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    if (score >= 40) return 'text-orange-700 bg-orange-50 border-orange-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getScoreColor(score)}`}>
        <span className="text-sm">🌱</span>
        <span className="font-semibold">{score}</span>
      </div>
      {showDetails && (
        <div className="text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <span>CO₂: {carbonFootprint}kg</span>
            {isEcoFriendly && <span className="text-green-600 font-medium">✓ Eco-friendly</span>}
          </div>
          <div className="text-xs text-gray-500">{getScoreLabel(score)}</div>
        </div>
      )}
    </div>
  );
} 