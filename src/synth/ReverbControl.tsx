import { useReverb1Store } from "../stores/ReverbStore";


export default function ReverbControl() {

    const reverb1Store = useReverb1Store();

    const setEnableReverb = (value: boolean) => {
        reverb1Store.setIsEnabled(value);
    };

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
        </div>
    </div>
    );
}