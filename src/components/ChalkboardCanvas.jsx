import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Palette, Sparkles } from 'lucide-react';

export default function ChalkboardCanvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [chalkColor, setChalkColor] = useState('#fef08a'); // Yellow chalk
  const [chalkSize, setChalkSize] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set initial chalkboard text
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 14px Fredoka, sans-serif';
    ctx.fillStyle = '#a7f3d0';
    ctx.fillText('✏️ Draw on the Chalkboard!', 12, 22);
    ctx.font = '12px Fredoka, sans-serif';
    ctx.fillStyle = '#ecfdf5';
    ctx.fillText('Draw stars ⭐️, rockets 🚀 or smiley faces!', 12, 40);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.strokeStyle = chalkColor;
    ctx.lineWidth = chalkSize;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 3;
    ctx.shadowColor = chalkColor;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 14px Fredoka, sans-serif';
    ctx.fillStyle = '#a7f3d0';
    ctx.fillText('✏️ Draw on the Chalkboard!', 12, 22);
  };

  return (
    <div className="relative flex flex-col items-center bg-emerald-950 p-2 rounded-2xl border-4 border-amber-800 shadow-xl pointer-events-auto">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={360}
        height={100}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="cursor-crosshair touch-none bg-emerald-900 rounded-xl w-full h-24"
      />

      {/* Chalk Tools Palette */}
      <div className="flex items-center justify-between w-full mt-2 px-1 text-xs font-bold text-emerald-200">
        <div className="flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-amber-300" />
          {['#ffffff', '#fef08a', '#7dd3fc', '#f472b6'].map((color) => (
            <button
              key={color}
              onClick={() => setChalkColor(color)}
              className={`w-5 h-5 rounded-full border-2 transition-transform ${
                chalkColor === color ? 'scale-125 border-white ring-2 ring-emerald-400' : 'border-emerald-700'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <button
          onClick={clearBoard}
          className="flex items-center gap-1 bg-emerald-800 hover:bg-emerald-700 px-2 py-0.5 rounded-lg border border-emerald-600 text-[11px]"
        >
          <Eraser className="w-3 h-3 text-emerald-200" />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}
