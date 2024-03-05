import { create } from "zustand"
import { useSynthStore } from "./SynthStore";
import { useADSRStore } from "./ADSRStore";
import { useDawStore } from "./DawStore";
import { applyOctaveToNote, keyToFreq, keyToNote, noteToFreq } from "../synth/NoteMappings";

export type OscStore = {
    isEnabled: boolean,
    isPlaying: boolean,
    isPoly: boolean,
    oscType: OscillatorType,
    sourceNode: AudioNode | null,
    destinationNode: AudioNode,
    oscGain: number,
    isADSREnabled: boolean,
    octaveOffset: number,
    playingOscs: Map<string, OscillatorNode>,
    setIsEnabled: (value: boolean) => void,
    setIsPlaying: (value: boolean) => void,
    setIsPoly: (value: boolean) => void,
    setOscType: (value: OscillatorType) => void,
    setIsADSREnabled: (value: boolean) => void,
    setSourceNode: (node: AudioNode | null) => void,
    setDestinationNode: (node: AudioNode) => void,
    setOscGain: (value: number) => void,
    playOsc: (key: string) => void,
    stopOsc: (key: string) => void,
    setOctaveOffset: (newOctaveOffset: number) => void,
    //createOscNode: (frequency: number) => void,
}

export const useOsc1Store = create<OscStore>((set, get) => ({
    isEnabled: true,
    isPlaying: false,
    isPoly: true,
    isADSREnabled: false,
    sourceNode: null,
    octaveOffset: 0,
    destinationNode: useSynthStore.getState().masterGainNode,
    oscGain: 0.1,
    oscType: "sine",
    playingOscs: new Map<string, OscillatorNode>(),
    setIsEnabled: (value: boolean) => {
        set((state) => ({ isEnabled: value }));
    },
    setIsPlaying: (value: boolean) => {
        set((state) => ({ isPlaying: value }));
    },
    setIsPoly: (value: boolean) => {
        set((state) => ({ isPoly: value }));
    },
    setIsADSREnabled: (value: boolean) => {
        set((state) => ({ isADSREnabled: value }));
    },
    setOscType: (value: OscillatorType) => {
        set((state) => ({ oscType: value }));
    },
    setSourceNode: (node: AudioNode | null) => {
        set((state) => ({ sourceNode: node }))
    },
    setDestinationNode: (node: AudioNode) => {
        set((state) => ({ destinationNode: node }));
    },
    setOscGain: (value: number) => {
        set((state) => ({ oscGain: value }));
    },
    playOsc: (key: string) => {
        const note = keyToNote(key);
        if (note == undefined) return;
        const newNote = applyOctaveToNote(get().octaveOffset, note);
        const freq = noteToFreq(newNote);
        if (freq == undefined) return;
        
        const audioContext = useDawStore.getState().audioContext;
        const adsr = useADSRStore.getState().adsr;
        const oscType = get().oscType;
        const sourceNode = get().sourceNode;
        const gainNode = useDawStore.getState().audioContext.createGain();
        gainNode.gain.value = get().oscGain;
        const destinationNode = get().destinationNode;
        const currentTime = audioContext.currentTime;
        const oscNode = new OscillatorNode(audioContext, {
            "type": oscType,
            "frequency": freq,
            // TODO
        });

        if (sourceNode !== null) { 
            sourceNode.connect(oscNode);
        }

        oscNode.connect(gainNode);
        gainNode.connect(destinationNode);

        oscNode.start();

        if (useADSRStore.getState().isEnabled) {
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(adsr.peakLevel, currentTime + adsr.attackDuration);
            gainNode.gain.linearRampToValueAtTime(adsr.sustainLevel, currentTime + adsr.attackDuration + adsr.decayDuration);
            gainNode.gain.setValueAtTime(adsr.sustainLevel, currentTime + adsr.attackDuration + adsr.decayDuration + adsr.sustainDuration);
            gainNode.gain.linearRampToValueAtTime(0, currentTime + adsr.attackDuration + adsr.decayDuration + adsr.sustainDuration + adsr.releaseDuration);
            oscNode.stop(currentTime + adsr.attackDuration + adsr.decayDuration + adsr.sustainDuration + adsr.releaseDuration);
        }

        get().playingOscs.set(key, oscNode);
        console.log("Created osc: " + key)

    },
    stopOsc: (key: string) => {

        if (! useADSRStore.getState().isEnabled) {
            get().playingOscs.get(key)?.stop();
        }

        get().playingOscs.delete(key);
        console.log("Deleted osc: " + key)
    },
    setOctaveOffset: (newOctaveOffset: number) => {
        set((state) => ({ octaveOffset: newOctaveOffset }));
    }
}));