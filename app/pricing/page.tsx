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

  const handleCheckout = async (plan) => {
    setLoading(plan);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      alert('Error');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <header className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800 py-3 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐉</span>
            <Link href="/" className="text-xl font-bold">a.wales</Link>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} className="px-3 py-1 bg-zinc-800 rounded-xl text-xs">
              {isWelsh ? 'CY' : 'EN'}
            </button>
            <Link href="/chat" className="px-5 py-2 bg-blue-600 rounded-xl text-sm font-medium">
              Start Chatting
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-12 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Choose Your Plan</h1>
        </div>

        {/* Your existing pricing cards here */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {/* Free, Monthly, Annual cards - keep your current cards */}
        </div>
      </div>
    </div>
  );
}