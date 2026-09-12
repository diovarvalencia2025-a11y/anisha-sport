import React, { useState, useMemo } from 'react';
import { Wind, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS, Product } from '../../data/products';
import { ProductCard } from '../ecommerce/ProductCard';
import { CategorySidebar } from './CategorySidebar';

export const SneakersPage: React.FC = () => {
  const allSneakers = useMemo(() => {
    return PRODUCTS.filter(p => p.category === 'sneakers');
  }, []);

  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women' | 'unisex'>('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // List of unique brands available
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    allSneakers.forEach(s => {
      if (s.brand) brandsSet.add(s.brand);
    });
    return Array.from(brandsSet).sort();
  }, [allSneakers]);

  // Brand counts based on current gender selection
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    availableBrands.forEach(b => {
      counts[b] = allSneakers.filter(s => {
        const matchesBrand = s.brand === b;
        const matchesGender =
          selectedGender === 'all' || s.gender === selectedGender || s.gender === 'unisex';
        return matchesBrand && matchesGender;
      }).length;
    });
    return counts;
  }, [allSneakers, availableBrands, selectedGender]);

  // Filtered sneakers
  const filteredSneakers = useMemo(() => {
    return allSneakers.filter(sneaker => {
      const matchesGender =
        selectedGender === 'all' ||
        sneaker.gender === selectedGender ||
        sneaker.gender === 'unisex';

      const matchesBrand =
        selectedBrands.length === 0 ||
        (sneaker.brand && selectedBrands.includes(sneaker.brand));

      return matchesGender && matchesBrand;
    });
  }, [allSneakers, selectedGender, selectedBrands]);

  const handleToggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleClearFilters = () => {
    setSelectedGender('all');
    setSelectedBrands([]);
  };

  const activeFiltersCount = (selectedGender !== 'all' ? 1 : 0) + selectedBrands.length;

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-32 animate-fadeIn">
      
      {/* 01 // SNEAKERS HERO BANNER */}
      <section className="relative h-[55vh] sm:h-[65vh] w-full overflow-hidden flex items-end pb-12 sm:pb-16 bg-[#070707]">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop"
          alt="ANISHA Engineered Sneakers"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-volt uppercase px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Wind size={14} />
            <span>CATEGORÍA 02 // CALZADO & RUNNING</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-none">
            DISEÑADAS <br />
            <span className="text-volt">PARA MOVERTE.</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl font-light">
            Las mejores marcas de calzado deportivo y zapatillas exclusivas: Nike, Adidas, New Balance, On Cloud, Le Coq Sportif, BOSS y Champion.
          </p>
        </div>
      </section>

      {/* 02 // LAB PERFORMANCE STATS BAR */}
      <div className="border-b border-white/10 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
          <div>
            <span className="text-white/40 block">CATÁLOGO ACTIVO</span>
            <strong className="text-volt text-sm sm:text-base">{allSneakers.length} Modelos</strong>
          </div>
          <div>
            <span className="text-white/40 block">MARCAS OFICIALES</span>
            <strong className="text-white text-sm sm:text-base">{availableBrands.length} Firmas</strong>
          </div>
          <div>
            <span className="text-white/40 block">SELECCIÓN</span>
            <strong className="text-volt text-sm sm:text-base">Hombre & Dama</strong>
          </div>
          <div>
            <span className="text-white/40 block">DISPONIBILIDAD</span>
            <strong className="text-white text-sm sm:text-base">Entrega Inmediata</strong>
          </div>
        </div>
      </div>

      {/* 03 // MAIN CONTENT WITH SIDEBAR FILTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* HEADER BAR CON CONTADOR Y BOTÓN MÓVIL */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-volt uppercase block mb-1">
              CATÁLOGO DE ZAPATILLAS
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
              {selectedGender === 'all'
                ? 'TODAS LAS ZAPATILLAS'
                : selectedGender === 'men'
                ? 'ZAPATILLAS HOMBRE'
                : 'ZAPATILLAS MUJER'}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            {/* BOTÓN FILTROS EN CELULAR */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center space-x-2 py-2.5 px-4 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider hover:border-volt hover:text-volt transition-colors"
            >
              <SlidersHorizontal size={15} />
              <span>Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <span className="text-xs font-mono text-white/50">
              Mostrando <strong className="text-white">{filteredSneakers.length}</strong> modelos
            </span>
          </div>
        </div>

        {/* ACTIVE PILLS BAR */}
        {(selectedGender !== 'all' || selectedBrands.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-mono text-white/40 mr-1">Filtros activos:</span>
            
            {selectedGender !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono uppercase">
                <span>Género: {selectedGender === 'men' ? 'Hombre' : 'Mujer'}</span>
                <button onClick={() => setSelectedGender('all')} className="hover:opacity-70 ml-1">
                  <X size={12} />
                </button>
              </span>
            )}

            {selectedBrands.map(brand => (
              <span
                key={brand}
                className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase"
              >
                <span>{brand}</span>
                <button onClick={() => handleToggleBrand(brand)} className="hover:text-volt ml-1">
                  <X size={12} />
                </button>
              </span>
            ))}

            <button
              onClick={handleClearFilters}
              className="text-xs font-mono text-white/50 hover:text-volt underline ml-2"
            >
              Limpiar todos
            </button>
          </div>
        )}

        {/* LAYOUT: SIDEBAR A LA IZQUIERDA + GRID A LA DERECHA */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* SIDEBAR COMPONENT */}
          <CategorySidebar
            selectedGender={selectedGender}
            onSelectGender={setSelectedGender}
            availableBrands={availableBrands}
            selectedBrands={selectedBrands}
            onToggleBrand={handleToggleBrand}
            onClearFilters={handleClearFilters}
            brandCounts={brandCounts}
            totalCount={allSneakers.length}
            filteredCount={filteredSneakers.length}
            isMobileOpen={isMobileFiltersOpen}
            onCloseMobile={() => setIsMobileFiltersOpen(false)}
          />

          {/* SNEAKERS GRID */}
          <main className="flex-1 w-full">
            {filteredSneakers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {filteredSneakers.map(sneaker => (
                  <ProductCard key={sneaker.id} product={sneaker} featured={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 px-4 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                <p className="font-display font-bold text-xl text-white uppercase mb-2">
                  No se encontraron zapatillas
                </p>
                <p className="text-sm font-light text-white/50 max-w-md mx-auto mb-6">
                  No hay modelos disponibles que coincidan con la combinación de género y marcas seleccionada.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="py-2.5 px-6 rounded-xl bg-volt text-black font-mono font-bold text-xs uppercase tracking-wider"
                >
                  Restablecer Filtros
                </button>
              </div>
            )}
          </main>
        </div>

      </div>

    </div>
  );
};
