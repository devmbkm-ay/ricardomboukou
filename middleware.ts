import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { i18n } from '@/i18n.config';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const hasLocale = i18n.locales.some(
    (locale) => path === `/${locale}` || path.startsWith(`/${locale}/`)
  );

  if (!hasLocale && !path.startsWith('/api')) {
    const url = request.nextUrl.clone();
    url.pathname = `/${i18n.defaultLocale}${path === '/' ? '' : path}`;
    return NextResponse.redirect(url);
  }

  if (!hasLocale) {
    return NextResponse.next();
  }

  const [, locale, ...segments] = path.split('/');
  const localizedPath = `/${segments.join('/')}`.replace(/\/+$/, '') || '/';

  const isPublicPath = localizedPath === '/auth/login' || localizedPath === '/auth/register';
  const isProtectedPage = localizedPath.startsWith('/admin');

  const token = request.cookies.get('token')?.value || '';
  const jwtSecret = process.env.JWT_SECRET;

  let isVerified = false;
  if (token && jwtSecret) {
    try {
      const secret = new TextEncoder().encode(jwtSecret);
      await jwtVerify(token, secret);
      isVerified = true;
    } catch (err) {
      isVerified = false;
    }
  }

  if (isVerified && isPublicPath) {
    return NextResponse.redirect(new URL(`/${locale}/admin/dashboard`, request.url));
  }

  if (!isVerified && isProtectedPage) {
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/).*)',
    '/api/admin/:path*'
  ],
};
