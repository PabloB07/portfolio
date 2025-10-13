import { Project, Experience } from '../types';

export const projects: Project[] = [
  {
    id: 'ruby-gem-auth',
    title: 'AuthGuard Gem',
    description: 'Gema Ruby para autenticación y autorización simplificada en aplicaciones Rails. Incluye middleware personalizable y integración con JWT.',
    fullDescription: 'Una gema Ruby completa que proporciona un sistema de autenticación robusto y flexible para aplicaciones Rails. Incluye generadores, middleware personalizable, integración con JWT, y soporte para múltiples estrategias de autenticación.',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Ruby', 'Rails', 'JWT', 'RSpec', 'Redis'],
    github: 'https://github.com/PabloB07/authguard-gem',
    demo: '',
    status: 'completed',
    featured: true,
    published: true,
    category: 'ruby-gem'
  },
  {
    id: 'ruby-gem-api-validator',
    title: 'API Validator Gem',
    description: 'Gema para validación automática de parámetros de API REST con soporte para JSON Schema y documentación automática.',
    fullDescription: 'Herramienta que simplifica la validación de parámetros en APIs REST desarrolladas en Rails. Genera documentación automática y proporciona validaciones robustas basadas en JSON Schema.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Ruby', 'Rails', 'JSON Schema', 'Swagger', 'RDoc'],
    github: 'https://github.com/PabloB07/api-validator-gem',
    demo: '',
    status: 'completed',
    featured: true,
    published: true,
    category: 'ruby-gem'
  },
  {
    id: 'minecraft-economy-plugin',
    title: 'EconomyPro Plugin',
    description: 'Plugin de economía avanzada para servidores Minecraft con sistema bancario, tiendas automatizadas y transacciones seguras.',
    fullDescription: 'Sistema de economía completo para Minecraft que incluye bancos virtuales, tiendas automatizadas, sistema de impuestos, transacciones P2P y panel de administración web integrado.',
    image: 'https://images.unsplash.com/photo-1606181121385-b3e34d816509?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Java', 'Spigot API', 'MySQL', 'Vault API', 'Maven'],
    github: 'https://github.com/PabloB07/economy-pro-plugin',
    demo: '',
    status: 'completed',
    featured: true,
    published: true,
    category: 'minecraft-plugin'
  },
  {
    id: 'rails-ecommerce',
    title: 'Plataforma E-commerce Rails',
    description: 'Aplicación e-commerce completa desarrollada en Ruby on Rails con panel administrativo, pagos integrados y gestión de inventario.',
    fullDescription: 'Plataforma de comercio electrónico robusta con funcionalidades completas: carrito de compras, procesamiento de pagos con Stripe, gestión de inventario, sistema de usuarios y panel administrativo avanzado.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Ruby on Rails', 'PostgreSQL', 'Stripe', 'Redis', 'Sidekiq', 'AWS S3'],
    github: 'https://github.com/PabloB07/rails-ecommerce',
    demo: 'https://rails-ecommerce-demo.vercel.app',
    status: 'completed',
    featured: true,
    published: true,
    category: 'web-application'
  },
  {
    id: 'portfolio-nextjs',
    title: 'Portfolio Personal',
    description: 'Portfolio personal desarrollado con Next.js, TypeScript y Tailwind CSS. Incluye animaciones fluidas y modo oscuro.',
    fullDescription: 'Portfolio moderno y responsivo con animaciones suaves, cambio de tema, internacionalización y optimizaciones de rendimiento. Desplegado en Vercel con CI/CD automatizado.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    github: 'https://github.com/PabloB07/portfolio',
    demo: 'https://pablo-blanco.vercel.app',
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