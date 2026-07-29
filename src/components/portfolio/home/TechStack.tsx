import React, { useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CategoryCard: React.FC<{ name: string; tools: string }> = ({ name, tools }) => {
  const toolsList = tools.split(',').map(t => t.trim());

  return (
    <div className="category-card p-6 bg-bg-secondary/40 border border-border-custom/50 rounded-lg shadow-md hover:border-accent hover:shadow-xl transition-all duration-300 glass-panel opacity-0">
      <h4 className="font-sans text-lg md:text-xl text-text-primary mb-4 font-semibold">{name}</h4>
      <div className="flex flex-wrap gap-2">
        {toolsList.map((tool) => (
          <span 
            key={tool}
            className="font-mono text-[9px] tracking-wider bg-bg-primary/80 border border-border-custom/40 text-text-secondary hover:text-text-primary hover:border-accent px-2.5 py-1.5 rounded-sm transition-all duration-200"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};

export const TechStack: React.FC = () => {
  const { t } = usePortfolio();
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    // Slide and stagger category cards as they enter scroll viewport using fromTo to fix opacity-0 bug
    gsap.fromTo('.category-card',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id="infrastructure" 
      className="py-20 border-t border-border-custom/30 bg-transparent transition-all duration-300"
    >
      <div className="font-mono text-xs tracking-widest text-text-secondary uppercase mb-10 flex items-center gap-2">
        <span className="text-accent font-extrabold">//</span> {t.infra.title}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.infra.categories.map((cat, i) => (
          <CategoryCard key={i} name={cat.name} tools={cat.tools} />
        ))}
      </div>
    </section>
  );
};

export default TechStack;
