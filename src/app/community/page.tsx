import React from 'react'

export default function page() {
    return (
        <section id="recommendations-page" className="page-section w-full max-w-6xl bg-white shadow-lg rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Community Travel Hacks & Hidden Gems</h2>
            <p className="text-center text-gray-600 mb-8">Discover and share amazing travel tips from fellow explorers!</p>

            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out mb-8 mx-auto block">
                Share Your Own Tip
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-purple-100">
                    <h3 className="text-xl font-semibold text-purple-700 mb-2">Hidden Street Art in Berlin</h3>
                    <p className="text-gray-700 mb-3">&quot;Don&apos;t miss the smaller alleyways around Rosenthaler Platz for incredible, ever-changing street art. It&apos;s a true open-air gallery!&quot;</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>By @TravelExplorer</span>
                        <div className="flex items-center">
                            <span className="mr-1">👍</span> <span>124 Upvotes</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-purple-100">
                    <h3 className="text-xl font-semibold text-purple-700 mb-2">Best Gelato Spot in Florence</h3>
                    <p className="text-gray-700 mb-3">&quot;Forget the main squares, find &apos;Gelateria La Carraia&apos; near Ponte alla Carraia. Authentic, creamy, and less touristy!&quot;</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>By @FoodieTraveler</span>
                        <div className="flex items-center">
                            <span className="mr-1">👍</span> <span>98 Upvotes</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-purple-100">
                    <h3 className="text-xl font-semibold text-purple-700 mb-2">Sunrise Hike in Patagonia</h3>
                    <p className="text-gray-700 mb-3">&quot;The Laguna de los Tres hike is tough, but starting pre-dawn to catch the sunrise over Fitz Roy is absolutely breathtaking. Worth every step!&quot;</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>By @AdventureSeeker</span>
                        <div className="flex items-center">
                            <span className="mr-1">👍</span> <span>210 Upvotes</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
