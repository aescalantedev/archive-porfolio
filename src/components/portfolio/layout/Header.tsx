import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const Header: React.FC = () => {
  const { theme, lang, toggleTheme, setLang } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('index');
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // ── Scroll + route tracking ───────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const path = window.location.pathname;
      if (path.includes('/archive') || path.includes('/blog')) return;

      const scrollY = window.scrollY + 280;
      const infraEl = document.getElementById('infrastructure');
      const worksEl = document.getElementById('works');
      
      if (worksEl) {
        const rect = worksEl.getBoundingClientRect();
        // Ocultar el header si estamos dentro de la sección de proyectos (carrusel horizontal)
        setIsHidden(rect.top <= 80 && rect.bottom >= 120);
      } else {
        setIsHidden(false);
      }

      if (infraEl && scrollY >= infraEl.offsetTop) {
        setActiveItem('infrastructure');
      } else if (worksEl && scrollY >= worksEl.offsetTop) {
        setActiveItem('projects');
      } else {
        setActiveItem('index');
      }
    };

    const handleRoute = () => {
      const path = window.location.pathname;
      if (path.includes('/archive')) setActiveItem('archive');
      else if (path.includes('/blog')) setActiveItem('manifesto');
      else {
        const hash = window.location.hash;
        if (hash === '#works') setActiveItem('projects');
        else if (hash === '#infrastructure') setActiveItem('infrastructure');
        else setActiveItem('index');
      }
    };

    handleRoute();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  // ── Header entrance animation ─────────────────────────────────────────
  useGSAP(() => {
    if (typeof window === 'undefined') return;
    gsap.fromTo(headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
    );
  }, { scope: headerRef });

  // ── Mobile menu GSAP slide ────────────────────────────────────────────
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (isMobileMenuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: 'power3.out' }
      );
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'index',          label: lang === 'es' ? 'Inicio'     : 'Home',    href: '/' },
    { id: 'projects',       label: lang === 'es' ? 'Proyectos'  : 'Projects', href: '/#works' },
    { id: 'infrastructure', label: lang === 'es' ? 'Habilidades': 'Skills',   href: '/#infrastructure' },
    { id: 'manifesto',      label: 'Blog',                                    href: '/blog' },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'pt-4' : 'pt-6'
      } ${isHidden ? '-translate-y-[150%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between pointer-events-none">

        {/* ── Brand Logo (Left - Desktop) ─────────────────────────────── */}
        <a href="/" className="hidden md:flex pointer-events-auto group hover:scale-105 transition-transform duration-300">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="56" 
            height="30" 
            viewBox="0 0 217 113" 
            className="text-text-primary group-hover:text-accent transition-colors duration-300"
          >
            <path d="M 45.691 17.501 C 35.766 20.229, 21 29.815, 21 33.530 C 21 34.286, 23.041 36.308, 25.535 38.024 L 30.071 41.145 33.572 38.071 C 48.141 25.279, 69.648 25.631, 82.496 38.869 C 84.664 41.103, 92.077 52.289, 98.969 63.728 C 116.606 93, 120.467 98.533, 126.361 102.981 C 140.103 113.352, 158.360 115.582, 174.500 108.862 C 178.350 107.259, 183.457 104.254, 185.848 102.184 L 190.197 98.421 184.905 94.717 C 180.023 91.299, 179.454 91.128, 177.557 92.505 C 169.729 98.186, 165.707 99.490, 156 99.495 C 147.619 99.499, 145.830 99.171, 140.810 96.706 C 132.283 92.519, 127.058 85.889, 111 58.885 C 92.133 27.156, 86.898 21.790, 70.500 17.371 C 64.264 15.691, 52.043 15.755, 45.691 17.501 M 143 17.431 C 131.766 20.557, 125.678 24.939, 116.429 36.556 L 109.023 45.860 112.222 51.430 C 113.982 54.493, 115.705 57, 116.051 57 C 116.398 57, 120.226 52.495, 124.559 46.989 C 134.685 34.119, 139.476 30.828, 150.803 28.961 C 165.145 26.598, 179.923 34.348, 186.155 47.500 C 187.719 50.800, 188.999 54.513, 188.999 55.750 L 189 58 165.250 58.027 L 141.500 58.053 137.252 64.027 L 133.005 70 167.502 70 L 202 70 201.988 62.250 C 201.982 57.987, 201.354 52.162, 200.593 49.306 C 196.527 34.033, 183.818 21.769, 167.500 17.371 C 161.360 15.716, 149.054 15.747, 143 17.431 M 31.932 60.828 C 14.305 72.007, 11.076 92.349, 25.032 104.296 C 31.837 110.120, 39.689 112.493, 52 112.444 C 61.210 112.408, 63.212 112.075, 68.300 109.734 C 71.490 108.266, 75.441 106.110, 77.080 104.943 C 79.378 103.307, 91.598 88.725, 100.139 77.428 C 100.610 76.806, 99.456 73.969, 97.387 70.661 L 93.824 64.965 83.683 77.733 C 72.253 92.124, 70.158 94.252, 64.500 97.219 C 58.965 100.121, 47.864 100.780, 41.291 98.596 C 22.777 92.447, 27.051 71.033, 48.933 60.302 L 53.500 58.063 44.946 58.031 C 37.246 58.003, 35.946 58.282, 31.932 60.828" fill="currentColor" fillRule="evenodd" />
          </svg>
        </a>

        {/* ── Mobile TopAppBar ── */}
        <div className="md:hidden flex w-full items-center justify-between pointer-events-auto bg-bg-primary/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-border-custom/30 shadow-sm">
          
          <h1 className="font-heading font-black text-xl text-accent">
            Portfolio
          </h1>
          
          <div className="w-8 h-8 rounded-full overflow-hidden border border-border-custom">
            <img src="/images/avatar.png" alt="Profile" className="w-full h-full object-cover object-top" />
          </div>
        </div>

        {/* ── Capsule Navbar (Right) ────────────────────────────────── */}
        <div className="pointer-events-auto glass-panel flex items-center rounded-full px-2 py-1.5 shadow-lg border border-border-custom/50">
          
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 px-2">
            {navItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative font-mono text-[10px] tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-text-primary font-bold bg-text-primary/5'
                      : 'text-text-primary/60 hover:text-text-primary hover:bg-bg-secondary/50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <span className="hidden md:block w-px h-5 bg-border-custom/60 mx-1" />

          {/* Controls: EN/ES & Theme */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="font-mono text-[10px] tracking-widest px-3 py-2 text-text-primary/60 hover:text-text-primary transition-colors cursor-pointer"
            >
              {lang.toUpperCase()}
            </button>
            
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full border border-border-custom/40 bg-bg-secondary/30 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-200 cursor-pointer"
              aria-label="Toggle Color Theme"
            >
              {theme === 'light' ? (
                <svg className="w-3.5 h-3.5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              )}
            </button>
            
            {/* Mobile Menu Toggle (Removed as we now use the TopAppBar) */}
          </div>
          
          {/* CTA Button Desktop */}
          <a 
            href="mailto:contacto@aescalante.dev"
            className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase bg-accent text-white px-5 py-2 rounded-full hover:bg-accent/90 transition-all duration-200 ml-3 shadow-md shadow-accent/20 border border-accent hover:scale-[1.03] group"
          >
            {lang === 'es' ? 'Contactar' : "Let's Talk"}
            <svg className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </a>
        </div>
      </div>

      {/* ── Mobile Menu Panel (Full Screen Overlay like Screenshot 1) ── */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#0a0a0c]/90 backdrop-blur-2xl flex flex-col justify-center px-8">
          
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-8 right-6 p-2 text-white/70 hover:text-white rounded-full bg-white/10 active:scale-95"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          
          <div className="flex justify-between items-center absolute top-8 left-6">
             <div className="flex items-center gap-2">
                <button
                  onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                  className="font-mono text-xs text-white/60 hover:text-white uppercase px-3 py-1.5 rounded-full border border-white/20"
                >
                  {lang}
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-full border border-white/20 text-white/60 hover:text-white"
                >
                  <span className="material-symbols-outlined text-sm">light_mode</span>
                </button>
             </div>
          </div>

          <nav className="flex flex-col gap-8 mb-12">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-mono text-2xl tracking-[0.2em] font-bold uppercase transition-all ${
                  activeItem === item.id ? 'text-white' : 'text-white/40'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a 
            href="mailto:contacto@aescalante.dev"
            className="flex items-center justify-center gap-3 font-mono text-sm tracking-widest font-bold uppercase bg-[#6366f1] text-white w-full py-5 rounded-2xl active:scale-95 transition-all shadow-[0_8px_30px_rgba(99,102,241,0.4)]"
          >
            {lang === 'es' ? 'Contactar' : "Let's Talk"}
            <span className="material-symbols-outlined text-[20px]">mail</span>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
