'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    setIsSubscribed(subscribed);

    if (!subscribed) {
      setMessages([{
        role: 'assistant',
        content: "Welcome to a.wales! 👋\n\nThis is the **Free tier**. Upgrade to Premium for unlimited messages and image generation."
      }]);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, isSubscribed }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🐉</span>
          <h1 className="text-2xl font-bold">a.wales AI</h1>
        </div>
        <div className="flex gap-4">
          {!isSubscribed && (
            <Link href="/pricing" className="px-5 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition">
              Upgrade to Premium
            </Link>
          )}
          <Link href="/" className="px-5 py-2 border border-zinc-700 rounded-xl hover:bg-zinc-900">Home</Link>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-6 space-y-6 max-w-3xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-zinc-400">Thinking...</div>}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={isSubscribed ? "Ask me anything about Wales or the world..." : "Upgrade to continue chatting..."}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500"
            disabled={!isSubscribed}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !isSubscribed || !input.trim()}
            className="px-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-2xl font-medium transition"
          >
            Send
          </button>
        </div>
        {!isSubscribed && (
          <p className="text-center text-sm text-zinc-500 mt-3">
            Free users have limited access • <Link href="/pricing" className="text-blue-400 hover:underline">Upgrade now</Link>
          </p>
        )}
      </div>
    </div>
  );
}