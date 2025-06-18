import React from 'react';

interface GreenCoinProps {
  coins: number;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function GreenCoin({ coins, showIcon = true, size = 'sm' }: GreenCoinProps) {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-green-700 bg-green-50 border border-green-200 font-medium ${sizeClasses[size]}`}>
      {showIcon && <span className="text-xs">🪙</span>}
      <span className="font-semibold">{coins}</span>
      <span className="text-xs">Green Coins</span>
    </div>
  );
} 