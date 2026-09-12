import React, { useState } from 'react';
import { Mail, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const Newsletter: React.FC = () => {
  const { playUiSound } = useNavigation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playUiSound('success');
    setSubmitted(true);
  };

  return (
    <section className="py-24 sm:py-36 bg-[#070707] relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-volt uppercase px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
          <Sparkles size={14} />
          <span>24 // NOVEDADES EXCLUSIVAS</span>
        </div>

        <div className="space-y-3">
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white">
            ÚNETE A LA COMUNIDAD
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-light leading-relaxed">
            Sé la primera persona en conocer nuevos lanzamientos de zapatillas, perfumes exclusivos y promociones de ANISHA SPORT.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-surface border border-volt/50 text-volt font-mono text-sm flex items-center justify-center space-x-2 animate-fadeIn max-w-md mx-auto">
            <Check size={18} />
            <span>¡BIENVENIDO/A A LA COMUNIDAD ANISHA SPORT!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="TU CORREO ELECTRÓNICO"
                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-surface border border-surface-border text-white text-xs font-mono placeholder-white/40 focus:outline-none focus:border-volt transition-colors"
              />
            </div>
            <button
              type="submit"
              className="py-4 px-8 rounded-2xl bg-volt hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center justify-center space-x-2 flex-shrink-0"
            >
              <span>SUSCRIBIRME</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
