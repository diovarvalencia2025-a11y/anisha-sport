import React, { useState } from 'react';
import { Sliders, Sparkles } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <section className="py-24 sm:py-36 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-volt uppercase block mb-2">
              21 // TRANSICIÓN DE INGENIERÍA
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white">
              ESTRUCTURA INTERNA VS. REALIDAD
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/50 max-w-sm mt-2 md:mt-0 font-light">
            Desliza sobre la imagen para revelar el chasis interno de fibra y amortiguación dentro de nuestras zapatillas de competición.
          </p>
        </div>

        {/* INTERACTIVE COMPARISON CONTAINER */}
        <div
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-surface border border-surface-border cursor-ew-resize select-none shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
        >
          {/* IMAGE 1: RAW PRODUCTION REALITY */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1800&auto=format&fit=crop"
              alt="ANISHA Acabado Real"
              className="w-full h-full object-cover filter contrast-[1.1]"
            />
            <div className="absolute bottom-6 left-6 z-10 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono font-bold text-white uppercase">
              CALZADO TERMINADO (EDICIÓN VOLT)
            </div>
          </div>

          {/* IMAGE 2: CARBON MATRIX LAB (CLIPPED) */}
          <div
            className="absolute inset-0 z-10 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1800&auto=format&fit=crop"
              alt="ANISHA Estructura Interna"
              className="w-full h-full object-cover filter grayscale contrast-[1.4] brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-volt/10 mix-blend-color-dodge" />
            <div className="absolute bottom-6 right-6 z-10 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-volt/50 text-xs font-mono font-black text-volt uppercase">
              ESQUELETO Y MATRIZ INTERNA
            </div>
          </div>

          {/* DIVIDER HANDLE LINE */}
          <div
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-volt shadow-[0_0_20px_#CCFF00] pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-volt text-black flex items-center justify-center font-mono font-bold text-xs shadow-[0_0_25px_#CCFF00]">
              ↔
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
