import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://xoaviixgmtshuuliugtr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvYXZpaXhnbXRzaHV1bGl1Z3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3OTk2NzAsImV4cCI6MjA2OTM3NTY3MH0.kbptfbg4tn1mTtaJExVwlMsACcEzY0Nt0hC0v1rVTQ8'
)

// Define which routes require auth
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup']

export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  const { pathname } = url

  // Skip static files and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Get user's auth session via cookies
  const accessToken = req.cookies.get('sb-access-token')?.value

  // Check if user is logged in
  const userSession = accessToken ? true : false

  const isProtectedRoute = protectedRoutes.includes(pathname)
  const isPublicRoute = publicRoutes.includes(pathname)

  if (isProtectedRoute && !userSession) {
    // Redirect unauthenticated users from protected routes
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isPublicRoute && userSession) {
    // Redirect authenticated users from login/signup
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}
