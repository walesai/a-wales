'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(10);

  // Check subscription and rate limit
  useEffect(() => {
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    setIsSubscribed(subscribed);

    if (!subscribed) {
      const today = new Date().toISOString().split('T')[0];
      const savedDate = localStorage.getItem('rateLimitDate');
      let count = parseInt(localStorage.getItem('messageCount') || '0');

      if (savedDate !== today) {
        count = 0;
        localStorage.setItem('rateLimitDate', today);
        localStorage.setItem('messageCount', '0');
      }

      setRemainingMessages(10 - count);
    }

    setMessages([{
      role: 'assistant',
      content: subscribed 
        ? "🐉 Welcome back to a.wales Premium!\n\nHow can I help you today?" 
        : "👋 Welcome to a.wales!\n\nFree tier: 10 messages per day. Upgrade for unlimited access."
    }]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    // Rate limiting for free users
    if (!isSubscribed) {
      const today = new Date().toISOString().split('T')[0];
      let count = parseInt(localStorage.getItem('messageCount') || '0');

      if (count >= 10) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "You've reached your daily limit of 10 messages. Upgrade to Premium for unlimited chatting!"
        }]);
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
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble right now." }]);
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
          <Link href="/pricing" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium transition">
            {isSubscribed ? 'Manage Plan' : 'Upgrade'}
          </Link>
        </div>
      </header>

      <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-5 rounded-3xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800 border border-zinc-700'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-blue-400 pl-4">Thinking...</div>}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={isSubscribed ? "Ask me anything..." : `Free: ${remainingMessages} messages left today`}
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
          <p className="text-center text-sm text-zinc-500 mt-4">
            Free tier: {remainingMessages} messages left today • 
            <Link href="/pricing" className="text-blue-400 hover:underline ml-1">Upgrade for unlimited</Link>
          </p>
        )}
      </div>
    </div>
  );
}