// CLI Implementation for NYC Subway Pathfinding Game
// Run with: npx ts-node src/cli/game.ts

import * as readline from 'readline';
import { createSubwayGame, SubwayGame, GameState } from '../lib/gameState';

class SubwayCLI {
    private game: SubwayGame;
    private rl: readline.Interface;

    constructor() {
        this.game = createSubwayGame();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Main game loop
    async start(): Promise<void> {
        console.log('🚇 NYC SUBWAY PATHFINDER GAME 🚇\n');
        console.log('Navigate from your start station to your destination!');
        console.log('Choose your moves wisely - we\'ll compare to the optimal path.\n');

        await this.newGame();
    }

    // Start a new game
    private async newGame(): Promise<void> {
        const gameState = this.game.startGame();
        this.displayGameStart(gameState);
        await this.gameLoop();
    }

    // Display game start information
    private displayGameStart(gameState: GameState): void {
        console.log('═══════════════════════════════════════');
        console.log('🎯 NEW GAME STARTED');
        console.log('═══════════════════════════════════════');
        console.log(`📍 START: ${gameState.startStation.name} (${gameState.startStation.borough})`);
        console.log(`🏁 DESTINATION: ${gameState.endStation.name} (${gameState.endStation.borough})`);
        console.log(`🚉 CURRENT: ${gameState.currentStation.name}`);
        console.log('═══════════════════════════════════════\n');
    }

    // Main game loop
    private async gameLoop(): Promise<void> {
        while (true) {
            const gameState = this.game.getGameState();

            // Check if game is won
            if (gameState.gameStatus === 'won') {
                this.displayWin(gameState);
                break;
            }

            // Display current status and get user input
            this.displayCurrentStatus(gameState);
            await this.handleUserInput();
        }

        // Ask if player wants to play again
        await this.playAgainPrompt();
    }

    // Display current game status
    private displayCurrentStatus(gameState: GameState): void {
        console.log('\n┌─────────────────────────────────────┐');
        console.log(`│ 🚉 CURRENT: ${gameState.currentStation.name.padEnd(23)} │`);
        console.log(`│ 🎯 DESTINATION: ${gameState.endStation.name.padEnd(19)} │`);
        console.log(`│ 📊 MOVES: ${gameState.moveCount.toString().padEnd(25)} │`);
        console.log(`│ 🔄 TRANSFERS: ${gameState.transferCount.toString().padEnd(21)} │`);
        console.log(`│ ⏱️  TRAVEL TIME: ${gameState.totalTravelTime.toString().padEnd(17)} min │`);
        console.log('└─────────────────────────────────────┘');

        // Show path so far
        if (gameState.playerPath.length > 0) {
            console.log('\n📍 YOUR PATH SO FAR:');
            const pathDesc = this.game.getPathDescription();
            pathDesc.forEach(step => console.log(`   ${step}`));
        }

        console.log('\n🚇 AVAILABLE MOVES:');
        gameState.availableMoves.forEach((move, index) => {
            const timeStr = move.travelTime === 0 ? 'TRANSFER' : `${move.travelTime} min`;
            console.log(`   ${index + 1}. ${move.station.name} via ${move.line} line (${timeStr})`);
        });
    }

    // Handle user input for moves
    private async handleUserInput(): Promise<void> {
        const gameState = this.game.getGameState();

        console.log('\n💭 COMMANDS:');
        console.log('   • Enter 1-' + gameState.availableMoves.length + ' to move to a station');
        console.log('   • Type "hint" for available moves');
        console.log('   • Type "path" to see your current path');
        console.log('   • Type "restart" to restart this puzzle');
        console.log('   • Type "new" for a new puzzle');
        console.log('   • Type "quit" to exit');

        const input = await this.getUserInput('\n🎮 Your choice: ');

        await this.processInput(input.toLowerCase().trim());
    }

    // Process user input
    private async processInput(input: string): Promise<void> {
        const gameState = this.game.getGameState();

        // Handle numeric input (move selection)
        const moveNumber = parseInt(input);
        if (!isNaN(moveNumber) && moveNumber >= 1 && moveNumber <= gameState.availableMoves.length) {
            const selectedMove = gameState.availableMoves[moveNumber - 1];
            const result = this.game.makeMove(selectedMove.station.id, selectedMove.line);

            if (result.success) {
                console.log(`\n✅ ${result.message}`);
                if (selectedMove.travelTime === 0) {
                    console.log('🔄 Transfer completed!');
                }
            } else {
                console.log(`\n❌ ${result.message}`);
            }
            return;
        }

        // Handle text commands
        switch (input) {
            case 'hint':
                console.log('\n💡 AVAILABLE MOVES:');
                this.game.getHint().forEach((hint, i) => {
                    console.log(`   ${i + 1}. ${hint}`);
                });
                break;

            case 'path':
                console.log('\n📍 YOUR CURRENT PATH:');
                this.game.getPathDescription().forEach(step => {
                    console.log(`   ${step}`);
                });
                break;

            case 'restart':
                console.log('\n🔄 Restarting current puzzle...\n');
                this.game.restartGame();
                return;

            case 'new':
                console.log('\n🎲 Starting new puzzle...\n');
                await this.newGame();
                return;

            case 'quit':
                console.log('\n👋 Thanks for playing! Goodbye!');
                this.rl.close();
                process.exit(0);

            default:
                console.log('\n❓ Invalid input. Please try again.');
                break;
        }
    }

    // Display win message
    private displayWin(gameState: GameState): void {
        const stats = this.game.getGameStats();

        console.log('\n🎉 CONGRATULATIONS! YOU REACHED YOUR DESTINATION! 🎉\n');

        console.log('┌─────────────── GAME STATS ───────────────┐');
        console.log(`│ 🎯 Destination Reached: ${gameState.endStation.name.padEnd(15)} │`);
        console.log(`│ 📊 Total Moves: ${stats.movesUsed.toString().padEnd(25)} │`);
        console.log(`│ 🔄 Transfers: ${stats.transfers.toString().padEnd(27)} │`);
        console.log(`│ ⏱️  Travel Time: ${stats.totalTime.toString().padEnd(22)} min │`);
        console.log(`│ 🕐 Game Time: ${stats.gameTimeSeconds.toString().padEnd(24)} sec │`);
        console.log('└───────────────────────────────────────────┘');

        console.log('\n📍 YOUR COMPLETE PATH:');
        this.game.getPathDescription().forEach(step => {
            console.log(`   ${step}`);
        });

        console.log('\n💡 NOTE: In the full game, we\'ll compare this to the optimal Dijkstra path!');
    }

    // Prompt to play again
    private async playAgainPrompt(): Promise<void> {
        const choice = await this.getUserInput('\n🎮 Play again? (y/n/new): ');

        switch (choice.toLowerCase().trim()) {
            case 'y':
            case 'yes':
                console.log('\n🔄 Restarting same puzzle...\n');
                this.game.restartGame();
                await this.gameLoop();
                break;

            case 'new':
                console.log('\n🎲 Starting new puzzle...\n');
                await this.newGame();
                break;

            case 'n':
            case 'no':
                console.log('\n👋 Thanks for playing!');
                this.rl.close();
                break;

            default:
                console.log('Please enter y, n, or new');
                await this.playAgainPrompt();
                break;
        }
    }

    // Utility method to get user input
    private getUserInput(prompt: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(prompt, (answer) => {
                resolve(answer);
            });
        });
    }

    // Clean shutdown
    public close(): void {
        this.rl.close();
    }
}

// Main execution
async function main() {
    const cli = new SubwayCLI();

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n\n👋 Thanks for playing! Goodbye!');
        cli.close();
        process.exit(0);
    });

    try {
        await cli.start();
    } catch (error) {
        console.error('❌ An error occurred:', error);
        cli.close();
        process.exit(1);
    }
}

// Run the game
if (require.main === module) {
    main();
}

export { SubwayCLI };