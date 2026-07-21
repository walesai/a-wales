// Chat memory enabled - July 21 2026
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

  // Load saved chat history
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to load chat history");
      }
    } else {
      setMessages([{
        role: 'assistant',
        content: isWelsh
          ? "🏴󠁧󠁢󠁷󠁬󠁳󠁿 Croeso i a.wales Premium!"
          : "🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welcome back to a.wales Premium!\n\nHow can I help you today?"
      }]);
    }

    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    setIsSubscribed(subscribed);

    const today = new Date().toISOString().split('T')[0];
    let count = parseInt(localStorage.getItem('messageCount') || '0');

    if (!subscribed) {
      if (localStorage.getItem('rateLimitDate') !== today) {
        count = 0;
        localStorage.setItem('rateLimitDate', today);
        localStorage.setItem('messageCount', '0');
      }
      setRemainingMessages(10 - count);
    }
  }, [isWelsh]);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  // Robust Auto-Scroll
  useEffect(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 150);
  }, [messages, loading]);

  const openCustomerPortal = async () => {
    try {
      const res = await fetch('/api/create-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: localStorage.getItem('userEmail') }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      alert("Couldn't open Manage Plan");
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    if (!isSubscribed) {
      let count = parseInt(localStorage.getItem('messageCount') || '0');
      if (count >= 10) {
        setMessages(prev => [...prev, { role: 'assistant', content: isWelsh ? "Rydych wedi cyrraedd eich terfyn dyddiol." : "Daily limit reached." }]);
        return;
      }
      count++;
      localStorage.setItem('messageCount', count.toString());
      setRemainingMessages(10 - count);
    }

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, isWelsh }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: isWelsh ? "Mae'n ddrwg gen i..." : "Sorry, I'm having trouble right now." }]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (text: string) => {
    let formatted = text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '• $1<br>');
    return formatted;
  };

  const clearChat = () => {
    if (confirm(isWelsh ? "Clirio sgwrs?" : "Clear chat history?")) {
      localStorage.removeItem('chatHistory');
      setMessages([{
        role: 'assistant',
        content: isWelsh
          ? "🏴󠁧󠁢󠁷󠁬󠁳󠁿 Sgwrs wedi clirio. Sut alla i helpu?"
          : "Chat history cleared. How can I help you?"
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
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

          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-zinc-800 rounded-full p-1">
              <button onClick={() => setIsWelsh(false)} className={`px-4 py-1.5 rounded-full text-xs transition ${!isWelsh ? 'bg-blue-600' : ''}`}>🇬🇧 EN</button>
              <button onClick={() => setIsWelsh(true)} className={`px-4 py-1.5 rounded-full text-xs transition ${isWelsh ? 'bg-red-600' : ''}`}>🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY</button>
            </div>

            {isSubscribed ? (
              <button onClick={openCustomerPortal} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-sm font-medium hidden md:block">
                Manage Plan
              </button>
            ) : (
              <Link href="/pricing" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium hidden md:block">
                Upgrade
              </Link>
            )}
          </div>
        </div>

        {isSubscribed && (
          <div className="md:hidden border-t border-zinc-800 bg-zinc-900 px-4 py-3 flex justify-center">
            <button onClick={openCustomerPortal} className="w-full max-w-xs py-3 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-sm font-medium">
              Manage Plan
            </button>
          </div>
        )}
      </header>

      {/* Messages with Markdown + Auto-Scroll */}
      <div 
        className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full pb-32"
        ref={chatEndRef}
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] p-5 rounded-3xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800 border border-zinc-700'}`}
              dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
            />
          </div>
        ))}
        {loading && <div className="text-blue-400 pl-4">Thinking...</div>}
        <div ref={chatEndRef} className="h-1" />
      </div>

      {/* Fixed Bottom Input */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-900 sticky bottom-0 z-40">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <button
              onClick={clearChat}
              className="text-xs text-zinc-400 hover:text-white px-3 py-1"
            >
              Clear Chat
            </button>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={isSubscribed ? (isWelsh ? "Gofyn unrhyw beth..." : "Ask me anything...") : `${remainingMessages} left`}
            disabled={!isSubscribed && remainingMessages <= 0}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-5 py-3.5 text-base focus:outline-none focus:border-blue-500 min-h-[52px]"
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