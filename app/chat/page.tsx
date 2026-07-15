'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(10);
  const [isWelsh, setIsWelsh] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    setIsSubscribed(subscribed);

    const today = new Date().toISOString().split('T')[0];
    let count = parseInt(localStorage.getItem('messageCount') || '0');

    if (!subscribed) {
      if (localStorage.getItem('rateLimitDate') !== today) {
        count = 0;
        localStorage.setItem('rateLimitDate', today);
        localStorage.setItem('messageCount', '0');
      }
      setRemainingMessages(10 - count);
    }

    setMessages([{
      role: 'assistant',
      content: isWelsh 
        ? "🐉 Croeso i a.wales Premium! Sut alla i dy helpu heddiw?" 
        : "🐉 Welcome back to a.wales Premium!\n\nHow can I help you today?"
    }]);
  }, [isWelsh]);

  const openCustomerPortal = async () => {
  try {
    const res = await fetch('/api/create-portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: localStorage.getItem('userEmail') }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Couldn't open Manage Plan. Please try again.");
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
  }
};

  const forcePremium = () => {
    localStorage.setItem('isSubscribed', 'true');
    setIsSubscribed(true);
    setMessages([{
      role: 'assistant',
      content: "✅ Premium access activated! You now have unlimited messages."
    }]);
  };

  const toggleLanguage = () => {
    const newLang = !isWelsh;
    setIsWelsh(newLang);
    localStorage.setItem('preferredLang', newLang ? 'cy' : 'en');
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    if (!isSubscribed) {
      let count = parseInt(localStorage.getItem('messageCount') || '0');
      if (count >= 10) {
        setMessages(prev => [...prev, { role: 'assistant', content: isWelsh ? "Rydych wedi cyrraedd eich terfyn dyddiol." : "Daily limit reached." }]);
        return;
      }
      count++;
      localStorage.setItem('messageCount', count.toString());
      setRemainingMessages(10 - count);
    }

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, isWelsh }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: isWelsh ? "Mae'n ddrwg gen i..." : "Sorry, I'm having trouble right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
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
    
    <div className="flex items-center gap-4">
      {isSubscribed ? (
        <button 
          onClick={openCustomerPortal}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-2xl text-sm font-medium transition"
        >
          Manage Plan
        </button>
      ) : (
        <Link href="/pricing" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium transition">
          Upgrade
        </Link>
      )}
    </div>
  </div>
</header>

      {/* Welsh Toggle */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-3 flex justify-end">
        <div className="flex items-center gap-2 bg-zinc-800 rounded-full p-1">
          <button onClick={() => setIsWelsh(false)} className={`px-5 py-2 rounded-full text-sm font-medium transition ${!isWelsh ? 'bg-blue-600 text-white' : 'text-zinc-400'}`}>
            🇬🇧 EN
          </button>
          <button onClick={() => setIsWelsh(true)} className={`px-5 py-2 rounded-full text-sm font-medium transition ${isWelsh ? 'bg-red-600 text-white' : 'text-zinc-400'}`}>
            🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-5 rounded-3xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800 border border-zinc-700'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-blue-400">Thinking...</div>}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={isSubscribed ? (isWelsh ? "Gofyn unrhyw beth..." : "Ask me anything...") : `${remainingMessages} messages left`}
            disabled={!isSubscribed && remainingMessages <= 0}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={loading || (!isSubscribed && remainingMessages <= 0) || !input.trim()}
            className="px-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-2xl font-medium transition"
          >
            Send
          </button>
        </div>

        {!isSubscribed && (
          <div className="text-center mt-4">
            <button onClick={forcePremium} className="text-blue-400 underline text-sm">
              Force Premium Access (Temporary)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}