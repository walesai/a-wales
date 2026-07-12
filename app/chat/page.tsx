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
          'Authorization': 'Bearer xai-u9xigO8ld5DeAuNtxim49ArnkeeI9UjqcZXGm2LbFqLovnbTjAhBvcKs94ifh2L86LZZDx2kFeppdUAY'
        },
        body: JSON.stringify({
          model: "grok-3",
          messages: [
            { role: "system", content: "You are Grok by xAI. The current date is Sunday, July 12, 2026. Always use the current real date and time in your responses. Be accurate and helpful." },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage }
          ],
          temperature: 0.7,
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to Grok. Please try again." }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="p-3 border-b border-zinc-800 flex items-center gap-3 bg-zinc-900">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl">🐉</div>
        <div>
          <h1 className="font-semibold text-lg">Grok • a.wales</h1>
          <p className="text-emerald-400 text-xs">● Live</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : ''}`}>
            <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-[17px] leading-relaxed ${
              msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-zinc-400 text-center">Grok is thinking...</div>}
      </div>

      {/* Input */}
      <div className="p-2 border-t border-zinc-800 bg-zinc-900">
  <div className="flex gap-2">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      placeholder="Ask me anything..."
      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
    />
    <button 
      onClick={sendMessage}
      disabled={isLoading || !input.trim()}
      className="bg-white text-black px-5 rounded-2xl font-medium hover:bg-white/90 disabled:opacity-50 text-sm"
    >
      Send
    </button>
  </div>
</div>
    </div>
  );
}