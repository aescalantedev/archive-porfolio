import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useInView } from '../hooks/useInView';

export const Profile: React.FC = () => {
  const { t } = usePortfolio();
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section ref={ref} className={`border-b border-border-custom px-6 py-20 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 bg-bg-primary transition-all duration-300 anim-reveal${inView ? ' in-view' : ''}`}>
      <div className="lg:col-span-4 font-mono text-xs tracking-widest text-text-secondary pt-2 uppercase">
        // {t.profile.title}
      </div>
      <div className="lg:col-span-8">
        <p className="font-serif text-2xl lg:text-3xl leading-relaxed text-text-primary max-w-3xl">
          {t.profile.body}
        </p>
      </div>
    </section>
  );
};

export default Profile;
