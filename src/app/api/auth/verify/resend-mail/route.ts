import { User } from "@/models/UserModel";
import { dbConnect } from "@/utility/dbConnect";
import { generateToken } from "@/utility/generateToken";
import { sendMail } from "@/utility/mailer";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { email } = await req.json();
    if (!email) {
        return new Response(JSON.stringify({ error: 'Email is required', success: false, data: null }), { status: 400 });
    }
    try {
        await dbConnect();
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found', success: false, data: null }), { status: 404 });
        }
        const token = generateToken();
        user.verifyEmailToken = token;
        user.verifyEmailExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await user.save();
        sendMail({ email, token, type: 'verify' });
        return new Response(JSON.stringify({ success: true, data: null }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Failed to send verification email', success: false, data: null }), { status: 500 });
    }
}