"use client";
import Link from 'next/link';
import React, { useState } from 'react'

interface Logged {
    isLoggedIn: string
}

export default function NavLinks({isLoggedIn}: Logged) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleLinkClick = () => {
      setIsMenuOpen(false);
    };
    const handleLogout = ()=>{
    
        handleLinkClick();
        fetch('/api/logout')
            .then((response) => {
                if (response.ok) {
                    console.log('Logged out successfully');
                     window.location.reload();
                } else {
                    console.error('Failed to log out');
                }
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            });

    }
  return (
    <>
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="text-2xl font-bold text-indigo-700">WanderWise</div>
        <button 
          className="sm:hidden text-indigo-700 focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>
      <ul className={`flex-col sm:flex-row flex-wrap justify-center gap-4 text-lg [&>li]:cursor-pointer ${isMenuOpen ? 'flex' : 'hidden'} sm:flex`}>
        <li><Link className="nav-btn px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-indigo-700 font-medium" data-target="home-page" href={"/"} onClick={handleLinkClick}>Home</Link></li>
        <li><Link className="nav-btn px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-indigo-700 font-medium" data-target="itinerary-page" href={"/plan-trip"} onClick={handleLinkClick}>Plan Trip</Link></li>
        <li><Link className="nav-btn px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-indigo-700 font-medium" data-target="booking-page" href={"/booking"} onClick={handleLinkClick}>Bookings</Link></li>
        <li><Link className="nav-btn px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-indigo-700 font-medium" data-target="chat-page" href={"/chat"} onClick={handleLinkClick}>AI Chat</Link></li>
        <li><Link className="nav-btn px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-indigo-700 font-medium" data-target="recommendations-page" href={"/community"} onClick={handleLinkClick}>Community</Link></li>
        {!isLoggedIn?<li><Link className="nav-btn px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-indigo-700 font-medium" data-target="auth-page" href={"/login"} onClick={handleLinkClick}>Login/Signup</Link></li>:
        <li><Link className="nav-btn px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-indigo-700 font-medium" data-target="auth-page" href={"/login"} onClick={handleLogout}  >Logout</Link></li>}
      </ul>
    </>
  )
}
