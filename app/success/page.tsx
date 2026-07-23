'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Success() {
  useEffect(() => {
    // Activate premium after successful payment
    localStorage.setItem('isSubscribed', 'true');
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-xl text-zinc-400 mb-8">
        Your Premium plan is now active.
      </p>
      <Link
        href="/chat"
        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-medium"
      >
        Start Chatting
      </Link>
    </div>
  );
}