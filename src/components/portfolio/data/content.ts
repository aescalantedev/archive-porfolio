export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  desc: string;
  stack: string[];
  role?: string;
  challenges?: string;
  deployment?: string;
  links: ProjectLink[];
}

export interface InfraCategory {
  name: string;
  tools: string;
}

export interface TranslationDictionary {
  sidebar: {
    index: string;
    projects: string;
    archive: string;
    infrastructure: string;
    manifesto: string;
    operator: string;
    status: string;
    region: string;
    build: string;
    theme_light: string;
    theme_dark: string;
    lang_en: string;
    lang_es: string;
  };
  hero: {
    title: string;
    subtitle: string;
    btn_projects: string;
    btn_arch: string;
  };
  profile: {
    title: string;
    body: string;
  };
  works: {
    title: string;
    subtitle: string;
    projects: Project[];
  };
  infra: {
    title: string;
    categories: InfraCategory[];
  };
  contact: {
    text: string;
    email: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
}

export const content: Record<'en' | 'es', TranslationDictionary> = {
  en: {
    sidebar: {
      index: "[01] INDEX",
      projects: "[02] PROJECTS",
      archive: "[03] ARCHIVE",
      infrastructure: "[04] TECH STACK",
      manifesto: "[05] MANIFESTO",
      operator: "OPR: ANTHONY ESCALANTE",
      status: "STATUS: ACTIVE",
      region: "REGION: LATAM",
      build: "BUILD: v2.4",
      theme_light: "THEME: LIGHT",
      theme_dark: "THEME: DARK",
      lang_en: "EN",
      lang_es: "ES"
    },
    hero: {
      title: "ENGINEERING SCALABLE SOFTWARE ARCHITECTURES.",
      subtitle: "FULL-STACK SYSTEMS // MOBILE APPLICATIONS // SCALABLE APIS // ENTERPRISE INTERFACES",
      btn_projects: "EXPLORE PROJECTS",
      btn_arch: "VIEW ARCHITECTURES"
    },
    profile: {
      title: "EXECUTIVE PROFILE : A. ESCALANTE",
      body: "Specialized in end-to-end software solutions. From scalable backend systems and relational databases to production-ready mobile applications and enterprise-grade interfaces. Prioritizing complex logic, operational efficiency, and minimalist presentation."
    },
    works: {
      title: "Selected Works Case Studies.",
      subtitle: "Present projects as curated museum-grade entries. An archive of technical architecture and interface design, demonstrating a synthesis of complex logic and minimalist presentation.",
      projects: [
        {
          id: "01",
          title: "B1 Route",
          desc: "Enterprise logistics and tracking system built with SAPUI5/OpenUI5. Designed for large-scale fleet management, offering real-time delivery tracking and comprehensive operational dashboards. The architecture prioritizes data density and rapid decision-making in high-pressure environments.",
          stack: ["SAPUI5", "OpenUI5", "OData"],
          role: "Lead Frontend Architect",
          challenges: "Real-time data synchronization across thousands of endpoints with minimal latency. Handling complex role-based access control within legacy SAP environments.",
          links: [{ label: "Live View", url: "#" }, { label: "GitHub", url: "#" }]
        },
        {
          id: "02",
          title: "StrixUI",
          desc: "A modern Next.js dashboard ecosystem designed for maximum extensibility. It abstracts complex layout logic into reusable primitives, allowing for rapid iteration of data-heavy administrative interfaces. The visual language is strictly utilitarian.",
          stack: ["Next.js", "React", "Tailwind CSS"],
          deployment: "Vercel Edge Network",
          links: [{ label: "GitHub", url: "https://github.com/AnthonyXJ99/strixui" }]
        },
        {
          id: "03",
          title: "Player CLI",
          desc: "A pure Python-based media player utility executed entirely within the command line interface. It strips away visual bloat, providing immediate, scriptable access to media libraries. Designed for developers who prefer keyboard-driven environments.",
          stack: ["Python", "FFmpeg", "Curses"],
          challenges: "Managing async subprocesses for audio playback without blocking the main Curses UI thread. Efficient directory traversal for huge media libraries.",
          links: [{ label: "GitHub", url: "https://github.com/AnthonyXJ99/player_cli" }]
        },
        {
          id: "04",
          title: "App Ecology",
          desc: "A suite of elegant mobile applications deployed to the Play Store, including Arcons Billetera and Colegio Contabilidad. The design language emphasizes high legibility, tactile micro-interactions, and robust state management for financial tools.",
          stack: ["Flutter", "Kotlin", "SQLite"],
          deployment: "Google Play Store, AWS Mobile Services",
          links: [{ label: "Play Store", url: "#" }]
        }
      ]
    },
    infra: {
      title: "TECH STACK",
      categories: [
        { name: "Frontend Systems", tools: "Astro, Next.js, React, SAPUI5, OpenUI5" },
        { name: "Backend Architecture", tools: "ASP.NET, Python, Node.js" },
        { name: "Mobile Engineering", tools: "Flutter, Kotlin, Jetpack Compose" },
        { name: "Databases & Infra", tools: "PostgreSQL, Docker, OData v4" }
      ]
    },
    contact: {
      text: "Currently available for engineering collaborations and selected software projects.",
      email: "EMAIL",
      github: "GITHUB",
      linkedin: "LINKEDIN",
      instagram: "INSTAGRAM"
    }
  },
  es: {
    sidebar: {
      index: "[01] ÍNDICE",
      projects: "[02] PROYECTOS",
      archive: "[03] ARCHIVO",
      infrastructure: "[04] STACK TÉCNICO",
      manifesto: "[05] MANIFIESTO",
      operator: "OPR: ANTHONY ESCALANTE",
      status: "ESTADO: ACTIVO",
      region: "REGIÓN: LATAM",
      build: "COMPILACIÓN: v2.4",
      theme_light: "TEMA: CLARO",
      theme_dark: "TEMA: OSCURO",
      lang_en: "EN",
      lang_es: "ES"
    },
    hero: {
      title: "INGENIERÍA DE ARQUITECTURAS DE SOFTWARE ESCALABLES.",
      subtitle: "SISTEMAS FULL-STACK // APLICACIONES MÓVILES // APIS ESCALABLES // INTERFACES EMPRESARIALES",
      btn_projects: "EXPLORAR PROYECTOS",
      btn_arch: "VER ARQUITECTURAS"
    },
    profile: {
      title: "PERFIL EJECUTIVO : A. ESCALANTE",
      body: "Especializado en soluciones de software de extremo a extremo. Desde sistemas backend escalables y bases de datos relacionales, hasta aplicaciones móviles listas para producción e interfaces de nivel empresarial. Priorizando la lógica compleja, eficiencia operativa y presentación minimalista."
    },
    works: {
      title: "Casos de Estudio Seleccionados.",
      subtitle: "Proyectos presentados como entradas de archivo curadas. Un registro de arquitectura técnica y diseño de interfaces, demostrando una síntesis de lógica compleja y presentación minimalista.",
      projects: [
        {
          id: "01",
          title: "B1 Route",
          desc: "Plataforma de logística y rastreo empresarial construida con SAPUI5/OpenUI5. Diseñada para la gestión de flotas a gran escala, ofreciendo seguimiento de entregas en tiempo real y paneles operativos integrales. La arquitectura prioriza la densidad de datos y la toma de decisiones rápida.",
          stack: ["SAPUI5", "OpenUI5", "OData"],
          role: "Arquitecto Frontend Principal",
          challenges: "Sincronización de datos en tiempo real a través de miles de puntos finales con latencia mínima. Manejo de control de acceso basado en roles complejos en entornos SAP heredados.",
          links: [{ label: "Ver en vivo", url: "#" }, { label: "GitHub", url: "#" }]
        },
        {
          id: "02",
          title: "StrixUI",
          desc: "Un ecosistema moderno de paneles de control en Next.js diseñado para máxima extensibility. Abstrae la lógica de diseño compleja en primitivas reutilizables, permitiendo iteración rápida de interfaces administrativas pesadas. El lenguaje visual es estrictamente utilitario.",
          stack: ["Next.js", "React", "Tailwind CSS"],
          deployment: "Vercel Edge Network",
          links: [{ label: "GitHub", url: "https://github.com/AnthonyXJ99/strixui" }]
        },
        {
          id: "03",
          title: "Player CLI",
          desc: "Utilidad de reproducción de medios en Python ejecutada completamente en la línea de comandos. Elimina la sobrecarga visual, proporcionando acceso inmediato y programable a bibliotecas de medios. Diseñado para desarrolladores que prefieren entornos controlados por teclado.",
          stack: ["Python", "FFmpeg", "Curses"],
          challenges: "Gestión de subprocesos asíncronos para reproducción de audio sin bloquear el hilo principal de la UI. Recorrido eficiente de directorios para bibliotecas multimedia masivas.",
          links: [{ label: "GitHub", url: "https://github.com/AnthonyXJ99/player_cli" }]
        },
        {
          id: "04",
          title: "App Ecology",
          desc: "Un conjunto de aplicaciones móviles elegantes desplegadas en la Play Store, incluyendo Arcons Billetera y Colegio Contabilidad. El lenguaje de diseño enfatiza alta legibilidad, micro-interacciones táctiles y gestión de estado robusta para herramientas financieras y educativas.",
          stack: ["Flutter", "Kotlin", "SQLite"],
          deployment: "Google Play Store, AWS Mobile Services",
          links: [{ label: "Play Store", url: "#" }]
        }
      ]
    },
    infra: {
      title: "STACK TÉCNICO",
      categories: [
        { name: "Sistemas Frontend", tools: "Astro, Next.js, React, SAPUI5, OpenUI5" },
        { name: "Arquitectura Backend", tools: "ASP.NET, Python, Node.js" },
        { name: "Ingeniería Móvil", tools: "Flutter, Kotlin, Jetpack Compose" },
        { name: "Bases de Datos e Infra", tools: "PostgreSQL, Docker, OData v4" }
      ]
    },
    contact: {
      text: "Actualmente disponible para colaboraciones de ingeniería y proyectos de software seleccionados.",
      email: "CORREO",
      github: "GITHUB",
      linkedin: "LINKEDIN",
      instagram: "INSTAGRAM"
    }
  }
};
