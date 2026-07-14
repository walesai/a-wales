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
      console.log('✅ Payment successful - Session ID:', sessionId);
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white flex items-center justify-center px-6 py-12">
      
      {/* Consistent Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 w-full">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🐉</span>
            <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition">a.wales</Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-base">
            <Link href="/chat" className="hover:text-blue-400 transition">Chat</Link>
            <Link href="/pricing" className="hover:text-blue-400 transition">Pricing</Link>
          </nav>
          <Link href="/chat" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium transition">
            Start Chatting
          </Link>
        </div>
      </header>

      <div className="max-w-md text-center mt-20">
        <div className="text-8xl mb-8">🎉</div>
        <h1 className="text-5xl font-bold mb-4">Thank You!</h1>
        <p className="text-2xl text-zinc-400 mb-10">Your subscription is now active</p>

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