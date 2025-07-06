import { User } from "@/models/UserModel";
import { dbConnect } from "@/utility/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
    const { token } = await params;

    if (!token) {
        return NextResponse.json({ error: "Token is required", success: false, data: null }, { status: 400 });
    }
    try {
        await dbConnect();
        const user = await User.findOne({ verifyEmailToken: token });
        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token", success: false, data: null }, { status: 400 });
        }
        if (user.isVerified) {
            return NextResponse.json({ message: "Email is already verified", success: true, data: null }, { status: 400 });
        }
        if (new Date(user.verifyEmailExpires) < new Date()) {
            return NextResponse.json({ error: "Token has expired", success: false, data: null }, { status: 400 });
        }
        user.isVerified = true;
        user.verifyEmailToken = undefined;
        user.verifyEmailExpires = undefined;
        await user.save();
        return NextResponse.json({ message: "Email verified successfully", success: true, data: null }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "An error occurred while verifying the token", success: false, data: null }, { status: 500 });
    }
}