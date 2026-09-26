import React, { useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Tech Badge Component (Glassmorphism with Icon)
const TechBadge: React.FC<{
  name: string;
  slug: string;
  className?: string;
  delay?: number;
  amplitude?: number;
}> = ({ name, slug, className = '', delay = 0, amplitude = 10 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const anim = gsap.to(ref.current, {
      y: -amplitude,
      duration: 2.6 + delay * 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    });
    return () => { anim.kill(); };
  }, [delay, amplitude]);

  return (
    <div ref={ref} className={`absolute z-10 ${className}`} style={{ willChange: 'transform' }}>
      <div className="glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-xl border border-border-custom/50 hover:border-accent/60 transition-colors duration-300">
        <img
          src={`https://cdn.simpleicons.org/${slug}/currentColor`}
          alt={name}
          className="w-4 h-4 object-contain text-text-primary"
        />
        <span className="font-heading font-bold text-[11px] tracking-wide text-text-primary">
          {name}
        </span>
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const { t, lang, setActiveTab } = usePortfolio();
  const heroRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  
  // Parallax setters for mouse movement
  const xSetter = useRef<((v: number) => void) | null>(null);
  const ySetter = useRef<((v: number) => void) | null>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // --- Entrance Animations ---
      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Text container slides in from left
      tl.fromTo('.hero-desktop-text > *',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 1, ease: 'power3.out' }
      )
      // 2. Avatar fades and rises
      .fromTo(avatarRef.current,
        { yPercent: 15, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        '-=1'
      )
      // 3. Badges pop in around avatar
      .fromTo('.hero-tech-badge',
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'back.out(1.7)' },
        '-=0.8'
      );

      // --- Continuous Animations ---
      
      // Avatar idle breathing
      gsap.to(avatarRef.current, {
        y: '-=15',
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });

      // Parallax initialization
      if (avatarRef.current) {
        xSetter.current = gsap.quickTo(avatarRef.current, 'x', { duration: 0.8, ease: 'power3.out' });
        ySetter.current = gsap.quickTo(avatarRef.current, 'y', { duration: 0.8, ease: 'power3.out' });
      }
    });

  }, { scope: heroRef });

  // Mouse Parallax Event
  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;
    const move = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      const nx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const ny = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      
      xSetter.current?.(nx * 12); 
      ySetter.current?.(ny * 12);
    };
    const leave = () => { 
      xSetter.current?.(0); 
      ySetter.current?.(0); 
    };
    section.addEventListener('mousemove', move);
    section.addEventListener('mouseleave', leave);
    return () => {
      section.removeEventListener('mousemove', move);
      section.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <section
      id="index"
      ref={heroRef}
      className="relative lg:-mt-28 min-h-screen w-full lg:border-b border-border-custom/20 overflow-hidden select-none flex flex-col lg:flex-row items-center pt-24 lg:pt-0"
    >
      {/* ── MOBILE UI (App-like layout matching provided HTML) ── */}
      <div className="w-full flex flex-col px-4 lg:hidden relative z-20 pt-10">
        
        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-primary rounded-full w-fit mb-6 border border-border-custom/40 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span className="font-sans text-xs font-semibold text-text-secondary">{lang === 'es' ? 'Disponible' : 'Available'}</span>
        </div>
        
        {/* Title & Subtitle */}
        <h2 className="font-heading font-black tracking-tight mb-4 uppercase flex flex-col gap-1">
          <span className="text-[20px] leading-tight text-text-secondary font-semibold">{t.hero.greeting}</span>
          <span className="text-[38px] leading-[1.1] text-accent">{t.hero.title}</span>
        </h2>
        <p className="font-sans text-[17px] text-text-secondary max-w-[280px] mb-8 leading-[1.4] font-medium border-l-2 border-accent pl-3">
          {t.hero.subtitle}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('tech-stack');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-accent text-white font-sans text-xs font-bold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-accent/90 active:scale-95 transition-all shadow-[0_4px_12px_rgba(79,70,229,0.3)] uppercase tracking-wide flex-1"
          >
            {t.hero.btn_contact}
          </a>
          <a 
            href="/cv"
            target="_blank"
            className="bg-bg-secondary text-text-primary border border-border-custom/80 font-sans text-xs font-bold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-border-custom/40 active:scale-95 transition-all uppercase tracking-wide flex-1"
          >
            {t.hero.btn_cv}
          </a>
        </div>

        {/* Habilidades destacadas (Chips) */}
        <section className="flex flex-col gap-1 mt-10">
          <h3 className="font-heading font-bold text-[22px] text-text-primary mb-3">
            {lang === 'es' ? 'Habilidades destacadas' : 'Top Skills'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'Flutter', 'Next.js', 'Node.js', 'Kotlin', 'Tailwind CSS'].map(tech => (
              <div key={tech} className="bg-accent/10 text-text-primary font-sans text-xs font-medium px-4 py-2 rounded-lg border border-accent/20">
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Proyectos Recientes (Horizontal Scroll Cards) */}
        <section className="flex flex-col gap-1 mt-10 mb-8">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-heading font-bold text-[22px] text-text-primary">
              {lang === 'es' ? 'Proyectos Recientes' : 'Recent Projects'}
            </h3>
            <button 
              onClick={() => {
                setActiveTab('works');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-accent font-sans text-xs font-medium hover:underline"
            >
              {lang === 'es' ? 'Ver todos' : 'View all'}
            </button>
          </div>
          
          {/* Horizontal scroll container */}
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4">
            
            {t.works.projects.slice(0, 3).map((project) => (
              <div key={project.id} className="min-w-[280px] w-[280px] bg-bg-secondary flex flex-col rounded-[24px] overflow-hidden shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-border-custom/30 flex-shrink-0 active:scale-[0.98] transition-transform">
                <a href={`/project/${project.id}`} className="block w-full h-full">
                  <div className="h-40 w-full relative">
                    <img 
                      src={project.image || project.platforms?.[0]?.image || '/images/placeholder.jpg'} 
                      alt={project.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <h4 className="font-heading font-bold text-[22px] text-text-primary line-clamp-1">
                      {project.title}
                    </h4>
                    <p className="font-sans text-sm text-text-secondary line-clamp-2 leading-[20px]">
                      {project.desc}
                    </p>
                    <div className="mt-2 flex gap-2">
                      {project.stack.slice(0, 2).map(tech => (
                        <span key={tech} className="text-[10px] bg-bg-primary border border-border-custom/50 text-text-secondary px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </div>
            ))}
            
          </div>
        </section>
      </div>

      {/* ── DESKTOP UI (Immersive layout) ── */}
      {/* LEFT LAYER - Text Content */}
      <div className="hero-desktop-text hidden lg:flex relative z-20 flex-col items-start text-left w-1/2 px-12 py-0">
        <h1 className="font-heading font-black text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] tracking-tight text-text-primary mb-6 drop-shadow-sm max-w-2xl uppercase">
          {t.hero.greeting} <br/>
          <span className="text-accent">{t.hero.title}</span>
        </h1>
        
        <p className="font-sans text-[clamp(1rem,1.25vw,1.25rem)] text-text-secondary max-w-xl mb-12 font-medium border-l-2 border-accent pl-4">
          {t.hero.subtitle}
        </p>
        
        <div className="flex flex-wrap items-center gap-4">
          <a 
            href="#manifesto" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-accent text-white font-sans text-sm md:text-base font-bold px-10 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-accent/90 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_8px_20px_rgba(79,70,229,0.3)] uppercase tracking-wide"
          >
            {t.hero.btn_contact}
          </a>
          <a 
            href="/cv"
            target="_blank"
            className="bg-bg-secondary text-text-primary border border-border-custom/80 font-sans text-sm md:text-base font-bold px-10 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-border-custom/40 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wide"
          >
            {t.hero.btn_cv}
          </a>
        </div>
      </div>

      {/* RIGHT LAYER - Avatar & Badges (Desktop only) */}
      <div className="relative z-10 hidden lg:flex w-1/2 h-[85vh] items-end justify-center pointer-events-none">
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-accent/15 blur-[100px] pointer-events-none" />
        <img
          ref={avatarRef}
          src="/images/avatar.png"
          alt="Antoni Escalante"
          style={{ willChange: 'transform' }}
          className="relative z-10 w-auto h-full max-h-full object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
        />
        <TechBadge name="React" slug="react" className="hero-tech-badge top-[15%] left-[8%]" delay={0} amplitude={12} />
        <TechBadge name="Flutter" slug="flutter" className="hero-tech-badge top-[38%] left-[2%]" delay={0.3} amplitude={15} />
        <TechBadge name="PostgreSQL" slug="postgresql" className="hero-tech-badge bottom-[35%] left-[10%]" delay={0.9} amplitude={8} />
        <TechBadge name="OpenUI5" slug="sap" className="hero-tech-badge bottom-[15%] left-[4%]" delay={0.7} amplitude={10} />
        
        <TechBadge name="Next.js" slug="nextdotjs" className="hero-tech-badge top-[18%] right-[12%]" delay={0.5} amplitude={14} />
        <TechBadge name=".NET Core" slug="dotnet" className="hero-tech-badge top-[40%] right-[5%]" delay={0.6} amplitude={10} />
        <TechBadge name="TypeScript" slug="typescript" className="hero-tech-badge bottom-[38%] right-[8%]" delay={0.1} amplitude={11} />
        <TechBadge name="Kotlin" slug="kotlin" className="hero-tech-badge bottom-[18%] right-[15%]" delay={0.4} amplitude={13} />
      </div>
      
    </section>
  );
};

export default Hero;
