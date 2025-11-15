import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { projects, getLocalizedProjects } from '../../data/portfolio';

const Projects: React.FC = () => {
  const { t, tString } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  // Get localized projects
  const localizedProjects = getLocalizedProjects(tString);
  const [projectsList, setProjectsList] = useState(localizedProjects);

  // Update projects when language changes
  React.useEffect(() => {
    setProjectsList(getLocalizedProjects(tString));
  }, [tString]);

  // Escuchar actualizaciones de proyectos
  React.useEffect(() => {
    const handleProjectsUpdate = (event: CustomEvent) => {
      setProjectsList(event.detail);
    };

    window.addEventListener('projectsUpdated', handleProjectsUpdate as EventListener);
    return () => {
      window.removeEventListener('projectsUpdated', handleProjectsUpdate as EventListener);
    };
  }, []);

  const filteredProjects = projectsList.filter(project => {
    if (!project.published) return false;
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    if (filter === 'ruby-gems') return project.category === 'ruby-gem';
    if (filter === 'web-apps') return project.category === 'web-application';
    if (filter === 'wordpress') return project.category === 'wordpress-plugin';
    if (filter === 'minecraft') return project.category === 'minecraft-plugin';
    if (filter === 'rails') return project.technologies.some(tech => tech.toLowerCase().includes('rails'));
    if (filter === 'laravel') return project.technologies.some(tech => tech.toLowerCase().includes('laravel'));
    if (filter === 'java') return project.technologies.some(tech => tech.toLowerCase().includes('java') || tech.toLowerCase().includes('minecraft') || tech.toLowerCase().includes('paper'));
    if (filter === 'nextjs') return project.technologies.some(tech => tech.toLowerCase().includes('next') || tech.toLowerCase().includes('react'));
    if (filter === 'ruby') return project.technologies.some(tech => tech.toLowerCase().includes('ruby'));
    return true;
  });

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {tString('projects.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mb-8" />
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { key: 'all', label: tString('projects.filters.all'), emoji: '🌟' },
              { key: 'featured', label: tString('projects.filters.featured'), emoji: '⭐' },
              { key: 'ruby-gems', label: tString('projects.filters.rubyGems'), emoji: '💎' },
              { key: 'web-apps', label: tString('projects.filters.webApps'), emoji: '🌐' },
              { key: 'wordpress', label: tString('projects.filters.wordpress'), emoji: '📝' },
              { key: 'rails', label: tString('projects.filters.rails'), emoji: '🛤️' },
              { key: 'nextjs', label: tString('projects.filters.nextjs'), emoji: '⚛️' }
            ].map((filterOption) => (
              <motion.button
                key={filterOption.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(filterOption.key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  filter === filterOption.key
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <span className="text-lg">{filterOption.emoji}</span>
                <span className="font-medium">{filterOption.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {tString('projects.emptyState')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tString('projects.emptyStateDesc')}
                </p>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {project.featured && (
                        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          ⭐ Destacado
                        </span>
                      )}
                      {project.category && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.category === 'ruby-gem' 
                            ? 'bg-red-500/90 text-white'
                            : project.category === 'web-application'
                            ? 'bg-blue-500/90 text-white'
                            : project.category === 'wordpress-plugin'
                            ? 'bg-purple-500/90 text-white'
                            : project.category === 'minecraft-plugin'
                            ? 'bg-green-500/90 text-white'
                            : 'bg-gray-500/90 text-white'
                        }`}>
                          {project.category === 'ruby-gem' && '💎 Ruby Gem'}
                          {project.category === 'web-application' && '🌐 Web App'}
                          {project.category === 'wordpress-plugin' && '📝 WordPress'}
                          {project.category === 'minecraft-plugin' && '🎮 Plugin'}
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedProject(project.id)}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                      >
                        <Eye size={20} />
                      </motion.button>
                      
                      {project.github && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                        >
                          <Github size={20} />
                        </motion.a>
                      )}
                      
                      {project.demo && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    
                    {/* Status indicator */}
                    {project.status && (
                      <div className="mb-4 flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                          project.status === 'completed'
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : project.status === 'in-progress'
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                            : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            project.status === 'completed'
                              ? 'bg-green-500'
                              : project.status === 'in-progress'
                              ? 'bg-yellow-500'
                              : 'bg-blue-500'
                          }`} />
                          {project.status === 'completed' && 'Completado'}
                          {project.status === 'in-progress' && 'En desarrollo'}
                          {project.status === 'planned' && 'Planificado'}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedProject(project.id)}
                        className="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors duration-200"
                      >
                        Ver detalles →
                      </motion.button>
                      
                      <div className="flex space-x-2">
                        {project.demo && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
                            title="Ver demo"
                          >
                            <ExternalLink size={16} />
                          </motion.a>
                        )}
                        
                        {project.github && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
                            title="Ver código fuente"
                          >
                            <Github size={16} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )))}
          </AnimatePresence>
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {(() => {
                  const project = projects.find(p => p.id === selectedProject);
                  if (!project) return null;
                  
                  return (
                    <div>
                      <div className="relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 object-cover"
                        />
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                          {project.description}
                        </p>
                        
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            {tString('projects.technologies')}:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex space-x-4">
                          {project.demo && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                            >
                              <ExternalLink size={20} />
                              <span>{tString('projects.liveDemo')}</span>
                            </motion.a>
                          )}
                          
                          {project.github && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-200"
                            >
                              <Github size={20} />
                              <span>{tString('projects.sourceCode')}</span>
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;