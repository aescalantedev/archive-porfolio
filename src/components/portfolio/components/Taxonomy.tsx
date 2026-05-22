import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Taxonomy: React.FC = () => {
  const { t } = usePortfolio();

  return (
    <section 
      id="infrastructure" 
      className="border-t border-border-custom px-6 py-20 lg:px-16 bg-bg-secondary transition-all duration-300"
    >
      <div className="font-mono text-xs tracking-widest text-text-secondary pt-2 uppercase mb-12">
        // {t.infra.title}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {t.infra.categories.map((cat, i) => (
          <div key={i} className="border-b border-border-custom pb-6">
            <h4 className="font-serif text-xl text-text-primary mb-4">{cat.name}</h4>
            <p className="font-mono text-xs text-text-secondary leading-relaxed">
              {cat.tools}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Taxonomy;
