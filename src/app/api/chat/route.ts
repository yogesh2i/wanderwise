import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

interface HistoryPart {
  text: string;
}

interface HistoryEntry {
  role: "model" | "user";
  parts: HistoryPart[];
}

export async function POST(req: Request) {
  try {
    const { message, history }: { message: string; history?: HistoryEntry[] } =
      await req.json();

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || "",
    });

    if (!process.env.GOOGLE_GENAI_API_KEY) {
      console.error("Missing Google GenAI API key");
      return NextResponse.json(
        { success: false, error: "Internal server configuration error" },
        { status: 500 }
      );
    }

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: history || [],
    });

    const response = await chat.sendMessage({
      message: `Keep it restricted to travel-related topics. Reply appropriately to unrelated queries. Here is the user query: ${message}`,
    });

    return NextResponse.json(
      { success: true, reply: response.text },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error communicating with AI:", error.message);

      return NextResponse.json(
        {
          success: false,
          error: error.message || "An unexpected error occurred.",
        },
        { status: 500 }
      );
    }
  }
}
