export interface Station {
    id: string;
    name: string;
    // borough: "Queens" | "Brooklyn" | "Manhattan" | "Staten Island" | "Bronx";
    coordinates: { x: number; y: number };
    connections: Array<{
        stationId: string;
        travelTime: number; // minutes
    }>;
} 