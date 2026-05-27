import React, { createContext, useContext, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { content } from '../data/content';
import type { TranslationDictionary } from '../data/content';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es';

interface PortfolioContextType {
  theme: Theme;
  lang: Language;
  t: TranslationDictionary;
  toggleTheme: (event?: React.MouseEvent | MouseEvent) => void;
  setLang: (lang: Language) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<Language>('en');

  // Synchronize initial state from localStorage after mount to prevent SSR hydration mismatch
  useEffect(() => {
    const storedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
    }
    const storedLang = localStorage.getItem('portfolio-lang') as Language;
    if (storedLang === 'en' || storedLang === 'es') {
      setLang(storedLang);
    }
  }, []);

  const t = content[lang];

  const toggleTheme = (event?: React.MouseEvent | MouseEvent) => {
    const x = event ? event.clientX : undefined;
    const y = event ? event.clientY : undefined;

    const doc = document as any;
    const supportsViewTransition = typeof doc.startViewTransition === 'function';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (x === undefined || y === undefined || !supportsViewTransition || prefersReducedMotion) {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
      return;
    }

    const STYLE_ID = 'astro-theme-toggle-temporary-styles';
    const STYLE_CONTENT = '::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }';

    const injectStyles = () => {
      const style = document.getElementById(STYLE_ID);
      if (style) style.remove();
      const newStyle = document.createElement('style');
      newStyle.id = STYLE_ID;
      newStyle.textContent = STYLE_CONTENT;
      document.head.appendChild(newStyle);
    };

    const removeStyles = () => {
      const style = document.getElementById(STYLE_ID);
      if (style) style.remove();
    };

    injectStyles();

    const transition = doc.startViewTransition(() => {
      // Force React to flush theme state changes to the DOM synchronously
      flushSync(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
      });
    });

    transition.ready.then(() => {
      const gradientOffset = 0.7;
      const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><defs><radialGradient id="toggle-theme-gradient"><stop offset="${gradientOffset}"/><stop offset="1" stop-opacity="0"/></radialGradient></defs><circle cx="4" cy="4" r="4" fill="url(#toggle-theme-gradient)"/></svg>`;
      const maskUrl = `data:image/svg+xml;base64,${window.btoa(maskSvg)}`;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Calculate maximum sweep radius to cover all corners
      const maxRadius = Math.ceil(
        Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) / gradientOffset
      );

      document.documentElement.animate(
        {
          maskImage: [`url('${maskUrl}')`, `url('${maskUrl}')`],
          maskRepeat: ['no-repeat', 'no-repeat'],
          maskPosition: [`${x}px ${y}px`, `${x - maxRadius}px ${y - maxRadius}px`],
          maskSize: ['0', `${2 * maxRadius}px`],
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });

    transition.finished.then(removeStyles);
  };

  const changeLang = (newLang: Language) => {
    setLang(newLang);
  };

  // Sync theme variables on document.documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.style.setProperty('--bg-primary', '#F6F4EB');
      root.style.setProperty('--bg-secondary', '#EBE9DF');
      root.style.setProperty('--text-primary', '#1A1C20');
      root.style.setProperty('--text-secondary', '#646464');
      root.style.setProperty('--accent', '#8C7355');
      root.style.setProperty('--border', '#D8D2C5');
      root.classList.remove('dark');
    } else {
      root.style.setProperty('--bg-primary', '#1A1918');
      root.style.setProperty('--bg-secondary', '#242220');
      root.style.setProperty('--text-primary', '#E3E1D9');
      root.style.setProperty('--text-secondary', '#8A8680');
      root.style.setProperty('--accent', '#A68A64');
      root.style.setProperty('--border', '#34302C');
      root.classList.add('dark');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-theme', theme);
    }
  }, [theme]);

  // Sync language selection to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-lang', lang);
    }
  }, [lang]);

  return (
    <PortfolioContext.Provider value={{ theme, lang, t, toggleTheme, setLang: changeLang }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
