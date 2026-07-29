import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Header: React.FC = () => {
  const { theme, lang, t, toggleTheme, setLang } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('index');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Only track sections dynamically on the home page path
      const path = window.location.pathname;
      if (path.includes('/archive') || path.includes('/blog')) {
        return;
      }

      const scrollPosition = window.scrollY + 250; // Offset threshold for indicator change
      const worksEl = document.getElementById('works');
      const infraEl = document.getElementById('infrastructure');

      if (infraEl && scrollPosition >= infraEl.offsetTop) {
        setActiveItem('infrastructure');
      } else if (worksEl && scrollPosition >= worksEl.offsetTop) {
        setActiveItem('projects');
      } else {
        setActiveItem('index');
      }
    };

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
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handlePathAndHash);
    window.addEventListener('popstate', handlePathAndHash);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handlePathAndHash);
      window.removeEventListener('popstate', handlePathAndHash);
    };
  }, []);

  const navItems = [
    { id: 'index', label: lang === 'es' ? 'Inicio' : 'Home', href: '/' },
    { id: 'projects', label: lang === 'es' ? 'Proyectos' : 'Projects', href: '/#works' },
    { id: 'infrastructure', label: lang === 'es' ? 'Habilidades' : 'Skills', href: '/#infrastructure' },
    { id: 'archive', label: lang === 'es' ? 'Historial' : 'Archive', href: '/archive' },
    { id: 'manifesto', label: lang === 'es' ? 'Blog' : 'Blog', href: '/blog' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-bg-primary/80 backdrop-blur-md border-b border-border-custom/50 shadow-sm' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="group flex items-center gap-2">
          <span className="font-serif text-xl tracking-wider uppercase text-text-primary group-hover:text-accent transition-colors duration-200">
            A. Escalante
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`font-mono text-xs tracking-widest uppercase transition-all duration-200 relative py-1 ${
                  isActive 
                    ? 'text-accent font-semibold' 
                    : 'text-text-primary/70 hover:text-accent'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full animate-boot-clip" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Controls (Theme & Lang) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex border border-border-custom rounded-sm overflow-hidden font-mono text-[10px]">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 transition-colors cursor-pointer ${
                lang === 'en' ? 'bg-text-primary text-bg-primary' : 'text-text-primary/70 hover:bg-bg-secondary'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('es')}
              className={`px-2.5 py-1 border-l border-border-custom transition-colors cursor-pointer ${
                lang === 'es' ? 'bg-text-primary text-bg-primary' : 'text-text-primary/70 hover:bg-bg-secondary'
              }`}
            >
              ES
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full border border-border-custom flex items-center justify-center hover:border-accent transition-colors cursor-pointer focus:outline-none"
            aria-label="Toggle Color Theme"
          >
            {theme === 'light' ? (
              /* Moon Icon */
              <svg className="w-4 h-4 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              /* Sun Icon */
              <svg className="w-4 h-4 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full border border-border-custom flex items-center justify-center cursor-pointer focus:outline-none"
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

          {/* Toggle Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-8 h-8 rounded-full border border-border-custom flex items-center justify-center cursor-pointer focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            {isMobileMenuOpen ? (
              /* Close Icon */
              <svg className="w-4 h-4 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Menu Icon */
              <svg className="w-4 h-4 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bg-bg-primary/95 backdrop-blur-lg border-b border-border-custom py-6 px-6 z-40 animate-boot-slide-up shadow-lg">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-mono text-sm tracking-widest uppercase py-2 ${
                  activeItem === item.id ? 'text-accent font-semibold' : 'text-text-primary/70'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="mt-6 pt-6 border-t border-border-custom/50 flex items-center justify-between">
            <span className="font-sans text-xs text-text-secondary font-semibold">Antoni Escalante</span>
            {/* Lang switcher mobile */}
            <div className="flex border border-border-custom rounded-sm overflow-hidden font-mono text-xs">
              <button
                onClick={() => { setLang('en'); setIsMobileMenuOpen(false); }}
                className={`px-3 py-1 cursor-pointer ${lang === 'en' ? 'bg-text-primary text-bg-primary' : 'text-text-primary/70'}`}
              >
                EN
              </button>
              <button
                onClick={() => { setLang('es'); setIsMobileMenuOpen(false); }}
                className={`px-3 py-1 border-l border-border-custom cursor-pointer ${lang === 'es' ? 'bg-text-primary text-bg-primary' : 'text-text-primary/70'}`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
