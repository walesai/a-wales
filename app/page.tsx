'use client';

import Header from '../../components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <Header />

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