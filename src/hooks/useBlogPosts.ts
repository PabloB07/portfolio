"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { BlogPost } from '../types';

export const useBlogPosts = () => {
  const { user } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          excerpt,
          content,
          author,
          author_id,
          published_at,
          tags,
          featured,
          published,
          image,
          created_at,
          updated_at
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Mapear los datos de la base de datos al formato esperado
      const mappedData = (data || []).map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        publishedAt: post.published_at,
        tags: post.tags,
        featured: post.featured,
        published: post.published,
        image: post.image,
        createdAt: post.created_at,
        updatedAt: post.updated_at
      }));
      
      setBlogPosts(mappedData);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBlogPost = async (post: Omit<BlogPost, 'id' | 'publishedAt' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return { success: false, error: 'No user authenticated' };

    try {
      const postData = {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        tags: post.tags,
        featured: post.featured || false,
        published: post.published || true,
        image: post.image,
        author_id: user.id,
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select(`
          id,
          title,
          excerpt,
          content,
          author,
          author_id,
          published_at,
          tags,
          featured,
          published,
          image,
          created_at,
          updated_at
        `)
        .single();
      
      if (error) throw error;
      
      // Mapear los datos de la base de datos al formato esperado
      const mappedPost = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        publishedAt: data.published_at,
        tags: data.tags,
        featured: data.featured,
        published: data.published,
        image: data.image,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
      
      setBlogPosts(prev => [mappedPost, ...prev]);
      return { success: true, data: mappedPost };
    } catch (error) {
      console.error('Error creating blog post:', error);
      return { success: false, error };
    }
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    if (!user) return { success: false, error: 'No user authenticated' };

    try {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .eq('author_id', user.id) // Solo el autor puede editar
        .select()
        .single();
      
      if (error) throw error;
      
      setBlogPosts(prev => prev.map(p => p.id === id ? data : p));
      return { success: true, data };
    } catch (error) {
      console.error('Error updating blog post:', error);
      return { success: false, error };
    }
  };

  const deleteBlogPost = async (id: string) => {
    if (!user) return { success: false, error: 'No user authenticated' };

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)
        .eq('author_id', user.id); // Solo el autor puede eliminar
      
      if (error) throw error;
      
      setBlogPosts(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return { success: false, error };
    }
  };

  const uploadBlogImage = async (file: File, postId?: string) => {
    if (!user) return { success: false, error: 'No user authenticated' };

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${postId || 'temp'}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      return { success: true, url: publicUrl };
    } catch (error) {
      console.error('Error uploading blog image:', error);
      return { success: false, error };
    }
  };

  return {
    blogPosts,
    loading,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    uploadBlogImage,
    loadBlogPosts
  };
};
