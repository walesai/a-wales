'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Success() {
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Get session_id from URL if Stripe redirected here
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) {
      console.log('Payment successful - Session ID:', sessionId);
    }
  }, []);

  const saveEmail = () => {
    if (email) {
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isSubscribed', 'true');
      setSaved(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="text-5xl font-bold mb-4">Thank You!</h1>
        <p className="text-2xl text-zinc-400 mb-10">Your subscription is now active</p>

        {!saved ? (
          <>
            <p className="mb-6 text-zinc-300">Enter your email to activate full access:</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 text-white mb-6 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={saveEmail}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl font-semibold text-lg hover:scale-105 transition"
            >
              Activate My Account
            </button>
          </>
        ) : (
          <div>
            <p className="text-green-400 text-xl mb-8">✅ Account activated successfully!</p>
            <Link href="/chat" className="block w-full py-4 bg-white text-black rounded-2xl font-semibold">
              Start Using a.wales →
            </Link>
          </div>
        )}

        <p className="mt-10 text-sm text-zinc-500">You can manage your subscription in your Stripe account anytime.</p>
      </div>
    </div>
  );
}