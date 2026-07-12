'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm the a.wales AI. Type a message and press Send." }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);

    const userInput = input;
    setInput('');

    // Always reply
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `You asked: "${userInput}". This is a working test response from a.wales chat! How else can I help?` 
      }]);
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">a.wales Chat</h1>
      
      <div className="h-[60vh] overflow-y-auto border border-zinc-700 rounded-3xl p-6 mb-6 space-y-6 bg-zinc-900">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : ''}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me anything..."
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={sendMessage}
          className="bg-white hover:bg-white/90 text-black font-medium px-10 rounded-2xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}