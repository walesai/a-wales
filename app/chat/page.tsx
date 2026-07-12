'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Bore da! I'm Grok, your AI companion for Wales. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer xai-u9xigO8ld5DeAuNtxim49ArnkeeI9UjqcZXGm2LbFqLovnbTjAhBvcKs94ifh2L86LZZDx2kFeppdUAY'  // make sure it's correct
  },
  body: JSON.stringify({
    model: "grok-beta",
    messages: [{ role: "user", content: userMessage }]
  })
});

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const reply = data.choices[0].message.content;

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to Grok right now. Please try again shortly." }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white">
      <div className="p-6 border-b border-zinc-800 flex items-center gap-4 bg-zinc-900">
        <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl">🐉</div>
        <div>
          <h1 className="font-semibold text-xl">Grok • a.wales</h1>
          <p className="text-emerald-400 text-sm">● Live with xAI</p>
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
        {isLoading && <div className="text-zinc-400">Grok is thinking...</div>}
      </div>

      <div className="p-6 border-t border-zinc-800 bg-zinc-900">
        <div className="flex gap-3 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500"
          />
          <button onClick={sendMessage} disabled={isLoading} className="bg-white text-black px-10 rounded-2xl font-medium hover:bg-white/90 disabled:opacity-50">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
