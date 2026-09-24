import React, { useRef, useState, useEffect } from 'react';
import { X, RotateCcw, Download, Sparkles, Paintbrush, Eraser, Heart, Star } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

const PALETTE = [
  '#ef4444', // Red
  '#f97316', // Orange
  '#eab308', // Yellow / Gold
  '#22c55e', // Green
  '#06b6d4', // Cyan
  '#3b82f6', // Sky Blue
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#1e293b', // Slate Dark
  '#ffffff'  // White
];

const STAMPS = ['🌟', '❤️', '🦊', '🐰', '🎀', '🚀', '🐻', '👑', '🎈', '✨'];

const TEMPLATES = [
  { id: 'blank', label: '🎨 Blank Canvas', emoji: '✨' },
  { id: 'fox', label: '🦊 Milo the Fox', emoji: '🦊' },
  { id: 'doll', label: '🎀 Lily Doll', emoji: '🎀' },
  { id: 'rocket', label: '🚀 Rocky Rocket', emoji: '🚀' },
  { id: 'bottle', label: '💧 Buddy Bottle', emoji: '💧' }
];

export default function ColoringEaselModal({ onClose, onDrawingSaved = () => {} }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#3b82f6');
  const [brushSize, setBrushSize] = useState(12);
  const [tool, setTool] = useState('brush'); // 'brush' | 'eraser' | 'stamp'
  const [selectedStamp, setSelectedStamp] = useState('🌟');
  const [template, setTemplate] = useState('blank');

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTemplateOutline(ctx, template, canvas.width, canvas.height);
  }, [template]);

  const drawTemplateOutline = (ctx, templateId, w, h) => {
    ctx.save();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (templateId === 'fox') {
      // Simple cute fox head outline
      ctx.beginPath();
      ctx.moveTo(w * 0.3, h * 0.3); // Left ear
      ctx.lineTo(w * 0.2, h * 0.5);
      ctx.lineTo(w * 0.4, h * 0.5);
      ctx.moveTo(w * 0.7, h * 0.3); // Right ear
      ctx.lineTo(w * 0.8, h * 0.5);
      ctx.lineTo(w * 0.6, h * 0.5);
      // Face
      ctx.arc(w * 0.5, h * 0.55, w * 0.25, 0, Math.PI * 2);
      ctx.stroke();
      // Eyes & Snout
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(w * 0.42, h * 0.5, 8, 0, Math.PI * 2);
      ctx.arc(w * 0.58, h * 0.5, 8, 0, Math.PI * 2);
      ctx.arc(w * 0.5, h * 0.6, 12, 0, Math.PI * 2);
      ctx.fill();
    } else if (templateId === 'rocket') {
      // Rocket outline
      ctx.beginPath();
      ctx.moveTo(w * 0.5, h * 0.15);
      ctx.quadraticCurveTo(w * 0.7, h * 0.4, w * 0.65, h * 0.7);
      ctx.lineTo(w * 0.35, h * 0.7);
      ctx.quadraticCurveTo(w * 0.3, h * 0.4, w * 0.5, h * 0.15);
      ctx.stroke();
      // Porthole
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.45, w * 0.08, 0, Math.PI * 2);
      ctx.stroke();
    } else if (templateId === 'bottle') {
      // Bottle outline
      ctx.beginPath();
      ctx.rect(w * 0.42, h * 0.2, w * 0.16, h * 0.1);
      ctx.rect(w * 0.35, h * 0.3, w * 0.3, h * 0.5);
      ctx.stroke();
    }
    ctx.restore();
  };

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if (e.touches && e.touches[0]) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    const pos = getPos(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (tool === 'stamp') {
      soundFX.playPop();
      ctx.font = `${brushSize * 3}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedStamp, pos.x, pos.y);
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!isDrawing || tool === 'stamp') return;
    const pos = getPos(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
    } else {
      ctx.strokeStyle = color;
    }

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    soundFX.playPop();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTemplateOutline(ctx, template, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    soundFX.playSparkle();
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `storyverse-art-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    onDrawingSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/70 backdrop-blur-md animate-fadeIn font-['Fredoka',sans-serif]">
      <div className="bg-gradient-to-b from-sky-100 via-amber-50 to-indigo-100 border-4 border-sky-400 rounded-3xl p-4 md:p-5 w-full max-w-2xl shadow-2xl relative flex flex-col gap-3 max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-sky-200 pb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-300 rounded-2xl border border-amber-400 text-amber-950 text-xl shadow-xs">
              🎨
            </span>
            <div>
              <h2 className="text-lg md:text-xl font-black text-sky-950 flex items-center gap-1.5">
                <span>Storybook Coloring & Doodle Easel</span>
                <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
              </h2>
              <p className="text-xs font-bold text-sky-800">
                Color your favorite story characters or paint your own magic!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-rose-200 hover:bg-rose-300 text-rose-950 font-black flex items-center justify-center shadow-md border-2 border-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Template Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-black text-sky-900 shrink-0">Template:</span>
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => {
                soundFX.playPop();
                setTemplate(t.id);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all border cursor-pointer ${
                template === t.id
                  ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-sm scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* Canvas Workspace */}
        <div className="relative bg-white rounded-2xl border-4 border-amber-300 shadow-inner overflow-hidden flex items-center justify-center touch-none">
          <canvas
            ref={canvasRef}
            width={600}
            height={380}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-auto max-h-[360px] cursor-crosshair object-contain bg-white"
          />
        </div>

        {/* Tools Toolbar */}
        <div className="bg-white/90 p-3 rounded-2xl border-2 border-sky-300 shadow-sm flex flex-col gap-2.5">
          
          {/* Tool Modes & Brush Sizes */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => { soundFX.playPop(); setTool('brush'); }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition-all border cursor-pointer ${
                  tool === 'brush' ? 'bg-sky-500 text-white border-sky-600 shadow-sm' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Paintbrush className="w-3.5 h-3.5" />
                <span>Paint</span>
              </button>

              <button
                onClick={() => { soundFX.playPop(); setTool('eraser'); }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition-all border cursor-pointer ${
                  tool === 'eraser' ? 'bg-rose-500 text-white border-rose-600 shadow-sm' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Eraser</span>
              </button>

              <button
                onClick={() => { soundFX.playPop(); setTool('stamp'); }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition-all border cursor-pointer ${
                  tool === 'stamp' ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-sm' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-950" />
                <span>Stickers</span>
              </button>
            </div>

            {/* Brush Sizes */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[6, 14, 26].map(sz => (
                <button
                  key={sz}
                  onClick={() => setBrushSize(sz)}
                  className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center transition-all cursor-pointer ${
                    brushSize === sz ? 'bg-amber-400 text-amber-950 shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span style={{ width: sz / 2, height: sz / 2 }} className="rounded-full bg-current" />
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette or Sticker Selector */}
          {tool === 'stamp' ? (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              <span className="text-xs font-black text-slate-700 shrink-0">Sticker:</span>
              {STAMPS.map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStamp(st)}
                  className={`p-1.5 rounded-xl text-xl transition-all cursor-pointer border ${
                    selectedStamp === st ? 'bg-amber-300 border-amber-500 scale-110 shadow-xs' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              <span className="text-xs font-black text-slate-700 shrink-0">Color:</span>
              {PALETTE.map(c => (
                <button
                  key={c}
                  onClick={() => {
                    soundFX.playPop();
                    setColor(c);
                    if (tool === 'eraser') setTool('brush');
                  }}
                  style={{ backgroundColor: c }}
                  className={`w-7 h-7 rounded-xl border-2 transition-all cursor-pointer ${
                    color === c && tool === 'brush' ? 'border-amber-400 scale-115 shadow-md' : 'border-white shadow-2xs'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 mt-1">
          <button
            onClick={clearCanvas}
            className="px-4 py-2 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs flex items-center gap-1.5 shadow-sm border border-slate-300 cursor-pointer active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear All</span>
          </button>

          <button
            onClick={saveDrawing}
            className="px-5 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-sm flex items-center gap-2 shadow-md border-2 border-white cursor-pointer active:scale-95 transition-all"
          >
            <Download className="w-4 h-4 text-emerald-950" />
            <span>Save My Masterpiece! 🎨</span>
          </button>
        </div>

      </div>
    </div>
  );
}
