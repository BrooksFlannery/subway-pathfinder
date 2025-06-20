import { buildLineGraph, buildStationGraph } from "@/lib/stationUtils";
import { GameManager, GameState, Station, Train, TrainLine } from "@/lib/types/types";
import { useEffect, useMemo, useState } from "react";

export function useGame(): GameManager {
    const stationMap = useMemo(() => buildStationGraph(), []);
    const lineMap = useMemo(() => buildLineGraph(), [])
    const [game, setGame] = useState<GameState | null>(null);
    const [trains, setTrains] = useState<Train[]>([]);

    useEffect(() => {
        const middleVillage = stationMap.get("station-748");
        const myrtleWyckoff = stationMap.get("station-702");
        const mLine = lineMap.get("line-25");

        if (!middleVillage || !myrtleWyckoff || !mLine) return;

        const initialTrains: Train[] = [{
            currentStation: middleVillage,
            nextArrivalTurn: 3,
            line: mLine,
            id: 'train-1',
            isAtStation: true,
        }];

        setGame({
            turnNumber: 0,
            currentStation: middleVillage,
            destinationStation: myrtleWyckoff,
            reputation: 0,
            playerMode: 'station',
            currentTrain: null,
            trains: initialTrains
        });

        setTrains(initialTrains);
    }, [stationMap]);

    useEffect(() => {
        if (!game || game.turnNumber === 0) return;
        incrementTrains();
    }, [game?.turnNumber]);

    useEffect(() => {
        if (!game) return;
        incrementPlayer();
    }, [trains]);

    useEffect(() => {
        // keep the trains array inside the game state in sync so UI components relying on game.trains stay updated
        setGame(prev => prev ? { ...prev, trains } : prev);
    }, [trains]);

    function incrementTrains() {
        setTrains(prevTrains =>
            prevTrains.map(train => {
                const nextTurn = train.nextArrivalTurn - 1;
                if (nextTurn > 0) return { ...train, nextArrivalTurn: nextTurn, isAtStation: false };

                const nextStation = getNextStationFromLine(train.currentStation, train.line);
                if (!nextStation) return train; // need to kick off rider and reset at start of line

                return {
                    ...train,
                    currentStation: { ...nextStation },
                    nextArrivalTurn: 3,
                    isAtStation: true,
                };
            })
        );
    }
    function incrementPlayer() {
        setGame(prev => {
            if (!prev?.currentTrain) return prev;

            const updatedTrain = trains.find(train => train.id === prev.currentTrain!.id);//we should prob make a trainMap as well
            if (!updatedTrain || !updatedTrain.isAtStation) {
                console.log('player didnt update');
                console.log(updatedTrain);
                return prev;
            }

            console.log('player DID update');

            return {
                ...prev,
                currentTrain: updatedTrain,
                currentStation: updatedTrain.currentStation
            };
        });
    }

    function getNextStationFromLine(currentStation: Station, trainLine: TrainLine): Station | null {
        const idx = trainLine.line.findIndex(id => stationMap.get(id)?.id === currentStation.id);
        if (idx === -1 || idx + 1 >= trainLine.line.length) return null;
        return stationMap.get(trainLine.line[idx + 1]) ?? null;
    }

    function advanceTurn() {
        if (!game) return;
        setGame(prev => prev ? { ...prev, turnNumber: prev.turnNumber + 1 } : prev);
    }

    function makeMove(next: Station) {
        if (!game || !game.currentStation.walkable?.includes(next.id)) return;
        setGame(prev => prev ? { ...prev, currentStation: next } : prev);
    }
    function boardTrain(train: Train) {
        setGame(prev => prev ? { ...prev, currentTrain: train, playerMode: 'train' } : prev);
        console.log('actually boarded', train.id)
    }

    return {
        game,
        makeMove,
        boardTrain,
        advanceTurn,
        switchToTrainMode: () => setGame(prev => prev ? { ...prev, playerMode: 'train' } : prev),
        switchToStationMode: () => setGame(prev => prev ? { ...prev, playerMode: 'station' } : prev),
    };
}
