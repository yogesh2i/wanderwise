import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { User } from '@/models/UserModel';
import { dbConnect } from '@/utility/dbConnect';
import { sendMail } from '@/utility/mailer';
import { generateToken } from '@/utility/generateToken';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, password }: { email: string; password: string } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyEmailToken = generateToken();
    const verifyEmailExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      verifyEmailExpires,
      verifyEmailToken,
    });

    await sendMail({ token: verifyEmailToken, email: newUser.email, type: 'verify' });

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          email: newUser.email,
        },
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error during user registration:', error.message);
      return NextResponse.json(
        { success: false, error: error.message || 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}
