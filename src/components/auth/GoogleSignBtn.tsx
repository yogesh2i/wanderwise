'use client'
import { signIn } from 'next-auth/react';
import React from 'react';

export default function GoogleSignBtn() {
  return (
    <button onClick={()=>signIn("google",{redirect:true, callbackUrl: '/'})}  type="submit" id="auth-button" className={`w-full px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out`}>
    {"Join with google"}
</button>
  )
}
