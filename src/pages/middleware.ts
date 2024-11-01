import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); // Assume a cookie is used for authentication

  // If the user is not logged in and trying to access a protected route
  if (!token && request.nextUrl.pathname.startsWith('/protected')) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow access to the page
  return NextResponse.next();
}

// Define routes that require middleware
export const config = {
  matcher: ['/protected/:path*'], // Protect pages under `/protected`
};
