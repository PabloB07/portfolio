"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  cvUrl?: string;
  cvFileName?: string;
  role: string;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }

      if (data) {
        setProfile({
          id: data.id,
          email: data.email,
          fullName: data.full_name || '',
          avatar: data.avatar,
          cvUrl: data.cv_url,
          cvFileName: data.cv_file_name,
          role: data.role
        });
      }
    } catch (error) {
      console.error('Error in loadProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { success: false, error: 'No user authenticated' };

    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: updates.fullName,
          avatar: updates.avatar,
          cv_url: updates.cvUrl,
          cv_file_name: updates.cvFileName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Actualizar estado local
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error };
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return { success: false, error: 'No user authenticated' };

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Subir archivo a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Actualizar perfil con la nueva URL
      await updateProfile({ avatar: publicUrl });

      return { success: true, url: publicUrl };
    } catch (error) {
      console.error('Error uploading avatar:', error);
      return { success: false, error };
    }
  };

  const uploadCV = async (file: File) => {
    if (!user) return { success: false, error: 'No user authenticated' };

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/cv.${fileExt}`;

      // Subir archivo a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      // Actualizar perfil con la nueva URL
      await updateProfile({ 
        cvUrl: publicUrl,
        cvFileName: file.name 
      });

      return { success: true, url: publicUrl };
    } catch (error) {
      console.error('Error uploading CV:', error);
      return { success: false, error };
    }
  };

  const changePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error changing password:', error);
      return { success: false, error };
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    uploadAvatar,
    uploadCV,
    changePassword,
    loadProfile
  };
};
