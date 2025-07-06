'use client';
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null as string | null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {

    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      username: email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      window.location.href = '/';
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignIn}>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
        <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
        <input type="password" id="password" name="password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button disabled={loading} type="submit" id="auth-button" className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out ${loading && 'animate-pulse'}`}>
        {!loading ? "Login" : "Logging in..."}
      </button>

    </form>
  )
}
