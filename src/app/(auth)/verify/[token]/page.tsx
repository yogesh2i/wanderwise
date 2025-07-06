
import { redirect } from 'next/navigation';
import React from 'react';
import VerifyBtn from './VerifyBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { apiUrl } from '@/utility/constants';
type Params = Promise<{ token: string }>
export default async function Page({ params }: { params: Params }) {
  const { token } = await params;

  async function submitForm() {
    'use server';
    const response = await fetch(`${apiUrl}/auth/verify/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const session = await getServerSession(authOptions);
      if (session) {
        session.user.isVerified = true;
      }
      console.log(session);
      redirect('/');
    } else {

      const result = await response.json();
      throw new Error(result.error || 'Verification failed');
    }
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
          <p className="mb-6">Please click the button below to verify your email address.</p>
          <form action={submitForm}>
            <VerifyBtn />
          </form>
        </div>
      </div>
    </>
  )
}
