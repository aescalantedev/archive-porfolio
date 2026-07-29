import React, { useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Profile: React.FC = () => {
  const { t } = usePortfolio();
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    gsap.fromTo('.glass-card', 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-12 bg-transparent transition-all duration-300">
      <div className="glass-card bg-bg-secondary/20 border border-border-custom/50 rounded-xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 glass-panel grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 opacity-0">
        <div className="lg:col-span-4 font-mono text-xs tracking-widest text-accent uppercase font-bold flex items-start gap-2">
          <span className="text-accent font-extrabold">//</span> {t.profile.title}
        </div>
        <div className="lg:col-span-8">
          <p className="font-sans text-lg md:text-xl leading-relaxed text-text-primary">
            {t.profile.body}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
