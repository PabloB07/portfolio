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
  fullDescription?: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  published?: boolean;
  isNew?: boolean;
  createdAt?: string;
  updatedAt?: string;
  status?: 'completed' | 'in-progress' | 'planned';
  category?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  type?: 'work' | 'education' | 'volunteer';
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
