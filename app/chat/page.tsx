'use client';

import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm Grok, ready to help with anything Wales-related. How can I assist you today? 🏴󠁧󠁢󠁷󠁬󠁳󠁿" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate Grok response (replace with real API call later)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "This is a demo response. The real Grok integration will go here. What would you like to know about Wales, crypto, or anything else?"
      }]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/90 backdrop-blur-xl p-4 flex items-center gap-4 fixed w-full z-50">
        <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center font-black">A</div>
        <div>
          <div className="font-semibold">a.wales Chat</div>
          <div className="text-xs text-green-400">● Online • Powered by Grok</div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 pt-20 pb-32 overflow-y-auto p-4 space-y-6 max-w-4xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-5 py-4 rounded-3xl ${msg.role === 'user' 
              ? 'bg-white text-black' 
              : 'bg-zinc-900 border border-white/10'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-white/10 px-5 py-4 rounded-3xl">Thinking...</div>
          </div>
        )}
      </div>

      {/* Input Area - Send button UNDER input */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-white/10 p-4">
        <div className="max-w-4xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Message a.wales..."
            rows={2}
            className="w-full bg-zinc-900 border border-white/20 rounded-3xl px-6 py-4 text-lg resize-y min-h-[60px] focus:outline-none focus:border-violet-500"
          />
          
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="mt-3 w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 rounded-3xl font-semibold text-lg disabled:opacity-50 transition hover:brightness-110"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </div>
  );
}