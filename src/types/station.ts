export interface Station {
    id: string;
    name: string;
    borough: "Queens" | "Brooklyn" | "Manhattan" | "Staten Island" | "Bronx";
    coordinates: { lat: number; lng: number };
    connections: Array<{
        stationId: string;
        travelTime: number; // minutes
    }>;
} 