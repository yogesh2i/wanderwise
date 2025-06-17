import Flight from '@/components/booking/Flight'
import Hotel from '@/components/booking/Hotel'
import React from 'react'

export default function page() {
  return (
    <section id="booking-page" className="page-section w-full max-w-6xl bg-white shadow-lg rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Find the Best Deals</h2>
            <p className="text-center text-gray-600 mb-8">Compare real-time prices for flights and hotels worldwide.</p>

            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
               <Flight/>
            </div>

            <div className="bg-green-50 p-6 rounded-lg shadow-md">
               <Hotel/>
            </div>
        </section>
  )
}
