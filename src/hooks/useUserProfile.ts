"use client";

import { useState, useEffect } from 'react';

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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const loadProfile = async () => {
    console.log('Funcionalidad de perfil deshabilitada en versión estática');
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  const updateProfile = async () => {
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  const uploadAvatar = async () => {
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  const uploadCV = async () => {
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  const deleteCV = async () => {
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  return {
    profile,
    loading,
    loadProfile,
    updateProfile,
    uploadAvatar,
    uploadCV,
    deleteCV
  };
};
