export interface ProjectLink {
  label: string;
  url: string;
}

export interface PlatformVariant {
  label: string;
  stack: string[];
  mockup: 'dashboard' | 'terminal' | 'mobile' | 'android';
  image?: string;
  images?: string[];
  layout?: 'single' | 'side-by-side';
  desc?: string;
  links?: ProjectLink[];
}

export interface Project {
  id: string;
  title: string;
  desc: string;
  stack: string[];
  image?: string;
  images?: string[];
  video?: string;
  role?: string;
  challenges?: string;
  deployment?: string;
  links: ProjectLink[];
  platforms?: PlatformVariant[];
}

export interface InfraCategory {
  name: string;
  tools: string;
}

export interface TranslationDictionary {

  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    btn_projects: string;
    btn_arch: string;
    btn_contact: string;
    btn_cv: string;
  };
  profile: {
    title: string;
    body: string;
    role: string;
    journey: string;
    yearsExp: string;
    projectsCount: string;
    expert: string;
    advanced: string;
    connect: string;
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

    hero: {
      greeting: "Hi, I'm Antoni Escalante",
      title: "FULL STACK DEVELOPER.",
      subtitle: "I build applications that solve real problems.",
      btn_projects: "VIEW PROJECTS",
      btn_arch: "TECH SKILLS",
      btn_contact: "CONTACT ME",
      btn_cv: "VIEW CV"
    },
    profile: {
      title: "ABOUT ME",
      body: "I am a full-stack developer focused on creating useful and reliable software. I enjoy designing clean user interfaces and connecting them to solid backend systems. I adapt quickly to new tools and always prioritize delivering practical solutions over unnecessary complexity.",
      role: "Senior Software Engineer",
      journey: "My Journey",
      yearsExp: "Years Exp.",
      projectsCount: "Projects",
      expert: "Expert",
      advanced: "Advanced",
      connect: "Connect with me"
    },
    works: {
      title: "MY PROJECTS",
      subtitle: "A selection of tools and applications I've built to solve specific challenges.",
      projects: [
        {
          id: "01",
          title: "B1 Route",
          desc: "A logistics system for large-scale fleet management. It connects drivers on the road with administrators in the office, making package delivery and route tracking much simpler and more organized.",
          stack: ["SAPUI5", "Kotlin", "Jetpack Compose", "Mapbox", "OData"],
          role: "Web & Mobile Developer",
          challenges: "The main challenge was keeping the mobile app and the web portal perfectly synced so that administrators always knew the exact location and status of every delivery in real-time.",
          platforms: [
            {
              label: "Web",
              desc: "A dashboard for the logistics team to organize routes, assign drivers, and monitor deliveries on an interactive map. It replaces manual paperwork with a clear digital flow.",
              stack: ["SAPUI5", "TypeScript", "Mapbox GL JS", "OData v4"],
              mockup: "dashboard",
              image: "/images/b1route/b1route.webp",
              images: [
                "/images/b1route/web/01.webp",
                "/images/b1route/web/02.webp",
                "/images/b1route/web/03.webp",
                "/images/b1route/web/04.webp"
              ],
              layout: "single",
              links: [{ label: "View Project", url: "#" }]
            },
            {
              label: "Android",
              desc: "An app for drivers that works like a GPS navigator, showing them their daily route, allowing them to confirm deliveries, and automatically syncing data even when they lose internet connection on the road.",
              stack: ["Kotlin", "Jetpack Compose", "Mapbox Nav", "Room SQLite"],
              mockup: "android",
              images: [
                "/images/b1route/android/01.webp",
                "/images/b1route/android/02.webp",
                "/images/b1route/android/03.webp"
              ],
              layout: "side-by-side",
              links: [{ label: "GitHub", url: "#" }]
            }
          ],
          links: [{ label: "View Project", url: "#" }, { label: "GitHub", url: "#" }]
        },
        {
          id: "02",
          title: "JRM Flejes",
          desc: "An inventory tool made for a steel plant. It helps operators track heavy steel coils, know exactly where they are stacked, and manage daily shipments without relying on spreadsheets.",
          stack: ["React", "Tailwind CSS", "Supabase", "PostgreSQL"],
          role: "Full-Stack Developer",
          challenges: "The factory has areas with poor Wi-Fi. The biggest challenge was making sure the app could save changes offline and sync them back to the server automatically once the connection returned.",
          deployment: "Web App // Used in production",
          platforms: [
            {
              label: "Desktop",
              desc: "A visual map of the factory where managers can see how many steel coils are in each tower and track operator activity in real-time.",
              stack: ["React", "Supabase", "PostgreSQL"],
              mockup: "dashboard",
              image: "/images/jrm/desktop.png"
            },
            {
              label: "Mobile",
              desc: "A mobile-friendly version for workers on the floor to quickly scan or register coil movements and take photo evidence right from their phones.",
              stack: ["React", "Supabase Storage", "React Query"],
              mockup: "mobile",
              image: "/images/jrm/mobile.png"
            }
          ],
          links: [
            { label: "Live Site", url: "https://frm-flejes.aescalante.dev/" }
          ]
        },
        {
          id: "03",
          title: "Morph",
          desc: "A desktop app to convert images, audio, and video formats locally. It does not use the internet, meaning users can convert private or sensitive files without uploading them to a random website.",
          stack: ["Flutter", "Dart", "FFmpeg", "C++"],
          image: "/images/morph/miniatura.png",
          video: "/videos/morph.webm",
          role: "Solo Developer",
          challenges: "I had to figure out how to process heavy video files in the background without making the app freeze, ensuring a smooth experience for the user.",
          deployment: "Windows & macOS",
          links: [{ label: "GitHub", url: "https://github.com/aescalantedev/morph.git" }]
        },
        {
          id: "04",
          title: "StrixUI",
          desc: "A starter template for developers who need to build administrative dashboards quickly. It includes ready-to-use components like tables, charts, and Kanban boards, saving weeks of initial setup time.",
          stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
          image: "/images/strixui/strixui.webp",
          images: [
            "/images/strixui/01.webp",
            "/images/strixui/02.webp",
            "/images/strixui/03.webp",
            "/images/strixui/04.webp",
            "/images/strixui/05.webp",
            "/images/strixui/06.webp",
            "/images/strixui/07.webp",
            "/images/strixui/08.webp"
          ],
          role: "Developer",
          challenges: "Making sure the code remained clean and easy for other developers to understand and modify, while keeping the web pages loading almost instantly.",
          deployment: "Vercel",
          links: [
            { label: "Live Demo", url: "https://aescalantedev.github.io/strixui/" },
            { label: "GitHub", url: "https://github.com/aescalantedev/strixui.git" }
          ]
        },
        {
          id: "05",
          title: "Cyberdeck Term-OS",
          desc: "A music player that runs entirely in the terminal. Designed for programmers or power users who prefer to use keyboard shortcuts instead of a mouse to browse and play their local music library.",
          stack: ["Python", "Textual", "Pygame", "Audio Processing"],
          image: "/images/playercli.webp",
          role: "Developer",
          challenges: "Drawing the audio spectrum visualizer in real-time using text characters was tricky, as it required precise timing to sync the visual bars with the music beats.",
          deployment: "Local Terminal",
          links: [{ label: "GitHub", url: "https://github.com/aescalantedev/player_cli" }]
        },
        {
          id: "06",
          title: "Arcons Apps",
          desc: "A collection of mobile applications created for a corporate client. They help users manage their digital wallets, access accounting tools, and sync their business data safely from their phones.",
          stack: ["Flutter", "SQLite", "REST APIs"],
          image: "/images/appsarcons/01.webp",
          role: "Mobile Developer",
          challenges: "Sharing the same core code structure across four different apps so that fixing a bug in one app would easily fix it in the others, saving a lot of maintenance time.",
          deployment: "Google Play Store",
          platforms: [
            {
              label: "Billetera",
              desc: "A digital wallet app that makes it easy for users to check their balances and transaction history.",
              stack: ["Flutter", "SQLite"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=arcons.billetera.app" }]
            },
            {
              label: "Contabilidad",
              desc: "A tool for accountants to easily look up information and manage their profiles on the go.",
              stack: ["Flutter", "JSON Parsing"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.colegiocontabilidad" }]
            },
            {
              label: "Portal",
              desc: "The main hub app where clients can access all the different services offered by the company.",
              stack: ["Flutter", "REST APIs"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.app.app_arcons" }]
            },
            {
              label: "Company",
              desc: "An internal app for the company's employees to manage operations and sync daily reports securely.",
              stack: ["Flutter", "Data Encryption"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.company" }]
            }
          ],
          links: [{ label: "Play Store", url: "#" }]
        }
      ]
    },
    infra: {
      title: "TOOLS & TECH",
      categories: [
        { name: "Frontend", tools: "React, Next.js, Astro, Tailwind CSS, SAPUI5" },
        { name: "Backend", tools: "Node.js, Python, ASP.NET, Supabase" },
        { name: "Mobile", tools: "Flutter, Kotlin, Android" },
        { name: "Databases & DevOps", tools: "PostgreSQL, SQLite, Docker, Git" }
      ]
    },
    contact: {
      text: "I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
      email: "EMAIL",
      github: "GITHUB",
      linkedin: "LINKEDIN",
      instagram: "INSTAGRAM"
    }
  },
  es: {

    hero: {
      greeting: "Hola, soy Antoni Escalante",
      title: "DESARROLLADOR FULL STACK.",
      subtitle: "Construyo aplicaciones que resuelven problemas reales.",
      btn_projects: "VER PROYECTOS",
      btn_arch: "HABILIDADES",
      btn_contact: "CONTÁCTAME",
      btn_cv: "VER CV"
    },
    profile: {
      title: "SOBRE MÍ",
      body: "Soy un desarrollador enfocado en crear software útil y confiable. Disfruto diseñando interfaces limpias y conectándolas con sistemas backend robustos. Me adapto rápidamente a nuevas herramientas y siempre priorizo entregar soluciones prácticas en lugar de agregar complejidad innecesaria.",
      role: "Desarrollador Full-Stack",
      journey: "Mi Trayectoria",
      yearsExp: "Años Exp.",
      projectsCount: "Proyectos",
      expert: "Experto",
      advanced: "Avanzado",
      connect: "Conecta conmigo"
    },
    works: {
      title: "MIS PROYECTOS",
      subtitle: "Una selección de aplicaciones y herramientas que he construido para resolver problemas específicos.",
      projects: [
        {
          id: "01",
          title: "B1 Route",
          desc: "Un sistema de logística para gestionar flotas de entrega. Conecta a los conductores en la calle con los administradores en la oficina, haciendo que el seguimiento de rutas y entregas sea mucho más sencillo y organizado.",
          stack: ["SAPUI5", "Kotlin", "Jetpack Compose", "Mapbox", "OData"],
          role: "Desarrollador Web y Móvil",
          challenges: "El mayor reto fue mantener la app móvil y el portal web perfectamente sincronizados para que los administradores siempre supieran la ubicación exacta de los paquetes en tiempo real.",
          platforms: [
            {
              label: "Web",
              desc: "Un panel de control para que el equipo de logística organice rutas, asigne conductores y monitoree entregas en un mapa interactivo. Reemplaza el papeleo manual con un flujo digital claro.",
              stack: ["SAPUI5", "TypeScript", "Mapbox GL JS", "OData v4"],
              mockup: "dashboard",
              image: "/images/b1route/b1route.webp",
              images: [
                "/images/b1route/web/01.webp",
                "/images/b1route/web/02.webp",
                "/images/b1route/web/03.webp",
                "/images/b1route/web/04.webp"
              ],
              layout: "single",
              links: [{ label: "Ver Proyecto", url: "#" }]
            },
            {
              label: "Android",
              desc: "Una aplicación para los conductores que funciona como un navegador GPS. Les muestra su ruta diaria, permite confirmar entregas y guarda los datos incluso si se quedan sin internet en la carretera.",
              stack: ["Kotlin", "Jetpack Compose", "Mapbox Nav", "Room SQLite"],
              mockup: "android",
              images: [
                "/images/b1route/android/01.webp",
                "/images/b1route/android/02.webp",
                "/images/b1route/android/03.webp"
              ],
              layout: "side-by-side",
              links: [{ label: "GitHub", url: "#" }]
            }
          ],
          links: [{ label: "Ver Proyecto", url: "#" }, { label: "GitHub", url: "#" }]
        },
        {
          id: "02",
          title: "JRM Flejes",
          desc: "Una herramienta de inventario creada para una planta de acero. Ayuda a los operadores a registrar enormes bobinas de acero, saber exactamente en qué torre están apiladas y gestionar despachos sin usar hojas de Excel.",
          stack: ["React", "Tailwind CSS", "Supabase", "PostgreSQL"],
          role: "Desarrollador Full-Stack",
          challenges: "La fábrica tiene zonas con mala señal de Wi-Fi. El mayor desafío fue lograr que la app guardara los cambios sin internet y los sincronizara automáticamente al recuperar la conexión.",
          deployment: "App Web // En producción",
          platforms: [
            {
              label: "Escritorio",
              desc: "Un mapa visual de la fábrica donde los gerentes pueden ver cuántas bobinas hay en cada torre y monitorear la actividad en tiempo real.",
              stack: ["React", "Supabase", "PostgreSQL"],
              mockup: "dashboard",
              image: "/images/jrm/desktop.png"
            },
            {
              label: "Móvil",
              desc: "Una versión móvil para que los trabajadores en planta puedan escanear movimientos de bobinas y tomar fotos de evidencia desde su teléfono.",
              stack: ["React", "Supabase Storage", "React Query"],
              mockup: "mobile",
              image: "/images/jrm/mobile.png"
            }
          ],
          links: [
            { label: "Sitio Web", url: "https://frm-flejes.aescalante.dev/" }
          ]
        },
        {
          id: "03",
          title: "Morph",
          desc: "Un programa de escritorio para convertir imágenes, audio y video localmente. Funciona sin internet, lo que significa que puedes convertir archivos privados sin tener que subirlos a páginas de terceros.",
          stack: ["Flutter", "Dart", "FFmpeg", "C++"],
          image: "/images/morph/miniatura.png",
          video: "/videos/morph.webm",
          role: "Desarrollador Único",
          challenges: "Tuve que idear cómo procesar videos pesados de fondo sin que el programa se congelara, asegurando que la interfaz siempre se sintiera fluida.",
          deployment: "Windows y macOS",
          links: [{ label: "GitHub", url: "https://github.com/aescalantedev/morph.git" }]
        },
        {
          id: "04",
          title: "StrixUI",
          desc: "Una plantilla de inicio para desarrolladores que necesitan construir paneles de administración rápidamente. Incluye componentes listos para usar como tablas y gráficos, ahorrando semanas de configuración.",
          stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
          image: "/images/strixui/strixui.webp",
          images: [
            "/images/strixui/01.webp",
            "/images/strixui/02.webp",
            "/images/strixui/03.webp",
            "/images/strixui/04.webp",
            "/images/strixui/05.webp",
            "/images/strixui/06.webp",
            "/images/strixui/07.webp",
            "/images/strixui/08.webp"
          ],
          role: "Desarrollador",
          challenges: "Mantener el código limpio y fácil de entender para otros programadores, logrando al mismo tiempo que las páginas cargaran casi de forma instantánea.",
          deployment: "Vercel",
          links: [
            { label: "Ver Demo", url: "https://aescalantedev.github.io/strixui/" },
            { label: "GitHub", url: "https://github.com/aescalantedev/strixui.git" }
          ]
        },
        {
          id: "05",
          title: "Cyberdeck Term-OS",
          desc: "Un reproductor de música que funciona completamente en la terminal. Diseñado para programadores que prefieren usar atajos de teclado en lugar del ratón para explorar y escuchar su música local.",
          stack: ["Python", "Textual", "Pygame"],
          image: "/images/playercli.webp",
          role: "Desarrollador",
          challenges: "Dibujar el visualizador de audio en tiempo real usando caracteres de texto fue complejo, ya que requería mucha precisión para sincronizar las barras visuales con el ritmo de la música.",
          deployment: "Terminal Local",
          links: [{ label: "GitHub", url: "https://github.com/aescalantedev/player_cli" }]
        },
        {
          id: "06",
          title: "Arcons Apps",
          desc: "Una colección de aplicaciones móviles creadas para un cliente corporativo. Ayudan a los usuarios a gestionar sus billeteras digitales y herramientas contables de forma segura desde sus teléfonos.",
          stack: ["Flutter", "SQLite", "APIs REST"],
          image: "/images/appsarcons/01.webp",
          role: "Desarrollador Móvil",
          challenges: "Compartir la misma base de código entre cuatro aplicaciones distintas para que corregir un error en una, automáticamente lo arreglara en las demás, ahorrando mucho tiempo de mantenimiento.",
          deployment: "Google Play Store",
          platforms: [
            {
              label: "Billetera",
              desc: "Una billetera digital que facilita a los usuarios revisar sus saldos e historial de transacciones diarias.",
              stack: ["Flutter", "SQLite"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=arcons.billetera.app" }]
            },
            {
              label: "Contabilidad",
              desc: "Una herramienta para contadores que permite buscar información y gestionar perfiles fácilmente desde el celular.",
              stack: ["Flutter", "Procesamiento JSON"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.colegiocontabilidad" }]
            },
            {
              label: "Portal",
              desc: "La aplicación central donde los clientes pueden acceder a todos los servicios ofrecidos por la empresa.",
              stack: ["Flutter", "APIs REST"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.app.app_arcons" }]
            },
            {
              label: "Company",
              desc: "Una aplicación interna para los empleados de la empresa, diseñada para gestionar operaciones y sincronizar reportes.",
              stack: ["Flutter", "Encriptación de Datos"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.company" }]
            }
          ],
          links: [{ label: "Play Store", url: "#" }]
        }
      ]
    },
    infra: {
      title: "TECNOLOGÍAS",
      categories: [
        { name: "Frontend", tools: "React, Next.js, Astro, Tailwind CSS, SAPUI5" },
        { name: "Backend", tools: "Node.js, Python, ASP.NET, Supabase" },
        { name: "Móvil", tools: "Flutter, Kotlin, Android" },
        { name: "Bases de Datos e Infra", tools: "PostgreSQL, SQLite, Docker, Git" }
      ]
    },
    contact: {
      text: "Siempre estoy abierto a discutir nuevos proyectos, ideas creativas o colaborar en la creación de buen software.",
      email: "CORREO",
      github: "GITHUB",
      linkedin: "LINKEDIN",
      instagram: "INSTAGRAM"
    }
  }
};
