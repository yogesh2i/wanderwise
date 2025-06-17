import { NextResponse } from 'next/server';
export interface FlightData {
    
        itemKey?: string;
        priceKey?: string;
        totalPriceWithDecimal: {
          price: number;
        };
        id?: string;
        slices: {
          segments: {
            id?: number;
            departInfo: {
              airport?: {
                code?: string;
                name?: string;
              };
              time: {
                dateTime?: string;
              };
            };
            arrivalInfo?: {
              airport?: {
                code?: string;
                name?: string;
              };
              time?: {
                dateTime?: string;
              };
            };
           
            flightNumber?: string;
          }[];
          durationInMinutes: string;
          
        }[];
        
        airlines: {
          marketingAirline?: string | null;
          name: string;
          image?: string;
        }[];
}
export async function POST(req: Request) {
  try {
    const { origin, destination, startDate, endDate }: { origin: string; destination: string; startDate: string; endDate: string } = await req.json();

    if (!origin || !destination || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required query parameters: origin, destination, startDate, and endDate are required.' },
        { status: 400 } 
      );
    }

    if (new Date(startDate) > new Date(endDate)) {
      return NextResponse.json(
        { success: false, error: 'Start date cannot be later than end date.' },
        { status: 400 } 
      );
    }

    const url = new URL('https://priceline-com2.p.rapidapi.com/flights/search-roundtrip');
    url.searchParams.append('originAirportCode', origin);
    url.searchParams.append('destinationAirportCode', destination);
    url.searchParams.append('departureDate', startDate);
    url.searchParams.append('returnDate', endDate);

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
        { success: false, error: 'Internal server configuration error: API key is missing.' },
        { status: 500 } 
      );
    }
        const response = await fetch(url, options);
        if(!response.ok){
            return NextResponse.json({success:false,error: response.statusText},{status: response.status})
        }

        const result = await response.json();
        if(result?.data?.error!==null){
            return NextResponse.json({success: false,error: "Could not search flights"},{status: 500})
        }

	const flights = result?.data?.listings?.map((i:FlightData)=>{
       return {
        name: i.airlines[0].name,
        itemKey: i.itemKey,
        priceKey: i.priceKey,
        price: i.totalPriceWithDecimal.price,
        time: i.slices[0].segments[0].departInfo.time.dateTime,
        duration: i.slices[0].durationInMinutes,
        flightNo: i.slices[0].segments[0].flightNumber
       }
    })
   
    return NextResponse.json(
      { success: true, data: flights },
      { status: 200 } // 200 OK
    );
  } catch (error: unknown) {

    if (error instanceof Error) {
      console.error('Error fetching flight data:', error.message);
      return NextResponse.json(
        { success: false, error: error.message || 'An unexpected error occurred.' },
        { status: 500 } 
      );
    }

  
  }
}