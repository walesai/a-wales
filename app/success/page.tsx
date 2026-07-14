'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Success() {
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) {
      console.log('✅ Success - Session:', sessionId);
    }
  }, []);

  const activateAccount = () => {
    if (email.trim()) {
      localStorage.setItem('userEmail', email.trim());
      localStorage.setItem('isSubscribed', 'true');
      localStorage.setItem('subscriptionDate', new Date().toISOString());
      setSaved(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-md text-center">
        <div className="text-8xl mb-8">🐉</div>
        <h1 className="text-5xl font-bold mb-4">Welcome to a.wales Premium!</h1>
        <p className="text-zinc-400 text-xl mb-10">Your subscription is active</p>

        {!saved ? (
          <div className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 focus:border-blue-500 outline-none text-lg"
            />
            <button
              onClick={activateAccount}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-red-500 rounded-2xl font-semibold text-xl hover:brightness-110 transition"
            >
              Activate Full Access
            </button>
          </div>
        ) : (
          <div>
            <p className="text-green-400 text-2xl mb-8">✅ Full access activated!</p>
            <Link 
              href="/chat" 
              className="block w-full py-4 bg-white text-black rounded-2xl font-semibold text-xl hover:bg-zinc-100 transition"
            >
              Go to Chat →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}