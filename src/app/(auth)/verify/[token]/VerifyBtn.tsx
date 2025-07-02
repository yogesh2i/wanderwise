'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function VerifyBtn() {
    const {pending} = useFormStatus();
  return (
    <button
    type="submit"
    disabled={pending}
    className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ${pending?'animate-pulse':''}`}
  >
   {pending?'Verifying...':'Verify Email'}
  </button>
  )
}
