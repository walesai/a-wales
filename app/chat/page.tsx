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

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = {
    role: 'system' as const,
    content: language === 'en' 
      ? "You are a helpful, friendly AI assistant for Wales. Use markdown for **bold**, lists, and tables when helpful."
      : "You are a helpful, friendly AI assistant for Wales. Respond in Welsh (Cymraeg) unless asked otherwise. Use markdown for **bold**, lists, and tables when helpful."
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

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

      if (!response.ok || !data.choices?.[0]?.message?.content) {
        throw new Error(data.error || 'Failed to get response');
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.choices[0].message.content 
      }]);
    } catch (error) {
      console.error(error);
      const errorMsg = language === 'en' 
        ? "Sorry, something went wrong. Please try again." 
        : "Mae'n ddrwg gen i, aeth rhywbeth o'i le. Ceisiwch eto.";
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (content: string) => {
    let formatted = content
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-700 px-1 py-0.5 rounded">$1</code>');

    formatted = formatted.replace(/^[-*]\s+(.+)$/gm, '• $1');
    formatted = formatted.replace(/^\d+\.\s+(.+)$/gm, '$1');

    return formatted.split('\n').map((line, i) => (
      <p key={i} className="mb-2 last:mb-0 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: line }} />
    ));
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-950 text-white">
      <div className="border-b border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">a.wales AI</h1>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-900 rounded-full p-1">
          <button
            onClick={() => setLanguage('en')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              language === 'en' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
            }`}
          >
            🇬🇧 EN
          </button>
          <button
            onClick={() => setLanguage('cy')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              language === 'cy' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
            }`}
          >
            🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY
          </button>
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
            <div className={`max-w-[85%] rounded-3xl px-6 py-4 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800'
            }`}>
              {msg.role === 'user' ? (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <div className="prose prose-invert max-w-none">
                  {renderMessage(msg.content)}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-3xl px-6 py-4">Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-800 bg-gray-950">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={language === 'en' ? "Ask anything..." : "Gofyn unrhyw beth..."}
            className="bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 w-full"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 py-4 rounded-2xl font-medium text-lg w-full transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
