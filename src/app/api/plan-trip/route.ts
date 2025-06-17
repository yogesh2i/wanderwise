import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { destination, start, end, preference, budget }: { destination: string; start: string; end: string; preference: string; budget: string } = await req.json();

    if (!destination || !start || !end || !preference || !budget) {
      return NextResponse.json(
        { success: false, error: 'All fields (destination, start, end, preference, budget) are required.' },
        { status: 400 } 
      );
    }

  
    if (new Date(start) > new Date(end)) {
      return NextResponse.json(
        { success: false, error: 'Start date cannot be greater than end date.' },
        { status: 400 } 
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || '', 
    });

    if (!process.env.GOOGLE_GENAI_API_KEY) {
      console.error('Missing Google GenAI API key');
      return NextResponse.json(
        { success: false, error: 'Internal server configuration error.' },
        { status: 500 } 
      );
    }

  
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are an expert AI Travel Planner. Your task is to provide concise, actionable travel tips tailored to a user's destination, dates, budget, and preferences.

**Output Format:**
Budget Optimizer Tip:
"[Tip related to transportation and accommodation to save money and give some nearby hotel names]"
Local Event & Weather:
"Expect [weather description] with temperatures around [X°C]. [Relevant local event details within the date range]!"
Sustainable Travel Advisor:
"[Nearby places to explore in that area based on preferences. Provide some names too.]"

---

**Input Data:**
- **Destination:** ${destination}
- **Start Date:** ${start}
- **End Date:** ${end}
- **Budget Level:** ${budget}
- **Preferences:** ${preference}
`,
    });

    return NextResponse.json(
      { success: true, data: response.text },
      { status: 200 } 
    );
  } catch (error: unknown) {

    if (error instanceof Error) {
      console.error('Error communicating with AI:', error.message);

    
      return NextResponse.json(
        { success: false, error: error.message || 'An unexpected error occurred.' },
        { status: 500 }
      );
    }

  }
}