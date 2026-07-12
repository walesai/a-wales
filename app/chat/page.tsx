'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Bore da! I'm Grok, your AI companion for Wales. How can I help you today? You can ask questions or describe an image to generate." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: `That's a great question! As your Welsh AI, I'd say...` }]);
      setIsLoading(false);
    }, 800);
  };

  const generateImage = () => {
    if (!input.trim() || isLoading) return;

    const prompt = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: `Generate image: ${prompt}` }]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const seed = prompt.replace(/\s+/g, '').slice(0, 20);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `🖼️ **Generated Image:** ${prompt}\n\n![${prompt}](https://picsum.photos/seed/${seed}/800/600)` 
      }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-zinc-900">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl">🐉</div>
        <div>
          <h1 className="font-semibold">Grok • a.wales</h1>
          <p className="text-emerald-400 text-xs">● Live with xAI</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : ''}`}>
            <div className={`max-w-[85%] px-5 py-3 rounded-3xl text-[17px] leading-relaxed ${
              msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-zinc-400 text-center">Generating...</div>}
      </div>

      <div className="p-3 border-t border-zinc-800 bg-zinc-900">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything or describe an image..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
          />
          <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="bg-white text-black px-6 rounded-2xl text-sm">Send</button>
          <button onClick={generateImage} disabled={isLoading || !input.trim()} className="bg-purple-600 text-white px-6 rounded-2xl text-sm">🖼️</button>
        </div>
      </div>
    </div>
  );
}