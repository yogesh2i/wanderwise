
import Link from 'next/link';
import React from 'react';
import LoginForm from './Form';


export default function page() {

 
  return (
    <section id="auth-page" className="page-section w-full max-w-md bg-white shadow-lg rounded-xl p-8 mb-8 mx-auto">
    <h2 id="auth-title" className="text-3xl font-bold text-indigo-800 mb-6 text-center">Login to WanderWise</h2>
    <p className="text-center text-gray-600 mb-8" id="auth-subtitle">Access your personalized travel plans.</p>
   <LoginForm/>
   

    <p className="text-center text-gray-600 mt-6">
        Don&apos;t have an account? <Link id="toggle-auth" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200" href="signup">Sign Up</Link>
    </p>
</section>
  )
}
