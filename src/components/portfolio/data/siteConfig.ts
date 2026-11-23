import type { Project } from './content';

export const siteConfig = {
  siteUrl: 'https://aescalante.dev',
  siteName: 'Antoni Escalante // Full-Stack & Mobile Engineer',
  author: {
    name: 'Antoni Escalante',
    fullName: 'Juan Antoni Escalante Ramos',
    jobTitle: 'Full-Stack & Mobile Engineer',
    email: 'contacto@aescalante.dev',
    phone: '+51910836088',
    location: 'Lima, Perú',
    url: 'https://aescalante.dev',
  },
  defaultSeo: {
    title: 'Antoni Escalante // Desarrollador Full Stack & Mobile',
    description:
      'Desarrollador Full Stack y Mobile (+5 años exp.) especializado en aplicaciones web (React, Next.js, Angular, Astro, SAPUI5), móviles (Kotlin, Jetpack Compose, Flutter), escritorio (Rust, Tauri) e integraciones con ERPs y bases de datos (C#, ASP.NET, Python, PostgreSQL, SQL Server).',
    ogImage: 'https://aescalante.dev/og-image.png',
    locale: 'es_PE',
    keywords: [
      'Antoni Escalante',
      'Desarrollador Full Stack',
      'Mobile Developer',
      'Kotlin',
      'Jetpack Compose',
      'Flutter',
      'React',
      'Next.js',
      'TypeScript',
      'Rust',
      'Tauri',
      'SAPUI5',
      'SAP Business One',
      'ASP.NET',
      'PostgreSQL',
      'SQL Server',
      'Lima Perú',
    ],
  },
  socials: {
    github: 'https://github.com/aescalantedev',
    linkedin: 'https://www.linkedin.com/in/aescalantedev/',
    instagram: 'https://instagram.com/a_nthony.r',
    email: 'mailto:contacto@aescalante.dev',
  },
  subdomains: {
    tenyo: 'https://tenyo.aescalante.dev',
    jrmFlejes: 'https://frm-flejes.aescalante.dev',
  },
  knowsAbout: [
    'Kotlin',
    'Jetpack Compose',
    'Android Development',
    'Flutter',
    'Dart',
    'React',
    'Next.js',
    'Angular',
    'Astro',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Rust',
    'Tauri v2',
    'SAPUI5 / OpenUI5',
    'OData v4 / SAP Business One',
    'ASP.NET Core / C#',
    'Python',
    'Node.js',
    'PostgreSQL',
    'SQL Server',
    'Supabase',
    'Docker',
    'System Architecture',
  ],
} as const;

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.siteUrl}/#person`,
    name: siteConfig.author.name,
    alternateName: siteConfig.author.fullName,
    url: siteConfig.siteUrl,
    email: siteConfig.author.email,
    jobTitle: siteConfig.author.jobTitle,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lima',
      addressCountry: 'PE',
    },
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.instagram,
    ],
    knowsAbout: [...siteConfig.knowsAbout],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}/#website`,
    url: siteConfig.siteUrl,
    name: siteConfig.siteName,
    description: siteConfig.defaultSeo.description,
    inLanguage: ['es', 'en'],
    author: {
      '@id': `${siteConfig.siteUrl}/#person`,
    },
  };
}

export function getProjectSchema(project: Project) {
  const projectUrl = `${siteConfig.siteUrl}/project/${project.id}`;
  const rawImage = project.image || project.platforms?.[0]?.image || '/og-image.png';
  const imageUrl = rawImage.startsWith('http') ? rawImage : `${siteConfig.siteUrl}${rawImage}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.desc,
    url: projectUrl,
    image: imageUrl,
    programmingLanguage: project.stack,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.siteUrl,
    },
    ...(project.links?.[0]?.url && project.links[0].url !== '#'
      ? { mainEntityOfPage: project.links[0].url }
      : {}),
  };
}

export function getBlogPostingSchema(post: {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
  lang?: string;
}) {
  const postUrl = `${siteConfig.siteUrl}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: postUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    datePublished: post.pubDate,
    dateModified: post.pubDate,
    inLanguage: post.lang || 'es',
    keywords: post.tags.join(', '),
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.siteUrl,
    },
  };
}
