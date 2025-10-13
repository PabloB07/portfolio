export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca',
      projects: 'Proyectos',
      experience: 'Experiencia',
      contact: 'Contacto',
      admin: 'Admin'
    },
    hero: {
      greeting: '¡Hola! Soy',
      name: 'Pablo Blanco Navarro',
      title: 'Full Stack Developer & Game Scripter',
      subtitle: 'Desarrollador Full Stack y Scripter de videojuegos apasionado por crear experiencias digitales excepcionales',
      cta: 'Ver mi trabajo',
      contact: 'Contacto',
      downloadCV: 'Descargar CV'
    },
    about: {
      title: 'Acerca de mí',
      description: 'Desarrollador Full Stack apasionado con experiencia en Ruby on Rails y Laravel. Me especializo en crear aplicaciones web modernas y escalables que combinan diseño atractivo con funcionalidad robusta.',
      additionalText: 'Mi pasión por la tecnología me impulsa a mantenerme actualizado con las últimas tendencias y mejores prácticas en el desarrollo web.',
      whyWorkWithMe: '¿Por qué trabajar conmigo?',
      fastDelivery: 'Entrega Rápida',
      fastDeliveryDesc: 'Desarrollo ágil con entregas frecuentes y comunicación constante.',
      innovativeSolutions: 'Soluciones Innovadoras',
      innovativeSolutionsDesc: 'Enfoque creativo para resolver problemas complejos con elegancia.'
    },
    projects: {
      title: 'Mis proyectos',
      subtitle: 'Algunos de mis trabajos más recientes',
      viewAll: 'Ver todos los proyectos',
      viewProject: 'Ver proyecto',
      sourceCode: 'Código fuente',
      liveDemo: 'Demo en vivo',
      technologies: 'Tecnologías',
      filters: {
        all: 'Todos',
        featured: 'Destacados',
        rubyGems: 'Gemas Ruby',
        webApps: 'Aplicaciones Web',
        minecraft: 'Minecraft',
        rails: 'Rails',
        nextjs: 'Next.js'
      },
      emptyState: 'No hay proyectos que mostrar',
      emptyStateDesc: 'Próximamente nuevos proyectos increíbles'
    },
    experience: {
      title: 'Experiencia profesional',
      technologies: 'Tecnologías utilizadas'
    },
    contact: {
      title: 'Contáctame',
      subtitle: '¿Tienes un proyecto en mente? ¡Hablemos!',
      name: 'Nombre',
      email: 'Email',
      subject: 'Asunto',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      success: 'Mensaje enviado correctamente',
      error: 'Error al enviar el mensaje'
    },
    ai: {
      title: 'Asistente IA',
      placeholder: 'Pregúntame algo sobre mi experiencia...',
      send: 'Enviar',
      thinking: 'Pensando...',
      error: 'Error al procesar la respuesta'
    },
    footer: {
      rights: 'Todos los derechos reservados',
      madeWith: 'Hecho con',
      and: 'y'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
      admin: 'Admin'
    },
    hero: {
      greeting: 'Hello! I am',
      name: 'Pablo Blanco Navarro',
      title: 'Full Stack Developer & Game Scripter',
      subtitle: 'Full Stack Developer and video game scripter passionate about creating exceptional digital experiences',
      cta: 'View my work',
      contact: 'Contact',
      downloadCV: 'Download CV'
    },
    about: {
      title: 'About me',
      description: 'Passionate Full Stack developer with experience in Ruby on Rails and Laravel. I specialize in creating modern and scalable web applications that combine attractive design with robust functionality.',
      additionalText: 'My passion for technology drives me to stay updated with the latest trends and best practices in web development.',
      whyWorkWithMe: 'Why work with me?',
      fastDelivery: 'Fast Delivery',
      fastDeliveryDesc: 'Agile development with frequent deliveries and constant communication.',
      innovativeSolutions: 'Innovative Solutions',
      innovativeSolutionsDesc: 'Creative approach to solve complex problems with elegance.'
    },
    projects: {
      title: 'My projects',
      subtitle: 'Some of my most recent work',
      viewAll: 'View all projects',
      viewProject: 'View project',
      sourceCode: 'Source code',
      liveDemo: 'Live demo',
      technologies: 'Technologies',
      filters: {
        all: 'All',
        featured: 'Featured',
        rubyGems: 'Ruby Gems',
        webApps: 'Web Apps',
        minecraft: 'Minecraft',
        rails: 'Rails',
        nextjs: 'Next.js'
      },
      emptyState: 'No projects to show',
      emptyStateDesc: 'Amazing new projects coming soon'
    },
    experience: {
      title: 'Professional experience',
      technologies: 'Technologies used'
    },
    contact: {
      title: 'Contact me',
      subtitle: 'Have a project in mind? Let\'s talk!',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Message sent successfully',
      error: 'Error sending message'
    },
    ai: {
      title: 'AI Assistant',
      placeholder: 'Ask me something about my experience...',
      send: 'Send',
      thinking: 'Thinking...',
      error: 'Error processing response'
    },
    footer: {
      rights: 'All rights reserved',
      madeWith: 'Made with',
      and: 'and'
    }
  }
};

export type TranslationKey = keyof typeof translations.es;
export type NestedTranslationKey = 
  | 'nav.home' | 'nav.about' | 'nav.projects' | 'nav.experience' | 'nav.contact'
  | 'hero.greeting' | 'hero.name' | 'hero.title' | 'hero.subtitle' | 'hero.cta' | 'hero.contact' | 'hero.downloadCV'
  | 'about.title' | 'about.description' | 'about.additionalText' | 'about.whyWorkWithMe' | 'about.fastDelivery' | 'about.fastDeliveryDesc' | 'about.innovativeSolutions' | 'about.innovativeSolutionsDesc'
  | 'projects.title' | 'projects.subtitle' | 'projects.viewAll' | 'projects.viewProject' | 'projects.sourceCode' | 'projects.liveDemo' | 'projects.technologies'
  | 'experience.title'
  | 'contact.title' | 'contact.subtitle' | 'contact.name' | 'contact.email' | 'contact.subject' | 'contact.message' | 'contact.send' | 'contact.sending' | 'contact.success' | 'contact.error'
  | 'ai.title' | 'ai.placeholder' | 'ai.send' | 'ai.thinking' | 'ai.error'
  | 'footer.rights' | 'footer.madeWith' | 'footer.and';
