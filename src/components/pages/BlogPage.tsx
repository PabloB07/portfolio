import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { blogPosts } from '../../data/portfolio';
import { BlogPost } from '../../types';

const BlogPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag && post.published;
  });

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedPost(null)}
            className="flex items-center space-x-2 text-primary-500 hover:text-primary-600 mb-8"
          >
            <ArrowLeft size={20} />
            <span>{t('blog.backToBlog')}</span>
          </motion.button>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover"
              />
            )}
            
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedPost.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{t('blog.publishedOn')} {selectedPost.publishedAt.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{t('blog.by')} {selectedPost.author}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedPost.content}
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Artículos sobre desarrollo de videojuegos, Unity y tecnologías modernas
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                !selectedTag
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Todos
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedTag === tag
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{post.publishedAt.toLocaleDateString()}</span>
                  </div>
                  {post.featured && (
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded text-xs">
                      Destacado
                    </span>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className="text-primary-500 hover:text-primary-600 font-medium text-sm">
                  {t('blog.readMore')} →
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No se encontraron artículos que coincidan con tu búsqueda.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;