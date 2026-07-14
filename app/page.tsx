'use client';

import Header from '../components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <Header />

      {/* Hero Section */}
      <div className="pt-20 pb-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="text-8xl md:text-9xl mb-8">🐉</div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-red-500 bg-clip-text text-transparent">
            a.wales
          </h1>
          <p className="text-2xl md:text-4xl text-zinc-400 mb-10 max-w-3xl mx-auto">
            The smartest AI for Wales — powered by Grok
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              href="/chat" 
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-xl font-semibold rounded-3xl hover:brightness-110 transition"
            >
              Start Chatting Free
            </Link>
            <Link 
              href="/pricing" 
              className="px-10 py-5 border-2 border-white/30 hover:bg-white/10 text-xl font-semibold rounded-3xl transition"
            >
              View Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-zinc-900/50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Why Wales loves a.wales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 md:p-10 hover:border-blue-500 transition">
              <div className="text-5xl mb-6">🏴󠁧󠁢󠁷󠁬󠁳󠁿</div>
              <h3 className="text-3xl font-semibold mb-4">Welsh Intelligence</h3>
              <p className="text-zinc-400">Cardiff, Swansea, Valleys, language, culture & local knowledge.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 md:p-10 hover:border-blue-500 transition">
              <div className="text-5xl mb-6">⚡</div>
              <h3 className="text-3xl font-semibold mb-4">Powerful Grok AI</h3>
              <p className="text-zinc-400">Real-time answers and image generation on Premium.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 md:p-10 hover:border-blue-500 transition">
              <div className="text-5xl mb-6">🔐</div>
              <h3 className="text-3xl font-semibold mb-4">Private & Secure</h3>
              <p className="text-zinc-400">Premium unlocks unlimited usage.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center py-12 text-zinc-500 border-t border-zinc-800">
        Made for Wales • Powered by xAI Grok
      </footer>
    </div>
  );
}