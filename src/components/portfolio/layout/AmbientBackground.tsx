import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const AmbientBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    // Slow moving ambient glow loops
    gsap.to('.orb-1', {
      x: '25vw',
      y: '20vh',
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.orb-2', {
      x: '-20vw',
      y: '-25vh',
      duration: 22,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2
    });

    gsap.to('.orb-3', {
      x: '15vw',
      y: '-10vh',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 4
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle Computational Ambience Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] transition-all duration-300"
        style={{
          backgroundSize: '50px 50px',
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
        }}
      />

      {/* Glowing Light Orbs for depth */}
      <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-[#2563EB] opacity-15 dark:opacity-20 blur-[90px] md:blur-[120px] orb-1 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[#A68A64] opacity-10 dark:opacity-15 blur-[90px] md:blur-[110px] orb-2 pointer-events-none"></div>
      <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-[#7C3AED] opacity-10 dark:opacity-15 blur-[80px] md:blur-[100px] orb-3 pointer-events-none"></div>

      {/* Procedural Film Grain Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] transition-all duration-300"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>')`
        }}
      />
    </div>
  );
};

export default AmbientBackground;
