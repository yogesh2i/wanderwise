import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {

    const { token } = await params;
    if (!token) {
        return new Response("Token not found", { status: 400 });
    }

    return new Response(`Token: ${token}`, { status: 200 });
}