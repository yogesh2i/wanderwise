import React from 'react';

interface Data{
    data:{
    more_to_explore: string,
    local_event_weather: string,
    budget_optimizer_tip: string
    }
}
export default function Itinerary({data}: Data) {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-indigo-100">
      
    <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Your Personalized Itinerary</h3>
    <div id="itinerary-output" className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[300px] text-gray-700 leading-relaxed">
        <p className="text-gray-500 italic">Your AI-generated itinerary will appear here. It will include daily plans, activity suggestions, and optimized routes.</p>
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">Budget Optimizer Tip:</h4>
            <p className="text-yellow-700">&quot;{data.budget_optimizer_tip}&quot;</p>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Local Event & Weather:</h4>
            <p className="text-blue-700">&quot;{data.local_event_weather}&quot;</p>
        </div>
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">More To Explore:</h4>
            <p className="text-green-700">&quot;{data.more_to_explore}&quot;</p>
        </div>
    </div>
    <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">
        Save Itinerary
    </button>
</div>
  )
}
