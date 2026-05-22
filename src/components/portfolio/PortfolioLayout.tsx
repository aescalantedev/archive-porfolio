import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import AmbientBackground from './layout/AmbientBackground';
import Sidebar from './layout/Sidebar';
import Hero from './home/Hero';
import Profile from './home/Profile';
import Works from './home/Works';
import TechStack from './home/TechStack';
import Footer from './layout/Footer';

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
            <TechStack />
            <Footer />
          </main>
          
        </div>
      </div>
    </PortfolioProvider>
  );
};

export default PortfolioLayout;
