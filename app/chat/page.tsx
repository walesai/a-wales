'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <header className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
            <Link href="/" className="text-2xl font-semibold">a.wales</Link>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block p-4 rounded-3xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
              {msg.content.split('\n').map((line, idx) => <p key={idx}>{line}</p>)}
            </div>
          </div>
        ))}
        {loading && <div>Thinking...</div>}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-3xl px-5 py-3"
          />
          <button onClick={sendMessage} className="px-8 bg-blue-600 rounded-3xl">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}