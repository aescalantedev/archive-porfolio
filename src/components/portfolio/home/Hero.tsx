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
  const { t } = usePortfolio();
  const heroRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  
  // Parallax setters for mouse movement
  const xSetter = useRef<((v: number) => void) | null>(null);
  const ySetter = useRef<((v: number) => void) | null>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    // --- Entrance Animations ---
    const tl = gsap.timeline({ delay: 0.1 });

    // 1. Text container slides in from left
    tl.fromTo('.hero-text-content > *',
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
      className="relative -mt-28 min-h-screen w-full border-b border-border-custom/20 overflow-hidden select-none flex flex-col lg:flex-row items-center pt-32 lg:pt-0"
    >
      
      {/* ── LEFT LAYER (Z-20) - Text Content ───────────────────────────── */}
      <div className="hero-text-content relative z-20 flex flex-col items-start text-left w-full lg:w-1/2 px-6 md:px-12 pt-10 pb-10 lg:py-0">
        
        {/* Greeting */}
        <h3 className="font-mono text-sm md:text-base tracking-widest text-text-secondary mb-3">
          {t.hero.greeting}
        </h3>

        {/* Title */}
        <h1 className="font-heading font-black text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-tight uppercase text-text-primary mb-6 drop-shadow-sm max-w-2xl">
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-[clamp(1rem,1.25vw,1.25rem)] text-text-secondary max-w-xl mb-12 font-medium border-l-2 border-accent pl-4">
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-widest">
          <a
            href="#works"
            className="bg-accent text-white px-8 py-3.5 rounded-full uppercase hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 hover:scale-[1.02] transition-all duration-300 font-bold shadow-md"
          >
            {t.hero.btn_projects}
          </a>
          <a
            href="#infrastructure"
            className="glass-panel px-8 py-3.5 rounded-full uppercase border border-border-custom/60 hover:border-accent hover:bg-bg-secondary/40 hover:scale-[1.02] text-text-primary transition-all duration-300 font-semibold shadow-sm"
          >
            {t.hero.btn_arch}
          </a>
        </div>
      </div>

      {/* ── RIGHT LAYER (Z-10) - Avatar & Badges ───────────────────────── */}
      <div className="relative z-10 w-full lg:w-1/2 h-[60vh] lg:h-[85vh] flex items-end justify-center pointer-events-none mt-10 lg:mt-0">
        
        {/* Glow behind avatar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-accent/15 blur-[100px] pointer-events-none" />

        {/* The Avatar */}
        <img
          ref={avatarRef}
          src="/images/avatar.png"
          alt="Antoni Escalante"
          style={{ willChange: 'transform' }}
          className="relative z-10 w-auto h-full max-h-full object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
        />

        {/* Floating Stack Badges around the avatar */}
        {/* Left Side */}
        <TechBadge name="React" slug="react" className="hero-tech-badge top-[15%] left-[10%] lg:left-[8%]" delay={0} amplitude={12} />
        <TechBadge name="Flutter" slug="flutter" className="hero-tech-badge top-[38%] left-[5%] lg:left-[2%]" delay={0.3} amplitude={15} />
        <TechBadge name="PostgreSQL" slug="postgresql" className="hero-tech-badge bottom-[35%] left-[12%] lg:left-[10%]" delay={0.9} amplitude={8} />
        <TechBadge name="OpenUI5" slug="sap" className="hero-tech-badge bottom-[15%] left-[5%] lg:left-[4%]" delay={0.7} amplitude={10} />
        
        {/* Right Side */}
        <TechBadge name="Next.js" slug="nextdotjs" className="hero-tech-badge top-[18%] right-[15%] lg:right-[12%]" delay={0.5} amplitude={14} />
        <TechBadge name=".NET Core" slug="dotnet" className="hero-tech-badge top-[40%] right-[8%] lg:right-[5%]" delay={0.6} amplitude={10} />
        <TechBadge name="TypeScript" slug="typescript" className="hero-tech-badge bottom-[38%] right-[10%] lg:right-[8%]" delay={0.1} amplitude={11} />
        <TechBadge name="Kotlin" slug="kotlin" className="hero-tech-badge bottom-[18%] right-[18%] lg:right-[15%]" delay={0.4} amplitude={13} />

      </div>
      
    </section>
  );
};

export default Hero;
