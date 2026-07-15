'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Success() {
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);
  const [isWelsh, setIsWelsh] = useState(false);

  useEffect(() => {
    setIsWelsh(localStorage.getItem('preferredLang') === 'cy');
  }, []);

  const activateAccount = () => {
    if (email.trim()) {
      localStorage.setItem('userEmail', email.trim());
      localStorage.setItem('isSubscribed', 'true');
      localStorage.setItem('subscriptionDate', new Date().toISOString());
      setSaved(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
            <Link href="/" className="text-2xl font-semibold tracking-tight">a.wales</Link>
          </div>
          <Link href="/chat" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-2xl text-sm font-medium">
            Start Chatting
          </Link>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="max-w-md text-center">
          <div className="text-8xl mb-8">🎉</div>
          <h1 className="text-5xl font-bold mb-4">
            {isWelsh ? "Diolch!" : "Thank You!"}
          </h1>
          <p className="text-2xl text-zinc-400 mb-10">
            {isWelsh ? "Mae eich tanysgrifiad yn weithredol" : "Your subscription is now active"}
          </p>

          {!saved ? (
            <div className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isWelsh ? "Eich e-bost" : "Enter your email"}
                className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700 focus:border-blue-500 text-lg"
              />
              <button
                onClick={activateAccount}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-red-500 rounded-2xl font-semibold text-xl hover:brightness-110 transition"
              >
                {isWelsh ? "Actifadu Mynediad Llawn" : "Activate Full Access"}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-green-400 text-2xl mb-8">✅ {isWelsh ? "Llwyddiant!" : "Success!"}</p>
              <Link href="/chat" className="block w-full py-5 bg-white text-black rounded-2xl font-semibold text-xl hover:bg-zinc-100 transition">
                {isWelsh ? "Mynd i Chat →" : "Go to Chat →"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}