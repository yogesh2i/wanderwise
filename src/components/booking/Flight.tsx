'use client'
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import FlightResult from './FlightResult';
interface airport{
    id :string,
    name: string
}
interface flight{
    name: string,
    itemKey: string,
    priceKey: string,
    arriveInfo: {
      name: string,
      code: string,
      time: string
    },
    departInfo: {
      name: string,
      code: string,
      time: string
    },
    price: string,
    time: string,
    duration: string,
    flightNo: string
}
export default function Flight() {
    const [org, setOrigin] = useState<airport>({id: '',name: ''});
    const [dest, setDestination] = useState<airport>({id: '',name: ''});
    const [originSuggestions, setOriginSuggestions] = useState<[airport] | []>([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState<[airport] | []>([]);
    const [loading,setLoading] = useState(false);
    const[ flights,setFlights] = useState<[flight]| []>([]);
    const fetchAirports = async (query: string, setSuggestions: React.Dispatch<React.SetStateAction<[airport] | []>>) => {
        if (query.length < 2) return; // Fetch only if query is at least 2 characters
        try {
            const response = await fetch(`/api/airports?query=${query}`);
            const data = await response.json();
            setSuggestions(data?.data || []);
        } catch (error) {
            console.error('Error fetching airports:', error);
        }
    };

    async function handleSubmit(e: FormEvent){
       e.preventDefault();
       setLoading(true);
       const form = e.target as HTMLFormElement;
       const formData = new FormData(form);
       const destination = dest.id;
       const origin = org.id
       const startDate = formData.get('startDate') as string;

       const res = await fetch("/api/flight",{
        method: 'POST',
        body: JSON.stringify({destination,origin,startDate})
       })
       const data = await res.json();
       setFlights(data?.data);
       setLoading(false);
    }

    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Use a ref to persist the timeout
    const handleOriginChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setOrigin((p)=>({...p, name: value}));
    
        // Clear the previous timeout
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
    
        // Set a new timeout to fetch suggestions after a delay
        debounceTimeoutRef.current = setTimeout(() => {
          fetchAirports(value, setOriginSuggestions);
        }, 500); // 300ms delay
    };
    
    const handleDestinationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDestination((p)=>({...p, name: value}));
         // Clear the previous timeout
         if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
          }
      
          // Set a new timeout to fetch suggestions after a delay
          debounceTimeoutRef.current = setTimeout(() => {
              fetchAirports(value, setDestinationSuggestions);
          }, 500); // 300ms delay
    };
    
    const selectOrigin = (airport: airport) => {
        console.log("ok",airport)
        setOrigin(airport);
        setOriginSuggestions([]);
    };
    
    const selectDestination = (airport: airport) => {
        setDestination(airport);
        setDestinationSuggestions([]);
    };
  return (
    <>
       <h3 className="text-2xl font-semibold text-blue-700 mb-4">Flights</h3>
         <form onSubmit={handleSubmit} method='POST'>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className='relative'>
                        <label htmlFor="flight-origin" className="block text-gray-700 font-medium mb-2">Origin</label>
                        <input type="text" id="flight-origin" name='origin' value={org?.name} onChange={handleOriginChange}  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., New York" />
                        {originSuggestions.length > 0 && (
              <ul className="bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-full max-h-40 overflow-y-auto absolute z-10">
                {originSuggestions.map((airport, index) => (
                  <li
                    key={index}
                    onClick={() => selectOrigin(airport)}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {airport.name}
                  </li>
                ))}
              </ul>
            )}
                    </div>
                    <div className='relative'>
                        <label htmlFor="flight-destination" className="block text-gray-700 font-medium mb-2">Destination</label>
                        <input type="text" id="flight-destination" name='destination' value={dest?.name} onChange={handleDestinationChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., London" />
                        {destinationSuggestions.length > 0 && (
              <ul className="bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-full max-h-40 overflow-y-auto absolute z-10">
                {destinationSuggestions.map((airport, index) => (
                  <li
                    key={index}
                    onClick={() => selectDestination(airport)}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {airport.name}
                  </li>
                ))}
              </ul>
            )}
                    </div>
                    <div>
                        <label htmlFor="flight-depart" className="block text-gray-700 font-medium mb-2">Departure Date</label>
                        <input type="date" id="flight-depart" name='startDate' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  
                </div>
                {!loading?<button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">
                    Search Flights
                </button>:
                <button disabled className="w-full bg-blue-600  text-white font-bold py-3 rounded-lg shadow-md transform  transition-all duration-300 ease-in-out animate-pulse">
                    Finding Flights for you...
                </button>}
         </form>

                <FlightResult flights={flights}/>
    </>
  )
}

