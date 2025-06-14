// Mock NYC Subway Data - Queens & Brooklyn Focus
// This is sample data for MVP development

export interface Station {
    id: string;
    name: string;
    borough: "Queens" | "Brooklyn";
    lines: string[];
    coordinates: { lat: number; lng: number };
    neighbors: Array<{
        stationId: string;
        line: string;
        travelTime: number; // minutes
    }>;
}

// Helper function to build adjacency list
export function buildStationGraph(): Map<string, Station> {
    const stationMap = new Map<string, Station>();

    MOCK_STATIONS.forEach(station => {
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
export function getStationsByBorough(borough: "Queens" | "Brooklyn"): Station[] {
    return MOCK_STATIONS.filter(station => station.borough === borough);
}

// Get stations by line
export function getStationsByLine(line: string): Station[] {
    return MOCK_STATIONS.filter(station => station.lines.includes(line));
}

export const MOCK_STATIONS: Station[] = [
    // L Train - Brooklyn to Queens
    {
        id: "L24",
        name: "Canarsie - Rockaway Pkwy",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.6467, lng: -73.9019 },
        neighbors: [
            { stationId: "L23", line: "L", travelTime: 3 }
        ]
    },
    {
        id: "L23",
        name: "East 105th St",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.6514, lng: -73.8984 },
        neighbors: [
            { stationId: "L24", line: "L", travelTime: 3 },
            { stationId: "L22", line: "L", travelTime: 2 }
        ]
    },
    {
        id: "L22",
        name: "New Lots Av",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.6583, lng: -73.8843 },
        neighbors: [
            { stationId: "L23", line: "L", travelTime: 2 },
            { stationId: "L21", line: "L", travelTime: 2 }
        ]
    },
    {
        id: "L21",
        name: "Livonia Av",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.6641, lng: -73.8709 },
        neighbors: [
            { stationId: "L22", line: "L", travelTime: 2 },
            { stationId: "L20", line: "L", travelTime: 2 }
        ]
    },
    {
        id: "L20",
        name: "Sutter Av",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.6691, lng: -73.8581 },
        neighbors: [
            { stationId: "L21", line: "L", travelTime: 2 },
            { stationId: "L19", line: "L", travelTime: 2 }
        ]
    },
    {
        id: "L19",
        name: "Atlantic Av",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.6755, lng: -73.8463 },
        neighbors: [
            { stationId: "L20", line: "L", travelTime: 2 },
            { stationId: "L17", line: "L", travelTime: 3 }
        ]
    },
    {
        id: "L17",
        name: "Wilson Av",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.6888, lng: -73.9045 },
        neighbors: [
            { stationId: "L19", line: "L", travelTime: 3 },
            { stationId: "L16", line: "L", travelTime: 2 }
        ]
    },
    {
        id: "L16",
        name: "Bushwick Av - Aberdeen St",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.6824, lng: -73.9058 },
        neighbors: [
            { stationId: "L17", line: "L", travelTime: 2 },
            { stationId: "L15", line: "L", travelTime: 2 }
        ]
    },
    {
        id: "L15",
        name: "Broadway Junction",
        borough: "Brooklyn",
        lines: ["L", "A", "C"],
        coordinates: { lat: 40.6785, lng: -73.9052 },
        neighbors: [
            { stationId: "L16", line: "L", travelTime: 2 },
            { stationId: "L14", line: "L", travelTime: 3 },
            // A/C line connections
            { stationId: "A42", line: "A", travelTime: 0 }, // transfer
            { stationId: "A42", line: "C", travelTime: 0 }  // transfer
        ]
    },
    {
        id: "L14",
        name: "Myrtle - Wyckoff Avs",
        borough: "Brooklyn",
        lines: ["L", "M"],
        coordinates: { lat: 40.6997, lng: -73.9122 },
        neighbors: [
            { stationId: "L15", line: "L", travelTime: 3 },
            { stationId: "L13", line: "L", travelTime: 2 },
            { stationId: "M18", line: "M", travelTime: 0 } // transfer
        ]
    },
    {
        id: "L13",
        name: "Halsey St",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.6956, lng: -73.9166 },
        neighbors: [
            { stationId: "L14", line: "L", travelTime: 2 },
            { stationId: "L12", line: "L", travelTime: 2 }
        ]
    },
    {
        id: "L12",
        name: "Gates Av",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.6898, lng: -73.9212 },
        neighbors: [
            { stationId: "L13", line: "L", travelTime: 2 },
            { stationId: "L11", line: "L", travelTime: 2 }
        ]
    },
    {
        id: "L11",
        name: "Jefferson St",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.6867, lng: -73.9228 },
        neighbors: [
            { stationId: "L12", line: "L", travelTime: 2 },
            { stationId: "L10", line: "L", travelTime: 2 }
        ]
    },
    {
        id: "L10",
        name: "DeKalb Av",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.6839, lng: -73.9183 },
        neighbors: [
            { stationId: "L11", line: "L", travelTime: 2 },
            { stationId: "L08", line: "L", travelTime: 2 }
        ]
    },
    {
        id: "L08",
        name: "Metropolitan Av",
        borough: "Brooklyn",
        lines: ["L", "G"],
        coordinates: { lat: 40.7121, lng: -73.9511 },
        neighbors: [
            { stationId: "L10", line: "L", travelTime: 2 },
            { stationId: "L06", line: "L", travelTime: 2 },
            { stationId: "G29", line: "G", travelTime: 0 } // transfer
        ]
    },
    {
        id: "L06",
        name: "Lorimer St",
        borough: "Brooklyn",
        lines: ["L"],
        coordinates: { lat: 40.7141, lng: -73.9501 },
        neighbors: [
            { stationId: "L08", line: "L", travelTime: 2 },
            { stationId: "L05", line: "L", travelTime: 2 }
        ]
    },

    // G Train - Brooklyn to Queens  
    {
        id: "G35",
        name: "Church Av",
        borough: "Brooklyn",
        lines: ["G"],
        coordinates: { lat: 40.6441, lng: -73.9496 },
        neighbors: [
            { stationId: "G34", line: "G", travelTime: 3 }
        ]
    },
    {
        id: "G34",
        name: "Fort Hamilton Pkwy",
        borough: "Brooklyn",
        lines: ["G"],
        coordinates: { lat: 40.6507, lng: -73.9756 },
        neighbors: [
            { stationId: "G35", line: "G", travelTime: 3 },
            { stationId: "G33", line: "G", travelTime: 2 }
        ]
    },
    {
        id: "G33",
        name: "15 St - Prospect Park",
        borough: "Brooklyn",
        lines: ["G"],
        coordinates: { lat: 40.6607, lng: -73.9796 },
        neighbors: [
            { stationId: "G34", line: "G", travelTime: 2 },
            { stationId: "G32", line: "G", travelTime: 2 }
        ]
    },
    {
        id: "G32",
        name: "4 Av - 9 St",
        borough: "Brooklyn",
        lines: ["G", "F", "R"],
        coordinates: { lat: 40.6701, lng: -73.9901 },
        neighbors: [
            { stationId: "G33", line: "G", travelTime: 2 },
            { stationId: "G31", line: "G", travelTime: 2 },
            { stationId: "F20", line: "F", travelTime: 0 }, // transfer
            { stationId: "R45", line: "R", travelTime: 0 }  // transfer
        ]
    },
    {
        id: "G31",
        name: "7 Av",
        borough: "Brooklyn",
        lines: ["G"],
        coordinates: { lat: 40.6772, lng: -73.9726 },
        neighbors: [
            { stationId: "G32", line: "G", travelTime: 2 },
            { stationId: "G30", line: "G", travelTime: 2 }
        ]
    },
    {
        id: "G30",
        name: "Bergen St",
        borough: "Brooklyn",
        lines: ["G"],
        coordinates: { lat: 40.6861, lng: -73.9901 },
        neighbors: [
            { stationId: "G31", line: "G", travelTime: 2 },
            { stationId: "G29", line: "G", travelTime: 2 }
        ]
    },
    {
        id: "G29",
        name: "Metropolitan Av - Lorimer St",
        borough: "Brooklyn",
        lines: ["G"],
        coordinates: { lat: 40.7121, lng: -73.9511 },
        neighbors: [
            { stationId: "G30", line: "G", travelTime: 2 },
            { stationId: "G28", line: "G", travelTime: 2 },
            { stationId: "L08", line: "L", travelTime: 0 } // transfer to L
        ]
    },
    {
        id: "G28",
        name: "Nassau Av",
        borough: "Brooklyn",
        lines: ["G"],
        coordinates: { lat: 40.7242, lng: -73.9506 },
        neighbors: [
            { stationId: "G29", line: "G", travelTime: 2 },
            { stationId: "G26", line: "G", travelTime: 3 }
        ]
    },
    {
        id: "G26",
        name: "Greenpoint Av",
        borough: "Brooklyn",
        lines: ["G"],
        coordinates: { lat: 40.7312, lng: -73.9536 },
        neighbors: [
            { stationId: "G28", line: "G", travelTime: 3 },
            { stationId: "G24", line: "G", travelTime: 2 }
        ]
    },
    {
        id: "G24",
        name: "21 St - Queensbridge",
        borough: "Queens",
        lines: ["G"],
        coordinates: { lat: 40.7538, lng: -73.9433 },
        neighbors: [
            { stationId: "G26", line: "G", travelTime: 2 },
            { stationId: "G22", line: "G", travelTime: 2 }
        ]
    },
    {
        id: "G22",
        name: "Court Sq - 23 St",
        borough: "Queens",
        lines: ["G", "E", "M", "7"],
        coordinates: { lat: 40.7467, lng: -73.9459 },
        neighbors: [
            { stationId: "G24", line: "G", travelTime: 2 },
            { stationId: "G20", line: "G", travelTime: 2 },
            // Major transfer hub
            { stationId: "E01", line: "E", travelTime: 0 },
            { stationId: "M11", line: "M", travelTime: 0 },
            { stationId: "705", line: "7", travelTime: 0 }
        ]
    },

    // 7 Train - Queens Focus
    {
        id: "701",
        name: "Flushing - Main St",
        borough: "Queens",
        lines: ["7"],
        coordinates: { lat: 40.7596, lng: -73.8303 },
        neighbors: [
            { stationId: "702", line: "7", travelTime: 2 }
        ]
    },
    {
        id: "702",
        name: "Mets - Willets Point",
        borough: "Queens",
        lines: ["7"],
        coordinates: { lat: 40.7547, lng: -73.8456 },
        neighbors: [
            { stationId: "701", line: "7", travelTime: 2 },
            { stationId: "703", line: "7", travelTime: 3 }
        ]
    },
    {
        id: "703",
        name: "111 St",
        borough: "Queens",
        lines: ["7"],
        coordinates: { lat: 40.7547, lng: -73.8553 },
        neighbors: [
            { stationId: "702", line: "7", travelTime: 3 },
            { stationId: "704", line: "7", travelTime: 2 }
        ]
    },
    {
        id: "704",
        name: "103 St - Corona Plaza",
        borough: "Queens",
        lines: ["7"],
        coordinates: { lat: 40.7497, lng: -73.8627 },
        neighbors: [
            { stationId: "703", line: "7", travelTime: 2 },
            { stationId: "705", line: "7", travelTime: 3 }
        ]
    },
    {
        id: "705",
        name: "Junction Blvd",
        borough: "Queens",
        lines: ["7"],
        coordinates: { lat: 40.7497, lng: -73.8699 },
        neighbors: [
            { stationId: "704", line: "7", travelTime: 3 },
            { stationId: "706", line: "7", travelTime: 2 }
        ]
    },
    {
        id: "706",
        name: "90 St - Elmhurst Av",
        borough: "Queens",
        lines: ["7"],
        coordinates: { lat: 40.7488, lng: -73.8761 },
        neighbors: [
            { stationId: "705", line: "7", travelTime: 2 },
            { stationId: "707", line: "7", travelTime: 2 }
        ]
    },
    {
        id: "707",
        name: "82 St - Jackson Heights",
        borough: "Queens",
        lines: ["7"],
        coordinates: { lat: 40.7478, lng: -73.8827 },
        neighbors: [
            { stationId: "706", line: "7", travelTime: 2 },
            { stationId: "708", line: "7", travelTime: 2 }
        ]
    },
    {
        id: "708",
        name: "74 St - Broadway",
        borough: "Queens",
        lines: ["7", "E", "F", "M", "R"],
        coordinates: { lat: 40.7467, lng: -73.8908 },
        neighbors: [
            { stationId: "707", line: "7", travelTime: 2 },
            { stationId: "709", line: "7", travelTime: 2 },
            // Major transfer hub
            { stationId: "E06", line: "E", travelTime: 0 },
            { stationId: "F04", line: "F", travelTime: 0 },
            { stationId: "M12", line: "M", travelTime: 0 },
            { stationId: "R09", line: "R", travelTime: 0 }
        ]
    },

    // Sample A/C line stations for transfers
    {
        id: "A42",
        name: "Broadway Junction",
        borough: "Brooklyn",
        lines: ["A", "C"],
        coordinates: { lat: 40.6785, lng: -73.9052 },
        neighbors: [
            { stationId: "L15", line: "L", travelTime: 0 }, // transfer
            { stationId: "A41", line: "A", travelTime: 3 },
            { stationId: "A41", line: "C", travelTime: 3 }
        ]
    },

    // Sample additional stations for connectivity
    {
        id: "F04",
        name: "Roosevelt Av - Jackson Heights",
        borough: "Queens",
        lines: ["F"],
        coordinates: { lat: 40.7467, lng: -73.8908 },
        neighbors: [
            { stationId: "708", line: "7", travelTime: 0 }, // transfer
            { stationId: "F05", line: "F", travelTime: 3 }
        ]
    }
];