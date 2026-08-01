import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const BottomNav: React.FC = () => {
  const { lang, activeTab, setActiveTab } = usePortfolio();

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', icon: 'home', label: lang === 'es' ? 'Inicio' : 'Home' },
    { id: 'works', icon: 'folder', label: lang === 'es' ? 'Proyectos' : 'Projects' },
    { id: 'tech-stack', icon: 'badge', label: lang === 'es' ? 'Perfil' : 'About' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-bg-primary/90 backdrop-blur-xl border-t border-border-custom/30 shadow-[0_-4px_24px_rgba(0,0,0,0.05)] z-[100] md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200 ${
                isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <span 
                className="material-symbols-outlined text-[24px] transition-transform duration-300"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-sans text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
