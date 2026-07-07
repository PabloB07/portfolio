import { NextRequest, NextResponse } from 'next/server';

// Datos estáticos para proyectos
const staticProjects = [
  {
    id: '1',
    title: 'Portfolio Personal',
    description: 'Mi portafolio personal desarrollado con Next.js, TypeScript y Tailwind CSS.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
    image: '/projects/portfolio.jpg',
    github: 'https://github.com/usuario/portfolio',
    demo: 'https://mi-portfolio.com',
    featured: true,
    published: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

export async function GET() {
  try {
    return NextResponse.json(staticProjects);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Funcionalidad de creación deshabilitada en versión estática' }, 
    { status: 403 }
  );
}
