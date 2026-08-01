import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import type { Project } from '../data/content';

export const Works: React.FC = () => {
  const { t, lang } = usePortfolio();
  const projects = t.works.projects;

  return (
    <div id="works" className="relative w-full pt-16 lg:pt-24 pb-24 lg:pb-32 overflow-x-hidden">
      
      {/* ── HEADER (Title) ── */}
      <div className="px-6 lg:px-0 mb-8 lg:mb-12">
        <h2 className="font-heading font-extrabold text-[28px] lg:text-4xl text-text-primary mb-2 uppercase tracking-tight">
          {t.works.title}
        </h2>
        <p className="font-sans text-sm lg:text-base text-text-secondary max-w-2xl">
          {t.works.subtitle}
        </p>
      </div>

      {/* ── PROJECTS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 lg:px-0 relative z-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Final Panel: Call to Action to Archive */}
      <div className="w-full mt-20 lg:mt-32 flex items-center justify-center relative shrink-0">
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-text-primary/[0.02] select-none pointer-events-none z-0 whitespace-nowrap">
          ARCHIVE
        </div>
        <div className="w-full max-w-2xl mx-auto px-6 text-center relative z-10 flex flex-col items-center justify-center bg-bg-secondary/20 p-12 rounded-[2rem] border border-border-custom/30 glass-panel">
          <h3 className="font-heading font-black text-3xl md:text-4xl text-text-primary uppercase tracking-tight mb-4">
            {lang === 'es' ? 'Explora Más Proyectos' : 'Explore More Projects'}
          </h3>
          <p className="font-sans text-text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            {lang === 'es' 
              ? 'El showroom principal solo muestra una selección curada. Descubre decenas de repositorios públicos, paquetes open-source y experimentos en el Directorio de Ingeniería.'
              : 'The main showroom only features a curated selection. Discover dozens of public repositories, open-source packages, and experiments in the Engineering Archive.'}
          </p>
          <a 
            href="/archive" 
            className="font-mono text-[10px] md:text-xs tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-3 font-bold bg-accent text-white border border-accent hover:bg-accent/90 hover:scale-[1.03] shadow-lg shadow-accent/20 group"
          >
            {lang === 'es' ? 'Ir al Directorio de Ingeniería' : 'View Engineering Archive'} 
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>
      </div>

    </div>
  );
};

export default Works;

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  let mediaSrc = project.image || project.platforms?.[0]?.image || '/images/placeholder.jpg';
  
  return (
    <a href={`/project/${project.id}`} className="block w-full h-full group">
      <div className="h-full bg-bg-primary border border-border-custom/30 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-border-custom/60 flex flex-col w-full active:scale-[0.98] lg:hover:-translate-y-1 transition-all duration-300">
        
        {/* Top Image */}
        <div className="w-full h-48 lg:h-56 bg-bg-secondary relative overflow-hidden">
          <img src={mediaSrc} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary/20" />
        </div>
        
        {/* Content */}
        <div className="p-5 lg:p-6 flex flex-col gap-3 flex-1">
          <h3 className="font-heading font-bold text-2xl text-text-primary tracking-tight group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          
          <p className="font-sans text-sm text-text-secondary line-clamp-3 leading-relaxed flex-1">
            {project.desc}
          </p>
          
          {/* Tech Pills */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4">
            {project.stack.slice(0, 3).map(tech => (
              <span key={tech} className="bg-accent/10 text-accent font-sans font-bold tracking-wide text-[10px] uppercase px-3 py-1.5 rounded-full border border-accent/20">
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="bg-bg-secondary text-text-secondary font-sans font-bold tracking-wide text-[10px] uppercase px-3 py-1.5 rounded-full border border-border-custom/40">
                +{project.stack.length - 3}
              </span>
            )}
          </div>
        </div>

      </div>
    </a>
  );
};
