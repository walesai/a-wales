'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isWelsh, setIsWelsh] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preferredLang') === 'cy';
    setIsWelsh(saved);
  }, []);

  const toggleLanguage = () => {
    const newLang = !isWelsh;
    setIsWelsh(newLang);
    localStorage.setItem('preferredLang', newLang ? 'cy' : 'en');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Header with Toggle */}
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
            <button onClick={toggleLanguage} className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-2xl text-sm font-medium transition">
              {isWelsh ? '🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY' : '🇬🇧 EN'}
            </button>
            <Link href="/chat" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium transition">
              Start Chatting
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="text-8xl md:text-9xl mb-8">🐉</div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-red-500 bg-clip-text text-transparent">
            a.wales
          </h1>
          <p className="text-2xl md:text-4xl text-zinc-400 mb-10">The smartest AI for Wales — powered by Grok</p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/chat" className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-xl font-semibold rounded-3xl hover:brightness-110 transition">
              Start Chatting Free
            </Link>
            <Link href="/pricing" className="px-10 py-5 border-2 border-white/30 hover:bg-white/10 text-xl font-semibold rounded-3xl transition">
              View Plans
            </Link>
          </div>
        </div>
      </div>

      <footer className="text-center py-12 text-zinc-500 border-t border-zinc-800">
        Made for Wales • Powered by xAI Grok
      </footer>
    </div>
  );
}