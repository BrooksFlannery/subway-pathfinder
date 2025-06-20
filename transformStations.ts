import { allLines } from './src/lib/data/lines';
import fs from 'fs';
import path from 'path';

// Read the existing stations file
const realStationsPath = path.join(__dirname, './src/lib/data/realStations.ts');
const realStationsContent = fs.readFileSync(realStationsPath, 'utf8');

// Parse the stations array from the file content
// The file contains TypeScript, so we need to extract just the array part
const stationsMatch = realStationsContent.match(/\[\s*{[\s\S]*}\s*\]/);
if (!stationsMatch) {
    throw new Error('Could not find stations array in file');
}

const stationsArray = JSON.parse(stationsMatch[0]);

// Create a map to store station lines
const stationLines: Record<string, Set<string>> = {};

// Loop through all train lines and collect which lines serve each station
allLines.forEach(train => {
    train.line.forEach(stationId => {
        if (!stationLines[stationId]) {
            stationLines[stationId] = new Set();
        }
        stationLines[stationId].add(train.id);
    });
});

// Transform the stations data
const transformedStations = stationsArray.map((station: any) => {
    // Create new station object without connections property
    const { connections, ...stationWithoutConnections } = station;

    // Add lines array
    return {
        ...stationWithoutConnections,
        lines: Array.from(stationLines[station.id] || [])
    };
});

// Create the new file content
const newFileContent = `import { Station } from './src/types/types.ts';

export const REAL_STATIONS: Station[] = ${JSON.stringify(transformedStations, null, 2)}
`;

// Write to the new file
const newFilePath = path.join(__dirname, './src/lib/data/realStations2.ts');
fs.writeFileSync(newFilePath, newFileContent);

console.log('Transformation complete! New file created at:', newFilePath); 