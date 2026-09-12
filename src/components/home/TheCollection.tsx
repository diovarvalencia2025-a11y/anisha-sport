import React from 'react';
import { ProductCard } from '../ecommerce/ProductCard';
import { PRODUCTS } from '../../data/products';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowUpRight } from 'lucide-react';

export const TheCollection: React.FC = () => {
  const { navigateTo } = useNavigation();

  // Get 3 flagship hero items across categories
  const collectionItems = [
    PRODUCTS.find(p => p.id === 'sp-01')!,
    PRODUCTS.find(p => p.id === 'sn-01')!,
    PRODUCTS.find(p => p.id === 'pf-01')!,
  ].filter(Boolean);

  return (
    <section className="py-24 sm:py-32 bg-[#090909] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-volt uppercase block mb-2">
              04 // DESTACADOS DEL MES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white">
              LA COLECCIÓN
            </h2>
          </div>
          <button
            onClick={() => navigateTo('sportswear')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-mono font-bold text-volt hover:text-white transition-colors"
          >
            <span>VER TODOS LOS PRODUCTOS</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* 3 PRODUCT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {collectionItems.map((prod) => (
            <ProductCard key={prod.id} product={prod} featured={true} />
          ))}
        </div>

      </div>
    </section>
  );
};
