'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(10);
  const [isWelsh, setIsWelsh] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Premium Subscription Check
  useEffect(() => {
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    setIsSubscribed(subscribed);
    console.log("Premium status:", subscribed); // Debug
  }, []);

  // Load chat memory
  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save chat memory
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    if (!isSubscribed) {
      let count = parseInt(localStorage.getItem('messageCount') || '0');
      if (count >= 10) {
        setMessages(prev => [...prev, { role: 'assistant', content: "Daily limit reached." }]);
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
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
            <Link href="/" className="text-2xl font-semibold tracking-tight">a.wales</Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/chat">Chat</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full" ref={chatEndRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-3xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-blue-400">Thinking...</div>}
      </div>

      <div className="p-3 border-t border-zinc-800 bg-zinc-900 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={isSubscribed ? "Ask me anything..." : `${remainingMessages} left`}
            disabled={!isSubscribed && remainingMessages <= 0}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-5 py-3.5 mb-2"
          />
          <button
            onClick={sendMessage}
            disabled={loading || (!isSubscribed && remainingMessages <= 0) || !input.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-3xl py-3.5 font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}