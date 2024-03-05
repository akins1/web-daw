import { error } from "console";
import { create } from "zustand"
import { useDawStore } from "./DawStore";

export type SynthStore = {
    isPlaying: boolean,
    masterGainNode: GainNode,
    selectedKeys: string[],
    initializeSynthNodes: () => void,
    setSelectedKeys: (value: string[]) => void,
    setMasterGain: (value: number) => void,
}

export const useSynthStore = create<SynthStore>((set, get) => ({
    isPlaying: false,
    masterGainNode: new GainNode(useDawStore.getState().audioContext),
    selectedKeys: [],
    initializeSynthNodes: () => {
        const audioContext = useDawStore.getState().audioContext;

        get().masterGainNode.gain.value = 1;

        // Connect master gain to audioContext destination
        get().masterGainNode.connect(audioContext.destination);

        console.log("Initialized Synth Nodes");
    },
    setSelectedKeys: (value: string[]) => {
        set((state) => ({ selectedKeys: value }));
    },
    setMasterGain: (value: number) => {
        //const masterGainNode = get().masterGainNode;
        //if (masterGainNode === null) throw error("useSynthStore: masterGainNode is null");
        get().masterGainNode.gain.value = value;
    },
}));