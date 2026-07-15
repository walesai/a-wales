'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isWelsh, setIsWelsh] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLang') === 'cy';
    setIsWelsh(savedLang);

    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    setIsSubscribed(subscribed);
  }, []);

  const toggleLanguage = () => {
    const newLang = !isWelsh;
    setIsWelsh(newLang);
    localStorage.setItem('preferredLang', newLang ? 'cy' : 'en');
    window.location.reload();
  };

  const openCustomerPortal = async () => {
    try {
      const res = await fetch('/api/create-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: localStorage.getItem('userEmail') }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      alert('Unable to open portal');
    }
  };

  return (
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

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-2xl text-sm font-medium transition"
          >
            {isWelsh ? '🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY' : '🇬🇧 EN'}
          </button>

          {isSubscribed ? (
            <button onClick={openCustomerPortal} className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-2xl text-sm font-medium transition">
              Manage Plan
            </button>
          ) : (
            <Link href="/pricing" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium transition">
              Upgrade
            </Link>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-3xl p-2">
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-6 py-6 flex flex-col gap-6 text-lg">
          <Link href="/chat" onClick={() => setMenuOpen(false)}>Chat</Link>
          <Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
        </div>
      )}
    </header>
  );
}
