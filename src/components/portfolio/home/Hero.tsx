import React, { useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const { t } = usePortfolio();
  const heroRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // GSAP animations for entrance and floating loop
  useGSAP(() => {
    // Entrance animations
    const tl = gsap.timeline();
    tl.from('.hero-title', { 
      opacity: 0, 
      y: 50, 
      duration: 1, 
      ease: 'power3.out' 
    })
    .from('.hero-subtitle', { 
      opacity: 0, 
      x: -30, 
      duration: 0.8, 
      ease: 'power2.out' 
    }, '-=0.5')
    .from('.hero-cta', { 
      opacity: 0, 
      y: 20, 
      stagger: 0.15, 
      duration: 0.6, 
      ease: 'power2.out' 
    }, '-=0.4')
    .from('.hero-avatar-wrap', { 
      opacity: 0, 
      scale: 0.9, 
      duration: 1.2, 
      ease: 'elastic.out(1, 0.75)' 
    }, '-=0.8');

    // Idle floating animation for avatar
    gsap.to(avatarRef.current, {
      y: -12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: heroRef });

  // Mouse Move Parallax Action
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.025;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.025;
    setParallax({ x, y });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  return (
    <section 
      id="index" 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-[85vh] flex flex-col-reverse lg:flex-row items-center justify-between gap-16 py-16 md:py-24 border-b border-border-custom/30 relative overflow-visible select-none"
    >
      {/* Left Column: Heading and Info */}
      <div className="flex-1 max-w-2xl text-left flex flex-col justify-center relative z-10">

        <h1 className="hero-title font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 tracking-tight uppercase bg-gradient-to-r from-text-primary via-text-primary to-accent bg-clip-text text-transparent">
          {t.hero.title}
        </h1>

        <p className="hero-subtitle font-sans text-xs sm:text-sm tracking-wider text-text-secondary uppercase mb-10 leading-relaxed border-l-2 border-accent pl-4 font-semibold">
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-wrap gap-4 font-mono text-[10px] tracking-widest">
          <a 
            href="#works" 
            className="bg-accent text-white px-8 py-4 uppercase border border-accent hover:bg-accent/90 hover:scale-[1.03] transition-all duration-300 rounded-sm cursor-pointer shadow-lg shadow-accent/25 hover:shadow-accent/40 font-semibold"
          >
            {t.hero.btn_projects}
          </a>
          <a 
            href="#infrastructure" 
            className="px-8 py-4 uppercase border border-border-custom/80 bg-bg-secondary/40 backdrop-blur-sm hover:bg-bg-secondary hover:border-accent hover:scale-[1.03] text-text-primary transition-all duration-300 rounded-sm cursor-pointer font-semibold"
          >
            {t.hero.btn_arch}
          </a>
        </div>
      </div>

      {/* Right Column: Premium 3D Avatar Display (No stickers, organic integration) */}
      <div className="flex-1 hero-avatar-wrap w-full max-w-[400px] lg:max-w-[480px] aspect-square flex items-center justify-center relative overflow-visible">
        {/* Rotating technical SVG dashed halo in background */}
        <svg className="absolute w-[115%] h-[115%] text-accent/15 dark:text-accent/20 animate-spin pointer-events-none" style={{ animationDuration: '45s' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 8" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.1" />
        </svg>

        {/* Slow rotating nested SVG ring */}
        <svg className="absolute w-[95%] h-[95%] text-accent/10 dark:text-accent/15 animate-spin pointer-events-none" style={{ animationDuration: '30s', animationDirection: 'reverse' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="10 15" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.05" />
        </svg>

        {/* Soft background halo glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-accent/30 rounded-full blur-3xl opacity-50 dark:opacity-60 pointer-events-none"></div>
        
        {/* Interactive parallax container (clean, transparent, no crop) */}
        <div 
          ref={avatarRef}
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
            transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
            willChange: 'transform'
          }}
          className="relative w-[90%] h-[90%] flex items-end justify-center pointer-events-none overflow-visible"
        >
          {/* Avatar Image (floats freely, does not get cropped inside a box) */}
          <img 
            src="/images/avatar.png" 
            alt="Antoni Escalante Avatar" 
            className="w-auto h-[105%] object-contain select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 hover:drop-shadow-[0_25px_60px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
