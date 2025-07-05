import { redirect, RedirectType } from 'next/navigation';
import React from 'react';

export default function Page() {
    
    const handleReset = async (formData: FormData) => {
    'use server'; 
    const email = formData.get('email');
    if (!email || typeof email !== 'string') {
      throw new Error('Invalid email address');
    } 
    const response = await fetch('http://localhost:3000/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to reset password');
    }    
    redirect("/forgetPassword/resend",RedirectType.replace);
}

  return (
    <form action={handleReset}>
<div className="flex flex-col items-center justify-center">
    <div className="w-full  bg-white rounded-lg shadow-lg p-10">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h1>
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Enter Email Address</label>
            <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="your.email@example.com"
            />
        </div>
        <button
            type="submit"
            id="auth-button"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
            Reset Password
        </button>
    </div>
</div>

</form>
  )
}
