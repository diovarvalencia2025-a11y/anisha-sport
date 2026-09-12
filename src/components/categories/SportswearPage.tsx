import React, { useState, useMemo } from 'react';
import { Activity, Filter, ArrowDown, Zap, Shield, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from '../../data/products';
import { ProductCard } from '../ecommerce/ProductCard';
import { useNavigation } from '../../context/NavigationContext';

export const SportswearPage: React.FC = () => {
  const { playUiSound } = useNavigation();
  const [selectedSubcat, setSelectedSubcat] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const sportswearProducts = PRODUCTS.filter(p => p.category === 'sportswear');
  const subcategories = ['All', 'Sets & Tracksuits', 'Hoodies & Sweatshirts', 'T-Shirts & Tops', 'Shorts'];

  const filtered = useMemo(() => {
    let list = selectedSubcat === 'All' ? sportswearProducts : sportswearProducts.filter(p => p.subcategory === selectedSubcat);
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.priceEUR - b.priceEUR);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.priceEUR - a.priceEUR);
    }
    return list;
  }, [selectedSubcat, sortBy, sportswearProducts]);

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-32 animate-fadeIn">
      
      {/* 01 // SPORTSWEAR HERO BANNER */}
      <section className="relative h-[65vh] sm:h-[75vh] w-full overflow-hidden flex items-end pb-12 sm:pb-16 bg-[#090909]">
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2000&auto=format&fit=crop"
          alt="ANISHA Sportswear"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-volt uppercase px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Activity size={14} />
            <span>CATEGORY 01 // APPAREL LAB</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-none">
            TRAIN WITHOUT <br />
            <span className="text-volt">LIMITS.</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl font-light">
            Biomechanical seamless sets, micro-perforated thermal regulation, and high-compression fabrics engineered for uncompromising human output.
          </p>
        </div>
      </section>

      {/* 02 // FILTER & SORT CONTROLS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Subcategory Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {subcategories.map(sub => (
            <button
              key={sub}
              onClick={() => {
                playUiSound('click');
                setSelectedSubcat(sub);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                selectedSubcat === sub
                  ? 'bg-volt text-black shadow-[0_0_15px_#CCFF00]'
                  : 'bg-surface border border-surface-border text-white/70 hover:text-white hover:border-white/20'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-3 self-end md:self-auto text-xs font-mono text-white/60">
          <span>SORT BY:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-surface border border-surface-border rounded-xl px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-volt"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* 03 // PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* 04 // EDITORIAL TEXTILE INNOVATION BREAK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-surface border border-surface-border p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-volt uppercase">
              PROPRIETARY TEXTILE SCIENCE
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              AEROVENT™ 4-WAY SEAMLESS WEAVE
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              Every millimeter of our apparel is mapped to the physiological perspiration and heat zones of world-class athletes. Laser-cut micro-channels vent thermal energy while retaining optimal muscle warmth.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <strong className="text-volt block text-sm">85g/m²</strong>
                <span className="text-white/50">Featherweight</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <strong className="text-volt block text-sm">0% Seams</strong>
                <span className="text-white/50">Zero Friction</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <strong className="text-volt block text-sm">UPF 50+</strong>
                <span className="text-white/50">Solar Shield</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
              alt="AeroVent Weave"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
