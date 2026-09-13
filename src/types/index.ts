export interface Language {
  code: string;
  name: string;
  flag: string;
}

export type PaletteId = 'cyber' | 'ocean' | 'sunset' | 'emerald' | 'midnight';

export interface Palette {
  id: PaletteId;
  label: string;
  color: string;
}

export const PALETTES: Palette[] = [
  { id: 'cyber', label: 'Cyber', color: '#eab308' },
  { id: 'ocean', label: 'Ocean', color: '#0ea5e9' },
  { id: 'sunset', label: 'Sunset', color: '#f97316' },
  { id: 'emerald', label: 'Emerald', color: '#22c55e' },
  { id: 'midnight', label: 'Midnight', color: '#8b5cf6' },
];

export interface Theme {
  mode: 'light' | 'dark';
  palette: PaletteId;
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
  docs?: string;
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
