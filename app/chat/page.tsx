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
  const [debugInfo, setDebugInfo] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    const currentMessages = [ { role: 'system' as const, content: "You are a helpful AI." }, ...messages, userMessage ];

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setDebugInfo('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentMessages }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setDebugInfo(`API Error: ${data.error || res.status}`);
        throw new Error(data.error || 'API failed');
      }

      if (!data.choices?.[0]?.message?.content) {
        setDebugInfo('Bad response format from API');
        throw new Error('Bad API response');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (err: any) {
      setDebugInfo(err.message || 'Unknown error');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${err.message || 'Please check API key and try again.'}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-950 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">a.wales AI Debug Mode</h1>
      
      <div className="flex-1 overflow-y-auto border border-gray-700 rounded-xl p-4 mb-4 bg-gray-900">
        {messages.map((m, i) => (
          <div key={i} className="mb-4">
            <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong> 
            <div className="mt-1">{m.content}</div>
          </div>
        ))}
        {isLoading && <div>Thinking...</div>}
      </div>

      {debugInfo && <div className="bg-red-900 p-3 rounded mb-4 text-red-200">Debug: {debugInfo}</div>}

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type message..."
          className="flex-1 p-4 bg-gray-900 border border-gray-700 rounded-xl"
        />
        <button onClick={sendMessage} disabled={isLoading} className="bg-blue-600 px-8 rounded-xl">
          Send
        </button>
      </div>
    </div>
  );
}
