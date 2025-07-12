import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  
  // Proteger rutas de admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
    
    // Verificar si el usuario tiene rol de admin
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()
    
    if (!user || user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  return res
}

export const config = {
  matcher: ['/admin/:path*']
}