'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Bore da! I'm your Welsh AI companion. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate Grok response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "That's a great question about Wales! Here's what I think..." 
      }]);
    }, 800);
  };

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Sidebar */}
      <div className="w-72 border-r border-zinc-800 bg-zinc-900 p-6 hidden md:block">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Prompt Library</h2>
          <div className="space-y-2 text-sm">
            <div className="bg-zinc-800 p-3 rounded-xl cursor-pointer hover:bg-zinc-700">Welsh History & Culture</div>
            <div className="bg-zinc-800 p-3 rounded-xl cursor-pointer hover:bg-zinc-700">Local News Summary</div>
            <div className="bg-zinc-800 p-3 rounded-xl cursor-pointer hover:bg-zinc-700">Travel in Wales</div>
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl">
            🐉
          </div>
          <div>
            <h1 className="font-semibold">Grok • a.wales</h1>
            <p className="text-sm text-green-400">Online • Welsh AI</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-5 py-4 rounded-3xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-zinc-800">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me anything about Wales..."
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={sendMessage}
              className="bg-white text-black px-8 rounded-2xl font-medium hover:bg-white/90"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}