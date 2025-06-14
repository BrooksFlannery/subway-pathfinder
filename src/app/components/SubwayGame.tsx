'use client';

import { GameState } from '@/lib/gameState';
import { MapPin, Flag, Trophy, RotateCw } from 'lucide-react';

interface SubwayGameProps {
    gameState: GameState;
    onStationClick: (stationId: string) => void;
    onNewGame: () => void;
}

export default function SubwayGame({ gameState, onStationClick, onNewGame }: SubwayGameProps) {
    return (
        <div className="space-y-6">
            {/* Game Info */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-700">
                        Start: {gameState.startStation.name}
                    </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm">
                    <Flag className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-700">
                        Destination: {gameState.endStation.name}
                    </span>
                </div>
            </div>

            {/* Current Location */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Current Location</h2>
                <p className="text-gray-700">{gameState.currentStation.name}</p>
            </div>

            {/* Win Message and New Game Button */}
            {gameState.gameStatus === 'won' && (
                <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2">
                            <Trophy className="w-6 h-6 text-yellow-500" />
                            <span className="font-medium text-green-700">
                                You&apos;ve reached your destination!
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onNewGame}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <RotateCw className="w-5 h-5" />
                        Start New Game
                    </button>
                </div>
            )}
        </div>
    );
} 