import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../contexts/LanguageContext';
import { projects, getLocalizedProjects } from '../../data/portfolio';

const Projects: React.FC = () => {
  const { tString } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  const localizedProjects = getLocalizedProjects(tString);
  const [projectsList, setProjectsList] = useState(localizedProjects);

  React.useEffect(() => {
    setProjectsList(getLocalizedProjects(tString));
  }, [tString]);

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
    return true;
  });

  return (
    <section id="projects" className="py-20 bg-white/50 dark:bg-discord-bg-darker/40 backdrop-blur-sm">
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
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { key: 'all', label: '🌟 Todos' },
              { key: 'featured', label: '⭐ Destacados' },
              { key: 'ruby-gems', label: '💎 Gemas Ruby' },
              { key: 'web-apps', label: '🌐 Web Apps' },
              { key: 'wordpress', label: '📝 WordPress' },
              { key: 'minecraft', label: '🎮 Minecraft' },
            ].map((filterOption) => (
              <motion.button
                key={filterOption.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(filterOption.key)}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-medium ${
                  filter === filterOption.key
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white dark:bg-discord-card-dark text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {filterOption.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <>{filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-discord-card-dark rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover border border-gray-200/70 dark:border-white/5 hover:border-primary-500/40 transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {project.isNew && (
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-green-500/30 animate-pulse">
                          ✨ {tString('projects.new')}
                        </span>
                      )}
                      {project.featured && (
                        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          ⭐ Destacado
                        </span>
                      )}
                      {project.category && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                          project.category === 'ruby-gem'
                            ? 'bg-red-500/90 text-white'
                            : project.category === 'web-application'
                            ? 'bg-blue-500/90 text-white'
                            : project.category === 'minecraft-plugin'
                            ? 'bg-green-600/90 text-white'
                            : 'bg-purple-500/90 text-white'
                        }`}>
                          {project.category === 'ruby-gem' && '💎 Ruby Gem'}
                          {project.category === 'web-application' && '🌐 Web App'}
                          {project.category === 'wordpress-plugin' && '📝 WordPress'}
                          {project.category === 'minecraft-plugin' && '🎮 Minecraft'}
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedProject(project.id)}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </motion.button>
                      
                      {project.github && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
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
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </motion.a>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
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

                    {project.status && (
                      <div className="mb-4 flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                          project.status === 'completed'
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                          }`} />
                          {project.status === 'completed' ? 'Completado' : 'En desarrollo'}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => setSelectedProject(project.id)}
                        className="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors duration-200"
                      >
                        Ver detalles →
                      </button>
                      
                      <div className="flex gap-2">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
                            title="Ver demo"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
                            title="Ver código"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              </>
            )}
          </AnimatePresence>
        </div>

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
                className="bg-white dark:bg-discord-card-dark rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {(() => {
                   const project = projectsList.find(p => p.id === selectedProject);
                   if (!project) return null;
                  
                  return (
                    <div>
                      <div className="relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 md:h-64 object-cover"
                        />
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="p-4 md:p-8">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                          {project.description}
                        </p>

                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          {project.fullDescription}
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
                        
                        <div className="flex gap-4">
                          {project.demo && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              <span>{tString('projects.liveDemo')}</span>
                            </motion.a>
                          )}
                          
                          {project.github && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-200"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                              </svg>
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