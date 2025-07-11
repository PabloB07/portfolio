import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Bot, Plus, Edit, Trash2, Eye, EyeOff, User, LogOut } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Login from './Login';
import ProfileSettings from './ProfileSettings';
import ProjectForm from './ProjectForm';
import BlogForm from './BlogForm';
import { projects as initialProjects, blogPosts as initialBlogPosts } from '../../data/portfolio';
import { Project, BlogPost } from '../../types';

interface AdminUser {
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
}

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Remove this line: const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [currentUser, setCurrentUser] = useState<AdminUser>({
    username: 'admin',
    email: 'admin@portfolio.com',
    fullName: 'Administrador',
    avatar: 'https://avatars.githubusercontent.com/u/36685434?v=4&size=64'
  });

  const tabs = [
    { id: 'projects', label: t('admin.tabs.projects'), icon: BarChart3 },
    { id: 'blog', label: t('admin.tabs.blog'), icon: FileText },
    { id: 'ai', label: t('admin.tabs.ai'), icon: Bot },
    { id: 'profile', label: t('admin.tabs.profile'), icon: User },
  ];

  // Funciones de autenticación
  // Remove the handleLogin function entirely

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('projects');
  };

  const handleUpdateProfile = (profile: AdminUser) => {
    setCurrentUser(profile);
  };

  const handleChangePassword = (oldPassword: string, newPassword: string) => {
    // Aquí iría la lógica para cambiar la contraseña
    console.log('Cambiar contraseña:', { oldPassword, newPassword });
  };

  // Funciones CRUD para proyectos
  const handleSaveProject = (project: Project) => {
    if (projects.find(p => p.id === project.id)) {
      // Actualizar proyecto existente
      setProjects(prev => prev.map(p => p.id === project.id ? project : p));
    } else {
      // Crear nuevo proyecto
      setProjects(prev => [...prev, project]);
    }
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleToggleProjectFeatured = (id: string) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
  };

  const handleToggleProjectPublished = (id: string) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, published: !p.published } : p
    ));
  };

  // Funciones CRUD para blog posts
  const handleSaveBlogPost = (post: BlogPost) => {
    if (blogPosts.find(p => p.id === post.id)) {
      // Actualizar post existente
      setBlogPosts(prev => prev.map(p => p.id === post.id ? post : p));
    } else {
      // Crear nuevo post
      setBlogPosts(prev => [...prev, post]);
    }
    setEditingPost(null);
  };

  const handleDeleteBlogPost = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      setBlogPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleToggleBlogPostFeatured = (id: string) => {
    setBlogPosts(prev => prev.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
  };

  const handleToggleBlogPostPublished = (id: string) => {
    setBlogPosts(prev => prev.map(p => 
      p.id === id ? { ...p, published: !p.published } : p
    ));
  };

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <Login onSuccess={() => setIsAuthenticated(true)} />;
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
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-primary-600 dark:text-primary-400" />
                  )}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-white">{currentUser.fullName}</p>
                  <p className="text-gray-600 dark:text-gray-400">{currentUser.email}</p>
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
                          onClick={() => handleToggleProjectFeatured(project.id)}
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
                          onClick={() => handleToggleProjectPublished(project.id)}
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
                          onClick={() => handleDeleteProject(project.id)}
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
                        <div className="flex items-center space-x-2 ml-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => handleToggleBlogPostFeatured(post.id)}
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
                            onClick={() => handleToggleBlogPostPublished(post.id)}
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
                            onClick={() => handleDeleteBlogPost(post.id)}
                            className="p-2 bg-red-100 text-red-600 rounded"
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
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

          {activeTab === 'profile' && (
            <ProfileSettings
              profile={currentUser}
              onUpdateProfile={handleUpdateProfile}
              onChangePassword={handleChangePassword}
            />
          )}
        </motion.div>
      </div>

      {/* Modales de formularios */}
      {editingProject && (
        <ProjectForm
          project={editingProject.id ? editingProject : undefined}
          onSave={handleSaveProject}
          onCancel={() => setEditingProject(null)}
        />
      )}

      {editingPost && (
        <BlogForm
          post={editingPost.id ? editingPost : undefined}
          onSave={handleSaveBlogPost}
          onCancel={() => setEditingPost(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;