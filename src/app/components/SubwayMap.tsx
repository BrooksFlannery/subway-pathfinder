'use client';

import { REAL_STATIONS } from '@/data/realStations';
import { GameState } from '@/lib/gameState';

interface SubwayMapProps {
    gameState: GameState;
    onStationClick: (stationId: string) => void;
}

export default function SubwayMap({ gameState, onStationClick }: SubwayMapProps) {


    const ZOOM_WIDTH = 750;
    const ZOOM_HEIGHT = 750;

    const current = gameState.currentStation.coordinates;//we should be tweening the transition
    const zoomViewBox = current// i need some logic that makes sure we keep all transfer stations on screen...
        ? `${current.x - ZOOM_WIDTH / 2} ${current.y - ZOOM_HEIGHT / 2} ${ZOOM_WIDTH} ${ZOOM_HEIGHT}`
        : "0 0 2500 2700";


    return (
        <div className="w-full h-full">
            <svg
                viewBox={zoomViewBox}
                className="w-full h-full"
            >
                {/* Base NYC subway map image */}
                <image href="/nyc_subway_map.svg" x={0} y={0} width={2500} height={2700} />

                {/* Draw stations */}
                {REAL_STATIONS.map(station => {
                    const isCurrent = station.id === gameState.currentStation.id;
                    const isAvailable = gameState.availableMoves.some(move => move.station.id === station.id)
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
                                r={isCurrent || isAvailable ? 5 : 0}
                                fill={isCurrent ? '#fff' : isAvailable ? '#fff' : '#00000000'}
                                stroke={isCurrent || isAvailable ? '#000000' : '#0000000'}
                                strokeWidth={2}
                                className="transition-all duration-200"
                            />
                            {/* keep this around for debugging later */}
                            {/* <text
                                x={station.coordinates.x}
                                y={station.coordinates.y + 22}
                                textAnchor="middle"
                                fill="#334155"
                                fontSize="12"
                                className="font-medium"
                            >
                                {station.id}
                            </text> */}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
} 