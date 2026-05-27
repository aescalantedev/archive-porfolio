import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useInView } from '../hooks/useInView';
import { DashboardMockup, TerminalMockup, MobileMockup, AndroidMockup } from './Mockups';

const ProjectCard: React.FC<{ index: number; children: React.ReactNode }> = ({ index, children }) => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={`anim-reveal${inView ? ' in-view' : ''}`} style={{ transitionDelay: `${index * 100}ms` }}>
      {children}
    </div>
  );
};

export const Works: React.FC = () => {
  const { t } = usePortfolio();

  return (
    <section id="works" className="px-6 py-20 lg:px-16 bg-bg-primary transition-all duration-300">
      <div className="max-w-3xl mb-24">
        <h2 className="font-serif text-4xl lg:text-5xl mb-6 text-text-primary">{t.works.title}</h2>
        <p className="font-sans text-text-secondary leading-relaxed text-sm">
          {t.works.subtitle}
        </p>
      </div>

      <div className="space-y-32">
        {t.works.projects.map((project, index) => (
          <ProjectCard key={project.id} index={index}>
            <article 
              className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-16 border-t border-border-custom pt-16 first:border-t-0 first:pt-0"
            >
            
            {/* Meta Column (Archival record info) */}
            <div className="xl:col-span-3 font-mono text-[10px] tracking-widest text-text-secondary uppercase">
              <div className="sticky top-12 space-y-8">
                <div>
                  <span className="text-accent font-semibold">{project.id}</span> — {project.title}
                </div>

                {project.role && (
                  <div>
                    <p className="mb-2 text-text-primary border-b border-border-custom pb-1 inline-block font-semibold">ROLE</p>
                    <p className="mt-2 text-text-secondary">{project.role}</p>
                  </div>
                )}
                
                {project.deployment && (
                  <div>
                    <p className="mb-2 text-text-primary border-b border-border-custom pb-1 inline-block font-semibold">DEPLOYMENT</p>
                    <p className="mt-2 leading-relaxed text-text-secondary">{project.deployment}</p>
                  </div>
                )}

                {project.challenges && (
                  <div className="max-w-[200px]">
                    <p className="mb-2 text-text-primary border-b border-border-custom pb-1 inline-block font-semibold">NOTES</p>
                    <p className="mt-2 leading-relaxed text-[10px] normal-case font-sans text-text-secondary">{project.challenges}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Content & Visual Mockup Column */}
            <div className="xl:col-span-9">
              <h3 className="font-serif text-3xl lg:text-4xl mb-6 text-text-primary">{project.title}</h3>
              <p className="font-sans text-text-secondary text-sm leading-relaxed max-w-2xl mb-8">
                {project.desc}
              </p>

              {/* Tech Stack Tags */}
              {project.platforms ? (
                <div className="space-y-4 mb-8">
                  {project.platforms.map((platform) => (
                    <div key={platform.label}>
                      <span className="font-mono text-[9px] tracking-widest text-accent uppercase mr-3">{platform.label}</span>
                      <div className="inline-flex flex-wrap gap-2 mt-1 font-mono text-[10px] uppercase tracking-wider">
                        {platform.stack.map(tech => (
                          <span key={tech} className="bg-bg-secondary px-3 py-1.5 border border-border-custom text-text-primary transition-colors duration-200 hover:border-accent">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 mb-8 font-mono text-[10px] uppercase tracking-wider">
                  {project.stack.map(tech => (
                    <span key={tech} className="bg-bg-secondary px-3 py-1.5 border border-border-custom text-text-primary transition-colors duration-200 hover:border-accent">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Responsive SVG Mockup Grid */}
              <div className="w-full bg-bg-secondary border border-border-custom p-4 mb-8 transition-colors duration-300">
                {project.platforms ? (
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none">
                    {project.platforms.map((platform) => (
                      <div key={platform.label} className="snap-center shrink-0 w-full">
                        {platform.mockup === 'dashboard' && <DashboardMockup />}
                        {platform.mockup === 'terminal' && <TerminalMockup />}
                        {platform.mockup === 'mobile' && <MobileMockup />}
                        {platform.mockup === 'android' && <AndroidMockup />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full aspect-[16/10] flex items-center justify-center overflow-hidden">
                    {index === 1 && <DashboardMockup />}
                    {index === 2 && <TerminalMockup />}
                    {index === 3 && <MobileMockup />}
                  </div>
                )}
              </div>

              {/* Action Anchors */}
              <div className="flex flex-wrap gap-4 font-mono text-[10px] tracking-widest uppercase mb-4">
                {(project.platforms ? project.platforms.flatMap(p => p.links || []) : project.links)
                .map((link, idx) => (
                  <a 
                    key={`${link.label}-${idx}`} 
                    href={link.url} 
                    className={`px-6 py-3 transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                      idx === 0 
                        ? "bg-text-primary text-bg-primary border border-text-primary hover:bg-accent hover:border-accent" 
                        : "border border-border-custom hover:bg-bg-secondary text-text-primary hover:border-accent"
                    }`}
                  >
                    {link.label} <span className="text-[14px]">↗</span>
                  </a>
                ))}
              </div>

            </div>
          </article>
          </ProjectCard>
        ))}
      </div>
    </section>
  );
};

export default Works;
