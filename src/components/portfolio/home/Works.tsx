import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useInView } from '../hooks/useInView';
import { DashboardMockup, TerminalMockup, MobileMockup, AndroidMockup } from './Mockups';
import type { Project, PlatformVariant } from '../data/content';

const ProjectCard: React.FC<{ index: number; project: Project }> = ({ index, project }) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [activePlatformIdx, setActivePlatformIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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
    // If we have a video and the user clicked play, render the video player
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
          {/* Floating Unmute/Mute Toggle */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsMuted(!isMuted);
            }}
            className="absolute bottom-4 left-4 bg-bg-primary/95 border border-border-custom px-3 py-1.5 font-mono text-[9px] tracking-widest text-text-primary flex items-center gap-2 select-none backdrop-blur-sm shadow-md z-20 hover:text-accent cursor-pointer transition-colors focus:outline-none"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM4.3 8.5H1.5v7h2.8l5.2 5.2V3.3L4.3 8.5z" />
                </svg>
                <span>SOUND: OFF</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
                <span>SOUND: ON</span>
              </>
            )}
          </button>

          {/* Floating Close Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsPlayingVideo(false);
            }}
            className="absolute bottom-4 right-4 bg-bg-primary/95 border border-border-custom px-3 py-1.5 font-mono text-[9px] tracking-widest text-text-primary flex items-center gap-2 select-none backdrop-blur-sm shadow-md z-20 hover:text-accent cursor-pointer transition-colors focus:outline-none"
            aria-label="Stop and close video"
          >
            <span>CLOSE PREVIEW</span>
          </button>
        </div>
      );
    }

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

    // If we have project but no images or video, fallback to default Mockups based on index
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
                  setIsMuted(false); // starts with audio since they clicked play
                }}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-text-primary/95 text-bg-primary border border-border-custom flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-bg-primary shadow-xl z-20 group/play focus:outline-none"
                aria-label="Play video"
              >
                {/* SVG Play Icon */}
                <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}
          </div>
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
