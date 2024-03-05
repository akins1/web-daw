
import { create } from "zustand"
import { useOsc1Store } from "./OscStore";
import { keyToFreq } from "../synth/NoteMappings";


export type KeypressStore = {
    keypressSet: Set<string>,
    oscList: OscillatorNode[],
    addKeypress: (value: string) => void,
    removeKeypress: (value: string) => void,
    clearKeypresses: () => void
}

export const UseKeypressStore =  create<KeypressStore>((set, get) => ({
    keypressSet: new Set<string>(),
    oscList: [],
    addKeypress: (value: string) => {
        set((state) => ({ 
            keypressSet: new Set(state.keypressSet).add(value)
        }));
        


    },
    removeKeypress: (value: string) => {
        const newKeypressSet = new Set<string>(get().keypressSet);
        newKeypressSet.delete(value);
        set((state) => ({ keypressSet: newKeypressSet }));
    },
    clearKeypresses: () => {
        set((state) => ({ keypressSet: new Set<string>() }));
    }
}));