import React, { useMemo } from 'react';
import { PortfolioProvider, usePortfolio } from '../context/PortfolioContext';
import AmbientBackground from './AmbientBackground';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface PostData {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
  lang: string;
}

interface BlogIndexProps {
  posts: PostData[];
}

// Inner component which consumes the portfolio context safely
const BlogIndexContent: React.FC<BlogIndexProps> = ({ posts }) => {
  const { lang } = usePortfolio();

  // Filter posts based on the currently active language context
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => post.lang === lang)
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  }, [posts, lang]);

  // Format dates beautifully and deterministically to prevent hydration locale mismatch
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    
    if (lang === 'es') {
      const monthsEs = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
      return `${day} ${monthsEs[date.getUTCMonth()]} ${year}`;
    } else {
      const monthsEn = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      return `${monthsEn[date.getUTCMonth()]} ${day}, ${year}`;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden transition-colors duration-300">
      
      {/* Decorative ambient background overlays */}
      <AmbientBackground />

      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Scrollable Blog Content Flow */}
        <main className="lg:ml-[320px] flex-1 min-w-0 flex flex-col p-6 md:p-12 lg:p-16">
          
          {/* Section Header */}
          <div className="mb-16 border-b border-border-custom pb-8 mt-12 lg:mt-0">
            <div className="font-mono text-[10px] tracking-widest text-accent mb-2 uppercase">
              {lang === 'es' ? 'CONOCIMIENTO Y FILOSOFÍA' : 'KNOWLEDGE & PHILOSOPHY'}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wide uppercase text-text-primary mb-4">
              {lang === 'es' ? 'Manifiesto' : 'Manifesto'}
            </h2>
            <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-2xl">
              {lang === 'es'
                ? 'Ideas escritas sobre el diseño de software limpio, minimalismo sistémico, automatización táctica y disciplina arquitectónica.'
                : 'Written thoughts on clean software boundaries, systemic minimalism, tactical automation, and architectural discipline.'}
            </p>
          </div>

          {/* Posts Feed */}
          <div className="flex-1 max-w-3xl w-full mx-auto space-y-12 mb-16">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <article 
                  key={post.slug}
                  className="group relative border border-border-custom bg-bg-secondary/10 hover:bg-bg-secondary/40 p-6 md:p-8 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Date and language info */}
                    <div className="flex items-center justify-between mb-4">
                      <time 
                        dateTime={post.pubDate} 
                        className="font-mono text-[10px] tracking-widest text-accent"
                      >
                        {formatDate(post.pubDate).toUpperCase()}
                      </time>
                      <span className="font-mono text-[9px] tracking-widest bg-bg-secondary px-2 py-0.5 border border-border-custom/30 text-text-secondary">
                        {post.lang.toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl md:text-3xl tracking-wide text-text-primary group-hover:text-accent transition-colors duration-200 mb-3">
                      <a href={`/blog/${post.slug}`} className="cursor-pointer focus:outline-none">
                        {post.title}
                      </a>
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-xs md:text-sm text-text-secondary leading-relaxed mb-6">
                      {post.description}
                    </p>
                  </div>

                  {/* Footer metadata */}
                  <div className="flex flex-wrap items-center justify-between border-t border-border-custom/50 pt-4 mt-4 gap-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="font-mono text-[8px] md:text-[9px] tracking-wider text-text-secondary bg-bg-secondary/80 px-2 py-0.5 border border-border-custom/25 rounded-sm"
                        >
                          #{tag.toUpperCase()}
                        </span>
                      ))}
                    </div>

                    {/* Action button */}
                    <a
                      href={`/blog/${post.slug}`}
                      className="font-mono text-[10px] tracking-widest text-text-primary hover:text-accent flex items-center gap-1.5 transition-all duration-200 group-hover:translate-x-1 cursor-pointer"
                    >
                      {lang === 'es' ? 'LEER DOCUMENTO' : 'READ DOCUMENT'}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-16 border border-border-custom/50 border-dashed">
                <p className="font-mono text-xs text-text-secondary uppercase tracking-widest">
                  {lang === 'es' 
                    ? 'No se encontraron artículos en este idioma.' 
                    : 'No articles written in this language yet.'}
                </p>
              </div>
            )}
          </div>

          {/* Footer in flow */}
          <div className="mt-auto border-t border-border-custom pt-8">
            <Footer />
          </div>

        </main>
      </div>
    </div>
  );
};

// Exported outer component wrapping the content inside the Context Provider to ensure single island execution
export const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  return (
    <PortfolioProvider>
      <BlogIndexContent posts={posts} />
    </PortfolioProvider>
  );
};

export default BlogIndex;
