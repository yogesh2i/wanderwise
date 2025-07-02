import { jwtVerify } from "jose";
import { jwtSecret } from "./constants";
const JWT_SECRET = new TextEncoder().encode(jwtSecret);

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