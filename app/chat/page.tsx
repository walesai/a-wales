'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(10);
  const [isWelsh, setIsWelsh] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load premium status + chat history
  useEffect(() => {
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    setIsSubscribed(subscribed);

    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load chat history');
      }
    }

    // Free tier rate limit
    if (!subscribed) {
      const today = new Date().toISOString().split('T')[0];
      let count = parseInt(localStorage.getItem('messageCount') || '0');
      if (localStorage.getItem('rateLimitDate') !== today) {
        count = 0;
        localStorage.setItem('rateLimitDate', today);
        localStorage.setItem('messageCount', '0');
      }
      setRemainingMessages(10 - count);
    }
  }, []);

  // Save chat history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll
useEffect(() => {
  setTimeout(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}, [messages, loading]);

  const sendMessage = async () => {
  if (!input.trim() || loading) return;

  // Free tier limit
  if (!isSubscribed) {
    let count = parseInt(localStorage.getItem('messageCount') || '0');
    if (count >= 10) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: isWelsh ? 'Rydych wedi cyrraedd eich terfyn dyddiol.' : 'Daily limit reached.'
      }]);
      return;
    }
    count++;
    localStorage.setItem('messageCount', count.toString());
    setRemainingMessages(10 - count);
  }

  const userMessage = { role: 'user', content: input };
  const updatedMessages = [...messages, userMessage];
  setMessages(updatedMessages);
  setInput('');
  setLoading(true);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: updatedMessages,   // ← send full conversation
        isWelsh
      }),
    });

    const data = await res.json();
    setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
  } catch (error) {
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: isWelsh ? "Mae'n ddrwg gen i..." : "Sorry, I'm having trouble right now."
    }]);
  } finally {
    setLoading(false);
  }
};

  const clearChat = () => {
    if (confirm(isWelsh ? 'Clirio sgwrs?' : 'Clear chat history?')) {
      localStorage.removeItem('chatHistory');
      setMessages([]);
    }
  };

const formatMessage = (text: string) => {
  if (!text) return '';
  return text
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '• $1<br>')
    .replace(/`(.+?)`/g, '<code class="bg-zinc-700 px-1 rounded">$1</code>');
};

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
            <Link href="/" className="text-2xl font-semibold tracking-tight">a.wales</Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/chat">Chat</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>

          {/* Language Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-zinc-800 rounded-full p-1">
              <button
                onClick={() => setIsWelsh(false)}
                className={`px-4 py-1.5 rounded-full text-xs transition ${!isWelsh ? 'bg-blue-600' : ''}`}
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setIsWelsh(true)}
                className={`px-4 py-1.5 rounded-full text-xs transition ${isWelsh ? 'bg-red-600' : ''}`}
              >
                🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
<div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full pb-4">
  {messages.map((msg, i) => (
    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] p-5 rounded-3xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}
        dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
      />
    </div>
  ))}
  {loading && <div className="text-blue-400">Thinking...</div>}
  <div ref={chatEndRef} />
</div>

      {/* Input */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-900 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={clearChat}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Clear Chat
            </button>
            {isSubscribed && (
              <span className="text-xs text-emerald-400">Premium</span>
            )}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={
              isSubscribed
                ? (isWelsh ? 'Gofyn unrhyw beth...' : 'Ask me anything...')
                : `${remainingMessages} left`
            }
            disabled={!isSubscribed && remainingMessages <= 0}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-5 py-3.5 mb-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading || (!isSubscribed && remainingMessages <= 0) || !input.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-3xl py-3.5 font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}