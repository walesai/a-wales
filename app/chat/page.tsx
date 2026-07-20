'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'cy'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = {
    role: 'system' as const,
    content: language === 'en' 
      ? "You are a helpful, friendly AI assistant for Wales."
      : "You are a helpful, friendly AI assistant for Wales."
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    setError('');
    const userMessage: Message = { role: 'user', content: input.trim() };
    const currentMessages = messages.length === 0 
      ? [systemPrompt, userMessage]
      : [...messages, userMessage];

    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: currentMessages,
          language 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid response from AI');
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.choices[0].message.content 
      }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
      const errorMsg = language === 'en' 
        ? `Error: ${err.message || 'Please try again.'}` 
        : `Gwall: ${err.message || 'Ceisiwch eto.'}`;
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-950 text-white">
      <div className="border-b border-gray-800 p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">a.wales AI</h1>
        
        <div className="flex items-center gap-2 bg-gray-900 rounded-full p-1">
          <button onClick={() => setLanguage('en')} className={`px-5 py-2 rounded-full text-sm font-medium ${language === 'en' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}>🇬🇧 EN</button>
          <button onClick={() => setLanguage('cy')} className={`px-5 py-2 rounded-full text-sm font-medium ${language === 'cy' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}>🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-2xl mb-2">👋 Welcome to a.wales</p>
            <p className="text-gray-400">How can I help you today?</p>
          </div>
        )}

        {messages.filter(m => m.role !== 'system').map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-3xl px-6 py-4 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-800'}`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && <div className="flex justify-start"><div className="bg-gray-800 rounded-3xl px-6 py-4">Thinking...</div></div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-800 bg-gray-950">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={language === 'en' ? "Ask anything..." : "Gofyn unrhyw beth..."}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-full px-6 py-4 focus:outline-none focus:border-blue-500 text-white"
            disabled={isLoading}
          />
          <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 px-10 rounded-full font-medium">
            Send
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
