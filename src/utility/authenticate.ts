import { jwtVerify } from "jose";
const JWT_SECRET = new TextEncoder().encode('1234');

export async function authenticate(token: string) {
     
    try {
        
        const decoded = await jwtVerify(token, JWT_SECRET); 
        if(decoded){
            return true; 
        }else{
            return false;
        }
    } catch{
        return false;
       
    }
}