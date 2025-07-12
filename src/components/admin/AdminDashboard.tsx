import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Bot, Plus, Edit, Trash2, Eye, EyeOff, User, LogOut, Settings } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Login from './Login';
import ProfileSettings from './ProfileSettings';
import ProjectForm from './ProjectForm';
import BlogForm from './BlogForm';
import SystemSettings from './SystemSettings';
import { projects as initialProjects, blogPosts as initialBlogPosts } from '../../data/portfolio';
import { Project, BlogPost } from '../../types';
import { supabase } from '../../lib/supabase';

interface AdminUser {
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
}

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated, userRole, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [loading, setLoading] = useState(true);
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
    ...(userRole === 'admin' ? [{ id: 'settings', label: 'Configuración', icon: Settings }] : [])
  ];

  // Cargar datos desde Supabase
  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
      loadBlogPosts();
    }
  }, [isAuthenticated]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  };

  // CRUD para proyectos
  const handleSaveProject = async (project: Project) => {
    try {
      if (project.id && projects.find(p => p.id === project.id)) {
        // Actualizar
        const { error } = await supabase
          .from('projects')
          .update(project)
          .eq('id', project.id);
        
        if (error) throw error;
        setProjects(prev => prev.map(p => p.id === project.id ? project : p));
      } else {
        // Crear
        const { data, error } = await supabase
          .from('projects')
          .insert([{ ...project, user_id: user?.id }])
          .select()
          .single();
        
        if (error) throw error;
        setProjects(prev => [data, ...prev]);
      }
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        setProjects(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  // CRUD para blog posts
  const handleSaveBlogPost = async (post: BlogPost) => {
    try {
      if (post.id && blogPosts.find(p => p.id === post.id)) {
        // Actualizar
        const { error } = await supabase
          .from('blog_posts')
          .update(post)
          .eq('id', post.id);
        
        if (error) throw error;
        setBlogPosts(prev => prev.map(p => p.id === post.id ? post : p));
      } else {
        // Crear
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([{ ...post, author_id: user?.id }])
          .select()
          .single();
        
        if (error) throw error;
        setBlogPosts(prev => [data, ...prev]);
      }
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving blog post:', error);
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        setBlogPosts(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting blog post:', error);
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

  // Mostrar loading mientras cargan los datos
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
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
            <ProfileSettings 
              profile={{
                username: currentUser.username,
                email: currentUser.email,
                fullName: currentUser.fullName,
                avatar: currentUser.avatar
              }}
              onUpdateProfile={async (updatedProfile) => {
                // Handle profile update
                setCurrentUser(prev => ({
                  ...prev,
                  ...updatedProfile
                }));
              }}
              onChangePassword={async (oldPassword, newPassword) => {
                // Handle password change
                try {
                  // Implement password change logic here
                  console.log('Password change requested');
                } catch (error) {
                  console.error('Error changing password:', error);
                }
              }}
            />
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