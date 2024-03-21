import { ChangeEvent } from "react";
import { OscStore, useOsc1Store, useOsc2Store } from "../stores/OscStore";
import { ADSRStore, useADSRStore } from "../stores/ADSRStore";


export default function OscControl() {

    const adsrStore: ADSRStore = useADSRStore();
    const osc1Store: OscStore = useOsc1Store();
    const osc2Store: OscStore = useOsc2Store();

    function handleOsc1GainChange(e: any) { 
        const newValue = Math.round(e.target.value * 1000) / 1000;
        osc1Store.setOscGain(newValue);
    }

    function handleOsc2GainChange(e: any) { 
        const newValue = Math.round(e.target.value * 1000) / 1000;
        osc2Store.setOscGain(newValue);
    }

    function setEnableOsc1(value: boolean) {
        osc1Store.setIsEnabled(value);
    }
    function setEnableOsc2(value: boolean) {
        osc2Store.setIsEnabled(value);
    }
    function handleVoiceCountChange1(value: number) {
        osc1Store.setVoiceCount(value)
    }
    function handleVoiceCountChange2(value: number) {
        osc2Store.setVoiceCount(value)
    }
    function handleDetuneChange(value: number) {
        osc1Store.setOscDetune(value);
    }
    function handleDetuneChange2(value: number) {
        osc2Store.setOscDetune(value);
    }

    return (
    <div className="rounded-md border flex border-gray-400 w-fit p-2 m-2">
        <div>
            <div className="font-semibold text-lg">Osc 1</div>
            <div>
                <input type="checkbox" checked={osc1Store.isEnabled} onChange={() => setEnableOsc1(!osc1Store.isEnabled)} />
                <label>Enable</label>
            </div>
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
                    <option value={"2"}>+2</option>
                    <option value={"1"}>+1</option>
                    <option value={"0"}>0</option>
                    <option value={"-1"}>-1</option>
                    <option value={"-2"}>-2</option>
                </select>
                
            </div>
            <div className="flex">
                <input type="range" 
                    min={0} 
                    max={0.1} 
                    disabled={adsrStore.isEnabled} 
                    defaultValue={useOsc1Store.getState().oscGain} 
                    step={0.001} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleOsc1GainChange(e)} 
                />
                <div>Gain: {osc1Store.oscGain}</div>
            </div>
            <div>
                <label>Voices</label>
                <select defaultValue={1} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleVoiceCountChange1(parseInt(e.target.value))}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>
            </div>
            <div>
                <input disabled={osc1Store.voiceCount == 1} type="range" defaultValue={0} min={0} max={100} onChange={(e: ChangeEvent<HTMLInputElement>) => handleDetuneChange(parseInt(e.target.value))} />
                <label>Voice Detune: {osc1Store.oscDetune}</label>
            </div>
        </div>
        <div>
            <div className="font-semibold text-lg">Osc 2</div>
            <div>
                <input type="checkbox" checked={osc2Store.isEnabled} onChange={() => setEnableOsc2(!osc2Store.isEnabled)} />
                <label>Enable</label>
            </div>
            <div className="">
                <label>Waveshape: </label>
                <select onChange={(e: ChangeEvent<HTMLSelectElement>) => useOsc2Store.getState().setOscType(e.target.value as OscillatorType)}>
                    <option value={"sine"}>Sine</option>
                    <option value={"triangle"}>Triangle</option>
                    <option value={"sawtooth"}>Sawtooth</option>
                    <option value={"square"}>Square</option>
                    <option value={"sine"}>Custom TODO</option>
                </select>
            </div>
            <div>
                
                <label>Octave: </label>
                <select defaultValue={"0"} onChange={(e: ChangeEvent<HTMLSelectElement>) => osc2Store.setOctaveOffset(parseInt(e.target.value))}>
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
                    max={0.1} 
                    disabled={adsrStore.isEnabled} 
                    defaultValue={useOsc2Store.getState().oscGain} 
                    step={0.001} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleOsc2GainChange(e)} 
                />
                <div>Gain: {osc2Store.oscGain}</div>
            </div>
            <div>
                <label>Voices</label>
                <select defaultValue={1} onChange={(e: ChangeEvent<HTMLSelectElement>) => handleVoiceCountChange2(parseInt(e.target.value))}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>
            </div>
            <div>
                <input disabled={osc2Store.voiceCount == 1} type="range" defaultValue={0} min={0} max={100} onChange={(e: ChangeEvent<HTMLInputElement>) => handleDetuneChange2(parseInt(e.target.value))} />
                <label>Voice Detune: {osc2Store.oscDetune}</label>
            </div>
        </div>
    </div>
    );
}