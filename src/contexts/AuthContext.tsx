import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useAuthSettings } from '../hooks/useAuthSettings';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  userRole: string | null;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  authSettings: any;
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
  const [userRole, setUserRole] = useState<string | null>(null);
  const { settings: authSettings } = useAuthSettings();
  const router = useRouter();

  useEffect(() => {
    // Recuperar sesión guardada
    const savedSession = localStorage.getItem('supabase-session');
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession);
        setSession(parsedSession);
        setUser(parsedSession?.user ?? null);
      } catch (error) {
        console.error('Error parsing saved session:', error);
        localStorage.removeItem('supabase-session');
      }
    }

    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session) {
        localStorage.setItem('supabase-session', JSON.stringify(session));
        fetchUserRole(session.user.id);
      }
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session) {
        localStorage.setItem('supabase-session', JSON.stringify(session));
        await createOrUpdateUserProfile(session.user);
        await fetchUserRole(session.user.id);
      } else {
        localStorage.removeItem('supabase-session');
        setUserRole(null);
      }

      // Navegación mejorada después del login
      if (event === 'SIGNED_IN' && session?.user) {
        const redirectTo = localStorage.getItem('auth-redirect') || '/admin';
        localStorage.removeItem('auth-redirect');
        router.push(redirectTo);
      }

      if (event === 'SIGNED_OUT') {
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // Usuario no encontrado, crear perfil
          console.log('User not found in users table, will be created on next auth event');
          return 'user';
        }
        console.error('Error fetching user role:', error);
        return 'user';
      }
      
      return data?.role || 'user';
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      return 'user';
    }
  };

  const createOrUpdateUserProfile = async (user: User) => {
    try {
      // Primero verificar si el usuario ya existe
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();
  
      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error checking existing user:', fetchError);
        return;
      }
  
      if (existingUser) {
        // Usuario existe, actualizar
        const { error } = await supabase
          .from('users')
          .update({
            email: user.email,
            full_name: user.user_metadata?.full_name || '',
            avatar: user.user_metadata?.avatar_url || '',
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
        
        if (error) console.error('Error updating user profile:', error);
      } else {
        // Usuario no existe, crear
        const { error } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || '',
            avatar: user.user_metadata?.avatar_url || '',
            role: 'user',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        
        if (error && error.code !== '23505') {
          console.error('Error creating user profile:', error);
        }
      }
    } catch (error) {
      console.error('Error in createOrUpdateUserProfile:', error);
    }
  };

  const getRedirectURL = () => {
    if (typeof window !== 'undefined') {
      const isProduction = window.location.hostname !== 'localhost';
      return isProduction 
        ? 'https://blancocl.vercel.app/auth/callback'
        : 'http://localhost:3000/auth/callback';
    }
    return 'http://localhost:3000/auth/callback';
  };

  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error && data.session) {
      if (rememberMe) {
        localStorage.setItem('supabase-session', JSON.stringify(data.session));
        localStorage.setItem('remember-credentials', JSON.stringify({ email }));
      }
    }
    
    return { error };
  };

  const resetPassword = async (email: string) => {
    if (!authSettings.enablePasswordReset) {
      return { error: { message: 'Password reset is currently disabled' } };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getRedirectURL(),
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
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
          getRedirectURL() : undefined
      },
    });
    return { error };
  };

  const signOut = async () => {
    localStorage.removeItem('supabase-session');
    localStorage.removeItem('remember-credentials');
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    userRole,
    signIn,
    signUp,
    signOut,
    resetPassword,
    authSettings
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};