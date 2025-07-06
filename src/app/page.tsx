import Link from "next/link";



export default function Home() {
  return (
    <section id="home-page" className="page-section active w-full max-w-6xl bg-white shadow-lg rounded-xl p-8 mb-8 text-center">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-indigo-800 mb-6 leading-tight">
                    Your Dream Trip, Curated by AI.
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl">
                    WanderWise uses advanced AI to craft personalized itineraries, find the best deals, and provide real-time travel insights for an unforgettable journey.
                </p>
                <Link className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out" data-target="itinerary-page" href={"plan-trip"}>
                    Start Planning Your Trip
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
                <div className="bg-indigo-50 p-6 rounded-lg shadow-md hover:bg-indigo-100 cursor-pointer">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-3"><Link href={"plan-trip"}>Smart Itinerary Builder</Link></h3>
                    <p className="text-gray-600">Input your destination, budget, and preferences, and let AI craft your perfect travel plan.</p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg shadow-md hover:bg-indigo-100 cursor-pointer">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-3"><Link href={"booking"}>Real-Time Suggestions</Link></h3>
                    <p className="text-gray-600">Get live flight and hotel deals integrated from top booking APIs.</p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg shadow-md hover:bg-indigo-100 cursor-pointer">
                    <h3 className="text-xl font-semibold text-indigo-700 mb-3"><Link href={"chat"}>AI Chat Assistant</Link></h3>
                    <p className="text-gray-600">Your personal travel guru for advice, packing tips, and local insights.</p>
                </div>
            </div>
        </section>
  );
}
