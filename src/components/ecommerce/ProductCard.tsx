import React, { useState } from 'react';
import { Eye, Star, MessageSquare } from 'lucide-react';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { generateProductInquiryUrl } = useCart();
  const { openProductDetail, playUiSound } = useNavigation();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const primaryImage = currentColor?.image || product.images[0];
  const secondaryImage = product.images[1] || primaryImage;

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    playUiSound('pop');
    const url = generateProductInquiryUrl(product.name, `Tono/Color: ${currentColor.name}`);
    window.open(url, '_blank');
  };

  const handleConsultClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playUiSound('pop');
    const url = generateProductInquiryUrl(product.name, `Tono/Color: ${currentColor.name}`);
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={() => openProductDetail(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between bg-surface rounded-2xl border border-surface-border overflow-hidden transition-all duration-500 hover:border-volt/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(204,255,0,0.1)] cursor-pointer"
      data-cursor-text="VER"
    >
      {/* BADGES & RATING OVERLAY */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-2">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-black tracking-widest uppercase bg-volt text-black shadow-[0_0_12px_rgba(204,255,0,0.4)]">
              {product.badge}
            </span>
          )}
          {product.isNew && !product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-white text-black">
              NUEVO
            </span>
          )}
        </div>
        <div className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center space-x-1 text-xs font-mono font-semibold">
          <Star size={12} className="text-volt fill-volt" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* PRODUCT IMAGE CONTAINER */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0D0D0D]">
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick Action Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex items-center space-x-2 w-full">
            <button
              onClick={handleAction}
              className="flex-1 py-2.5 px-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 bg-volt text-black hover:bg-white shadow-[0_0_15px_rgba(204,255,0,0.3)]"
            >
              <MessageSquare size={14} />
              <span>CONSULTAR WHATSAPP</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openProductDetail(product);
              }}
              className="p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white hover:text-volt hover:border-volt transition-colors"
              title="Ver Detalles"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-1">
            <span className="uppercase tracking-wider">{product.subcategory}</span>
            {product.sneakerSpecs && (
              <span className="text-volt font-semibold">{product.sneakerSpecs.weight}</span>
            )}
            {product.fragranceNotes && (
              <span className="text-white/70 font-semibold">{product.fragranceNotes.family.split('•')[0]}</span>
            )}
          </div>
          <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-volt transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-white/60 line-clamp-2 mt-1 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* COLOR SWATCHES & CONSULTAR */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          
          {/* Color Selector */}
          <div className="flex items-center space-x-1.5" onClick={e => e.stopPropagation()}>
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => {
                  playUiSound('click');
                  setSelectedColorIndex(idx);
                }}
                className={`w-4 h-4 rounded-full border transition-transform duration-200 ${
                  selectedColorIndex === idx
                    ? 'scale-125 border-volt shadow-[0_0_8px_#CCFF00]'
                    : 'border-white/20 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          {/* Consultation Tag */}
          <div className="text-right">
            <button
              onClick={handleConsultClick}
              className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-volt/10 text-volt border border-volt/30 hover:bg-volt hover:text-black transition-all shadow-[0_0_10px_rgba(204,255,0,0.15)] flex items-center space-x-1"
              title="Consultar disponibilidad por WhatsApp"
            >
              <MessageSquare size={11} />
              <span>CONSULTAR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
