import React, { useState } from 'react';
import { Flame, ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const AthleteStory: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [activeImageState, setActiveImageState] = useState(false);

  return (
    <section className="py-24 sm:py-36 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: ATHLETE EDITORIAL DUAL-IMAGE (6 cols) */}
          <div
            onMouseEnter={() => setActiveImageState(true)}
            onMouseLeave={() => setActiveImageState(false)}
            className="lg:col-span-6 relative aspect-[3/4] rounded-3xl overflow-hidden bg-surface border border-surface-border cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            data-cursor-text="TRANSITION"
          >
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
              alt="ANISHA Athlete Training"
              className={`absolute inset-0 w-full h-full object-cover filter contrast-[1.15] transition-opacity duration-700 ${
                activeImageState ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
              alt="ANISHA Athlete Peak State"
              className={`absolute inset-0 w-full h-full object-cover filter contrast-[1.15] transition-opacity duration-700 ${
                activeImageState ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-volt uppercase block">
                  {activeImageState ? 'ESTADO B // RITMO EXPLOSIVO' : 'ESTADO A // ENFOQUE ISOMÉTRICO'}
                </span>
                <span className="font-display font-black text-xl text-white">ELENA VUKOVIC</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/70">
                PASA EL CURSOR PARA CAMBIAR
              </span>
            </div>
          </div>

          {/* RIGHT: STORYTELLING NARRATIVE (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-volt uppercase">
                <Flame size={16} />
                <span>12 // EL PROTOCOLO ATLETA</span>
              </div>
              <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
                CONSTRUIDO CON <br />
                <span className="text-volt">DISCIPLINA.</span>
              </h2>
            </div>

            {/* Kinetic Word Sequence */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-6">
              <div>
                <span className="font-mono text-xs text-white/40 block">FASE 01</span>
                <strong className="font-display font-black text-xl text-white">DISCIPLINA.</strong>
              </div>
              <div>
                <span className="font-mono text-xs text-white/40 block">FASE 02</span>
                <strong className="font-display font-black text-xl text-white">ENFOQUE.</strong>
              </div>
              <div>
                <span className="font-mono text-xs text-white/40 block">FASE 03</span>
                <strong className="font-display font-black text-xl text-white">VELOCIDAD.</strong>
              </div>
              <div>
                <span className="font-mono text-xs text-white/40 block">FASE 04</span>
                <strong className="font-display font-black text-xl text-volt">POTENCIA.</strong>
              </div>
            </div>

            <blockquote className="text-sm sm:text-base text-white/80 font-light leading-relaxed italic border-l-2 border-volt pl-4">
              "El rendimiento no se da por casualidad ni por suerte. Se forja día a día, repetición a repetición, antes de que el resto del mundo despierte."
            </blockquote>

            <div>
              <button
                onClick={() => navigateTo('sportswear')}
                className="py-3.5 px-8 rounded-full bg-white text-black hover:bg-volt font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center space-x-2"
              >
                <span>VER LOOKBOOK DEPORTIVO</span>
                <ArrowUpRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
