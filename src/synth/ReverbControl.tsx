import { useReverb1Store } from "../stores/ReverbStore";


export default function ReverbControl() {

    const reverb1Store = useReverb1Store();

    const setEnableReverb = (value: boolean) => {
        reverb1Store.setIsEnabled(value);
    };
    const setReverbDuration = (value: number) => {
        reverb1Store.setDuration(value);
        reverb1Store.setFIRAudioBuffer(reverb1Store.duration, reverb1Store.decayFactor);
    };
    const setReverbDecayFactor = (value: number) => {
        reverb1Store.setDecayFactor(value);
        reverb1Store.setFIRAudioBuffer(reverb1Store.duration, reverb1Store.decayFactor);
    }
    const setReverbGain = (value: number) => {
        reverb1Store.setGain(value);
        reverb1Store.setFIRAudioBuffer(reverb1Store.duration, reverb1Store.decayFactor);
    }

    return (
    <div className="rounded-md border border-gray-400 m-2 p-2">
        <div>
            Reverb
        </div>
        <div>
            <div>
                <input type="checkbox" checked={reverb1Store.isEnabled} onChange={() => setEnableReverb(!reverb1Store.isEnabled)} />
                <label className="ml-2">Enable</label>
            </div>
            <div className="flex">
                <input 
                    type="range" 
                    disabled={! reverb1Store.isEnabled} 
                    min={0.1} 
                    max={8} 
                    step={0.1}
                    onChange={(e) => setReverbDuration(parseFloat(e.target.value))} 
                />
                <div>Duration: {reverb1Store.duration}</div>
            </div>
            <div className="flex">
                {/* <label>Decay Factor</label> */}
                <input 
                    type="range" 
                    disabled={! reverb1Store.isEnabled} 
                    min={0.1} 
                    max={20} 
                    step={0.1}
                    onChange={(e) => setReverbDecayFactor(parseFloat(e.target.value))} 
                />
                <div>Decay Factor: {reverb1Store.decayFactor}</div>
            </div>
            {/* <div className="flex">
                
                <input 
                    type="range" 
                    disabled={! reverb1Store.isEnabled} 
                    min={0.01} 
                    max={0.5} 
                    step={0.01}
                    onChange={(e) => setReverbGain(parseFloat(e.target.value))} 
                />
                <div>Gain: {reverb1Store.gain}</div>
            </div> */}
        </div>
    </div>
    );
}