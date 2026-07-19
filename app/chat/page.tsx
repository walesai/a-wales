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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
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
    setMessages([{
      role: 'assistant',
      content: isWelsh
        ? "🏴󠁧󠁢󠁷󠁬󠁳󠁿 Croeso i a.wales Premium!"
        : "🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welcome back to a.wales Premium!\n\nHow can I help you today?"
    }]);
  }, [isWelsh]);

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

  const formatMessage = (text: string) => {
    return text
      .replace(/\n/g, '<br />')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
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
      const now = new Date();
      const ukTime = now.toLocaleString('en-GB', {
        timeZone: 'Europe/London',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          isWelsh,
          currentDateTime: `IMPORTANT: The current date and time in Wales (UK) is ${ukTime}. Use this exact time for any date or time related questions.`
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: isWelsh ? "Mae'n ddrwg gen i..." : "Sorry, I'm having trouble right now." }]);
    } finally {
      setLoading(false);
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
            {isSubscribed ? (
              <button onClick={openCustomerPortal} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-sm font-medium">
                Manage Plan
              </button>
            ) : (
              <Link href="/pricing" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium">
                Upgrade
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex justify-end">
        <div className="flex gap-1 bg-zinc-800 rounded-full p-1">
          <button onClick={() => setIsWelsh(false)} className={`px-4 py-1.5 rounded-full text-xs transition ${!isWelsh ? 'bg-blue-600' : ''}`}>🇬🇧 EN</button>
          <button onClick={() => setIsWelsh(true)} className={`px-4 py-1.5 rounded-full text-xs transition ${isWelsh ? 'bg-red-600' : ''}`}>🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY</button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-3xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800 border border-zinc-700'}`}>
              {msg.role === 'user' ? (
                msg.content
              ) : (
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} 
                />
              )}
            </div>
          </div>
        ))}
        {loading && <div className="text-blue-400 pl-4">Thinking...</div>}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input + Send Button Below */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
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
            className="mt-3 w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-3xl font-medium min-h-[52px]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple formatter function
function formatMessage(text: string) {
  return text
    .replace(/\n/g, '<br />')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}