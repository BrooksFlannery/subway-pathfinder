'use client';

import { GameManager } from '@/lib/types/types';
import { Flag } from 'lucide-react';

export default function GameScreen({ gameManager }: { gameManager: GameManager }) {
    if (!gameManager.game) {
        return (
            <div>loading spoinner erras...</div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Game Info */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm">
                    <Flag className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-700">
                        Destination: {gameManager.game.destinationStation.name}
                    </span>
                </div>
            </div>

            {/* Current Location */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Current Location</h2>
                <p className="text-gray-700">{gameManager.game.currentStation.name}</p>
            </div>
            <button className='text-black' onClick={() => gameManager.advanceTurn()}>{"Increment Turn -->  "}</button>
            <span className='text-black'>{gameManager.game.turnNumber}</span>
            {gameManager.game.currentTrain &&
                <button className='text-black' onClick={() => gameManager.exitTrain(gameManager.game?.currentTrain!)}>{"Exit Train "}</button>
            }


        </div>
    );
} 