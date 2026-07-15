'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const [isWelsh, setIsWelsh] = useState(false);

  useEffect(() => {
    setIsWelsh(localStorage.getItem('preferredLang') === 'cy');
  }, []);

  const toggleLanguage = () => {
    const newLang = !isWelsh;
    setIsWelsh(newLang);
    localStorage.setItem('preferredLang', newLang ? 'cy' : 'en');
    window.location.reload();
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
      if (data.url) window.location.href = data.url;
    } catch (error) {
      alert(isWelsh ? "Aeth rhywbeth o'i le" : "Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
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
        </div>
      </header>

      {/* Secondary Bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-end gap-4">
          <button onClick={toggleLanguage} className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 rounded-2xl text-sm font-medium border border-zinc-700">
            {isWelsh ? '🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY' : '🇬🇧 EN'}
          </button>
          <Link href="/chat" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium">
            Start Chatting
          </Link>
        </div>
      </div>

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
          {/* Free, Monthly, Annual cards - keep your existing ones or use the previous version */}
          {/* (Paste your current pricing cards here if you want me to adjust them) */}
        </div>
      </div>
    </div>
  );
}