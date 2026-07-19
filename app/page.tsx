'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-white to-green-500 rounded-2xl flex items-center justify-center text-4xl font-black tracking-tighter border border-white/30 shadow-lg shadow-red-500/30">
              A
            </div>
            <div>
              <span className="text-3xl font-bold tracking-tighter">a.wales</span>
              <div className="text-[10px] text-gray-500 -mt-1">AI FOR WALES</div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-red-400 transition">Features</a>
            <a href="#about" className="hover:text-red-400 transition">About</a>
            <a href="/chat" className="hover:text-red-400 transition">Chat</a>
            <a 
              href="/chat"
              className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-red-500 hover:text-white transition"
            >
              Start Chatting →
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Big Bold A */}
      <section className="pt-32 pb-24 relative flex items-center justify-center min-h-[90vh] bg-[radial-gradient(at_center,#4b0082_0%,transparent_70%)]">
        <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-red-600 via-purple-600 to-green-500 rounded-3xl flex items-center justify-center text-[180px] md:text-[240px] font-black leading-none tracking-[-0.07em] text-white/90 shadow-2xl border-4 border-white/20">
              A
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            a.wales — <span className="bg-gradient-to-r from-red-400 to-green-400 bg-clip-text text-transparent">Welsh Intelligence</span>
          </h1>
          
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
            Private. Powerful. Powered by Grok.<br />
            Think different — for the Dragon nation.
          </p>

          <a 
            href="/chat"
            className="inline-block bg-white text-black text-2xl px-12 py-6 rounded-3xl font-semibold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-500/30"
          >
            Open the Chat →
          </a>
        </div>

        {/* Subtle Welsh accent */}
        <div className="absolute bottom-12 right-12 text-[120px] opacity-10 pointer-events-none">🏴󠁧󠁢󠁷󠁬󠁳󠁿</div>
      </section>

      {/* Rest of the page (features/footer) stays the same as before */}
    </div>
  );
}