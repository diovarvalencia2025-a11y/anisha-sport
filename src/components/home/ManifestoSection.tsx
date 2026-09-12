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
          <span>03 // THE ANISHA MANIFESTO</span>
        </div>

        {/* Massive Kinetic Headline */}
        <div className="space-y-4">
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-tight text-white/90">
            YOUR BODY KNOWS <br />
            <span className="text-volt">THE MOVEMENT.</span> <br />
            YOUR MIND DEFINES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/10">
              THE LIMIT.
            </span>
          </h2>
        </div>

        {/* Narrative Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10 text-white/70">
          
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-volt">
              <Zap size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-white">01 — OBSESSION WITH KINETICS</h3>
            <p className="text-xs sm:text-sm font-light leading-relaxed">
              We design every seam, carbon curve, and fragrance molecule around biomechanical human performance in motion.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-volt">
              <Shield size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-white">02 — AEROSPACE MATERIALS</h3>
            <p className="text-xs sm:text-sm font-light leading-relaxed">
              Supercritical nitrogen-infused foams, carbon composites, and silver-ion antibacterial weaves built to outlast extreme stress.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-volt">
              <Flame size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-white">03 — NO FINISH LINE</h3>
            <p className="text-xs sm:text-sm font-light leading-relaxed">
              True greatness is not a medal or a destination. It is the unyielding commitment to continuous forward velocity.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
