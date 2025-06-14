'use client';

import { useState, useEffect } from 'react';
import { createSubwayGame, GameState, SubwayGame as Game } from '@/lib/gameState';
import SubwayMap from './SubwayMap';
import { MapPin, Flag, Trophy } from 'lucide-react';

export default function SubwayGame() {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [game, setGame] = useState<Game | null>(null);

    useEffect(() => {
        const newGame = createSubwayGame();
        const initialState = newGame.startGame();
        setGame(newGame);
        setGameState(initialState);
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

    if (!gameState) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative">
            {/* Game Info Overlay */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">
                        {gameState.startStation.name}
                    </span>
                </div>
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                    <Flag className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">
                        {gameState.endStation.name}
                    </span>
                </div>
            </div>

            {/* Win Message */}
            {gameState.gameStatus === 'won' && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-sm">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">
                            You've reached your destination!
                        </span>
                    </div>
                </div>
            )}

            {/* Map */}
            <div className="w-full aspect-[4/3] bg-white rounded-lg shadow-sm overflow-hidden">
                <SubwayMap
                    gameState={gameState}
                    onStationClick={handleStationClick}
                />
            </div>
        </div>
    );
} 