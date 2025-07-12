import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useAuthSettings } from '../hooks/useAuthSettings';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Crear/actualizar perfil de usuario en nuestra base de datos
      if (event === 'SIGNED_IN' && session?.user) {
        await createOrUpdateUserProfile(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const createOrUpdateUserProfile = async (user: User) => {
    try {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || '',
          avatar: user.user_metadata?.avatar_url || '',
          updated_at: new Date().toISOString()
        });
      
      if (error) console.error('Error updating user profile:', error);
    } catch (error) {
      console.error('Error in createOrUpdateUserProfile:', error);
    }
  };

  const getRedirectURL = () => {
    if (typeof window !== 'undefined') {
      const isProduction = window.location.hostname !== 'localhost';
      return isProduction 
        ? 'https://blancocl.vercel.app/admin'
        : 'http://localhost:3000/admin';
    }
    return 'http://localhost:3000/admin';
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    // Redirigir al admin después del login exitoso
    if (!error && typeof window !== 'undefined') {
      window.location.href = getRedirectURL();
    }
    
    return { error };
  };

  const resetPassword = async (email: string) => {
    // Verificar si el restablecimiento está habilitado
    if (!authSettings.enablePasswordReset) {
      return { error: { message: 'Password reset is currently disabled' } };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email.toString(), {
      redirectTo: getRedirectURL(),
    });
    return { error };
  };

  const { settings: authSettings } = useAuthSettings();

  const signUp = async (email: string, password: string, fullName?: string) => {
    // Verificar si el registro está habilitado
    if (!authSettings.enableRegistration) {
      return { error: { message: 'Registration is currently disabled' } };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: authSettings.requireEmailVerification ? 
          `${window.location.origin}/auth/callback` : undefined
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    authSettings // Exponer las configuraciones
  };

  return <AuthContext.Provider value={{ ...value, session }}>{children}</AuthContext.Provider>;
};