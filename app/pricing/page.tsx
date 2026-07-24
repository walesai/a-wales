'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const [isWelsh, setIsWelsh] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preferredLang') === 'cy';
    setIsWelsh(saved);
  }, []);

  const handleCheckout = async (plan: 'monthly' | 'annual' | 'pro' | 'annual-pro') => {
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
        alert(isWelsh ? "Dim URL talu wedi derbyn" : "No checkout URL received");
      }
    } catch (error) {
      alert(isWelsh ? "Aeth rhywbeth o'i le. Ceisiwch eto." : "Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
            <div>
              <Link href="/" className="text-2xl font-semibold tracking-tight">
                a.wales
              </Link>
              <p className="text-xs text-zinc-500 -mt-1">Welsh AI</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/chat">Chat</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-zinc-800 rounded-full p-1">
              <button
                onClick={() => setIsWelsh(false)}
                className={`px-4 py-1.5 rounded-full text-xs transition ${
                  !isWelsh ? 'bg-blue-600' : ''
                }`}
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setIsWelsh(true)}
                className={`px-4 py-1.5 rounded-full text-xs transition ${
                  isWelsh ? 'bg-red-600' : ''
                }`}
              >
                🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {isWelsh ? 'Dewiswch Eich Cynllun' : 'Choose Your Plan'}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400">
            {isWelsh ? 'AI pwerus ar gyfer Cymru' : 'Powerful AI for Wales'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {/* Free */}
          <div className="bg-zinc-900/50 border border-zinc-700 rounded-3xl p-10 flex flex-col">
            <h3 className="text-3xl font-semibold mb-2">
              {isWelsh ? 'Am Ddim' : 'Free'}
            </h3>
            <p className="text-6xl font-bold mb-8">£0</p>
            <ul className="space-y-4 mb-12 flex-1 text-zinc-300">
              <li>✅ {isWelsh ? '10 negeseuon y dydd' : '10 messages per day'}</li>
              <li>✅ {isWelsh ? 'Grok AI sylfaenol' : 'Basic Grok AI'}</li>
              <li>❌ {isWelsh ? 'Creu delweddau' : 'Image generation'}</li>
              <li>❌ {isWelsh ? 'Creu fideos' : 'Video generation'}</li>
            </ul>
            <Link
              href="/chat"
              className="mt-auto w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-center rounded-2xl font-medium transition"
            >
              {isWelsh ? 'Dechrau Am Ddim' : 'Start Free'}
            </Link>
          </div>

          {/* Premium */}
          <div className="bg-white text-zinc-900 rounded-3xl p-10 flex flex-col relative scale-105 shadow-2xl border-2 border-blue-500">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-full">
              {isWelsh ? 'Mwyaf Poblogaidd' : 'MOST POPULAR'}
            </div>
            <h3 className="text-3xl font-semibold mb-2">
              {isWelsh ? 'Premium' : 'Premium'}
            </h3>
            <p className="text-6xl font-bold mb-2">£4.99</p>
            <p className="text-zinc-500 mb-8">
              {isWelsh ? 'y mis' : 'per month'}
            </p>
            <ul className="space-y-4 mb-12 flex-1">
              <li>✅ {isWelsh ? 'Negeseuon di-ben-draw' : 'Unlimited messages'}</li>
              <li>✅ {isWelsh ? 'Creu delweddau' : 'Image generation'}</li>
              <li>
                ✅ {isWelsh ? 'Creu fideos (3 y dydd)' : 'Video generation (3 per day)'}
              </li>
              <li>✅ {isWelsh ? 'Ymatebion cyflymach' : 'Priority responses'}</li>
            </ul>
            <button
              onClick={() => handleCheckout('monthly')}
              disabled={loading === 'monthly'}
              className="mt-auto w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold rounded-2xl text-lg transition"
            >
              {loading === 'monthly'
                ? 'Processing...'
                : isWelsh
                ? 'Tanysgrifio Premium'
                : 'Subscribe Premium'}
            </button>
          </div>

          {/* Pro */}
          <div className="bg-zinc-900/50 border border-zinc-700 rounded-3xl p-10 flex flex-col">
            <h3 className="text-3xl font-semibold mb-2">
              {isWelsh ? 'Pro' : 'Pro'}
            </h3>
            <p className="text-6xl font-bold mb-2">£9.99</p>
            <p className="text-zinc-500 mb-8">
              {isWelsh ? 'y mis' : 'per month'}
            </p>
            <ul className="space-y-4 mb-12 flex-1 text-zinc-300">
              <li>✅ {isWelsh ? 'Popeth yn Premium' : 'Everything in Premium'}</li>
              <li>
                ✅ {isWelsh ? 'Creu fideos (15 y dydd)' : 'Video generation (15 per day)'}
              </li>
              <li>✅ {isWelsh ? 'Blaenoriaeth uwch' : 'Higher priority'}</li>
              <li>
                ✅ {isWelsh ? 'Mynediad cynnar i nodweddion newydd' : 'Early access to new features'}
              </li>
            </ul>
            <button
              onClick={() => handleCheckout('pro')}
              disabled={loading === 'pro'}
              className="mt-auto w-full py-4 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold rounded-2xl text-lg transition"
            >
              {loading === 'pro'
                ? 'Processing...'
                : isWelsh
                ? 'Tanysgrifio Pro'
                : 'Subscribe Pro'}
            </button>
          </div>
        </div>

        {/* Annual note */}
        <div className="text-center mt-12 text-zinc-400 text-sm">
          {isWelsh
            ? 'Mae tanysgrifiadau blynyddol ar gael gyda gostyngiad ~17–18%'
            : 'Annual subscriptions available with ~17–18% savings'}
        </div>
      </div>
    </div>
  );
}