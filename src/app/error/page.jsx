'use client';
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function Page() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
  return (
    <div>
     {error}
    </div>
  )
}
