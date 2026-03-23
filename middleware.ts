import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/auth/login' || path === '/auth/register';

  const token = request.cookies.get('token')?.value || '';
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  let isVerified = false;
  try {
    await jwtVerify(token, secret);
    isVerified = true;
  } catch (err) {
    isVerified = false;
  }

  // If the user is verified and tries to access a public path (login/register),
  // redirect them to the dashboard.
  if (isVerified && isPublicPath) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // If the user is not verified and tries to access a protected path,
  // redirect them to the login page.
  if (!isVerified && !isPublicPath) {
    // Allow API routes to be accessed for login/register attempts without redirect loop
    if (path.startsWith('/api/auth')) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (the root public page)
     * - /about, /projects, /contact (other public pages)
     * - /api/projects (public api to fetch projects)
     */
    '/admin/:path*',
    '/auth/:path*',
    '/api/admin/:path*'
  ],
};