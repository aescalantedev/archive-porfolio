import React, { useState, useMemo, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DashboardMockup, TerminalMockup, MobileMockup, AndroidMockup } from './Mockups';
import type { Project, PlatformVariant } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

// ── Detail Panel shown on the right side ──────────────────────────────────
const ProjectDetail: React.FC<{ project: Project }> = ({ project }) => {
  const [activePlatformIdx, setActivePlatformIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const activePlatform = useMemo<PlatformVariant | undefined>(() => {
    return project.platforms ? project.platforms[activePlatformIdx] : undefined;
  }, [project.platforms, activePlatformIdx]);

  const images = useMemo<string[]>(() => {
    if (activePlatform) {
      if (activePlatform.images && activePlatform.images.length > 0) return activePlatform.images;
      if (activePlatform.image) return [activePlatform.image];
      return [];
    }
    if (project.images && project.images.length > 0) return project.images;
    if (project.image) return [project.image];
    return [];
  }, [activePlatform, project.images, project.image]);

  const layout = useMemo<'single' | 'side-by-side'>(() => {
    return activePlatform?.layout ?? 'single';
  }, [activePlatform]);

  const slides = useMemo<string[][]>(() => {
    if (images.length === 0) return [];
    if (layout === 'side-by-side') {
      const grouped: string[][] = [];
      for (let i = 0; i < images.length; i += 2) grouped.push(images.slice(i, i + 2));
      return grouped;
    }
    return images.map(img => [img]);
  }, [images, layout]);

  const currentSlide = slides[activeImageIdx] || [];
  const stack = activePlatform ? activePlatform.stack : project.stack;
  const links = activePlatform?.links ?? project.links;
  const desc = activePlatform?.desc ?? project.desc;

  const handlePlatformChange = (idx: number) => {
    setActivePlatformIdx(idx);
    setActiveImageIdx(0);
    setIsPlayingVideo(false);
  };

  // Render the media zone
  const renderMedia = () => {
    if (project.video && isPlayingVideo) {
      return (
        <div className="relative w-full aspect-video flex items-center justify-center overflow-hidden bg-bg-secondary/60 rounded-lg">
          <video src={project.video} className="w-full h-full object-contain" autoPlay loop muted={false} playsInline />
          <button onClick={() => setIsPlayingVideo(false)} className="absolute bottom-3 right-3 font-mono text-[9px] tracking-widest bg-bg-primary/90 border border-border-custom/60 px-3 py-1.5 text-text-primary hover:text-accent transition-colors cursor-pointer rounded-sm">CLOSE</button>
        </div>
      );
    }

    if (images.length > 0) {
      return (
        <div className="relative w-full aspect-video flex items-center justify-center overflow-hidden bg-bg-secondary/40 rounded-lg group">
          {layout === 'side-by-side' ? (
            <div className="flex gap-3 p-3 w-full h-full items-center justify-center">
              {currentSlide.map((src, i) => (
                <img key={i} src={src} alt={project.title} className="max-h-full w-auto object-contain rounded-md border border-border-custom/30 shadow-md" />
              ))}
            </div>
          ) : (
            <img src={currentSlide[0]} alt={project.title} className="max-w-full max-h-full object-contain rounded-md border border-border-custom/30 shadow-md transition-transform duration-300 hover:scale-[1.01]" />
          )}
          {project.video && !isPlayingVideo && (
            <button onClick={() => setIsPlayingVideo(true)} className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center rounded-full bg-text-primary/90 text-bg-primary hover:bg-accent hover:text-white transition-all duration-200 shadow-lg cursor-pointer">
              <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </button>
          )}
          {slides.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setActiveImageIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${i === activeImageIdx ? 'bg-accent scale-125' : 'bg-border-custom hover:bg-accent/60'}`} />
              ))}
            </div>
          )}
        </div>
      );
    }

    // Fallback mockup
    const mockupType = activePlatform?.mockup;
    return (
      <div className="w-full aspect-video flex items-center justify-center bg-bg-secondary/40 rounded-lg overflow-hidden">
        {mockupType === 'dashboard' && <DashboardMockup />}
        {mockupType === 'terminal' && <TerminalMockup />}
        {mockupType === 'mobile' && <MobileMockup />}
        {mockupType === 'android' && <AndroidMockup />}
        {!mockupType && <TerminalMockup />}
      </div>
    );
  };

  return (
    <div ref={panelRef} className="flex flex-col gap-5 h-full">
      {/* Project meta */}
      <div className="flex items-center gap-3 flex-wrap">
        {project.role && (
          <span className="font-mono text-[9px] tracking-widest text-text-secondary uppercase border border-border-custom/40 px-2.5 py-1 rounded-sm">
            {project.role}
          </span>
        )}
        {project.deployment && (
          <span className="font-mono text-[9px] tracking-widest text-accent uppercase bg-accent/10 px-2.5 py-1 rounded-sm">
            {project.deployment}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="font-sans text-text-secondary text-sm leading-relaxed">
        {desc}
      </p>

      {/* Platform tabs */}
      {project.platforms && (
        <div className="flex gap-2 flex-wrap">
          {project.platforms.map((pl, i) => (
            <button
              key={pl.label}
              onClick={() => handlePlatformChange(i)}
              className={`font-mono text-[9px] tracking-widest uppercase px-3 py-1.5 border rounded-sm transition-all duration-200 cursor-pointer ${
                activePlatformIdx === i
                  ? 'bg-text-primary text-bg-primary border-text-primary'
                  : 'border-border-custom/50 text-text-secondary hover:border-accent hover:text-text-primary'
              }`}
            >
              {pl.label}
            </button>
          ))}
        </div>
      )}

      {/* Media zone */}
      {renderMedia()}

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5">
        {stack.map(t => (
          <span key={t} className="font-mono text-[8px] tracking-widest uppercase bg-bg-secondary/60 border border-border-custom/40 text-text-secondary px-2 py-1 rounded-sm hover:border-accent hover:text-text-primary transition-all duration-200">
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3 mt-auto">
        {links.map((link, i) => (
          <a
            key={link.label + i}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className={`font-mono text-[9px] tracking-widest uppercase px-5 py-2.5 rounded-sm transition-all duration-300 cursor-pointer flex items-center gap-1.5 font-semibold ${
              i === 0
                ? 'bg-accent text-white border border-accent hover:bg-accent/90 hover:scale-[1.03] shadow-md shadow-accent/20'
                : 'border border-border-custom/60 text-text-primary hover:border-accent hover:bg-bg-secondary hover:scale-[1.03]'
            }`}
          >
            {link.label} <span className="text-[11px]">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
};

// ── Main Works section ─────────────────────────────────────────────────────
export const Works: React.FC = () => {
  const { t } = usePortfolio();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const projects = t.works.projects;

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    gsap.fromTo('.works-heading', { y: 40, opacity: 0 }, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
    });

    gsap.fromTo('.works-project-item', { x: -30, opacity: 0 }, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      x: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out',
    });

    gsap.fromTo('.works-detail-panel', { x: 30, opacity: 0 }, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      x: 0, opacity: 1, duration: 1, ease: 'power3.out',
    });
  }, { scope: sectionRef });

  // Animate detail panel swap on project change
  const handleSelectProject = (idx: number) => {
    if (idx === activeIdx) return;
    gsap.to('.detail-inner', {
      opacity: 0, y: 12, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        setActiveIdx(idx);
        gsap.fromTo('.detail-inner', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' });
      }
    });
  };

  return (
    <section ref={sectionRef} id="works" className="py-20 bg-transparent">
      {/* Header */}
      <div className="works-heading opacity-0 mb-10">
        <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-text-primary tracking-tight uppercase">
          {t.works.title}
        </h2>
        <p className="font-sans text-text-secondary text-sm mt-3 max-w-xl">
          {t.works.subtitle}
        </p>
      </div>

      {/* Two-column layout: list left, detail right */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">

        {/* LEFT: Numbered project list */}
        <div className="flex flex-col divide-y divide-border-custom/20 border border-border-custom/30 rounded-xl overflow-hidden glass-panel bg-bg-secondary/20">
          {projects.map((project, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={project.id}
                onClick={() => handleSelectProject(idx)}
                className={`works-project-item opacity-0 text-left px-5 py-4 w-full flex items-center gap-4 transition-all duration-200 cursor-pointer group ${
                  isActive
                    ? 'bg-accent/10 border-l-2 border-accent'
                    : 'hover:bg-bg-secondary/60 border-l-2 border-transparent'
                }`}
              >
                <span className={`font-mono text-xs font-bold tabular-nums shrink-0 transition-colors duration-200 ${isActive ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'}`}>
                  {project.id}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={`font-heading font-bold text-sm uppercase tracking-tight truncate transition-colors duration-200 ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                    {project.title}
                  </div>
                  <div className="font-mono text-[9px] text-text-secondary/70 uppercase tracking-wider truncate mt-0.5">
                    {project.stack.slice(0, 3).join(' · ')}
                  </div>
                </div>
                <svg className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${isActive ? 'text-accent translate-x-0' : 'text-text-secondary/40 -translate-x-1 group-hover:translate-x-0 group-hover:text-text-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}
        </div>

        {/* RIGHT: Detail panel */}
        <div className="works-detail-panel opacity-0 border border-border-custom/30 rounded-xl p-6 md:p-8 glass-panel bg-bg-secondary/20 min-h-[520px]">
          <div className="detail-inner h-full">
            {/* Active project title */}
            <div className="flex items-baseline gap-3 mb-5 pb-4 border-b border-border-custom/30">
              <span className="font-mono text-accent text-xs font-bold">{projects[activeIdx]?.id}</span>
              <h3 className="font-heading font-extrabold text-xl md:text-2xl text-text-primary uppercase tracking-tight">
                {projects[activeIdx]?.title}
              </h3>
            </div>
            <ProjectDetail project={projects[activeIdx]} key={activeIdx} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Works;
