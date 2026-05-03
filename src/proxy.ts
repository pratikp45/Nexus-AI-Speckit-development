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
    const authStorage = request.cookies.get('adminAuthStorage')

    let isAuthenticated = false
    let userRole = null

    // Check cookie authentication (preferred method)
    if (authCookie?.value) {
      try {
        const authData = JSON.parse(authCookie.value)
        isAuthenticated = authData.isAuthenticated && authData.expiresAt > Date.now()
        userRole = authData.user?.role
      } catch (error) {
        // Invalid cookie format
      }
    }

    // Fallback to localStorage check (for development)
    if (!isAuthenticated && authStorage?.value) {
      try {
        const authData = JSON.parse(authStorage.value)
        isAuthenticated = authData.isAuthenticated && authData.expiresAt > Date.now()
        userRole = authData.user?.role
      } catch (error) {
        // Invalid storage format
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
