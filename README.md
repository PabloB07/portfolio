# 🚀 Portfolio Personal - Pablo Blanco Navarro

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.0-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

> Portfolio profesional y moderno desarrollado con Next.js, TypeScript y Tailwind CSS. Showcaseando mi experiencia como Full Stack Developer y Game Scripter.

## 🌟 **Características Principales**

### ✨ **Diseño y Experiencia**
- **Diseño Responsive** - Optimizado para todos los dispositivos
- **Modo Oscuro/Claro** - Cambio de tema suave con persistencia
- **Animaciones Fluidas** - Transiciones elegantes con Framer Motion
- **Internacionalización** - Soporte para Español e Inglés
- **Performance Optimizada** - Carga rápida y SEO-friendly

### 🎯 **Secciones del Portfolio**
- **🏠 Hero Section** - Presentación personal con call-to-action
- **👨‍💻 Sobre Mí** - Descripción profesional y habilidades
- **💼 Experiencia** - Timeline interactivo con mi trayectoria profesional
- **🚀 Proyectos** - Showcase de mis trabajos con filtros por categoría
- **📞 Contacto** - Formulario funcional para comunicación

### 🛠️ **Proyectos Destacados**
- **💎 Ruby Gems** - Gemas personalizadas para Rails
- **🌐 Aplicaciones Web** - Plataformas full-stack modernas
- **🎮 Minecraft Plugins** - Sistemas complejos para servidores
- **⚛️ Apps React/Next.js** - Interfaces de usuario dinámicas

## 🔧 **Stack Tecnológico**

### **Frontend**
```bash
Next.js 14.0.4        # Framework React con SSR/SSG
TypeScript 5.3.3      # Tipado estático
Tailwind CSS 3.4.1    # Framework CSS utility-first
Framer Motion 11.0.0  # Animaciones y transiciones
Lucide React 0.344.0  # Iconos modernos y optimizados
```

### **Herramientas de Desarrollo**
```bash
ESLint 8.56.0         # Linting de código
PostCSS 8.4.35        # Procesamiento CSS
Autoprefixer 10.4.18  # Compatibilidad CSS
React Intersection Observer  # Animaciones on-scroll
```

## 🚀 **Instalación y Desarrollo**

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn o pnpm

### **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/PabloB07/portfolio.git

# Navegar al directorio
cd portfolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### **Scripts Disponibles**
```bash
npm run dev      # Servidor de desarrollo (http://localhost:3000)
npm run build    # Build de producción optimizado
npm run start    # Servidor de producción
npm run lint     # Revisar código con ESLint
```

## 📁 **Estructura del Proyecto**

```
portfolio/
├── 📂 src/
│   ├── 📂 app/                 # App Router de Next.js
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página de inicio
│   │   └── api/                # API routes
│   ├── 📂 components/          # Componentes React
│   │   ├── 📂 sections/        # Secciones del portfolio
│   │   │   ├── Hero.tsx        # Sección hero
│   │   │   ├── About.tsx       # Sobre mí
│   │   │   ├── Experience.tsx  # Experiencia profesional
│   │   │   ├── Projects.tsx    # Proyectos destacados
│   │   │   └── Contact.tsx     # Formulario de contacto
│   │   └── 📂 common/          # Componentes reutilizables
│   ├── 📂 contexts/            # React Context (Theme, Language, Auth)
│   ├── 📂 hooks/               # Custom hooks
│   ├── 📂 data/                # Datos estáticos del portfolio
│   ├── 📂 types/               # Definiciones TypeScript
│   ├── 📂 utils/               # Utilidades y traducciones
│   └── 📂 lib/                 # Configuraciones y librerías
├── 📂 public/                  # Archivos estáticos
└── 📋 README.md               # Este archivo
```

## 🎨 **Características del Diseño**

### **Sistema de Colores**
- **Primario**: Gradientes azul-púrpura (`primary-500`, `secondary-500`)
- **Modo Claro**: Fondos blancos y grises claros
- **Modo Oscuro**: Fondos oscuros con acentos sutiles

### **Tipografía**
- **Font System**: Inter (sistema de fuentes moderno)
- **Jerarquía Clara**: H1-H6 con tamaños responsive
- **Legibilidad**: Alto contraste y espaciado optimizado

### **Animaciones**
- **Entrada Suave**: Componentes aparecen con fade-in
- **Hover Effects**: Micro-interacciones en botones y cards
- **Scroll Animations**: Elementos aparecen al hacer scroll
- **Loading States**: Transiciones fluidas entre estados

## 💼 **Proyectos Incluidos**

### **🔗 Filtros de Proyecto**
- **⭐ Destacados** - Mejores trabajos
- **💎 Ruby Gems** - Librerías Ruby personalizadas
- **🌐 Web Apps** - Aplicaciones full-stack
- **🎮 Minecraft** - Plugins para servidores
- **🛤️ Rails** - Proyectos Ruby on Rails
- **⚛️ Next.js** - Apps React modernas

### **📊 Información de Proyectos**
Cada proyecto incluye:
- **📝 Descripción completa** con contexto técnico
- **🏷️ Tecnologías utilizadas** con badges visuales
- **🔗 Enlaces** a GitHub y demos en vivo
- **🚦 Estado** (Completado/En desarrollo/Planificado)
- **🎯 Categorización** para fácil filtrado

## 🌐 **Despliegue**

### **Vercel (Recomendado)**
```bash
# Conectar con Vercel
npx vercel

# O usar GitHub integration
# Push to main branch → Auto deployment
```

### **Netlify**
```bash
# Build command
npm run build

# Publish directory
out/
```

### **GitHub Pages**
```bash
# Habilitar export estático en next.config.js
npm run build
```

## 📈 **Performance y SEO**

### **Optimizaciones Implementadas**
- ✅ **Static Generation** - Páginas pre-renderizadas
- ✅ **Image Optimization** - Next.js Image component
- ✅ **Code Splitting** - Carga lazy de componentes
- ✅ **Meta Tags** - SEO optimizado
- ✅ **Lighthouse Score** - 95+ en todas las categorías

### **Métricas de Performance**
```bash
# Core Web Vitals
LCP: < 2.5s    # Largest Contentful Paint
FID: < 100ms   # First Input Delay
CLS: < 0.1     # Cumulative Layout Shift
```

## 🤝 **Contribución**

Si encuentras algún bug o tienes sugerencias:

1. **Fork** el proyecto
2. **Crea** una feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la branch (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

## 📞 **Contacto**

**Pablo Blanco Navarro**
- 🌐 **Portfolio**: [blancocl.vercel.app](https://blancocl.vercel.app)
- 💼 **LinkedIn**: [linkedin.com/in/pabloblanco](https://www.linkedin.com/in/pabloblanco/)
- 🐙 **GitHub**: [github.com/PabloB07](https://github.com/PabloB07)
- 📧 **Email**: pablob0798@gmail.com

## 🙏 **Agradecimientos**

- **Next.js Team** - Por el increíble framework
- **Tailwind CSS** - Por el sistema de diseño utility-first
- **Framer Motion** - Por las animaciones fluidas
- **Lucide** - Por los iconos hermosos y optimizados
- **Vercel** - Por el hosting gratuito y CI/CD

---

<div align="center">

**⭐ ¡Dale una estrella si te gusta este proyecto! ⭐**

*Desarrollado con ❤️ por Pablo Blanco Navarro*

</div>
