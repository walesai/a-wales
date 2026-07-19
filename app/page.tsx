'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-white to-green-500 rounded-2xl flex items-center justify-center text-3xl font-black tracking-tighter border border-white/30">
              A
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tighter">a.wales</span>
              <div className="text-xs text-gray-500 -mt-1">AI FOR WALES</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-red-400 transition">Features</a>
            <a href="#about" className="hover:text-red-400 transition">About</a>
            <a href="/chat" className="hover:text-red-400 transition">Chat</a>
          </div>

          <a 
            href="/chat"
            className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-red-500 hover:text-white transition text-sm md:text-base"
          >
            Start Chatting
          </a>
        </div>
      </nav>

      {/* Hero Section - Bold A + Responsive */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative flex items-center justify-center min-h-[90vh] bg-[radial-gradient(at_center,#4b0082_0%,transparent_70%)]">
        <div className="max-w-5xl mx-auto text-center px-4 md:px-6 relative z-10">
          
          {/* Big Bold A */}
          <div className="mb-8 md:mb-12 flex justify-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-red-600 via-purple-600 to-green-500 rounded-3xl flex items-center justify-center text-[130px] sm:text-[160px] md:text-[220px] font-black leading-none tracking-[-0.07em] text-white/95 shadow-2xl border-4 border-white/20">
              A
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-4 md:mb-6">
            a.wales
          </h1>
          
          <p className="text-lg sm:text-2xl text-gray-300 max-w-md mx-auto mb-8 md:mb-10">
            The smartest AI for Wales<br className="hidden sm:block" />
            Powered by Grok
          </p>

          <a 
            href="/chat"
            className="inline-block bg-white text-black text-lg sm:text-2xl px-10 sm:px-14 py-5 sm:py-6 rounded-3xl font-semibold hover:bg-red-500 hover:text-white active:scale-95 transition-all shadow-xl shadow-red-500/30 w-full sm:w-auto"
          >
            Start Chatting →
          </a>
        </div>

        {/* Welsh accent */}
        <div className="absolute bottom-8 right-8 text-6xl md:text-8xl opacity-10 pointer-events-none">🏴󠁧󠁢󠁷󠁬󠁳󠁿</div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-20 border-t border-white/10 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: "🔒", 
              title: "Private", 
              desc: "Your data stays yours. No corporate surveillance." 
            },
            { 
              icon: "⚡", 
              title: "Powerful", 
              desc: "Real-time Grok intelligence with Welsh context." 
            },
            { 
              icon: "🐉", 
              title: "Wales First", 
              desc: "Built for the Dragon nation." 
            }
          ].map((f, i) => (
            <div key={i} className="bg-black border border-white/10 p-8 rounded-3xl hover:border-red-500/50 transition group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition">{f.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-6">
          © 2026 a.wales • Powered by Grok • Made with ❤️ for Wales
        </div>
      </footer>
    </div>
  );
}