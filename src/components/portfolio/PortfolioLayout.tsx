import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import AmbientBackground from './layout/AmbientBackground';
import BackgroundCanvas from './layout/BackgroundCanvas';
import CustomCursor from './layout/CustomCursor';
import Header from './layout/Header';
import Hero from './home/Hero';
import Profile from './home/Profile';
import Works from './home/Works';
import TechStack from './home/TechStack';
import Footer from './layout/Footer';
import BottomNav from './layout/BottomNav';
import { useLenis } from './hooks/useLenis';

const PortfolioContent: React.FC = () => {
  // Activate Lenis smooth scrolling linked with GSAP
  useLenis();
  const { activeTab } = usePortfolio();

  return (
    <div className="relative min-h-screen w-full transition-colors duration-300 flex flex-col">
        
        {/* Custom Premium Animated Cursor */}
        <CustomCursor />

        {/* Fullscreen 3D WebGL Canvas Background */}
        <BackgroundCanvas />

        {/* Atmospheric grid & noise overlays */}
        <AmbientBackground />
        
        {/* Sticky Header Navigation */}
        <Header />
        
        {/* Main centered content layout */}
        <main className="flex-1 w-full pt-8 pb-32 lg:pt-28 lg:pb-16 relative z-10 flex flex-col gap-0 lg:gap-20">
          
          <div className={`${activeTab === 'home' ? 'block' : 'hidden lg:block'} order-1 lg:order-1 w-full max-w-7xl mx-auto px-6 md:px-12`}>
            <Hero />
          </div>
          
          <div className={`${activeTab === 'tech-stack' ? 'block' : 'hidden lg:block'} order-2 lg:order-2 w-full max-w-7xl mx-auto px-6 md:px-12`}>
            <Profile />
          </div>
          
          <div className={`${activeTab === 'works' ? 'block' : 'hidden lg:block'} order-4 lg:order-3 w-full max-w-7xl mx-auto px-6 md:px-12`}>
            <Works />
          </div>

          <div className="order-3 lg:order-4 w-full max-w-7xl mx-auto px-6 md:px-12 hidden lg:block">
            <TechStack />
          </div>
          
          <div className={`${activeTab === 'contact' ? 'block' : 'hidden lg:block'} order-3 lg:order-5 w-full max-w-7xl mx-auto px-6 md:px-12`}>
            <Footer />
          </div>

        </main>
        
        {/* Mobile App Navigation */}
        <BottomNav />
        
      </div>
  );
};

export const PortfolioLayout: React.FC = () => {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
};

export default PortfolioLayout;
