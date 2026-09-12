import React, { useState } from 'react';
import { Layers, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const StackedCards: React.FC = () => {
  const { playUiSound, navigateTo } = useNavigation();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const cards = [
    {
      id: 0,
      title: 'THE NITROGEN FORGE',
      subtitle: 'Molecular foam expansion lab',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
      tag: 'MATERIAL LAB',
      desc: 'Liquid nitrogen micro-injections create supercritical cell geometry that resists mechanical fatigue.'
    },
    {
      id: 1,
      title: 'AEROVENT COMPRESSION',
      subtitle: '4-Way dynamic weave architecture',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
      tag: 'TEXTILE LAB',
      desc: 'Micro-perforated airflow zones engineered precisely along the major muscle heat maps.'
    },
    {
      id: 2,
      title: 'NOCTURNAL EXTRAIT',
      subtitle: 'Rare resin maceration chamber',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop',
      tag: 'OLFACTORY LAB',
      desc: 'Aged in darkened glass flacons for 90 days to achieve unforgettable magnetic projection.'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-volt uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Layers size={14} />
            <span>08 // DEPTH CARD STACK LAB</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            RESEARCH & ATELIER
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-light">
            Click to shuffle through our 3 specialized innovation divisions.
          </p>
        </div>

        {/* STACKED INTERACTIVE CARDS CONTAINER */}
        <div className="relative max-w-4xl mx-auto min-h-[460px] sm:min-h-[520px] flex items-center justify-center">
          {cards.map((card, idx) => {
            const isTop = activeCardIndex === idx;
            const diff = (idx - activeCardIndex + cards.length) % cards.length;

            let transformStyle = '';
            let zIndex = 30 - diff * 10;
            let opacity = 1 - diff * 0.25;

            if (diff === 0) {
              transformStyle = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
            } else if (diff === 1) {
              transformStyle = 'translate3d(24px, -18px, 0) scale(0.94) rotate(3deg)';
            } else {
              transformStyle = 'translate3d(-24px, -32px, 0) scale(0.88) rotate(-3deg)';
            }

            return (
              <div
                key={card.id}
                onClick={() => {
                  playUiSound('pop');
                  setActiveCardIndex((prev) => (prev + 1) % cards.length);
                }}
                className="absolute inset-0 rounded-3xl overflow-hidden bg-surface border border-surface-border p-6 sm:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.95)] cursor-pointer transition-all duration-700 ease-out"
                style={{
                  transform: transformStyle,
                  zIndex,
                  opacity
                }}
                data-cursor-text="SHUFFLE"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase bg-volt text-black shadow-[0_0_12px_#CCFF00]">
                    {card.tag}
                  </span>
                  <span className="font-mono text-xs text-white/50">CLICK TO FLIP ↻</span>
                </div>

                <div className="relative z-10 max-w-xl space-y-3">
                  <span className="text-xs font-mono font-bold text-volt tracking-widest uppercase">{card.subtitle}</span>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
