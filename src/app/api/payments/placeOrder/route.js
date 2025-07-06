import { NextResponse } from "next/server";
import { razorpay } from '@/utility/payments';

export async function POST(req) {
    try {
        const { credits } = await req.json();
        if (!credits) {
            return NextResponse.json({ error: "Invalid credit pack selected", success: false, data: null }, { status: 400 });
        }
        const amount = credits * 100;
        const order = await razorpay.orders.create({
            amount,
            currency: "USD",
            receipt: `reciept_${Date.now()}`,
        })
        return NextResponse.json({ success: true, data: order, error: null }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "An error occurred while placing the order", success: false, data: null }, { status: 500 });
    }
}