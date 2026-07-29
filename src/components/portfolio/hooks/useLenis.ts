import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential out ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Synchronize Lenis scrolling events with GSAP ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // Coordinate requestAnimationFrame cycles with GSAP ticker
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    // Store lenis globally for routing/interaction access if needed
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateRaf);
      delete (window as any).lenis;
    };
  }, []);
};

export default useLenis;
