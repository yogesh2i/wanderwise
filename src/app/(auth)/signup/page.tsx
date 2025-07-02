"use client";
import { SignupAction } from '@/actions/SignupAction'
import Link from 'next/link'
import React, { useActionState } from 'react'
import Form from 'next/form';
import SignupButton from './SignupButton';
import { FormState } from '@/types/commonTypes';
import GoogleSignBtn from '@/components/auth/GoogleSignBtn';

export default function Page() {
    const initialState: FormState= {
        errors: {}
       }
    
        const [state, formAction] = useActionState(SignupAction, initialState);
  return (
    <section id="auth-page" className="page-section w-full max-w-md bg-white shadow-lg rounded-xl p-8 mb-8 mx-auto">
    <h2 id="auth-title" className="text-3xl font-bold text-indigo-800 mb-6 text-center"> Create Your Account</h2>
    <p className="text-center text-gray-600 mb-8" id="auth-subtitle">Join WanderWise and start planning!</p>

    <Form action={formAction}>
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="your.email@example.com"/>
            {state.errors.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
        )}
        </div>
        <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input type="password" id="password" name="password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="********"/>
        </div>

       <SignupButton/>
    </Form>

    <p className="text-center text-gray-600 mt-6">
        Don&apos;t have an account? <Link id="toggle-auth" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200" href="login">Login</Link>
    </p>
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
