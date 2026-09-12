import React, { useState } from 'react';
import { Zap, Play, ArrowRight, ShieldCheck, Cpu, Flame } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const PinnedStorytelling: React.FC = () => {
  const { navigateTo, playUiSound } = useNavigation();
  const [activeScene, setActiveScene] = useState(0);

  const scenes = [
    {
      id: 'athlete',
      stage: 'STAGE 01',
      title: 'THE ATHLETE IN MOTION',
      tagline: 'Raw discipline forged in the quiet hours before dawn.',
      desc: 'Before the medals, before the stadium lights, there is only the pulse, the breath, and the friction against gravity.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop',
      metric: '04:30 AM',
      metricLabel: 'First Repetition'
    },
    {
      id: 'product',
      stage: 'STAGE 02',
      title: 'ENGINEERED SECOND SKIN',
      tagline: 'Zero seams. Zero drag. Absolute biomechanical synergy.',
      desc: 'Crafted with continuous matrix compression fibers that stabilize kinetic chains without restricting explosive flexibility.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
      metric: '85 GRAMS',
      metricLabel: 'Aerodynamic Mass'
    },
    {
      id: 'technology',
      stage: 'STAGE 03',
      title: 'SUPERCRITICAL NITROGEN',
      tagline: 'Energy cannot be destroyed. Only redirected forward.',
      desc: 'Our proprietary NitroStrata™ midsole captures 89% of ground impact energy and springs it back into forward propulsion.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop',
      metric: '89.4%',
      metricLabel: 'Energy Return'
    },
    {
      id: 'performance',
      stage: 'STAGE 04',
      title: 'UNBREAKABLE CONFIDENCE',
      tagline: 'When design meets willpower, records become memories.',
      desc: 'Tested across 15,000 kilometers of high-altitude marathon trials and brutal multi-axis gym loads.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop',
      metric: '15,000 KM',
      metricLabel: 'Lab Validation'
    },
    {
      id: 'anisha',
      stage: 'STAGE 05',
      title: 'ANISHA SPORT',
      tagline: 'Move without limits. Today, tomorrow, forever.',
      desc: 'The pinnacle of luxury sportswear engineering designed for athletes who refuse to accept boundaries.',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1600&auto=format&fit=crop',
      metric: '∞',
      metricLabel: 'Zero Limits'
    }
  ];

  const current = scenes[activeScene];

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-volt uppercase">
            <Cpu size={16} />
            <span>20 // PINNED STORYTELLING EXPERIENCE</span>
          </div>
          <span className="text-xs font-mono text-white/50">
            SCENE {activeScene + 1} OF {scenes.length}
          </span>
        </div>

        {/* PINNED STAGE CONTAINER */}
        <div className="relative rounded-3xl overflow-hidden bg-surface border border-surface-border min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-6 sm:p-12">
          
          {/* Background image transition */}
          <div className="absolute inset-0 z-0">
            <img
              key={current.image}
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1] transition-all duration-700 animate-fadeIn"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
          </div>

          {/* Top scene badges */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-black uppercase bg-volt text-black shadow-[0_0_15px_#CCFF00]">
              {current.stage}
            </span>
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-right">
              <span className="font-mono font-black text-xl text-volt block leading-none">{current.metric}</span>
              <span className="text-[10px] font-mono text-white/60 uppercase">{current.metricLabel}</span>
            </div>
          </div>

          {/* Center narrative content */}
          <div className="relative z-10 max-w-3xl space-y-4 my-auto py-8">
            <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-none">
              {current.title}
            </h3>
            <p className="text-sm sm:text-lg text-volt font-mono font-semibold">
              {current.tagline}
            </p>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl font-light leading-relaxed">
              {current.desc}
            </p>
          </div>

          {/* Bottom scene switcher tabs */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Timeline Steps */}
            <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {scenes.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    playUiSound('click');
                    setActiveScene(idx);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all whitespace-nowrap ${
                    activeScene === idx
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105'
                      : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {s.stage}
                </button>
              ))}
            </div>

            {/* Next Step Button */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => {
                  playUiSound('whoosh');
                  setActiveScene((prev) => (prev + 1) % scenes.length);
                }}
                className="px-5 py-2.5 rounded-full bg-volt hover:bg-white text-black font-mono text-xs font-black uppercase tracking-wider flex items-center space-x-2 transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                <span>{activeScene === scenes.length - 1 ? 'RESTART JOURNEY ↺' : 'NEXT CHAPTER →'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
