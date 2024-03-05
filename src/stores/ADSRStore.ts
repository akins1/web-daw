import { create } from "zustand"

export type ADSRStore = {
    isEnabled: boolean,
    adsr: ADSRValues,
    setIsEnabled: (value: boolean) => void,
    setAttackDuration: (duration: number) => void,
    setPeakLevel: (level: number) => void,
    setDecayDuration: (duration: number) => void,
    setSustainLevel: (level: number) => void,
    setSustainDuration: (duration: number) => void,
    setReleaseDuration: (duration: number) => void,
}

export type ADSRValues = {
    attackDuration: number, 
    peakLevel: number, 
    decayDuration: number, 
    sustainLevel: number, 
    sustainDuration: number, 
    releaseDuration: number,
}

export const useADSRStore = create<ADSRStore>((set) => ({
    isEnabled: false,
    adsr: {
        attackDuration: 0.5,
        peakLevel: 0.4,
        decayDuration: 0.5,
        sustainLevel: 0.2,
        sustainDuration: 0.5,
        releaseDuration: 0.5,
    },
    setIsEnabled: (value: boolean) => {
        set((state) => ({ isEnabled: value }));
    },
    setAttackDuration: (duration: number) => {
        set((state) => ({ adsr: { ...state.adsr, attackDuration: duration } }));
    },
    setPeakLevel: (level: number) => {
        set((state) => ({ adsr: { ...state.adsr, peakLevel: level } }));
    },
    setDecayDuration: (duration: number) => {
        set((state) => ({ adsr: { ...state.adsr, decayDuration: duration } }));
    },
    setSustainLevel: (level: number) => {
        set((state) => ({ adsr: { ...state.adsr, sustainLevel: level } }));
    },
    setSustainDuration: (duration: number) => {
        set((state) => ({ adsr: { ...state.adsr, sustainDuration: duration } }));
    },
    setReleaseDuration: (duration: number) => {
        set((state) => ({ adsr: { ...state.adsr, releaseDuration: duration } }));
    },
}));