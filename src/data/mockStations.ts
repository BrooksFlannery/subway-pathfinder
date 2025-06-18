// import { Station } from '../types/station';

// export const MOCK_STATIONS: Station[] = 
[
    {
        id: "Middle Village-Metropolitan Av",
        name: "Middle Village-Metropolitan Av",
        // borough: "Queens",
        coordinates: { x: 500, y: 300 },
        connections: [
            { stationId: "Fresh Pond Rd", travelTime: 3 },
        ]
    },
    {
        id: "Fresh Pond Rd",
        name: "Fresh Pond Rd",
        borough: "Queens",
        coordinates: { x: 500, y: 350 },
        connections: [
            { stationId: "Middle Village-Metropolitan Av", travelTime: 3 },
            { stationId: "Forest Av", travelTime: 3 }
        ]
    },
    {
        id: "Forest Av",
        name: "Forest Av",
        borough: "Queens",
        coordinates: { x: 500, y: 400 },
        connections: [
            { stationId: "Fresh Pond Rd", travelTime: 3 },
            { stationId: "Seneca Av", travelTime: 3 }
        ]
    },
    {
        id: "Seneca Av",
        name: "Seneca Av",
        borough: "Queens",
        coordinates: { x: 500, y: 450 },
        connections: [
            { stationId: "Forest Av", travelTime: 3 },
            { stationId: "Myrtle Wyckoff Avs", travelTime: 3 }
        ]
    },
    {
        id: "Myrtle Wyckoff Avs",
        name: "Myrtle Wyckoff Avs",
        borough: "Queens",
        coordinates: { x: 500, y: 500 },
        connections: [
            { stationId: "Seneca Av", travelTime: 3 },
            { stationId: "Dekalb Av", travelTime: 3 },
            { stationId: "Knickerbocker Av", travelTime: 3 }
        ]
    },
    {
        id: "Knickerbocker Av",
        name: "Knickerbocker Av",
        borough: "Queens",
        coordinates: { x: 500, y: 550 },
        connections: [
            { stationId: "Myrtle Wyckoff Avs", travelTime: 3 },
            { stationId: "Central Av", travelTime: 3 }
        ]
    },
    {
        id: "Central Av",
        name: "Central Av",
        borough: "Queens",
        coordinates: { x: 450, y: 600 },
        connections: [
            { stationId: "Knickerbocker Av", travelTime: 3 },
            { stationId: "Myrtle Av", travelTime: 3 }
        ]
    },
    {
        id: "Myrtle Av",
        name: "Myrtle Av",
        borough: "Queens",
        coordinates: { x: 400, y: 650 },
        connections: [
            { stationId: "Central Av", travelTime: 3 },
            { stationId: "Flushing Av-M", travelTime: 3 }
        ]
    },
    {
        id: "Flushing Av-M",
        name: "Flushing Av",
        borough: "Queens",
        coordinates: { x: 350, y: 650 },
        connections: [
            { stationId: "Myrtle Av", travelTime: 3 },
            { stationId: "Flushing Av-G", travelTime: 0 },

        ]
    },
    {
        id: "Dekalb Av",
        name: "Dekalb Av",
        borough: "Queens",
        coordinates: { x: 450, y: 500 },
        connections: [
            { stationId: "Myrtle Wyckoff Avs", travelTime: 3 },
            { stationId: "Jefferson St", travelTime: 3 }
        ]
    },
    {
        id: "Jefferson St",
        name: "Jefferson St",
        borough: "Queens",
        coordinates: { x: 400, y: 500 },
        connections: [
            { stationId: "Dekalb Av", travelTime: 3 },
            { stationId: "Morgan Av", travelTime: 3 }
        ]
    },
    {
        id: "Morgan Av",
        name: "Morgan Av",
        borough: "Queens",
        coordinates: { x: 350, y: 500 },
        connections: [
            { stationId: "Jefferson St", travelTime: 3 },
            { stationId: "Montrose Av", travelTime: 3 }
        ]
    },
    {
        id: "Montrose Av",
        name: "Montrose Av",
        borough: "Queens",
        coordinates: { x: 300, y: 500 },
        connections: [
            { stationId: "Morgan Av", travelTime: 3 },
            { stationId: "Grand St", travelTime: 3 }
        ]
    },
    {
        id: "Grand St",
        name: "Grand St",
        borough: "Queens",
        coordinates: { x: 250, y: 480 },
        connections: [
            { stationId: "Montrose Av", travelTime: 3 },
            { stationId: "Graham Av", travelTime: 3 }
        ]
    },
    {
        id: "Graham Av",
        name: "Graham Av",
        borough: "Queens",
        coordinates: { x: 200, y: 430 },
        connections: [
            { stationId: "Grand St", travelTime: 3 },
            { stationId: "Lorimer St", travelTime: 3 }
        ]
    },
    {
        id: "Lorimer St",
        name: "Lorimer St",
        borough: "Queens",
        coordinates: { x: 150, y: 480 },
        connections: [
            { stationId: "Graham Av", travelTime: 3 },
            { stationId: "Metropolitan Av", travelTime: 0 }
        ]
    },
    {
        id: "Metropolitan Av",
        name: "Metropolitan Av",
        borough: "Queens",
        coordinates: { x: 150, y: 500 },
        connections: [
            { stationId: "Lorimer St", travelTime: 0 },
            { stationId: "Broadway", travelTime: 3 }
        ]
    },
    {
        id: "Broadway",
        name: "Broadway",
        borough: "Queens",
        coordinates: { x: 250, y: 600 },
        connections: [
            { stationId: "Metropolitan Av", travelTime: 3 },
            { stationId: "Flushing Av-G", travelTime: 3 }
        ]
    },
    {
        id: "Flushing Av-G",
        name: "Flushing Av",
        borough: "Queens",
        coordinates: { x: 320, y: 670 },
        connections: [
            { stationId: "Broadway", travelTime: 3 },
            { stationId: "Myrtle-Willoughby Avs", travelTime: 3 },
            { stationId: "Flushing Av-M", travelTime: 0 },

        ]
    },
    {
        id: "Myrtle-Willoughby Avs",
        name: "Myrtle-Willoughby Avs",
        borough: "Queens",
        coordinates: { x: 320, y: 730 },
        connections: [
            { stationId: "Flushing Av-G", travelTime: 3 },
            { stationId: "Bedford-Nostrand Avs", travelTime: 3 }
        ]
    },
    {
        id: "Bedford-Nostrand Avs",
        name: "Bedford-Nostrand Avs",
        borough: "Queens",
        coordinates: { x: 320, y: 780 },
        connections: [
            { stationId: "Myrtle-Willoughby Avs", travelTime: 3 }
        ]
    }
];