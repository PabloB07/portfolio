import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AIResponse } from '../../types';

const AIAssistant: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<AIResponse[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      experiencia: "Tengo experiencia en desarrollo Full Stack con Ruby on Rails y Laravel. He trabajado en proyectos desde startups hasta empresas consolidadas, siempre enfocándome en crear soluciones escalables y eficientes.",
      
      habilidades: "Mis principales habilidades incluyen Ruby on Rails, Laravel, Ruby, Git, HTML5, Bootstrap, Tailwind CSS y VibeCoding. Me especializo en desarrollo web moderno y escalable.",
      
      proyectos: "He desarrollado proyectos como plataformas de e-commerce, sistemas de gestión de tareas y la plataforma VibeCoding. Todos han sido deployados y utilizados por usuarios reales.",
      
      contacto: "Puedes contactarme en pablo@vibecoding.com o a través del formulario de contacto. Siempre respondo en menos de 24 horas y estoy disponible 24/7 para discutir nuevos proyectos.",
      
      tecnologias: "Trabajo principalmente con Ruby on Rails y Laravel, pero también tengo experiencia con HTML5, Bootstrap, Tailwind CSS, Git y VibeCoding. Me mantengo actualizado con las últimas tendencias en desarrollo web.",
      
      colaboracion: "Estoy abierto a colaboraciones en proyectos innovadores, especialmente en startups tecnológicas, aplicaciones web, y proyectos que tengan impacto. Me gusta trabajar en equipos multidisciplinarios.",
      
      servicios: "Ofrezco servicios de desarrollo Full Stack, consultoría técnica, desarrollo de MVPs, y mentoring para desarrolladores. También desarrollo soluciones personalizadas con Ruby on Rails y Laravel."
    };

    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key) || 
          (key === 'experiencia' && (lowerMessage.includes('experience') || lowerMessage.includes('años'))) ||
          (key === 'habilidades' && (lowerMessage.includes('skills') || lowerMessage.includes('tecnolog'))) ||
          (key === 'proyectos' && (lowerMessage.includes('projects') || lowerMessage.includes('trabajo'))) ||
          (key === 'contacto' && (lowerMessage.includes('contact') || lowerMessage.includes('email'))) ||
          (key === 'colaboracion' && (lowerMessage.includes('trabajo') || lowerMessage.includes('colabor'))) ||
          (key === 'servicios' && (lowerMessage.includes('servic') || lowerMessage.includes('ofrec')))) {
        return response;
      }
    }

    return "¡Hola! Soy el asistente IA de Pablo. Puedo contarte sobre su experiencia con Ruby on Rails, Laravel, sus proyectos, o cómo contactarlo. ¿Qué te interesa saber?";
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: AIResponse = {
      message: message.trim(),
      timestamp: new Date(),
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: AIResponse = {
        message: generateAIResponse(message),
        timestamp: new Date(),
        type: 'ai'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle size={24} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '500px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold">{t('ai.title')}</h3>
                  <p className="text-xs opacity-80">Online</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-gray-500 dark:text-gray-400 py-8"
                    >
                      <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle size={24} className="text-primary-500" />
                      </div>
                      <p className="text-sm">
                        ¡Hola! Pregúntame sobre la experiencia y habilidades de Pablo.
                      </p>
                    </motion.div>
                  )}

                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                          msg.type === 'user'
                            ? 'bg-primary-500 text-white rounded-br-md'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.type === 'user' ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t('ai.placeholder')}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isTyping}
                      className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Send size={16} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;