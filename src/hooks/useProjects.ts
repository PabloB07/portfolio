"use client";

import { useState, useEffect } from 'react';
import { Project } from '../types';

const staticProjects: Project[] = [
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setProjects(staticProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  const updateProject = async () => {
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  const deleteProject = async () => {
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  const uploadProjectImage = async () => {
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  return {
    projects,
    loading,
    loadProjects,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImage
  };
};
