import { jwtVerify } from "jose";
const JWT_SECRET = new TextEncoder().encode('1234');

export async function authenticate(token: string) {
     
    try {
      
        const decoded = await jwtVerify(token, JWT_SECRET);
        console.log(decoded);
        
        return true; // Return the authenticated user
    } catch (error) {
        console.error('Authentication error:', error);
        throw new Error('Invalid token');
    }
}