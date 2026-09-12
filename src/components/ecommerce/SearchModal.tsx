import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Zap, Star, MessageSquare } from 'lucide-react';
import { PRODUCTS, Product } from '../../data/products';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductDetail, playUiSound } = useNavigation();
  const { generateProductInquiryUrl } = useCart();
  const [query, setQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'sportswear' | 'sneakers' | 'perfumes'>('all');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCat = activeCategoryFilter === 'all' || p.category === activeCategoryFilter;
      const q = query.toLowerCase().trim();
      if (!q) return matchesCat;
      const matchesText =
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.techSpecs.some(s => s.toLowerCase().includes(q));
      return matchesCat && matchesText;
    });
  }, [query, activeCategoryFilter]);

  if (!isSearchOpen) return null;

  const quickTags = ['Velocity X', 'Nike Cortez', 'Sauvage', 'Conjunto Seamless', 'Perfumes', 'Zapatillas'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-2xl p-4 sm:p-6 md:p-10 flex flex-col items-center animate-fadeIn">
      
      {/* Top Close Button */}
      <div className="w-full max-w-4xl flex items-center justify-between pb-6 border-b border-white/10">
        <span className="font-mono text-xs font-bold tracking-widest text-volt uppercase flex items-center space-x-2">
          <Zap size={14} />
          <span>BÚSQUEDA EN CATÁLOGO ANISHA SPORT</span>
        </span>
        <button
          onClick={() => {
            playUiSound('click');
            setIsSearchOpen(false);
          }}
          className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="w-full max-w-4xl pt-8 space-y-6 flex-1 flex flex-col">
        
        {/* Search Input Box */}
        <div className="relative">
          <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-volt" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por marca, modelo, perfume, calzado, ropa..."
            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-surface border border-surface-border text-white text-lg sm:text-xl font-display font-bold placeholder-white/30 focus:outline-none focus:border-volt focus:shadow-[0_0_30px_rgba(204,255,0,0.15)] transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Category Pills & Quick Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-white/40 mr-2">CATEGORÍAS:</span>
          {([
            { key: 'all', label: 'TODAS' },
            { key: 'sportswear', label: 'ROPA DEPORTIVA' },
            { key: 'sneakers', label: 'ZAPATILLAS' },
            { key: 'perfumes', label: 'PERFUMES' }
          ] as const).map(cat => (
            <button
              key={cat.key}
              onClick={() => {
                playUiSound('click');
                setActiveCategoryFilter(cat.key);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all ${
                activeCategoryFilter === cat.key
                  ? 'bg-volt text-black shadow-[0_0_12px_#CCFF00]'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Quick Tag Recommendations */}
        {!query && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-mono text-white/40 mr-1">POPULAR:</span>
            {quickTags.map(tag => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 rounded-lg text-xs font-mono text-white/60 bg-white/5 hover:text-volt hover:bg-white/10 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* RESULTS GRID */}
        <div className="pt-4 flex-1">
          <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-4">
            <span>RESULTADOS ({filteredProducts.length})</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center text-white/40 font-mono text-sm">
              No se encontraron productos para "{query}". Intenta buscar por 'Nike', 'Cortez', 'Perfume' o 'Dior'.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-12">
              {filteredProducts.map(p => {
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openProductDetail(p);
                    }}
                    className="group p-3 rounded-2xl bg-surface border border-surface-border hover:border-volt/50 transition-all flex items-center space-x-4 cursor-pointer hover:bg-surface-elevated"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-16 h-20 object-cover rounded-xl bg-black border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono text-volt uppercase tracking-wider">{p.subcategory}</div>
                      <h4 className="font-display font-bold text-sm text-white group-hover:text-volt transition-colors truncate">
                        {p.name}
                      </h4>
                      <div className="flex items-center justify-between mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playUiSound('pop');
                            window.open(generateProductInquiryUrl(p.name), '_blank');
                          }}
                          className="font-mono font-bold text-[11px] text-volt bg-volt/10 hover:bg-volt hover:text-black px-2 py-0.5 rounded border border-volt/30 transition-colors flex items-center space-x-1"
                          title="Consultar por WhatsApp"
                        >
                          <MessageSquare size={10} />
                          <span>CONSULTAR</span>
                        </button>
                        <span className="text-[10px] font-mono text-white/50 flex items-center space-x-0.5">
                          <Star size={10} className="text-volt fill-volt" />
                          <span>{p.rating.toFixed(1)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
