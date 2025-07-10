import { Project, Experience, BlogPost } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Plataforma de comercio electrónico completa desarrollada con Ruby on Rails y Bootstrap.',
    technologies: ['Ruby on Rails', 'Ruby', 'Bootstrap', 'HTML5'],
    image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com/pabloblanco/ecommerce',
    demo: 'https://ecommerce-demo.vercel.app',
    featured: true,
    published: true
  },
  {
    id: '2',
    title: 'Task Management System',
    description: 'Sistema de gestión de tareas con Laravel y Tailwind CSS para equipos de trabajo.',
    technologies: ['Laravel', 'Tailwind CSS', 'HTML5', 'Git'],
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    demo: 'https://tasks.fly.dev/',
    featured: true,
    published: true
  },
  {
    id: '3',
    title: 'VibeCoding Platform',
    description: 'Plataforma educativa para aprender programación con Ruby on Rails y tecnologías modernas.',
    technologies: ['Ruby on Rails', 'VibeCoding', 'Bootstrap', 'Git'],
    image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800',
    demo: 'https://vibecoding.onrender.com/',
    featured: true,
    published: true
  }
];

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Tech Solutions Chile',
    position: 'Senior Full Stack Developer',
    period: '2022 - Presente',
    description: 'Lidero el desarrollo de aplicaciones web escalables utilizando Ruby on Rails y Laravel. Gestiono un equipo de desarrolladores y colaboro directamente con stakeholders para definir arquitecturas técnicas.',
    technologies: ['Ruby on Rails', 'Laravel', 'Ruby', 'Git', 'HTML5', 'Bootstrap']
  },
  {
    id: '2',
    company: 'StartupCL',
    position: 'Full Stack Developer',
    period: '2021 - 2022',
    description: 'Desarrollé desde cero una plataforma SaaS para gestión de proyectos que alcanzó 1,000+ usuarios activos. Implementé arquitectura escalable y optimizaciones que mejoraron el rendimiento significativamente.',
    technologies: ['Ruby on Rails', 'Tailwind CSS', 'HTML5', 'Git', 'VibeCoding']
  },
  {
    id: '3',
    company: 'Digital Agency Chile',
    position: 'Frontend Developer',
    period: '2020 - 2021',
    description: 'Creé interfaces de usuario responsivas y accesibles para más de 30 clientes. Implementé sistemas de design systems y optimizaciones de performance que mejoraron las métricas de rendimiento.',
    technologies: ['HTML5', 'Bootstrap', 'Tailwind CSS', 'Git']
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Introducción a Ruby on Rails',
    excerpt: 'Aprende los fundamentos de Ruby on Rails y cómo crear tu primera aplicación web.',
    content: 'Ruby on Rails es un framework de desarrollo web que permite crear aplicaciones de manera rápida y eficiente...',
    author: 'Pablo Blanco Navarro',
    publishedAt: new Date('2024-01-15'),
    tags: ['Ruby on Rails', 'Ruby', 'Web Development'],
    featured: true,
    published: true,
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Laravel vs Ruby on Rails: Comparación',
    excerpt: 'Una comparación detallada entre dos de los frameworks más populares para desarrollo web.',
    content: 'Tanto Laravel como Ruby on Rails son frameworks excelentes para el desarrollo web...',
    author: 'Pablo Blanco Navarro',
    publishedAt: new Date('2024-01-10'),
    tags: ['Laravel', 'Ruby on Rails', 'Comparison'],
    featured: false,
    published: true,
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const personalInfo = {
  name: 'Pablo Blanco Navarro',
  title: 'Full Stack Developer',
  email: 'pablo@vibecoding.com',
  github: 'https://github.com/pabloblanco/',
  linkedin: 'https://www.linkedin.com/in/pabloblanco/',
  location: 'Chile',
  avatar: 'https://avatars.githubusercontent.com/u/pabloblanco'
};