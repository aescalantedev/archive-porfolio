import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Sidebar: React.FC = () => {
  const { theme, lang, t, toggleTheme, setLang } = usePortfolio();
  const [activeItem, setActiveItem] = useState<string>('index');
  const [timeString, setTimeString] = useState<string>('');

  // Clock Effect
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${minutes}:${seconds}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Active Item and Intersection Observer Effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePathAndHash = () => {
      const path = window.location.pathname;
      if (path.includes('/archive')) {
        setActiveItem('archive');
      } else if (path.includes('/blog')) {
        setActiveItem('manifesto');
      } else {
        const hash = window.location.hash;
        if (hash === '#works') {
          setActiveItem('projects');
        } else if (hash === '#infrastructure') {
          setActiveItem('infrastructure');
        } else {
          setActiveItem('index');
        }
      }
    };

    handlePathAndHash();

    const path = window.location.pathname;
    const isHomePage = path === '/' || path === '';

    let observer: IntersectionObserver | null = null;
    if (isHomePage) {
      const sections = ['index', 'works', 'infrastructure'];
      const elements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

      observer = new IntersectionObserver(
        (entries) => {
          // Find the intersecting entry
          const visibleEntry = entries.find((entry) => entry.isIntersecting);
          if (visibleEntry) {
            const id = visibleEntry.target.id;
            if (id === 'index') setActiveItem('index');
            else if (id === 'works') setActiveItem('projects');
            else if (id === 'infrastructure') setActiveItem('infrastructure');
          }
        },
        {
          rootMargin: '-30% 0px -60% 0px', // trigger when section is in main view
        }
      );

      elements.forEach((el) => observer?.observe(el));
    }

    window.addEventListener('hashchange', handlePathAndHash);
    window.addEventListener('popstate', handlePathAndHash);

    return () => {
      observer?.disconnect();
      window.removeEventListener('hashchange', handlePathAndHash);
      window.removeEventListener('popstate', handlePathAndHash);
    };
  }, []);

  const renderNavLink = (id: string, href: string, label: string) => {
    const isActive = activeItem === id;
    return (
      <a 
        href={href} 
        className={`block transition-colors duration-200 cursor-pointer font-mono text-xs ${
          isActive 
            ? 'text-accent font-semibold' 
            : 'text-text-primary hover:text-accent'
        }`}
      >
        {isActive ? '> ' : '\u00A0\u00A0'}{label}
      </a>
    );
  };

  return (
    <aside className="lg:fixed top-0 left-0 lg:w-[320px] lg:h-screen border-b lg:border-b-0 lg:border-r border-border-custom flex flex-col justify-between p-8 bg-bg-primary z-20 transition-all duration-300">
      
      {/* Logo & Meta */}
      <div>
        <h1 className="font-serif text-3xl tracking-wide mb-6 uppercase text-text-primary">Archive.OS</h1>
        <div className="font-mono text-[10px] tracking-widest text-text-secondary space-y-1 mb-12">
          <p className="text-text-primary font-medium">{t.sidebar.operator}</p>
          <p>SEC.CLR: TIER-1</p>
          <p className="flex items-center gap-1.5">
            NODE: <span className="text-emerald-500 font-semibold">ONLINE</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
          </p>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-6">
          {renderNavLink('index', '/', t.sidebar.index)}
          {renderNavLink('projects', '/#works', t.sidebar.projects)}
          {renderNavLink('archive', '/archive', t.sidebar.archive)}
          {renderNavLink('infrastructure', '/#infrastructure', t.sidebar.infrastructure)}
          {renderNavLink('manifesto', '/blog', t.sidebar.manifesto)}
        </nav>
      </div>

      {/* System Status & Controls */}
      <div className="mt-16 lg:mt-0 font-mono text-[10px] tracking-widest text-text-secondary">
        <div className="mb-8 space-y-1">
          <p>{t.sidebar.status}</p>
          <p>{t.sidebar.region}</p>
          {timeString && <p>SYS.TIME: {timeString}</p>}
          <p>{t.sidebar.build}</p>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          
          {/* Theme Toggle */}
          <div className="flex items-center justify-between border border-border-custom p-2 hover:border-text-primary transition-colors duration-200">
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
