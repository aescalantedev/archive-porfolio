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

    gsap.fromTo('.profile-card',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-12 bg-transparent">
      <div className="profile-card opacity-0 bg-bg-secondary/20 border border-border-custom/40 rounded-xl p-8 md:p-12 shadow-xl glass-panel grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-4 flex flex-col gap-2">
          <span className="font-mono text-[9px] tracking-[0.25em] text-accent uppercase font-bold">
            {t.lang === 'es' ? 'PERFIL' : 'PROFILE'}
          </span>
          <h3 className="font-heading font-extrabold text-lg uppercase text-text-primary tracking-tight">
            A. Escalante
          </h3>
          <p className="font-mono text-[9px] text-text-secondary tracking-widest uppercase mt-1">
            Full-Stack · Mobile · Systems
          </p>
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
