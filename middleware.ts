import { NextRequest, NextResponse } from 'next/server';

export default async function Middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionCookie = req.cookies.get('session')?.value;

  if (!sessionCookie && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (sessionCookie) {
    const user = JSON.parse(sessionCookie);
    console.log('User middleware:', user);

    const role = user.role;

    if (pathname.startsWith('/dashboard/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (
      pathname.startsWith('/dashboard/manager') &&
      role !== 'ADMIN' &&
      role !== 'MANAGER'
    ) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};