import { useEffect, useRef } from "react";
import { useOscilloscopeStore } from "../stores/OscilloscopeStore";


export default function OscilloscopeGraph() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const oscilloscopeAnalyserNode = useOscilloscopeStore((state) => state.analyserNode);   
    const dataArray = new Uint8Array(oscilloscopeAnalyserNode.frequencyBinCount)

    function drawOscilloscope() {
        if (canvasRef === null) return;
        const context = canvasRef.current?.getContext("2d");
        if (context === null || context === undefined) return;

        //const dataArray = new Uint8Array(oscilloscopeAnalyserNode.frequencyBinCount);
        oscilloscopeAnalyserNode.getByteTimeDomainData(dataArray)
        
        const animationId = requestAnimationFrame(drawOscilloscope);

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        const startY = context.canvas.height / 2;
        const xWidth = context.canvas.width / dataArray.length;
        const yHeight = context.canvas.height / 256;
        var currentX = 0 + xWidth;
        context.beginPath();
        context.moveTo(0, startY);
        for (let i = 0; i < dataArray.length; i++) {
            context.lineTo(currentX, dataArray[i] * yHeight);
            currentX += xWidth;
        }
        context.stroke();


    }


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d')

        drawOscilloscope();
    }, []);



    return (
    <canvas width={600} height={150} className="border border-blue-600" ref={canvasRef}>

    </canvas>
    );
}