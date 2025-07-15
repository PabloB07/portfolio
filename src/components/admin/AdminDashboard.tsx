"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Bot, Plus, Edit, Trash2, User, LogOut, Settings, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useProjects } from '../../hooks/useProjects';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import Login from './Login';
import ProfileSettings from './ProfileSettings';
import ProjectForm from './ProjectForm';
import BlogForm from './BlogForm';
import SystemSettings from './SystemSettings';
import { Project, BlogPost } from '../../types';

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated, userRole, signOut } = useAuth();
  const { projects, createProject, updateProject, deleteProject } = useProjects();
  const { blogPosts, createBlogPost, updateBlogPost, deleteBlogPost } = useBlogPosts();
  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const tabs = [
    { id: 'projects', label: t('admin.tabs.projects'), icon: BarChart3 },
    { id: 'blog', label: t('admin.tabs.blog'), icon: FileText },
    { id: 'ai', label: t('admin.tabs.ai'), icon: Bot },
    { id: 'profile', label: t('admin.tabs.profile'), icon: User },
    { id: 'filters', label: 'Filtros', icon: Filter },
    ...(userRole === 'admin' ? [{ id: 'settings', label: 'Configuración', icon: Settings }] : [])
  ];

  // CRUD para proyectos
  const handleSaveProject = async (project: Project) => {
    try {
      if (project.id && projects.find(p => p.id === project.id)) {
        // Actualizar
        const result = await updateProject(project.id, project);
        if (result.success) {
          setEditingProject(null);
          // Sincronizar con homepage
          window.dispatchEvent(new CustomEvent('projectsUpdated', { detail: projects }));
        } else {
          alert('Error al actualizar el proyecto');
        }
      } else {
        // Crear
        const result = await createProject(project);
        if (result.success) {
          setEditingProject(null);
          // Sincronizar con homepage
          window.dispatchEvent(new CustomEvent('projectsUpdated', { detail: projects }));
        } else {
          alert('Error al crear el proyecto');
        }
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error al guardar el proyecto');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      const result = await deleteProject(id);
      if (!result.success) {
        alert('Error al eliminar el proyecto');
      }
    }
  };

  // CRUD para blog posts
  const handleSaveBlogPost = async (post: BlogPost) => {
    try {
      if (post.id && blogPosts.find(p => p.id === post.id)) {
        // Actualizar
        const result = await updateBlogPost(post.id, post);
        if (result.success) {
          setEditingPost(null);
        } else {
          alert('Error al actualizar el post');
        }
      } else {
        // Crear
        const result = await createBlogPost(post);
        if (result.success) {
          setEditingPost(null);
        } else {
          alert('Error al crear el post');
        }
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Error al guardar el post');
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      const result = await deleteBlogPost(id);
      if (!result.success) {
        alert('Error al eliminar el post');
      }
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t('admin.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gestiona tu contenido y configuraciones
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  {user?.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata?.full_name || user.email}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-primary-600 dark:text-primary-400" />
                  )}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.user_metadata?.full_name || user?.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {userRole || 'user'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title={t('admin.logout')}
              >
                <LogOut size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-primary-500 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Proyectos ({projects.length})
                </h2>
                <button
                  onClick={() => setEditingProject({
                    id: '',
                    title: '',
                    description: '',
                    technologies: [],
                    featured: false,
                    published: true,
                    image_url: '',
                    github_url: '',
                    image: '',
                    live_url: '',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    user_id: user?.id
                  } as Project)}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Nuevo Proyecto</span>
                </button>
              </div>
              
              {editingProject ? (
                <ProjectForm
                  project={editingProject}
                  onSave={handleSaveProject}
                  onCancel={() => setEditingProject(null)}
                />
              ) : (
                <div className="grid gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies?.map((tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="p-2 text-gray-500 hover:text-primary-500"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-2 text-gray-500 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'blog' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Blog Posts ({blogPosts.length})
                </h2>
                <button
                  onClick={() => setEditingPost({ 
                    id: '', 
                    title: '', 
                    content: '',
                    excerpt: '',
                    author: user?.user_metadata?.full_name || user?.email || '',
                    publishedAt: new Date(),
                    tags: [],
                    featured: false,
                    published: true,
                    image: ''
                  } as BlogPost)}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Nuevo Post</span>
                </button>
              </div>
              
              {editingPost ? (
                <BlogForm
                  post={editingPost}
                  onSave={handleSaveBlogPost}
                  onCancel={() => setEditingPost(null)}
                />
              ) : (
                <div className="grid gap-6">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => setEditingPost(post)}
                            className="p-2 text-gray-500 hover:text-primary-500"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteBlogPost(post.id)}
                            className="p-2 text-gray-500 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <ProfileSettings />
          )}

          {activeTab === 'settings' && userRole === 'admin' && (
            <SystemSettings />
          )}

          {activeTab === 'ai' && (
            <div className="text-center py-12">
              <Bot size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Asistente AI
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Funcionalidad en desarrollo
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;