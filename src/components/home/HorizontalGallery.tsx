import React, { useRef } from 'react';
import { Camera, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const HorizontalGallery: React.FC = () => {
  const { playUiSound, navigateTo } = useNavigation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const galleryItems = [
    {
      title: 'MARATHON CADENCE',
      category: 'RUNNING',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop',
      tagline: 'Sub-2 hour testing parameters'
    },
    {
      title: 'ISOMETRIC TENSION',
      category: 'TRAINING',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
      tagline: 'High-density poly-mesh compression'
    },
    {
      title: 'PRECISION STRIKE',
      category: 'FOOTBALL',
      image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1200&auto=format&fit=crop',
      tagline: 'Micro-texture boot upper aerodynamics'
    },
    {
      title: 'URBAN VELOCITY',
      category: 'LIFESTYLE',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop',
      tagline: 'Milanese minimalism meets high-tech'
    },
    {
      title: 'NOCTURNAL ALCHEMY',
      category: 'FRAGRANCE',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop',
      tagline: 'Aura Noir 30% concentration'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    playUiSound('whoosh');
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-end justify-between">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-volt uppercase block mb-2">
            07 // EDITORIAL VISUAL ARCHIVE
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white">
            HORIZONTAL LOOKBOOK
          </h2>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-surface border border-surface-border text-white hover:border-volt hover:text-volt transition-colors"
            title="Scroll Left"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-surface border border-surface-border text-white hover:border-volt hover:text-volt transition-colors"
            title="Scroll Right"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* HORIZONTAL DRAG & SCROLL ROW */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-8 no-scrollbar scroll-smooth"
      >
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigateTo('sportswear')}
            className="group relative w-[300px] sm:w-[420px] h-[480px] sm:h-[540px] flex-shrink-0 rounded-3xl overflow-hidden bg-surface border border-surface-border cursor-pointer transition-all duration-500 hover:border-volt/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6"
            data-cursor-text="LOOK"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.6] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md border border-white/20 text-volt">
                {item.category}
              </span>
              <span className="font-mono text-xs text-white/40">0{idx + 1}</span>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight group-hover:text-volt transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-white/70 font-mono">
                {item.tagline}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
