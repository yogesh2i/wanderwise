"use client";
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" id="auth-button" className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out ${pending && 'animate-pulse'}`}>
      {!pending ? "Sign Up" : "Signing in..."}
    </button>
  )
}
