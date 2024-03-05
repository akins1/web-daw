import { useEffect, useRef, useState } from "react";
import { useOscilloscopeStore } from "../stores/OscilloscopeStore";


export default function FrequencyGraph() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const oscilloscopeAnalyserNode = useOscilloscopeStore((state) => state.analyserNode);   
    const dataArray = new Uint8Array(oscilloscopeAnalyserNode.frequencyBinCount)
    const [isAreaGraph, setIsAreaGraph] = useState(true);

    // https://abarrafato.medium.com/building-a-real-time-spectrum-analyzer-plot-using-html5-canvas-web-audio-api-react-46a495a06cbf
    function freqToXAxis(frequency: number, width: number) {
        const minF = Math.log(20) / Math.log(10);
        const maxF = Math.log(20000) / Math.log(10);
        const range = maxF - minF;

        return (Math.log(frequency) / Math.log(10) - minF) / range * width;
    }

    function drawOscilloscope() {
        if (canvasRef === null) return;
        const context = canvasRef.current?.getContext("2d");
        if (context === null || context === undefined) return;

        //const dataArray = new Uint8Array(oscilloscopeAnalyserNode.frequencyBinCount);
        oscilloscopeAnalyserNode.getByteFrequencyData(dataArray)
        
        const animationId = requestAnimationFrame(drawOscilloscope);

        if (isAreaGraph)
            drawArea(context);
        else
            drawFreq(context);
    }

    function drawArea(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        const xWidth = context.canvas.width / dataArray.length;
        const yHeight = context.canvas.height / 256;
        context.beginPath();
        context.moveTo(0, context.canvas.height);
        for (let i = 0; i < dataArray.length; i++) {
            const currentX = freqToXAxis(i*10, context.canvas.width);
            context.lineTo(currentX, context.canvas.height - dataArray[i] * yHeight);
            
        }
        context.stroke();
    }

    function drawFreq(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        
        const xWidth = context.canvas.width / dataArray.length;
        const yHeight = context.canvas.height / 256;
        
        context.beginPath();
        context.moveTo(0, context.canvas.height);
        for (let i = 0; i < dataArray.length; i++) {
            const currentX = freqToXAxis(i*10, context.canvas.width);
            
            context.fillRect(currentX, context.canvas.height, xWidth, -yHeight * dataArray[i]);
            
        }
        context.stroke();
    }


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d')

        drawOscilloscope();
    }, [isAreaGraph]);



    return (
    <div className="border border-gray-600 rounded-md p-2 m-2 w-fit">
        <div>
            <input type="checkbox" checked={isAreaGraph} onChange={(e) => setIsAreaGraph(!isAreaGraph)} />
            <label className="ml-2">Area</label>
        </div>
        <canvas width={600} height={150} className="" ref={canvasRef}>

        </canvas>
    </div>
    );
}