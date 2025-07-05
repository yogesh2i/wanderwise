import { NextResponse } from "next/server";
import crypto from 'crypto';
import {razorpaySecret} from '@/utility/constants';
// import { getToken } from "next-auth/jwt";
// import { User } from "@/models/UserModel";

export async function POST(req){
    try {
        const {razorpay_order_id,razorpay_payment_id, razorpay_signature, credits} = await req.json();
        // const token =  await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        
        const body = razorpay_order_id + "|" + razorpay_payment_id;
       const expectedSignature = crypto.createHmac('sha256', razorpaySecret).update(body.toString()).digest('hex');
        if (razorpay_signature !== expectedSignature) {
            return NextResponse.json({ error: "Invalid signature", success: false, data: null }, { status: 400 });
        }
    
        // const user = await User.findOne({email: token.email});
        // user.credits = Number(credits);
        // await user.save();

        return NextResponse.json({ success: true, data: { razorpay_order_id, razorpay_payment_id, credits }, error: null }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "An error occurred while placing the order", success: false, data: null }, { status: 500 });
    }
}