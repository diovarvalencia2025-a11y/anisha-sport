import React, { useState } from 'react';
import { Cpu, Zap, Wind, Shield, Activity, Sparkles } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const TechnologyHotspots: React.FC = () => {
  const { playUiSound, navigateTo } = useNavigation();
  const [activeHotspot, setActiveHotspot] = useState<number>(1);

  const hotspots = [
    {
      id: 0,
      title: '01 // LIGHTWEIGHT MONOMESH',
      position: { top: '32%', left: '26%' },
      metric: '188g',
      desc: 'Single-layer engineered AeroKnit™ upper eliminates internal overlays while maintaining strict anatomical lockdown.',
      icon: Wind
    },
    {
      id: 1,
      title: '02 // CARBON PROPULSION PLATE',
      position: { top: '64%', left: '50%' },
      metric: '89.4% Return',
      desc: '3D curved full-length aerospace carbon fiber plate calibrated for explosive toe-off kinetic propulsion.',
      icon: Zap
    },
    {
      id: 2,
      title: '03 // NITROSTRATA™ MIDSOLE',
      position: { top: '55%', left: '74%' },
      metric: '39mm Stack',
      desc: 'Supercritical nitrogen-infused foam offering cloud-like shock absorption with zero packing degradation.',
      icon: Activity
    },
    {
      id: 3,
      title: '04 // LIQUID-RUBBER TRACTION',
      position: { top: '80%', left: '30%' },
      metric: '100% Grip',
      desc: 'Micro-siped organic tread pattern providing relentless traction on wet asphalt and competitive tracks.',
      icon: Shield
    },
    {
      id: 4,
      title: '05 // ERGONOMIC HEEL CAGE',
      position: { top: '40%', left: '80%' },
      metric: 'Zero Slip',
      desc: 'Thermoplastic polyurethane rear collar lock that prevents heel friction and Achilles tendon fatigue.',
      icon: Cpu
    }
  ];

  const currentHotspot = hotspots[activeHotspot];

  return (
    <section className="py-24 sm:py-36 bg-[#070707] relative overflow-hidden border-t border-b border-white/5">
      
      {/* Radial Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-spotlight pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-volt uppercase px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Cpu size={14} />
            <span>06 // INTERACTIVE TECHNOLOGY & BIOMECHANICS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            EXPLODED LAB ARCHITECTURE
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-light">
            Click on any kinetic hotspot to reveal the aerospace engineering integrated into every pair of ANISHA Velocity X.
          </p>
        </div>

        {/* 3D SNEAKER INTERACTIVE SHOWCASE STAGE */}
        <div className="relative aspect-[16/10] sm:aspect-[16/8] w-full max-w-5xl mx-auto rounded-3xl bg-surface border border-surface-border p-6 sm:p-12 flex items-center justify-center overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
          
          {/* Main Hero Sneaker Image with Float Effect */}
          <div className="relative w-4/5 max-w-2xl animate-float">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400&auto=format&fit=crop"
              alt="ANISHA Velocity X Carbon Sneaker"
              className="w-full h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
            />

            {/* Pulsing Hotspot Markers */}
            {hotspots.map((hs) => {
              const isActive = activeHotspot === hs.id;
              return (
                <button
                  key={hs.id}
                  onClick={() => {
                    playUiSound('pop');
                    setActiveHotspot(hs.id);
                  }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                  style={{ top: hs.position.top, left: hs.position.left }}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`absolute w-8 h-8 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-volt/40 animate-ping' : 'bg-white/20 group-hover:bg-volt/30'
                      }`}
                    />
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] font-black transition-all duration-300 ${
                        isActive
                          ? 'bg-volt text-black scale-125 shadow-[0_0_15px_#CCFF00]'
                          : 'bg-white text-black group-hover:bg-volt'
                      }`}
                    >
                      +
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE HOTSPOT SPEC CARD (Floating Bottom-Left or Center) */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 z-30 max-w-sm p-4 sm:p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-volt/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-volt font-bold">{currentHotspot.title}</span>
              <span className="px-2 py-0.5 rounded bg-volt/20 text-volt text-[10px] font-black">{currentHotspot.metric}</span>
            </div>
            <p className="text-xs text-white/80 font-light leading-relaxed mt-2">
              {currentHotspot.desc}
            </p>
          </div>

        </div>

        {/* BOTTOM QUICK SPEC PILLS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8 max-w-5xl mx-auto">
          {hotspots.map((hs) => (
            <button
              key={hs.id}
              onClick={() => {
                playUiSound('click');
                setActiveHotspot(hs.id);
              }}
              className={`p-3 rounded-2xl text-left border transition-all ${
                activeHotspot === hs.id
                  ? 'bg-surface-elevated border-volt text-volt shadow-[0_0_15px_rgba(204,255,0,0.2)]'
                  : 'bg-surface border-surface-border text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              <span className="block text-[10px] font-mono font-bold uppercase">{hs.title.split('//')[1]}</span>
              <span className="font-mono font-extrabold text-xs text-white block mt-0.5">{hs.metric}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
