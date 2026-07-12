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

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Thanks for asking "${userMsg}". Wales has so much to offer — history, culture, and beautiful landscapes. What else would you like to explore?` 
      }]);
      setIsLoading(false);
    }, 700);
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50 text-zinc-900">
      {/* Header */}
      <div className="border-b bg-white p-5 flex items-center gap-4 shadow-sm">
        <div className="w-11 h-11 bg-gradient-to-br from-red-600 to-blue-600 rounded-2xl flex items-center justify-center text-3xl">
          🐉
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">a.wales</h1>
          <p className="text-sm text-emerald-600">Grok AI • Welsh Companion</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-6 py-4 rounded-3xl ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white border border-zinc-200 text-zinc-900 shadow-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-zinc-200 px-6 py-4 rounded-3xl text-zinc-500">Thinking...</div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="border-t bg-white p-6">
        <div className="max-w-3xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything about Wales..."
            className="flex-1 bg-white border border-zinc-300 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 text-lg placeholder-zinc-400"
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 text-white font-medium px-10 rounded-2xl transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
