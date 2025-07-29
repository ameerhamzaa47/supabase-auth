import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

const protectedRoutes = ['/']
const publicRoutes = ['/login', '/signup']

export async function middleware(req: NextRequest) {
  console.log('Middleware triggered for:', req.nextUrl.pathname)
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = req.nextUrl

  const isProtected = protectedRoutes.includes(pathname)
  const isPublic = publicRoutes.includes(pathname)

  
  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isPublic && user) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

