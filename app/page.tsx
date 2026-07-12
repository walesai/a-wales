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
          <div className="flex items-center gap-6">
            <a href="/pricing" className="hover:text-white/80 transition">Pricing</a>
            <a href="/chat" className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-white/90 transition">
              Start Chatting
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
            AI for Wales
          </h2>
          <p className="text-lg md:text-2xl text-zinc-400">
            Your intelligent companion for Welsh culture, language, history, and daily life.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center py-12">
        <a href="/chat" className="inline-block bg-white text-black text-2xl font-semibold px-12 py-5 rounded-3xl hover:bg-white/90 transition">
          Start Chatting Free →
        </a>
        <p className="mt-8">
          <a href="/pricing" className="text-blue-400 hover:text-blue-300 transition">See Pricing & Plans</a>
        </p>
      </div>
    </main>
  );
}