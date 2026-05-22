import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Sidebar: React.FC = () => {
  const { theme, lang, t, toggleTheme, setLang } = usePortfolio();

  return (
    <aside className="lg:fixed top-0 left-0 lg:w-[320px] lg:h-screen border-b lg:border-b-0 lg:border-r border-border-custom flex flex-col justify-between p-8 bg-bg-primary z-20 transition-all duration-300">
      
      {/* Logo & Meta */}
      <div>
        <h1 className="font-serif text-3xl tracking-wide mb-6 uppercase text-text-primary">Archive.OS</h1>
        <div className="font-mono text-[10px] tracking-widest text-text-secondary space-y-1 mb-12">
          <p className="text-text-primary font-medium">{t.sidebar.operator}</p>
          <p>SEC.CLR: TIER-1</p>
          <p>NODE: ONLINE</p>
        </div>
        
        {/* Navigation */}
        <nav className="font-mono text-xs tracking-widest space-y-6">
          <a 
            href="/" 
            className="block text-text-primary hover:text-accent transition-colors duration-200 cursor-pointer"
          >
            {t.sidebar.index}
          </a>
          <a 
            href="/archive" 
            className="block text-text-primary hover:text-accent transition-colors duration-200 cursor-pointer"
          >
            {t.sidebar.archive}
          </a>
          <a 
            href="/#infrastructure" 
            className="block text-text-primary hover:text-accent transition-colors duration-200 cursor-pointer"
          >
            {t.sidebar.infrastructure}
          </a>
          <a 
            href="/blog" 
            className="block text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer"
          >
            {t.sidebar.manifesto}
          </a>
        </nav>
      </div>

      {/* System Status & Controls */}
      <div className="mt-16 lg:mt-0 font-mono text-[10px] tracking-widest text-text-secondary">
        <div className="mb-8 space-y-1">
          <p>{t.sidebar.status}</p>
          <p>{t.sidebar.region}</p>
          <p>{t.sidebar.build}</p>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          
          {/* Theme Toggle */}
          <div className="flex items-center justify-between border border-border-custom p-2">
            <span>{theme === 'light' ? t.sidebar.theme_light : t.sidebar.theme_dark}</span>
            <button 
              onClick={toggleTheme}
              className="w-4 h-4 rounded-full border border-border-custom relative overflow-hidden focus:outline-none cursor-pointer"
              aria-label="Toggle system color theme"
            >
              <div 
                className={`absolute inset-0 bg-text-primary transition-transform duration-300 ${
                  theme === 'dark' ? 'translate-x-0' : '-translate-x-full'
                }`}
              />
            </button>
          </div>

          {/* Language Toggle */}
          <div className="flex border border-border-custom">
            <button 
              onClick={() => setLang('en')}
              className={`flex-1 p-2 text-center transition-colors cursor-pointer font-semibold ${
                lang === 'en' 
                  ? 'bg-text-primary text-bg-primary' 
                  : 'hover:bg-bg-secondary text-text-primary'
              }`}
            >
              {t.sidebar.lang_en}
            </button>
            <button 
              onClick={() => setLang('es')}
              className={`flex-1 p-2 text-center border-l border-border-custom transition-colors cursor-pointer font-semibold ${
                lang === 'es' 
                  ? 'bg-text-primary text-bg-primary' 
                  : 'hover:bg-bg-secondary text-text-primary'
              }`}
            >
              {t.sidebar.lang_es}
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
