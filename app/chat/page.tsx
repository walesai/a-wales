'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(10);
  const [isWelsh, setIsWelsh] = useState(false);   // ← Welsh toggle

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
        ? "🐉 Croeso i a.wales! Sut alla i dy helpu heddiw?" 
        : "🐉 Welcome to a.wales!\n\nFree tier: 10 messages per day."
    }]);
  }, [isWelsh]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    if (!isSubscribed) {
      let count = parseInt(localStorage.getItem('messageCount') || '0');
      if (count >= 10) {
        setMessages(prev => [...prev, { role: 'assistant', content: isWelsh ? "Rydych wedi cyrraedd eich terfyn dyddiol." : "Daily limit reached. Upgrade to Premium!" }]);
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
        body: JSON.stringify({ 
          message: input,
          isWelsh 
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: isWelsh ? "Mae'n ddrwg gen i, mae problem ar hyn o bryd." : "Sorry, I'm having trouble right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Header />

      {/* Language Toggle */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-3 flex justify-end">
        <div className="flex items-center gap-3 bg-zinc-800 rounded-full p-1">
          <button 
            onClick={() => setIsWelsh(false)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${!isWelsh ? 'bg-blue-600 text-white' : 'text-zinc-400'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setIsWelsh(true)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${isWelsh ? 'bg-red-600 text-white' : 'text-zinc-400'}`}
          >
            CY
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
      </div>
    </div>
  );
}