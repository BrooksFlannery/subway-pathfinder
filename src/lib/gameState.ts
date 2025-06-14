// Game State Management for NYC Subway Pathfinding Game

import { Station, MOCK_STATIONS, buildStationGraph, getRandomStationPair } from '../data/stations';

export interface GameMove {
    stationId: string;
    line: string;
    timestamp: number;
}

export interface GameState {
    // Core game data
    startStation: Station;
    endStation: Station;
    currentStation: Station;

    // User's path
    playerPath: GameMove[];

    // Game status
    gameStatus: 'playing' | 'won' | 'lost' | 'not-started';
    gameStartTime: number;
    gameEndTime?: number;

    // Move validation
    lastMove?: GameMove;
    availableMoves: Array<{
        station: Station;
        line: string;
        travelTime: number;
    }>;

    // Stats
    totalTravelTime: number;
    transferCount: number;
    moveCount: number;
}

export class SubwayGame {
    private stationGraph: Map<string, Station>;
    private gameState: GameState;

    constructor() {
        this.stationGraph = buildStationGraph();
        this.gameState = this.initializeGame();
    }

    // Initialize a new game
    private initializeGame(): GameState {
        const { start, end } = getRandomStationPair();

        return {
            startStation: start,
            endStation: end,
            currentStation: start,
            playerPath: [],
            gameStatus: 'not-started',
            gameStartTime: 0,
            availableMoves: this.getAvailableMoves(start),
            totalTravelTime: 0,
            transferCount: 0,
            moveCount: 0
        };
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

    // Get available moves from current station
    private getAvailableMoves(station: Station): Array<{
        station: Station;
        line: string;
        travelTime: number;
    }> {
        const moves: Array<{
            station: Station;
            line: string;
            travelTime: number;
        }> = [];

        station.neighbors.forEach(neighbor => {
            const neighborStation = this.stationGraph.get(neighbor.stationId);
            if (neighborStation) {
                moves.push({
                    station: neighborStation,
                    line: neighbor.line,
                    travelTime: neighbor.travelTime
                });
            }
        });

        return moves;
    }

    // Make a move to another station
    makeMove(targetStationId: string, line: string): {
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

        // Validate the move
        const validMove = this.gameState.availableMoves.find(
            move => move.station.id === targetStationId && move.line === line
        );

        if (!validMove) {
            return {
                success: false,
                message: `Invalid move. You cannot travel from ${this.gameState.currentStation.name} to station ${targetStationId} via ${line} line.`,
                gameState: this.getGameState()
            };
        }

        // Execute the move
        const move: GameMove = {
            stationId: targetStationId,
            line: line,
            timestamp: Date.now()
        };

        // Update game state
        this.gameState.currentStation = validMove.station;
        this.gameState.playerPath.push(move);
        this.gameState.lastMove = move;
        this.gameState.totalTravelTime += validMove.travelTime;
        this.gameState.moveCount++;

        // Check for transfers (line change)
        if (this.gameState.playerPath.length > 1) {
            const previousMove = this.gameState.playerPath[this.gameState.playerPath.length - 2];
            if (previousMove.line !== line) {
                this.gameState.transferCount++;
            }
        }

        // Update available moves
        this.gameState.availableMoves = this.getAvailableMoves(this.gameState.currentStation);

        // Check win condition
        if (this.gameState.currentStation.id === this.gameState.endStation.id) {
            this.gameState.gameStatus = 'won';
            this.gameState.gameEndTime = Date.now();
        }

        return {
            success: true,
            message: `Moved to ${validMove.station.name} via ${line} line`,
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
                const isTransfer = index > 0 && this.gameState.playerPath[index - 1].line !== move.line;
                const transferText = isTransfer ? ' (TRANSFER)' : '';
                descriptions.push(`${index + 1}. ${station.name} via ${move.line} line${transferText}`);
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
        this.gameState = this.initializeGame();
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
    isValidMove(targetStationId: string, line: string): boolean {
        return this.gameState.availableMoves.some(
            move => move.station.id === targetStationId && move.line === line
        );
    }

    // Get hint: show all valid next moves
    getHint(): string[] {
        return this.gameState.availableMoves.map(move =>
            `${move.station.name} via ${move.line} line (${move.travelTime} min)`
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