import { writeFileSync } from 'fs';
import { TrainLine } from "./src/lib/types/types"; // or correct relative path
import { allLines } from "./src/lib/data/lines";

const reversedLines: TrainLine[] = allLines.map((line) => ({
    ...line,
    id: `${line.id}-2`,
    name: `${line.name} 2`,
    line: [...line.line].reverse(),
    trains: [],
}));

const fileContent = `import { TrainLine } from "@/lib/types/types"\n\nexport const reversedLines: TrainLine[] = ${JSON.stringify(reversedLines, null, 2)};\n`;

writeFileSync('./reversedLines.ts', fileContent);

console.log('✅ Reversed lines written to reversedLines.ts');
