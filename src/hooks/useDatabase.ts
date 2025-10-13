import { useState, useEffect } from 'react';

// Datos estáticos para proyectos
const staticProjects = [
  {
    id: '1',
    title: 'Portfolio Personal',
    description: 'Mi portafolio personal desarrollado con Next.js, TypeScript y Tailwind CSS.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
    image: '/projects/portfolio.jpg',
    github: 'https://github.com/usuario/portfolio',
    demo: 'https://mi-portfolio.com',
    featured: true,
    published: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

export const useProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setProjects(staticProjects);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
};
