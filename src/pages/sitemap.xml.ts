import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { content } from '../components/portfolio/data/content';
import { siteConfig } from '../components/portfolio/data/siteConfig';

export const GET: APIRoute = async () => {
  const baseUrl = siteConfig.siteUrl;
  const today = new Date().toISOString().split('T')[0];

  const projects = content.es.works.projects;
  const blogPosts = await getCollection('blog', ({ data }) => !data.draft);

  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: today },
    { path: '/cv', priority: '0.9', changefreq: 'monthly', lastmod: today },
    { path: '/archive', priority: '0.8', changefreq: 'weekly', lastmod: today },
    { path: '/blog', priority: '0.8', changefreq: 'weekly', lastmod: today },
  ];

  const projectRoutes = projects.map((project) => ({
    path: `/project/${project.id}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: today,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blog/${post.id}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: post.data.pubDate.toISOString().split('T')[0],
  }));

  const allRoutes = [...staticRoutes, ...projectRoutes, ...blogRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
