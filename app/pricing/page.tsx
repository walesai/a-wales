'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const [isWelsh, setIsWelsh] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
            <Link href="/" className="text-xl font-bold">a.wales</Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/chat">Chat</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="px-3 py-1.5 bg-zinc-800 rounded-xl text-xs font-medium">
              {isWelsh ? 'CY' : 'EN'}
            </button>
            <Link href="/chat" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium">
              Start Chatting
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-3xl p-1">☰</button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-5 flex flex-col gap-5 text-lg">
            <Link href="/chat" onClick={() => setMenuOpen(false)}>Chat</Link>
            <Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
          </div>
        )}
      </header>

      <div className="pt-12 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {isWelsh ? "Dewiswch Eich Cynllun" : "Choose Your Plan"}
          </h1>
          <p className="text-lg md:text-xl text-zinc-400">
            {isWelsh ? "AI pwerus ar gyfer Cymru" : "Powerful AI for Wales"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          {/* Your pricing cards go here - keep your existing cards */}
          {/* Free, Monthly, Annual */}
        </div>
      </div>
    </div>
  );
}