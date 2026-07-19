'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Top Nav - geoff.ai style */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 rounded-2xl flex items-center justify-center text-4xl font-black tracking-tighter shadow-lg">
              A
            </div>
            <div className="font-semibold text-2xl tracking-tight">a.wales</div>
          </div>
          
          <div className="flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-violet-400 transition">Features</a>
            <a href="/chat" className="hover:text-violet-400 transition">Chat</a>
            <a 
              href="/chat"
              className="bg-white text-black px-8 py-3 rounded-2xl font-medium hover:bg-white/90 transition"
            >
              Launch Geoff Mode
            </a>
          </div>
        </div>
      </nav>

      {/* Hero - Big Bold A like geoff.ai */}
      <section className="min-h-screen pt-24 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4b0082_0%,transparent_60%)]"></div>
        
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <div className="flex justify-center mb-10">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 rounded-3xl flex items-center justify-center text-[260px] md:text-[320px] font-black leading-none tracking-[-0.08em] text-white/90 shadow-2xl border border-white/10">
              A
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            a.wales
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-400 mb-12 max-w-xl mx-auto">
            Welsh intelligence.<br />
            Private. Powerful. Built different.
          </p>

          <a 
            href="/chat"
            className="group inline-flex items-center gap-3 bg-white text-black text-2xl px-12 py-6 rounded-3xl font-semibold hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 hover:text-white transition-all duration-300"
          >
            Enter the Chat
            <span className="group-hover:translate-x-2 transition">→</span>
          </a>
        </div>

        <div className="absolute bottom-12 text-7xl opacity-10">🏴󠁧󠁢󠁷󠁬󠁳󠁿</div>
      </section>

      {/* Simple Features */}
      <section id="features" className="py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { icon: "🔒", title: "Zero Data Retention", desc: "Your prompts are not stored or trained on." },
            { icon: "🌐", title: "Decentralized Ready", desc: "Future-proof AI infrastructure." },
            { icon: "🐉", title: "Wales Native", desc: "Local knowledge meets global intelligence." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl border border-white/10 hover:border-white/30 bg-zinc-950/50 transition">
              <div className="text-6xl mb-6">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-gray-500 border-t border-white/10">
        © 2026 a.wales • Inspired by the future • Powered by Grok
      </footer>
    </div>
  );
}