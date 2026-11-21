import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { content } from '../components/portfolio/data/content';
import { siteConfig } from '../components/portfolio/data/siteConfig';

export const GET: APIRoute = async () => {
  const projects = content.es.works.projects;
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const categories = content.es.infra.categories;

  const lines: string[] = [
    `# ${siteConfig.author.name} (${siteConfig.author.fullName})`,
    `> ${siteConfig.defaultSeo.description}`,
    '',
    `- Sitio Principal: ${siteConfig.siteUrl}`,
    `- CV Interactivo / PDF: ${siteConfig.siteUrl}/cv`,
    `- Directorio de Ingeniería (Archive): ${siteConfig.siteUrl}/archive`,
    `- Blog Técnico (Manifesto): ${siteConfig.siteUrl}/blog`,
    `- Ubicación: ${siteConfig.author.location}`,
    `- Contacto: ${siteConfig.author.email}`,
    `- GitHub: ${siteConfig.socials.github}`,
    `- LinkedIn: ${siteConfig.socials.linkedin}`,
    '',
    '## Stack Tecnológico',
    ...categories.map((cat) => `- **${cat.name}**: ${cat.tools}`),
    '',
    '## Proyectos Destacados',
    ...projects.map((p) => {
      const externalUrl = p.links?.[0]?.url && p.links[0].url !== '#' ? ` | Demo/Repo: ${p.links[0].url}` : '';
      return `- [${p.title}](${siteConfig.siteUrl}/project/${p.id}): ${p.desc} (Stack: ${p.stack.join(', ')})${externalUrl}`;
    }),
    '',
    '## Artículos de Ingeniería y Arquitectura (Blog)',
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${siteConfig.siteUrl}/blog/${post.id}) (${post.data.lang?.toUpperCase() || 'ES'}): ${post.data.description}`
    ),
    '',
    '## Ecosistema de Subdominios Oficiales',
    `- [Tenyo App (Fitness & Biomecánica Offline Android)](${siteConfig.subdomains.tenyo}): Aplicación nativa Android con Kotlin, Jetpack Compose, Room y mapa muscular Rive 2D interactivo (+1,300 ejercicios).`,
    `- [JRM Flejes (Control de Inventario Industrial)](${siteConfig.subdomains.jrmFlejes}): Sistema web en tiempo real con React, TypeScript, Vite y Supabase para planta de acero.`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
