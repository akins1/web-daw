import { create } from "zustand"
import { useSynthStore } from "./SynthStore";
import { useADSRStore } from "./ADSRStore";
import { useDawStore } from "./DawStore";
import { applyOctaveToNote, keyToFreq, keyToNote, noteToFreq } from "../synth/NoteMappings";
import { useReverb1Store } from "./ReverbStore";

export type OscStore = {
    isEnabled: boolean,
    isPlaying: boolean,
    isPoly: boolean,
    oscType: OscillatorType,
    sourceNode: AudioNode | null,
    destinationNode: AudioNode,
    voiceCount: number,
    oscGain: number,
    oscDetune: number,
    isADSREnabled: boolean,
    octaveOffset: number,
    playingOscs: Map<string, OscillatorNode[]>,
    setIsEnabled: (value: boolean) => void,
    setVoiceCount: (value: number) => void,
    setOscDetune: (value: number) => void,
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
    oscDetune: 0,
    voiceCount: 1,
    octaveOffset: 0,
    destinationNode: useSynthStore.getState().masterGainNode,
    oscGain: 0.1,
    oscType: "sine",
    playingOscs: new Map<string, OscillatorNode[]>(),
    setIsEnabled: (value: boolean) => {
        set((state) => ({ isEnabled: value }));
    },
    setVoiceCount: (value: number) => {
        set((state) => ({ voiceCount: value }));
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
    setOscDetune: (value: number) => {
        set((state) => ({ oscDetune: value }));
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
        if (! get().isEnabled) return;
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

        const oscList = []
        const oscDetuneRange = get().oscDetune;
        const voiceCount = get().voiceCount;
        if (voiceCount == 1) {
            const oscNode = new OscillatorNode(audioContext, {
                "type": oscType,
                "frequency": freq,
                // TODO
            });
            oscList.push(oscNode);
        } else {
            for (let i = 0; i < voiceCount; i++) {
                const oscNode = new OscillatorNode(audioContext, {
                    "type": oscType,
                    "frequency": freq,
                    "detune": i * oscDetuneRange / (voiceCount - 1) - oscDetuneRange / 2
                });
                oscList.push(oscNode);
                console.log("detune", i * oscDetuneRange / (voiceCount - 1) - oscDetuneRange / 2);
            }
        }

        

        // const oscNode = new OscillatorNode(audioContext, {
        //     "type": oscType,
        //     "frequency": freq,
        //     // TODO
        // });

        if (sourceNode !== null) { 
            //sourceNode.connect(oscNode);
            oscList.forEach((value) => sourceNode.connect(value));
        }

        oscList.forEach(value => value.connect(gainNode));
        gainNode.gain.value = get().oscGain / oscList.length;
        gainNode.connect(destinationNode);

        // oscNode.start();
        oscList.forEach((value) => value.start());

        if (useADSRStore.getState().isEnabled) {
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(adsr.peakLevel, currentTime + adsr.attackDuration);
            gainNode.gain.linearRampToValueAtTime(adsr.sustainLevel, currentTime + adsr.attackDuration + adsr.decayDuration);
            gainNode.gain.setValueAtTime(adsr.sustainLevel, currentTime + adsr.attackDuration + adsr.decayDuration + adsr.sustainDuration);
            gainNode.gain.linearRampToValueAtTime(0, currentTime + adsr.attackDuration + adsr.decayDuration + adsr.sustainDuration + adsr.releaseDuration);
            oscList.forEach((value) => value.stop(currentTime + adsr.attackDuration + adsr.decayDuration + adsr.sustainDuration + adsr.releaseDuration));
        }

        const currentOscs = get().playingOscs.get(key);
        if (currentOscs === undefined) {
            get().playingOscs.set(key, oscList);
        } else {
            get().playingOscs.set(key, [...currentOscs, ...oscList]);
        }
        
        console.log("Created osc: " + key)

        const reverb1Store = useReverb1Store.getState();
        if (reverb1Store.isEnabled) {
            const reverbOscNode = new OscillatorNode(audioContext, {
                "type": oscType,
                "frequency": freq,
                // TODO
            });
            if (sourceNode !== null) { 
                sourceNode.connect(reverbOscNode);
            }
            reverbOscNode.connect(gainNode);
            gainNode.connect(reverb1Store.convolverNode);
            reverb1Store.convolverNode.connect(destinationNode);
            reverbOscNode.start();
            
            const currentOscs = get().playingOscs.get(key);
            if (currentOscs === undefined) {
                get().playingOscs.set(key, [reverbOscNode]);
            } else {
                get().playingOscs.set(key, [...currentOscs, reverbOscNode]);
            }
        }

    },
    stopOsc: (key: string) => {
        if (! get().isEnabled) return;

        if (! useADSRStore.getState().isEnabled) {
            const playingOscsAtNote = get().playingOscs.get(key);
            if (playingOscsAtNote !== undefined) {
                playingOscsAtNote.forEach(v => v.stop());
                
            }
        }
        get().playingOscs.delete(key);
        console.log("Deleted osc: " + key)
    },
    setOctaveOffset: (newOctaveOffset: number) => {
        set((state) => ({ octaveOffset: newOctaveOffset }));
    }
}));

export const useOsc2Store = create<OscStore>((set, get) => ({
    isEnabled: true,
    isPlaying: false,
    isPoly: true,
    isADSREnabled: false,
    sourceNode: null,
    oscDetune: 0,
    voiceCount: 1,
    octaveOffset: 0,
    destinationNode: useSynthStore.getState().masterGainNode,
    oscGain: 0.1,
    oscType: "sine",
    playingOscs: new Map<string, OscillatorNode[]>(),
    setIsEnabled: (value: boolean) => {
        set((state) => ({ isEnabled: value }));
    },
    setVoiceCount: (value: number) => {
        set((state) => ({ voiceCount: value }));
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
    setOscDetune: (value: number) => {
        set((state) => ({ oscDetune: value }));
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
        if (! get().isEnabled) return;
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

        const oscList = []
        const oscDetuneRange = get().oscDetune;
        const voiceCount = get().voiceCount;
        if (voiceCount == 1) {
            const oscNode = new OscillatorNode(audioContext, {
                "type": oscType,
                "frequency": freq,
                // TODO
            });
            oscList.push(oscNode);
        } else {
            for (let i = 0; i < voiceCount; i++) {
                const oscNode = new OscillatorNode(audioContext, {
                    "type": oscType,
                    "frequency": freq,
                    "detune": i * oscDetuneRange / (voiceCount - 1) - oscDetuneRange / 2
                });
                oscList.push(oscNode);
                console.log("detune", i * oscDetuneRange / (voiceCount - 1) - oscDetuneRange / 2);
            }
        }

        

        // const oscNode = new OscillatorNode(audioContext, {
        //     "type": oscType,
        //     "frequency": freq,
        //     // TODO
        // });

        if (sourceNode !== null) { 
            //sourceNode.connect(oscNode);
            oscList.forEach((value) => sourceNode.connect(value));
        }

        oscList.forEach(value => value.connect(gainNode));
        gainNode.gain.value = get().oscGain / oscList.length;
        gainNode.connect(destinationNode);

        // oscNode.start();
        oscList.forEach((value) => value.start());

        if (useADSRStore.getState().isEnabled) {
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(adsr.peakLevel, currentTime + adsr.attackDuration);
            gainNode.gain.linearRampToValueAtTime(adsr.sustainLevel, currentTime + adsr.attackDuration + adsr.decayDuration);
            gainNode.gain.setValueAtTime(adsr.sustainLevel, currentTime + adsr.attackDuration + adsr.decayDuration + adsr.sustainDuration);
            gainNode.gain.linearRampToValueAtTime(0, currentTime + adsr.attackDuration + adsr.decayDuration + adsr.sustainDuration + adsr.releaseDuration);
            oscList.forEach((value) => value.stop(currentTime + adsr.attackDuration + adsr.decayDuration + adsr.sustainDuration + adsr.releaseDuration));
        }

        const currentOscs = get().playingOscs.get(key);
        if (currentOscs === undefined) {
            get().playingOscs.set(key, oscList);
        } else {
            get().playingOscs.set(key, [...currentOscs, ...oscList]);
        }
        
        console.log("Created osc: " + key)

        const reverb1Store = useReverb1Store.getState();
        if (reverb1Store.isEnabled) {
            const reverbOscNode = new OscillatorNode(audioContext, {
                "type": oscType,
                "frequency": freq,
                // TODO
            });
            if (sourceNode !== null) { 
                sourceNode.connect(reverbOscNode);
            }
            reverbOscNode.connect(gainNode);
            gainNode.connect(reverb1Store.convolverNode);
            reverb1Store.convolverNode.connect(destinationNode);
            reverbOscNode.start();
            
            const currentOscs = get().playingOscs.get(key);
            if (currentOscs === undefined) {
                get().playingOscs.set(key, [reverbOscNode]);
            } else {
                get().playingOscs.set(key, [...currentOscs, reverbOscNode]);
            }
        }

    },
    stopOsc: (key: string) => {
        if (! get().isEnabled) return;

        if (! useADSRStore.getState().isEnabled) {
            const playingOscsAtNote = get().playingOscs.get(key);
            if (playingOscsAtNote !== undefined) {
                playingOscsAtNote.forEach(v => v.stop());
                
            }
        }
        get().playingOscs.delete(key);
        console.log("Deleted osc: " + key)
    },
    setOctaveOffset: (newOctaveOffset: number) => {
        set((state) => ({ octaveOffset: newOctaveOffset }));
    }
}));