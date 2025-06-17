import React from 'react'

export default function AdvancedFeatures() {
  return (
    <>
       <h3 className="text-2xl font-semibold text-blue-800 mb-4">Explore Advanced Features</h3>
        <p className="text-gray-700 mb-4">
            Unlock next-level travel with AR-Powered Navigation and AI-Based Language Assistant.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">
                AR Navigation (Coming Soon)
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">
                Language Assistant (Explore in Chat)
            </button>
        </div>
    </>
  )
}
