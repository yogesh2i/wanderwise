
import Link from 'next/link';
import React from 'react';
import LoginForm from './Form';
import GoogleSignBtn from '@/components/auth/GoogleSignBtn';


export default function page() {

 
  return (
    <section id="auth-page" className="page-section w-full max-w-md bg-white shadow-lg rounded-xl p-8 mb-8 mx-auto">
    <h2 id="auth-title" className="text-3xl font-bold text-indigo-800 mb-6 text-center">Login to WanderWise</h2>
    <p className="text-center text-gray-600 mb-8" id="auth-subtitle">Access your personalized travel plans.</p>
   <LoginForm/>
   

    <p className="text-center text-gray-600 mt-6">
        Don&apos;t have an account? <Link id="toggle-auth" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200" href="signup">Sign Up</Link>
    </p>

    <div className="flex items-center justify-center mt-6">
      <Link href="/auth/forgot" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200">
        Forgot Password?
      </Link>
      </div>
   
    <div className="flex items-center justify-center mt-6">
      <span className="border-t border-gray-300 w-full"></span>
      <span className="mx-4 text-gray-500">OR</span>
      <span className="border-t border-gray-300 w-full"></span>
    </div>
    <div className="flex items-center justify-center mt-6">
      <GoogleSignBtn/>
    </div>

</section>
  )
}
