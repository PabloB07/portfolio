import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { blogPosts } from '../../../lib/db/schema';
import { supabase } from '../../../lib/supabase';

// Función para verificar autenticación
async function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;
  
  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) return null;
  return user;
}

export async function GET() {
  try {
    const allPosts = await db.select().from(blogPosts);
    return NextResponse.json(allPosts);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching blog posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const newPost = await db.insert(blogPosts).values({
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author,
      authorId: user.id,
      tags: body.tags,
      featured: body.featured,
      published: body.published,
      image: body.image
    }).returning();
    
    return NextResponse.json(newPost[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating blog post' }, { status: 500 });
  }
}