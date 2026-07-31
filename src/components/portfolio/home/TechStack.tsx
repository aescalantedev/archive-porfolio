import React, { useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Mapping tech name → simpleicons slug (for CDN)
const iconMap: Record<string, string> = {
  // Frontend
  'astro': 'astro',
  'next.js': 'nextdotjs',
  'react': 'react',
  'sapui5': 'sap',
  'openui5': 'sap',
  // Backend
  'asp.net': 'dotnet',
  'python': 'python',
  'node.js': 'nodedotjs',
  'fastapi': 'fastapi',
  // Mobile
  'flutter': 'flutter',
  'kotlin': 'kotlin',
  'jetpack compose': 'jetpackcompose',
  // Databases / Infra
  'postgresql': 'postgresql',
  'docker': 'docker',
  'supabase': 'supabase',
  'firebase': 'firebase',
  // Languages
  'typescript': 'typescript',
  'javascript': 'javascript',
  'dart': 'dart',
};

const getIconUrl = (tech: string) => {
  const key = tech.toLowerCase();
  const slug = iconMap[key];
  if (!slug) return null;
  return `https://cdn.simpleicons.org/${slug}/currentColor`;
};

// Individual skill chip with icon
const SkillChip: React.FC<{ name: string }> = ({ name }) => {
  const iconUrl = getIconUrl(name);
  return (
    <div className="skill-chip opacity-0 flex items-center gap-2 px-3 py-2 rounded-lg border border-border-custom/40 bg-bg-secondary/40 hover:border-accent hover:bg-bg-secondary/70 hover:shadow-md transition-all duration-200 group cursor-default glass-panel">
      {iconUrl && (
        <img
          src={iconUrl}
          alt={name}
          className="w-4 h-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200"
          style={{ filter: 'var(--icon-filter, none)' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      )}
      <span className="font-mono text-[9px] tracking-widest uppercase text-text-secondary group-hover:text-text-primary transition-colors duration-200 font-semibold whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};

// Category block
const CategoryBlock: React.FC<{ name: string; tools: string; emoji: string }> = ({ name, tools, emoji }) => {
  const toolsList = tools.split(',').map(t => t.trim());
  return (
    <div className="category-block opacity-0 p-5 rounded-xl border border-border-custom/40 bg-bg-secondary/20 glass-panel flex flex-col gap-4 hover:border-accent/40 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-2.5">
        <span className="text-lg">{emoji}</span>
        <h4 className="font-heading font-bold text-sm uppercase tracking-tight text-text-primary">
          {name}
        </h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {toolsList.map(tool => (
          <SkillChip key={tool} name={tool} />
        ))}
      </div>
    </div>
  );
};

const categoryEmojis: Record<string, string> = {
  'Frontend Systems': '🖥',
  'Backend Architecture': '⚙️',
  'Mobile Engineering': '📱',
  'Databases & Infra': '🗄',
  'Sistemas Frontend': '🖥',
  'Arquitectura Backend': '⚙️',
  'Ingeniería Móvil': '📱',
  'Bases de Datos e Infra': '🗄',
};

export const TechStack: React.FC = () => {
  const { t, lang } = usePortfolio();
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    gsap.fromTo('.skills-heading', { y: 40, opacity: 0 }, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
    });

    // Category blocks stagger
    gsap.fromTo('.category-block', { y: 35, opacity: 0 }, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
    });

    // Chips stagger after blocks appear
    gsap.fromTo('.skill-chip', { scale: 0.85, opacity: 0 }, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      scale: 1, opacity: 1, stagger: 0.04, duration: 0.5, ease: 'back.out(1.5)',
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="infrastructure"
      className="py-20 border-t border-border-custom/20 bg-transparent"
    >
      <div className="skills-heading opacity-0 mb-10">
        <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-text-primary tracking-tight uppercase">
          {t.infra.title}
        </h2>
        <p className="font-sans text-text-secondary text-sm mt-2 max-w-xl">
          {lang === 'es'
            ? 'El stack técnico que impulsa cada proyecto.'
            : 'The technical stack powering every project.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {t.infra.categories.map((cat, i) => (
          <CategoryBlock
            key={i}
            name={cat.name}
            tools={cat.tools}
            emoji={categoryEmojis[cat.name] ?? '🔧'}
          />
        ))}
      </div>
    </section>
  );
};

export default TechStack;
