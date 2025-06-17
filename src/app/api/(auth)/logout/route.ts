import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    response.cookies.set("token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
