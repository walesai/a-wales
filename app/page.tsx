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
            <button onClick={toggleLanguage} className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 rounded-2xl text-sm font-medium border border-zinc-700">
              {isWelsh ? '🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY' : '🇬🇧 EN'}
            </button>
            <Link href="/chat" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium">
              Start Chatting
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-24 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="text-8xl mb-8">🏴󠁧󠁢󠁷󠁬󠁳󠁿</div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">a.wales</h1>
          <p className="text-2xl text-zinc-400 mb-12">
            {isWelsh ? "Yr AI gorau ar gyfer Cymru" : "The smartest AI for Wales — powered by Grok"}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/chat" className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-xl font-semibold rounded-3xl transition">
              {isWelsh ? "Dechrau Siarad" : "Start Chatting Free"}
            </Link>
            <Link href="/pricing" className="px-12 py-5 border-2 border-white/30 hover:bg-white/10 text-xl font-semibold rounded-3xl transition">
              {isWelsh ? "Gweld Cynlluniau" : "View Plans"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}