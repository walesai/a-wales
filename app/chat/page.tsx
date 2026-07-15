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
        ? "🐉 Croeso i a.wales Premium!" 
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
        alert("Couldn't open Manage Plan");
      }
    } catch (error) {
      alert("Something went wrong");
    }
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐉</span>
            <Link href="/" className="text-xl font-bold">a.wales</Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/chat">Chat</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            {isSubscribed ? (
              <button onClick={openCustomerPortal} className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-medium">
                Manage Plan
              </button>
            ) : (
              <Link href="/pricing" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium">
                Upgrade
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Welsh Toggle */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex justify-end">
        <div className="flex gap-1 bg-zinc-800 rounded-full p-1">
          <button onClick={() => setIsWelsh(false)} className={`px-4 py-1.5 rounded-full text-xs transition ${!isWelsh ? 'bg-blue-600' : ''}`}>🇬🇧 EN</button>
          <button onClick={() => setIsWelsh(true)} className={`px-4 py-1.5 rounded-full text-xs transition ${isWelsh ? 'bg-red-600' : ''}`}>🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY</button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-blue-400 pl-4">Thinking...</div>}
      </div>

      {/* Mobile Optimized Input */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-900 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={isSubscribed ? (isWelsh ? "Gofyn unrhyw beth..." : "Ask me anything...") : `${remainingMessages} messages left`}
            disabled={!isSubscribed && remainingMessages <= 0}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-3xl px-5 py-4 text-base focus:outline-none focus:border-blue-500 min-h-[52px]"
          />
          <button
            onClick={sendMessage}
            disabled={loading || (!isSubscribed && remainingMessages <= 0) || !input.trim()}
            className="px-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-3xl font-medium min-h-[52px]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}