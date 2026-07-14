// components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🐉</span>
          <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition">a.wales</Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-base">
          <Link href="/chat" className="hover:text-blue-400 transition">Chat</Link>
          <Link href="/pricing" className="hover:text-blue-400 transition">Pricing</Link>
        </nav>

        <Link 
          href="/chat" 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium transition"
        >
          Start Chatting
        </Link>
      </div>
    </header>
  );
}