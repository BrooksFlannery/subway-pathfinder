import { Station } from '../types/station';

export const MOCK_STATIONS: Station[] = [
    {
        id: "N1",
        name: "North Terminal",
        borough: "Manhattan",
        coordinates: { lat: 40.8000, lng: -73.9800 },
        connections: [
            { stationId: "WM1", travelTime: 3 },
            { stationId: "EM1", travelTime: 3 }
        ]
    },
    {
        id: "WM1",
        name: "West Mid Terminal",
        borough: "Manhattan",
        coordinates: { lat: 40.7800, lng: -74.0000 },
        connections: [
            { stationId: "N1", travelTime: 3 },
            { stationId: "S1", travelTime: 3 }
        ]
    },
    {
        id: "EM1",
        name: "East Mid Terminal",
        borough: "Manhattan",
        coordinates: { lat: 40.7800, lng: -73.9600 },
        connections: [
            { stationId: "N1", travelTime: 3 },
            { stationId: "E1", travelTime: 3 }
        ]
    },
    {
        id: "S1",
        name: "South Terminal",
        borough: "Manhattan",
        coordinates: { lat: 40.7600, lng: -73.9800 },
        connections: [
            { stationId: "WM1", travelTime: 3 },
            { stationId: "C1", travelTime: 3 }
        ]
    },
    {
        id: "E1",
        name: "East Terminal",
        borough: "Manhattan",
        coordinates: { lat: 40.7600, lng: -73.9400 },
        connections: [
            { stationId: "EM1", travelTime: 3 },
            { stationId: "C1", travelTime: 3 }
        ]
    },
    {
        id: "C1",
        name: "Central Terminal",
        borough: "Manhattan",
        coordinates: { lat: 40.7600, lng: -73.9600 },
        connections: [
            { stationId: "S1", travelTime: 3 },
            { stationId: "E1", travelTime: 3 }
        ]
    }
]; 