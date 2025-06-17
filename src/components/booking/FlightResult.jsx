import React from 'react'

export default function FlightResult({flights}) {
  return (
    <div className="mt-8">
    <h4 className="text-xl font-semibold text-blue-700 mb-4">Flight Results</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {flights.length>0 && flights.map((i)=>{
       return <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100" key={i.itemKey}>
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">{i.name}</span>
                <span className="text-blue-600 font-bold">${i.price}</span>
            </div>
            <p className="text-gray-600">Flight Number: {i.flightNo}</p>
            <p className="text-gray-600">Duration: {i.duration}</p>
            <p className="text-gray-600">Dates: {(new Date(i.time)).toLocaleTimeString()}</p>
            <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm">View Details</button>
        </div>

       })}
       
    </div>
</div>
  )
}
