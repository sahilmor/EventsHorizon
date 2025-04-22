import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

const protectedRoutes = ['/profile']
const publicRedirects = ['/login', '/register']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { session } } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname

  // 🚫 Redirect logged-in users away from /login and /register
  if (publicRedirects.includes(path)) {
    if (session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/profile'
      return NextResponse.redirect(redirectUrl)
    }
  }

  // 🔐 Protect routes from non-authenticated users
  if (protectedRoutes.includes(path)) {
    if (!session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/profile',
  ],
}
