import React from 'react';
import { PortfolioProvider, usePortfolio } from '../context/PortfolioContext';
import AmbientBackground from '../layout/AmbientBackground';
import BackgroundCanvas from '../layout/BackgroundCanvas';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useLenis } from '../hooks/useLenis';

interface BlogPostLayoutProps {
  children: React.ReactNode;
  pubDate: string;
  title: string;
  description: string;
  tags: string[];
}

const BlogPostLayoutContent: React.FC<BlogPostLayoutProps> = ({
  children,
  pubDate,
  title,
  description,
  tags,
}) => {
  const { lang } = usePortfolio();

  // Initialize Lenis smooth scroll
  useLenis();

  // Format dates beautifully and deterministically to prevent hydration locale mismatch
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    
    if (lang === 'es') {
      const monthsEs = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      return `${day} de ${monthsEs[date.getUTCMonth()]} de ${year}`;
    } else {
      const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return `${monthsEn[date.getUTCMonth()]} ${day}, ${year}`;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden transition-colors duration-300 flex flex-col">
      
      {/* Fullscreen 3D WebGL Canvas Background */}
      <BackgroundCanvas />

      {/* Decorative ambient background overlays */}
      <AmbientBackground />

      {/* Sticky Header Navigation */}
      <Header />

      {/* Scrollable post content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 relative z-10 flex flex-col">
        
        <article className="max-w-3xl w-full mx-auto mt-12 lg:mt-0 mb-16 flex-1 bg-bg-secondary/20 border border-border-custom/50 rounded-xl p-6 md:p-10 shadow-xl glass-panel">
          
          {/* Back to Blog Anchor */}
          <div className="mb-10">
            <a 
              href="/blog" 
              className="font-mono text-[10px] tracking-widest text-text-secondary hover:text-accent inline-flex items-center gap-1.5 transition-colors cursor-pointer group font-semibold"
            >
              <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {lang === 'es' ? 'REGRESAR AL MANIFIESTO' : 'BACK TO MANIFESTO'}
            </a>
          </div>

          {/* Post Header */}
          <header className="mb-10 border-b border-border-custom/30 pb-8">
            <div className="flex items-center justify-between mb-4">
              <time 
                dateTime={pubDate} 
                className="font-mono text-[10px] tracking-widest text-accent font-semibold"
              >
                {formatDate(pubDate).toUpperCase()}
              </time>
              <span className="font-mono text-[9px] tracking-widest bg-bg-secondary px-2.5 py-0.5 border border-border-custom/30 text-text-secondary rounded-sm">
                {lang.toUpperCase()}
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase text-text-primary mb-6 leading-tight">
              {title}
            </h1>
            <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed font-light italic">
              {description}
            </p>
          </header>

          {/* Post Content Slot */}
          <div className="prose-custom">
            {children}
          </div>

          {/* Meta Tags Footer */}
          <footer className="mt-16 border-t border-border-custom/30 pt-8">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-mono text-[9px] tracking-wider text-accent mr-2 font-bold">
                {lang === 'es' ? 'ETIQUETAS:' : 'TAGS:'}
              </span>
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="font-mono text-[9px] tracking-wider bg-bg-secondary text-text-secondary px-2.5 py-0.5 border border-border-custom/30 rounded-sm"
                >
                  #{tag.toUpperCase()}
                </span>
              ))}
            </div>
          </footer>

        </article>

        {/* Footer in flow */}
        <div className="border-t border-border-custom/30 pt-8 mt-auto">
          <Footer />
        </div>

      </main>
    </div>
  );
};

// Exported outer component wrapping the content inside the Context Provider to ensure single island execution
export const BlogPostLayout: React.FC<BlogPostLayoutProps> = (props) => {
  return (
    <PortfolioProvider>
      <BlogPostLayoutContent {...props} />
    </PortfolioProvider>
  );
};

export default BlogPostLayout;
