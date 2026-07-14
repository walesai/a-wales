'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link href="/chat" className="hidden md:block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium transition">
            Start Chatting
          </Link>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl p-2"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-6 py-6 flex flex-col gap-6 text-lg">
          <Link href="/chat" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Chat</Link>
          <Link href="/pricing" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/chat" className="bg-blue-600 text-center py-4 rounded-2xl font-medium" onClick={() => setMenuOpen(false)}>
            Start Chatting
          </Link>
        </div>
      )}
    </header>
  );
}
