import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { t } = usePortfolio();

  return (
    <footer 
      id="manifesto" 
      className="border-t border-border-custom/30 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-transparent transition-all duration-300"
    >
      <div className="max-w-md">
        <h2 className="font-heading font-extrabold text-2xl mb-3 text-text-primary uppercase tracking-tight">A. Escalante</h2>
        <p className="font-sans text-sm text-text-secondary mb-4">
          {t.contact.text}
        </p>
      </div>
      
      <div className="font-mono text-xs tracking-widest flex flex-col sm:flex-row gap-6">
        <a 
          href="mailto:contacto@aescalante.dev" 
          className="hover:text-accent uppercase transition-colors duration-200 cursor-pointer text-text-primary"
          aria-label="Send email"
        >
          {t.contact.email}
        </a>
        <a 
          href="https://github.com/aescalantedev" 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-accent uppercase transition-colors duration-200 cursor-pointer text-text-primary"
          aria-label="Visit GitHub Profile"
        >
          {t.contact.github}
        </a>
        <a 
          href="https://linkedin.com/in/antoni-escalante" 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-accent uppercase transition-colors duration-200 cursor-pointer text-text-primary"
          aria-label="Visit LinkedIn Profile"
        >
          {t.contact.linkedin}
        </a>
        <a 
          href="https://instagram.com/a_nthony.r" 
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
