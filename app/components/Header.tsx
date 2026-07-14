'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    setIsSubscribed(subscribed);
  }, []);

  const openCustomerPortal = async () => {
    try {
      const res = await fetch('/api/create-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: localStorage.getItem('userEmail') }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Unable to open portal. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
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
          {isSubscribed ? (
            <button 
              onClick={openCustomerPortal}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-2xl text-sm font-medium transition"
            >
              Manage Plan
            </button>
          ) : (
            <Link href="/pricing" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium transition">
              Upgrade
            </Link>
          )}

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl p-2"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-6 py-6 flex flex-col gap-6 text-lg">
          <Link href="/chat" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Chat</Link>
          <Link href="/pricing" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Pricing</Link>
          {isSubscribed ? (
            <button onClick={() => { openCustomerPortal(); setMenuOpen(false); }} className="bg-green-600 text-center py-4 rounded-2xl">
              Manage Plan
            </button>
          ) : (
            <Link href="/pricing" className="bg-blue-600 text-center py-4 rounded-2xl" onClick={() => setMenuOpen(false)}>
              Upgrade
            </Link>
          )}
        </div>
      )}
    </header>
  );
}