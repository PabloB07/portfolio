import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function middleware(request: NextRequest) {
  // Proteger rutas de admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('sb-access-token')?.value ||
                  request.cookies.get('supabase-auth-token')?.value
    
    if (!token) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
    
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey)
      const { data: { user }, error } = await supabase.auth.getUser(token)
      
      if (error || !user) {
        const redirectUrl = new URL('/login', request.url)
        redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
      }
      
    } catch (error) {
      console.error('Middleware auth error:', error)
      const redirectUrl = new URL('/login', request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}