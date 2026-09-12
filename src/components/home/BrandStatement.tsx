import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const BrandStatement: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <section className="py-32 sm:py-48 bg-white text-black relative overflow-hidden transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        <span className="text-xs font-mono font-bold tracking-widest text-black/50 uppercase block">
          23 // THE PHILOSOPHY
        </span>

        <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] text-black">
          THERE IS NO <br />
          FINISH LINE.
        </h2>

        <p className="text-base sm:text-xl text-black/70 max-w-xl mx-auto font-light leading-relaxed">
          Every record is temporary. Every summit reveals a higher peak. Keep moving forward without looking back.
        </p>

        <div className="pt-4">
          <button
            onClick={() => navigateTo('sportswear')}
            className="py-4 px-10 rounded-full bg-black text-white hover:bg-volt hover:text-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-2xl inline-flex items-center space-x-2"
          >
            <span>JOIN THE MOVEMENT</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
