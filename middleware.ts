import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Sin autenticación necesaria - portafolio estático
  return NextResponse.next()
}

export const config = {
  matcher: []
}