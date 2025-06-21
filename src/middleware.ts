import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define which paths middleware should run on
export const config = {
  matcher: [
    // Temporarily exclude admin routes to break the redirect loop
    // '/admin/:path*',
    '/((?!admin|_next/static|_next/image|favicon.ico).*)',
  ],
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })
  
  // Log the current path for debugging
  console.log("Middleware - Path:", request.nextUrl.pathname)
  
  try {
    // Check if the user is authenticated
    const { data, error } = await supabase.auth.getSession()
    
    // Add debugging info
    console.log("Middleware - Session data:", data ? "Data exists" : "No data")
    console.log("Middleware - Session error:", error ? error.message : "No error")
    console.log("Middleware - Session exists:", !!data.session)
    
    // Add session info to request headers for server components
    if (data.session) {
      response.headers.set('x-user-id', data.session.user.id)
      response.headers.set('x-user-email', data.session.user.email || '')
      response.headers.set('x-user-role', data.session.user.role || 'user')
    }
    
    // Add debug header to see in network tab
    response.headers.set('x-middleware-cache', 'no-cache')
    response.headers.set('x-middleware-invoked', 'true')
    response.headers.set('x-middleware-time', new Date().toISOString())
    
    // We're temporarily disabling admin route handling
    // Handle admin routes
    /*
    if (request.nextUrl.pathname.startsWith('/admin')) {
      // Skip auth check for login page
      if (request.nextUrl.pathname === '/admin/login') {
        // If user is already authenticated, redirect to dashboard
        if (data.session) {
          console.log("Middleware - User is authenticated, redirecting from login to dashboard")
          const redirectUrl = new URL('/admin/dashboard', request.url)
          return NextResponse.redirect(redirectUrl)
        }
        return response
      }
      
      // For all other admin routes, require authentication
      if (!data.session) {
        console.log("Middleware - No session, redirecting to login page")
        
        // Create redirect response
        const redirectUrl = new URL('/admin/login', request.url)
        return NextResponse.redirect(redirectUrl)
      }
    }
    */
    
    return response
  } catch (e) {
    console.error("Middleware error:", e)
    
    // If there's an error, just continue
    return response
  }
}
