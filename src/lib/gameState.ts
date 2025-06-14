// Game State Management for NYC Subway Pathfinding Game

import { Station, buildStationGraph, getRandomStationPair } from '../data/stations';

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
        console.log('Initializing game with stations:', {
            start: start.name,
            end: end.name
        });

        // Initialize game state with all available moves from start
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

    // Helper function to calculate available moves without accessing gameState
    private calculateAvailableMoves(station: Station, previousStationId?: string): Array<{
        station: Station;
        travelTime: number;
    }> {
        const moves: Array<{
            station: Station;
            travelTime: number;
        }> = [];

        console.log('Calculating moves from:', station.name);
        console.log('Station connections:', station.connections);

        station.connections.forEach(connection => {
            const connectedStation = this.stationGraph.get(connection.stationId);
            if (connectedStation && (!previousStationId || connectedStation.id !== previousStationId)) {
                moves.push({
                    station: connectedStation,
                    travelTime: connection.travelTime
                });
                console.log('Added move to:', connectedStation.name);
            } else if (connectedStation) {
                console.log('Skipping previous station:', connectedStation.name);
            } else {
                console.warn('Could not find connected station:', connection.stationId);
            }
        });

        console.log('Available moves:', moves.map(m => m.station.name));
        return moves;
    }

    // Get available moves from current station
    private getAvailableMoves(station: Station): Array<{
        station: Station;
        travelTime: number;
    }> {
        const previousStationId = this.gameState.lastMove?.stationId;
        return this.calculateAvailableMoves(station, previousStationId);
    }

    // Start a new game
    startGame(): GameState {
        this.gameState.gameStatus = 'playing';
        this.gameState.gameStartTime = Date.now();
        return this.getGameState();
    }

    // Get current game state (readonly)
    getGameState(): GameState {
        return { ...this.gameState };
    }

    // Make a move to another station
    makeMove(targetStationId: string): {
        success: boolean;
        message: string;
        gameState: GameState;
    } {
        // Check if game is active
        if (this.gameState.gameStatus !== 'playing') {
            return {
                success: false,
                message: 'Game is not active. Start a new game first.',
                gameState: this.getGameState()
            };
        }

        console.log('=== Move Attempt Details ===');
        console.log('Target station ID:', targetStationId);
        console.log('Current station:', {
            id: this.gameState.currentStation.id,
            name: this.gameState.currentStation.name
        });
        console.log('Available moves:', this.gameState.availableMoves.map(m => ({
            id: m.station.id,
            name: m.station.name,
            travelTime: m.travelTime
        })));

        // Validate the move
        const validMove = this.gameState.availableMoves.find(
            move => move.station.id === targetStationId
        );

        if (!validMove) {
            console.log('Move validation failed:', {
                targetId: targetStationId,
                availableIds: this.gameState.availableMoves.map(m => m.station.id)
            });
            return {
                success: false,
                message: `Invalid move. You cannot travel from ${this.gameState.currentStation.name} to station ${targetStationId}.`,
                gameState: this.getGameState()
            };
        }

        console.log('Move validated successfully:', {
            from: this.gameState.currentStation.name,
            to: validMove.station.name,
            travelTime: validMove.travelTime
        });

        // Execute the move
        const move: GameMove = {
            stationId: targetStationId,
            timestamp: Date.now()
        };

        // Update game state
        this.gameState.currentStation = validMove.station;
        this.gameState.playerPath.push(move);
        this.gameState.lastMove = move;
        this.gameState.totalTravelTime += validMove.travelTime;
        this.gameState.moveCount++;

        // Update available moves
        this.gameState.availableMoves = this.getAvailableMoves(this.gameState.currentStation);

        // Check win condition
        if (this.gameState.currentStation.id === this.gameState.endStation.id) {
            this.gameState.gameStatus = 'won';
            this.gameState.gameEndTime = Date.now();
        }

        console.log('=== Move Complete ===');
        console.log('New current station:', {
            id: this.gameState.currentStation.id,
            name: this.gameState.currentStation.name
        });
        console.log('New available moves:', this.gameState.availableMoves.map(m => ({
            id: m.station.id,
            name: m.station.name,
            travelTime: m.travelTime
        })));

        return {
            success: true,
            message: `Moved to ${validMove.station.name}`,
            gameState: this.getGameState()
        };
    }

    // Get path as readable format
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

    // Get game statistics
    getGameStats(): {
        movesUsed: number;
        totalTime: number;
        transfers: number;
        gameTimeSeconds: number;
        efficiency?: number; // Will be calculated vs optimal path later
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

    // Reset game with new random stations
    newGame(): GameState {
        const { start, end } = getRandomStationPair();
        console.log('Initializing game with stations:', {
            start: start.name,
            end: end.name
        });

        // Initialize game state with all available moves from start
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

    // Reset game with same stations (for retry)
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

    // Validate if a move is legal (without executing it)
    isValidMove(targetStationId: string): boolean {
        return this.gameState.availableMoves.some(
            move => move.station.id === targetStationId
        );
    }

    // Get hint: show all valid next moves
    getHint(): string[] {
        return this.gameState.availableMoves.map(move =>
            `${move.station.name} (${move.travelTime} min)`
        );
    }

    // Check if current station is the destination
    isAtDestination(): boolean {
        return this.gameState.currentStation.id === this.gameState.endStation.id;
    }

    // Get stations in path (for UI highlighting)
    getPathStationIds(): string[] {
        const ids = [this.gameState.startStation.id];
        this.gameState.playerPath.forEach(move => {
            ids.push(move.stationId);
        });
        return ids;
    }
}

// Factory function for creating game instance
export function createSubwayGame(): SubwayGame {
    return new SubwayGame();
}

// Type guards and utilities
export function isGameActive(gameState: GameState): boolean {
    return gameState.gameStatus === 'playing';
}

export function isGameWon(gameState: GameState): boolean {
    return gameState.gameStatus === 'won';
}

export function isGameOver(gameState: GameState): boolean {
    return gameState.gameStatus === 'won' || gameState.gameStatus === 'lost';
}