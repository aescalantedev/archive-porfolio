import React, { useState, useMemo, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DashboardMockup, TerminalMockup, MobileMockup, AndroidMockup } from './Mockups';
import type { Project, PlatformVariant } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard: React.FC<{ index: number; project: Project }> = ({ index, project }) => {
  const [activePlatformIdx, setActivePlatformIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Get active platform if exists
  const activePlatform = useMemo<PlatformVariant | undefined>(() => {
    return project.platforms ? project.platforms[activePlatformIdx] : undefined;
  }, [project.platforms, activePlatformIdx]);

  // Determine current images list
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

  // Determine layout mode
  const layout = useMemo<'single' | 'side-by-side'>(() => {
    if (activePlatform && activePlatform.layout) {
      return activePlatform.layout;
    }
    return 'single';
  }, [activePlatform]);

  // Group images into slides
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
    if (project.video && isPlayingVideo) {
      return (
        <div className="relative w-full aspect-[16/10] flex items-center justify-center overflow-hidden bg-bg-secondary">
          <video 
            src={project.video} 
            className="max-w-[95%] max-h-[95%] w-auto h-auto object-contain rounded-md shadow-lg border border-border-custom bg-bg-primary"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsMuted(!isMuted);
            }}
            className="absolute bottom-4 left-4 bg-bg-primary/95 border border-border-custom px-3 py-1.5 font-mono text-[9px] tracking-widest text-text-primary flex items-center gap-2 select-none backdrop-blur-sm shadow-md z-20 hover:text-accent cursor-pointer transition-colors focus:outline-none"
          >
            {isMuted ? 'SOUND: OFF' : 'SOUND: ON'}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsPlayingVideo(false);
            }}
            className="absolute bottom-4 right-4 bg-bg-primary/95 border border-border-custom px-3 py-1.5 font-mono text-[9px] tracking-widest text-text-primary flex items-center gap-2 select-none backdrop-blur-sm shadow-md z-20 hover:text-accent cursor-pointer transition-colors focus:outline-none"
          >
            CLOSE PREVIEW
          </button>
        </div>
      );
    }

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

    if (!activePlatform && images.length === 0 && !project.video) {
      return (
        <div className="w-full aspect-[16/10] flex items-center justify-center overflow-hidden">
          {index === 1 && <MobileMockup />}
          {index === 2 && <DashboardMockup />}
          {index === 3 && <TerminalMockup />}
          {index === 4 && <MobileMockup />}
        </div>
      );
    }

    const currentSlide = slides[activeImageIdx] || [];
    
    return (
      <div className={`w-full ${layout === 'side-by-side' ? 'aspect-[4/3]' : 'aspect-[16/10]'} flex items-center justify-center overflow-hidden relative group bg-bg-secondary transition-colors duration-300`}>
        {layout === 'side-by-side' ? (
          <div className="w-full h-full p-4 md:p-6 flex justify-center items-center gap-4 md:gap-8">
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
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={currentSlide[0]} 
              alt={`${project.title} screenshot`} 
              className="max-w-[95%] max-h-[95%] w-auto h-auto object-contain rounded-md shadow-lg border border-border-custom bg-bg-primary transition-all duration-300 hover:scale-[1.01]"
            />
            {project.video && !isPlayingVideo && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsPlayingVideo(true);
                  setIsMuted(false);
                }}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-text-primary/95 text-bg-primary border border-border-custom flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-bg-primary shadow-xl z-20 group/play focus:outline-none"
              >
                <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}
          </div>
        )}

        {slides.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-bg-primary/95 border border-border-custom px-3 py-1.5 font-mono text-[9px] tracking-widest text-text-primary flex items-center gap-3 select-none backdrop-blur-sm shadow-md z-10">
            <button 
              onClick={prevSlide}
              className="hover:text-accent transition-colors cursor-pointer focus:outline-none font-bold"
            >
              PREV
            </button>
            <span className="text-text-secondary font-medium">
              {activeImageIdx + 1} / {slides.length}
            </span>
            <button 
              onClick={nextSlide}
              className="hover:text-accent transition-colors cursor-pointer focus:outline-none font-bold"
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="project-card-wrap opacity-0 w-full">
      <article className="bg-bg-secondary/20 border border-border-custom/50 rounded-xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 glass-panel flex flex-col gap-6 relative">
        <div className="flex items-center justify-between border-b border-border-custom/30 pb-4">
          <div>
            <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-text-primary tracking-tight uppercase">
              {project.title}
            </h3>
          </div>
          <span className="font-mono text-[10px] tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-sm uppercase font-bold">
            Project {project.id}
          </span>
        </div>

        {(project.role || project.deployment) && (
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] text-text-secondary uppercase">
            {project.role && (
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span>Role:</span>
                <span className="text-text-primary normal-case font-sans text-xs font-semibold">{project.role}</span>
              </span>
            )}
            {project.deployment && (
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span>Deployment:</span>
                <span className="text-text-primary normal-case font-sans text-xs font-semibold">{project.deployment}</span>
              </span>
            )}
          </div>
        )}

        <p className="font-sans text-text-secondary text-sm leading-relaxed max-w-4xl">
          {activePlatform && activePlatform.desc ? activePlatform.desc : project.desc}
        </p>

        {project.platforms && (
          <div className="flex gap-3 font-mono text-[10px] tracking-widest uppercase">
            {project.platforms.map((platform, idx) => (
              <button
                key={platform.label}
                onClick={() => {
                  setActivePlatformIdx(idx);
                  setActiveImageIdx(0);
                }}
                className={`px-4 py-2 border rounded-sm transition-all duration-200 cursor-pointer ${
                  activePlatformIdx === idx
                    ? "bg-text-primary text-bg-primary border-text-primary shadow-sm"
                    : "border-border-custom hover:bg-bg-secondary text-text-primary hover:border-accent"
                }`}
              >
                {platform.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-widest">
          {(activePlatform ? activePlatform.stack : project.stack).map(tech => (
            <span 
              key={tech} 
              className="bg-bg-secondary/70 px-3 py-1.5 border border-border-custom/50 text-text-primary transition-all duration-200 rounded-sm hover:border-accent hover:text-accent"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="w-full bg-bg-secondary/40 border border-border-custom/50 p-4 transition-colors duration-300 rounded-lg shadow-lg glass-panel">
          {renderVisuals()}
        </div>

        <div className="flex flex-wrap gap-4 font-mono text-[10px] tracking-widest uppercase mt-2">
          {(activePlatform ? activePlatform.links || [] : project.links).map((link, idx) => (
            <a 
              key={`${link.label}-${idx}`} 
              href={link.url} 
              className={`px-6 py-3.5 transition-all duration-300 flex items-center gap-2 cursor-pointer rounded-sm shadow-sm font-semibold ${
                idx === 0 
                  ? "bg-accent text-white border border-accent hover:bg-accent/90 hover:scale-[1.03] shadow-lg shadow-accent/25 hover:shadow-accent/40" 
                  : "border border-border-custom/80 hover:bg-bg-secondary hover:border-accent hover:scale-[1.03] text-text-primary"
              }`}
            >
              {link.label} <span className="text-[12px] font-sans">↗</span>
            </a>
          ))}
        </div>

        {project.challenges && (
          <div className="border-t border-border-custom/30 pt-4 mt-2">
            <span className="font-mono text-[9px] text-text-primary font-bold uppercase tracking-wider block mb-1">Architectural Notes</span>
            <p className="font-sans text-[11px] text-text-secondary leading-relaxed">{project.challenges}</p>
          </div>
        )}
      </article>
    </div>
  );
};

export const Works: React.FC = () => {
  const { t } = usePortfolio();
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    // Animate title and subtitle using fromTo to fix opacity-0 bug
    gsap.fromTo('.works-header',
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );

    // Stagger slide up project cards using fromTo
    const cards = gsap.utils.toArray('.project-card-wrap');
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="works" className="py-20 bg-transparent transition-all duration-300">
      <div className="works-header max-w-3xl mb-20 opacity-0">
        <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl mb-6 text-text-primary tracking-tight uppercase bg-gradient-to-r from-text-primary to-text-primary/60 bg-clip-text text-transparent">
          {t.works.title}
        </h2>
        <p className="font-sans text-text-secondary leading-relaxed text-sm">
          {t.works.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {t.works.projects.map((project, index) => (
          <ProjectCard key={project.id} index={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Works;
