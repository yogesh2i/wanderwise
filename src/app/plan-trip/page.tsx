import React from 'react'
import TripPlanner from '@/components/plantrip/TripPlanner';
import AdvancedFeatures from '@/components/plantrip/AdvancedFeatures';
export default function page() {
  return (
    <section id="itinerary-page" className="page-section w-full max-w-6xl bg-white shadow-lg rounded-xl p-8 mb-8">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Plan Your Perfect Trip</h2>
      <p className="text-center text-gray-600 mb-8">Tell us about your next adventure, and our AI will do the rest!</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <TripPlanner />
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg shadow-md border border-blue-200 text-center">
        <AdvancedFeatures />
      </div>
    </section>
  )
}
