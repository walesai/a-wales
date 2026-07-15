'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(10);
  const [isWelsh, setIsWelsh] = useState(false);

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
        ? "🐉 Croeso i a.wales! Sut alla i dy helpu heddiw?" 
        : "🐉 Welcome to a.wales!\n\nFree tier: 10 messages per day."
    }]);
  }, [isWelsh]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    if (!isSubscribed) {
      let count = parseInt(localStorage.getItem('messageCount') || '0');
      if (count >= 10) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: isWelsh ? "Rydych wedi cyrraedd eich terfyn dyddiol." : "Daily limit reached. Upgrade to Premium!" 
        }]);
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
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: isWelsh ? "Mae'n ddrwg gen i, mae problem ar hyn o bryd." : "Sorry, I'm having trouble right now." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🐉</span>
            <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition">a.wales</Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-base">
            <Link href="/chat" className="hover:text-blue-400 transition">Chat</Link>
            <Link href="/pricing" className="hover:text-blue-400 transition">Pricing</Link>
          </nav>
          <Link href="/pricing" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium transition">
            {isSubscribed ? 'Manage Plan' : 'Upgrade'}
          </Link>
        </div>
      </header>

      {/* Welsh Toggle */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-3 flex justify-end">
        <div className="flex items-center gap-2 bg-zinc-800 rounded-full p-1">
          <button 
            onClick={() => setIsWelsh(false)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${!isWelsh ? 'bg-blue-600 text-white' : 'text-zinc-400'}`}
          >
            🇬🇧 EN
          </button>
          <button 
            onClick={() => setIsWelsh(true)}
            className={`px-5 py-2 rounded-full