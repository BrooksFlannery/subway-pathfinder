
export type Train = {
    currentStation: Station;
    nextArrivalTurn: number;
    line: TrainLine;//idk if its weird to have them point at each other
    id: string;
    isAtStation: boolean;
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
    trains: Train[]
}

export type GameManager = {
    game: GameState | null;
    makeMove: (next: Station) => void;
    boardTrain: (train: Train) => void;
    advanceTurn: () => void;
    switchToTrainMode: () => void;
    switchToStationMode: () => void;
}