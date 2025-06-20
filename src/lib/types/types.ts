import { getRandomStationPair } from "../stationUtils";

export type Train = {
    currentStation: Station;
    nextArrivalTurn: number;
    line: TrainLine;//idk if its weird to have them point at each other
}

export type TrainLine = {
    id: string;
    name: string;
    trains: Train[];
    line: Station["id"][];
}

export type Station = {
    id: string,
    name: string,
    walkable?: string[];
    lines: TrainLine['id'][];
    borough?: "Queens" | "Brooklyn" | "Manhattan" | "Staten Island" | "Bronx";
    coordinates: { x: number; y: number };
}

export type GameState = {
    turnNumber: number;
    currentStation: Station;
    currentTrain: Train | null;
    reputation: number;
    playerMode: 'station' | 'train'
    destinationStation: Station;
}

export function startGame() {
    const { start, end } = getRandomStationPair()
    const startState: GameState = {
        turnNumber: 0,
        currentStation: start,
        destinationStation: end,
        reputation: 0,
        playerMode: 'station',
        currentTrain: null
    }
    return startState
}