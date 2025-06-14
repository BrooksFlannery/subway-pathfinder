'use client';

import { useState, useEffect } from 'react';
import SubwayGame from './components/SubwayGame';
import SubwayMap from './components/SubwayMap';
import { createSubwayGame, GameState, SubwayGame as Game } from '@/lib/gameState';

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [game, setGame] = useState<Game | null>(null);

  const initializeGame = () => {
    const newGame = createSubwayGame();
    const initialState = newGame.startGame();
    setGame(newGame);
    setGameState(initialState);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleStationClick = (stationId: string) => {
    if (!game || !gameState) return;
    if (gameState.gameStatus !== 'playing') return;
    if (!gameState.availableMoves.some(move => move.station.id === stationId)) return;

    const result = game.makeMove(stationId);
    if (result.success) {
      setGameState(result.gameState);
    }
  };

  const handleNewGame = () => {
    initializeGame();
  };

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <main className="h-screen w-screen flex flex-col overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="p-4 bg-white shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">NYC Subway Pathfinder</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Game Controls */}
        <div className="w-1/3 p-6 overflow-y-auto border-r border-gray-200">
          <SubwayGame
            gameState={gameState}
            onNewGame={handleNewGame}
          />
        </div>
        {/* Right panel - Map */}
        <div className="w-2/3 p-6 overflow-hidden">
          <SubwayMap
            gameState={gameState}
            onStationClick={handleStationClick}
          />
        </div>
      </div>
    </main>
  );
}
