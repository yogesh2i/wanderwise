'use client'
import { useSession } from 'next-auth/react';
import React from 'react';

export default function Page() {
    const {data} = useSession();
    const email = data?.user.email;

    const resendMail = async () => {
        try {
        const response = await fetch('/api/auth/verify/resend-mail', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    
        if (!response.ok) {
            throw new Error('Failed to resend verification email');
        }
        alert('Verification email resent successfully!');
    
        } catch (error) {
        console.error('Error resending verification email:', error);
        alert('An error occurred while resending the verification email. Please try again later.');
        }
    };

  return (
    <div>
        <h1 className="text-3xl font-bold text-center mt-10">Verify Your Email</h1>
        <p className="text-center mt-4">Please check your email for a verification link. Click the link to verify your account.</p>
        <p className="text-center mt-2">If you didn't receive an email, please check your spam folder or <button type='button' onClick={resendMail} className="text-indigo-600 hover:underline">click here to resend the verification email</button>.</p>
    </div>
  )
}
