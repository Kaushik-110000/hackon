import React from 'react';

interface EcoBadgeProps {
  type: 'recycled' | 'biodegradable' | 'organic' | 'energy-efficient' | 'carbon-neutral' | 'sustainable-packaging';
  showLabel?: boolean;
}

export default function EcoBadge({ type, showLabel = true }: EcoBadgeProps) {
  const badgeConfig = {
    recycled: {
      icon: '♻️',
      label: 'Recycled',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    biodegradable: {
      icon: '🌿',
      label: 'Biodegradable',
      color: 'bg-green-50 text-green-700 border-green-200'
    },
    organic: {
      icon: '🌱',
      label: 'Organic',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    'energy-efficient': {
      icon: '⚡',
      label: 'Energy Efficient',
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200'
    },
    'carbon-neutral': {
      icon: '🌍',
      label: 'Carbon Neutral',
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    'sustainable-packaging': {
      icon: '📦',
      label: 'Sustainable Packaging',
      color: 'bg-orange-50 text-orange-700 border-orange-200'
    }
  };

  const config = badgeConfig[type];

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${config.color}`}>
      <span className="text-xs">{config.icon}</span>
      {showLabel && <span className="text-xs">{config.label}</span>}
    </div>
  );
} 