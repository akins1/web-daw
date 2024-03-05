import { useEffect } from "react";
import { useOsc1Store } from "../stores/OscStore";
import { keyToFreq, keyToNote, noteToFreq, noteToKeyMap } from "./NoteMappings";
import { UseKeypressStore } from "../stores/KeypressStore";


export default function HorizontalPiano() {

    const keypressSet: Set<string> = UseKeypressStore((state) => state.keypressSet);

    // useEffect(() => {
        

    // }, [keypressStore.keypressSet]);

    function playNote(note: string) {
        // const freq = noteToFreq(note)
        // if (freq !== undefined)
            useOsc1Store.getState().playOsc(note);
    }

    const whiteNoteOn = "h-full w-4 border border-gray-600 bg-gray-300";
    const whiteNoteOff = "h-full w-4 border border-gray-600";
    const blackNoteOn = "h-full w-4 border border-gray-600 bg-gray-600";
    const blackNoteOff = "h-full w-4 border border-gray-600 bg-black";

    function getWhiteNoteClass(note: string) {
        const key = noteToKeyMap.get(note);
        return (key !== undefined && keypressSet.has(key)) ? whiteNoteOn : whiteNoteOff
    }

    function getBlackNoteClass(note: string) {
        const key = noteToKeyMap.get(note);   
        return (key !== undefined && keypressSet.has(key)) ? blackNoteOn : blackNoteOff
    }

    function getOverlappingNoteClass(key1: string, key2: string, color: string) {
        if (color === "black")
            return keypressSet.has(key1) || keypressSet.has(key2) ? blackNoteOn : blackNoteOff
        return keypressSet.has(key1) || keypressSet.has(key2) ? whiteNoteOn : whiteNoteOff
    }

    return(
    <div className="w-full m-2">
        <div className="w-fit h-24 flex gap-0">
            <div className={getWhiteNoteClass("C4")}  onMouseDown={() => playNote("C4")}></div>
            <div className={getBlackNoteClass("C#4")}  onMouseDown={() => playNote("C#4")}></div>
            <div className={getWhiteNoteClass("D4")}  onMouseDown={() => playNote("D4")}></div>
            <div className={getBlackNoteClass("D#4")}  onMouseDown={() => playNote("D#4")}></div>
            <div className={getWhiteNoteClass("E4")}  onMouseDown={() => playNote("E4")}></div>
            <div className={getWhiteNoteClass("F4")}  onMouseDown={() => playNote("F4")}></div>
            <div className={getBlackNoteClass("F#4")}  onMouseDown={() => playNote("F#4")}></div>
            <div className={getWhiteNoteClass("G4")}  onMouseDown={() => playNote("G4")}></div>
            <div className={getBlackNoteClass("G#4")}  onMouseDown={() => playNote("G#4")}></div>
            <div className={getWhiteNoteClass("A4")}  onMouseDown={() => playNote("A4")}></div>
            <div className={getBlackNoteClass("A#4")}  onMouseDown={() => playNote("A#4")}></div>
            <div className={getWhiteNoteClass("B4")}  onMouseDown={() => playNote("B4")}></div>
            <div className={getOverlappingNoteClass("Q", ",", "white")}  onMouseDown={() => playNote("C5")}></div>
            <div className={getOverlappingNoteClass("2", "L", "black")}  onMouseDown={() => playNote("C#5")}></div>
            <div className={getOverlappingNoteClass("W", ".", "white")}  onMouseDown={() => playNote("D5")}></div>
            <div className={getOverlappingNoteClass("3", ";", "black")}  onMouseDown={() => playNote("D#5")}></div>
            <div className={getOverlappingNoteClass("E", "/", "white")}  onMouseDown={() => playNote("E5")}></div>
            <div className={getWhiteNoteClass("F5")}  onMouseDown={() => playNote("F5")}></div>
            <div className={getBlackNoteClass("F#5")}  onMouseDown={() => playNote("F#5")}></div>
            <div className={getWhiteNoteClass("G5")}  onMouseDown={() => playNote("G5")}></div>
            <div className={getBlackNoteClass("G#5")}  onMouseDown={() => playNote("G#5")}></div>
            <div className={getWhiteNoteClass("A5")}  onMouseDown={() => playNote("A5")}></div>
            <div className={getBlackNoteClass("A#5")}  onMouseDown={() => playNote("A#5")}></div>
            <div className={getWhiteNoteClass("B5")}  onMouseDown={() => playNote("B5")}></div>
            <div className={getWhiteNoteClass("C6")}  onMouseDown={() => playNote("C6")}></div>
            <div className={getBlackNoteClass("C#6")}  onMouseDown={() => playNote("C#6")}></div>
            <div className={getWhiteNoteClass("D6")}    onMouseDown={() => playNote("D6")}></div>
            <div className={getBlackNoteClass("D#6")}  onMouseDown={() => playNote("D#6")}></div>
            <div className={getWhiteNoteClass("E6")}  onMouseDown={() => playNote("E6")}></div>
            <div className={getWhiteNoteClass("F6")}  onMouseDown={() => playNote("F6")}></div>
            <div className={getBlackNoteClass("F#6")}  onMouseDown={() => playNote("F#6")}></div>
            <div className={getWhiteNoteClass("G6")}  onMouseDown={() => playNote("G6")}></div>
            
        </div>
    </div>
    );
}