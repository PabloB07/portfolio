import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Mail, Settings } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthSettings } from '../../hooks/useAuthSettings';

interface LoginProps {
  onSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const { t } = useLanguage();
  const { signIn, signUp, authSettings } = useAuth();
  const { settings, updateSettings } = useAuthSettings();
  const [isLogin, setIsLogin] = useState(true);
  const [showRegistration, setShowRegistration] = useState(settings.enableRegistration);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    fullName: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Autocompletado de credenciales guardadas
  useEffect(() => {
    const savedCredentials = localStorage.getItem('remember-credentials');
    if (savedCredentials) {
      try {
        const { email } = JSON.parse(savedCredentials);
        setFormData(prev => ({ ...prev, email, rememberMe: true }));
      } catch (error) {
        console.error('Error loading saved credentials:', error);
      }
    }
  }, []);

  // Manejo de teclas
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isLoading) {
        handleSubmit(e as any);
      }
      if (e.key === 'Escape') {
        setShowSettings(false);
        setError('');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password, formData.rememberMe);
        if (error) {
          setError(error.message);
        } else {
          onSuccess?.();
        }
      } else {
        if (!showRegistration) {
          setError('El registro está deshabilitado');
          return;
        }
        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          setError(error.message);
        } else {
          setError('Revisa tu email para confirmar tu cuenta');
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRegistration = () => {
    const newValue = !showRegistration;
    setShowRegistration(newValue);
    updateSettings({ enableRegistration: newValue });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md relative"
      >
        {/* Botón de configuración */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-500" />
        </button>

        {/* Panel de configuración */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Configuración de Autenticación
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Permitir registro
                </span>
                <button
                  onClick={toggleRegistration}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showRegistration ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showRegistration ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? 'Accede a tu panel de administración' : 'Crea tu cuenta de administrador'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
          {!isLogin && showRegistration && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Tu nombre completo"
                  autoComplete="name"
                  required={!isLogin}
                />
              </div>
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="tu@email.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="••••••••"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Recordar mis datos
              </label>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

        {showRegistration && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-500 hover:text-primary-600 text-sm"
            >
              {isLogin ? '¿No tienes cuenta? Crear una' : '¿Ya tienes cuenta? Iniciar sesión'}
            </button>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500 text-center">
          Presiona Enter para enviar • Escape para cerrar
        </div>
      </motion.div>
    </div>
  );
};

export default Login;