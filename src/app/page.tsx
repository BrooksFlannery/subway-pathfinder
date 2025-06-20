'use client';

import SubwayMap from './components/SubwayMap';
import { useGame } from './hooks/useGame';
import GameScreen from './components/GameScreen';
import { GameManager } from '@/lib/types/types';

export default function Home() {

  const gameManager: GameManager = useGame();

  if (!gameManager.game) {
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
          <GameScreen gameManager={gameManager} />

        </div>
        {/* Right panel - Map */}
        <div className="w-2/3 p-6 overflow-hidden">
          <SubwayMap gameManager={gameManager} />
        </div>
      </div>
    </main>
  );
}
