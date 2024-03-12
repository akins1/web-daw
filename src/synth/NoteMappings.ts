
export const keyToNoteMap = new Map<string, string>([
    ["Q", "C5"],
    ["2", "C#5"],
    ["W", "D5"],
    ["3", "D#5"],
    ["E", "E5"],
    ["R", "F5"],
    ["5", "F#5"],
    ["T", "G5"],
    ["6", "G#5"],
    ["Y", "A5"],
    ["7", "A#5"],
    ["U", "B5"],
    ["I", "C6"],
    ["9", "C#6"],
    ["O", "D6"],
    ["0", "D#6"],
    ["P", "E6"],
    ["[", "F6"],
    ["=", "F#6"],
    ["]", "G6"],
    ["Z", "C4"],
    ["S", "C#4"],
    ["X", "D4"],
    ["D", "D#4"],
    ["C", "E4"],
    ["V", "F4"],
    ["G", "F#4"],
    ["B", "G4"],
    ["H", "G#4"],
    ["N", "A4"],
    ["J", "A#4"],
    ["M", "B4"],
    [",", "C5"],
    ["L", "C#5"],
    [".", "D5"],
    [";", "D#5"],
    ["/", "E5"],
]);

export const noteToKeyMap = new Map<string, string>([
    ["C5","Q"],
    ["C#5","2"],
    ["D5","W"],
    ["D#5","3"],
    ["E5","E"],
    ["F5","R"],
    ["F#5","5"],
    ["G5","T"],
    ["G#5","6"],
    ["A5","Y"],
    ["A#5","7"],
    ["B5","U"],
    ["C6","I"],
    ["C#6","9"],
    ["D6","O"],
    ["D#6","0"],
    ["E6","P"],
    ["F6","["],
    ["F#6","="],
    ["G6","]"],
    ["C4","Z"],
    ["C#4","S"],
    ["D4","X"],
    ["D#4","D"],
    ["E4","C"],
    ["F4","V"],
    ["F#4","G"],
    ["G4","B"],
    ["G#4","H"],
    ["A4","N"],
    ["A#4","J"],
    ["B4","M"],
    ["C5",","],
    ["C#5","L"],
    ["D5","."],
    ["D#5",";"],
    ["E5","/"],
]);

export const noteToFreqMap = new Map<string, number>([
    ["C1", 32.7],
    ["C#1", 34.65],
    ["D1", 36.71],
    ["D#1", 38.89],
    ["E1", 41.20],
    ["F1", 43.65],
    ["F#1", 46.25],
    ["G1", 49],
    ["G#1", 51.91],
    ["A1", 55],
    ["A#1", 58.27],
    ["B1", 61.74],
    
    ["C2", 65.41],
    ["C#2", 69.30],
    ["D2", 73.42],
    ["D#2", 77.78],
    ["E2", 82.41],
    ["F2", 87.31],
    ["F#2", 92.5],
    ["G2", 98],
    ["G#2", 103.83],
    ["A2", 110],
    ["A#2", 116.54],
    ["B2", 123.47],

    ["C3", 130.81],
    ["C#3", 138.59],
    ["D3", 146.83],
    ["D#3", 155.56],
    ["E3", 164.81],
    ["F3", 174.61],
    ["F#3", 185],
    ["G3", 196],
    ["G#3", 207.65],
    ["A3", 220],
    ["A#3", 233.08],
    ["B3", 246.94],

    ["C5", 523.25],
    ["C#5", 554.37],
    ["D5", 587.33],
    ["D#5", 622.25],
    ["E5", 659.25],
    ["F5", 698.46],
    ["F#5", 739.99],
    ["G5", 783.99],
    ["G#5", 830.61],
    ["A5", 880.00],
    ["A#5", 932.33],
    ["B5", 987.77],

    ["C6", 1046.50],
    ["C#6", 1108.73],
    ["D6", 1174.66],
    ["D#6", 1244.51],
    ["E6", 1318.51],
    ["F6", 1396.91],
    ["F#6", 1479.98],
    ["G6", 1567.98],
    ["G#6", 1661.22],
    ["A6", 1760],
    ["A#6", 1864.66],
    ["B6", 1975.53],

    ["C4", 261.63],
    ["C#4", 277.18],
    ["D4", 293.66],
    ["D#4", 311.13],
    ["E4", 329.63],
    ["F4", 349.23],
    ["F#4", 369.99],
    ["G4", 392.00],
    ["G#4", 415.30],
    ["A4", 440.00],
    ["A#4", 466.16],
    ["B4", 493.88],

    ["C5", 523.25],
    ["C#5", 554.37],
    ["D5", 587.33],
    ["D#5", 622.25],
    ["E5", 659.25],
]);

export function keyToFreq(key: string): number | undefined {
    const note = keyToNoteMap.get(key);
    if (note === undefined) 
        return;
    const frequency = noteToFreqMap.get(note);
    return frequency
}

export function keyToNote(key: string): string | undefined {
    const note = keyToNoteMap.get(key);
    return note;
}

export function noteToFreq(note: string): number | undefined {
    const frequency = noteToFreqMap.get(note);
    return frequency 
}

export function applyOctaveToNote(octaveOffset: number, note: string): string {
    const octaveNumber = parseInt(note.charAt(note.length - 1));
    const newOctave = octaveNumber + octaveOffset;

    if (newOctave < 0 || newOctave > 8) throw new Error("Octave not within range");

    return note.substring(0, note.length-1) + newOctave.toString();
}
