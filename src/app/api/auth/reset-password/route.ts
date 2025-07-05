import { User } from "@/models/UserModel";
import { dbConnect } from "@/utility/dbConnect";
import { generateToken } from "@/utility/generateToken";
import { sendMail } from "@/utility/mailer";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
try {
const {email} = await req.json();
await dbConnect();
if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
}
const user = await User.findOne({email});

    if (!user) {
        return new Response(JSON.stringify({ error: "No user found" }), { status: 401 });
    }
    const resetPasswordExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const resetPasswordToken =  generateToken();
    user.resetPasswordToken = resetPasswordToken;
user.resetPasswordExpires = resetPasswordExpires;

await user.save();
await sendMail({email,token: resetPasswordToken,type: 'reset'});

    return new Response(JSON.stringify({ message: "Sent" }), { status: 200 });

} catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: "An error occurred" }), { status: 500 });
}
}