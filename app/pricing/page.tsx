'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const [isWelsh, setIsWelsh] = useState(false);

  // Load saved language preference
  useEffect(() => {
    const saved = localStorage.getItem('preferredLang') === 'cy';
    setIsWelsh(saved);
  }, []);

  const toggleLanguage = () => {
    const newLang = !isWelsh;
    setIsWelsh(newLang);
    localStorage.setItem('preferredLang', newLang ? 'cy' : 'en');
    window.location.reload(); // Force full refresh to update all text
  };

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
              <Link href="/" className="text-2xl font-semibold tracking-tight">a.wales</Link>
              <p className="text-xs text-zinc-500 -mt-1">Welsh AI</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/chat">Chat</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage} 
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 rounded-2xl text-sm font-medium border border-zinc-700"
            >
              {isWelsh ? '🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY' : '🇬🇧 EN'}
            </button>
            <Link href="/chat" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium">
              Start Chatting
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6">
            {isWelsh ? "Dewiswch Eich Cynllun" : "Choose Your Plan"}
          </h1>
          <p className="text-2xl text-zinc-400">
            {isWelsh ? "AI pwerus ar gyfer Cymru" : "Powerful AI for Wales"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          {/* Free */}
          <div className="bg-zinc-900/50 border border-zinc-700 rounded-3xl p-10 flex flex-col">
            <h3 className="text-3xl font-semibold mb-2">{isWelsh ? "Am Ddim" : "Free"}</h3>
            <p className="text-6xl font-bold mb-8">£0</p>
            <ul className="space-y-4 mb-12 flex-1 text-zinc-300">
              <li>✅ 10 negeseuon y dydd</li>
              <li>✅ Grok AI sylfaenol</li>
            </ul>
            <Link href="/chat" className="mt-auto w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-center rounded-2xl font-medium transition">
              {isWelsh ? "Dechrau Am Ddim" : "Start Free"}
            </Link>
          </div>

          {/* Monthly */}
          <div className="bg-white text-zinc-900 rounded-3xl p-10 flex flex-col relative scale-105 shadow-2xl border-2 border-blue-500">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-full">
              {isWelsh ? "Mwyaf Poblogaidd" : "MOST POPULAR"}
            </div>
            <h3 className="text-3xl font-semibold mb-2">{isWelsh ? "Misol" : "Monthly"}</h3>
            <p className="text-6xl font-bold mb-2">£4.99</p>
            <p className="text-zinc-500 mb-8">{isWelsh ? "y mis" : "per month"}</p>
            <ul className="space-y-4 mb-12 flex-1">
              <li>✅ Negeseuon di-ben-draw</li>
              <li>✅ Creu delweddau</li>
              <li>✅ Ymatebion cyflymach</li>
            </ul>
            <button
              onClick={() => handleCheckout('monthly')}
              disabled={loading === 'monthly'}
              className="mt-auto w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold rounded-2xl text-lg transition"
            >
              {loading === 'monthly' ? (isWelsh ? 'Yn prosesu...' : 'Processing...') : (isWelsh ? 'Tanysgrifio Misol' : 'Subscribe Monthly')}
            </button>
          </div>

          {/* Annual */}
          <div className="bg-zinc-900/50 border border-zinc-700 rounded-3xl p-10 flex flex-col">
            <h3 className="text-3xl font-semibold mb-2">{isWelsh ? "Blynyddol" : "Annual"}</h3>
            <p className="text-6xl font-bold mb-2">£49</p>
            <p className="text-emerald-400 font-medium mb-8">{isWelsh ? "Arbed ~18%" : "Save ~18%"}</p>
            <ul className="space-y-4 mb-12 flex-1 text-zinc-300">
              <li>✅ Popeth yn y Misol</li>
              <li>✅ Y gwerth gorau</li>
            </ul>
            <button
              onClick={() => handleCheckout('annual')}
              disabled={loading === 'annual'}
              className="mt-auto w-full py-4 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold rounded-2xl text-lg transition"
            >
              {loading === 'annual' ? (isWelsh ? 'Yn prosesu...' : 'Processing...') : (isWelsh ? 'Tanysgrifio Blynyddol' : 'Subscribe Annually')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}