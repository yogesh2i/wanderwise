'use client';
import { FormEvent, useState } from 'react';
import Itinerary from './Itinerary';

interface Data{
    data:{
    more_to_explore: string,
    local_event_weather: string,
    budget_optimizer_tip: string,
    error: string
    }
}
export default function TripPlanner() {
  const [itineraryData, setItineraryData] = useState<Data["data"]>({
    more_to_explore: "Get more nearby places to explore",
    local_event_weather: "Details about local weather",
    budget_optimizer_tip: "Budget friendly recommendations",
    error: ""
  });
  const [loading,setLoading] = useState(false);
   async function handleGenerateItinerary(e:FormEvent){
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const destination = formData.get('destination') as string;
    const start = formData.get('start') as string;
    const end = formData.get('end') as string;
    const budget = formData.get('budget') as string;
    const preferences = formData.getAll('prefernce') as string[];

     const res = await fetch("/api/plan-trip",{
        method: "POST",
        body: JSON.stringify({destination,start,end,budget,preferences})
     })
     const data = await res.json();
     if(data?.error){
        alert(data.error);
     }
    setItineraryData(data?.data);
    setLoading(false);
}

  
  return (

    <>
    <div className="lg:col-span-1 bg-indigo-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Trip Details</h3>
            <form onSubmit={handleGenerateItinerary} method='POST'>

            <div className="mb-4">
                <label htmlFor="destination" className="block text-gray-700 font-medium mb-2">Destination</label>
                <input type="text" name='destination' id="destination" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Paris, France"/>
            </div>
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                    <label htmlFor="start-date" className="block text-gray-700 font-medium mb-2">Start Date</label>
                    <input type="date" id="start-date" name='start' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>
                <div className="w-full sm:w-1/2">
                    <label htmlFor="end-date" className="block text-gray-700 font-medium mb-2">End Date</label>
                    <input type="date" id="end-date" name='end' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">Budget (USD)</label>
                <input type="number" id="budget" name='budget' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., 2000"/>
            </div>

            <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Travel Preferences</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <label className="flex items-center space-x-2 text-gray-700">
                    <input type="checkbox" name="prefernce" value={"Adventure"} className="form-checkbox h-5 w-5 text-indigo-600 rounded-md"/>
                    <span>Adventure</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700">
                    <input type="checkbox" name="prefernce" value={"Relaxation"} className="form-checkbox h-5 w-5 text-indigo-600 rounded-md"/>
                    <span>Relaxation</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700">
                    <input type="checkbox" name="prefernce" value={"Cultural"} className="form-checkbox h-5 w-5 text-indigo-600 rounded-md"/>
                    <span>Cultural</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700">
                    <input type="checkbox" name="prefernce" value={"Foodie"} className="form-checkbox h-5 w-5 text-indigo-600 rounded-md"/>
                    <span>Foodie</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700">
                    <input type="checkbox" name="prefernce" value={"Nature"} className="form-checkbox h-5 w-5 text-indigo-600 rounded-md"/>
                    <span>Nature</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700">
                    <input type="checkbox" name="prefernce" value={"Shopping"} className="form-checkbox h-5 w-5 text-indigo-600 rounded-md"/>
                    <span>Shopping</span>
                </label>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">
    {!loading?'Generate My Itinerary':'Generating....'}
</button>
            </form>
        </div>
        <Itinerary data={itineraryData} />
    </>

  )
}
