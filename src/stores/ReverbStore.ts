import { create } from "zustand";
import { useDawStore } from "./DawStore";

export type ReverbParameters = {
    type: string,
    duration: number,
    preDelay: number,
    dryWeight: number,
    wetWeight: number,
}

export type ReverbStore = {
    isEnabled: boolean,
    impulseBuffer: AudioBuffer,
    convolverNode: ConvolverNode,
    destinationNode: AudioNode,
    setIsEnabled: (value: boolean) => void,
    setAudioBuffer: (newBuffer: AudioBuffer) => void,
    setRandomAudioBuffer: () => void,
    setDestinationNode: (node: AudioNode) => void,
    initializeReverb: () => void,
}


export const useReverb1Store = create<ReverbStore>((set, get) => ({
    isEnabled: false,
    impulseBuffer: useDawStore.getState().audioContext.createBuffer(
        2, 
        useDawStore.getState().audioContext.sampleRate * 2, 
        useDawStore.getState().audioContext.sampleRate
    ),
    convolverNode: useDawStore.getState().audioContext.createConvolver(),
    destinationNode: useDawStore.getState().audioContext.destination,
    setIsEnabled: (value: boolean) => {
        set((state) => ({ isEnabled: value }));
    },
    setAudioBuffer: (newBuffer: AudioBuffer) => {
        set((state) => ({ impulseBuffer: newBuffer }));
    },
    setRandomAudioBuffer: () => {
        const bufferL = get().impulseBuffer.getChannelData(0);
        const bufferR = get().impulseBuffer.getChannelData(1);
        //const deltaY = 1 / bufferL.length;
        for (var i = 0; i < bufferL.length; i++) {
            // const multiplier = (i % 2 == 0) ? 1 : -1;
            // bufferL[i] = (1 - (deltaY * i)) * multiplier;
            // bufferR[i] = (1 - (deltaY * i)) * multiplier * (-1);
            bufferL[i] = Math.random() * 2 - 1;
            bufferR[i] = Math.random() * 2 - 1;
        }
        get().convolverNode.buffer = get().impulseBuffer;
        //set((state) => ({ impulseBuffer:  }));
    },
    setDestinationNode: (node: AudioNode) => {
      set((state) => ({ destinationNode: node }));
    },
    initializeReverb: () => {
      //get().convolverNode.connect(get().destinationNode);
      get().setRandomAudioBuffer();
    }
}));

