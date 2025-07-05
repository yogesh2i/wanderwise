import nodemailer from "nodemailer";
import { mailOrg, mailPassword, nextUrl } from "./constants";

const mailData = {
    verify: {
        subject: "Please verify your email on below link",
    },
    reset:{
        subject: "Please reset your password on below link"
    }
}
export async function sendMail({email,token,type}: {email: string, token: string, type: keyof typeof mailData}) {
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
           subject: mailData[type].subject,
           html: `
            <h1>Please click the url below.</h1>
               ${type==="verify"?`<a href="${nextUrl}/verify/${token}">Verify Email</a>`:`<a href="${nextUrl}/forgetPassword/${token}">Reset Password</a>` }
           `
       })
    
   } catch (error) {
    console.log(error);
   }
}

