'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Hero Section */}
      <div className="pt-24 pb-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="text-8xl mb-8">🐉</div>
          <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-red-500 bg-clip-text text-transparent">
            a.wales
          </h1>
          <p className="text-3xl md:text-4xl text-zinc-400 mb-10 max-w-3xl mx-auto">
            The smartest AI for Wales — powered by Grok
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link 
              href="/chat" 
              className="px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:brightness-110 text-2xl font-semibold rounded-3xl transition transform hover:scale-105"
            >
              Start Chatting Now
            </Link>
            <Link 
              href="/pricing" 
              className="px-12 py-5 border-2 border-white/30 hover:bg-white/10 text-2xl font-semibold rounded-3xl transition"
            >
              View Plans
            </Link>
          </div>

          <p className="mt-8 text-zinc-500">Free tier available • Cancel anytime</p>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">Why Wales loves a.wales</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-10 hover:border-blue-500 transition">
              <div className="text-5xl mb-6">🏴󠁧󠁢󠁷󠁬󠁳󠁿</div>
              <h3 className="text-3xl font-semibold mb-4">Welsh Intelligence</h3>
              <p className="text-zinc-400 text-lg">Local knowledge of Cardiff, Swansea, the Valleys, Welsh culture, language & current affairs.</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-10 hover:border-blue-500 transition">
              <div className="text-5xl mb-6">⚡</div>
              <h3 className="text-3xl font-semibold mb-4">Powerful Grok AI</h3>
              <p className="text-zinc-400 text-lg">Real-time answers, image generation, and smart conversations — upgraded on Premium.</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-10 hover:border-blue-500 transition">
              <div className="text-5xl mb-6">🔐</div>
              <h3 className="text-3xl font-semibold mb-4">Private &amp; Secure</h3>
              <p className="text-zinc-400 text-lg">Your chats are private. Premium unlocks unlimited usage and faster responses.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="py-20 text-center border-t border-zinc-800">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">Ready to experience the best AI in Wales?</h2>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10">
            <Link 
              href="/chat" 
              className="px-10 py-5 bg-white text-black text-xl font-semibold rounded-3xl hover:bg-zinc-200 transition"
            >
              Try Free Now
            </Link>
            <Link 
              href="/pricing" 
              className="px-10 py-5 border border-white/40 text-xl font-semibold rounded-3xl hover:bg-white/10 transition"
            >
              See Premium Plans
            </Link>
          </div>
        </div>
      </div>

      <footer className="text-center py-10 text-zinc-500 border-t border-zinc-800">
        Made for Wales • Powered by xAI Grok
      </footer>
    </div>
  );
}