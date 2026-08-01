import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePortfolio } from '../context/PortfolioContext';

export const CustomCursor: React.FC = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const { theme } = usePortfolio();

  // quickTo for performant GSAP mouse tracking
  const xInner = useRef<((v: number) => void) | null>(null);
  const yInner = useRef<((v: number) => void) | null>(null);
  const xOuter = useRef<((v: number) => void) | null>(null);
  const yOuter = useRef<((v: number) => void) | null>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    if (innerRef.current) {
      xInner.current = gsap.quickTo(innerRef.current, 'x', { duration: 0.05, ease: 'power2.out' });
      yInner.current = gsap.quickTo(innerRef.current, 'y', { duration: 0.05, ease: 'power2.out' });
    }
    
    if (outerRef.current) {
      xOuter.current = gsap.quickTo(outerRef.current, 'x', { duration: 0.4, ease: 'power3.out' });
      yOuter.current = gsap.quickTo(outerRef.current, 'y', { duration: 0.4, ease: 'power3.out' });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // We only attach listeners, CSS handles hiding on mobile

    const onMouseMove = (e: MouseEvent) => {
      // Show cursor on first move
      gsap.to(innerRef.current, { opacity: 1, scale: 1, duration: 0.15 });
      gsap.to(outerRef.current, { opacity: 1, scale: 1, duration: 0.15 });
      
      // Offset by half the width/height to center the cursor
      xInner.current?.(e.clientX - 4);
      yInner.current?.(e.clientY - 4);
      xOuter.current?.(e.clientX - 16);
      yOuter.current?.(e.clientY - 16);
    };

    const onMouseEnter = () => {
      gsap.to(innerRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(outerRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(innerRef.current, { scale: 0, opacity: 0, duration: 0.3 });
      gsap.to(outerRef.current, { scale: 0, opacity: 0, duration: 0.3 });
    };

    // Magnetic / scale effect on interactive elements
    const onHoverEnter = () => {
      gsap.to(innerRef.current, { scale: 0.5, duration: 0.3, ease: 'power3.out' });
      gsap.to(outerRef.current, { 
        scale: 1.8, 
        backgroundColor: theme === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(79, 70, 229, 0.1)',
        borderColor: 'transparent',
        duration: 0.3, 
        ease: 'power3.out' 
      });
    };

    const onHoverLeave = () => {
      gsap.to(innerRef.current, { scale: 1, duration: 0.3, ease: 'power3.out' });
      gsap.to(outerRef.current, { 
        scale: 1, 
        backgroundColor: 'transparent',
        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        duration: 0.3, 
        ease: 'power3.out' 
      });
    };

    // Attach global listeners
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Attach listeners to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onHoverEnter);
      el.addEventListener('mouseleave', onHoverLeave);
    });

    // Observer to attach hover events to dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // ELEMENT_NODE
            const element = node as Element;
            if (element.matches('a, button, input, textarea, select, [role="button"], .interactive')) {
              element.addEventListener('mouseenter', onHoverEnter);
              element.addEventListener('mouseleave', onHoverLeave);
            }
            // Check children
            const children = element.querySelectorAll('a, button, input, textarea, select, [role="button"], .interactive');
            children.forEach((child) => {
              child.addEventListener('mouseenter', onHoverEnter);
              child.addEventListener('mouseleave', onHoverLeave);
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverEnter);
        el.removeEventListener('mouseleave', onHoverLeave);
      });
      observer.disconnect();
    };
  }, [theme]);

  return (
    <div className="hidden lg:block pointer-events-none">
      <style>
        {`
          @media (min-width: 1024px) {
            * {
              cursor: none !important;
            }
          }
        `}
      </style>
      
      {/* Inner Dot — Fast tracking */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white"
        style={{ willChange: 'transform', opacity: 0 }}
      />
      
      {/* Outer Ring — Spring tracking */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] transition-colors duration-300"
        style={{ 
          willChange: 'transform',
          opacity: 0,
          border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
        }}
      />
    </div>
  );
};

export default CustomCursor;
