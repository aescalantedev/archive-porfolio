import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const BackgroundCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  // QuickTo setters for mouse parallax per blob (different speed each)
  const b1x = useRef<((v: number) => void) | null>(null);
  const b1y = useRef<((v: number) => void) | null>(null);
  const b2x = useRef<((v: number) => void) | null>(null);
  const b2y = useRef<((v: number) => void) | null>(null);
  const b3x = useRef<((v: number) => void) | null>(null);
  const b3y = useRef<((v: number) => void) | null>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    // ── Init quickTo setters ─────────────────────────────────────────
    b1x.current = gsap.quickTo(blob1Ref.current, 'x', { duration: 1.8, ease: 'power2.out' });
    b1y.current = gsap.quickTo(blob1Ref.current, 'y', { duration: 1.8, ease: 'power2.out' });
    b2x.current = gsap.quickTo(blob2Ref.current, 'x', { duration: 2.6, ease: 'power2.out' });
    b2y.current = gsap.quickTo(blob2Ref.current, 'y', { duration: 2.6, ease: 'power2.out' });
    b3x.current = gsap.quickTo(blob3Ref.current, 'x', { duration: 2.0, ease: 'power2.out' });
    b3y.current = gsap.quickTo(blob3Ref.current, 'y', { duration: 2.0, ease: 'power2.out' });

    // ── Blob 1 — top-left, slow drift ───────────────────────────────
    gsap.to(blob1Ref.current, {
      x: '+=45',
      y: '-=55',
      scale: 1.12,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // ── Blob 2 — bottom-right, slower ───────────────────────────────
    gsap.to(blob2Ref.current, {
      x: '-=50',
      y: '+=40',
      scale: 1.08,
      duration: 24,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 3,
    });

    // ── Blob 3 — center, mid-speed ───────────────────────────────────
    gsap.to(blob3Ref.current, {
      x: '+=30',
      y: '-=35',
      scale: 0.92,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 6,
    });

  }, { scope: containerRef });

  // ── Mouse parallax — each blob drifts at a different rate ──────────
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const nx = (e.clientX - cx) / cx; // -1 to 1
      const ny = (e.clientY - cy) / cy;

      // Blob 1: gentle, same direction
      b1x.current?.(nx * 28);
      b1y.current?.(ny * 28);

      // Blob 2: a bit stronger, opposite direction
      b2x.current?.(nx * -38);
      b2y.current?.(ny * -38);

      // Blob 3: medium, slightly offset
      b3x.current?.(nx * 18);
      b3y.current?.(ny * -22);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-0 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      aria-hidden="true"
    >
      {/* ── Blob 1 — top-left ──────────────────────────────────────── */}
      <div
        ref={blob1Ref}
        className="absolute rounded-full pointer-events-none"
        style={{
          top: '-10%',
          left: '-10%',
          width: '55vw',
          height: '55vw',
          filter: 'blur(100px)',
          opacity: 0.55,
          willChange: 'transform',
          background: 'var(--blob-1)',
        }}
      />

      {/* ── Blob 2 — bottom-right ──────────────────────────────────── */}
      <div
        ref={blob2Ref}
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: '-20%',
          right: '-12%',
          width: '62vw',
          height: '62vw',
          filter: 'blur(110px)',
          opacity: 0.5,
          willChange: 'transform',
          background: 'var(--blob-2)',
        }}
      />

      {/* ── Blob 3 — center ────────────────────────────────────────── */}
      <div
        ref={blob3Ref}
        className="absolute rounded-full pointer-events-none"
        style={{
          top: '35%',
          left: '35%',
          width: '42vw',
          height: '42vw',
          filter: 'blur(90px)',
          opacity: 0.4,
          willChange: 'transform',
          background: 'var(--blob-3)',
        }}
      />

      {/* ── Technical grid overlay ─────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: '42px 42px',
        }}
      />

      {/* ── Subtle noise grain overlay ─────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default BackgroundCanvas;
