(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/contexts/ThemeContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const useTheme = ()=>{
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
_s(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const ThemeProvider = ({ children })=>{
    _s1();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        mode: 'light'
    });
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            setMounted(true);
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme({
                mode: savedTheme ? savedTheme : prefersDark ? 'dark' : 'light'
            });
        }
    }["ThemeProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            if (!mounted) return;
            const root = window.document.documentElement;
            if (theme.mode === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
            localStorage.setItem('theme', theme.mode);
        }
    }["ThemeProvider.useEffect"], [
        theme,
        mounted
    ]);
    const toggleTheme = ()=>{
        setTheme((prev)=>({
                mode: prev.mode === 'light' ? 'dark' : 'light'
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/ThemeContext.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(ThemeProvider, "MH652iO4evzZjKn4oDTj/fvxqCM=");
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/translations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const translations = {
    es: {
        nav: {
            home: 'Inicio',
            about: 'Acerca',
            projects: 'Proyectos',
            experience: 'Experiencia',
            contact: 'Contacto',
            admin: 'Admin',
            minecraft: '🎮 Minecraft',
            services: '💼 Servicios'
        },
        hero: {
            greeting: '¡Hola! Soy',
            name: 'Pablo Blanco Navarro',
            title: 'Full Stack Developer & Game Scripter',
            subtitle: 'Desarrollador Full Stack y Scripter de videojuegos apasionado por crear experiencias digitales excepcionales',
            cta: 'Ver mi trabajo',
            contact: 'Contacto',
            downloadCV: 'Descargar CV'
        },
        about: {
            title: 'Acerca de mí',
            description: 'Desarrollador Full Stack apasionado con experiencia en Desarrollo web y scripting de videojuegos. Me especializo en crear aplicaciones web modernas y escalables que combinan diseño atractivo con funcionalidad robusta.',
            additionalText: 'Mi pasión por la tecnología me impulsa a mantenerme actualizado con las últimas tendencias y mejores prácticas en el desarrollo web.',
            whyWorkWithMe: '¿Por qué trabajar conmigo?',
            fastDelivery: 'Entrega Rápida',
            fastDeliveryDesc: 'Desarrollo ágil con entregas frecuentes y comunicación constante.',
            innovativeSolutions: 'Soluciones Innovadoras',
            innovativeSolutionsDesc: 'Enfoque creativo para resolver problemas complejos con elegancia.',
            technologies: 'Tecnologías'
        },
        projects: {
            title: 'Mis proyectos',
            subtitle: 'Algunos de mis trabajos más recientes',
            viewAll: 'Ver todos los proyectos',
            viewProject: 'Ver proyecto',
            sourceCode: 'Código fuente',
            liveDemo: 'Demo en vivo',
            technologies: 'Tecnologías',
            filters: {
                all: 'Todos',
                featured: 'Destacados',
                rubyGems: 'Gemas Ruby',
                webApps: 'Aplicaciones Web',
                wordpress: 'WordPress',
                minecraft: 'Minecraft',
                rails: 'Rails',
                nextjs: 'Next.js'
            },
            emptyState: 'No hay proyectos que mostrar',
            emptyStateDesc: 'Próximamente nuevos proyectos increíbles'
        },
        experience: {
            title: 'Experiencia profesional',
            technologies: 'Tecnologías utilizadas'
        },
        certificates: {
            title: 'Certificados',
            subtitle: 'Cursos y certificaciones completadas',
            viewCertificate: 'Ver certificado',
            issuedBy: 'Emitido por',
            completedIn: 'Completado en'
        },
        contact: {
            title: 'Contáctame',
            subtitle: '¿Tienes un proyecto en mente? ¡Hablemos!',
            name: 'Nombre',
            email: 'Email',
            subject: 'Asunto',
            message: 'Mensaje',
            send: 'Enviar mensaje',
            sending: 'Enviando...',
            success: 'Mensaje enviado correctamente',
            error: 'Error al enviar el mensaje'
        },
        ai: {
            title: 'Asistente IA',
            placeholder: 'Pregúntame algo sobre mi experiencia...',
            send: 'Enviar',
            thinking: 'Pensando...',
            error: 'Error al procesar la respuesta'
        },
        footer: {
            rights: 'Todos los derechos reservados',
            madeWith: 'Hecho con',
            and: 'y'
        },
        minecraft: {
            title: 'Proyectos Minecraft',
            description: 'Accesos directos a proyectos destacados relacionados con Minecraft.',
            technologies: 'Tecnologías',
            projects: {
                townyFaith: 'TownyFaith',
                hytaleChile: 'Hytale Chile',
                visit: 'Visitar sitio'
            }
        },
        services: {
            hero: {
                title: 'Servicios de Minecraft',
                subtitle: 'Desarrollo profesional de plugins, configuración de servidores y sistemas personalizados para tu servidor de Minecraft',
                cta: 'Ver Servicios'
            },
            title: 'Servicios Disponibles',
            subtitle: 'Soluciones completas para tu servidor de Minecraft',
            technologies: {
                title: 'Tecnologías',
                subtitle: 'Stack tecnológico que utilizo en mis proyectos'
            },
            testimonials: {
                title: 'Testimonios',
                subtitle: 'Lo que dicen mis clientes'
            },
            cta: {
                title: '¿Listo para mejorar tu servidor?',
                subtitle: 'Contáctame para discutir tu proyecto y obtener un presupuesto personalizado',
                button: 'Contactar Ahora'
            },
            serviceItems: {
                pluginDevelopment: {
                    title: 'Desarrollo de Plugins',
                    description: 'Plugins personalizados para servidores de Minecraft con funcionalidades únicas y optimizadas.',
                    features: [
                        'Bukkit/Spigot',
                        'Paper API',
                        'NMS/Reflection',
                        'Optimización de rendimiento'
                    ]
                },
                serverSetup: {
                    title: 'Configuración de Servidores',
                    description: 'Setup completo de servidores Minecraft con todas las configuraciones necesarias.',
                    features: [
                        'Instalación y configuración',
                        'Optimización de servidor',
                        'Backups automáticos',
                        'Monitoreo'
                    ]
                },
                database: {
                    title: 'Sistemas de Base de Datos',
                    description: 'Implementación de sistemas de almacenamiento eficientes para datos de jugadores y servidor.',
                    features: [
                        'MySQL/PostgreSQL',
                        'Redis Cache',
                        'MongoDB',
                        'Sistemas de economía'
                    ]
                },
                security: {
                    title: 'Sistemas de Seguridad',
                    description: 'Protección avanzada contra hacks, exploits y comportamientos no deseados.',
                    features: [
                        'Anti-cheat personalizado',
                        'Sistemas de moderación',
                        'Logs y auditoría',
                        'Protección DDoS'
                    ]
                },
                optimization: {
                    title: 'Optimización de Rendimiento',
                    description: 'Mejora del rendimiento del servidor para manejar más jugadores simultáneos.',
                    features: [
                        'Profiling y análisis',
                        'Optimización de código',
                        'Reducción de lag',
                        'Chunk loading inteligente'
                    ]
                },
                multiplayer: {
                    title: 'Sistemas Multiplayer',
                    description: 'Desarrollo de sistemas complejos para interacción entre jugadores.',
                    features: [
                        'Sistemas de clanes',
                        'Economía y comercio',
                        'Sistemas de ranking',
                        'Eventos automáticos'
                    ]
                }
            },
            testimonialsItems: {
                testimonial1: {
                    name: 'Servidor Anónimo',
                    role: 'Administrador de Servidor',
                    content: 'Excelente trabajo en el desarrollo de plugins personalizados. Muy profesional y eficiente.'
                },
                testimonial2: {
                    name: 'Cliente Satisfecho',
                    role: 'Dueño de Servidor',
                    content: 'La optimización del servidor fue increíble. Pasamos de 50 a 100 jugadores sin problemas.'
                }
            }
        },
        projectData: {
            kickwp: {
                title: 'KickWP',
                description: 'Plugin de WordPress que utiliza la API de kick.com para mostrar información del canal en tiempo real y más funcionalidades.',
                fullDescription: 'Plugin completo de WordPress que se integra con la API de kick.com para mostrar información de canales de streaming en tiempo real, estadísticas de viewers, estado del stream y más características avanzadas para streamers.'
            },
            orionxSdk: {
                title: 'Orionx SDK Ruby',
                description: 'SDK no oficial de Ruby para la plataforma orionx. Interfaz completa para interactuar con el exchange de criptomonedas.',
                fullDescription: 'SDK completo de Ruby que proporciona una interfaz limpia y fácil de usar para interactuar con la plataforma orionx. Incluye métodos para trading, consultas de mercado, gestión de órdenes y más.'
            },
            budaApi: {
                title: 'Buda API Ruby',
                description: 'SDK no oficial de Ruby para el exchange de criptomonedas Buda. Interfaz completa para trading y consultas de mercado.',
                fullDescription: 'SDK completo de Ruby para interactuar con la API de Buda, uno de los principales exchanges de criptomonedas en Latinoamérica. Incluye funcionalidades para trading, consultas de mercado, gestión de órdenes y más.'
            },
            kapsoClient: {
                title: 'Kapso Client Ruby',
                description: 'SDK no oficial de Ruby para la plataforma kapso.ai. Cliente completo para interactuar con los servicios de IA.',
                fullDescription: 'SDK de Ruby para la plataforma kapso.ai que proporciona una interfaz simple y eficiente para interactuar con servicios de inteligencia artificial, procesamiento de lenguaje natural y más capacidades de la plataforma.'
            },
            ytwrapper: {
                title: 'YTWrapper',
                description: 'Wrapper de Ruby para interactuar con servicios relacionados a YouTube. Simplifica operaciones comunes y consultas.',
                fullDescription: 'Librería de Ruby que actúa como wrapper para facilitar la interacción con servicios de YouTube, simplificando operaciones comunes como búsquedas, obtención de información de videos, gestión de playlists y más.'
            },
            portfolio: {
                title: 'Portfolio Personal',
                description: 'Portfolio personal desarrollado con Next.js, TypeScript y Tailwind CSS. Incluye animaciones fluidas y modo oscuro.',
                fullDescription: 'Portfolio moderno y responsivo con animaciones suaves, cambio de tema, internacionalización y optimizaciones de rendimiento. Desplegado en Vercel con CI/CD automatizado.'
            },
            arbolFamiliar: {
                title: 'Árbol Familiar',
                description: 'Sitio web de árbol genealógico con visualización interactiva, gestión de miembros y relaciones familiares.',
                fullDescription: 'Aplicación web moderna para crear y gestionar árboles genealógicos. Incluye autenticación con Supabase, visualización interactiva de árboles familiares con animaciones, gestión de miembros con información detallada, relaciones familiares y modo oscuro. Ideal para preservar historias familiares.'
            },
            frutify: {
                title: 'Frutify',
                description: 'Plataforma e-commerce para fruterías locales con gestión de inventario, pedidos y pagos con Stripe.',
                fullDescription: 'Plataforma completa de e-commerce diseñada específicamente para fruterías y PYMEs locales en Chile. Incluye catálogo de productos con gestión de inventario, carrito de compras, procesamiento de pagos con Stripe, panel de administración, gestión de pedidos y más. Construida con las mejores prácticas de desarrollo moderno.'
            },
            mcshop: {
                title: 'MCShop',
                description: 'Tienda e-commerce para plugins de Minecraft con autenticación, pagos integrados y gestión de licencias.',
                fullDescription: 'Plataforma completa de e-commerce especializada en la venta de plugins para servidores de Minecraft. Incluye autenticación con validación de usuario de Minecraft (Mojang API), integración completa con Flow.cl para procesamiento de pagos, sistema de gestión de plugins con versionado, generación de enlaces de descarga seguros (one-time use), dashboard de usuario y administración, sistema de licencias, rate limiting, logs de auditoría y almacenamiento seguro de archivos .jar en Supabase Storage.'
            }
        },
        certificatesData: {
            rubyComplete: {
                courseName: 'Curso Profesional de Ruby'
            },
            ruby2: {
                courseName: 'Ruby - Programación Completa'
            },
            javaComplete: {
                courseName: 'Java - Desarrollo Completo'
            },
            IAComplete: {
                courseName: 'Inteligencia Artificial - Fundamentos'
            }
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            projects: 'Projects',
            experience: 'Experience',
            contact: 'Contact',
            admin: 'Admin',
            minecraft: '🎮 Minecraft',
            services: '💼 Services'
        },
        hero: {
            greeting: 'Hello! I am',
            name: 'Pablo Blanco Navarro',
            title: 'Full Stack Developer & Game Scripter',
            subtitle: 'Full Stack Developer and video game scripter passionate about creating exceptional digital experiences',
            cta: 'View my work',
            contact: 'Contact',
            downloadCV: 'Download CV'
        },
        about: {
            title: 'About me',
            description: 'Passionate Full Stack developer with experience in web development and video game scripting. I specialize in creating modern and scalable web applications that combine attractive design with robust functionality.',
            additionalText: 'My passion for technology drives me to stay updated with the latest trends and best practices in web development.',
            whyWorkWithMe: 'Why work with me?',
            fastDelivery: 'Fast Delivery',
            fastDeliveryDesc: 'Agile development with frequent deliveries and constant communication.',
            innovativeSolutions: 'Innovative Solutions',
            innovativeSolutionsDesc: 'Creative approach to solve complex problems with elegance.',
            technologies: 'Technologies'
        },
        projects: {
            title: 'My projects',
            subtitle: 'Some of my most recent work',
            viewAll: 'View all projects',
            viewProject: 'View project',
            sourceCode: 'Source code',
            liveDemo: 'Live demo',
            technologies: 'Technologies',
            filters: {
                all: 'All',
                featured: 'Featured',
                rubyGems: 'Ruby Gems',
                webApps: 'Web Apps',
                wordpress: 'WordPress',
                minecraft: 'Minecraft',
                rails: 'Rails',
                nextjs: 'Next.js'
            },
            emptyState: 'No projects to show',
            emptyStateDesc: 'Amazing new projects coming soon'
        },
        experience: {
            title: 'Professional experience',
            technologies: 'Technologies used'
        },
        certificates: {
            title: 'Certificates',
            subtitle: 'Completed courses and certifications',
            viewCertificate: 'View certificate',
            issuedBy: 'Issued by',
            completedIn: 'Completed in'
        },
        contact: {
            title: 'Contact me',
            subtitle: 'Have a project in mind? Let\'s talk!',
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message',
            send: 'Send message',
            sending: 'Sending...',
            success: 'Message sent successfully',
            error: 'Error sending message'
        },
        ai: {
            title: 'AI Assistant',
            placeholder: 'Ask me something about my experience...',
            send: 'Send',
            thinking: 'Thinking...',
            error: 'Error processing response'
        },
        footer: {
            rights: 'All rights reserved',
            madeWith: 'Made with',
            and: 'and'
        },
        minecraft: {
            title: 'Minecraft Projects',
            description: 'Shortcuts to featured Minecraft-related projects.',
            technologies: 'Technologies',
            projects: {
                townyFaith: 'TownyFaith',
                hytaleChile: 'Hytale Chile',
                visit: 'Visit site'
            }
        },
        services: {
            hero: {
                title: 'Minecraft Services',
                subtitle: 'Professional plugin development, server configuration and custom systems for your Minecraft server',
                cta: 'View Services'
            },
            title: 'Available Services',
            subtitle: 'Complete solutions for your Minecraft server',
            technologies: {
                title: 'Technologies',
                subtitle: 'Technology stack I use in my projects'
            },
            testimonials: {
                title: 'Testimonials',
                subtitle: 'What my clients say'
            },
            cta: {
                title: 'Ready to improve your server?',
                subtitle: 'Contact me to discuss your project and get a personalized quote',
                button: 'Contact Now'
            },
            serviceItems: {
                pluginDevelopment: {
                    title: 'Plugin Development',
                    description: 'Custom plugins for Minecraft servers with unique and optimized features.',
                    features: [
                        'Bukkit/Spigot',
                        'Paper API',
                        'NMS/Reflection',
                        'Performance optimization'
                    ]
                },
                serverSetup: {
                    title: 'Server Configuration',
                    description: 'Complete Minecraft server setup with all necessary configurations.',
                    features: [
                        'Installation and configuration',
                        'Server optimization',
                        'Automatic backups',
                        'Monitoring'
                    ]
                },
                database: {
                    title: 'Database Systems',
                    description: 'Implementation of efficient storage systems for player and server data.',
                    features: [
                        'MySQL/PostgreSQL',
                        'Redis Cache',
                        'MongoDB',
                        'Economy systems'
                    ]
                },
                security: {
                    title: 'Security Systems',
                    description: 'Advanced protection against hacks, exploits and unwanted behavior.',
                    features: [
                        'Custom anti-cheat',
                        'Moderation systems',
                        'Logs and auditing',
                        'DDoS protection'
                    ]
                },
                optimization: {
                    title: 'Performance Optimization',
                    description: 'Server performance improvement to handle more simultaneous players.',
                    features: [
                        'Profiling and analysis',
                        'Code optimization',
                        'Lag reduction',
                        'Smart chunk loading'
                    ]
                },
                multiplayer: {
                    title: 'Multiplayer Systems',
                    description: 'Development of complex systems for player interaction.',
                    features: [
                        'Clan systems',
                        'Economy and trading',
                        'Ranking systems',
                        'Automatic events'
                    ]
                }
            },
            testimonialsItems: {
                testimonial1: {
                    name: 'Anonymous Server',
                    role: 'Server Administrator',
                    content: 'Excellent work on custom plugin development. Very professional and efficient.'
                },
                testimonial2: {
                    name: 'Satisfied Client',
                    role: 'Server Owner',
                    content: 'The server optimization was incredible. We went from 50 to 100 players without problems.'
                }
            }
        },
        projectData: {
            kickwp: {
                title: 'KickWP',
                description: 'WordPress plugin using kick.com API to display real-time channel information and more features.',
                fullDescription: 'Complete WordPress plugin that integrates with kick.com API to display real-time streaming channel information, viewer statistics, stream status, and more advanced features for streamers.'
            },
            orionxSdk: {
                title: 'Orionx SDK Ruby',
                description: 'Unofficial Ruby SDK for orionx platform. Complete interface to interact with the cryptocurrency exchange.',
                fullDescription: 'Complete Ruby SDK that provides a clean and easy-to-use interface to interact with the orionx platform. Includes methods for trading, market queries, order management, and more.'
            },
            budaApi: {
                title: 'Buda API Ruby',
                description: 'Unofficial Ruby SDK for Buda cryptocurrency exchange. Complete interface for trading and market queries.',
                fullDescription: 'Complete Ruby SDK to interact with Buda API, one of the main cryptocurrency exchanges in Latin America. Includes features for trading, market queries, order management, and more.'
            },
            kapsoClient: {
                title: 'Kapso Client Ruby',
                description: 'Unofficial Ruby SDK for kapso.ai platform. Complete client to interact with AI services.',
                fullDescription: 'Ruby SDK for kapso.ai platform that provides a simple and efficient interface to interact with artificial intelligence services, natural language processing, and more platform capabilities.'
            },
            ytwrapper: {
                title: 'YTWrapper',
                description: 'Ruby wrapper to interact with YouTube-related services. Simplifies common operations and queries.',
                fullDescription: 'Ruby library that acts as a wrapper to facilitate interaction with YouTube services, simplifying common operations such as searches, video information retrieval, playlist management, and more.'
            },
            portfolio: {
                title: 'Personal Portfolio',
                description: 'Personal portfolio developed with Next.js, TypeScript, and Tailwind CSS. Includes smooth animations and dark mode.',
                fullDescription: 'Modern and responsive portfolio with smooth animations, theme switching, internationalization, and performance optimizations. Deployed on Vercel with automated CI/CD.'
            },
            arbolFamiliar: {
                title: 'Family Tree',
                description: 'Genealogical tree website with interactive visualization, member management and family relationships.',
                fullDescription: 'Modern web application to create and manage family trees. Includes authentication with Supabase, interactive family tree visualization with animations, member management with detailed information, family relationships and dark mode. Ideal for preserving family histories.'
            },
            frutify: {
                title: 'Frutify',
                description: 'E-commerce platform for local fruit stores with inventory management, orders and Stripe payments.',
                fullDescription: 'Complete e-commerce platform specifically designed for fruit stores and local SMEs in Chile. Includes product catalog with inventory management, shopping cart, payment processing with Stripe, admin panel, order management and more. Built with modern development best practices.'
            },
            mcshop: {
                title: 'MCShop',
                description: 'E-commerce store for Minecraft plugins with authentication, integrated payments and license management.',
                fullDescription: 'Complete e-commerce platform specialized in selling plugins for Minecraft servers. Includes authentication with Minecraft user validation (Mojang API), complete integration with Flow.cl for payment processing, plugin management system with versioning, secure download link generation (one-time use), user and admin dashboard, license system, rate limiting, audit logs and secure .jar file storage in Supabase Storage.'
            }
        },
        certificatesData: {
            rubyComplete: {
                courseName: 'Professional Ruby Course'
            },
            ruby2: {
                courseName: 'Ruby - Complete Programming'
            },
            javaComplete: {
                courseName: 'Java - Complete Development'
            },
            IAComplete: {
                courseName: 'Artificial Intelligence - Fundamentals'
            }
        }
    },
    pt: {
        nav: {
            home: 'Início',
            about: 'Sobre',
            projects: 'Projetos',
            experience: 'Experiência',
            contact: 'Contato',
            admin: 'Admin',
            minecraft: '🎮 Minecraft',
            services: '💼 Serviços'
        },
        hero: {
            greeting: 'Olá! Eu sou',
            name: 'Pablo Blanco Navarro',
            title: 'Full Stack Developer & Game Scripter',
            subtitle: 'Desenvolvedor Full Stack e scripter de videogames apaixonado por criar experiências digitais excepcionais',
            cta: 'Ver meu trabalho',
            contact: 'Contato',
            downloadCV: 'Baixar CV'
        },
        about: {
            title: 'Sobre mim',
            description: 'Desenvolvedor Full Stack apaixonado com experiência em desenvolvimento web e scripting de videogames. Especializo-me em criar aplicações web modernas e escaláveis que combinam design atraente com funcionalidade robusta.',
            additionalText: 'Minha paixão pela tecnologia me impulsiona a me manter atualizado com as últimas tendências e melhores práticas em desenvolvimento web.',
            whyWorkWithMe: 'Por que trabalhar comigo?',
            fastDelivery: 'Entrega Rápida',
            fastDeliveryDesc: 'Desenvolvimento ágil com entregas frequentes e comunicação constante.',
            innovativeSolutions: 'Soluções Inovadoras',
            innovativeSolutionsDesc: 'Abordagem criativa para resolver problemas complexos com elegância.',
            technologies: 'Tecnologias'
        },
        projects: {
            title: 'Meus projetos',
            subtitle: 'Alguns dos meus trabalhos mais recentes',
            viewAll: 'Ver todos os projetos',
            viewProject: 'Ver projeto',
            sourceCode: 'Código fonte',
            liveDemo: 'Demo ao vivo',
            technologies: 'Tecnologias',
            filters: {
                all: 'Todos',
                featured: 'Destacados',
                rubyGems: 'Gems Ruby',
                webApps: 'Aplicações Web',
                wordpress: 'WordPress',
                minecraft: 'Minecraft',
                rails: 'Rails',
                nextjs: 'Next.js'
            },
            emptyState: 'Nenhum projeto para mostrar',
            emptyStateDesc: 'Novos projetos incríveis em breve'
        },
        experience: {
            title: 'Experiência profissional',
            technologies: 'Tecnologias utilizadas'
        },
        certificates: {
            title: 'Certificados',
            subtitle: 'Cursos e certificações concluídas',
            viewCertificate: 'Ver certificado',
            issuedBy: 'Emitido por',
            completedIn: 'Concluído em'
        },
        contact: {
            title: 'Entre em contato',
            subtitle: 'Tem um projeto em mente? Vamos conversar!',
            name: 'Nome',
            email: 'Email',
            subject: 'Assunto',
            message: 'Mensagem',
            send: 'Enviar mensagem',
            sending: 'Enviando...',
            success: 'Mensagem enviada com sucesso',
            error: 'Erro ao enviar mensagem'
        },
        ai: {
            title: 'Assistente IA',
            placeholder: 'Pergunte-me algo sobre minha experiência...',
            send: 'Enviar',
            thinking: 'Pensando...',
            error: 'Erro ao processar resposta'
        },
        footer: {
            rights: 'Todos os direitos reservados',
            madeWith: 'Feito com',
            and: 'e'
        },
        minecraft: {
            title: 'Projetos Minecraft',
            description: 'Acessos diretos a projetos em destaque relacionados ao Minecraft.',
            technologies: 'Tecnologias',
            projects: {
                townyFaith: 'TownyFaith',
                hytaleChile: 'Hytale Chile',
                visit: 'Visitar site'
            }
        },
        services: {
            hero: {
                title: 'Serviços de Minecraft',
                subtitle: 'Desenvolvimento profissional de plugins, configuração de servidores e sistemas personalizados para seu servidor de Minecraft',
                cta: 'Ver Serviços'
            },
            title: 'Serviços Disponíveis',
            subtitle: 'Soluções completas para seu servidor de Minecraft',
            technologies: {
                title: 'Tecnologias',
                subtitle: 'Stack tecnológico que uso em meus projetos'
            },
            testimonials: {
                title: 'Depoimentos',
                subtitle: 'O que meus clientes dizem'
            },
            cta: {
                title: 'Pronto para melhorar seu servidor?',
                subtitle: 'Entre em contato para discutir seu projeto e obter um orçamento personalizado',
                button: 'Contatar Agora'
            },
            serviceItems: {
                pluginDevelopment: {
                    title: 'Desenvolvimento de Plugins',
                    description: 'Plugins personalizados para servidores de Minecraft com funcionalidades únicas e otimizadas.',
                    features: [
                        'Bukkit/Spigot',
                        'Paper API',
                        'NMS/Reflection',
                        'Otimização de desempenho'
                    ]
                },
                serverSetup: {
                    title: 'Configuração de Servidores',
                    description: 'Configuração completa de servidores Minecraft com todas as configurações necessárias.',
                    features: [
                        'Instalação e configuração',
                        'Otimização de servidor',
                        'Backups automáticos',
                        'Monitoramento'
                    ]
                },
                database: {
                    title: 'Sistemas de Banco de Dados',
                    description: 'Implementação de sistemas de armazenamento eficientes para dados de jogadores e servidor.',
                    features: [
                        'MySQL/PostgreSQL',
                        'Redis Cache',
                        'MongoDB',
                        'Sistemas de economia'
                    ]
                },
                security: {
                    title: 'Sistemas de Segurança',
                    description: 'Proteção avançada contra hacks, exploits e comportamentos indesejados.',
                    features: [
                        'Anti-cheat personalizado',
                        'Sistemas de moderação',
                        'Logs e auditoria',
                        'Proteção DDoS'
                    ]
                },
                optimization: {
                    title: 'Otimização de Desempenho',
                    description: 'Melhoria do desempenho do servidor para lidar com mais jogadores simultâneos.',
                    features: [
                        'Profiling e análise',
                        'Otimização de código',
                        'Redução de lag',
                        'Carregamento inteligente de chunks'
                    ]
                },
                multiplayer: {
                    title: 'Sistemas Multiplayer',
                    description: 'Desenvolvimento de sistemas complexos para interação entre jogadores.',
                    features: [
                        'Sistemas de clãs',
                        'Economia e comércio',
                        'Sistemas de ranking',
                        'Eventos automáticos'
                    ]
                }
            },
            testimonialsItems: {
                testimonial1: {
                    name: 'Servidor Anônimo',
                    role: 'Administrador de Servidor',
                    content: 'Excelente trabalho no desenvolvimento de plugins personalizados. Muito profissional e eficiente.'
                },
                testimonial2: {
                    name: 'Cliente Satisfeito',
                    role: 'Proprietário de Servidor',
                    content: 'A otimização do servidor foi incrível. Passamos de 50 para 100 jogadores sem problemas.'
                }
            }
        },
        projectData: {
            kickwp: {
                title: 'KickWP',
                description: 'Plugin WordPress usando API kick.com para exibir informações do canal em tempo real e mais recursos.',
                fullDescription: 'Plugin WordPress completo que se integra com a API kick.com para exibir informações de canais de streaming em tempo real, estatísticas de viewers, status da stream e mais recursos avançados para streamers.'
            },
            orionxSdk: {
                title: 'Orionx SDK Ruby',
                description: 'SDK Ruby não oficial para plataforma orionx. Interface completa para interagir com a exchange de criptomoedas.',
                fullDescription: 'SDK Ruby completo que fornece uma interface limpa e fácil de usar para interagir com a plataforma orionx. Inclui métodos para trading, consultas de mercado, gestão de ordens e mais.'
            },
            budaApi: {
                title: 'Buda API Ruby',
                description: 'SDK Ruby não oficial para exchange de criptomoedas Buda. Interface completa para trading e consultas de mercado.',
                fullDescription: 'SDK Ruby completo para interagir com a API Buda, uma das principais exchanges de criptomoedas na América Latina. Inclui funcionalidades para trading, consultas de mercado, gestão de ordens e mais.'
            },
            kapsoClient: {
                title: 'Kapso Client Ruby',
                description: 'SDK Ruby não oficial para plataforma kapso.ai. Cliente completo para interagir com serviços de IA.',
                fullDescription: 'SDK Ruby para plataforma kapso.ai que fornece uma interface simples e eficiente para interagir com serviços de inteligência artificial, processamento de linguagem natural e mais capacidades da plataforma.'
            },
            ytwrapper: {
                title: 'YTWrapper',
                description: 'Wrapper Ruby para interagir com serviços relacionados ao YouTube. Simplifica operações comuns e consultas.',
                fullDescription: 'Biblioteca Ruby que atua como wrapper para facilitar a interação com serviços do YouTube, simplificando operações comuns como buscas, obtenção de informações de vídeos, gestão de playlists e mais.'
            },
            portfolio: {
                title: 'Portfólio Pessoal',
                description: 'Portfólio pessoal desenvolvido com Next.js, TypeScript e Tailwind CSS. Inclui animações suaves e modo escuro.',
                fullDescription: 'Portfólio moderno e responsivo com animações suaves, troca de tema, internacionalização e otimizações de desempenho. Implantado na Vercel com CI/CD automatizado.'
            },
            arbolFamiliar: {
                title: 'Árvore Genealógica',
                description: 'Site de árvore genealógica com visualização interativa, gestão de membros e relações familiares.',
                fullDescription: 'Aplicação web moderna para criar e gerir árvores genealógicas. Inclui autenticação com Supabase, visualização interativa de árvores familiares com animações, gestão de membros com informação detalhada, relações familiares e modo escuro. Ideal para preservar histórias familiares.'
            },
            frutify: {
                title: 'Frutify',
                description: 'Plataforma e-commerce para frutarias locais com gestão de inventário, pedidos e pagamentos com Stripe.',
                fullDescription: 'Plataforma completa de e-commerce especificamente projetada para frutarias e PMEs locais no Chile. Inclui catálogo de produtos com gestão de inventário, carrinho de compras, processamento de pagamentos com Stripe, painel de administração, gestão de pedidos e mais. Construída com as melhores práticas de desenvolvimento moderno.'
            },
            mcshop: {
                title: 'MCShop',
                description: 'Loja e-commerce para plugins de Minecraft com autenticação, pagamentos integrados e gestão de licenças.',
                fullDescription: 'Plataforma completa de e-commerce especializada na venda de plugins para servidores de Minecraft. Inclui autenticação com validação de usuário de Minecraft (Mojang API), integração completa com Flow.cl para processamento de pagamentos, sistema de gestão de plugins com versionamento, geração de links de download seguros (uso único), dashboard de usuário e administração, sistema de licenças, rate limiting, logs de auditoria e armazenamento seguro de arquivos .jar no Supabase Storage.'
            }
        },
        certificatesData: {
            rubyComplete: {
                courseName: 'Curso Profissional de Ruby'
            },
            ruby2: {
                courseName: 'Ruby - Programação Completa'
            },
            javaComplete: {
                courseName: 'Java - Desenvolvimento Completo'
            },
            IAComplete: {
                courseName: 'Inteligência Artificial - Fundamentos'
            }
        }
    },
    de: {
        nav: {
            home: 'Startseite',
            about: 'Über',
            projects: 'Projekte',
            experience: 'Erfahrung',
            contact: 'Kontakt',
            admin: 'Admin',
            minecraft: '🎮 Minecraft',
            services: '💼 Dienstleistungen'
        },
        hero: {
            greeting: 'Hallo! Ich bin',
            name: 'Pablo Blanco Navarro',
            title: 'Full Stack Developer & Game Scripter',
            subtitle: 'Full Stack Entwickler und Videospiel-Scripter mit Leidenschaft für außergewöhnliche digitale Erlebnisse',
            cta: 'Meine Arbeit ansehen',
            contact: 'Kontakt',
            downloadCV: 'Lebenslauf herunterladen'
        },
        about: {
            title: 'Über mich',
            description: 'Leidenschaftlicher Full-Stack-Entwickler mit Erfahrung in Webentwicklung und Videospiel-Scripting. Ich spezialisiere mich auf die Entwicklung moderner und skalierbarer Webanwendungen, die attraktives Design mit robuster Funktionalität kombinieren.',
            additionalText: 'Meine Leidenschaft für Technologie treibt mich an, mit den neuesten Trends und Best Practices in der Webentwicklung auf dem Laufenden zu bleiben.',
            whyWorkWithMe: 'Warum mit mir arbeiten?',
            fastDelivery: 'Schnelle Lieferung',
            fastDeliveryDesc: 'Agile Entwicklung mit häufigen Lieferungen und konstanter Kommunikation.',
            innovativeSolutions: 'Innovative Lösungen',
            innovativeSolutionsDesc: 'Kreativer Ansatz zur eleganten Lösung komplexer Probleme.',
            technologies: 'Technologien'
        },
        projects: {
            title: 'Meine Projekte',
            subtitle: 'Einige meiner neuesten Arbeiten',
            viewAll: 'Alle Projekte ansehen',
            viewProject: 'Projekt ansehen',
            sourceCode: 'Quellcode',
            liveDemo: 'Live-Demo',
            technologies: 'Technologien',
            filters: {
                all: 'Alle',
                featured: 'Hervorgehoben',
                rubyGems: 'Ruby Gems',
                webApps: 'Webanwendungen',
                wordpress: 'WordPress',
                minecraft: 'Minecraft',
                rails: 'Rails',
                nextjs: 'Next.js'
            },
            emptyState: 'Keine Projekte zum Anzeigen',
            emptyStateDesc: 'Bald kommen tolle neue Projekte'
        },
        experience: {
            title: 'Berufserfahrung',
            technologies: 'Verwendete Technologien'
        },
        certificates: {
            title: 'Zertifikate',
            subtitle: 'Abgeschlossene Kurse und Zertifizierungen',
            viewCertificate: 'Zertifikat anzeigen',
            issuedBy: 'Ausgestellt von',
            completedIn: 'Abgeschlossen in'
        },
        contact: {
            title: 'Kontaktieren Sie mich',
            subtitle: 'Haben Sie ein Projekt im Kopf? Lassen Sie uns reden!',
            name: 'Name',
            email: 'E-Mail',
            subject: 'Betreff',
            message: 'Nachricht',
            send: 'Nachricht senden',
            sending: 'Wird gesendet...',
            success: 'Nachricht erfolgreich gesendet',
            error: 'Fehler beim Senden der Nachricht'
        },
        ai: {
            title: 'KI-Assistent',
            placeholder: 'Frag mich etwas über meine Erfahrung...',
            send: 'Senden',
            thinking: 'Denke nach...',
            error: 'Fehler bei der Verarbeitung der Antwort'
        },
        footer: {
            rights: 'Alle Rechte vorbehalten',
            madeWith: 'Gemacht mit',
            and: 'und'
        },
        minecraft: {
            title: 'Minecraft-Projekte',
            description: 'Direkte Links zu hervorgehobenen Minecraft-Projekten.',
            technologies: 'Technologien',
            projects: {
                townyFaith: 'TownyFaith',
                hytaleChile: 'Hytale Chile',
                visit: 'Website besuchen'
            }
        },
        services: {
            hero: {
                title: 'Minecraft Dienstleistungen',
                subtitle: 'Professionelle Plugin-Entwicklung, Server-Konfiguration und benutzerdefinierte Systeme für Ihren Minecraft-Server',
                cta: 'Dienstleistungen ansehen'
            },
            title: 'Verfügbare Dienstleistungen',
            subtitle: 'Vollständige Lösungen für Ihren Minecraft-Server',
            technologies: {
                title: 'Technologien',
                subtitle: 'Technologie-Stack, den ich in meinen Projekten verwende'
            },
            testimonials: {
                title: 'Testimonials',
                subtitle: 'Was meine Kunden sagen'
            },
            cta: {
                title: 'Bereit, Ihren Server zu verbessern?',
                subtitle: 'Kontaktieren Sie mich, um Ihr Projekt zu besprechen und ein personalisiertes Angebot zu erhalten',
                button: 'Jetzt kontaktieren'
            },
            serviceItems: {
                pluginDevelopment: {
                    title: 'Plugin-Entwicklung',
                    description: 'Benutzerdefinierte Plugins für Minecraft-Server mit einzigartigen und optimierten Funktionen.',
                    features: [
                        'Bukkit/Spigot',
                        'Paper API',
                        'NMS/Reflection',
                        'Leistungsoptimierung'
                    ]
                },
                serverSetup: {
                    title: 'Server-Konfiguration',
                    description: 'Vollständige Minecraft-Server-Einrichtung mit allen notwendigen Konfigurationen.',
                    features: [
                        'Installation und Konfiguration',
                        'Server-Optimierung',
                        'Automatische Backups',
                        'Überwachung'
                    ]
                },
                database: {
                    title: 'Datenbanksysteme',
                    description: 'Implementierung effizienter Speichersysteme für Spieler- und Serverdaten.',
                    features: [
                        'MySQL/PostgreSQL',
                        'Redis Cache',
                        'MongoDB',
                        'Wirtschaftssysteme'
                    ]
                },
                security: {
                    title: 'Sicherheitssysteme',
                    description: 'Erweiterter Schutz vor Hacks, Exploits und unerwünschtem Verhalten.',
                    features: [
                        'Benutzerdefiniertes Anti-Cheat',
                        'Moderationssysteme',
                        'Protokolle und Auditierung',
                        'DDoS-Schutz'
                    ]
                },
                optimization: {
                    title: 'Leistungsoptimierung',
                    description: 'Server-Leistungsverbesserung zur Handhabung von mehr gleichzeitigen Spielern.',
                    features: [
                        'Profiling und Analyse',
                        'Code-Optimierung',
                        'Lag-Reduzierung',
                        'Intelligentes Chunk-Laden'
                    ]
                },
                multiplayer: {
                    title: 'Multiplayer-Systeme',
                    description: 'Entwicklung komplexer Systeme für Spielerinteraktion.',
                    features: [
                        'Clan-Systeme',
                        'Wirtschaft und Handel',
                        'Ranking-Systeme',
                        'Automatische Events'
                    ]
                }
            },
            testimonialsItems: {
                testimonial1: {
                    name: 'Anonymer Server',
                    role: 'Server-Administrator',
                    content: 'Ausgezeichnete Arbeit bei der Entwicklung benutzerdefinierter Plugins. Sehr professionell und effizient.'
                },
                testimonial2: {
                    name: 'Zufriedener Kunde',
                    role: 'Server-Besitzer',
                    content: 'Die Server-Optimierung war unglaublich. Wir gingen von 50 auf 100 Spieler ohne Probleme.'
                }
            }
        },
        projectData: {
            kickwp: {
                title: 'KickWP',
                description: 'WordPress-Plugin mit kick.com API zur Anzeige von Echtzeit-Kanalinformationen und weiteren Funktionen.',
                fullDescription: 'Vollständiges WordPress-Plugin, das sich mit der kick.com API integriert, um Echtzeit-Streaming-Kanalinformationen, Zuschauer-Statistiken, Stream-Status und weitere erweiterte Funktionen für Streamer anzuzeigen.'
            },
            orionxSdk: {
                title: 'Orionx SDK Ruby',
                description: 'Inoffizielles Ruby SDK für orionx-Plattform. Vollständige Schnittstelle zur Interaktion mit der Kryptowährungsbörse.',
                fullDescription: 'Vollständiges Ruby SDK, das eine saubere und einfach zu bedienende Schnittstelle zur Interaktion mit der orionx-Plattform bietet. Enthält Methoden für Handel, Marktabfragen, Auftragsverwaltung und mehr.'
            },
            budaApi: {
                title: 'Buda API Ruby',
                description: 'Inoffizielles Ruby SDK für Buda Kryptowährungsbörse. Vollständige Schnittstelle für Handel und Marktabfragen.',
                fullDescription: 'Vollständiges Ruby SDK zur Interaktion mit der Buda API, einer der wichtigsten Kryptowährungsbörsen in Lateinamerika. Enthält Funktionen für Handel, Marktabfragen, Auftragsverwaltung und mehr.'
            },
            kapsoClient: {
                title: 'Kapso Client Ruby',
                description: 'Inoffizielles Ruby SDK für kapso.ai-Plattform. Vollständiger Client zur Interaktion mit KI-Diensten.',
                fullDescription: 'Ruby SDK für die kapso.ai-Plattform, das eine einfache und effiziente Schnittstelle zur Interaktion mit künstlicher Intelligenz, natürlicher Sprachverarbeitung und weiteren Plattformfähigkeiten bietet.'
            },
            ytwrapper: {
                title: 'YTWrapper',
                description: 'Ruby-Wrapper zur Interaktion mit YouTube-bezogenen Diensten. Vereinfacht gängige Operationen und Abfragen.',
                fullDescription: 'Ruby-Bibliothek, die als Wrapper fungiert, um die Interaktion mit YouTube-Diensten zu erleichtern und gängige Operationen wie Suchen, Abrufen von Videoinformationen, Playlist-Verwaltung und mehr zu vereinfachen.'
            },
            portfolio: {
                title: 'Persönliches Portfolio',
                description: 'Persönliches Portfolio entwickelt mit Next.js, TypeScript und Tailwind CSS. Enthält flüssige Animationen und Dunkelmodus.',
                fullDescription: 'Modernes und responsives Portfolio mit sanften Animationen, Themenwechsel, Internationalisierung und Leistungsoptimierungen. Bereitgestellt auf Vercel mit automatisiertem CI/CD.'
            },
            arbolFamiliar: {
                title: 'Stammbaum',
                description: 'Genealogie-Website mit interaktiver Visualisierung, Mitgliederverwaltung und Familienbeziehungen.',
                fullDescription: 'Moderne Webanwendung zum Erstellen und Verwalten von Stammbäumen. Enthält Authentifizierung mit Supabase, interaktive Stammbaum-Visualisierung mit Animationen, Mitgliederverwaltung mit detaillierten Informationen, Familienbeziehungen und Dunkelmodus. Ideal zur Bewahrung von Familiengeschichten.'
            },
            frutify: {
                title: 'Frutify',
                description: 'E-Commerce-Plattform für lokale Obstgeschäfte mit Bestandsverwaltung, Bestellungen und Stripe-Zahlungen.',
                fullDescription: 'Vollständige E-Commerce-Plattform speziell für Obstgeschäfte und lokale KMU in Chile entwickelt. Enthält Produktkatalog mit Bestandsverwaltung, Warenkorb, Zahlungsabwicklung mit Stripe, Admin-Panel, Bestellverwaltung und mehr. Erstellt mit modernen Entwicklungs-Best-Practices.'
            },
            mcshop: {
                title: 'MCShop',
                description: 'E-Commerce-Shop für Minecraft-Plugins mit Authentifizierung, integrierten Zahlungen und Lizenzverwaltung.',
                fullDescription: 'Vollständige E-Commerce-Plattform spezialisiert auf den Verkauf von Plugins für Minecraft-Server. Enthält Authentifizierung mit Minecraft-Benutzervalidierung (Mojang API), vollständige Integration mit Flow.cl für die Zahlungsabwicklung, Plugin-Verwaltungssystem mit Versionskontrolle, sichere Download-Link-Generierung (Einmalnutzung), Benutzer- und Admin-Dashboard, Lizenzsystem, Rate Limiting, Audit-Protokolle und sichere .jar-Dateispeicherung in Supabase Storage.'
            }
        },
        certificatesData: {
            rubyComplete: {
                courseName: 'Professioneller Ruby-Kurs'
            },
            ruby2: {
                courseName: 'Ruby - Vollständige Programmierung'
            },
            javaComplete: {
                courseName: 'Java - Vollständige Entwicklung'
            },
            IAComplete: {
                courseName: 'Künstliche Intelligenz - Grundlagen'
            }
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/LanguageContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const useLanguage = ()=>{
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
_s(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const languages = [
    {
        code: 'es',
        name: 'Español',
        flag: '🇪🇸'
    },
    {
        code: 'en',
        name: 'English',
        flag: '🇺🇸'
    },
    {
        code: 'pt',
        name: 'Português',
        flag: '🇧🇷'
    },
    {
        code: 'de',
        name: 'Deutsch',
        flag: '🇩🇪'
    }
];
const LanguageProvider = ({ children })=>{
    _s1();
    const [currentLanguage, setCurrentLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(languages[0]); // Default to Spanish
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            setMounted(true);
            const savedLang = localStorage.getItem('language');
            const browserLang = navigator.language.split('-')[0];
            const defaultLang = languages.find({
                "LanguageProvider.useEffect": (lang)=>lang.code === browserLang
            }["LanguageProvider.useEffect"]) || languages[0];
            setCurrentLanguage(savedLang ? languages.find({
                "LanguageProvider.useEffect": (lang)=>lang.code === savedLang
            }["LanguageProvider.useEffect"]) || defaultLang : defaultLang);
        }
    }["LanguageProvider.useEffect"], []);
    const setLanguage = (language)=>{
        setCurrentLanguage(language);
        if (mounted) {
            localStorage.setItem('language', language.code);
            document.documentElement.lang = language.code;
        }
    };
    const t = (key)=>{
        const keys = key.split('.');
        const langCode = currentLanguage.code;
        // Fallback to Spanish if language not found
        let value = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][langCode] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"]['es'];
        for (const k of keys){
            value = value?.[k];
        }
        // If translation not found, try fallback to Spanish
        if (value === undefined || value === null) {
            let fallbackValue = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"]['es'];
            for (const k of keys){
                fallbackValue = fallbackValue?.[k];
            }
            return fallbackValue !== undefined && fallbackValue !== null ? fallbackValue : key;
        }
        return value;
    };
    const tString = (key)=>{
        const result = t(key);
        return Array.isArray(result) ? result.join(', ') : result;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            currentLanguage,
            setLanguage,
            t,
            tString,
            languages
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/LanguageContext.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(LanguageProvider, "rA4QphpWlBjGeL+cYahbA/vdlxM=");
_c = LanguageProvider;
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/ThemeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/LanguageContext.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Pablo B. - Full-Stack Developer Portfolio"
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Full-stack developer specializing in React, Next.js, and modern web technologies. Explore my projects and experience."
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LanguageProvider"], {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/layout.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = RootLayout;
var _c;
__turbopack_context__.k.register(_c, "RootLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_a7877b8f._.js.map