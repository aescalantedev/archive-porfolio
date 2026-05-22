import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { t } = usePortfolio();

  return (
    <section 
      id="index" 
      className="min-h-[85vh] border-b border-border-custom px-6 py-12 lg:px-16 lg:py-16 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Top Coordinate/Grid Metadata */}
      <div className="absolute top-8 left-6 lg:left-16 right-6 lg:right-16 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-text-secondary">
        <div>
          <p>DOC_REF: ARCH-2026</p>
          <p>SYS.NODE: ACTIVE</p>
        </div>
        <div className="text-right">
          <p>INIT: 19:42:01Z</p>
          <p>SEQ: 001.0A</p>
        </div>
      </div>

      {/* Monumental Architectural Typography */}
      <div className="max-w-4xl mx-auto text-center mt-12">
        <h1 className="font-serif text-5xl lg:text-7xl leading-[1.1] mb-8 font-light text-text-primary tracking-wide">
          {t.hero.title}
        </h1>
        
        <div className="flex items-center justify-center space-x-4 mb-12">
          <div className="h-[1px] w-12 bg-border-custom"></div>
          <p className="font-mono text-[10px] sm:text-xs tracking-widest text-text-secondary uppercase">
            {t.hero.subtitle}
          </p>
          <div className="h-[1px] w-12 bg-border-custom"></div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 font-mono text-[11px] tracking-widest">
          <a 
            href="#archive" 
            className="bg-text-primary text-bg-primary px-8 py-4 uppercase border border-text-primary hover:bg-accent hover:border-accent transition-colors duration-300 cursor-pointer"
          >
            {t.hero.btn_projects}
          </a>
          <a 
            href="#infrastructure" 
            className="px-8 py-4 uppercase border border-border-custom hover:bg-bg-secondary text-text-primary transition-colors duration-300 cursor-pointer"
          >
            {t.hero.btn_arch}
          </a>
        </div>
      </div>
      
      {/* Bottom Dossier Label */}
      <div className="absolute bottom-8 left-6 lg:left-16 font-mono text-[9px] tracking-widest bg-text-primary text-bg-primary px-2 py-1 select-none">
        FILE: DOSSIER_01
      </div>
    </section>
  );
};

export default Hero;
