'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Compact Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐉</span>
            <Link href="/" className="text-xl font-bold">a.wales</Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/chat">Chat</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="px-4 py-2 bg-zinc-800 rounded-2xl text-sm">
              {isWelsh ? '🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY' : '🇬🇧 EN'}
            </button>
            <Link href="/chat" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium">
              Start Chatting
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-16 pb-20 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="text-7xl md:text-8xl mb-6">🐉</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-red-500 bg-clip-text text-transparent">
            a.wales
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-10 px-4">
            {isWelsh ? "Yr AI gorau ar gyfer Cymru" : "The smartest AI for Wales — powered by Grok"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link href="/chat" className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-lg font-semibold rounded-3xl hover:brightness-110 transition">
              {isWelsh ? "Dechrau Siarad" : "Start Chatting Free"}
            </Link>
            <Link href="/pricing" className="px-10 py-5 border-2 border-white/30 hover:bg-white/10 text-lg font-semibold rounded-3xl transition">
              {isWelsh ? "Gweld Cynlluniau" : "View Plans"}
            </Link>
          </div>
        </div>
      </div>

      <footer className="text-center py-12 text-zinc-500 border-t border-zinc-800 text-sm">
        {isWelsh ? "Wedi ei greu ar gyfer Cymru • wedi ei bweru gan xAI" : "Made for Wales • Powered by xAI Grok"}
      </footer>
    </div>
  );
}