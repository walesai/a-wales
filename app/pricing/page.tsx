'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: 'monthly' | 'annual') => {
    setLoading(plan);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('No checkout URL received');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      
      {/* Consistent Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
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

      {/* Pricing Content */}
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-red-500 bg-clip-text text-transparent">Choose Your Plan</h1>
          <p className="text-2xl text-zinc-400 mb-12">Powerful AI for Wales</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free */}
          <div className="bg-zinc-900/50 border border-zinc-700 rounded-3xl p-8 flex flex-col">
            <h3 className="text-3xl font-semibold mb-2">Free</h3>
            <p className="text-6xl font-bold mb-8">£0</p>
            <ul className="space-y-4 mb-10 flex-1 text-zinc-300">
              <li>✅ Limited daily messages</li>
              <li>✅ Basic AI chat</li>
            </ul>
            <Link href="/chat" className="mt-auto block w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-center rounded-2xl font-medium">
              Start Free
            </Link>
          </div>

          {/* Monthly */}
          <div className="bg-white text-zinc-900 rounded-3xl p-8 flex flex-col relative scale-105 shadow-2xl border-2 border-blue-500">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-full">
              MOST POPULAR
            </div>
            <h3 className="text-3xl font-semibold mb-2">Monthly</h3>
            <p className="text-6xl font-bold mb-2">£4.99</p>
            <p className="text-zinc-500 mb-8">per month</p>
            <ul className="space-y-4 mb-10 flex-1">
              <li>✅ Unlimited messages</li>
              <li>✅ Faster responses</li>
              <li>✅ Image generation</li>
            </ul>
            <button
              onClick={() => handleCheckout('monthly')}
              disabled={loading === 'monthly'}
              className="mt-auto w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold rounded-2xl text-lg transition"
            >
              {loading === 'monthly' ? 'Processing...' : 'Subscribe Monthly'}
            </button>
          </div>

          {/* Annual */}
          <div className="bg-zinc-900/50 border border-zinc-700 rounded-3xl p-8 flex flex-col">
            <h3 className="text-3xl font-semibold mb-2">Annual</h3>
            <p className="text-6xl font-bold mb-2">£49</p>
            <p className="text-emerald-400 font-medium mb-8">Save ~18%</p>
            <ul className="space-y-4 mb-10 flex-1 text-zinc-300">
              <li>✅ Everything in Monthly</li>
              <li>✅ Best value</li>
            </ul>
            <button
              onClick={() => handleCheckout('annual')}
              disabled={loading === 'annual'}
              className="mt-auto w-full py-4 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold rounded-2xl text-lg transition"
            >
              {loading === 'annual' ? 'Processing...' : 'Subscribe Annually'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}