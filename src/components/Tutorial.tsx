import React from 'react';
import { Play } from 'lucide-react';

interface TutorialProps {
  onStart: () => void;
}

export default function Tutorial({ onStart }: TutorialProps) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 text-center space-y-6">
      <h2 className="text-2xl font-bold">How to Play</h2>
      
      <div className="space-y-4 text-left">
        <p className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span>Tap when the circle is GREEN</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span>Avoid tapping other colors</span>
        </p>
        <p className="text-sm opacity-75">
          The game gets faster as your score increases. You have 30 seconds!
        </p>
      </div>

      <button
        onClick={onStart}
        className="flex items-center justify-center w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Play className="w-4 h-4 mr-2" />
        Start Game
      </button>
    </div>
  );
}