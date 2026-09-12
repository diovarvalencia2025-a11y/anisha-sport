import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useNavigation, ViewType } from '../../context/NavigationContext';
import { useCart, Currency } from '../../context/CartContext';

export const Navbar: React.FC = () => {
  const { activeView, navigateTo, toggleSearch, isMobileMenuOpen, toggleMobileMenu, soundEnabled, toggleSound, playUiSound } = useNavigation();
  const { totalItems, toggleCart, currency, setCurrency } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; view?: ViewType; isCategory?: boolean }[] = [
    { label: 'INICIO', view: 'home' },
    { label: 'ROPA DEPORTIVA', view: 'sportswear', isCategory: true },
    { label: 'ZAPATILLAS', view: 'sneakers', isCategory: true },
    { label: 'PERFUMES', view: 'perfumes', isCategory: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#070707]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'py-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* LEFT: LOGO */}
          <button
            onClick={() => navigateTo('home')}
            className="group flex items-center space-x-3 text-left focus:outline-none"
            data-cursor-text="INICIO"
          >
            <div className="relative w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg border border-white/20 group-hover:border-volt group-hover:shadow-[0_0_15px_rgba(204,255,0,0.5)] transition-all duration-300">
              <span className="font-display font-black text-white text-base tracking-tighter group-hover:text-volt transition-colors">
                A
              </span>
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-volt opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white flex items-center notranslate" translate="no">
                ANISHA <span className="text-volt ml-1 font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-volt/10 border border-volt/20 notranslate" translate="no">SPORT</span>
              </span>
            </div>
          </button>

          {/* CENTER: DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            {navItems.map(item => {
              const isActive = item.view === activeView;
              return (
                <button
                  key={item.label}
                  onClick={() => item.view && navigateTo(item.view)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'text-black bg-volt shadow-[0_0_15px_rgba(204,255,0,0.4)]'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                  data-cursor-text={item.label}
                >
                  {item.label}
                  {item.isCategory && !isActive && (
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-volt/70 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: CONTROLS & ACTIONS */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  playUiSound('click');
                  setCurrencyMenuOpen(!currencyMenuOpen);
                }}
                className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-volt/50 transition-colors flex items-center space-x-1"
                title="Cambiar Moneda"
              >
                <span>{currency}</span>
              </button>
              {currencyMenuOpen && (
                <div className="absolute right-0 mt-2 w-24 py-1 rounded-xl bg-surface-elevated border border-surface-border shadow-2xl z-50 backdrop-blur-xl">
                  {(['EUR', 'USD', 'COP'] as Currency[]).map(curr => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyMenuOpen(false);
                        playUiSound('click');
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
                        currency === curr ? 'text-volt bg-white/5 font-bold' : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-full text-white/70 hover:text-volt hover:bg-white/10 transition-colors"
              title={soundEnabled ? 'Silenciar Efectos de Sonido' : 'Activar Efectos de Sonido'}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} className="text-white/40" />}
            </button>

            {/* Search Button */}
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full text-white/70 hover:text-volt hover:bg-white/10 transition-colors"
              title="Buscar en Catálogo"
              data-cursor-text="BUSCAR"
            >
              <Search size={18} />
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => {
                playUiSound('pop');
                toggleCart();
              }}
              className="relative group p-2.5 rounded-full bg-white text-black hover:bg-volt transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)] flex items-center justify-center"
              data-cursor-text="BOLSA"
            >
              <ShoppingBag size={18} className="transition-transform group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-crimson text-white font-mono text-[10px] font-black flex items-center justify-center border-2 border-background animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>
      </header>

      {/* FULLSCREEN MOBILE EDITORIAL MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070707]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 pt-28 animate-fadeIn md:hidden">
          <div className="space-y-6">
            <div className="text-xs font-mono font-bold tracking-widest text-volt uppercase flex items-center space-x-2">
              <Sparkles size={14} />
              <span>EXPLORA EL UNIVERSO ANISHA</span>
            </div>
            <nav className="flex flex-col space-y-3">
              {navItems.map(item => (
                <button
                  key={item.label}
                  onClick={() => item.view && navigateTo(item.view)}
                  className={`text-3xl font-display font-black text-left flex items-center justify-between py-2 border-b border-white/10 transition-colors ${
                    activeView === item.view ? 'text-volt border-volt' : 'text-white hover:text-volt'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={20} className={activeView === item.view ? 'text-volt' : 'text-white/40'} />
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>MONEDA:</span>
              <div className="flex space-x-2">
                {(['EUR', 'USD', 'COP'] as Currency[]).map(c => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-0.5 rounded font-mono ${currency === c ? 'bg-volt text-black font-bold' : 'text-white/60'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-white/40 tracking-wider">
              ANISHA SPORT © 2026 — MOVIMIENTO SIN LÍMITES
            </p>
          </div>
        </div>
      )}
    </>
  );
};
