'use client'
import React from 'react'

export default function Error({error, reset}: {error: Error & {digest?: string}, reset: () => void}) {
  console.log(error)
  return (
    <div>
        <h1 className='text-xl font-bold text-center m-10'>An error Occured.Please check if details are correct.</h1>
      <button onClick={reset} className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out '>Try Again</button>
    </div>
  )
}
