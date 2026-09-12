import React from 'react';
import { Zap, Shield, Flame } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="relative py-28 sm:py-40 bg-[#050505] text-white overflow-hidden border-t border-b border-white/5">
      
      {/* Background kinetic grid & subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-volt/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Label */}
        <div className="flex items-center space-x-3 text-xs font-mono font-bold tracking-widest text-volt uppercase">
          <Zap size={16} />
          <span>03 // EL MANIFIESTO ANISHA</span>
        </div>

        {/* Massive Kinetic Headline */}
        <div className="space-y-4">
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-tight text-white/90">
            TU CUERPO CONOCE <br />
            <span className="text-volt">EL MOVIMIENTO.</span> <br />
            TU MENTE DEFINE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/10">
              EL LÍMITE.
            </span>
          </h2>
        </div>

        {/* Narrative Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10 text-white/70">
          
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-volt">
              <Zap size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-white">01 — OBSESIÓN POR EL DETALLE</h3>
            <p className="text-xs sm:text-sm font-light leading-relaxed">
              Seleccionamos cada prenda, cada silueta de calzado y cada acorde de fragancia pensando en la comodidad y la presencia impecable.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-volt">
              <Shield size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-white">02 — MATERIALES DE ALTA GAMA</h3>
            <p className="text-xs sm:text-sm font-light leading-relaxed">
              Tejidos elásticos sin fricción, suelas con amortiguación avanzada y fragancias concentradas que duran todo el día.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-volt">
              <Flame size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-white">03 — SIN LÍMITES</h3>
            <p className="text-xs sm:text-sm font-light leading-relaxed">
              El verdadero estilo y la superación no se detienen. Es la disciplina diaria de avanzar siempre con la mejor actitud.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
