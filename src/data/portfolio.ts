import { Project, Experience } from '../types';

// Base project data with language-agnostic fields
export const projectsBase = [
  {
    id: 'kickwp',
    translationKey: 'kickwp',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['PHP', 'WordPress', 'Kick.com API', 'JavaScript', 'CSS'],
    github: 'https://github.com/PabloB07/KickWP',
    demo: '',
    status: 'completed' as const,
    featured: true,
    published: true,
    category: 'wordpress-plugin'
  },
  {
    id: 'orionx-sdk-ruby',
    translationKey: 'orionxSdk',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Ruby', 'API REST', 'GraphQL', 'RSpec', 'Cryptocurrency'],
    github: 'https://github.com/PabloB07/orionx-sdk-ruby',
    demo: '',
    status: 'completed' as const,
    featured: true,
    published: true,
    category: 'ruby-gem'
  },
  {
    id: 'buda-api-ruby',
    translationKey: 'budaApi',
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Ruby', 'API REST', 'RSpec', 'Cryptocurrency', 'WebSocket'],
    github: 'https://github.com/PabloB07/buda-api-ruby',
    demo: '',
    status: 'completed' as const,
    featured: true,
    published: true,
    category: 'ruby-gem'
  },
  {
    id: 'kapso-client-ruby',
    translationKey: 'kapsoClient',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Ruby', 'API REST', 'AI', 'RSpec', 'JSON'],
    github: 'https://github.com/PabloB07/kapso-client-ruby',
    demo: '',
    status: 'completed' as const,
    featured: true,
    published: true,
    category: 'ruby-gem'
  },
  {
    id: 'ytwrapper',
    translationKey: 'ytwrapper',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Ruby', 'YouTube API', 'API REST', 'RSpec'],
    github: 'https://github.com/PabloB07/ytwrapper',
    demo: '',
    status: 'completed' as const,
    featured: true,
    published: true,
    category: 'ruby-gem'
  },
  {
    id: 'portfolio-nextjs',
    translationKey: 'portfolio',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    github: 'https://github.com/PabloB07/portfolio',
    demo: 'https://blancocl.vercel.app',
    status: 'completed' as const,
    featured: true,
    published: true,
    category: 'web-application'
  },
  {
    id: 'arbolfamiliar',
    translationKey: 'arbolFamiliar',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/PabloB07/arbolfamiliar',
    demo: '',
    status: 'completed' as const,
    featured: true,
    published: true,
    category: 'web-application'
  },
  {
    id: 'frutify',
    translationKey: 'frutify',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Stripe'],
    github: 'https://github.com/PabloB07/frutify',
    demo: '',
    status: 'completed' as const,
    featured: true,
    published: true,
    category: 'web-application'
  },
  {
    id: 'mcshop',
    translationKey: 'mcshop',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Flow.cl Payment Gateway', 'API REST', 'Tailwind CSS', 'Zustand'],
    github: 'https://github.com/PabloB07/mcshop',
    demo: 'https://shopmc.vercel.app',
    status: 'completed' as const,
    featured: true,
    published: true,
    category: 'web-application'
  },
  {
    id: 'mineplugins-panel',
    translationKey: 'minepluginsPanel',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Minecraft API'],
    github: 'https://github.com/PabloB07/mineplugins-panel',
    demo: '',
    status: 'completed' as const,
    featured: true,
    published: true,
    category: 'web-application'
  },
  {
    id: 'simonsays-multiarena',
    translationKey: 'simonSays',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Java', 'Spigot API', 'Paper API', 'Minigame', 'YAML'],
    github: '',
    demo: 'https://builtbybit.com/resources/simonsays-multiarena-minigame.112085/',
    status: 'completed' as const,
    featured: true,
    published: true,
    isNew: true,
    category: 'minecraft-plugin'
  }
];

// Helper function to get localized projects
export const getLocalizedProjects = (t: (key: string) => string): Project[] => {
  return projectsBase.map(project => ({
    id: project.id,
    title: t(`projectData.${project.translationKey}.title`),
    description: t(`projectData.${project.translationKey}.description`),
    fullDescription: t(`projectData.${project.translationKey}.fullDescription`),
    image: project.image,
    technologies: project.technologies,
    github: project.github,
    demo: project.demo,
    status: project.status,
    featured: project.featured,
    published: project.published,
    isNew: (project as { isNew?: boolean }).isNew,
    category: project.category
  }));
};

// Legacy export for backwards compatibility (Spanish by default)
export const projects: Project[] = [
  {
    id: 'kickwp',
    title: 'KickWP',
    description: 'Plugin de WordPress que utiliza la API de kick.com para mostrar información del canal en tiempo real y más funcionalidades.',
    fullDescription: 'Plugin completo de WordPress que se integra con la API de kick.com para mostrar información de canales de streaming en tiempo real, estadísticas de viewers, estado del stream y más características avanzadas para streamers.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['PHP', 'WordPress', 'Kick.com API', 'JavaScript', 'CSS'],
    github: 'https://github.com/PabloB07/KickWP',
    demo: '',
    status: 'completed',
    featured: true,
    published: true,
    category: 'wordpress-plugin'
  },
  {
    id: 'orionx-sdk-ruby',
    title: 'Orionx SDK Ruby',
    description: 'SDK no oficial de Ruby para la plataforma orionx. Interfaz completa para interactuar con el exchange de criptomonedas.',
    fullDescription: 'SDK completo de Ruby que proporciona una interfaz limpia y fácil de usar para interactuar con la plataforma orionx. Incluye métodos para trading, consultas de mercado, gestión de órdenes y más.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Ruby', 'API REST', 'GraphQL', 'RSpec', 'Cryptocurrency'],
    github: 'https://github.com/PabloB07/orionx-sdk-ruby',
    demo: '',
    status: 'completed',
    featured: true,
    published: true,
    category: 'ruby-gem'
  },
  {
    id: 'buda-api-ruby',
    title: 'Buda API Ruby',
    description: 'SDK no oficial de Ruby para el exchange de criptomonedas Buda. Interfaz completa para trading y consultas de mercado.',
    fullDescription: 'SDK completo de Ruby para interactuar con la API de Buda, uno de los principales exchanges de criptomonedas en Latinoamérica. Incluye funcionalidades para trading, consultas de mercado, gestión de órdenes y más.',
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Ruby', 'API REST', 'RSpec', 'Cryptocurrency', 'WebSocket'],
    github: 'https://github.com/PabloB07/buda-api-ruby',
    demo: '',
    status: 'completed',
    featured: true,
    published: true,
    category: 'ruby-gem'
  },
  {
    id: 'kapso-client-ruby',
    title: 'Kapso Client Ruby',
    description: 'SDK no oficial de Ruby para la plataforma kapso.ai. Cliente completo para interactuar con los servicios de IA.',
    fullDescription: 'SDK de Ruby para la plataforma kapso.ai que proporciona una interfaz simple y eficiente para interagir con servicios de inteligencia artificial, procesamiento de lenguaje natural y más capacidades de la plataforma.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Ruby', 'API REST', 'AI', 'RSpec', 'JSON'],
    github: 'https://github.com/PabloB07/kapso-client-ruby',
    demo: '',
    status: 'completed',
    featured: true,
    published: true,
    category: 'ruby-gem'
  },
  {
    id: 'ytwrapper',
    title: 'YTWrapper',
    description: 'Wrapper de Ruby para interactuar con servicios relacionados a YouTube. Simplifica operaciones comunes y consultas.',
    fullDescription: 'Librería de Ruby que actúa como wrapper para facilitar la interacción con servicios de YouTube, simplificando operaciones comunes como búsquedas, obtención de información de videos, gestión de playlists y más.',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Ruby', 'YouTube API', 'API REST', 'RSpec'],
    github: 'https://github.com/PabloB07/ytwrapper',
    demo: '',
    status: 'completed',
    featured: true,
    published: true,
    category: 'ruby-gem'
  },
  {
    id: 'portfolio-nextjs',
    title: 'Portfolio Personal',
    description: 'Portfolio personal desarrollado con Next.js, TypeScript y Tailwind CSS. Incluye animaciones fluidas y modo oscuro.',
    fullDescription: 'Portfolio moderno y responsivo con animaciones suaves, cambio de tema, internacionalización y optimizaciones de rendimiento. Desplegado en Vercel con CI/CD automatizado.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    github: 'https://github.com/PabloB07/portfolio',
    demo: 'https://blancocl.vercel.app',
    status: 'completed',
    featured: true,
    published: true,
    category: 'web-application'
  },
  {
    id: 'arbolfamiliar',
    title: 'Árbol Familiar',
    description: 'Sitio web de árbol genealógico con visualización interactiva, gestión de miembros y relaciones familiares.',
    fullDescription: 'Aplicación web moderna para crear y gestionar árboles genealógicos. Incluye autenticación con Supabase, visualización interactiva de árboles familiares con animaciones, gestión de miembros con información detallada, relaciones familiares y modo oscuro. Ideal para preservar historias familiares.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/PabloB07/arbolfamiliar',
    demo: '',
    status: 'completed',
    featured: true,
    published: true,
    category: 'web-application'
  },
  {
    id: 'frutify',
    title: 'Frutify',
    description: 'Plataforma e-commerce para fruterías locales con gestión de inventario, pedidos y pagos con Stripe.',
    fullDescription: 'Plataforma completa de e-commerce diseñada específicamente para fruterías y PYMEs locales en Chile. Incluye catálogo de productos con gestión de inventario, carrito de compras, procesamiento de pagos con Stripe, panel de administración, gestión de pedidos y más. Construida con las mejores prácticas de desarrollo moderno.',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Stripe'],
    github: 'https://github.com/PabloB07/frutify',
    demo: '',
    status: 'completed',
    featured: true,
    published: true,
    category: 'web-application'
  }
];

export const experiences: Experience[] = [
  {
    id: 'freelance-developer',
    company: 'Freelance Developer',
    position: 'Desarrollador Full Stack',
    period: '2023 - Presente',
    description: 'Desarrollo de aplicaciones web personalizadas para diversos clientes utilizando Ruby on Rails, Laravel y tecnologías modernas de frontend. Especialización en sistemas de gestión, e-commerce y plataformas administrativas.',
    technologies: ['Ruby on Rails', 'Laravel', 'React', 'Next.js', 'PostgreSQL', 'MySQL', 'AWS', 'Docker'],
    type: 'work'
  },
  {
    id: 'minecraft-server-dev',
    company: 'Comunidad Minecraft',
    position: 'Desarrollador de Plugins & Scripter',
    period: '2021 - 2023',
    description: 'Desarrollo y mantenimiento de plugins personalizados para servidores Minecraft. Creación de sistemas complejos de economía, PvP, y mecánicas de juego únicas que mejoraron la experiencia de miles de jugadores.',
    technologies: ['Java', 'Spigot API', 'Paper API', 'MySQL', 'Redis', 'Maven', 'Git'],
    type: 'work'
  },
  {
    id: 'web-development-studies',
    company: 'Autodidacta & Cursos Online',
    position: 'Estudiante de Desarrollo Web',
    period: '2020 - 2021',
    description: 'Formación intensiva en desarrollo web full stack a través de cursos especializados, documentación oficial y proyectos prácticos. Enfoque en Ruby on Rails, JavaScript moderno y mejores prácticas de desarrollo.',
    technologies: ['Ruby', 'Rails', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'Linux', 'PostgreSQL'],
    type: 'education'
  }
];

export const personalInfo = {
  name: 'Pablo Blanco Navarro',
  title: 'Full Stack Developer & Game Scripter',
  email: 'pablob0798@gmail.com',
  github: 'https://github.com/PabloB07',
  linkedin: 'https://www.linkedin.com/in/pabloblanco/',
  location: 'Chile',
  avatar: 'https://avatars.githubusercontent.com/u/36685434?s=400&u=8f518ea4af6f810143ff3af98c207394a8ae1c5a&v=4' // Vacío para que se maneje desde el perfil
};

export interface Certificate {
  id: string;
  translationKey: string;
  institution: string;
  date: string;
  imageUrl: string;
  certificateUrl: string;
}

// Base certificate data
export const certificatesBase = [
  {
    id: 'ruby-complete',
    translationKey: 'rubyComplete',
    institution: 'Codigofacilito',
    date: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    certificateUrl: '/certificates/ruby.pdf'
  },
  {
    id: 'ruby-2',
    translationKey: 'ruby2',
    institution: 'Udemy',
    date: '2019',
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    certificateUrl: '/certificates/ruby2.pdf'
  },
  {
    id: 'java-complete',
    translationKey: 'javaComplete',
    institution: 'Udemy',
    date: '2020',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    certificateUrl: '/certificates/java.pdf'
  },
  {
    id: 'IA-complete',
    translationKey: 'IAComplete',
    institution: 'BIG School',
    date: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    certificateUrl: '/certificates/IA.pdf'
  }
];