import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import { BlogPost } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface BlogFormProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ post, onSave, onCancel }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    author: 'Pablo Blanco Navarro',
    publishedAt: new Date(),
    tags: [],
    featured: false,
    published: true,
    image: ''
  });
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (post && post.id) {
      setFormData(post);
    } else {
      // Generar ID único para nuevo post
      setFormData(prev => ({
        ...prev,
        id: Date.now().toString(),
        publishedAt: new Date()
      }));
    }
  }, [post]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.excerpt?.trim()) {
      newErrors.excerpt = 'El extracto es requerido';
    }

    if (!formData.content?.trim()) {
      newErrors.content = 'El contenido es requerido';
    }

    if (!formData.author?.trim()) {
      newErrors.author = 'El autor es requerido';
    }

    if (!formData.tags?.length) {
      newErrors.tags = 'Al menos una etiqueta es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData as BlogPost);
    }
  };

  const handleInputChange = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
      if (errors.tags) {
        setErrors(prev => ({ ...prev, tags: '' }));
      }
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().slice(0, 16);
  };

  const handleDateChange = (dateString: string) => {
    const date = new Date(dateString);
    handleInputChange('publishedAt', date);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {post?.id ? 'Editar Post' : 'Crear Nuevo Post'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título *
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Título del post"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Extracto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Extracto *
            </label>
            <textarea
              value={formData.excerpt || ''}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              rows={2}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.excerpt ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Breve descripción del post"
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
            )}
          </div>

          {/* Contenido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contenido *
            </label>
            <textarea
              value={formData.content || ''}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={8}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Contenido completo del post (puedes usar Markdown)"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Autor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autor *
              </label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.author ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nombre del autor"
              />
              {errors.author && (
                <p className="mt-1 text-sm text-red-600">{errors.author}</p>
              )}
            </div>

            {/* Fecha de publicación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fecha de Publicación
              </label>
              <input
                type="datetime-local"
                value={formData.publishedAt ? formatDateForInput(formData.publishedAt) : ''}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL de Imagen (opcional)
            </label>
            <input
              type="url"
              value={formData.image || ''}
              onChange={(e) => handleInputChange('image', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* Etiquetas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Etiquetas *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Agregar etiqueta"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
            {errors.tags && (
              <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
            )}
          </div>

          {/* Opciones */}
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Post destacado</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.published || false}
                onChange={(e) => handleInputChange('published', e.target.checked)}
                className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Publicado</span>
            </label>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Save size={16} />
              {post?.id ? 'Actualizar' : 'Crear'} Post
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BlogForm;