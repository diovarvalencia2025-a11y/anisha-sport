import React, { useState, useMemo } from 'react';
import { Activity, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS, Product } from '../../data/products';
import { ProductCard } from '../ecommerce/ProductCard';
import { CategorySidebar } from './CategorySidebar';

export const SportswearPage: React.FC = () => {
  const allSportswear = useMemo(() => {
    return PRODUCTS.filter(p => p.category === 'sportswear');
  }, []);

  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women' | 'unisex'>('all');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Available subcategories
  const availableSubcategories = useMemo(() => {
    return ['Pijamas', 'Conjuntos & Licras', 'Deportivo Hombres', 'Pantalonetas'];
  }, []);

  // Subcategory counts based on current gender selection
  const subcatCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    availableSubcategories.forEach(sub => {
      counts[sub] = allSportswear.filter(p => {
        const matchesSub = p.subcategory === sub;
        const matchesGender =
          selectedGender === 'all' || p.gender === selectedGender || p.gender === 'unisex';
        return matchesSub && matchesGender;
      }).length;
    });
    return counts;
  }, [allSportswear, availableSubcategories, selectedGender]);

  // Filtered products
  const filteredSportswear = useMemo(() => {
    return allSportswear.filter(item => {
      const matchesGender =
        selectedGender === 'all' ||
        item.gender === selectedGender ||
        item.gender === 'unisex';

      const matchesSubcat =
        selectedSubcategories.length === 0 ||
        selectedSubcategories.includes(item.subcategory);

      return matchesGender && matchesSubcat;
    });
  }, [allSportswear, selectedGender, selectedSubcategories]);

  const handleToggleSubcat = (sub: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const handleClearFilters = () => {
    setSelectedGender('all');
    setSelectedSubcategories([]);
  };

  const activeFiltersCount = (selectedGender !== 'all' ? 1 : 0) + selectedSubcategories.length;

  return (
    <div className="min-h-screen bg-background text-white pt-24 pb-32 animate-fadeIn">
      
      {/* 01 // SPORTSWEAR HERO BANNER */}
      <section className="relative h-[52vh] sm:h-[62vh] min-h-[460px] max-h-[600px] w-full overflow-hidden flex items-end pb-10 sm:pb-14 bg-[#070707]">
        {/* Foto de fondo completa del gimnasio */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src="./images/hero/hero-sportswear.png"
            alt="ANISHA Ropa Deportiva"
            className="w-full h-full object-cover object-[82%_15%] sm:object-[80%_20%] md:object-[78%_25%] filter brightness-[1.02] contrast-[1.04]"
          />
        </div>

        {/* Degradado negro de izquierda a derecha: oscuro a la izquierda para el texto y difuminándose totalmente a la derecha para nitidez total */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/80 md:via-[#070707]/50 via-40% to-transparent to-85% pointer-events-none" />
        {/* Refuerzo sutil inferior en móviles para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/80 via-transparent to-transparent md:hidden pointer-events-none" />
        {/* Sutil fundido inferior con el fondo */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-3 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-volt uppercase px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Activity size={14} />
            <span>CATEGORÍA 01 // INDUMENTARIA & TEXTIL</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-none">
            ENTRENA SIN <br />
            <span className="text-volt">LÍMITES.</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-md font-light leading-relaxed">
            Pijamas de descanso, conjuntos y licras de compresión para dama, pantalonetas y conjuntos deportivos para caballero.
          </p>
        </div>
      </section>

      {/* 02 // LAB PERFORMANCE STATS BAR */}
      <div className="border-b border-white/10 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
          <div>
            <span className="text-white/40 block">CATÁLOGO ACTIVO</span>
            <strong className="text-volt text-sm sm:text-base">{allSportswear.length} Prendas</strong>
          </div>
          <div>
            <span className="text-white/40 block">SUBCATEGORÍAS</span>
            <strong className="text-white text-sm sm:text-base">{availableSubcategories.length} Colecciones</strong>
          </div>
          <div>
            <span className="text-white/40 block">SELECCIÓN</span>
            <strong className="text-volt text-sm sm:text-base">Dama & Hombre</strong>
          </div>
          <div>
            <span className="text-white/40 block">PEDIDOS DIRECTOS</span>
            <strong className="text-white text-sm sm:text-base">Vía WhatsApp Oficial</strong>
          </div>
        </div>
      </div>

      {/* 03 // MAIN CONTENT WITH SIDEBAR FILTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* HEADER BAR CON CONTADOR Y BOTÓN MÓVIL */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-volt uppercase block mb-1">
              CATÁLOGO DE ROPA
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
              {selectedGender === 'all'
                ? 'TODA LA INDUMENTARIA'
                : selectedGender === 'men'
                ? 'ROPA HOMBRE'
                : 'ROPA MUJER'}
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
              Mostrando <strong className="text-white">{filteredSportswear.length}</strong> prendas
            </span>
          </div>
        </div>

        {/* ACTIVE PILLS BAR */}
        {(selectedGender !== 'all' || selectedSubcategories.length > 0) && (
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

            {selectedSubcategories.map(sub => (
              <span
                key={sub}
                className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase"
              >
                <span>{sub}</span>
                <button onClick={() => handleToggleSubcat(sub)} className="hover:text-volt ml-1">
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
            availableBrands={availableSubcategories}
            selectedBrands={selectedSubcategories}
            onToggleBrand={handleToggleSubcat}
            onClearFilters={handleClearFilters}
            brandCounts={subcatCounts}
            totalCount={allSportswear.length}
            filteredCount={filteredSportswear.length}
            isMobileOpen={isMobileFiltersOpen}
            onCloseMobile={() => setIsMobileFiltersOpen(false)}
            groupTitle="SUBCATEGORÍAS"
          />

          {/* PRODUCTS GRID */}
          <main className="flex-1 w-full">
            {filteredSportswear.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {filteredSportswear.map(product => (
                  <ProductCard key={product.id} product={product} featured={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 px-4 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                <p className="font-display font-bold text-xl text-white uppercase mb-2">
                  No se encontraron prendas
                </p>
                <p className="text-sm font-mono text-white/50 mb-6">
                  Intenta modificando los filtros de género o subcategoría seleccionados.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 rounded-full bg-volt text-black font-mono font-bold text-xs uppercase"
                >
                  Restablecer Filtros
                </button>
              </div>
            )}
          </main>
        </div>

      </div>

      {/* 04 // EDITORIAL TEXTILE INNOVATION BREAK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-12 border-t border-white/5">
        <div className="rounded-3xl bg-surface border border-surface-border p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-volt uppercase">
              CALIDAD & CONFORT ANISHA SPORT
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              TEJIDOS ANATÓMICOS Y SECADO RÁPIDO
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              Cada prenda está confeccionada con telas de tacto suave, compresión graduada para realce de figura y materiales transpirables para entrenamiento de alto rendimiento o descanso total.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <strong className="text-volt block text-sm">100% Garantizado</strong>
                <span className="text-white/50">Cero Transparencia</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <strong className="text-volt block text-sm">Ultra Suave</strong>
                <span className="text-white/50">Satín & Algodón</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <strong className="text-volt block text-sm">Dry-Fit</strong>
                <span className="text-white/50">Termorregulación</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-white/10">
            <img
              src="./images/ropa/conjuntos-licras/conjunto-licra-dama-01.webp"
              alt="Calidad Textil ANISHA"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
