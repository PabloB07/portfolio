"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Project } from '../types';

export const useProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id,
          title,
          description,
          technologies,
          image,
          github,
          demo,
          featured,
          published,
          author_id,
          created_at,
          updated_at
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Mapear los datos de la base de datos al formato esperado
      const mappedData = (data || []).map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        image: project.image,
        github: project.github,
        demo: project.demo,
        featured: project.featured,
        published: project.published,
        createdAt: project.created_at,
        updatedAt: project.updated_at
      }));
      
      setProjects(mappedData);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return { success: false, error: 'No user authenticated' };

    try {
      const projectData = {
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        image: project.image,
        github: project.github,
        demo: project.demo,
        featured: project.featured || false,
        published: project.published || true,
        author_id: user.id,
      };

      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select(`
          id,
          title,
          description,
          technologies,
          image,
          github,
          demo,
          featured,
          published,
          author_id,
          created_at,
          updated_at
        `)
        .single();
      
      if (error) throw error;
      
      // Mapear los datos de la base de datos al formato esperado
      const mappedProject = {
        id: data.id,
        title: data.title,
        description: data.description,
        technologies: data.technologies,
        image: data.image,
        github: data.github,
        demo: data.demo,
        featured: data.featured,
        published: data.published,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
      
      setProjects(prev => [mappedProject, ...prev]);
      return { success: true, data: mappedProject };
    } catch (error) {
      console.error('Error creating project:', error);
      return { success: false, error };
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    if (!user) return { success: false, error: 'No user authenticated' };

    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .eq('author_id', user.id) // Solo el autor puede editar
        .select()
        .single();
      
      if (error) throw error;
      
      setProjects(prev => prev.map(p => p.id === id ? data : p));
      return { success: true, data };
    } catch (error) {
      console.error('Error updating project:', error);
      return { success: false, error };
    }
  };

  const deleteProject = async (id: string) => {
    if (!user) return { success: false, error: 'No user authenticated' };

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('author_id', user.id); // Solo el autor puede eliminar
      
      if (error) throw error;
      
      setProjects(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting project:', error);
      return { success: false, error };
    }
  };

  const uploadProjectImage = async (file: File, projectId?: string) => {
    if (!user) return { success: false, error: 'No user authenticated' };

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${projectId || 'temp'}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName);

      return { success: true, url: publicUrl };
    } catch (error) {
      console.error('Error uploading project image:', error);
      return { success: false, error };
    }
  };

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImage,
    loadProjects
  };
};
