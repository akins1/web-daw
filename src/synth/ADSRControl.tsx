import { useContext, useState } from "react";
import { ADSRStore, useADSRStore } from "../stores/ADSRStore";
import Rotary from "./Rotary";

export default function ADSRControl() {

    const adsrStore: ADSRStore = useADSRStore();

    function handleAttackDurationChange(e: any) { 
        const newValue = Math.round(e.target.value * 100) / 100;
        adsrStore.setAttackDuration(newValue);
    }
    function handlePeakLevelChange(e: any) {
        const newValue = Math.round(e.target.value * 1000) / 1000;
        adsrStore.setPeakLevel(newValue);

        if (adsrStore.adsr.sustainLevel > newValue) {
            adsrStore.setSustainLevel(newValue);
        }
    }
    function handleDecayDurationChange(e: any) { 
        const newValue = Math.round(e.target.value * 100) / 100;
        adsrStore.setDecayDuration(newValue);
    }
    function handleSustainLevelChange(e: any) {
        const newValue = Math.round(e.target.value * 1000) / 1000;
        adsrStore.setSustainLevel(newValue); 
    }
    function handleSustainDurationChange(e: any) { 
        const newValue = Math.round(e.target.value * 100) / 100;
        adsrStore.setSustainDuration(newValue);
    }
    function handleReleaseDurationChange(e: any) { 
        const newValue = Math.round(e.target.value * 100) / 100;
        adsrStore.setReleaseDuration(newValue);
    }

    // const [value, setValue] = useState<number>(0);
    // const handleChange = (newValue: number) => {
    //     console.log(value);
    //     setValue(newValue);
    // };
    function setEnableADSR(value: boolean) {
        adsrStore.setIsEnabled(value);
    }


    return (
    <div className="rounded-md border border-gray-500 w-fit p-2 m-2">
        <div>
            <input type="checkbox" checked={adsrStore.isEnabled} onChange={() => setEnableADSR(!adsrStore.isEnabled)} />
            <label className="ml-2">Enable</label>
        </div>
        <div className="flex">
            <input disabled={!adsrStore.isEnabled} type="range" min={0} max={0.04} step={0.001} defaultValue={adsrStore.adsr.peakLevel} onChange={handlePeakLevelChange} />
            <div>Peak Level: {adsrStore.adsr.peakLevel}</div>
        </div>
        <div className="flex">
            <input disabled={!adsrStore.isEnabled} type="range" min={0} max={adsrStore.adsr.peakLevel} step={0.001} value={adsrStore.adsr.sustainLevel} onChange={handleSustainLevelChange} />
            <div>Sustain Level: {adsrStore.adsr.sustainLevel}</div>
        </div>
        <div className="p-2"></div>
        <div className="flex">
            <input disabled={!adsrStore.isEnabled} type="range" min={0} max={2} step={0.01} defaultValue={adsrStore.adsr.attackDuration} onChange={handleAttackDurationChange} />
            <div>Attack Duration: {adsrStore.adsr.attackDuration}</div>
        </div>
        
        <div className="flex">
            <input disabled={!adsrStore.isEnabled} type="range" min={0} max={2} step={0.01} defaultValue={adsrStore.adsr.decayDuration} onChange={handleDecayDurationChange} />
            <div>Decay Duration: {adsrStore.adsr.decayDuration}</div>
        </div>
        
        <div className="flex">
            <input disabled={!adsrStore.isEnabled} type="range" min={0} max={2} step={0.01} defaultValue={adsrStore.adsr.sustainDuration} onChange={handleSustainDurationChange} />
            <div>Sustain Duration: {adsrStore.adsr.sustainDuration}</div>
        </div>
        <div className="flex">
            <input disabled={!adsrStore.isEnabled} type="range" min={0} max={2} step={0.01} defaultValue={adsrStore.adsr.releaseDuration} onChange={handleReleaseDurationChange} />
            <div>Release Duration: {adsrStore.adsr.releaseDuration}</div>
        </div>
        
    </div>
    )
}