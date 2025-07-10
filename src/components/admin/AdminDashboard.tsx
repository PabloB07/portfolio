import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Bot, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { projects, blogPosts } from '../../data/portfolio';
import { Project, BlogPost } from '../../types';

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const tabs = [
    { id: 'projects', label: t('admin.projects'), icon: BarChart3 },
    { id: 'blog', label: t('admin.blog'), icon: FileText },
    { id: 'ai', label: t('admin.ai'), icon: Bot },
  ];

  const handleToggleFeatured = (id: string, type: 'project' | 'post') => {
    // Aquí implementarías la lógica para actualizar el estado
    console.log(`Toggle featured for ${type} ${id}`);
  };

  const handleTogglePublished = (id: string, type: 'project' | 'post') => {
    // Aquí implementarías la lógica para actualizar el estado
    console.log(`Toggle published for ${type} ${id}`);
  };

  const handleDelete = (id: string, type: 'project' | 'post') => {
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      // Aquí implementarías la lógica para eliminar
      console.log(`Delete ${type} ${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('admin.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona tu contenido y configuraciones
          </p>
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
                  Gestión de Proyectos
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setEditingProject({} as Project)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                >
                  <Plus size={18} />
                  <span>{t('admin.createProject')}</span>
                </motion.button>
              </div>

              <div className="grid gap-6">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleToggleFeatured(project.id, 'project')}
                          className={`p-2 rounded ${
                            project.featured
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                          title="Destacar"
                        >
                          ⭐
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleTogglePublished(project.id, 'project')}
                          className={`p-2 rounded ${
                            project.published
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                          title="Publicar/Despublicar"
                        >
                          {project.published ? <Eye size={16} /> : <EyeOff size={16} />}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setEditingProject(project)}
                          className="p-2 bg-blue-100 text-blue-600 rounded"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleDelete(project.id, 'project')}
                          className="p-2 bg-red-100 text-red-600 rounded"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Gestión de Blog
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setEditingPost({} as BlogPost)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                >
                  <Plus size={18} />
                  <span>{t('admin.createPost')}</span>
                </motion.button>
              </div>

              <div className="grid gap-6">
                {blogPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Por {post.author}</span>
                          <span>{post.publishedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleToggleFeatured(post.id, 'post')}
                          className={`p-2 rounded ${
                            post.featured
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                          title="Destacar"
                        >
                          ⭐
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleTogglePublished(post.id, 'post')}
                          className={`p-2 rounded ${
                            post.published
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                          title="Publicar/Despublicar"
                        >
                          {post.published ? <Eye size={16} /> : <EyeOff size={16} />}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setEditingPost(post)}
                          className="p-2 bg-blue-100 text-blue-600 rounded"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleDelete(post.id, 'post')}
                          className="p-2 bg-red-100 text-red-600 rounded"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Configuración del Asistente IA
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400">
                  Aquí puedes configurar las respuestas del asistente IA, entrenar nuevos modelos
                  y gestionar las interacciones con los usuarios.
                </p>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200">
                    Configurar IA
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;