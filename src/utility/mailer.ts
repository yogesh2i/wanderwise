import nodemailer from "nodemailer";
import { mailOrg, mailPassword } from "./constants";

export async function sendMail({email,token,type}: {email: string, token: string, type: string}) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: mailOrg,
            pass: mailPassword
        }
    });
   try {
       await transporter.sendMail({
           from: 'WanderWise',
           to: email,
           subject: 'Verify Email Please',
           html: `
            <h1>Hello Please verify here</h1>
               <p>Click the link below to verify your email:</p>
               <a href="http://localhost:3000/verify/${token}">Verify Email</a>
           `
       })
    
   } catch (error) {
    console.log(error);
   }
}

