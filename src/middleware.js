import { NextResponse } from 'next/server'

export async function middleware(req) {
  
  return NextResponse.redirect(new URL('/', req.url))
}
 


export const config = {
  matcher: ['/person'],
  // matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|list).*)'],
}