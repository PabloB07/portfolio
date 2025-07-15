"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Globe, Database, CheckCircle, XCircle, Save, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSupabaseSettings } from '../../hooks/useSupabaseSettings';
import { supabase } from '../../lib/supabase';

const SystemSettings: React.FC = () => {
  const { t } = useLanguage();
  const { settings, updateAuthSettings, isLoading: settingsLoading } = useSupabaseSettings();
  const [activeTab, setActiveTab] = useState<'authentication' | 'general' | 'security' | 'users'>('authentication');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    testSupabaseConnection();
    loadUsers();
  }, []);

  const testSupabaseConnection = async () => {
    setConnectionStatus('testing');
    try {
      const { error } = await supabase.from('users').select('count').limit(1);
      if (error) throw error;
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Supabase connection error:', error);
      setConnectionStatus('disconnected');
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, full_name, role, created_at')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleSettingChange = async (key: keyof typeof settings.auth, value: boolean) => {
    setIsLoading(true);
    try {
      const result = await updateAuthSettings({ [key]: value });
      if (result.success) {
        setMessage({ type: 'success', text: 'Configuración actualizada correctamente' });
      } else {
        setMessage({ type: 'error', text: 'Error al actualizar la configuración' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar la configuración' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setMessage({ type: 'success', text: 'Configuraciones guardadas en la base de datos' });
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;
      
      await loadUsers();
      setMessage({ type: 'success', text: 'Rol de usuario actualizado' });
    } catch (error) {
      console.error('Error updating user role:', error);
      setMessage({ type: 'error', text: 'Error al actualizar el rol' });
    }
  };

  const ToggleSwitch: React.FC<{ 
    enabled: boolean; 
    onChange: (enabled: boolean) => void;
    disabled?: boolean;
  }> = ({ enabled, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        enabled ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">{t('admin.settings.title')}</h2>
          <p className="text-primary-100">{t('admin.settings.subtitle')}</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'authentication', label: t('admin.settings.authenticationTab'), icon: Shield },
              { id: 'users', label: 'Usuarios', icon: Users },
              { id: 'general', label: t('admin.settings.generalTab'), icon: Settings },
              { id: 'security', label: t('admin.settings.securityTab'), icon: Globe }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          {activeTab === 'authentication' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Supabase Connection Status */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Database className="text-primary-500" size={24} />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {t('admin.settings.supabaseSettings')}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('admin.settings.connectionStatus')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center space-x-2 ${
                      connectionStatus === 'connected' ? 'text-green-600' :
                      connectionStatus === 'testing' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {connectionStatus === 'connected' ? (
                        <CheckCircle size={20} />
                      ) : connectionStatus === 'testing' ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
                      ) : (
                        <XCircle size={20} />
                      )}
                      <span className="text-sm font-medium">
                        {connectionStatus === 'connected' ? t('admin.settings.connected') :
                         connectionStatus === 'testing' ? 'Testing...' : t('admin.settings.disconnected')}
                      </span>
                    </div>
                    <button
                      onClick={testSupabaseConnection}
                      disabled={connectionStatus === 'testing'}
                      className="px-3 py-1 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 disabled:opacity-50"
                    >
                      {t('admin.settings.testConnection')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Authentication Settings */}
              <div className="space-y-4">
                {[
                  {
                    key: 'enableRegistration' as keyof typeof settings.auth,
                    title: t('admin.settings.enableRegistration'),
                    description: t('admin.settings.enableRegistrationDesc')
                  },
                  {
                    key: 'requireEmailVerification' as keyof typeof settings.auth,
                    title: t('admin.settings.requireEmailVerification'),
                    description: t('admin.settings.requireEmailVerificationDesc')
                  },
                  {
                    key: 'enablePasswordReset' as keyof typeof settings.auth,
                    title: t('admin.settings.enablePasswordReset'),
                    description: t('admin.settings.enablePasswordResetDesc')
                  },
                  {
                    key: 'enableSocialLogin' as keyof typeof settings.auth,
                    title: t('admin.settings.enableSocialLogin'),
                    description: t('admin.settings.enableSocialLoginDesc')
                  }
                ].map(({ key, title, description }) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings.auth[key]}
                      onChange={(value) => handleSettingChange(key, value)}
                      disabled={connectionStatus !== 'connected' || settingsLoading}
                    />
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={18} />
                  <span>{isLoading ? 'Guardando...' : t('admin.settings.saveSettings')}</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Gestión de Usuarios
                </h3>
                <button
                  onClick={loadUsers}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Actualizar
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Fecha de Registro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {user.full_name || 'Sin nombre'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.role}
                            onChange={(e) => updateUserRole(user.id, e.target.value)}
                            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(user.created_at).toLocaleDateString('es-ES')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {user.role === 'admin' ? 'Admin' : 'Usuario'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center py-12"
            >
              <Settings className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 dark:text-gray-400">Configuraciones generales próximamente...</p>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center py-12"
            >
              <Shield className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 dark:text-gray-400">Configuraciones de seguridad próximamente...</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;