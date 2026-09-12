import React from 'react';
import { ArrowUp, Instagram, Youtube } from 'lucide-react';
import { useNavigation, ViewType } from '../../context/NavigationContext';

export const Footer: React.FC = () => {
  const { navigateTo, playUiSound } = useNavigation();

  const scrollToTop = () => {
    playUiSound('whoosh');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040404] text-white relative overflow-hidden border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Row: Brand & Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-display font-black text-volt text-sm">
                A
              </div>
              <span className="font-display font-extrabold text-xl tracking-wider text-white notranslate" translate="no">
                ANISHA <span className="text-volt font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-volt/10 border border-volt/20 notranslate" translate="no">SPORT</span>
              </span>
            </div>
            <p className="font-mono text-xs text-volt font-bold uppercase tracking-widest">
              MOVE WITHOUT LIMITS.
            </p>
            <p className="text-xs text-white/50 max-w-sm font-light leading-relaxed">
              Performance engineered for those who refuse to stand still. Biomechanical compression, carbon-propulsion footwear, and sensory extrait de parfum.
            </p>
          </div>

          {/* Categories Column (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest">
              COLECCIONES
            </h4>
            <ul className="space-y-2 text-xs font-mono text-white/60">
              <li>
                <button onClick={() => navigateTo('sportswear')} className="hover:text-volt transition-colors">
                  ROPA DEPORTIVA & COMPRESIÓN
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('sneakers')} className="hover:text-volt transition-colors">
                  ZAPATILLAS EXCLUSIVAS
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('perfumes')} className="hover:text-volt transition-colors">
                  PERFUMERÍA DE LUJO
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('sportswear')} className="hover:text-volt transition-colors">
                  ALTO RENDIMIENTO
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Back to Top (4 cols) */}
          <div className="md:col-span-4 space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-3">
                REDES & COMUNIDAD
              </h4>
              <div className="flex items-center space-x-3">
                <a href="#instagram" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-volt hover:text-volt transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="#youtube" className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-volt hover:text-volt transition-colors">
                  <Youtube size={16} />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 text-xs font-mono text-white/60 hover:text-volt transition-colors pt-4"
            >
              <span>VOLVER ARRIBA</span>
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

        {/* BOTTOM GIGANTIC WATERMARK "ANISHA" */}
        <div className="pt-12 text-center select-none pointer-events-none">
          <div className="font-display font-black text-[20vw] leading-none tracking-tighter text-white/[0.04] hover:text-white/[0.08] transition-colors duration-700">
            ANISHA
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-4">
          <p>© 2026 ANISHA SPORT S.A. TODOS LOS DERECHOS RESERVADOS.</p>
          <div className="flex space-x-4">
            <span className="hover:text-white cursor-pointer">POLÍTICA DE PRIVACIDAD</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">TÉRMINOS Y CONDICIONES</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">ATENCIÓN AL CLIENTE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
