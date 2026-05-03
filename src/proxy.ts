import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for authentication
    const authCookie = request.cookies.get('adminAuth')

    let isAuthenticated = false
    let userRole = null

    // Debug: Log what we're getting
    console.log('Middleware - Auth cookie:', authCookie?.value)

    // Check cookie authentication
    if (authCookie?.value) {
      try {
        const authData = JSON.parse(authCookie.value)
        if (authData && authData.isAuthenticated === true && authData.expiresAt > Date.now()) {
          isAuthenticated = true
          userRole = authData.user?.role || null
        }
      } catch (error) {
        // Invalid cookie format
      }
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check for admin role (role-based access)
    if (userRole !== 'admin') {
      const unauthorizedUrl = new URL('/admin/unauthorized', request.url)
      return NextResponse.redirect(unauthorizedUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
