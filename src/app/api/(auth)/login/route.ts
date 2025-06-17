import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { dbConnect } from "@/utility/dbConnect";
import { User } from "@/models/UserModel";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET || "wanderwise",
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { success: true, message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Authentication error:", error);

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
