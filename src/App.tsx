import React, { useState, useEffect, useCallback } from 'react';
import { Circle, Trophy, Timer, RefreshCw } from 'lucide-react';
import GameCircle from './components/GameCircle';
import ScoreBoard from './components/ScoreBoard';
import Tutorial from './components/Tutorial';
import { GameState } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>('tutorial');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [speed, setSpeed] = useState(2000);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    setSpeed(2000);
  }, []);

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('gameover');
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  useEffect(() => {
    // Increase speed as score increases
    setSpeed(Math.max(500, 2000 - score * 100));
  }, [score]);

  const handleCorrectTap = useCallback(() => {
    setScore((prev) => prev + 1);
  }, []);

  const handleWrongTap = useCallback(() => {
    setGameState('gameover');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            ColorTap
          </h1>
          {gameState === 'playing' && (
            <div className="flex justify-center space-x-8 mb-4">
              <div className="flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                <span>{score}</span>
              </div>
              <div className="flex items-center">
                <Timer className="w-5 h-5 mr-2" />
                <span>{timeLeft}s</span>
              </div>
            </div>
          )}
        </div>

        {gameState === 'tutorial' && (
          <Tutorial onStart={startGame} />
        )}

        {gameState === 'playing' && (
          <GameCircle
            speed={speed}
            onCorrectTap={handleCorrectTap}
            onWrongTap={handleWrongTap}
          />
        )}

        {gameState === 'gameover' && (
          <ScoreBoard
            score={score}
            highScore={highScore}
            onRestart={startGame}
          />
        )}

        {gameState !== 'tutorial' && (
          <button
            onClick={() => setGameState('tutorial')}
            className="mt-4 flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Back to Tutorial
          </button>
        )}
      </div>
    </div>
  );
}

export default App;