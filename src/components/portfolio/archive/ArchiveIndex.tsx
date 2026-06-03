import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PortfolioProvider, usePortfolio } from '../context/PortfolioContext';
import AmbientBackground from '../layout/AmbientBackground';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer';

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
    fetch(`https://api.github.com/users/AnthonyXJ99/repos?sort=updated&per_page=5&page=${page}`)
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

  // Setup intersection observer to trigger loading next page
  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoading, hasMore]);

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

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden transition-colors duration-300">
      
      {/* Dynamic atmospheric ambient gradients & grid */}
      <AmbientBackground />

      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        
        {/* Persistent Side Navigation */}
        <Sidebar />

        {/* Scrollable Work Archive Layout */}
        <main className="lg:ml-[320px] flex-1 min-w-0 flex flex-col p-6 md:p-12 lg:p-20">
          
          {/* Centered max-width boundary for premium aesthetics */}
          <div className="max-w-5xl w-full mx-auto">
            
            {/* Header section with sharp layout architecture */}
            <div className="mb-12 border-b border-border-custom pb-8 mt-12 lg:mt-0">
              <div className="font-mono text-[10px] tracking-widest text-accent mb-2 uppercase flex items-center gap-3">
                <span>{lang === 'es' ? 'REGISTRO DE INGENIERÍA' : 'ENGINEERING DIRECTORY'}</span>
                {isLoading && (
                  <span className="text-[9px] text-text-secondary animate-pulse normal-case font-medium">
                    {lang === 'es' ? '// Sincronizando repositorios...' : '// Syncing repositories...'}
                  </span>
                )}
              </div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-wide uppercase text-text-primary mb-4">
                {lang === 'es' ? 'Archivo Completo' : 'Complete Archive'}
              </h2>
              <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-2xl">
                {lang === 'es'
                  ? 'Un catálogo exhaustivo e inmutable de todos los proyectos desarrollados, sistemas experimentales, herramientas de línea de comandos y aplicaciones distribuidas creadas a lo largo de los años.'
                  : 'A comprehensive, immutable catalog of all developed systems, experimental setups, command-line interfaces, and distributed applications built across my engineering journey.'}
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

            {/* DESKTOP & TABLET VIEW: Luxurious, perfectly proportioned table layout */}
            <div className="hidden md:block overflow-hidden border border-border-custom bg-bg-secondary/10">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="border-b border-border-custom font-mono text-[10px] tracking-widest text-text-secondary uppercase bg-bg-secondary/30">
                    <th className="py-4 px-5 w-[10%]">{lang === 'es' ? 'AÑO' : 'YEAR'}</th>
                    <th className="py-4 px-5 w-[32%]">{lang === 'es' ? 'PROYECTO' : 'PROJECT'}</th>
                    <th className="py-4 px-5 w-[24%]">{lang === 'es' ? 'CATEGORÍA' : 'CATEGORY'}</th>
                    <th className="py-4 px-5 w-[22%]">{lang === 'es' ? 'TECNOLOGÍAS' : 'BUILT WITH'}</th>
                    <th className="py-4 px-5 text-right w-[12%]">{lang === 'es' ? 'ENLACES' : 'LINKS'}</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-xs divide-y divide-border-custom/40">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                      <tr 
                        key={`${project.title}-${index}`}
                        className="hover:bg-bg-secondary/40 transition-all duration-200 group border-l-2 border-l-transparent hover:border-l-accent"
                      >
                        {/* Year */}
                        <td className="py-6 px-5 font-mono text-accent text-xs font-semibold align-middle">
                          {project.year}
                        </td>

                        {/* Project Title & Subtitle */}
                        <td className="py-6 px-5 align-middle">
                          <div className="font-serif text-[15px] font-semibold text-text-primary group-hover:text-accent transition-colors duration-150">
                            {project.title}
                          </div>
                          <div className="font-mono text-[9px] text-text-secondary tracking-widest uppercase mt-1">
                            {project.role}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-6 px-5 text-text-secondary font-mono text-[10px] tracking-wider align-middle">
                          {project.category}
                        </td>

                        {/* Stack Tags */}
                        <td className="py-6 px-5 align-middle">
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {project.stack.map((tech) => (
                              <span 
                                key={tech}
                                className="font-mono text-[9px] tracking-wider bg-bg-secondary/80 text-text-secondary px-2.5 py-0.5 border border-border-custom/25 rounded-sm hover:border-accent hover:text-text-primary transition-all duration-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Links */}
                        <td className="py-6 px-5 text-right align-middle">
                          <div className="inline-flex justify-end gap-3.5 font-mono text-[10px] tracking-widest">
                            {project.links.map((link) => (
                              <a
                                key={link.label}
                                href={link.url}
                                target={link.url.startsWith('http') ? '_blank' : '_self'}
                                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="text-text-primary hover:text-accent border-b border-transparent hover:border-accent transition-all duration-150 cursor-pointer py-1 inline-flex items-center gap-0.5 font-medium"
                              >
                                {link.label.toUpperCase()} <span className="text-[9px] font-sans">↗</span>
                              </a>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-20 text-center font-mono text-xs text-text-secondary">
                        {lang === 'es' ? 'NINGÚN PROYECTO COINCIDE CON TU BÚSQUEDA' : 'NO PROJECTS MATCHED YOUR FILTER QUERY'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* MOBILE VIEW: Luxurious vertical card-style directory (Under 768px viewports) */}
            <div className="block md:hidden space-y-6">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <div 
                    key={`mob-${project.title}-${index}`}
                    className="border border-border-custom bg-bg-secondary/15 p-5 transition-all duration-200 hover:bg-bg-secondary/35 flex flex-col justify-between relative group border-l-2 border-l-transparent hover:border-l-accent"
                  >
                    {/* Top Row: Year and Category */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="font-mono text-accent text-xs font-semibold">
                        {project.year}
                      </span>
                      <span className="font-mono text-[9px] tracking-widest text-text-secondary uppercase">
                        {project.category}
                      </span>
                    </div>

                    {/* Middle: Title & Role */}
                    <div className="mb-4">
                      <h4 className="font-serif text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-150">
                        {project.title}
                      </h4>
                      <p className="font-mono text-[9px] text-text-secondary tracking-widest uppercase mt-1">
                        {project.role}
                      </p>
                    </div>

                    {/* Technologies pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.stack.map((tech) => (
                        <span 
                          key={`mob-tech-${tech}`}
                          className="font-mono text-[9px] tracking-wider bg-bg-secondary text-text-secondary px-2 py-0.5 border border-border-custom/30 rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links row */}
                    <div className="border-t border-border-custom/30 pt-3 flex justify-end gap-4 font-mono text-[10px] tracking-widest">
                      {project.links.map((link) => (
                        <a
                          key={`mob-link-${link.label}`}
                          href={link.url}
                          target={link.url.startsWith('http') ? '_blank' : '_self'}
                          rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-text-primary hover:text-accent border-b border-transparent hover:border-accent transition-all duration-150 cursor-pointer py-1 inline-flex items-center gap-0.5"
                        >
                          {link.label.toUpperCase()} <span className="text-[9px] font-sans">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center border border-dashed border-border-custom/50 font-mono text-xs text-text-secondary">
                  {lang === 'es' ? 'NINGÚN PROYECTO COINCIDE CON TU BÚSQUEDA' : 'NO PROJECTS MATCHED YOUR FILTER QUERY'}
                </div>
              )}
            </div>

            {/* Sentinel for infinite scroll */}
            <div ref={sentinelRef} className="py-8 mt-4 w-full flex items-center justify-center font-mono text-[9px] tracking-widest text-text-secondary select-none border-t border-border-custom/20">
              {isLoading ? (
                <span className="animate-pulse">
                  {lang === 'es' ? '// CARGANDO MÁS REPOSITORIOS...' : '// LOADING MORE REPOSITORIES...'}
                </span>
              ) : hasMore ? (
                <span className="opacity-60">{lang === 'es' ? '[ DESPLAZAR PARA CARGAR MÁS ]' : '[ SCROLL TO LOAD MORE ]'}</span>
              ) : repos.length > 0 ? (
                <span className="text-accent/50">{lang === 'es' ? '// FIN DEL REGISTRO' : '// END OF DIRECTORY'}</span>
              ) : null}
            </div>

            {/* Footer inside the main flow */}
            <div className="mt-20 border-t border-border-custom pt-8">
              <Footer />
            </div>

          </div>
        </main>
      </div>
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
