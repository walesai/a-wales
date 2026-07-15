'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      
      {/* Compact Header with Hamburger Menu */}
            {/* Improved Compact Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐉</span>
            <Link href="/" className="text-xl font-bold">a.wales</Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/chat">Chat</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>

          {/* Right Side - Toggle + Button + Hamburger */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleLanguage} 
              className="px-3 py-1.5 bg-zinc-800 rounded-xl text-xs font-medium hidden sm:block"
            >
              {isWelsh ? 'CY' : 'EN'}
            </button>

            <Link href="/chat" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium hidden sm:block">
              Start Chatting
            </Link>

            {/* Hamburger - Always visible on mobile */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="md:hidden text-3xl p-2 -mr-2"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-5 flex flex-col gap-5 text-lg">
            <Link href="/chat" onClick={() => setMenuOpen(false)}>Chat</Link>
            <Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
            <button onClick={toggleLanguage} className="text-left" onClick={() => setMenuOpen(false)}>
              {isWelsh ? '🇬🇧 Switch to English' : '🏴󠁧󠁢󠁷󠁬󠁳󠁿 Switch to Welsh'}
            </button>
          </div>
        )}
      </header>

      <div className="pt-12 pb-20 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="text-7xl mb-6">🐉</div>
          <h1 className="text-5xl font-bold mb-6">a.wales</h1>
          <p className="text-xl text-zinc-400 mb-10">
            The smartest AI for Wales — powered by Grok
          </p>

          <div className="flex flex-col gap-4 px-4">
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