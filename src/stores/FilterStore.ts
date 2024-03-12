import { create } from "zustand"
import { useDawStore } from "./DawStore";


export type FilterStore = {
    isEnabled: boolean,
    filterFreq: number,
    filterDetune: number,
    filterQ: number,
    filterType: BiquadFilterType,
    filterGain: number,
    filterNode: BiquadFilterNode,
    sourceNode: AudioNode | null,
    destinationNode: AudioNode | null,
    setIsEnabled: (value: boolean) => void,
    setFreq: (value: number) => void,
    setType: (value: BiquadFilterType) => void,
    setDestinationNode: (node: AudioNode) => void,
    setGain: (value: number) => void,
    initialize: () => void,
}

export const useFilter1Store = create<FilterStore>((set, get) => ({
    isEnabled: false,
    filterFreq: 2000,
    filterDetune: 0,
    filterQ: 5,
    filterType: "lowpass",
    filterGain: 1,
    filterNode: useDawStore.getState().audioContext.createBiquadFilter(),
    sourceNode: null,
    destinationNode: null,
    setIsEnabled: (value: boolean) => {
        set((state) => ({ isEnabled: value }));
    },
    setFreq: (value: number) => {
        set((state) => ({ filterFreq: value }));
        get().initialize();
    },
    setType: (value: BiquadFilterType) => {
        set((state) => ({ filterType: value }));
        get().initialize();
    },
    setDestinationNode: (node: AudioNode) => {
        set((state) => ({ destinationNode: node }));
        get().initialize();
    },
    setGain: (value: number) => {
        set((state) => ({ filterGain: value }));
        get().initialize();
    },
    initialize: () => {
        get().filterNode.frequency.value = get().filterFreq;
        get().filterNode.detune.value = get().filterDetune;
        get().filterNode.Q.value = get().filterQ;
        get().filterNode.type = get().filterType;
        get().filterNode.gain.value = get().filterGain;
        
        const destinationNode = get().destinationNode;
        if (destinationNode == null) return;
        
        get().filterNode.connect(destinationNode);
    },
}));