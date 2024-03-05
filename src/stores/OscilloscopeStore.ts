import { create } from "zustand"
import { useDawStore } from "./DawStore";
import { useState } from "react";


export type OscilloscopeStore = {
    analyserNode: AnalyserNode,
    dataArray: Uint8Array,
    initialize: () => void,
    initializeDataArray: () => void,
    getByteTimeDomainData: () => void
}


export const useOscilloscopeStore = create<OscilloscopeStore>((set, get) => ({
    analyserNode: new AnalyserNode(useDawStore.getState().audioContext),
    dataArray: new Uint8Array(),
    initialize: () => {
        get().analyserNode.connect(useDawStore.getState().audioContext.destination);
    },
    initializeDataArray: () => {
        const freqBinCount = get().analyserNode.frequencyBinCount;
        set((state) => ({ dataArray: new Uint8Array(freqBinCount) }));
    },
    getByteTimeDomainData: () => {
        get().analyserNode.getByteTimeDomainData(get().dataArray);
    }
    // setAnalyserNodeSource: (sourceNode: AudioNode) => {
    //     sourceNode.connect(get().analyserNode);
    // },
}));