export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐉</span>
            <h1 className="text-2xl font-bold tracking-tight">a.wales</h1>
          </div>
          <a href="/chat" className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-white/90 transition text-sm md:text-base">
            Start Chatting
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
            AI for Wales
          </h2>
          <p className="text-lg md:text-2xl text-zinc-400 max-w-xl mx-auto">
            Your intelligent companion for Welsh culture, language, history, and daily life.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-zinc-900 px-4 md:px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-6xl mb-6">💬</div>
            <h3 className="text-2xl font-semibold mb-3">Smart Chat</h3>
            <p className="text-zinc-400">Real Grok AI with Welsh knowledge.</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-6">🖼️</div>
            <h3 className="text-2xl font-semibold mb-3">Image Generation</h3>
            <p className="text-zinc-400">Create Welsh-inspired images.</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-6">🇬🇧</div>
            <h3 className="text-2xl font-semibold mb-3">Bilingual</h3>
            <p className="text-zinc-400">English and Welsh support.</p>
          </div>
        </div>
      </section>

      <div className="text-center py-16 px-4">
        <a href="/chat" className="inline-block bg-white text-black text-xl font-semibold px-12 py-5 rounded-3xl hover:bg-white/90 transition">
          Try the AI Chat →
        </a>
      </div>
    </main>
  );
}