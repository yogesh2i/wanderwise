import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
// import { authenticate } from './utility/authenticate';
// import { cookies } from 'next/headers';

// export async function middleware(req: NextRequest) {
//     const token = req.cookies.get('token')?.value || '';
//     if (token === '' && req.nextUrl.pathname === "/login") {
//         return NextResponse.next();
//     }

//     if (token === '' && req.nextUrl.pathname !== "/login") {
//         return NextResponse.redirect(new URL("/login", req.url));
//     }
     
//     const isValid: boolean = await authenticate(token);

//     if(isValid && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname==="/signup")) {
//         return NextResponse.redirect(new URL("/",req.url));
//     }

//     if (!isValid && req.nextUrl.pathname !== "/login") {
//         return NextResponse.redirect(new URL("/login", req.url));
//     }

   
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/plan-trip', '/booking', '/chat','/login','/signup'],
// };

export async function middleware(req: NextRequest) {
     const token =  await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
     const url = req.nextUrl;
     
  // Case 1: User is logged in but not verified
  if (token && !token.isVerified) {
    if (url.pathname !== '/verify') {
        return NextResponse.redirect(new URL('/verify', req.url));
    }
}

// Case 2: User is logged in and verified
if (token && token.isVerified) {
    if (url.pathname === '/login' || url.pathname === '/signup' || url.pathname === '/verify') {
        return NextResponse.redirect(new URL('/', req.url));
    }
}

// Case 3: User is not logged in
if (!token) {
    if (url.pathname !== '/login' && url.pathname !== '/signup' && url.pathname !== '/verify') {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

    
    return NextResponse.next();

}
export const config = {
    matcher: ['/plan-trip', '/booking', '/chat','/login','/signup','/verify'],
};