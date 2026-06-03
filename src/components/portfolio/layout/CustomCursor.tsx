import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotInnerRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);

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

      // Position the outer wrapper instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Smooth animate loop for the tracking ring
    let animationFrameId: number;
    const animate = () => {
      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animate);

    // Interactive elements detector using direct DOM class toggles
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

      if (ringInnerRef.current && dotInnerRef.current) {
        if (isInteractive) {
          ringInnerRef.current.classList.add('is-hovered');
        } else {
          ringInnerRef.current.classList.remove('is-hovered');
        }

        if (isText) {
          dotInnerRef.current.classList.add('is-text-input');
          ringInnerRef.current.classList.add('is-text-input');
        } else {
          dotInnerRef.current.classList.remove('is-text-input');
          ringInnerRef.current.classList.remove('is-text-input');
        }
      }
    };

    // Click triggers applied to inner elements to prevent transform conflicts
    const handleMouseDown = () => {
      if (dotInnerRef.current && ringInnerRef.current) {
        dotInnerRef.current.classList.add('is-clicked');
        ringInnerRef.current.classList.add('is-clicked');
      }
    };

    const handleMouseUp = () => {
      if (dotInnerRef.current && ringInnerRef.current) {
        dotInnerRef.current.classList.remove('is-clicked');
        ringInnerRef.current.classList.remove('is-clicked');
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
      className="custom-cursor-container fixed inset-0 z-[9999] opacity-0 transition-opacity duration-300 [&.is-visible]:opacity-100 pointer-events-none"
    >
      {/* Center dot positioner */}
      <div 
        ref={dotRef}
        className="fixed left-0 top-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div 
          ref={dotInnerRef}
          className="custom-cursor-dot-inner"
        />
      </div>

      {/* Outer tracking ring positioner */}
      <div 
        ref={ringRef}
        className="fixed left-0 top-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div 
          ref={ringInnerRef}
          className="custom-cursor-ring-inner"
        />
      </div>
    </div>
  );
};

export default CustomCursor;
