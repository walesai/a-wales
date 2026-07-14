'use client';

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
        alert('No checkout URL received. Please check console (Option + ⌘ + J)');
        console.error('No URL:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Check console for details.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 text-zinc-900">Simple Pricing</h1>
        <p className="text-xl text-zinc-600 mb-12">Choose the plan that works for you</p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-2xl border border-zinc-200">
            <h3 className="text-2xl font-semibold mb-4">Free</h3>
            <p className="text-5xl font-bold mb-6">£0<span className="text-base font-normal">/month</span></p>
            <ul className="space-y-3 mb-8 text-left">
              <li>✅ Limited daily messages</li>
              <li>✅ Basic AI chat</li>
            </ul>
            <a href="/chat" className="block w-full py-3 bg-zinc-800 text-white rounded-xl font-medium">
              Start Free
            </a>
          </div>

          {/* Monthly */}
          <div className="bg-white p-8 rounded-2xl border-2 border-blue-600 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm px-4 py-1 rounded-full">Most Popular</div>
            <h3 className="text-2xl font-semibold mb-4">Monthly</h3>
            <p className="text-5xl font-bold mb-6">£4.99<span className="text-base font-normal">/month</span></p>
            <ul className="space-y-3 mb-8 text-left">
              <li>✅ Unlimited messages</li>
              <li>✅ Priority responses</li>
              <li>✅ Image generation</li>
            </ul>
            <button
              onClick={() => handleCheckout('monthly')}
              disabled={loading === 'monthly'}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium disabled:opacity-50"
            >
              {loading === 'monthly' ? 'Processing...' : 'Subscribe Monthly'}
            </button>
          </div>

          {/* Annual */}
          <div className="bg-white p-8 rounded-2xl border border-zinc-200">
            <h3 className="text-2xl font-semibold mb-4">Annual</h3>
            <p className="text-5xl font-bold mb-6">£49<span className="text-base font-normal">/year</span></p>
            <p className="text-green-600 font-medium mb-4">Save ~18%</p>
            <ul className="space-y-3 mb-8 text-left">
              <li>✅ Everything in Monthly</li>
              <li>✅ Best value</li>
            </ul>
            <button
              onClick={() => handleCheckout('annual')}
              disabled={loading === 'annual'}
              className="w-full py-3 bg-zinc-800 hover:bg-black text-white rounded-xl font-medium disabled:opacity-50"
            >
              {loading === 'annual' ? 'Processing...' : 'Subscribe Annually'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}