'use client';

import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Welcome to a.wales Chat! 🏴󠁧󠁢󠁷󠁬󠁳󠁿 How can I help you today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Demo response - replace with real Grok API later
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Thanks for your message: "${currentInput}". This is a demo. Real Grok responses will appear here soon!`
      }]);
      setIsLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-white/10 backdrop-blur-xl p-4 flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center font-black text-xl">A</div>
        <div>
          <div className="font-semibold tracking-tight">a.wales</div>
          <div className="text-xs text-emerald-400">● Grok Online</div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 pt-20 pb-40 p-4 space-y-8 overflow-y-auto max-w-3xl mx-auto w-full">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-6 py-4 rounded-3xl ${
              msg.role === 'user' 
                ? 'bg-white text-black rounded-br-none' 
                : 'bg-zinc-900 border border-white/10 rounded-bl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-white/10 px-6 py-4 rounded-3xl">Grok is thinking...</div>
          </div>
        )}
      </div>

      {/* Input with Send Button UNDER it */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-white/10 p-4">
        <div className="max-w-3xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type your message..."
            rows={3}
            className="w-full bg-zinc-900 border border-white/20 rounded-3xl px-6 py-5 text-base resize-y focus:outline-none focus:border-violet-400"
          />
          
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="mt-3 w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl font-semibold text-lg disabled:opacity-50 hover:brightness-110 transition"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}