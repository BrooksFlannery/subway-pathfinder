'use client';

import { REAL_STATIONS } from '@/lib/data/realStations';
import { GameManager } from '@/lib/types/types';

export default function SubwayMap({ gameManager }: { gameManager: GameManager }) {

    const ZOOM_WIDTH = 1000;//we should allow the users scroll wheel to affect this
    const ZOOM_HEIGHT = 1000;

    const current = gameManager.game?.currentStation.coordinates;//we should be tweening the transition
    const zoomViewBox = current// i need some logic that makes sure we keep all transfer stations on screen...
        ? `${current.x - ZOOM_WIDTH / 2} ${current.y - ZOOM_HEIGHT / 2} ${ZOOM_WIDTH} ${ZOOM_HEIGHT}`
        : "0 0 2500 2700";

    if (!gameManager.game) {
        return (
            <div>Loadding spinner goes here...</div>
        )
    }

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
                    const isCurrent = station.id === gameManager.game?.currentStation.id;
                    //
                    const isAvailable = !gameManager.game?.currentTrain && gameManager.game?.currentStation.walkable?.includes(station.id)
                    // const hasTrain = game.trains.some(train => train.currentStation.id === station.id);                    
                    // const isStart = station.id === gameState.startStation.id;
                    // const isEnd = station.id === gameState.endStation.id;

                    return (
                        <g
                            key={station.id}
                            onClick={() => {
                                if (isAvailable) {
                                    gameManager.makeMove(station);
                                }
                                //for debugging purposes
                                // else {
                                //     console.log(station.id + " IS NOT CONNECTED")
                                //     onStationClick(station.id);
                                // }

                            }}
                            style={{ cursor: isAvailable ? 'pointer' : 'default' }}
                        >
                            <circle
                                cx={station.coordinates.x}
                                cy={station.coordinates.y}
                                r={isCurrent || isAvailable ? 7 : 7}
                                fill={isCurrent || isAvailable ? '#fff' : '#00000000'}
                                stroke={isCurrent ? '#000000' : '#0000000'}
                                strokeWidth={2}
                                className="transition-all duration-200"
                            />
                            {/* keep this around for debugging later */}
                            {/* {(isCurrent || isAvailable) && (
                                <text
                                    x={station.coordinates.x}
                                    y={station.coordinates.y + 22}
                                    textAnchor="middle"
                                    fill="#334155"
                                    fontSize="12"
                                    className="font-medium"
                                >
                                    {station.id}
                                </text>
                            )} */}
                        </g>

                    );

                })}
                {/* Draw Trains */}
                {gameManager.game.trains.map((train) => {
                    const isAvailable = train.currentStation.id === gameManager.game?.currentStation.id

                    return (
                        <g
                            key={train.id}
                            onClick={() => {
                                if (isAvailable) {
                                    console.log('boarding', train.id)
                                    gameManager.boardTrain(train);
                                }
                                //for debugging purposes
                                // else {
                                //     console.log(station.id + " IS NOT CONNECTED")
                                //     onStationClick(station.id);
                                // }

                            }}
                            style={{ cursor: isAvailable ? 'pointer' : 'default' }}
                        >
                            <circle
                                cx={train.currentStation.coordinates.x}
                                cy={train.currentStation.coordinates.y}
                                r={7}
                                fill={train.isAtStation ? '#FF0000' : "#FF69B4"}
                                className="transition-all duration-1000"
                            />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
} 