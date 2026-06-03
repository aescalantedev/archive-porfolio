import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (containerRef.current) {
          containerRef.current.classList.add('is-visible');
        }
      }

      // Position the dot instantly for zero-latency feedback
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Smooth animate loop for the tracking ring with high responsiveness
    let animationFrameId: number;
    const animate = () => {
      // Lerp (Linear Interpolation) with a high factor (0.35) for a tight, responsive feel.
      // This prevents the "sliding on ice" or "sudden acceleration" sensation.
      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    // Interactive elements detector using direct DOM class toggles to avoid React re-renders
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.cursor-pointer') ||
        target.closest('[role="button"]') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON';

      const isText = 
        target.closest('input') || 
        target.closest('textarea') || 
        target.closest('[contenteditable="true"]') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA';

      if (ringRef.current && dotRef.current) {
        if (isInteractive) {
          ringRef.current.classList.add('is-hovered');
        } else {
          ringRef.current.classList.remove('is-hovered');
        }

        if (isText) {
          dotRef.current.classList.add('is-text-input');
          ringRef.current.classList.add('is-text-input');
        } else {
          dotRef.current.classList.remove('is-text-input');
          ringRef.current.classList.remove('is-text-input');
        }
      }
    };

    // Click triggers
    const handleMouseDown = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.classList.add('is-clicked');
        ringRef.current.classList.add('is-clicked');
      }
    };

    const handleMouseUp = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.classList.remove('is-clicked');
        ringRef.current.classList.remove('is-clicked');
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (containerRef.current) {
        containerRef.current.classList.remove('is-visible');
      }
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (containerRef.current) {
        containerRef.current.classList.add('is-visible');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <div 
      ref={containerRef}
      className="custom-cursor-container pointer-events-none fixed inset-0 z-[9999] opacity-0 transition-opacity duration-300 [&.is-visible]:opacity-100"
    >
      {/* Center dot (small square) */}
      <div 
        ref={dotRef}
        className="fixed left-0 top-0 w-1.5 h-1.5 bg-accent transition-all duration-100 rounded-none pointer-events-none [&.is-text-input]:w-[1px] [&.is-text-input]:h-3.5 [&.is-text-input]:bg-text-primary [&.is-clicked]:scale-75"
      />
      {/* Outer tracking ring (square brackets or box) */}
      <div 
        ref={ringRef}
        className="fixed left-0 top-0 w-5 h-5 border border-accent opacity-40 transition-all duration-150 pointer-events-none [&.is-hovered]:w-7 [&.is-hovered]:h-7 [&.is-hovered]:border-l-2 [&.is-hovered]:border-r-2 [&.is-hovered]:border-t-0 [&.is-hovered]:border-b-0 [&.is-hovered]:opacity-100 [&.is-hovered]:animate-[pulse_1.5s_infinite_ease-in-out] [&.is-text-input]:opacity-0 [&.is-clicked]:scale-90 [&.is-clicked]:opacity-80"
      />
    </div>
  );
};

export default CustomCursor;
