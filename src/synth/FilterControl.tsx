import { ChangeEvent } from "react";
import { useFilter1Store } from "../stores/FilterStore";

export default function FilterControl() {

    const filter1Store = useFilter1Store();

    const setFilter1Enabled = (value: boolean) => {
        filter1Store.setIsEnabled(value);
    };

    const setFilter1Freq = (rawSliderValue: number) => {
        //const newValue = Math.trunc(freqToXAxis(rawSliderValue, 20000));
        const newValue = Math.trunc(mapLog(rawSliderValue, 1, 2000, Math.log(1), Math.log(20000)));
        console.log(newValue);
        filter1Store.setFreq(newValue);
    }

    // Credit for formula: https://www.youtube.com/watch?v=15632YFDAzo
    function mapLog(value: number, in_min: number, in_max: number, out_min: number, out_max: number) {
        return Math.exp((value - in_min) * ((out_max - out_min) / (in_max - in_min)) + out_min);
    }

    return (
    <div className="m-2 p-2 border border-gray-400">
        <div>
            Filter 1
        </div>
        <div>
            <input type="checkbox"
                   checked={filter1Store.isEnabled} 
                   onChange={() => setFilter1Enabled(!useFilter1Store.getState().isEnabled)} />
            <label>Enabled</label>
        </div>
        <div>
            <label>Type</label>
            <select defaultValue={filter1Store.filterType} 
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                        filter1Store.setType(e.target.value as BiquadFilterType)}
            >
                <option value={"lowpass"}>Low Pass</option>
                <option value={"highpass"}>High Pass</option>
                <option value={"bandpass"}>Bandpass</option>
                <option value={"lowshelf"}>Low Shelf</option>
                <option value={"highshelf"}>High Shelf</option>
                <option value={"peaking"}>Peaking</option>
                <option value={"notch"}>Notch</option>
                <option value={"allpass"}>All Pass</option>
            </select>
        </div>
        <div>
            <input type="range"
                   min={1}
                   max={2000} 
                   step={1}
                   //defaultValue={filter1Store.filterFreq} 
                   onChange={(e: ChangeEvent<HTMLInputElement>) => 
                    //    filter1Store.setFreq(parseInt(e.target.value))}
                    setFilter1Freq(parseInt(e.target.value))
                }
            />
            <label>Frequency: {filter1Store.filterFreq}</label>
        </div>
    </div>
    );
}