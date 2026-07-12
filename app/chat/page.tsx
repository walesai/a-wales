'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Bore da! I'm Grok, your AI companion for Wales. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    // Simulated smart response
    setTimeout(() => {
      const replies = [
        "That's an interesting question about Wales! Here's what I know...",
        "Great question! Let me give you a detailed answer with Welsh context.",
        "Diolch for asking! Here's my thoughts on that topic.",
        "Excellent question. As your Welsh AI, I'd say..."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: randomReply + " Wales has a rich history and vibrant culture. What else would you like to explore?" 
      }]);
      setIsLoading(false);
    }, 700);
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-4 bg-zinc-900">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl">
            🐉
          </div>
          <div>
            <h1 className="font-semibold">Grok • a.wales</h1>
            <p className="text-sm text-green-400">● Online</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : ''}`}>
              <div className={`max-w-[80%] px-6 py-4 rounded-3xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-zinc-500">Thinking...</div>}
        </div>

        <div className="p-6 border-t border-zinc-800 bg-zinc-900">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything about Wales..."
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-white text-black px-8 rounded-2xl font-medium hover:bg-white/90 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}