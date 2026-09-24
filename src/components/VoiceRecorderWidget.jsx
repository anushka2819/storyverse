import React, { useState, useRef } from 'react';
import { Mic, Square, Play, RefreshCw, Volume2, Sparkles } from 'lucide-react';
import { soundFX } from '../services/soundEffects';

export default function VoiceRecorderWidget({ currentSentenceText = "" }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    soundFX.playPop();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        soundFX.playSparkle();
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.warn("Microphone access unavailable or declined:", err);
      // Fallback demo recording state if mic is restricted
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        soundFX.playSparkle();
      }, 3000);
    }
  };

  const stopRecording = () => {
    soundFX.playPop();
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  const playRecordedAudio = () => {
    soundFX.playPop();
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      soundFX.playStoryChime();
    }
  };

  return (
    <div className="bg-amber-100/90 border-2 border-amber-300 p-2.5 rounded-2xl shadow-xs flex items-center justify-between gap-2 font-['Fredoka',sans-serif]">
      <div className="flex items-center gap-2 min-w-0">
        <span className="p-1.5 bg-rose-400 text-white rounded-xl shadow-2xs shrink-0">
          🎙️
        </span>
        <div className="truncate">
          <h4 className="text-xs font-black text-amber-950 flex items-center gap-1">
            <span>Read Aloud Voice Recorder</span>
            {isRecording && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />}
          </h4>
          <p className="text-[10px] font-bold text-amber-800 truncate">
            {isRecording ? "🔴 Listening... Speak clearly into microphone!" : audioUrl ? "✨ Recording Saved! Click ▶️ to hear yourself!" : "Tap 🎙️ to record your reading voice!"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-2.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs flex items-center gap-1 shadow-sm border border-white active:scale-95 transition-all cursor-pointer"
            title="Record your voice"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Record 🎙️</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-white font-black text-xs flex items-center gap-1 shadow-sm border border-white active:scale-95 transition-all cursor-pointer animate-pulse"
            title="Stop Recording"
          >
            <Square className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Done ⏹️</span>
          </button>
        )}

        {audioUrl && !isRecording && (
          <button
            onClick={playRecordedAudio}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs flex items-center gap-1 shadow-sm border border-white active:scale-95 transition-all cursor-pointer"
            title="Play back your voice recording"
          >
            <Play className="w-3.5 h-3.5 fill-emerald-950" />
            <span>Listen ▶️</span>
          </button>
        )}
      </div>
    </div>
  );
}
