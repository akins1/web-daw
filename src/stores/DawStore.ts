import { create } from "zustand";

export type DawStore = {
    audioContext: AudioContext
};

export const useDawStore = create<DawStore>((set, get) => ({
    audioContext: new AudioContext(),
}));