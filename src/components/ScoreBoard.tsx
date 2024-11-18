import React from 'react';
import { Trophy, Crown, Play } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export default function ScoreBoard({ score, highScore, onRestart }: ScoreBoardProps) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 text-center space-y-6">
      <h2 className="text-2xl font-bold">Game Over!</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <span className="text-xl">Score: {score}</span>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <Crown className="w-6 h-6 text-yellow-400" />
          <span className="text-xl">Best: {highScore}</span>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="flex items-center justify-center w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Play className="w-4 h-4 mr-2" />
        Play Again
      </button>
    </div>
  );
}