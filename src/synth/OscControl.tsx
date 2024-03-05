import { ChangeEvent } from "react";
import { OscStore, useOsc1Store } from "../stores/OscStore";
import { ADSRStore, useADSRStore } from "../stores/ADSRStore";


export default function OscControl() {

    const adsrStore: ADSRStore = useADSRStore();
    const osc1Store: OscStore = useOsc1Store();

    function handleOscGainChange(e: any) { 
        const newValue = Math.round(e.target.value * 100) / 100;
        osc1Store.setOscGain(newValue);
    }

    return (
    <div className="rounded-md border border-gray-400 w-fit p-2 m-2">
        <div className="font-semibold text-lg">Osc 1</div>
        <div className="">
            <label>Waveshape: </label>
            <select onChange={(e: ChangeEvent<HTMLSelectElement>) => useOsc1Store.getState().setOscType(e.target.value as OscillatorType)}>
                <option value={"sine"}>Sine</option>
                <option value={"triangle"}>Triangle</option>
                <option value={"sawtooth"}>Sawtooth</option>
                <option value={"square"}>Square</option>
                <option value={"sine"}>Custom TODO</option>
            </select>
        </div>
        <div>
            
            <label>Octave: </label>
            <select defaultValue={"0"} onChange={(e: ChangeEvent<HTMLSelectElement>) => osc1Store.setOctaveOffset(parseInt(e.target.value))}>
                <option value={"-2"}>-2</option>
                <option value={"-1"}>-1</option>
                <option value={"0"}>0</option>
                <option value={"1"}>+1</option>
                <option value={"2"}>+2</option>
            </select>
            
        </div>
        <div className="flex">
            <input type="range" 
                   min={0} 
                   max={0.2} 
                   disabled={adsrStore.isEnabled} 
                   defaultValue={useOsc1Store.getState().oscGain} 
                   step={0.01} 
                   onChange={(e: ChangeEvent<HTMLInputElement>) => handleOscGainChange(e)} 
            />
            <div>Gain: {osc1Store.oscGain}</div>
        </div>
    </div>
    );
}