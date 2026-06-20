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
      operator: "OPR: ANTONI ESCALANTE",
      status: "STATUS: ACTIVE",
      region: "REGION: LATAM",
      build: "BUILD: v2.4",
      theme_light: "THEME: LIGHT",
      theme_dark: "THEME: DARK",
      lang_en: "EN",
      lang_es: "ES"
    },
    hero: {
      title: "BUILDING ROBUST SOFTWARE SYSTEMS.",
      subtitle: "FULL-STACK SYSTEMS // MOBILE APPLICATIONS // SCALABLE APIS // ENTERPRISE INTERFACES",
      btn_projects: "EXPLORE PROJECTS",
      btn_arch: "VIEW ARCHITECTURES"
    },
    profile: {
      title: "// DEVELOPER PROFILE : A. ESCALANTE",
      body: "Specialized in end-to-end software development. I design fluid and minimalist user experiences on the frontend, powered by scalable backend engines built with FastAPI and ASP.NET 8. An adaptable programmer, focused on delivering quality code and solving complex technical challenges."
    },
    works: {
      title: "ENGINEERED WORKS.",
      subtitle: "Built from the ground up. End-to-end software solutions and mobile ecosystems.",
      projects: [
        {
          id: "01",
          title: "B1 Route",
          desc: "Enterprise logistics and last-mile dispatch ecosystem for large-scale fleet management, connecting a 3-column SAPUI5 FCL Fiori client with a native Android app via a secure ASP.NET OData v4 backend. Engineered with modules for drivers, vehicles, helper crews, security personnel, territorial zones, and business partners. Supports multi-locale i18n (CL, MX, PE, US), dynamic Horizon/Quartz light-dark themes, and real-time push notification dispatches.",
          stack: ["SAPUI5", "OpenUI5", "Fiori 3", "Kotlin", "Jetpack Compose M3", "Mapbox GL JS"],
          role: "Lead Architect — Web & Mobile",
          challenges: "Integrating multi-platform synchronization via an external ASP.NET OData v4 server. Consuming rich master data configurations including business partners, security groups, license validations, and vehicle categories. Managing multi-region translation bundles and seamless switching between Horizon and Quartz custom high-contrast stylesheets.",
          platforms: [
            {
              label: "Web",
              desc: "A premium enterprise-grade web frontend designed under SAP Fiori 3 guidelines, supporting Horizon and Quartz (light/dark) themes. Built with SAPUI5 and strict TypeScript, it consumes OData v4 services from an ASP.NET backend. Houses 12+ corporate operational modules—including Drivers, Security Personnel, Helpers, Territories, Business Partners, and Device configurations—integrated with an interactive 3-column Mapbox GL JS stop-reordering engine.",
              stack: ["SAPUI5 1.141", "TypeScript 5.3", "Mapbox GL JS 3", "OData v4", "UI5 CLI", "Turf.js 7"],
              mockup: "dashboard",
              image: "/images/b1route.webp",
              images: [
                "/images/b1route/web/01.webp",
                "/images/b1route/web/02.webp",
                "/images/b1route/web/03.webp",
                "/images/b1route/web/04.webp"
              ],
              layout: "single",
              links: [{ label: "Live View", url: "#" }]
            },
            {
              label: "Android",
              desc: "A high-performance native Android application engineered using Kotlin (v2.3.20) and Jetpack Compose (Material 3). It adheres strictly to MVVM and Clean Architecture principles, leveraging Room SQLite as a Single Source of Truth (SSOT). Integrates Mapbox Maps SDK (v11.15) and Mapbox Navigation (v3.12) for voice-guided turn-by-turn navigation, along with a custom dynamic OData engine that parses SAP XML metadata to render Fiori-compliant forms on-the-fly. Powered by Hilt DI, Navigation3 type-safe routes, and WorkManager background tasks for automated encrypted database backups. Receives real-time push notifications via Firebase Cloud Messaging (FCM) triggered from the web portal. Features a custom Material 3 UI design inspired by SAP Fiori Horizon and Quartz themes (light/dark), adhering strictly to corporate color palettes and visual guidelines.",
              stack: ["Kotlin 2.3", "Jetpack Compose", "Mapbox Nav 3", "Room SQLite", "Hilt DI", "WorkManager", "Firebase FCM"],
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
          links: [{ label: "Live View", url: "#" }, { label: "GitHub", url: "#" }]
        },
        {
          id: "02",
          title: "Morph",
          desc: "A premium, cross-platform multimedia converter engineered for local, secure, and lightning-fast file processing. Built with Flutter and powered by FFmpeg Kit, it enables seamless offline conversion of images (PNG, JPG, WEBP, GIF, PDF), audio, and video formats. Adapts responsively from mobile devices to dense 3-column desktop layouts with integrated drag-and-drop actions, native Windows context menu registry, and interactive circular theme reveal transitions.",
          stack: ["Flutter", "Dart", "BLoC", "FFmpeg Kit", "Isolates", "C++ / Win32"],
          image: "/images/morph/miniatura.png",
          video: "/videos/morph.webm",
          role: "Solo Creator & Core Architect",
          challenges: "Structuring multi-threaded processing via Dart Isolates to execute heavy image-to-PDF merging and ZIP packaging in the background without dropping UI frames below 60 FPS. Writing a native C++ Win32 registry installer to add custom right-click actions directly in the Windows Explorer shell.",
          deployment: "Native Desktop (Windows/macOS) // Mobile (Android/iOS)",
          links: [{ label: "GitHub", url: "https://github.com/aescalantedev/morph.git" }]
        },
        {
          id: "03",
          title: "StrixUI",
          desc: "A premium enterprise-grade admin dashboard template and SaaS foundation engineered for maximum performance. Built on Next.js 15 (App Router), React 19, and Tailwind CSS v4, it implements a highly decoupled feature-first modular architecture. Designed to host dense administrative interfaces, dynamic Kanban boards, multi-step wizards, and real-time chat hubs with perfect visual cohesion and near-zero Lighthouse latency.",
          stack: ["Next.js 15", "React 19", "Tailwind v4", "TypeScript", "Shadcn/UI", "Radix UI"],
          image: "/images/strixui.webp",
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
          role: "Creator & Lead Engineer",
          challenges: "Engineering a flat, feature-first codebase that decouples auth, settings, users, and complex kanban states cleanly. Optimizing next-generation CSS bundling with Tailwind v4 for sub-millisecond page loads, targeting a 100/100 Lighthouse performance standard.",
          deployment: "Vercel Edge Network // TypeScript Strict",
          links: [
            { label: "Live View", url: "https://aescalantedev.github.io/strixui/" },
            { label: "GitHub", url: "https://github.com/aescalantedev/strixui.git" }
          ]
        },
        {
          id: "04",
          title: "Cyberdeck Term-OS",
          desc: "A state-of-the-art retro-futuristic terminal music player (TUI) styled like a vintage AUDIOPHILE-TERM-OS cyberdeck, built with Textual and Rich. It features a real-time log-spaced discrete spectrum visualizer with three frequency rendering modes (bars, waveform, spectrum) togglable live, double-spaced monochromatic karaoke lyrics with Matrix-green typewriter effects, a responsive sidebar ListView for song navigation, and a bulletproof keyboard-driven hotkey guidance bar. Driven by a high-fidelity multi-threaded engine using pygame.mixer and pydub, it integrates automatic ID3 metadata/lyrics extraction via Mutagen and self-generating sync .lrc files.",
          stack: ["Python", "Textual TUI", "Rich Library", "Numpy (FFT)", "Pygame Mixer", "Pydub", "Mutagen ID3"],
          image: "/images/playercli.webp",
          role: "Solo Creator & Core Architect",
          challenges: "Designing a non-blocking multi-threaded daemon architecture to compute real-time Fast Fourier Transforms (rfft) on raw audio amplitude chunks at 60 FPS while keeping the Textual UI responsive. Managing background threads, resolving live metadata parsing via Mutagen/PyLRC, and ensuring clean disk teardowns of temporary decoded WAV files on exit.",
          deployment: "Local Terminal // UTF-8 & TrueColor Support",
          links: [{ label: "GitHub", url: "https://github.com/aescalantedev/player_cli" }]
        },
        {
          id: "05",
          title: "App Ecology",
          desc: "A premium suite of native-performance mobile applications engineered under consistent clean design patterns. It features tailored user interfaces, tactile micro-interactions, robust offline caching, and real-time state synchronization for financial, educational, and corporate operations.",
          stack: ["Flutter", "Dart", "Kotlin", "SQLite", "REST APIs", "State Management"],
          image: "/images/appsarcons/01.webp",
          role: "Lead Mobile Architect",
          challenges: "Designing a shared codebase framework to coordinate features across 4 distinct corporate apps. Optimizing local encrypted databases, ensuring secure background synchronization, and managing complex real-time balance calculations with zero latency.",
          deployment: "Google Play Store // Flutter Release Channels",
          platforms: [
            {
              label: "Billetera",
              desc: "A digital wallet mobile application focused on the efficient management of financial transactions. Engineered with strict security protocols, high legibility for numerical data, and a robust state management system to reflect balances and transaction history in real time.",
              stack: ["Flutter", "Dart", "SQLite", "State Management", "Encrypted Storage"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=arcons.billetera.app" }]
            },
            {
              label: "Contabilidad",
              desc: "A specialized mobile solution designed specifically for the accounting sector. Facilitates seamless access to tools, profile management, and resources for accounting professionals, prioritizing a clean user interface and intuitive navigation for dense information layouts.",
              stack: ["Flutter", "Dart", "Local Cache", "JSON Parsing", "Clean UI"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.colegiocontabilidad" }]
            },
            {
              label: "Portal",
              desc: "The central application of the Arcons ecosystem, acting as the main portal for clients. Integrates multiple diverse services into a single hub, delivering a fluid user experience through tactile micro-interactions and an optimized data syncing architecture.",
              stack: ["Flutter", "Dart", "Ecosystem Integration", "Micro-interactions", "REST APIs"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.app.app_arcons" }]
            },
            {
              label: "Company",
              desc: "An enterprise tool engineered for internal and operational management. Implements corporate business logic into an elegant mobile interface, enabling secure synchronization of business data and reliable operation monitoring.",
              stack: ["Flutter", "Dart", "Enterprise Sync", "Operational Security", "Data Encryption"],
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
      operator: "OPR: ANTONI ESCALANTE",
      status: "ESTADO: ACTIVO",
      region: "REGIÓN: LATAM",
      build: "COMPILACIÓN: v2.4",
      theme_light: "TEMA: CLARO",
      theme_dark: "TEMA: OSCURO",
      lang_en: "EN",
      lang_es: "ES"
    },
    hero: {
      title: "CONSTRUYENDO SISTEMAS DE SOFTWARE ROBUSTOS.",
      subtitle: "SISTEMAS FULL-STACK // APLICACIONES MÓVILES // APIS ESCALABLES // INTERFACES EMPRESARIALES",
      btn_projects: "EXPLORAR PROYECTOS",
      btn_arch: "VER ARQUITECTURAS"
    },
    profile: {
      title: "// PERFIL DE DESARROLLADOR : A. ESCALANTE",
      body: "Especializado en el desarrollo de software de extremo a extremo. Diseño experiencias de usuario fluidas y minimalistas en el frontend, potenciadas por motores backend escalables construidos con FastAPI y ASP.NET 8. Un programador adaptable, enfocado en entregar código de calidad y resolver desafíos técnicos complejos."
    },
    works: {
      title: "PROYECTOS TÉCNICOS.",
      subtitle: "Construidos desde cero. Soluciones de software integrales y ecosistemas móviles.",
      projects: [
        {
          id: "01",
          title: "B1 Route",
          desc: "Ecosistema empresarial de logística y despacho de última milla para flotas a gran escala, que conecta un cliente SAPUI5 Fiori FCL de 3 columnas con una aplicación nativa de Android a través de un backend ASP.NET OData v4. Diseñado con módulos de conductores, vehículos, ayudantes, personal de seguridad, territorios y socios de negocio. Soporta i18n multirregión (CL, MX, PE, US), temas Horizon/Quartz (claro/oscuro) y envío de notificaciones push.",
          stack: ["SAPUI5", "OpenUI5", "Fiori 3", "Kotlin", "Jetpack Compose M3", "Mapbox GL JS"],
          role: "Arquitecto Principal — Web y Móvil",
          challenges: "Integrar la sincronización multiplataforma mediante un servidor OData v4 externo en ASP.NET. Consumir y mapear datos maestros complejos como socios de negocio, grupos de seguridad, licencias y categorías vehiculares. Gestionar i18n localizado por país y la alternancia de temas Quartz y Horizon de alta densidad visual.",
          platforms: [
            {
              label: "Web",
              desc: "Un frontend web premium de nivel empresarial diseñado bajo las directrices de SAP Fiori 3, compatible con temas Horizon y Quartz (claro/oscuro). Construido con SAPUI5 y TypeScript estricto, consume servicios OData v4 desde un backend ASP.NET. Alberga más de 12 módulos operativos—incluyendo Conductores, Personal de Seguridad, Ayudantes, Territorios, Socios de Negocio y Configuración de Dispositivos—integrados con un motor Mapbox GL JS interactivo de 3 columnas para reordenar paradas.",
              stack: ["SAPUI5 1.141", "TypeScript 5.3", "Mapbox GL JS 3", "OData v4", "UI5 CLI", "Turf.js 7"],
              mockup: "dashboard",
              image: "/images/b1route.webp",
              images: [
                "/images/b1route/web/01.webp",
                "/images/b1route/web/02.webp",
                "/images/b1route/web/03.webp",
                "/images/b1route/web/04.webp"
              ],
              layout: "single",
              links: [{ label: "Ver en vivo", url: "#" }]
            },
            {
              label: "Android",
              desc: "Una aplicación nativa de Android de alto rendimiento desarrollada en Kotlin (v2.3.20) y Jetpack Compose (Material 3). Se adhiere estrictamente a los principios de MVVM y Arquitectura Limpia, utilizando Room SQLite como Fuente Única de Verdad (SSOT). Integra Mapbox Maps SDK (v11.15) y Mapbox Navigation (v3.12) para navegación turn-by-turn guiada por voz, junto con un motor OData dinámico que parsea metadatos XML de SAP para generar formularios Fiori sobre la marcha. Potenciada por Hilt DI, rutas tipo-safe con Navigation3 y WorkManager para tareas en segundo plano. Recibe notificaciones push en tiempo real a través de Firebase Cloud Messaging (FCM) enviadas desde el portal web de administración. Cuenta con un diseño personalizado en Material 3 inspirado en los temas Horizon y Quartz (claro/oscuro) de SAP Fiori, alineado con sus paletas de colores y guías visuales.",
              stack: ["Kotlin 2.3", "Jetpack Compose", "Mapbox Nav 3", "Room SQLite", "Hilt DI", "WorkManager", "Firebase FCM"],
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
          links: [{ label: "Ver en vivo", url: "#" }, { label: "GitHub", url: "#" }]
        },
        {
          id: "02",
          title: "Morph",
          desc: "Un conversor multimedia local premium y multiplataforma diseñado para el procesamiento rápido, privado y seguro de archivos. Desarrollado con Flutter y potenciado por FFmpeg Kit, permite convertir imágenes (PNG, JPG, WEBP, GIF, PDF), audio y video localmente sin depender de internet. Se adapta con fluidez desde pantallas táctiles móviles hasta interfaces de escritorio de 3 columnas con soporte para arrastrar y soltar (Drag & Drop), menú contextual nativo de Windows y temas de color dinámicos con revelación circular.",
          stack: ["Flutter", "Dart", "BLoC", "FFmpeg Kit", "Isolates", "C++ / Win32"],
          image: "/images/morph/miniatura.png",
          video: "/videos/morph.webm",
          role: "Creador Único y Arquitecto Principal",
          challenges: "Estructurar el procesamiento asíncrono en segundo plano mediante Dart Isolates para compilar PDFs multipágina y empaquetar archivos ZIP sin comprometer los 60 FPS en la interfaz de usuario. Desarrollar un instalador de registro en Win32/C++ para acoplar la opción de conversión directa en el menú contextual del Explorador de Windows.",
          deployment: "Escritorio Nativo (Windows/macOS) // Móvil (Android/iOS)",
          links: [{ label: "GitHub", url: "https://github.com/aescalantedev/morph.git" }]
        },
        {
          id: "03",
          title: "StrixUI",
          desc: "Una plantilla premium de panel administrativo de nivel empresarial y fundación SaaS diseñada para el máximo rendimiento. Desarrollada sobre Next.js 15 (App Router), React 19 y Tailwind CSS v4, implementa una arquitectura modular limpia desacoplada por características. Diseñada para albergar interfaces densas, tableros Kanban dinámicos, asistentes paso a paso y chats en tiempo real con una latencia Lighthouse cercana a cero.",
          stack: ["Next.js 15", "React 19", "Tailwind v4", "TypeScript", "Shadcn/UI", "Radix UI"],
          image: "/images/strixui.webp",
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
          role: "Creador e Ingeniero Principal",
          challenges: "Diseñar una base de código modular por características que desacopla la autenticación, configuraciones, usuarios y estados Kanban complejos. Optimizar el agrupamiento CSS de nueva generación con Tailwind v4 para cargas sub-milisegundo, logrando un estándar de rendimiento 100/100 en Lighthouse.",
          deployment: "Vercel Edge Network // TypeScript Estricto",
          links: [
            { label: "Ver en vivo", url: "https://aescalantedev.github.io/strixui/" },
            { label: "GitHub", url: "https://github.com/aescalantedev/strixui.git" }
          ]
        },
        {
          id: "04",
          title: "Cyberdeck Term-OS",
          desc: "Un reproductor de música en terminal (TUI) retrofuturista de última generación diseñado como un cyberdeck de audiófilo Term-OS, impulsado por Textual y Rich. Cuenta con un analizador de espectro logarítmico discreto en tiempo real con tres modos de renderizado de frecuencia (barras, forma de onda y espectro) conmutables en vivo, letras de karaoke monocromáticas a doble espacio con efecto de máquina de escribir verde Matrix, navegación lateral mediante ListView y un panel de atajos 100% por teclado. Su motor de audio multihilo asíncrono con pygame.mixer y pydub realiza análisis FFT en segundo plano, extrae letras ID3 con Mutagen y limpia todos los archivos WAV temporales sin dejar residuos.",
          stack: ["Python", "Textual TUI", "Rich Library", "Numpy (FFT)", "Pygame Mixer", "Pydub", "Mutagen ID3"],
          image: "/images/playercli.webp",
          role: "Creador Único y Arquitecto Principal",
          challenges: "Diseñar una arquitectura multihilo no bloqueante para calcular la Transformada Rápida de Fourier (rfft) en tiempo real sobre bloques de amplitud de audio a 60 FPS sin ralentizar la interfaz de usuario. Administrar la decodificación al vuelo de archivos comprimidos (MP3, FLAC, M4A) mediante pydub y estructurar el formateo cronometrado con PyLRC.",
          deployment: "Terminal Local // Soporte UTF-8 & TrueColor",
          links: [{ label: "GitHub", url: "https://github.com/aescalantedev/player_cli" }]
        },
        {
          id: "05",
          title: "App Ecology",
          desc: "Una suite premium de aplicaciones móviles de alto rendimiento desarrolladas bajo un ecosistema de diseño limpio y unificado. Cuenta con interfaces personalizadas, microinteracciones táctiles fluidas, almacenamiento local optimizado y lógicas de sincronización asíncrona para operaciones financieras, educativas y corporativas.",
          stack: ["Flutter", "Dart", "Kotlin", "SQLite", "APIs REST", "Gestión de Estado"],
          image: "/images/appsarcons/01.webp",
          role: "Arquitecto Móvil Principal",
          challenges: "Diseñar un núcleo de desarrollo compartido (shared framework) para coordinar las lógicas de 4 aplicaciones corporativas distintas. Optimizar bases de datos locales SQLite encriptadas, asegurar la sincronización en segundo plano y calcular saldos en tiempo real sin latencia.",
          deployment: "Google Play Store // Canales de Distribución Flutter",
          platforms: [
            {
              label: "Billetera",
              desc: "Aplicación móvil de billetera digital orientada a la gestión eficiente de transacciones financieras. Diseñada con un enfoque en la seguridad, alta legibilidad de datos numéricos y una gestión de estado robusta para reflejar saldos e historial de movimientos en tiempo real.",
              stack: ["Flutter", "Dart", "SQLite", "Gestión de Estado", "Almacenamiento Seguro"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=arcons.billetera.app" }]
            },
            {
              label: "Contabilidad",
              desc: "Solución móvil desarrollada específicamente para el sector contable. Facilita el acceso a herramientas, gestión de perfiles y recursos para profesionales de la contabilidad, priorizando una interfaz limpia y una navegación intuitiva para el manejo de información densa.",
              stack: ["Flutter", "Dart", "Caché Local", "Procesamiento JSON", "UI Limpia"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.colegiocontabilidad" }]
            },
            {
              label: "Portal",
              desc: "Aplicación central del ecosistema Arcons. Actúa como el portal principal para los clientes, integrando diversos servicios en un solo lugar y ofreciendo una experiencia de usuario fluida mediante micro-interacciones táctiles y una arquitectura de datos optimizada.",
              stack: ["Flutter", "Dart", "Integración de Ecosistemas", "Microinteracciones", "APIs REST"],
              mockup: "android",
              image: "/images/appsarcons/01.webp",
              layout: "single",
              links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.arcons.app.app_arcons" }]
            },
            {
              label: "Company",
              desc: "Herramienta corporativa diseñada para la gestión interna y operativa. Implementa lógicas de negocio en una interfaz móvil elegante, permitiendo la sincronización de datos empresariales y el monitoreo de operaciones con alta fiabilidad.",
              stack: ["Flutter", "Dart", "Sincronización Corporativa", "Seguridad Operativa", "Encriptación de Datos"],
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
