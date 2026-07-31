import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import AmbientBackground from './layout/AmbientBackground';
import BackgroundCanvas from './layout/BackgroundCanvas';
import CustomCursor from './layout/CustomCursor';
import Header from './layout/Header';
import Hero from './home/Hero';
import Profile from './home/Profile';
import Works from './home/Works';
import TechStack from './home/TechStack';
import Footer from './layout/Footer';
import { useLenis } from './hooks/useLenis';

export const PortfolioLayout: React.FC = () => {
  // Activate Lenis smooth scrolling linked with GSAP
  useLenis();

  return (
    <PortfolioProvider>
      <div className="relative min-h-screen w-full overflow-x-hidden transition-colors duration-300 flex flex-col">
        
        {/* Custom Premium Animated Cursor */}
        <CustomCursor />

        {/* Fullscreen 3D WebGL Canvas Background */}
        <BackgroundCanvas />

        {/* Atmospheric grid & noise overlays */}
        <AmbientBackground />
        
        {/* Sticky Header Navigation */}
        <Header />
        
        {/* Main centered content layout */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 relative z-10 flex flex-col gap-20">
          <Hero />
          <Profile />
          <Works />
          <TechStack />
          <Footer />
        </main>
        
      </div>
    </PortfolioProvider>
  );
};

export default PortfolioLayout;
