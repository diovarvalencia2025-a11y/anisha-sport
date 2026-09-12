import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, Check, Sparkles, MessageSquare, Zap } from 'lucide-react';
import { Product, PRODUCTS } from '../../data/products';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForDetail, closeProductDetail, openProductDetail, playUiSound } = useNavigation();
  const { generateProductInquiryUrl } = useCart();

  const product = selectedProductForDetail;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!product) return null;

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const activeSize = selectedSize || product.sizes[0] || 'Standard';

  const handleWhatsAppConsultation = () => {
    playUiSound('pop');
    const url = generateProductInquiryUrl(product.name, `Talla/Medida: ${activeSize}, Tono/Color: ${currentColor.name}`);
    window.open(url, '_blank');
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl p-3 sm:p-6 lg:p-12 flex items-center justify-center animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-surface border border-surface-border rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] my-auto flex flex-col">
        
        {/* Top Floating Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-5 right-5 z-30 p-3 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white/80 hover:text-volt hover:border-volt transition-colors"
          data-cursor-text="CERRAR"
        >
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          
          {/* LEFT: MULTI-IMAGE GALLERY (7 cols on lg) */}
          <div className="lg:col-span-7 bg-[#090909] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-surface-border">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-black border border-white/5 flex items-center justify-center">
              <img
                src={product.images[selectedImageIndex] || currentColor.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
              />
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-black tracking-widest uppercase bg-volt text-black shadow-[0_0_15px_#CCFF00]">
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails row */}
            <div className="flex items-center space-x-3 mt-4 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playUiSound('click');
                    setSelectedImageIndex(idx);
                  }}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIndex === idx ? 'border-volt shadow-[0_0_15px_rgba(204,255,0,0.5)] scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: PRODUCT INFO & SPECS (5 cols on lg) */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-surface space-y-6">
            
            <div className="space-y-4">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-volt uppercase">
                  {product.category === 'sportswear' ? 'ROPA DEPORTIVA' : product.category === 'sneakers' ? 'ZAPATILLAS' : 'PERFUMES'} • {product.subcategory}
                </span>
                <div className="flex items-center space-x-1 text-xs font-mono text-white/80 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  <Star size={13} className="text-volt fill-volt" />
                  <span className="font-bold">{product.rating.toFixed(1)}</span>
                  <span className="text-white/40">({product.reviewsCount} reseñas)</span>
                </div>
              </div>

              {/* Title & Price / Consultation */}
              <div>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-white/60 font-light mt-1">
                  {product.subtitle}
                </p>
                <div className="mt-3">
                  <button
                    onClick={handleWhatsAppConsultation}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-volt/10 border border-volt/40 text-volt hover:bg-volt hover:text-black font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(204,255,0,0.2)] cursor-pointer"
                    title="Haz clic para consultar por WhatsApp directamente"
                  >
                    <MessageSquare size={15} />
                    <span>PRECIO A CONSULTAR • VÍA WHATSAPP</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-white/70 leading-relaxed font-light border-t border-white/10 pt-3">
                {product.description}
              </p>

              {/* COLOR SELECTOR */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/60">COLOR / TONO:</span>
                  <span className="font-bold text-white">{currentColor.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        playUiSound('click');
                        setSelectedColorIndex(idx);
                      }}
                      className={`w-7 h-7 rounded-full border-2 transition-transform duration-200 ${
                        selectedColorIndex === idx ? 'scale-125 border-volt shadow-[0_0_12px_#CCFF00]' : 'border-white/20 hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* SIZE SELECTOR */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/60">SELECCIONAR TALLA / PRESENTACIÓN:</span>
                  <span className="text-volt font-bold">{activeSize}</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => {
                        playUiSound('click');
                        setSelectedSize(size);
                      }}
                      className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all border ${
                        activeSize === size
                          ? 'bg-volt text-black border-volt shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                          : 'bg-white/5 border-white/10 text-white/80 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* SNEAKER TECHNICAL STATS (If sneaker) */}
              {product.sneakerSpecs && (
                <div className="grid grid-cols-2 gap-2 bg-surface-elevated p-3 rounded-2xl border border-surface-border text-[11px] font-mono">
                  <div>
                    <span className="text-white/40 block">PESO:</span>
                    <strong className="text-white">{product.sneakerSpecs.weight}</strong>
                  </div>
                  <div>
                    <span className="text-white/40 block">DROP TALÓN:</span>
                    <strong className="text-volt">{product.sneakerSpecs.drop}</strong>
                  </div>
                  <div>
                    <span className="text-white/40 block">AMORTIGUACIÓN:</span>
                    <strong className="text-white">{product.sneakerSpecs.cushioning}</strong>
                  </div>
                  <div>
                    <span className="text-white/40 block">SUPERFICIE:</span>
                    <strong className="text-white">{product.sneakerSpecs.surface}</strong>
                  </div>
                </div>
              )}

              {/* FRAGRANCE OLFACTORY PYRAMID (If perfume) */}
              {product.fragranceNotes && (
                <div className="space-y-2 bg-surface-elevated p-4 rounded-2xl border border-surface-border">
                  <span className="text-xs font-mono font-bold tracking-wider text-volt block flex items-center space-x-1">
                    <Sparkles size={13} />
                    <span>PIRÁMIDE OLFATIVA</span>
                  </span>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-white/40">NOTAS DE SALIDA:</span>
                      <span className="text-white font-medium text-right">{product.fragranceNotes.top.join(', ')}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-white/40">CORAZÓN:</span>
                      <span className="text-white font-medium text-right">{product.fragranceNotes.heart.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">FONDO:</span>
                      <span className="text-volt font-medium text-right">{product.fragranceNotes.base.join(', ')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TECHNICAL BULLETS */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest block">CARACTERÍSTICAS DESTACADAS:</span>
                <ul className="space-y-1 text-xs text-white/80 font-light">
                  {product.techSpecs.map((spec, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <Zap size={12} className="text-volt flex-shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-4 border-t border-surface-border">
              <button
                onClick={handleWhatsAppConsultation}
                className="w-full py-4 px-6 rounded-2xl font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 bg-volt text-black hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(204,255,0,0.4)] cursor-pointer"
              >
                <MessageSquare size={17} />
                <span>CONSULTAR DISPONIBILIDAD POR WHATSAPP</span>
              </button>

              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-white/50 text-center pt-2">
                <div className="flex flex-col items-center"><Truck size={14} className="text-volt mb-1" /><span>Envío Exprés</span></div>
                <div className="flex flex-col items-center"><ShieldCheck size={14} className="text-volt mb-1" /><span>Calidad Premium</span></div>
                <div className="flex flex-col items-center"><RotateCcw size={14} className="text-volt mb-1" /><span>Garantía Total</span></div>
              </div>
            </div>

          </div>

        </div>

        {/* RELATED PRODUCTS FOOTER */}
        {relatedProducts.length > 0 && (
          <div className="bg-[#0A0A0A] p-6 border-t border-surface-border">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white/40 uppercase mb-3">
              COMPLETA TU ESTILO & RENDIMIENTO
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => openProductDetail(rel)}
                  className="p-2.5 rounded-xl bg-surface border border-surface-border hover:border-volt/50 transition-all flex items-center space-x-3 cursor-pointer"
                >
                  <img src={rel.images[0]} alt={rel.name} className="w-12 h-14 object-cover rounded-lg bg-black" />
                  <div className="min-w-0">
                    <h5 className="font-display font-bold text-xs text-white truncate">{rel.name}</h5>
                    <span className="font-mono text-[11px] text-volt flex items-center space-x-1">
                      <MessageSquare size={11} />
                      <span>CONSULTAR</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
