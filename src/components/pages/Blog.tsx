import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { blogPosts } from '../../data/portfolio';

const Blog: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [blogPostsList, setBlogPostsList] = React.useState(blogPosts);

  // Escuchar actualizaciones de blog posts
  React.useEffect(() => {
    const handleBlogPostsUpdate = (event: CustomEvent) => {
      setBlogPostsList(event.detail);
    };

    window.addEventListener('blogPostsUpdated', handleBlogPostsUpdate as EventListener);
    return () => {
      window.removeEventListener('blogPostsUpdated', handleBlogPostsUpdate as EventListener);
    };
  }, []);

  const publishedPosts = blogPostsList.filter(post => post.published);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-600 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </motion.button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('blog.title')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPosts.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('blog.emptyState')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('blog.emptyStateDesc')}
              </p>
            </div>
          ) : (
            publishedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 group"
              >
                {post.image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {post.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Destacado
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{post.publishedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => window.location.href = `/blog/${post.id}`}
                    className="text-primary-500 hover:text-primary-600 font-medium text-sm"
                  >
                    {t('blog.readMore')} →
                  </motion.button>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;