import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useInView } from '../hooks/useInView';

const CategoryCard: React.FC<{ name: string; tools: string; index: number }> = ({ name, tools, index }) => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={`border-b border-border-custom pb-6 anim-reveal${inView ? ' in-view' : ''}`} style={{ transitionDelay: `${index * 100}ms` }}>
      <h4 className="font-serif text-xl text-text-primary mb-4">{name}</h4>
      <p className="font-mono text-xs text-text-secondary leading-relaxed">
        {tools}
      </p>
    </div>
  );
};

export const TechStack: React.FC = () => {
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
          <CategoryCard key={i} name={cat.name} tools={cat.tools} index={i} />
        ))}
      </div>
    </section>
  );
};

export default TechStack;
