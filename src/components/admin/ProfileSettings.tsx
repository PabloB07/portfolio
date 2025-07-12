import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Save, Camera, Eye, EyeOff, FileText, Download, Trash2, Settings, UserPlus, Upload } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuthSettings } from '../../hooks/useAuthSettings';
import SystemSettings from './SystemSettings';

interface ProfileData {
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  cv?: string; // URL del CV
  cvFileName?: string;
}

interface ProfileSettingsProps {
  profile: ProfileData;
  onUpdateProfile: (profile: ProfileData) => void;
  onChangePassword: (oldPassword: string, newPassword: string) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  profile,
  onUpdateProfile,
  onChangePassword
}) => {
  const { t } = useLanguage();
  const { settings, updateSettings } = useAuthSettings();
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'cv' | 'settings' | 'registration'>('profile');
  const [profileData, setProfileData] = useState<ProfileData>(profile);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdateProfile(profileData);
      setMessage({ type: 'success', text: t('admin.profile.updateSuccess') });
    } catch (error) {
      setMessage({ type: 'error', text: t('admin.profile.updateError') });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: t('admin.profile.passwordMismatch') });
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onChangePassword(passwordData.oldPassword, passwordData.newPassword);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setMessage({ type: 'success', text: t('admin.profile.passwordSuccess') });
    } catch (error) {
      setMessage({ type: 'error', text: t('admin.profile.passwordError') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({ ...profileData, avatar: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('cv', file);
      
      // Simular upload del CV
      setIsLoading(true);
      setTimeout(() => {
        setProfileData({ 
          ...profileData, 
          cv: URL.createObjectURL(file),
          cvFileName: file.name
        });
        setMessage({ type: 'success', text: t('admin.profile.cvUploadSuccess') });
        setIsLoading(false);
      }, 1000);
    } else {
      setMessage({ type: 'error', text: 'Solo se permiten archivos PDF' });
    }
  };

  const handleCVRemove = () => {
    setProfileData({ ...profileData, cv: undefined, cvFileName: undefined });
    setMessage({ type: 'success', text: 'CV eliminado correctamente' });
  };

  const handleCVDownload = () => {
    if (profileData.cv) {
      const link = document.createElement('a');
      link.href = profileData.cv;
      link.download = profileData.cvFileName || 'CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleRegistrationToggle = () => {
    updateSettings({ enableRegistration: !settings.enableRegistration });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">{t('admin.profile.title')}</h2>
          <p className="text-primary-100">{t('admin.profile.subtitle')}</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'profile', label: t('admin.profile.profileTab'), icon: User },
              { id: 'password', label: t('admin.profile.passwordTab'), icon: Lock },
              { id: 'cv', label: t('admin.profile.cvTab'), icon: FileText },
              { id: 'registration', label: 'Registro de Usuarios', icon: UserPlus },
              { id: 'settings', label: t('admin.tabs.settings'), icon: Settings }
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

          {activeTab === 'profile' && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleProfileSubmit}
              className="space-y-6"
            >
              {/* Avatar */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center overflow-hidden">
                    {profileData.avatar ? (
                      <img
                        src={profileData.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="text-white" size={32} />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <Camera size={16} className="text-gray-600 dark:text-gray-300" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {t('admin.profile.changeAvatar')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('admin.profile.avatarHint')}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.profile.fullName')}
                  </label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.profile.username')}
                  </label>
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.profile.email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={18} />
                  <span>{isLoading ? t('admin.profile.saving') : t('admin.profile.saveChanges')}</span>
                </motion.button>
              </div>
            </motion.form>
          )}

          {activeTab === 'password' && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handlePasswordSubmit}
              className="space-y-6 max-w-md"
            >
              {[
                { key: 'oldPassword', label: t('admin.profile.currentPassword'), show: showPasswords.old, toggle: 'old' },
                { key: 'newPassword', label: t('admin.profile.newPassword'), show: showPasswords.new, toggle: 'new' },
                { key: 'confirmPassword', label: t('admin.profile.confirmPassword'), show: showPasswords.confirm, toggle: 'confirm' }
              ].map(({ key, label, show, toggle }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={show ? 'text' : 'password'}
                      value={passwordData[key as keyof typeof passwordData]}
                      onChange={(e) => setPasswordData({ ...passwordData, [key]: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, [toggle]: !show })}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lock size={18} />
                  <span>{isLoading ? t('admin.profile.updating') : t('admin.profile.updatePassword')}</span>
                </motion.button>
              </div>
            </motion.form>
          )}

          {activeTab === 'cv' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {t('admin.profile.uploadCV')}
                </h3>
                
                {profileData.cv ? (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <FileText className="text-red-500" size={48} />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {t('admin.profile.currentCV')}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {profileData.cvFileName}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={handleCVDownload}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Download size={16} />
                        <span>{t('admin.profile.downloadCV')}</span>
                      </button>
                      
                      <button
                        onClick={handleCVRemove}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                        <span>{t('admin.profile.removeCV')}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
                    <label className="cursor-pointer">
                      <div className="text-center">
                        <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                        <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          {t('admin.profile.uploadCV')}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t('admin.profile.cvHint')}
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleCVUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;