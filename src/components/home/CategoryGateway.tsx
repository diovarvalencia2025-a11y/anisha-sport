import React from 'react';
import { ArrowUpRight, Sparkles, Activity, Wind } from 'lucide-react';
import { useNavigation, ViewType } from '../../context/NavigationContext';

export const CategoryGateway: React.FC = () => {
  const { navigateTo, playUiSound } = useNavigation();

  const categories: {
    id: string;
    view: ViewType;
    number: string;
    title: string;
    tagline: string;
    description: string;
    image: string;
    badge: string;
    icon: typeof Activity;
  }[] = [
    {
      id: 'sportswear',
      view: 'sportswear',
      number: '01',
      title: 'SPORTSWEAR',
      tagline: 'TRAIN WITHOUT LIMITS',
      description: 'Ultra-compression seamless sets, thermal regulating hoodies, and aerodynamic laser-vented tops.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
      badge: 'HIGH-TECH APPAREL',
      icon: Activity
    },
    {
      id: 'sneakers',
      view: 'sneakers',
      number: '02',
      title: 'SNEAKERS',
      tagline: 'ENGINEERED TO MOVE',
      description: 'Marathon racing carbon plates, supercritical NitroStrata™ cushioning, and anatomical lockdown cages.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
      badge: 'PROPULSION LAB',
      icon: Wind
    },
    {
      id: 'perfumes',
      view: 'perfumes',
      number: '03',
      title: 'PERFUMES',
      tagline: 'THE SCENT OF MOVEMENT',
      description: 'Sensorial luxury extraits de parfum capturing nocturnal adrenaline, cryo-fresh alpine air, and solar saffron.',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop',
      badge: 'HAUTE PARFUMERIE',
      icon: Sparkles
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-volt uppercase block mb-2">
              04A // THREE UNIVERSES OF EXCELLENCE
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white">
              EXPLORE BY CATEGORY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/50 max-w-md mt-4 md:mt-0 font-light">
            Each category represents a standalone digital and technical experience engineered with absolute precision.
          </p>
        </div>

        {/* 3 GIANT PORTALS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  playUiSound('whoosh');
                  navigateTo(cat.view);
                }}
                className="group relative h-[480px] sm:h-[580px] rounded-3xl overflow-hidden bg-surface border border-surface-border transition-all duration-700 hover:border-volt/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(204,255,0,0.15)] cursor-pointer flex flex-col justify-between p-6 sm:p-8"
                data-cursor-text={cat.title}
              >
                {/* Background Image with Zoom & Dark Gradient */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.1] transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                </div>

                {/* Top Badge & Number */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-volt group-hover:text-black group-hover:border-volt transition-all">
                    {cat.badge}
                  </span>
                  <span className="font-mono font-extrabold text-lg text-white/40 group-hover:text-volt transition-colors">
                    {cat.number}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-4">
                  <div>
                    <div className="text-xs font-mono font-bold text-volt tracking-widest uppercase mb-1">
                      {cat.tagline}
                    </div>
                    <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight group-hover:text-volt transition-colors flex items-center justify-between">
                      <span>{cat.title}</span>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-volt group-hover:text-black group-hover:border-volt transition-all">
                        <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </h3>
                  </div>

                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50 group-hover:text-white transition-colors">
                    <span>ENTER CATEGORY</span>
                    <span className="text-volt font-bold">DISCOVER →</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
