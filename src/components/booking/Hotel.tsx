import React from 'react'

export default function Hotel() {
  return (
    <>
       <h3 className="text-2xl font-semibold text-green-700 mb-4">Hotels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div>
                        <label htmlFor="hotel-destination" className="block text-gray-700 font-medium mb-2">Destination</label>
                        <input type="text" id="hotel-destination" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="e.g., London" />
                    </div>
                    <div>
                        <label htmlFor="check-in" className="block text-gray-700 font-medium mb-2">Check-in Date</label>
                        <input type="date" id="check-in" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                        <label htmlFor="check-out" className="block text-gray-700 font-medium mb-2">Check-out Date</label>
                        <input type="date" id="check-out" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                        <label htmlFor="guests" className="block text-gray-700 font-medium mb-2">Guests</label>
                        <input type="number" id="guests" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="2" />
                    </div>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">
                    Search Hotels
                </button>

                <div className="mt-8">
                    <h4 className="text-xl font-semibold text-green-700 mb-4">Hotel Results (Mock)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-lg">The Grand London Hotel</span>
                                <span className="text-green-600 font-bold">$180/night</span>
                            </div>
                            <p className="text-gray-600">Rating: 4.5/5</p>
                            <p className="text-gray-600">Location: City Center</p>
                            <button className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-sm">View Details</button>
                        </div>
                       <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-lg">Riverside Boutique Inn</span>
                                <span className="text-green-600 font-bold">$120/night</span>
                            </div>
                            <p className="text-gray-600">Rating: 4.2/5</p>
                            <p className="text-gray-600">Location: Near Thames</p>
                            <button className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-sm">View Details</button>
                        </div>
                    </div>
                </div>
    </>
  )
}
