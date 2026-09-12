import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const BrandStatement: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <section className="py-32 sm:py-48 bg-white text-black relative overflow-hidden transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        <span className="text-xs font-mono font-bold tracking-widest text-black/50 uppercase block">
          23 // LA FILOSOFÍA
        </span>

        <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] text-black">
          NO EXISTE UNA <br />
          LÍNEA DE META.
        </h2>

        <p className="text-base sm:text-xl text-black/70 max-w-xl mx-auto font-light leading-relaxed">
          Cada récord es temporal. Cada cumbre superada revela una cima más alta. Sigue avanzando sin mirar atrás.
        </p>

        <div className="pt-4">
          <button
            onClick={() => navigateTo('sportswear')}
            className="py-4 px-10 rounded-full bg-black text-white hover:bg-volt hover:text-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-2xl inline-flex items-center space-x-2"
          >
            <span>ÚNETE AL MOVIMIENTO</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
