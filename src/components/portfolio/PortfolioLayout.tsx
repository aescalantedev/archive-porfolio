import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import AmbientBackground from './components/AmbientBackground';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Works from './components/Works';
import Taxonomy from './components/Taxonomy';
import Footer from './components/Footer';

export const PortfolioLayout: React.FC = () => {
  return (
    <PortfolioProvider>
      <div className="relative min-h-screen w-full overflow-x-hidden transition-colors duration-300">
        
        {/* Atmospheric grid & noise overlays */}
        <AmbientBackground />
        
        {/* Core Layout Structure */}
        <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
          
          {/* Left Sidebar (fixed on large viewports) */}
          <Sidebar />
          
          {/* Main scrollable section, padded to prevent sidebar overlap */}
          <main className="lg:ml-[320px] flex-1 min-w-0 flex flex-col">
            <Hero />
            <Profile />
            <Works />
            <Taxonomy />
            <Footer />
          </main>
          
        </div>
      </div>
    </PortfolioProvider>
  );
};

export default PortfolioLayout;
