"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
    enableRegistration: true,
    requireEmailVerification: true,
    enablePasswordReset: true,
    enableSocialLogin: false
  },
  general: {
    siteName: 'Portfolio',
    siteDescription: 'Mi portfolio personal',
    contactEmail: 'contact@portfolio.com'
  }
};

export const useSupabaseSettings = () => {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      
      // Cargar configuración de autenticación
      const { data: authData, error: authError } = await supabase
        .from('system_settings')
        .select('settings')
        .eq('settings_type', 'auth')
        .maybeSingle();

      if (authError) {
        console.error('Error loading auth settings:', authError);
      }

      // Cargar configuración general
      const { data: generalData, error: generalError } = await supabase
        .from('system_settings')
        .select('settings')
        .eq('settings_type', 'general')
        .maybeSingle();

      if (generalError) {
        console.error('Error loading general settings:', generalError);
      }

      const newSettings = {
        auth: authData?.settings || defaultSettings.auth,
        general: generalData?.settings || defaultSettings.general
      };

      setSettings(newSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      setSettings(defaultSettings);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAuthSettings = async (newSettings: Partial<AuthSettings>) => {
    try {
      const updatedAuthSettings = { ...settings.auth, ...newSettings };
      
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          settings_type: 'auth',
          settings: updatedAuthSettings,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'settings_type'
        });

      if (error) throw error;

      setSettings(prev => ({
        ...prev,
        auth: updatedAuthSettings
      }));

      return { success: true };
    } catch (error) {
      console.error('Error updating auth settings:', error);
      return { success: false, error };
    }
  };

  const updateGeneralSettings = async (newSettings: Partial<SystemSettings['general']>) => {
    try {
      const updatedGeneralSettings = { ...settings.general, ...newSettings };
      
      const { error } = await supabase
        .from('system_settings')
        .upsert({
          settings_type: 'general',
          settings: updatedGeneralSettings,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'settings_type'
        });

      if (error) throw error;

      setSettings(prev => ({
        ...prev,
        general: updatedGeneralSettings
      }));

      return { success: true };
    } catch (error) {
      console.error('Error updating general settings:', error);
      return { success: false, error };
    }
  };

  return {
    settings,
    isLoading,
    updateAuthSettings,
    updateGeneralSettings,
    loadSettings
  };
};
