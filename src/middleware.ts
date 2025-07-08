// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getCookie } from './lib/utils';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPaths = ['/', '/login', '/signup'];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check auth for protected routes
//   const c = await cookies();
//   const token = c.get("idToken");

//   const token = getCookie('idToken');
  const token = request.cookies.get('idToken')?.value;
    
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  };
  