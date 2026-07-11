export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐉</span>
            <h1 className="text-2xl font-bold tracking-tight">a.wales</h1>
          </div>
          
          <div className="flex items-center gap-8 text-sm">
            <a href="/chat" className="hover:text-white/80 transition">AI Chat</a>
            <a href="#features" className="hover:text-white/80 transition">Features</a>
            <a href="/pricing" className="hover:text-white/80 transition">Pricing</a>
            <a href="/chat" className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-white/90 transition">
              Start Chatting
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            AI for Wales.<br />Built for you.
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Your intelligent Welsh AI companion. Ask anything in English or Welsh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/chat" className="bg-white text-black px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/90 transition">
              Start Chatting Free
            </a>
            <a href="/pricing" className="border border-white/30 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition">
              See Plans
            </a>
          </div>
        </div>
      </section>

      {/* Quick Features Teaser */}
      <section id="features" className="py-24 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-2xl font-semibold mb-3">Smart AI Chat</h3>
            <p className="text-zinc-400">Powered by Grok with Welsh context and knowledge.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🖼️</div>
            <h3 className="text-2xl font-semibold mb-3">Image Generation</h3>
            <p className="text-zinc-400">Create Welsh-inspired images with Grok Imagine.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🇬🇧</div>
            <h3 className="text-2xl font-semibold mb-3">Bilingual</h3>
            <p className="text-zinc-400">Switch between English and Welsh instantly.</p>
          </div>
        </div>
      </section>

      <footer className="bg-black py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-zinc-500">
          <p>© 2026 a.wales • AI for the people of Wales</p>
        </div>
      </footer>
    </main>
  );
}