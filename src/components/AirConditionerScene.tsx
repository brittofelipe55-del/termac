import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Thermometer, Wind, Zap, RotateCcw } from 'lucide-react';

// Lazy-load the Three.js 3D canvas so the initial page bundle is tiny (~70KB) and opens instantaneously on mobile
const ThreeCanvas = lazy(() => import('./ThreeCanvas'));

interface AirConditionerSceneProps {
  className?: string;
  onTempChange?: (temp: number) => void;
}

export const AirConditionerScene: React.FC<AirConditionerSceneProps> = ({
  className = '',
  onTempChange,
}) => {
  const [temperature, setTemperature] = useState<number>(21);
  const [activeMode, setActiveMode] = useState<'cool' | 'eco' | 'turbo'>('cool');
  const [enable3D, setEnable3D] = useState<boolean>(false);

  // Defer 3D canvas loading slightly so the initial mobile frame renders instantly in 0ms
  useEffect(() => {
    // Only load 3D after initial paint is complete
    const timer = setTimeout(() => {
      setEnable3D(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleTempAdjust = (delta: number) => {
    setTemperature((prev) => {
      const next = Math.min(28, Math.max(16, prev + delta));
      if (onTempChange) onTempChange(next);
      return next;
    });
  };

  const handleModeChange = (mode: 'cool' | 'eco' | 'turbo') => {
    setActiveMode(mode);
  };

  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* Visual Canvas Container */}
      <div className="w-full h-[320px] sm:h-[420px] md:h-[480px] relative z-10 flex items-center justify-center">
        {enable3D ? (
          <Suspense fallback={<InstantAcPlaceholder temperature={temperature} mode={activeMode} />}>
            <ThreeCanvas temperature={temperature} activeMode={activeMode} />
          </Suspense>
        ) : (
          <InstantAcPlaceholder temperature={temperature} mode={activeMode} />
        )}
      </div>

      {/* Atmospheric Ambient Glows (optimized with will-change-transform) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[480px] h-[280px] sm:h-[480px] bg-[#078BD0]/15 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none -z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] sm:w-[180px] h-[140px] sm:h-[180px] bg-[#19B8FF]/20 rounded-full blur-[50px] sm:blur-[60px] pointer-events-none -z-0" />

      {/* Interactive HUD / Unit Controls Bar */}
      <div className="relative z-20 -mt-4 sm:-mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 sm:p-2.5 rounded-2xl bg-[#0A111C]/90 border border-[#078BD0]/30 shadow-2xl backdrop-blur-xl max-w-xl mx-auto">
        {/* Temperature adjust controls */}
        <div className="flex items-center bg-[#05070B] rounded-xl px-2 py-1 border border-[#078BD0]/20">
          <button
            onClick={() => handleTempAdjust(-1)}
            aria-label="Diminuir temperatura"
            className="w-8 h-8 flex items-center justify-center text-white hover:text-[#19B8FF] hover:bg-[#078BD0]/20 rounded-lg transition-colors font-bold text-lg active:scale-95 touch-manipulation"
          >
            -
          </button>
          <div className="flex items-center gap-1 px-2.5 min-w-[70px] justify-center">
            <Thermometer className="w-4 h-4 text-[#19B8FF] shrink-0" />
            <span className="font-mono font-bold text-white text-sm sm:text-base">{temperature}°C</span>
          </div>
          <button
            onClick={() => handleTempAdjust(1)}
            aria-label="Aumentar temperatura"
            className="w-8 h-8 flex items-center justify-center text-white hover:text-[#19B8FF] hover:bg-[#078BD0]/20 rounded-lg transition-colors font-bold text-lg active:scale-95 touch-manipulation"
          >
            +
          </button>
        </div>

        {/* Climate Modes */}
        <div className="flex items-center gap-1 bg-[#05070B] p-1 rounded-xl border border-[#078BD0]/20">
          <button
            onClick={() => handleModeChange('cool')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all touch-manipulation ${
              activeMode === 'cool'
                ? 'bg-[#078BD0] text-white shadow-[0_0_12px_rgba(7,139,208,0.5)]'
                : 'text-[#A7B4C4] hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Cool</span>
          </button>

          <button
            onClick={() => handleModeChange('eco')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all touch-manipulation ${
              activeMode === 'eco'
                ? 'bg-[#078BD0] text-white shadow-[0_0_12px_rgba(7,139,208,0.5)]'
                : 'text-[#A7B4C4] hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Eco</span>
          </button>

          <button
            onClick={() => handleModeChange('turbo')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all touch-manipulation ${
              activeMode === 'turbo'
                ? 'bg-[#078BD0] text-white shadow-[0_0_12px_rgba(7,139,208,0.5)]'
                : 'text-[#A7B4C4] hover:text-white'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#19B8FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>Turbo</span>
          </button>
        </div>

        {/* Hint badge */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#A7B4C4] font-mono px-2">
          <RotateCcw className="w-3 h-3 text-[#078BD0]" />
          <span>Interativo</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Instantaneous Zero-Cost CSS/SVG Placeholder
 * Renders on the very first frame in 0ms without waiting for WebGL
 */
const InstantAcPlaceholder: React.FC<{ temperature: number; mode: string }> = ({
  temperature,
  mode,
}) => {
  return (
    <div className="w-full max-w-[340px] sm:max-w-[480px] flex flex-col items-center justify-center p-4">
      {/* AC Split Unit Frame */}
      <div className="w-full h-24 sm:h-32 rounded-2xl bg-gradient-to-b from-[#F8FAFC] via-[#EDF2F7] to-[#CBD5E1] p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(7,139,208,0.2)] border border-white/40 relative flex flex-col justify-between">
        {/* Top Intake Slat Lines */}
        <div className="flex justify-center gap-1 opacity-25 px-4 pt-1">
          <div className="h-0.5 flex-1 bg-slate-700 rounded-full" />
          <div className="h-0.5 flex-1 bg-slate-700 rounded-full" />
          <div className="h-0.5 flex-1 bg-slate-700 rounded-full" />
          <div className="h-0.5 flex-1 bg-slate-700 rounded-full" />
        </div>

        {/* Brand Accent Trim Line */}
        <div className="absolute top-[68%] left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#078BD0] to-transparent shadow-[0_0_8px_#19B8FF]" />

        {/* Front Panel with Embedded LED Display */}
        <div className="flex items-center justify-between px-4 sm:px-6 z-10">
          {/* Termac circle logo miniature */}
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-[#078BD0] flex items-center justify-center shadow-[0_0_6px_#078BD0]">
              <div className="w-2 h-1 border border-white rounded-[1px]" />
            </div>
            <span className="text-[10px] font-bold text-slate-600 tracking-wider">TERMAC</span>
          </div>

          {/* LED Display Readout */}
          <div className="bg-[#050A12] px-3 py-1 rounded-lg border border-[#078BD0]/40 shadow-[0_0_12px_rgba(25,184,255,0.4)] flex items-center gap-2">
            <span className="text-[9px] font-mono text-[#078BD0] uppercase font-bold">{mode}</span>
            <span className="text-base sm:text-lg font-bold font-mono text-white tracking-tight">
              {temperature}°C
            </span>
          </div>
        </div>

        {/* Lower Airflow Vent Flap */}
        <div className="h-2.5 sm:h-3 rounded-b-xl bg-[#09111C] border-t border-slate-300 flex items-center justify-center overflow-hidden">
          <div className="w-3/4 h-[1px] bg-[#19B8FF]/50" />
        </div>
      </div>

      {/* Downward Airflow Breeze lines (matching the 4 streams) */}
      <div className="flex justify-around w-4/5 pt-2 pb-1 relative">
        <div className="w-1 h-12 bg-gradient-to-b from-[#19B8FF] to-transparent rounded-full opacity-60 animate-pulse" />
        <div className="w-1 h-16 bg-gradient-to-b from-[#078BD0] to-transparent rounded-full opacity-80 animate-pulse delay-75" />
        <div className="w-1 h-16 bg-gradient-to-b from-[#078BD0] to-transparent rounded-full opacity-80 animate-pulse delay-150" />
        <div className="w-1 h-12 bg-gradient-to-b from-[#19B8FF] to-transparent rounded-full opacity-60 animate-pulse delay-200" />
      </div>
    </div>
  );
};
