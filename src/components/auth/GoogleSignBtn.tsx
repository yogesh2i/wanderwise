'use client'
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

export default function GoogleSignBtn() {
  const [loading,setLoading] = useState(false);
  const handleSignIn = async ()=>{
    setLoading(true);
    await signIn("google",{redirect:true, callbackUrl: '/'});
    setLoading(false);
  }
  return (
    <button onClick={handleSignIn}  type="submit" id="auth-button" className={`w-full px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out ${loading && 'animate-pulse'}`}>
    {loading?'Joining...':"Join with google"}
</button>
  )
}
