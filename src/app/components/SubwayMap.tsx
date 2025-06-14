'use client';

import { useEffect, useRef } from 'react';
import { MOCK_STATIONS } from '@/data/stations';

// Color mapping for subway lines
const LINE_COLORS: { [key: string]: string } = {
    'L': '#A7A9AC', // Gray
    'A': '#0039A6', // Blue
    'C': '#0039A6', // Blue
    'M': '#FF6319', // Orange
    'G': '#6CBE45', // Green
    '7': '#B933AD', // Purple
    'F': '#FF6319', // Orange
    // Add more line colors as needed
};

export default function SubwayMap() {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        // Log all stations and their data
        console.log('All Stations:', MOCK_STATIONS.map(station => ({
            id: station.id,
            name: station.name,
            coordinates: station.coordinates,
            neighbors: station.neighbors
        })));

        // Calculate bounds of all stations
        const bounds = MOCK_STATIONS.reduce((acc, station) => {
            return {
                minLat: Math.min(acc.minLat, station.coordinates.lat),
                maxLat: Math.max(acc.maxLat, station.coordinates.lat),
                minLng: Math.min(acc.minLng, station.coordinates.lng),
                maxLng: Math.max(acc.maxLng, station.coordinates.lng),
            };
        }, {
            minLat: Infinity,
            maxLat: -Infinity,
            minLng: Infinity,
            maxLng: -Infinity,
        });

        console.log('Map Bounds:', bounds);

        // Add padding to bounds
        const padding = 0.01;
        bounds.minLat -= padding;
        bounds.maxLat += padding;
        bounds.minLng -= padding;
        bounds.maxLng += padding;

        // Set viewBox based on bounds
        const width = bounds.maxLng - bounds.minLng;
        const height = bounds.maxLat - bounds.minLat;
        console.log('ViewBox Dimensions:', { width, height });

        // Set a fixed viewBox size for better scaling
        svgRef.current.setAttribute('viewBox', '0 0 1000 1000');
    }, []);

    // Function to convert coordinates to SVG coordinates
    const getStationPosition = (lat: number, lng: number) => {
        // Find the bounds of our data
        const bounds = MOCK_STATIONS.reduce((acc, station) => {
            return {
                minLat: Math.min(acc.minLat, station.coordinates.lat),
                maxLat: Math.max(acc.maxLat, station.coordinates.lat),
                minLng: Math.min(acc.minLng, station.coordinates.lng),
                maxLng: Math.max(acc.maxLng, station.coordinates.lng),
            };
        }, {
            minLat: Infinity,
            maxLat: -Infinity,
            minLng: Infinity,
            maxLng: -Infinity,
        });

        // Add padding
        const padding = 0.01;
        bounds.minLat -= padding;
        bounds.maxLat += padding;
        bounds.minLng -= padding;
        bounds.maxLng += padding;

        // Scale coordinates to 0-1000 range
        const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 1000;
        const y = ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 1000;

        return { x, y };
    };

    // Create a Set to track rendered connections
    const renderedConnections = new Set<string>();

    // Log all connections before rendering
    const allConnections = MOCK_STATIONS.flatMap(station =>
        station.neighbors.map(neighbor => ({
            from: station.id,
            to: neighbor.stationId,
            line: neighbor.line
        }))
    );
    console.log('All Connections:', allConnections);

    return (
        <div className="w-full h-full min-h-[500px] bg-white">
            <svg
                ref={svgRef}
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <style>
                        {`
                            .station {
                                fill: white;
                                stroke: #000;
                                stroke-width: 2;
                            }
                            .station:hover {
                                fill: #f0f0f0;
                                cursor: pointer;
                            }
                            .station-label {
                                font-size: 12px;
                                text-anchor: middle;
                                dominant-baseline: middle;
                            }
                            .line {
                                stroke-width: 4;
                            }
                        `}
                    </style>
                </defs>

                {/* Draw lines between connected stations */}
                {MOCK_STATIONS.map((station) => (
                    station.neighbors.map((neighbor) => {
                        const neighborStation = MOCK_STATIONS.find(s => s.id === neighbor.stationId);
                        if (!neighborStation) {
                            console.log('Neighbor not found:', neighbor.stationId);
                            return null;
                        }

                        // Create a unique key by sorting the station IDs
                        const connectionKey = [station.id, neighbor.stationId].sort().join('-');

                        // Skip if we've already rendered this connection
                        if (renderedConnections.has(connectionKey)) return null;
                        renderedConnections.add(connectionKey);

                        const start = getStationPosition(station.coordinates.lat, station.coordinates.lng);
                        const end = getStationPosition(neighborStation.coordinates.lat, neighborStation.coordinates.lng);

                        console.log('Rendering connection:', {
                            from: station.name,
                            to: neighborStation.name,
                            line: neighbor.line,
                            start,
                            end
                        });

                        return (
                            <line
                                key={connectionKey}
                                x1={start.x}
                                y1={start.y}
                                x2={end.x}
                                y2={end.y}
                                stroke={LINE_COLORS[neighbor.line] || '#000'}
                                strokeWidth="4"
                                className="line"
                            />
                        );
                    })
                ))}

                {/* Draw stations */}
                {MOCK_STATIONS.map((station) => {
                    const pos = getStationPosition(station.coordinates.lat, station.coordinates.lng);
                    console.log('Rendering station:', {
                        name: station.name,
                        position: pos
                    });
                    return (
                        <g key={station.id}>
                            <circle
                                className="station"
                                cx={pos.x}
                                cy={pos.y}
                                r="8"
                            />
                            <text
                                className="station-label"
                                x={pos.x}
                                y={pos.y + 15}
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