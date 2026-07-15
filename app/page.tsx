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
      
      {/* Super Compact Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🐉</span>
            <Link href="/" className="text-lg font-bold">a.wales</Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/chat">Chat</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLanguage} 
              className="px-3 py-1.5 bg-zinc-800 rounded-xl text-xs font-medium"
            >
              {isWelsh ? 'CY' : 'EN'}
            </button>
            <Link href="/chat" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium">
              Start Chatting
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-12 pb-20 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="text-6xl md:text-8xl mb-6">🐉</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-red-500 bg-clip-text text-transparent">
            a.wales
          </h1>
          <p className="text-lg md:text-2xl text-zinc-400 mb-10 px-4">
            {isWelsh ? "Yr AI gorau ar gyfer Cymru" : "The smartest AI for Wales — powered by Grok"}
          </p>

          <div className="flex flex-col gap-4 px-4">
            <Link href="/chat" className="py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-lg font-semibold rounded-3xl hover:brightness-110 transition">
              {isWelsh ? "Dechrau Siarad" : "Start Chatting Free"}
            </Link>
            <Link href="/pricing" className="py-4 border-2 border-white/30 hover:bg-white/10 text-lg font-semibold rounded-3xl transition">
              {isWelsh ? "Gweld Cynlluniau" : "View Plans"}
            </Link>
          </div>
        </div>
      </div>

      <footer className="text-center py-10 text-zinc-500 text-sm border-t border-zinc-800">
        {isWelsh ? "Wedi ei greu ar gyfer Cymru" : "Made for Wales • Powered by xAI Grok"}
      </footer>
    </div>
  );
}