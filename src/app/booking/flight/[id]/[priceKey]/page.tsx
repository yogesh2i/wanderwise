'use client'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface flightData {
    name: string,
    itemKey: string,
    priceKey: string,
    departInfo: {
      name: string,
      code: string,
      time: string
    },
    arriveInfo: {
      name: string,
      code: string,
      time: string
    },
    timeRemaining: string,
    price: string,
    duration: string,
    flightNo: string,
    fareRules: {
      segmentTitle: string,
      rules: {
        title: string,
        text: string
      }[]  
    }[]
}


export default function Page() {
    const {id,priceKey} = useParams();
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
    const [flightData,setFlightData] = useState<flightData | null>(null);
    const [isRulesVisible, setIsRulesVisible] = useState(false);

    useEffect(()=>{
         fetch(`/api/flight/${id}/${priceKey}`)
          .then(response => response.json())
          .then(data => {
            if (data?.success) {
              setFlightData(data.data);
            } else {
              alert(data?.error);
            }
          })
          .catch(error => {
            alert(`An error occurred: ${error.message}`);
          });
            
    },[id,priceKey])

  const toggleRulesVisibility = () => {
    setIsRulesVisible(!isRulesVisible);
  };

    const rows = 5;
  const seatsPerRow = ['A', 'B', 'C', '', 'D', 'E', 'F']; // '' for aisle
  const takenSeats = ['1A', '2C', '3F', '4B']; // Example taken seats

 const router = useRouter();
  const handleSeatClick = (seatId: string) => {
    if (takenSeats.includes(seatId)) {
      return; // Cannot select a taken seat
    }
    setSelectedSeat(seatId); // Update the selected seat
  };

  const renderSeats = () => {
    const seatGrid: React.ReactNode[] = [];
    for (let r = 1; r <= rows; r++) {
      seatsPerRow.forEach((seatLetter, index) => {
        if (seatLetter === '') {
          // Add an empty div for the aisle
          seatGrid.push(
            <div key={`aisle-${r}-${index}`} className="w-full h-full"></div>
          );
        } else {
          const seatId = `${r}${seatLetter}`;
          const isTaken = takenSeats.includes(seatId);
          const isSelected = selectedSeat === seatId;

          seatGrid.push(
            <div
            key={seatId}
            className={`flex justify-center items-center w-10 h-10 border rounded-md text-sm font-bold cursor-pointer ${
              isTaken
                ? 'bg-red-200 text-red-700 cursor-not-allowed'
                : isSelected
                ? 'bg-green-200 text-green-700'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
            onClick={() => handleSeatClick(seatId)}
          >
            {seatId}
          </div>
          );
        }
      });
    }
    return seatGrid;
  };
  if(flightData === null) {
    return <p>Loading...</p>
  }
  else { 
    return (
   <section id="flight-booking-detail-page" className="page-section w-full max-w-6xl bg-white shadow-lg rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Complete Your Flight Booking</h2>
            <p className="text-center text-gray-600 mb-8">Review your flight details and finalize your reservation.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:col-span-1 bg-blue-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">Flight Details</h3>
                    <div className="space-y-3 text-gray-700 mb-6">
                        <p><strong>Route:</strong> {flightData?.departInfo?.code} to {flightData?.arriveInfo?.code}</p>
                        <p><strong>Airline:</strong> {flightData?.name}</p>
                        <p><strong>Date:</strong> {new Date(flightData?.departInfo?.time || '').toDateString()}</p>
                        <p><strong>Departure:</strong> {new Date(flightData?.departInfo?.time || '').toTimeString()} ({flightData?.departInfo?.code})</p>
                        <p><strong>Arrival:</strong> {new Date(flightData?.arriveInfo?.time || '').toTimeString()} ({flightData?.arriveInfo?.code})</p>
                        <p><strong>Total Price:</strong> <span className="font-bold text-blue-600 text-xl">${flightData?.price} USD</span></p>
                    </div>

                    <div className="bg-red-100 border border-red-300 text-red-800 p-4 rounded-lg text-center font-bold text-lg mb-6">
                        Booking Window: <span id="countdown-timer">{flightData?.timeRemaining}</span> hours remaining!
                    </div>

                    <button onClick={()=>router.push("/booking")} className="w-full  mt-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out">
                        &larr; Back to Flights
                    </button>
                </div>
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md border border-blue-100">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Seat Selection
          </h3>
          <div
            id="seat-grid"
            className="grid grid-cols-7 gap-2 mb-6"
            style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}
          >
            {renderSeats()}
          </div>
          <div
            id="selected-seat-display"
            className="text-center text-lg font-bold text-gray-700"
          >
            {selectedSeat
              ? `Selected Seat: ${selectedSeat}`
              : 'No seat selected'}
          </div>
          <div className='flex justify-between items-center mt-5'>
            <span className='rounded-md bg-green-200 text-green-700  p-2'>Selected</span>
            <span className='rounded-md bg-blue-100 text-blue-700 p-2'>Availaible</span>
            <span className='rounded-md bg-red-200 text-red-700 p-2'>Occupied</span>
          </div>
        </div>
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md border border-blue-100">
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4">Passenger & Payment</h3>

                    <div className="mb-6">
                        <h4 className="text-xl font-semibold text-gray-700 mb-3">Passenger Information</h4>
                        <div className="mb-4">
                            <label htmlFor="first-name" className="block text-gray-700 font-medium mb-2">First Name</label>
                            <input type="text" id="first-name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="last-name" className="block text-gray-700 font-medium mb-2">Last Name</label>
                            <input type="text" id="last-name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Doe"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="passenger-email" className="block text-gray-700 font-medium mb-2">Email</label>
                            <input type="email" id="passenger-email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john.doe@example.com"/>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-semibold text-gray-700 mb-3">Payment Information</h4>
                        <div className="mb-4">
                            <label htmlFor="card-number" className="block text-gray-700 font-medium mb-2">Card Number</label>
                            <input type="text" id="card-number" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="**** **** **** 1234"/>
                        </div>
                        <div className="mb-4 flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-1/2">
                                <label htmlFor="expiry-date" className="block text-gray-700 font-medium mb-2">Expiry Date</label>
                                <input type="text" id="expiry-date" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="MM/YY"/>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">CVV</label>
                                <input type="text" id="cvv" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="***"/>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out" onClick={()=>router.push("/")}>
                        Confirm Booking ($550)
                    </button>
                </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
            <h3
        className="text-2xl font-semibold text-gray-800 mb-4 cursor-pointer flex justify-between items-center"
        onClick={toggleRulesVisibility}
      >
        Flight Rules & Policies
        <span
          id="rules-toggle-icon"
          className="text-gray-500 text-xl"
        >
          {isRulesVisible ? "-" : "+"}
        </span>
      </h3>
             {isRulesVisible && flightData?.fareRules &&  <div id="rules-content" className="text-gray-700 leading-relaxed space-y-3">
                  {flightData?.fareRules[0]?.rules.map((rule, index) => (<React.Fragment key={index}>
                    <p><strong>{rule.title}:</strong></p>
                     <p>{rule.text}</p>
                  </React.Fragment>))}
                    <p className="font-semibold text-sm mt-4">By confirming your booking, you agree to the airline&apos;s terms and conditions.</p>
                
            </div>}
            </div>
        </section>

  )
}
}
