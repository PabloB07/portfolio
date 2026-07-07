"use client";

import { useState } from 'react';

interface AuthSettings {
  enableRegistration: boolean;
  requireEmailVerification: boolean;
  enablePasswordReset: boolean;
  enableSocialLogin: boolean;
}

interface SystemSettings {
  auth: AuthSettings;
  general: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
  };
}

const defaultSettings: SystemSettings = {
  auth: {
    enableRegistration: false,
    requireEmailVerification: false,
    enablePasswordReset: false,
    enableSocialLogin: false
  },
  general: {
    siteName: 'Portfolio',
    siteDescription: 'Mi portfolio personal estático',
    contactEmail: 'contact@portfolio.com'
  }
};

export const useSupabaseSettings = () => {
  const [settings] = useState<SystemSettings>(defaultSettings);
  const [isLoading] = useState(false);

  const loadSettings = async () => {
    console.log('Configuraciones deshabilitadas en versión estática');
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  const updateSettings = async () => {
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  const resetSettings = async () => {
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  const testConnection = async () => {
    return { success: false, error: 'Funcionalidad deshabilitada' };
  };

  return {
    settings,
    isLoading,
    loadSettings,
    updateSettings,
    resetSettings,
    testConnection
  };
};
