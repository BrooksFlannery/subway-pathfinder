'use client';

import { REAL_STATIONS } from '@/data/stations';
import { GameState } from '@/lib/gameState';

interface SubwayMapProps {
    gameState: GameState;
    onStationClick: (stationId: string) => void;
}

export default function SubwayMap({ gameState, onStationClick }: SubwayMapProps) {
    return (
        <div className="w-full h-full">
            <svg
                viewBox="0 0 3000 3000"
                className="w-full h-full"
            >
                {/* Base NYC subway map image */}
                <image href="/nyc_subway_map.svg" x={0} y={0} width={2500} height={2700} />

                {/* Draw subway lines */}
                {/* No subway lines needed now */}

                {/* Draw stations */}
                {REAL_STATIONS.map(station => {
                    const isCurrent = station.id === gameState.currentStation.id;
                    const isAvailable = gameState.availableMoves.some(move => move.station.id === station.id);
                    const isStart = station.id === gameState.startStation.id;
                    const isEnd = station.id === gameState.endStation.id;

                    return (
                        <g
                            key={station.id}
                            onClick={() => {
                                if (isAvailable) {
                                    onStationClick(station.id);
                                }
                            }}
                            style={{ cursor: isAvailable ? 'pointer' : 'default' }}
                        >
                            <circle
                                cx={station.coordinates.x}
                                cy={station.coordinates.y}
                                r={isCurrent ? 14 : 10}
                                fill={isStart ? '#3b82f6' : isEnd ? '#22c55e' : isCurrent ? '#fff' : '#e2e8f0'}
                                stroke={isStart ? '#2563eb' : isEnd ? '#16a34a' : isCurrent ? '#0f172a' : '#94a3b8'}
                                strokeWidth={isCurrent ? 3 : 2}
                                className="transition-all duration-200"
                            />
                            <text
                                x={station.coordinates.x}
                                y={station.coordinates.y + 22}
                                textAnchor="middle"
                                fill="#334155"
                                fontSize="12"
                                className="font-medium"
                            >
                                {station.name}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
} 