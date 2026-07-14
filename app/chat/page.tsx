'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Check subscription status
  useEffect(() => {
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    setIsSubscribed(subscribed);

    // Welcome message
    setMessages([{
      role: 'assistant',
      content: subscribed 
        ? "🐉 Welcome back to a.wales Premium! How can I help you today?"
        : "👋 Welcome to a.wales!\n\nThis is the **Free tier**. Upgrade for unlimited access."
    }]);
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
        body: JSON.stringify({ 
          message: input,
          isSubscribed 
        }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || data.message }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting. Please try again." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <header className="border-b border-zinc-800 p-4 flex justify-between items-center bg-zinc-900">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🐉</span>
          <h1 className="text-2xl font-bold">a.wales AI</h1>
          {isSubscribed && <span className="text-green-400 text-sm font-medium">Premium</span>}
        </div>
        
        <div className="flex items-center gap-4">
          {!isSubscribed && (
            <Link href="/pricing" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition">
              Upgrade Now
            </Link>
          )}
          <Link href="/" className="px-5 py-2 border border-zinc-700 rounded-xl hover:bg-zinc-800">Home</Link>
        </div>
      </header>

      <div className="flex-1 p-6 overflow-auto max-w-4xl mx-auto w-full space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-3xl ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-zinc-800 border border-zinc-700'
            }`}>
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
            placeholder={isSubscribed ? "Ask anything..." : "Upgrade to send messages"}
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 disabled:opacity-50"
            disabled={!isSubscribed}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !isSubscribed || !input.trim()}
            className="px-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-2xl font-medium transition"
          >
            Send
          </button>
        </div>
        
        {!isSubscribed && (
          <p className="text-center text-sm text-zinc-500 mt-4">
            Free tier is limited • <Link href="/pricing" className="text-blue-400 underline">Upgrade for full access</Link>
          </p>
        )}
      </div>
    </div>
  );
}