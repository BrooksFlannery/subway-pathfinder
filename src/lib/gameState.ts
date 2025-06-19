// Game State Management for NYC Subway Pathfinding Game

import { Station } from '../types/station';
import { buildStationGraph, getRandomStationPair } from '@/lib/stationUtils'

export interface GameMove {
    stationId: string;
    timestamp: number;
}

export interface GameState {
    startStation: Station;
    endStation: Station;
    currentStation: Station;
    playerPath: GameMove[];
    gameStatus: 'not-started' | 'playing' | 'won' | 'lost';
    gameStartTime: number;
    gameEndTime?: number;
    availableMoves: Array<{
        station: Station;
        travelTime: number;
    }>;
    totalTravelTime: number;
    transferCount: number;
    moveCount: number;
    lastMove?: GameMove;
}

export class SubwayGame {
    private stationGraph: Map<string, Station>;
    private gameState: GameState;

    constructor() {
        this.stationGraph = buildStationGraph();
        const { start, end } = getRandomStationPair();

        const initialMoves = this.calculateAvailableMoves(start);

        this.gameState = {
            startStation: start,
            endStation: end,
            currentStation: start,
            playerPath: [],
            gameStatus: 'not-started',
            gameStartTime: 0,
            availableMoves: initialMoves,
            totalTravelTime: 0,
            transferCount: 0,
            moveCount: 0,
            lastMove: undefined
        };
    }

    private calculateAvailableMoves(station: Station, previousStationId?: string): Array<{
        station: Station;
        travelTime: number;
    }> {
        const moves: Array<{
            station: Station;
            travelTime: number;
        }> = [];

        station.connections.forEach(connection => {
            const connectedStation = this.stationGraph.get(connection.stationId);
            if (connectedStation && (!previousStationId || connectedStation.id !== previousStationId)) {
                moves.push({
                    station: connectedStation,
                    travelTime: connection.travelTime
                });
            }
        });

        return moves;
    }

    private getAvailableMoves(station: Station): Array<{
        station: Station;
        travelTime: number;
    }> {
        const previousStationId = this.gameState.lastMove?.stationId;
        return this.calculateAvailableMoves(station, previousStationId);
    }

    startGame(): GameState {
        this.gameState.gameStatus = 'playing';
        this.gameState.gameStartTime = Date.now();
        return this.getGameState();
    }

    getGameState(): GameState {
        return { ...this.gameState };
    }

    makeMove(targetStationId: string): {
        success: boolean;
        message: string;
        gameState: GameState;
    } {
        if (this.gameState.gameStatus !== 'playing') {
            return {
                success: false,
                message: 'Game is not active. Start a new game first.',
                gameState: this.getGameState()
            };
        }

        const spoofStation = this.stationGraph.get(targetStationId);

        if (!spoofStation) {
            return {
                success: false,
                message: `Invalid station ID: ${targetStationId}`,
                gameState: this.getGameState()
            };
        }

        const validMove = {
            station: spoofStation,
            travelTime: 3
        };

        if (!validMove) {
            return {
                success: false,
                message: `Invalid move. You cannot travel from ${this.gameState.currentStation.name} to station ${targetStationId}.`,
                gameState: this.getGameState()
            };
        }

        const move: GameMove = {
            stationId: targetStationId,
            timestamp: Date.now()
        };

        this.gameState.currentStation = validMove.station;
        this.gameState.playerPath.push(move);
        this.gameState.lastMove = move;
        this.gameState.totalTravelTime += validMove.travelTime;
        this.gameState.moveCount++;
        this.gameState.availableMoves = this.getAvailableMoves(this.gameState.currentStation);

        if (this.gameState.currentStation.id === this.gameState.endStation.id) {
            this.gameState.gameStatus = 'won';
            this.gameState.gameEndTime = Date.now();
        }

        return {
            success: true,
            message: `Moved to ${validMove.station.name}`,
            gameState: this.getGameState()
        };
    }

    getPathDescription(): string[] {
        if (this.gameState.playerPath.length === 0) {
            return [`Starting at: ${this.gameState.startStation.name}`];
        }

        const descriptions = [`Started at: ${this.gameState.startStation.name}`];

        this.gameState.playerPath.forEach((move, index) => {
            const station = this.stationGraph.get(move.stationId);
            if (station) {
                descriptions.push(`${index + 1}. ${station.name}`);
            }
        });

        return descriptions;
    }

    getGameStats(): {
        movesUsed: number;
        totalTime: number;
        transfers: number;
        gameTimeSeconds: number;
        efficiency?: number;
    } {
        const gameTimeMs = this.gameState.gameEndTime
            ? this.gameState.gameEndTime - this.gameState.gameStartTime
            : Date.now() - this.gameState.gameStartTime;

        return {
            movesUsed: this.gameState.moveCount,
            totalTime: this.gameState.totalTravelTime,
            transfers: this.gameState.transferCount,
            gameTimeSeconds: Math.floor(gameTimeMs / 1000)
        };
    }

    newGame(): GameState {
        const { start, end } = getRandomStationPair();

        const initialMoves = this.calculateAvailableMoves(start);

        this.gameState = {
            startStation: start,
            endStation: end,
            currentStation: start,
            playerPath: [],
            gameStatus: 'not-started',
            gameStartTime: 0,
            availableMoves: initialMoves,
            totalTravelTime: 0,
            transferCount: 0,
            moveCount: 0,
            lastMove: undefined
        };

        return this.startGame();
    }

    restartGame(): GameState {
        const { startStation, endStation } = this.gameState;

        this.gameState = {
            startStation,
            endStation,
            currentStation: startStation,
            playerPath: [],
            gameStatus: 'playing',
            gameStartTime: Date.now(),
            availableMoves: this.getAvailableMoves(startStation),
            totalTravelTime: 0,
            transferCount: 0,
            moveCount: 0
        };

        return this.getGameState();
    }

    isValidMove(targetStationId: string): boolean {
        return this.gameState.availableMoves.some(
            move => move.station.id === targetStationId
        );
    }

    getHint(): string[] {
        return this.gameState.availableMoves.map(move =>
            `${move.station.name} (${move.travelTime} min)`
        );
    }

    isAtDestination(): boolean {
        return this.gameState.currentStation.id === this.gameState.endStation.id;
    }

    getPathStationIds(): string[] {
        const ids = [this.gameState.startStation.id];
        this.gameState.playerPath.forEach(move => {
            ids.push(move.stationId);
        });
        return ids;
    }
}

export function createSubwayGame(): SubwayGame {
    return new SubwayGame();
}

export function isGameActive(gameState: GameState): boolean {
    return gameState.gameStatus === 'playing';
}

export function isGameWon(gameState: GameState): boolean {
    return gameState.gameStatus === 'won';
}

export function isGameOver(gameState: GameState): boolean {
    return gameState.gameStatus === 'won' || gameState.gameStatus === 'lost';
}
