import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { authenticate } from './utility/authenticate';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value || '';
    

    if (token === '' && req.nextUrl.pathname === "/login") {
        return NextResponse.next();
    }
    if (token === '' && req.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const isValid: boolean = await authenticate(token);

    if(isValid && req.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/",req.url));
    }

    if (!isValid && req.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

   
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/plan-trip', '/booking', '/chat','/login'],
};

