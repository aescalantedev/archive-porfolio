import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useInView } from '../hooks/useInView';
import { DashboardMockup, TerminalMockup, MobileMockup, AndroidMockup } from './Mockups';
import type { Project, PlatformVariant } from '../data/content';

const ProjectCard: React.FC<{ index: number; project: Project }> = ({ index, project }) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [activePlatformIdx, setActivePlatformIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Get active platform if exists
  const activePlatform = useMemo<PlatformVariant | undefined>(() => {
    return project.platforms ? project.platforms[activePlatformIdx] : undefined;
  }, [project.platforms, activePlatformIdx]);

  // Determine current images list based on whether a platform or project has images
  const images = useMemo<string[]>(() => {
    if (activePlatform) {
      if (activePlatform.images && activePlatform.images.length > 0) {
        return activePlatform.images;
      }
      if (activePlatform.image) {
        return [activePlatform.image];
      }
      return [];
    }
    
    if (project.images && project.images.length > 0) {
      return project.images;
    }
    if (project.image) {
      return [project.image];
    }
    return [];
  }, [activePlatform, project.images, project.image]);

  // Determine layout mode ('single' or 'side-by-side')
  const layout = useMemo<'single' | 'side-by-side'>(() => {
    if (activePlatform && activePlatform.layout) {
      return activePlatform.layout;
    }
    return 'single';
  }, [activePlatform]);

  // Group images into slides based on layout
  const slides = useMemo<string[][]>(() => {
    if (images.length === 0) return [];
    
    if (layout === 'side-by-side') {
      const grouped: string[][] = [];
      for (let i = 0; i < images.length; i += 2) {
        grouped.push(images.slice(i, i + 2));
      }
      return grouped;
    }
    
    return images.map(img => [img]);
  }, [images, layout]);

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    if (slides.length > 1) {
      setActiveImageIdx((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    if (slides.length > 1) {
      setActiveImageIdx((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  // Render visual content (mockup or carousel)
  const renderVisuals = () => {
    // If we have platform but no images, fallback to SVG mockup
    if (activePlatform && images.length === 0) {
      return (
        <div className="w-full aspect-[16/10] flex items-center justify-center overflow-hidden">
          {activePlatform.mockup === 'dashboard' && <DashboardMockup />}
          {activePlatform.mockup === 'terminal' && <TerminalMockup />}
          {activePlatform.mockup === 'mobile' && <MobileMockup />}
          {activePlatform.mockup === 'android' && <AndroidMockup />}
        </div>
      );
    }

    // If we have project but no images, fallback to default Mockups based on index
    if (!activePlatform && images.length === 0) {
      return (
        <div className="w-full aspect-[16/10] flex items-center justify-center overflow-hidden">
          {index === 1 && <DashboardMockup />}
          {index === 2 && <TerminalMockup />}
          {index === 3 && <MobileMockup />}
        </div>
      );
    }

    // Render carousel slide
    const currentSlide = slides[activeImageIdx] || [];
    
    return (
      <div className={`w-full ${layout === 'side-by-side' ? 'aspect-[4/3]' : 'aspect-[16/10]'} flex items-center justify-center overflow-hidden relative group bg-bg-secondary transition-colors duration-300`}>
        {layout === 'side-by-side' ? (
          <div className="w-full h-full p-4 md:p-6 flex justify-center items-center gap-4 md:gap-8 bg-[#1A1918]/5 hover:bg-[#1A1918]/10 transition-all duration-300">
            {currentSlide.map((imgSrc, imgIdx) => (
              <img 
                key={imgIdx}
                src={imgSrc} 
                alt={`${project.title} screenshot ${imgIdx + 1}`} 
                className="max-h-[95%] w-auto object-contain rounded-md shadow-lg border border-border-custom bg-bg-primary transition-all duration-300 hover:scale-[1.02] cursor-zoom-in"
              />
            ))}
          </div>
        ) : (
          <img 
            src={currentSlide[0]} 
            alt={`${project.title} screenshot`} 
            className="max-w-[95%] max-h-[95%] w-auto h-auto object-contain rounded-md shadow-lg border border-border-custom bg-bg-primary transition-all duration-300 hover:scale-[1.01]"
          />
        )}

        {/* Floating Monospace Index Indicator */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-bg-primary/95 border border-border-custom px-3 py-1.5 font-mono text-[9px] tracking-widest text-text-primary flex items-center gap-3 select-none backdrop-blur-sm shadow-md z-10">
            <button 
              onClick={prevSlide}
              className="hover:text-accent transition-colors cursor-pointer focus:outline-none font-bold"
              aria-label="Previous slide"
            >
              PREV
            </button>
            <span className="text-text-secondary font-medium">
              {activeImageIdx + 1} / {slides.length}
            </span>
            <button 
              onClick={nextSlide}
              className="hover:text-accent transition-colors cursor-pointer focus:outline-none font-bold"
              aria-label="Next slide"
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={ref} className={`anim-reveal${inView ? ' in-view' : ''}`} style={{ transitionDelay: `${index * 100}ms` }}>
      <article className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-16 border-t border-border-custom pt-16 first:border-t-0 first:pt-0">
        
        {/* Meta Column */}
        <div className="xl:col-span-3 font-mono text-[10px] tracking-widest text-text-secondary uppercase">
          <div className="sticky top-12 space-y-8">
            <div>
              <span className="text-accent font-semibold">{project.id}</span> — {project.title}
            </div>

            {project.role && (
              <div>
                <p className="mb-2 text-text-primary border-b border-border-custom pb-1 inline-block font-semibold">ROLE</p>
                <p className="mt-2 text-text-secondary">{project.role}</p>
              </div>
            )}
            
            {project.deployment && (
              <div>
                <p className="mb-2 text-text-primary border-b border-border-custom pb-1 inline-block font-semibold">DEPLOYMENT</p>
                <p className="mt-2 leading-relaxed text-text-secondary">{project.deployment}</p>
              </div>
            )}

            {project.challenges && (
              <div className="max-w-[200px]">
                <p className="mb-2 text-text-primary border-b border-border-custom pb-1 inline-block font-semibold">NOTES</p>
                <p className="mt-2 leading-relaxed text-[10px] normal-case font-sans text-text-secondary">{project.challenges}</p>
              </div>
            )}
          </div>
        </div>

        {/* Content & Visual Column */}
        <div className="xl:col-span-9">
          <h3 className="font-serif text-3xl lg:text-4xl mb-6 text-text-primary">{project.title}</h3>
          <p className="font-sans text-text-secondary text-sm leading-relaxed max-w-2xl mb-8">
            {activePlatform && activePlatform.desc ? activePlatform.desc : project.desc}
          </p>

          {/* Platform Tab Selectors (if project has platforms) */}
          {project.platforms && (
            <div className="flex gap-4 mb-4 font-mono text-[10px] tracking-widest uppercase">
              {project.platforms.map((platform, idx) => (
                <button
                  key={platform.label}
                  onClick={() => {
                    setActivePlatformIdx(idx);
                    setActiveImageIdx(0); // Reset carousel to first slide
                  }}
                  className={`px-4 py-2 border transition-all duration-200 cursor-pointer ${
                    activePlatformIdx === idx
                      ? "bg-text-primary text-bg-primary border-text-primary"
                      : "border-border-custom hover:bg-bg-secondary text-text-primary hover:border-accent"
                  }`}
                >
                  {platform.label}
                </button>
              ))}
            </div>
          )}

          {/* Tech Stack Tags (dynamic for active platform or static for project) */}
          {activePlatform ? (
            <div className="flex flex-wrap gap-2 mb-8 font-mono text-[10px] uppercase tracking-wider">
              {activePlatform.stack.map(tech => (
                <span key={tech} className="bg-bg-secondary px-3 py-1.5 border border-border-custom text-text-primary transition-colors duration-200 hover:border-accent">
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 mb-8 font-mono text-[10px] uppercase tracking-wider">
              {project.stack.map(tech => (
                <span key={tech} className="bg-bg-secondary px-3 py-1.5 border border-border-custom text-text-primary transition-colors duration-200 hover:border-accent">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Interactive Screen Display (Mockups or Carousel) */}
          <div className="w-full bg-bg-secondary border border-border-custom p-4 mb-8 transition-colors duration-300">
            {renderVisuals()}
          </div>

          {/* Action Anchors */}
          <div className="flex flex-wrap gap-4 font-mono text-[10px] tracking-widest uppercase mb-4">
            {(activePlatform ? activePlatform.links || [] : project.links).map((link, idx) => (
              <a 
                key={`${link.label}-${idx}`} 
                href={link.url} 
                className={`px-6 py-3 transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  idx === 0 
                    ? "bg-text-primary text-bg-primary border border-text-primary hover:bg-accent hover:border-accent" 
                    : "border border-border-custom hover:bg-bg-secondary text-text-primary hover:border-accent"
                }`}
              >
                {link.label} <span className="text-[14px]">↗</span>
              </a>
            ))}
          </div>

        </div>
      </article>
    </div>
  );
};

export const Works: React.FC = () => {
  const { t } = usePortfolio();

  return (
    <section id="works" className="px-6 py-20 lg:px-16 bg-bg-primary transition-all duration-300">
      <div className="max-w-3xl mb-24">
        <h2 className="font-serif text-4xl lg:text-5xl mb-6 text-text-primary">{t.works.title}</h2>
        <p className="font-sans text-text-secondary leading-relaxed text-sm">
          {t.works.subtitle}
        </p>
      </div>

      <div className="space-y-32">
        {t.works.projects.map((project, index) => (
          <ProjectCard key={project.id} index={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Works;
