import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const lowercaseUA = userAgent.toLowerCase();
  
  // Block common command line tools to prevent simple scraping/hacking attempts
  if (lowercaseUA.includes('curl') || lowercaseUA.includes('wget')) {
    return new NextResponse('Forbidden: Access via command line tools is not allowed.', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
