import { NextResponse } from 'next/server';

interface AirportData {
  id: string;
  itemName: string;
  type: string;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query parameter is required.' },
        { status: 400 } 
      );
    }

    const url = `https://priceline-com2.p.rapidapi.com/flights/auto-complete?query=${query}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.PRICELINE_API_KEY || '',
        'x-rapidapi-host': 'priceline-com2.p.rapidapi.com',
      },
    };

    if (!process.env.PRICELINE_API_KEY) {
      console.error('Missing Priceline API key');
      return NextResponse.json(
        { success: false, error: 'Internal server configuration error.' },
        { status: 500 } 
      );
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: response.statusText },
        { status: response.status }
      );
    }

    const result = await response.json();
    
    const data = result?.data?.searchItems
    ?.filter((item: AirportData) => item.type === 'AIRPORT') // Filter only airports
    ?.map((item: AirportData) => ({
      id: item.id,
      name: item.itemName,
    }));
    
    return NextResponse.json(
      { success: true, data },
      { status: 200 } // 200 OK
    );
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching airport data:', error.message);
      return NextResponse.json(
        { success: false, error: error.message || 'An unexpected error occurred.' },
        { status: 500 } // 500 Internal Server Error
      );
    }

  }
}