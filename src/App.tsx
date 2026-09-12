import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CartProvider } from './context/CartContext';
import { CustomCursor } from './components/layout/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/ecommerce/CartDrawer';
import { SearchModal } from './components/ecommerce/SearchModal';
import { ProductDetailModal } from './components/ecommerce/ProductDetailModal';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';

// Home Experience Sections
import { HeroSection } from './components/home/HeroSection';
import { ManifestoSection } from './components/home/ManifestoSection';
import { CategoryGateway } from './components/home/CategoryGateway';
import { TheCollection } from './components/home/TheCollection';
import { PinnedStorytelling } from './components/home/PinnedStorytelling';
import { TechnologyHotspots } from './components/home/TechnologyHotspots';
import { HorizontalGallery } from './components/home/HorizontalGallery';
import { StackedCards } from './components/home/StackedCards';
import { AthleteStory } from './components/home/AthleteStory';
import { TypographicMotion } from './components/home/TypographicMotion';
import { PerformanceMetrics } from './components/home/PerformanceMetrics';
import { BeforeAfterSlider } from './components/home/BeforeAfterSlider';
import { BrandStatement } from './components/home/BrandStatement';
import { Newsletter } from './components/home/Newsletter';

// Dedicated Category Pages
import { SportswearPage } from './components/categories/SportswearPage';
import { SneakersPage } from './components/categories/SneakersPage';
import { PerfumesPage } from './components/categories/PerfumesPage';

const MainAppContent: React.FC = () => {
  const { activeView } = useNavigation();

  // Initialize Lenis smooth scroll engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-white selection:bg-volt selection:text-black">
      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Global Interactive Overlays */}
      <Navbar />
      <CartDrawer />
      <SearchModal />
      <ProductDetailModal />
      <WhatsAppFloatingButton />

      {/* Dynamic View Router */}
      <main>
        {activeView === 'home' && (
          <>
            <HeroSection />
            <ManifestoSection />
            <CategoryGateway />
            <TheCollection />
            <PinnedStorytelling />
            <TechnologyHotspots />
            <HorizontalGallery />
            <StackedCards />
            <AthleteStory />
            <TypographicMotion />
            <PerformanceMetrics />
            <BeforeAfterSlider />
            <BrandStatement />
            <Newsletter />
          </>
        )}

        {activeView === 'sportswear' && <SportswearPage />}
        {activeView === 'sneakers' && <SneakersPage />}
        {activeView === 'perfumes' && <PerfumesPage />}
      </main>

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <NavigationProvider>
      <CartProvider>
        <MainAppContent />
      </CartProvider>
    </NavigationProvider>
  );
};

export default App;
