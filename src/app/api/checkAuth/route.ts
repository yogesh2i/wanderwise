import { NextResponse } from 'next/server';
import { authenticate } from '@/utility/authenticate';
import { cookies } from 'next/headers';
export async function GET() {
  try {
    const token = (await cookies()).get('token')?.value || '';

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }

    const isValid = await authenticate(token);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'User is authenticated' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error validating token:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}