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
    <section ref={sectionRef} id="tech-stack" className="py-12 bg-transparent lg:py-20 relative">
      
      {/* ── DESKTOP UI (Original Profile Card) ── */}
      <div className="profile-card hidden lg:grid opacity-0 bg-bg-secondary/20 border border-border-custom/40 rounded-xl p-8 md:p-12 shadow-xl glass-panel grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
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

      {/* ── MOBILE UI (App-like 'Sobre mí' View) ── */}
      <div className="w-full lg:hidden flex flex-col relative z-20 px-2 mt-8">
        
        {/* Header Profile */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-bg-primary shadow-xl mb-4 bg-accent/10">
            <img src="/images/avatar.png" alt="Antoni Escalante" className="w-full h-full object-cover object-top" />
          </div>
          <h2 className="font-heading font-black text-4xl text-text-primary mb-1">
            Antoni<br/>Escalante
          </h2>
          <p className="font-sans text-accent font-semibold text-sm">
            {t.profile.role}
          </p>
        </div>

        {/* Trayectoria */}
        <div className="bg-bg-secondary/30 rounded-3xl p-6 border border-border-custom/30 mb-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-text-primary">
            <span className="material-symbols-outlined text-accent">history_edu</span>
            <h3 className="font-heading font-bold text-lg">{t.profile.journey}</h3>
          </div>
          <p className="font-sans text-text-secondary text-sm leading-relaxed mb-6">
            {t.profile.body}
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-bg-primary rounded-2xl p-4 flex flex-col items-center text-center border border-border-custom/20 shadow-sm">
              <span className="text-accent font-black text-2xl mb-1">5+</span>
              <span className="text-text-secondary text-[10px] font-semibold uppercase tracking-wider">{t.profile.yearsExp}</span>
            </div>
            <div className="bg-bg-primary rounded-2xl p-4 flex flex-col items-center text-center border border-border-custom/20 shadow-sm">
              <span className="text-accent font-black text-2xl mb-1">20+</span>
              <span className="text-text-secondary text-[10px] font-semibold uppercase tracking-wider">{t.profile.projectsCount}</span>
            </div>
            <div className="bg-bg-primary rounded-2xl p-4 flex flex-col items-center text-center border border-border-custom/20 shadow-sm">
              <span className="text-accent font-black text-lg mb-1">Full-Stack</span>
              <span className="text-text-secondary text-[10px] font-semibold uppercase tracking-wider">{t.profile.expert}</span>
            </div>
            <div className="bg-bg-primary rounded-2xl p-4 flex flex-col items-center text-center border border-border-custom/20 shadow-sm">
              <span className="text-accent font-black text-lg mb-1">Mobile</span>
              <span className="text-text-secondary text-[10px] font-semibold uppercase tracking-wider">{t.profile.advanced}</span>
            </div>
          </div>
        </div>

        {/* Contact Links */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-4 text-text-primary">
            <span className="material-symbols-outlined text-accent">connect_without_contact</span>
            <h3 className="font-heading font-bold text-lg">{t.profile.connect}</h3>
          </div>
          <div className="flex flex-col gap-3">
            <a href="mailto:contacto@aescalante.dev" className="flex items-center justify-between bg-bg-secondary/30 border border-border-custom/30 rounded-2xl p-4 active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold text-sm text-text-primary">Email</span>
                  <span className="font-sans text-xs text-text-secondary">contacto@aescalante.dev</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-text-secondary">arrow_forward</span>
            </a>
            
            <a href="https://linkedin.com/in/antoni-escalante" target="_blank" rel="noreferrer" className="flex items-center justify-between bg-bg-secondary/30 border border-border-custom/30 rounded-2xl p-4 active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-bg-primary border border-border-custom/40 flex items-center justify-center text-accent">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold text-sm text-text-primary">LinkedIn</span>
                  <span className="font-sans text-xs text-text-secondary">@antoni-escalante</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-text-secondary">arrow_forward</span>
            </a>

            <a href="https://github.com/aescalantedev" target="_blank" rel="noreferrer" className="flex items-center justify-between bg-bg-secondary/30 border border-border-custom/30 rounded-2xl p-4 active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-bg-primary border border-border-custom/40 flex items-center justify-center text-accent">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold text-sm text-text-primary">GitHub</span>
                  <span className="font-sans text-xs text-text-secondary">@aescalantedev</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-text-secondary">arrow_forward</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Profile;
