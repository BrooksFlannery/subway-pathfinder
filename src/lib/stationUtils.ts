import { Station } from '../types/station';
import { MOCK_STATIONS } from '../data/mockStations';

// Helper function to build station graph
export function buildStationGraph(): Map<string, Station> {
    const stationMap = new Map<string, Station>();
    MOCK_STATIONS.forEach((station: Station) => {
        stationMap.set(station.id, station);
    });
    return stationMap;
}

// Helper function to get random start/end pair
export function getRandomStationPair(): { start: Station; end: Station } {
    const stations = MOCK_STATIONS;
    const start = stations[Math.floor(Math.random() * stations.length)];
    let end = stations[Math.floor(Math.random() * stations.length)];

    // Ensure start and end are different
    while (end.id === start.id) {
        end = stations[Math.floor(Math.random() * stations.length)];
    }

    return { start, end };
}

// Get stations by borough
export function getStationsByBorough(borough: "Queens" | "Brooklyn" | "Manhattan" | "Staten Island" | "Bronx"): Station[] {
    return MOCK_STATIONS.filter((station: Station) => station.borough === borough);
} 