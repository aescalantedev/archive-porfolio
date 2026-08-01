import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PortfolioProvider, usePortfolio } from '../context/PortfolioContext';
import AmbientBackground from '../layout/AmbientBackground';
import BackgroundCanvas from '../layout/BackgroundCanvas';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useLenis } from '../hooks/useLenis';

interface ArchiveProject {
  year: string;
  title: string;
  category: string;
  stack: string[];
  role: string;
  links: { label: string; url: string }[];
}

// Inner component which consumes the portfolio context safely
const ArchiveIndexContent: React.FC = () => {
  const { lang } = usePortfolio();
  useLenis(); // Activate smooth scroll
  const [searchQuery, setSearchQuery] = useState('');
  const [repos, setRepos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Fetch public repositories dynamically when page changes
  useEffect(() => {
    if (!hasMore) return;

    setIsLoading(true);
    fetch(`https://api.github.com/users/aescalantedev/repos?sort=updated&per_page=5&page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          setHasMore(false);
          setIsLoading(false);
          return;
        }

        if (data.length < 5) {
          setHasMore(false);
        }

        setRepos((prev) => {
          const existingIds = new Set(prev.map(r => r.id));
          const newRepos = data.filter(r => !existingIds.has(r.id));
          return [...prev, ...newRepos];
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch GitHub repositories:', err);
        setHasMore(false);
        setIsLoading(false);
      });
  }, [page]);

  // Structured multi-lingual list of static Play Store mobile apps
  const staticProjects = useMemo<ArchiveProject[]>(() => {
    if (lang === 'es') {
      return [
        {
          year: "2025",
          title: "B1 Route",
          category: "Logística y Transporte",
          role: "Arquitecto Principal — Web y Móvil",
          stack: ["SAPUI5", "OpenUI5", "Fiori 3", "Kotlin", "Jetpack Compose M3", "Mapbox GL JS"],
          links: [{ label: "Caso de Estudio", url: "/#works" }]
        },
        {
          year: "2024",
          title: "Arcons Billetera",
          category: "Fintech Móvil",
          role: "Ingeniero Flutter",
          stack: ["Flutter", "Dart", "SQLite", "Firebase"],
          links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=arcons.billetera.app" }]
        },
        {
          year: "2023",
          title: "Colegio Contabilidad",
          category: "EdTech Móvil",
          role: "Ingeniero Móvil",
          stack: ["Flutter", "SQLite", "Node.js"],
          links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.colegiocontabilidad" }]
        },
        {
          year: "2023",
          title: "Arcons App (Portal Principal)",
          category: "Portal Móvil",
          role: "Desarrollador Flutter",
          stack: ["Flutter", "Dart", "APIs REST"],
          links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.app.app_arcons" }]
        },
        {
          year: "2023",
          title: "Arcons Company",
          category: "Herramienta Corporativa",
          role: "Desarrollador Flutter",
          stack: ["Flutter", "Dart", "Sincronización"],
          links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.company" }]
        }
      ];
    } else {
      // Default English
      return [
        {
          year: "2025",
          title: "B1 Route",
          category: "Enterprise Logistics",
          role: "Lead Architect — Web & Mobile",
          stack: ["SAPUI5", "OpenUI5", "Fiori 3", "Kotlin", "Jetpack Compose M3", "Mapbox GL JS"],
          links: [{ label: "Case Study", url: "/#works" }]
        },
        {
          year: "2024",
          title: "Arcons Billetera",
          category: "Mobile Fintech",
          role: "Flutter Engineer",
          stack: ["Flutter", "Dart", "SQLite", "Firebase"],
          links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=arcons.billetera.app" }]
        },
        {
          year: "2023",
          title: "Colegio Contabilidad",
          category: "Mobile EdTech",
          role: "Mobile Engineer",
          stack: ["Flutter", "SQLite", "Node.js"],
          links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.colegiocontabilidad" }]
        },
        {
          year: "2023",
          title: "Arcons App (Main Portal)",
          category: "Mobile Portal",
          role: "Flutter Developer",
          stack: ["Flutter", "Dart", "REST APIs"],
          links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.app.app_arcons" }]
        },
        {
          year: "2023",
          title: "Arcons Company",
          category: "Enterprise Mobile Tool",
          role: "Flutter Developer",
          stack: ["Flutter", "Dart", "Synchronization"],
          links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.company" }]
        }
      ];
    }
  }, [lang]);

  // Map and sort all projects by year (descending), filtering duplicates
  const allProjects = useMemo<ArchiveProject[]>(() => {
    const staticUrls = new Set(
      staticProjects.flatMap((p) => p.links.map((l) => l.url.toLowerCase()))
    );

    const mappedRepos: ArchiveProject[] = repos
      .filter((repo) => {
        const url = repo.html_url?.toLowerCase() || '';
        return !staticUrls.has(url);
      })
      .map((repo) => {
        const stack: string[] = [];
        if (repo.language) stack.push(repo.language);
        if (repo.topics && Array.isArray(repo.topics)) {
          repo.topics.forEach((topic: string) => {
            if (!stack.includes(topic)) stack.push(topic);
          });
        }

        const links = [{ label: 'GitHub', url: repo.html_url }];
        if (repo.homepage) {
          links.push({ label: lang === 'es' ? 'Web' : 'Web', url: repo.homepage });
        }

        return {
          year: repo.created_at ? repo.created_at.substring(0, 4) : new Date().getFullYear().toString(),
          title: repo.name,
          category: lang === 'es' ? 'Repositorio Público' : 'Public Repository',
          role: repo.description || (lang === 'es' ? 'Repositorio de GitHub' : 'GitHub Repository'),
          stack: stack.length > 0 ? stack : ['Repository'],
          links: links
        };
      });

    const merged = [...staticProjects, ...mappedRepos];
    return merged.sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA;
    });
  }, [lang, staticProjects, repos]);

  // Filtering based on search queries
  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return allProjects;
    return allProjects.filter((project) => {
      return (
        project.title.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.role.toLowerCase().includes(query) ||
        project.stack.some((tech) => tech.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, allProjects]);

  // Force Lenis to recalculate scroll bounds when content changes (e.g., after loading more repos)
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).lenis) {
      // Small timeout to allow DOM to render the new elements before recalculating height
      const timeoutId = setTimeout(() => {
        (window as any).lenis.resize();
      }, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [filteredProjects, page]);

  return (
    <div className="relative w-full transition-colors duration-300 flex flex-col min-h-screen">
      
      {/* Fullscreen 3D WebGL Canvas Background */}
      <BackgroundCanvas />

      {/* Dynamic atmospheric ambient gradients & grid */}
      <AmbientBackground />

      {/* Sticky Header Navigation */}
      <Header />

      {/* Scrollable Work Archive Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 relative z-10 flex flex-col">
        
        {/* Centered max-width boundary for premium aesthetics */}
        <div className="max-w-5xl w-full mx-auto">
            
            {/* Header section */}
            <div className="mb-12 border-b border-border-custom/30 pb-8 mt-12 lg:mt-0">
              <div className="font-mono text-[9px] tracking-[0.25em] text-accent mb-2 uppercase font-bold flex items-center gap-3">
                <span>{lang === 'es' ? 'REGISTRO DE INGENIERÍA' : 'ENGINEERING DIRECTORY'}</span>
                {isLoading && (
                  <span className="text-[9px] text-text-secondary/60 animate-pulse normal-case font-normal">
                    {lang === 'es' ? 'Sincronizando repositorios...' : 'Syncing repositories...'}
                  </span>
                )}
              </div>
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight uppercase text-text-primary mb-4">
                {lang === 'es' ? 'Historial Completo' : 'Complete Archive'}
              </h2>
              <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-2xl">
                {lang === 'es'
                  ? 'Un catálogo de todos los proyectos desarrollados, sistemas, herramientas y aplicaciones creadas a lo largo de los años.'
                  : 'A complete catalog of all developed systems, command-line tools, and distributed applications built across my engineering journey.'}
              </p>
            </div>

            {/* Search bar layout block */}
            <div className="mb-10 max-w-md relative group">
              {/* Perfectly vertically centered search magnifying glass icon using absolute positioning */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                <svg 
                  className="w-4 h-4 transition-colors group-focus-within:text-accent" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={lang === 'es' ? 'Filtrar por proyecto, tecnología o rol...' : 'Filter by project, tech, or role...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg-secondary/70 text-text-primary placeholder:text-text-secondary/50 text-xs font-mono tracking-wider border border-border-custom focus:border-accent py-4 pl-12 pr-10 outline-none transition-all rounded-none cursor-text focus:ring-1 focus:ring-accent"
                aria-label="Search filter input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer p-1"
                  title="Clear search query"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* UNIFIED GALLERY VIEW: Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => {
                  const primaryUrl = project.links[0]?.url || '#';
                  return (
                    <div 
                      key={`grid-${project.title}-${index}`}
                      className="group relative bg-bg-secondary/20 hover:bg-bg-secondary/40 p-6 rounded-2xl border border-border-custom/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg shadow-black/20 hover:-translate-y-1 flex flex-col justify-between h-full"
                    >
                      {/* Subtle hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      {/* Invisible absolute link for entire card */}
                      <a href={primaryUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0 cursor-pointer" aria-label={`Ver ${project.title}`}></a>

                      <div>
                        {/* Header row: Year & Category */}
                        <div className="flex items-center justify-between mb-5 relative z-10 pointer-events-none">
                          <span className="font-mono text-accent text-xs font-bold bg-accent/10 px-3 py-1 rounded-md border border-accent/20">
                            {project.year}
                          </span>
                          <span className="font-mono text-[10px] tracking-widest text-text-secondary/70 uppercase">
                            {project.category}
                          </span>
                        </div>

                        {/* Main Info */}
                        <div className="mb-6 relative z-10 pointer-events-none">
                          <h4 className="font-serif text-xl md:text-2xl font-bold text-text-primary/95 group-hover:text-accent transition-colors duration-200">
                            {project.title}
                          </h4>
                          <p className="font-mono text-[11px] tracking-widest uppercase text-text-secondary mt-2.5 leading-relaxed">
                            {project.role}
                          </p>
                        </div>

                        {/* Stack */}
                        <div className="flex flex-wrap gap-2 relative z-10 pointer-events-none mb-6">
                          {project.stack.map((tech) => (
                            <span 
                              key={`grid-tech-${tech}`}
                              className="font-mono text-[10px] tracking-wider bg-bg-primary text-text-secondary/90 px-3 py-1.5 rounded-full border border-border-custom/60 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-text-primary transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button Footer */}
                      <div className="pt-4 border-t border-border-custom/30 mt-auto relative z-10 pointer-events-auto">
                        <div className="flex flex-wrap gap-3">
                          {project.links.map((link) => (
                            <a
                              key={`grid-link-${link.label}`}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-bg-primary/80 hover:bg-accent hover:text-bg-primary text-text-primary text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-lg border border-border-custom/60 hover:border-accent transition-all duration-300"
                              title={link.label}
                            >
                              {link.label.toLowerCase().includes('github') ? (
                                <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                              ) : link.label.toLowerCase().includes('play store') ? (
                                <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5z"></path><path d="M8 7v10l8-5-8-5z"></path></svg>
                              ) : (
                                <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                              )}
                              <span>{link.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-24 text-center rounded-2xl border border-dashed border-border-custom/50 font-mono text-sm text-text-secondary bg-bg-secondary/10">
                  {lang === 'es' ? 'NINGÚN PROYECTO COINCIDE CON TU BÚSQUEDA' : 'NO MATCHING PROJECTS'}
                </div>
              )}
            </div>

            {/* Load More Button instead of infinite scroll */}
            <div className="py-10 mt-6 w-full flex items-center justify-center border-t border-border-custom/20">
              {isLoading ? (
                <span className="animate-pulse font-mono text-xs tracking-widest text-text-secondary uppercase">
                  {lang === 'es' ? 'Cargando repositorios...' : 'Loading repositories...'}
                </span>
              ) : hasMore ? (
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="font-mono text-xs tracking-widest text-text-primary uppercase bg-bg-secondary/50 hover:bg-accent/10 border border-border-custom/50 hover:border-accent px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                >
                  {lang === 'es' ? 'Cargar Más Proyectos' : 'Load More Projects'}
                  <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
              ) : repos.length > 0 ? (
                <span className="font-mono text-xs tracking-widest text-accent/40 uppercase">
                  {lang === 'es' ? 'FIN DEL HISTORIAL' : 'END OF ARCHIVE'}
                </span>
              ) : null}
            </div>

            {/* Footer inside the main flow */}
            <div className="mt-20 border-t border-border-custom pt-8">
              <Footer />
            </div>

          </div>
        </main>
      </div>
  );
};

// Exported outer component wrapping the content inside the Context Provider to ensure single island execution
export const ArchiveIndex: React.FC = () => {
  return (
    <PortfolioProvider>
      <ArchiveIndexContent />
    </PortfolioProvider>
  );
};

export default ArchiveIndex;
