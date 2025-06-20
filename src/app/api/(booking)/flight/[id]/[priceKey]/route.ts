import { NextResponse } from "next/server";
interface FlightData{
    itemKey?: string;
    priceKey?: string;
    price: {
        amount: number;
    }[];
    id?: string;
    slices: {
        segments: {
        id?: number;
        departInfo: {
            airport: {
            code: string;
            name: string;
            };
            time: {
            dateTime: string;
            };
        };
        arrivalInfo: {
            airport: {
            code: string;
            name: string;
            };
            time: {
            dateTime: string;
            };
        };
        flightNumber: string;
        }[];
        durationInMinutes: string;
    }[];
    airline: {
        name: string;
        image?: string;
    }[];
    voidWindowInfo: {
        hoursLeft: string | '0'
    }
    fareRules: {
        airFareRules: {
          segmentFareRules: {
            segmentTitle: string;
            ruleSection: {
              text: string;
              title: string;
            }[];
          }[];
        }[];
      };
}
function prepareTextForAPI(text: string): string {
    const cleanedText = text.replace(/<br\s*\/?>/gi, '\n');
    return cleanedText;
  }

export async function GET(
    request: Request,
    { params }: { params: Promise<{ priceKey: string, id: string }> }
  ) {
    const { priceKey, id } = await params;
    try{
    const url = new URL('https://priceline-com2.p.rapidapi.com/flights/details');
    url.searchParams.append('itemKey', id);
    url.searchParams.append('priceKey', priceKey);
  

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
        
	const i = result?.data as FlightData;
    const flights = {
         name: i.airline[0].name,
         itemKey: i.itemKey,
         priceKey: i.priceKey,
         departInfo: {
           name: i.slices[0].segments[0].departInfo.airport.name,
           code: i.slices[0].segments[0].departInfo.airport.code,
           time: i.slices[0].segments[0].departInfo.time.dateTime
         },
         arriveInfo: {
           name: i.slices[0].segments[0].arrivalInfo.airport.name,
           code: i.slices[0].segments[0].arrivalInfo.airport.code,
           time: i.slices[0].segments[0].arrivalInfo.time.dateTime
         },
         price: i.price[0].amount,
         duration: i.slices[0].durationInMinutes,
         flightNo: i.slices[0].segments[0].flightNumber,
         timeRemaining: i.voidWindowInfo?.hoursLeft || '0',
         fareRules: i?.fareRules?.airFareRules[0]?.segmentFareRules.map((rule) => ({
           segmentTitle: rule.segmentTitle,
           rules: rule.ruleSection.map((section) => ({
             title: section.title,
             text: prepareTextForAPI(section.text) 
           }))
         }))
        }
   
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