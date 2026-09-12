import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Play } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const HeroSection: React.FC = () => {
  const { navigateTo, playUiSound } = useNavigation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 25;
      const y = (e.clientY / innerHeight - 0.5) * 25;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background flex items-end pb-12 sm:pb-20">
      
      {/* LAYER 0: CINEMATIC BACKGROUND ATHLETE IMAGE WITH PARALLAX */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out scale-105"
        style={{
          transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0) scale(1.05)`,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2000&auto=format&fit=crop"
          alt="ANISHA Athletic Performance"
          className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/40 to-black/60" />
        <div className="absolute inset-0 bg-radial-hero" />
      </div>

      {/* LAYER 1: ARCHITECTURAL MONUMENTAL WATERMARK */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-1 select-none whitespace-nowrap opacity-10 font-display font-black text-[22vw] tracking-tighter text-white transition-transform duration-500"
        style={{
          transform: `translate3d(calc(-50% + ${-mousePos.x * 0.8}px), calc(-50% + ${-mousePos.y * 0.8}px), 0)`,
        }}
      >
        ANISHA
      </div>

      {/* LAYER 2: HERO EDITORIAL CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl space-y-6">
          
          {/* Top Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-volt font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(204,255,0,0.2)]">
            <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
            <span>AUTUMN/WINTER PERFORMANCE LAB</span>
          </div>

          {/* Monumental Headline */}
          <div className="space-y-1">
            <h1 className="font-display font-black text-4xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.9]">
              MOVE WITHOUT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt via-white to-volt animate-pulse-glow">
                LIMITS.
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <p className="text-sm sm:text-lg text-white/80 max-w-2xl font-light leading-relaxed">
            Performance engineered for those who refuse to stand still. High-compression seamless apparel, carbon-propulsion footwear, and sensorial luxury fragrances.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => navigateTo('sportswear')}
              className="py-4 px-8 rounded-full bg-volt text-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(204,255,0,0.4)] flex items-center space-x-2 group"
              data-cursor-text="EXPLORE"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                playUiSound('whoosh');
                const el = document.getElementById('manifesto');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-4 px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              data-cursor-text="DISCOVER"
            >
              DISCOVER ANISHA
            </button>
          </div>

        </div>
      </div>

      {/* LAYER 3: ANIMATED SCROLL DOWN INDICATOR */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-20 flex flex-col items-center space-y-2 pointer-events-none">
        <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase rotate-90 origin-right translate-x-4">
          SCROLL
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-volt animate-bounce" />
        </div>
      </div>

    </section>
  );
};
