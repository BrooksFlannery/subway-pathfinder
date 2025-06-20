import { allLines } from './data/lines';
import { REAL_STATIONS } from './data/realStations';
import { Station, Train, TrainLine } from './types/types';

//i think this is useful for fast lookups?
export function buildStationGraph(): Map<string, Station> {
    const stationMap = new Map<string, Station>();
    REAL_STATIONS.forEach((station: Station) => {
        stationMap.set(station.id, station);
    });
    return stationMap;
}

export function buildLineGraph(): Map<string, TrainLine> {
    const lineMap = new Map<string, TrainLine>();
    allLines.forEach((line: TrainLine) => {
        lineMap.set(line.id, line);
    });
    return lineMap;
}

// Helper function to get random start/end pair
export function getRandomStationPair(): { start: Station; end: Station } {
    const stations = REAL_STATIONS;
    const start = stations[Math.floor(Math.random() * stations.length)];
    let end = stations[Math.floor(Math.random() * stations.length)];

    // Ensure start and end are different
    while (end.id === start.id) {
        end = stations[Math.floor(Math.random() * stations.length)];
    }

    return { start, end };
}
export function seedTrains(): Train[] {
    const totalTrains: Train[] = []
    let totalTrainId: number = 1
    const minSkip = 5;
    const maxSkip = 8;

    allLines.forEach((line) => {
        totalTrains.push(seedTrain(line, 0, totalTrainId));
        totalTrainId++;

        let currentStationIndex = 0;
        while (currentStationIndex < line.line.length - 1) {
            const skip = Math.floor(Math.random() * (maxSkip - minSkip + 1)) + minSkip;
            currentStationIndex += skip;

            if (currentStationIndex < line.line.length) {
                totalTrains.push(seedTrain(line, currentStationIndex, totalTrainId));
                totalTrainId++;
            }
        }
    });

    return totalTrains;
}

function seedTrain(line: TrainLine, stationIndex: number, id: number): Train {
    const stationId = line.line[stationIndex];
    const newTrain: Train = {
        currentStation: REAL_STATIONS.find(station => station.id === stationId)!,
        nextArrivalTurn: 1,
        line: line,
        id: `train-${id}`,
        isAtStation: true,
    }
    console.log(newTrain)
    return newTrain
}