export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Theme {
  mode: 'light' | 'dark';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  published?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  featured?: boolean;
  published?: boolean;
  image?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AIResponse {
  message: string;
  timestamp: Date;
  type: 'user' | 'ai';
}