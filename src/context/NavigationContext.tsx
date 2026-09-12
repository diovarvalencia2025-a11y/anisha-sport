import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export type ViewType = 'home' | 'sportswear' | 'sneakers' | 'perfumes';

interface NavigationContextType {
  activeView: ViewType;
  selectedProductForDetail: Product | null;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  soundEnabled: boolean;
  navigateTo: (view: ViewType) => void;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  setIsSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  toggleSound: () => void;
  playUiSound: (type?: 'click' | 'whoosh' | 'pop' | 'success') => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Audio synthesizer for subtle tactile feedback without external asset dependencies
  const playUiSound = (type: 'click' | 'whoosh' | 'pop' | 'success' = 'click') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'pop') {
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(950, now + 0.06);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'whoosh') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.08); // A5
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch {
      // Audio context policy safe fallback
    }
  };

  const navigateTo = (view: ViewType) => {
    playUiSound('whoosh');
    setActiveView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (product: Product) => {
    playUiSound('pop');
    setSelectedProductForDetail(product);
  };

  const closeProductDetail = () => {
    playUiSound('click');
    setSelectedProductForDetail(null);
  };

  const toggleSearch = () => {
    playUiSound('click');
    setIsSearchOpen(prev => !prev);
  };

  const toggleMobileMenu = () => {
    playUiSound('click');
    setIsMobileMenuOpen(prev => !prev);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProductForDetail || isSearchOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProductForDetail, isSearchOpen, isMobileMenuOpen]);

  return (
    <NavigationContext.Provider value={{
      activeView,
      selectedProductForDetail,
      isSearchOpen,
      isMobileMenuOpen,
      soundEnabled,
      navigateTo,
      openProductDetail,
      closeProductDetail,
      setIsSearchOpen,
      toggleSearch,
      setIsMobileMenuOpen,
      toggleMobileMenu,
      toggleSound,
      playUiSound
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within NavigationProvider');
  return context;
};
