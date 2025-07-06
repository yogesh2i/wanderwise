import Link from 'next/link';
import React from 'react'

interface flights {
  flights: [{
    name: string,
    itemKey: string,
    priceKey: string,
    arriveInfo: {
      name: string,
      code: string,
      time: string,
    },
    departInfo: {
      name: string,
      code: string,
      time: string,
    },
    price: string,
    time: string,
    duration: string,
    flightNo: string
  }] | []
}
export default function FlightResult({ flights }: flights) {

  function convertMinutesToHoursMinutes(minutes: number): string {
    console.log(minutes)
    const hours = Math.floor(minutes / 60); // Get the number of hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes
    return `${hours}h ${remainingMinutes}m`;
  }

  return (
    <>
      {flights?.length > 0 && <div className="mt-8">
        <h4 className="text-xl font-semibold text-blue-700 mb-4">Flight Results</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flights.length > 0 && flights.map((i) => {
            return <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100" key={i.itemKey}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">{i.name}</span>
                <span className="text-blue-600 font-bold">${i.price}</span>
              </div>
              <p className="text-gray-600">Boarding: {i.departInfo.name}</p>
              <p className="text-gray-600">Arriving: {i.arriveInfo.name}</p>
              <p className="text-gray-600">Flight Number: {i.flightNo}</p>
              <p className="text-gray-600">Duration: {convertMinutesToHoursMinutes(parseInt(i.duration))}</p>
              <p className="text-gray-600">Time: {(new Date(i.time)).toLocaleString()}</p>
              <Link className="mt-3 w-full flex justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm" href={`/booking/flight/${i.itemKey}/${i.priceKey}`}>View Details</Link>
            </div>

          })}

        </div>
      </div>
      }
    </>
  )
}
