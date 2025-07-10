import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { projects } from '../../../lib/db/schema';

export async function GET() {
  try {
    const allProjects = await db.select().from(projects);
    return NextResponse.json(allProjects);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newProject = await db.insert(projects).values({
      title: body.title,
      description: body.description,
      technologies: body.technologies,
      image: body.image,
      github: body.github,
      demo: body.demo,
      featured: body.featured,
      published: body.published
    }).returning();
    
    return NextResponse.json(newProject[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating project' }, { status: 500 });
  }
}