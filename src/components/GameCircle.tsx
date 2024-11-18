import React, { useState, useEffect, useCallback } from 'react';

interface GameCircleProps {
  speed: number;
  onCorrectTap: () => void;
  onWrongTap: () => void;
}

const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500'];

export default function GameCircle({ speed, onCorrectTap, onWrongTap }: GameCircleProps) {
  const [currentColor, setCurrentColor] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prev) => (prev + 1) % colors.length);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 150);
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  const handleTap = useCallback(() => {
    if (colors[currentColor] === 'bg-green-500') {
      onCorrectTap();
    } else {
      onWrongTap();
    }
  }, [currentColor, onCorrectTap, onWrongTap]);

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleTap}
        className={`w-48 h-48 rounded-full ${colors[currentColor]} 
          transform transition-all duration-150 
          ${isAnimating ? 'scale-110' : 'scale-100'}
          hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50
          shadow-lg hover:shadow-xl`}
      />
    </div>
  );
}