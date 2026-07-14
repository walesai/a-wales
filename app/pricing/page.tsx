'use client';
import Header from '@/components/Header';
import { useState } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white py-16 px-6">
      <Header />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-red-500 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-2xl text-zinc-400">Powerful AI for Wales</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free */}
          <div className="bg-zinc-900/50 border border-zinc-700 rounded-3xl p-8 flex flex-col">
            <h3 className="text-3xl font-semibold mb-2">Free</h3>
            <p className="text-6xl font-bold mb-8">£0<span className="text-xl font-normal text-zinc-400">/forever</span></p>
            
            <ul className="space-y-4 mb-10 flex-1 text-zinc-300">
              <li className="flex items-center gap-3">✅ Daily message limit</li>
              <li className="flex items-center gap-3">✅ Standard Grok AI</li>
              <li className="flex items-center gap-3">✅ Welsh focus</li>
            </ul>

            <a href="/chat" className="mt-auto block w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-center rounded-2xl font-medium transition">
              Start Free
            </a>
          </div>

          {/* Monthly - Popular */}
          <div className="bg-white text-zinc-900 rounded-3xl p-8 flex flex-col relative scale-105 shadow-2xl border-2 border-blue-500">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-full">
              MOST POPULAR
            </div>
            
            <h3 className="text-3xl font-semibold mb-2">Monthly</h3>
            <p className="text-6xl font-bold mb-2">£4.99</p>
            <p className="text-zinc-500 mb-8">per month</p>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3">✅ Unlimited messages</li>
              <li className="flex items-center gap-3">✅ Faster responses</li>
              <li className="flex items-center gap-3">✅ Image generation</li>
              <li className="flex items-center gap-3">✅ Priority Welsh AI</li>
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
              <li className="flex items-center gap-3">✅ Everything in Monthly</li>
              <li className="flex items-center gap-3">✅ Best value</li>
              <li className="flex items-center gap-3">✅ One payment per year</li>
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

        <p className="text-center text-zinc-500 mt-12 text-sm">
          Cancel anytime • Secure payment via Stripe
        </p>
      </div>
    </div>
  );
}