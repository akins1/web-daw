import { useEffect, useRef } from "react";
import { useADSRStore } from "../stores/ADSRStore";

export default function ADSRGraph() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { adsr, isEnabled } = useADSRStore();


    function drawEnvelope(context?: CanvasRenderingContext2D | null) {
        if (context === null || context === undefined) return;

        const attackStartX = 0;
        const attackStartY = context.canvas.height;
        const attackEndX = (context.canvas.width / 4) * (adsr.attackDuration / 2);
        const attackEndY = context.canvas.height * (1 - adsr.peakLevel * 10);
        const decayEndX = attackEndX + (context.canvas.width / 4) * (adsr.decayDuration / 2);
        const decayEndY = context.canvas.height * (1 - adsr.sustainLevel * 10);
        const sustainEndX = decayEndX + (context.canvas.width / 4) * (adsr.sustainDuration / 2);
        const sustainEndY = decayEndY; 
        const releaseEndX = sustainEndX + (context.canvas.width / 4) * (adsr.releaseDuration / 2);
        const releaseEndY = context.canvas.height;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.beginPath();
        context.lineWidth = 2;
        if (isEnabled) {
            context.strokeStyle = '#000000';
        } else {
            context.strokeStyle = '#cccccc';
        }
        
        context.moveTo(attackStartX, attackStartY);
        context.lineTo(attackEndX, attackEndY);
        context.lineTo(decayEndX, decayEndY);
        context.lineTo(sustainEndX, sustainEndY);
        context.lineTo(releaseEndX, releaseEndY);
        context.stroke();
    }

    function drawPlayLine(time: number, context?: CanvasRenderingContext2D | null) {
        if (context === null || context === undefined) return;

        
        context.beginPath();
        context.moveTo(time, 0);
        context.lineTo(time, context.canvas.height);
        context.stroke();
    }

    function animatePlayLine() {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        let count = 0
        let animationId: number;

        const interval = setInterval(() => {
            count++;
            drawPlayLine(count, context)
        }, 1)
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        // let count = 0
        // let animationId: number;
        
        // const renderer = () => {
        //     count++
        //     drawEnvelope(context)
        //     drawPlayLine(count, context)
        //     animationId = window.requestAnimationFrame(renderer)
        // }
        
        // renderer()


        // return () => {
        //    window.cancelAnimationFrame(animationId)
        // }
        
        drawEnvelope(context)
        
      }, [isEnabled, adsr.attackDuration, adsr.decayDuration, adsr.peakLevel, adsr.releaseDuration, adsr.sustainDuration, adsr.sustainLevel]);

    return (
    <div className="border rounded-md border-gray-600 p-2 m-2 w-fit">
        
        <canvas className="border border-gray-300" height={200} width={400} ref={canvasRef}></canvas>
    </div>
    )
}