import { useEffect, useRef, useState } from "react";
import "./Rotary.css"

export default function  Rotary ({ value, min, max, onChange }: 
    { value: number, min: number, max: number, onChange: any}) {
        
        const [dragging, setDragging] = useState(false);
        const [startY, setStartY] = useState(0);
        const [startValue, setStartValue] = useState(0);
        const rotaryRef = useRef<HTMLDivElement>(null);
      
        const handleMouseDown = (event: any) => {
          event.preventDefault();
          setDragging(true);
          setStartY(event.clientY);
          setStartValue(value);
        };
      
        useEffect(() => {
            const handleMouseMove = (event: any) => {
              if (!dragging || rotaryRef.current === null) return;
              const deltaY = event.clientY - startY;
              const range = max - min;
              const sensitivity = 0.05; // Adjust this value to control the movement sensitivity
              const scaledDelta = deltaY * sensitivity;
              const deltaValue = (rotaryRef.current.offsetHeight / 360) * scaledDelta * range;
              const newValue = startValue - deltaValue;
              const clampedValue = Math.min(Math.max(newValue, min), max);
              onChange(clampedValue);
            };
        
            const handleMouseUp = () => {
              setDragging(false);
            };
        
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        
            return () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
          }, [dragging, startY, startValue, min, max, onChange]);
      
        return (
          <div
            ref={rotaryRef}
            className="w-10 h-10 bg-black"
            onMouseDown={handleMouseDown}
       
          >
            
                {/* <div
                className="bg-blue-600 w-10 h-10 rounded-full"
                style={{ transform: `rotate(${((value - min) / (max - min)) * 360}deg)` }}
                /> */}
                <div className="handle" style={{ transform: `rotate(${((value - min) / (max - min)) * 360 + 90}deg)` }}></div>
                <div
                className="arc"
                style={{
                 // Set the width of the arc dynamically
                transform: `skew(${((value - min) / (max - min)) * 360 + 90}deg)`,
                }}
            />

            <div>{value}</div>
          </div>
        );
  };
  