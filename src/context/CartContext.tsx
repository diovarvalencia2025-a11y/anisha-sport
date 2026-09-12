import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export type Currency = 'EUR' | 'USD' | 'COP';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  currency: Currency;
  discountCode: string;
  discountPercent: number;
  totalItems: number;
  subtotal: number;
  total: number;
  freeShippingThreshold: number;
  progressToFreeShipping: number;
  addToCart: (product: Product, selectedColor?: string, selectedSize?: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedColor: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedColor: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  setCurrency: (curr: Currency) => void;
  applyDiscount: (code: string) => boolean;
  formatPrice: (amountEUR: number, amountUSD?: number, amountCOP?: number) => string;
  generateWhatsAppOrder: (customerName?: string, address?: string) => string;
  generateProductInquiryUrl: (productName?: string, details?: string) => string;
  whatsappPhone: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('anisha_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    localStorage.setItem('anisha_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, selectedColor?: string, selectedSize?: string, quantity = 1) => {
    const color = selectedColor || product.colors[0]?.name || 'Default';
    const size = selectedSize || product.sizes[0] || 'Standard';

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedColor === color && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, { product, selectedColor: color, selectedSize: size, quantity }];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor: string, selectedSize: string) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
    ));
  };

  const updateQuantity = (productId: string, selectedColor: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const applyDiscount = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ANISHA20' || clean === 'MOVE20' || clean === 'VIP20') {
      setDiscountCode(clean);
      setDiscountPercent(20);
      return true;
    }
    if (clean === 'ANISHA10' || clean === 'FIRST10') {
      setDiscountCode(clean);
      setDiscountPercent(10);
      return true;
    }
    return false;
  };

  const formatPrice = (amountEUR: number, amountUSD?: number, amountCOP?: number): string => {
    if (currency === 'USD') {
      const val = amountUSD || Math.round(amountEUR * 1.08);
      return `$${val.toLocaleString('en-US')}`;
    }
    if (currency === 'COP') {
      const val = amountCOP || Math.round(amountEUR * 4350);
      return `$${val.toLocaleString('es-CO')} COP`;
    }
    return `€${amountEUR.toLocaleString('de-DE')}`;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = cart.reduce((sum, item) => {
    const price = currency === 'USD' ? item.product.priceUSD : (currency === 'COP' ? item.product.priceCOP : item.product.priceEUR);
    return sum + (price * item.quantity);
  }, 0);

  const discountAmount = subtotal * (discountPercent / 100);
  const total = Math.max(0, subtotal - discountAmount);

  const freeShippingThreshold = currency === 'USD' ? 200 : (currency === 'COP' ? 800000 : 180);
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const WHATSAPP_PHONE = '573127063972';

  const generateWhatsAppOrder = (customerName = 'Cliente', address = 'A convenir'): string => {
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    let msg = `⚡ *NUEVO PEDIDO ANISHA SPORT #${orderNumber}*\n\n`;
    msg += `👤 *Cliente:* ${customerName}\n`;
    msg += `📍 *Entrega:* ${address}\n\n`;
    msg += `🛍️ *PRODUCTOS SELECCIONADOS:*\n`;

    cart.forEach((item, idx) => {
      const p = item.product;
      const isNoPrice = p.category === 'sneakers' || p.category === 'perfumes';
      const priceStr = isNoPrice ? 'Precio a consultar' : formatPrice(p.priceEUR, p.priceUSD, p.priceCOP);
      msg += `\n${idx + 1}. *${p.name}*\n   - Color/Tono: ${item.selectedColor}\n   - Talla/Medida: ${item.selectedSize}\n   - Cantidad: ${item.quantity}\n   - Precio: ${priceStr}\n`;
    });

    msg += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    if (discountPercent > 0) {
      msg += `🎟️ *Cupón Aplicado (${discountCode}):* -${discountPercent}%\n`;
    }
    msg += `💰 *TOTAL PRECIOS VISIBLES:* ${currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '$')}${total.toLocaleString()} ${currency}\n`;
    msg += `🚀 *Envío:* ${progressToFreeShipping >= 100 ? 'GRATIS EXPRESS' : 'Estándar'}\n\n`;
    msg += `_Solicito confirmación de disponibilidad, precios a consultar y medios de pago oficiales de ANISHA SPORT._`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  const generateProductInquiryUrl = (productName?: string, details?: string): string => {
    let msg = '';
    if (productName) {
      msg = `Hola ANISHA SPORT, estoy interesado en comprar el producto *${productName}*${details ? ` (${details})` : ''}. ¿Me podrías dar información sobre disponibilidad y precio por favor?`;
    } else {
      msg = `Hola ANISHA SPORT, estoy interesado en comprar en su tienda. ¿Me podrían asesorar por favor?`;
    }
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      currency,
      discountCode,
      discountPercent,
      totalItems,
      subtotal,
      total,
      freeShippingThreshold,
      progressToFreeShipping,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setIsCartOpen,
      toggleCart,
      setCurrency,
      applyDiscount,
      formatPrice,
      generateWhatsAppOrder,
      generateProductInquiryUrl,
      whatsappPhone: WHATSAPP_PHONE
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
