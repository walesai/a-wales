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
      
      {/* Guaranteed Visible Compact Header */}
      <header className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800 py-3 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐉</span>
            <Link href="/" className="text-xl font-bold">a.wales</Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage} 
              className="px-3 py-1 bg-zinc-800 rounded-xl text-xs"
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
          <div className="text-7xl mb-6">🐉</div>
          <h1 className="text-5xl font-bold mb-6">a.wales</h1>
          <p className="text-xl text-zinc-400 mb-10">
            The smartest AI for Wales — powered by Grok
          </p>

          <div className="flex flex-col gap-4">
            <Link href="/chat" className="py-4 bg-blue-600 text-lg font-semibold rounded-3xl">
              Start Chatting Free
            </Link>
            <Link href="/pricing" className="py-4 border border-white/30 text-lg font-semibold rounded-3xl">
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}