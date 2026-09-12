import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles, MessageSquare } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    generateWhatsAppOrder
  } = useCart();
  const { playUiSound, navigateTo } = useNavigation();

  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    playUiSound('pop');
    const url = generateWhatsAppOrder(customerName || 'Cliente VIP', customerAddress || 'Por coordinar');
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-surface-border flex flex-col justify-between shadow-2xl animate-slideInRight">
          
          {/* HEADER */}
          <div className="p-6 border-b border-surface-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} className="text-volt" />
              <h2 className="font-display font-black text-lg tracking-wider text-white">
                TU BOLSA DE COMPRAS
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-mono text-xs font-bold">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => {
                playUiSound('click');
                setIsCartOpen(false);
              }}
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* SHIPPING & ATTENTION BADGE */}
          <div className="px-6 py-3 bg-surface-elevated border-b border-surface-border">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/80 flex items-center space-x-1.5">
                <Truck size={14} className="text-volt" />
                <span>ENVÍOS A TODA COLOMBIA • ASESORÍA DIRECTA</span>
              </span>
              <span className="font-bold text-volt">WHATSAPP VIP</span>
            </div>
          </div>

          {/* CART ITEMS LIST */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-white/5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Tu bolsa está vacía</h3>
                  <p className="text-xs text-white/50 mt-1 max-w-xs">
                    Descubre nuestra colección de ropa deportiva, zapatillas exclusivas y perfumería de alta gama.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('sportswear');
                  }}
                  className="mt-2 py-2.5 px-6 rounded-xl font-mono text-xs font-bold uppercase bg-volt text-black hover:bg-white transition-colors"
                >
                  EXPLORAR COLECCIÓN
                </button>
              </div>
            ) : (
              cart.map((item, idx) => {
                const p = item.product;
                const activeImg = p.colors.find(c => c.name === item.selectedColor)?.image || p.images[0];
                const isItemNoPrice = p.category === 'sneakers' || p.category === 'perfumes';

                return (
                  <div key={`${p.id}-${item.selectedColor}-${item.selectedSize}`} className="pt-4 first:pt-0 flex space-x-4">
                    <img
                      src={activeImg}
                      alt={p.name}
                      className="w-20 h-24 object-cover rounded-xl bg-black border border-white/10 flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-display font-bold text-sm text-white line-clamp-1">{p.name}</h4>
                          <button
                            onClick={() => {
                              playUiSound('click');
                              removeFromCart(p.id, item.selectedColor, item.selectedSize);
                            }}
                            className="text-white/40 hover:text-crimson transition-colors p-1"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div className="text-[11px] font-mono text-white/50 space-x-2 mt-0.5">
                          <span>Color: <strong className="text-white/80">{item.selectedColor}</strong></span>
                          <span>•</span>
                          <span>Talla: <strong className="text-white/80">{item.selectedSize}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 bg-white/5 rounded-lg border border-white/10 px-2 py-1">
                          <button
                            onClick={() => updateQuantity(p.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                            className="text-white/60 hover:text-white"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-mono text-xs font-bold text-white px-1.5">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(p.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                            className="text-white/60 hover:text-white"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="font-mono font-bold text-sm text-white">
                          <span className="text-xs text-volt font-mono">Precio a consultar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* FOOTER & CHECKOUT ACTIONS */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-surface-border bg-surface-elevated space-y-4">
              
              {/* Total Calculation */}
              <div className="space-y-1.5 text-xs font-mono text-white/70 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Productos en lista</span>
                  <span className="text-white font-bold">{cart.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Precios & Catálogo</span>
                  <span className="text-volt font-semibold">A consultar vía WhatsApp</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío estimado</span>
                  <span className="text-volt">A convenir vía WhatsApp</span>
                </div>
              </div>

              {/* Customer quick data toggle */}
              {showCheckoutForm ? (
                <div className="space-y-2 pt-2 animate-fadeIn">
                  <input
                    type="text"
                    placeholder="Tu Nombre Completo"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-volt"
                  />
                  <input
                    type="text"
                    placeholder="Ciudad y Dirección de Envío"
                    value={customerAddress}
                    onChange={e => setCustomerAddress(e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-volt"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCheckoutForm(true)}
                  className="text-[11px] font-mono text-white/50 hover:text-volt underline text-left block"
                >
                  + Agregar datos de entrega para pedido por WhatsApp
                </button>
              )}

              {/* Primary Order Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 px-6 rounded-xl font-mono text-xs font-black uppercase tracking-wider bg-volt text-black hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(204,255,0,0.35)] flex items-center justify-center space-x-2"
                >
                  <MessageSquare size={16} />
                  <span>PEDIR POR WHATSAPP (ATENCIÓN INMEDIATA)</span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-4 text-[10px] font-mono text-white/40 pt-2">
                <span className="flex items-center space-x-1"><ShieldCheck size={12} /><span>Calidad Premium</span></span>
                <span>•</span>
                <span>Atención VIP</span>
                <span>•</span>
                <span>Envíos Rápidos</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
