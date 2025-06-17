'use client';
import React, { useActionState } from 'react'
import Form from 'next/form';
import { FormState, LoginAction } from '@/actions/LoginAction';
import SubmitButton from './SubmitButton';

export default function LoginForm() {
    const initialState: FormState= {
        errors: {}
       }
    const [state, formAction] = useActionState(LoginAction, initialState);
  return (
    <Form action={formAction}>
         {state.errors.global && (
            <p className="text-red-500 text-sm mt-1">{state.errors.global}</p>
        )}
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
        {state.errors.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
        )}
    </div>
   <SubmitButton/>
   
</Form>
  )
}
