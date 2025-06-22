'use client';

import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function AnimatedCircularProgress({ progressPercentage, animate }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (!animate) return;

    let startTimestamp: number | null = null;
    const duration = 1000; // 1 second

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = progress * progressPercentage;

      setAnimatedValue(value);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [progressPercentage, animate]);

  const getColorByValue = (value: number) => {
    if (value < 20) return '#B6F500'; // green-300
    if (value < 40) return '#86efac'; // green-500
    if (value < 60) return '#22c55e'; // green-700
    if (value < 80) return '#15803d'; // green-900
    return '#052e16';                // darker
  };

  return (
    <CircularProgressbar
      value={animatedValue}
      text={`${Math.round(animatedValue)}%`}
      styles={buildStyles({
        textColor: '#14532d',
        pathColor: getColorByValue(animatedValue),
        trailColor: '#e0f2f1',
      })}
    />
  );
}
