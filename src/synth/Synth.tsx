import { ChangeEvent, useContext, useEffect, useReducer, useState } from "react"
import '../index.css';
import { ADSRStore, useADSRStore } from "../stores/ADSRStore";
import ADSRControl from "./ADSRControl";
import ADSRGraph from "./ADSRGraph";
import { useSynthStore } from "../stores/SynthStore";
import { useOsc1Store } from "../stores/OscStore";
import { useDawStore } from "../stores/DawStore";
import HorizontalPiano from "./HorizontalPiano";
import { keyToFreq, noteToFreq } from "./NoteMappings";
import { UseKeypressStore } from "../stores/KeypressStore";
import OscilloscopeGraph from "./OscilloscopeGraph";
import { useOscilloscopeStore } from "../stores/OscilloscopeStore";
import FrequencyGraph from "./FrequencyGraph";
import OscControl from "./OscControl";
import { useReverb1Store } from "../stores/ReverbStore";
import ReverbControl from "./ReverbControl";


export default function Synth() {
    
    
    const dawStore = useDawStore();
    const synthStore = useSynthStore();
    const osc1Store = useOsc1Store();
    const oscilloscopeStore = useOscilloscopeStore();
    const reverb1Store = useReverb1Store();

    useEffect(() => {
        synthStore.initializeSynthNodes();
        
        if (reverb1Store.isEnabled) {
            osc1Store.setDestinationNode(reverb1Store.convolverNode);
            reverb1Store.setDestinationNode(oscilloscopeStore.analyserNode);
            reverb1Store.initializeReverb();
        } else {
            osc1Store.setDestinationNode(oscilloscopeStore.analyserNode);
        }

        oscilloscopeStore.initialize();
        
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();

            const key: string = event.key.toUpperCase();
            const freq = keyToFreq(key);
            const isNotePlaying = UseKeypressStore.getState().keypressSet.has(key)

            if (freq !== undefined && !isNotePlaying) {
                UseKeypressStore.getState().addKeypress(key);
                useOsc1Store.getState().playOsc(key);
            }
        };
    
        // Function to handle keyup event
        const handleKeyUp = (event: KeyboardEvent) => {
            event.preventDefault();
            const key: string = event.key.toUpperCase();
            UseKeypressStore.getState().removeKeypress(key);
            useOsc1Store.getState().stopOsc(key);
        };
    
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };

    }, [reverb1Store.isEnabled]);

    return (
    <div>
        <div className="flex">
            <OscControl />
            <ReverbControl />
        </div>
        
        <ADSRControl />
        <ADSRGraph />
        <HorizontalPiano />
        <FrequencyGraph />
        <OscilloscopeGraph />
    </div>
    )
}