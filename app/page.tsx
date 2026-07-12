export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="fixed w-full z-50 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐉</span>
            <h1 className="text-2xl font-bold">a.wales</h1>
          </div>
          <a href="/chat" className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-white/90 transition">
            Open AI Chat
          </a>
        </div>
      </nav>

      <div className="pt-32 pb-20 text-center px-6">
        <h1 className="text-7xl font-bold tracking-tighter mb-6">AI for Wales</h1>
        <p className="text-2xl text-zinc-400 max-w-2xl mx-auto">Your intelligent companion for Welsh culture, language, news, and more.</p>
      </div>

      <div className="text-center py-12">
        <a href="/chat" className="inline-block bg-white text-black text-2xl font-semibold px-16 py-6 rounded-3xl hover:bg-white/90 transition">
          Start Chatting Now →
        </a>
      </div>
    </main>
  );
}