import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { t } = usePortfolio();

  return (
    <footer 
      id="manifesto" 
      className="border-t border-border-custom px-6 py-12 lg:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-bg-primary transition-all duration-300"
    >
      <div className="max-w-md">
        <h2 className="font-serif text-2xl mb-4 text-text-primary">Archive.OS</h2>
        <p className="font-sans text-sm text-text-secondary mb-4">
          {t.contact.text}
        </p>
      </div>
      
      <div className="font-mono text-xs tracking-widest flex flex-col sm:flex-row gap-6">
        <a 
          href="mailto:anthony.escalante.soluciones@gmail.com" 
          className="hover:text-accent uppercase transition-colors duration-200 cursor-pointer text-text-primary"
          aria-label="Send email"
        >
          {t.contact.email}
        </a>
        <a 
          href="https://github.com/AnthonyXJ99" 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-accent uppercase transition-colors duration-200 cursor-pointer text-text-primary"
          aria-label="Visit GitHub Profile"
        >
          {t.contact.github}
        </a>
        <a 
          href="https://linkedin.com/in/anthonyescalante" 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-accent uppercase transition-colors duration-200 cursor-pointer text-text-primary"
          aria-label="Visit LinkedIn Profile"
        >
          {t.contact.linkedin}
        </a>
        <a 
          href="https://instagram.com/anthony_xj99" 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-accent uppercase transition-colors duration-200 cursor-pointer text-text-primary"
          aria-label="Visit Instagram Profile"
        >
          {t.contact.instagram}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
