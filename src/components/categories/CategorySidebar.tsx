import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, Filter, RotateCcw, Check } from 'lucide-react';

export interface CategorySidebarProps {
  selectedGender: 'all' | 'men' | 'women' | 'unisex';
  onSelectGender: (gender: 'all' | 'men' | 'women' | 'unisex') => void;
  availableBrands: string[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  onClearFilters: () => void;
  brandCounts: Record<string, number>;
  totalCount: number;
  filteredCount: number;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  showUnisex?: boolean;
  groupTitle?: string;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedGender,
  onSelectGender,
  availableBrands,
  selectedBrands,
  onToggleBrand,
  onClearFilters,
  brandCounts,
  totalCount,
  filteredCount,
  isMobileOpen,
  onCloseMobile,
  showUnisex = false,
  groupTitle = 'MARCAS'
}) => {
  const [isBrandsOpen, setIsBrandsOpen] = useState(true);

  const hasActiveFilters = selectedGender !== 'all' || selectedBrands.length > 0;

  const sidebarContent = (
    <div className="space-y-6">
      {/* HEADER DE FILTROS */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-volt" />
          <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">
            FILTROS
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
            {filteredCount} de {totalCount}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-[11px] font-mono text-white/50 hover:text-volt transition-colors"
          >
            <RotateCcw size={11} />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      {/* FILTRO 1: GÉNERO (HOMBRE / MUJER) */}
      <div className="space-y-3">
        <span className="text-[11px] font-mono font-bold tracking-wider text-white/70 uppercase block">
          GÉNERO
        </span>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
          <button
            onClick={() => onSelectGender('all')}
            className={`py-2 text-[11px] font-mono font-bold rounded-lg uppercase tracking-wider transition-all ${
              selectedGender === 'all'
                ? 'bg-volt text-black shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => onSelectGender('men')}
            className={`py-2 text-[11px] font-mono font-bold rounded-lg uppercase tracking-wider transition-all ${
              selectedGender === 'men'
                ? 'bg-volt text-black shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Hombre
          </button>
          <button
            onClick={() => onSelectGender('women')}
            className={`py-2 text-[11px] font-mono font-bold rounded-lg uppercase tracking-wider transition-all ${
              selectedGender === 'women'
                ? 'bg-volt text-black shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Mujer
          </button>
        </div>

        {showUnisex && (
          <button
            onClick={() => onSelectGender(selectedGender === 'unisex' ? 'all' : 'unisex')}
            className={`w-full py-1.5 px-3 text-[11px] font-mono font-bold rounded-lg uppercase tracking-wider transition-all border ${
              selectedGender === 'unisex'
                ? 'bg-volt text-black border-volt shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                : 'text-white/60 hover:text-white border-white/10 hover:border-white/20 bg-white/5'
            }`}
          >
            Unisex
          </button>
        )}
      </div>

      {/* FILTRO 2: SUBMENÚ MARCAS (Acordeón con Checkboxes exacto a la referencia) */}
      <div className="pt-4 border-t border-white/10">
        <button
          onClick={() => setIsBrandsOpen(!isBrandsOpen)}
          className="w-full flex items-center justify-between py-1 text-left group"
        >
          <span className="font-display font-bold text-sm tracking-wide text-white uppercase group-hover:text-volt transition-colors">
            {groupTitle}
          </span>
          {isBrandsOpen ? (
            <ChevronUp size={16} className="text-white/60 group-hover:text-volt transition-colors" />
          ) : (
            <ChevronDown size={16} className="text-white/60 group-hover:text-volt transition-colors" />
          )}
        </button>

        {isBrandsOpen && (
          <div className="mt-4 space-y-2.5 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
            {availableBrands.map(brand => {
              const count = brandCounts[brand] || 0;
              const isChecked = selectedBrands.includes(brand);

              return (
                <label
                  key={brand}
                  onClick={() => onToggleBrand(brand)}
                  className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* CUSTOM CHECKBOX STYLE */}
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-volt border-volt shadow-[0_0_8px_rgba(204,255,0,0.4)]'
                          : 'border-white/30 bg-black/40 hover:border-white/60'
                      }`}
                    >
                      {isChecked && <Check size={11} className="text-black stroke-[3]" />}
                    </div>
                    <span className="text-xs font-sans tracking-wide">
                      {brand}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-white/40">
                    ({count})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR (Fijo a la izquierda) */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28 bg-[#0C0C0E] border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {sidebarContent}
        </div>
      </aside>

      {/* MOBILE DRAWER (Deslizante en celular) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay oscuro */}
          <div
            onClick={onCloseMobile}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn"
          />

          {/* Panel deslizante */}
          <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-[#0C0C0E] border-r border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 animate-slideRight">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <span className="font-display font-black text-lg text-white uppercase tracking-tight">
                  FILTRAR PRODUCTOS
                </span>
                <button
                  onClick={onCloseMobile}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {sidebarContent}
            </div>

            <div className="pt-6 border-t border-white/10">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 px-4 rounded-xl bg-volt text-black font-mono font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(204,255,0,0.4)]"
              >
                VER {filteredCount} PRODUCTOS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
