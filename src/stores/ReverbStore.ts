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
    gainNode: GainNode,
    gain: number,
    duration: number,
    decayFactor: number,
    setIsEnabled: (value: boolean) => void,
    setAudioBuffer: (newBuffer: AudioBuffer) => void,
    setRandomAudioBuffer: () => void,
    setDestinationNode: (node: AudioNode) => void,
    initializeReverb: () => void,
    setGain: (value: number) => void,
    setDuration: (value: number) => void,
    setDecayFactor: (value: number) => void,
    setFIRAudioBuffer: (time: number, decayFactor: number) => void,
}


export const useReverb1Store = create<ReverbStore>((set, get) => ({
    isEnabled: false,
    impulseBuffer: useDawStore.getState().audioContext.createBuffer(
        2, 
        useDawStore.getState().audioContext.sampleRate * 2, 
        useDawStore.getState().audioContext.sampleRate
    ),
    gain: 0.4,
    convolverNode: useDawStore.getState().audioContext.createConvolver(),
    destinationNode: useDawStore.getState().audioContext.destination,
    gainNode: useDawStore.getState().audioContext.createGain(),
    duration: 3,
    decayFactor: 1,
    setIsEnabled: (value: boolean) => {
        set((state) => ({ isEnabled: value }));
    },
    setGain: (value: number) => {
        set((state) => ({ gain: value }));
        get().gainNode.gain.value = value;
    },
    setAudioBuffer: (newBuffer: AudioBuffer) => {
        set((state) => ({ impulseBuffer: newBuffer }));
    },
    setDuration: (value: number) => {
        set((state) => ({ duration: value }))
    },
    setDecayFactor: (value: number) => {
        set((state) => ({ decayFactor: value }))
    },
    setRandomAudioBuffer: () => {
        const bufferL = get().impulseBuffer.getChannelData(0);
        const bufferR = get().impulseBuffer.getChannelData(1);

        for (var i = 0; i < bufferL.length; i++) {
            bufferL[i] = Math.random() * 2 - 1;
            bufferR[i] = Math.random() * 2 - 1;
        }

        


        get().convolverNode.buffer = get().impulseBuffer;

    },
    //https://www.youtube.com/watch?v=hJhaeB_5EFk
    setFIRAudioBuffer: (time: number, decayFactor: number) => {
        const audioContext = useDawStore.getState().audioContext;
        const bufferLength = time * audioContext.sampleRate;
        const impulseBuffer = audioContext.createBuffer(1, bufferLength, audioContext.sampleRate);
        const impulseData = impulseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferLength; i++) {
            impulseData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/bufferLength, decayFactor);
        }

        

        get().convolverNode.buffer = impulseBuffer;
        get().convolverNode.connect(get().gainNode);
        get().gainNode.connect(get().destinationNode);
        
    },
    setDestinationNode: (node: AudioNode) => {
      set((state) => ({ destinationNode: node }));
    },
    initializeReverb: () => {
      //get().convolverNode.connect(get().destinationNode);
      get().convolverNode.normalize = true;
      get().setGain(get().gain);
      get().setFIRAudioBuffer(get().duration, get().decayFactor);
        // get().setRandomAudioBuffer();
    }
}));

