'use client';

import { useState, useEffect } from 'react';

export default function PricingPage() {
  const [lang, setLang] = useState<'en' | 'cy'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'en' | 'cy' | null;
    if (saved) setLang(saved);
    else if (navigator.language.startsWith('cy')) setLang('cy');
  }, []);

  const toggle = (newLang: 'en' | 'cy') => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (en: string, cy: string) => lang === 'en' ? en : cy;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 prose prose-neutral">
      {/* Header / Nav */}
      <div className="flex justify-between items-center mb-12 border-b pb-6">
        <div>
          <span className="text-2xl">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
          <a href="/" className="text-3xl font-bold ml-3">a.wales</a>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/chat" className="text-red-600 hover:underline">Start Chatting</a>
          
          <div className="flex gap-2 border rounded-full p-1">
            <button onClick={() => toggle('en')} className={`px-4 py-1 rounded-full ${lang === 'en' ? 'bg-black text-white' : ''}`}>
              🇬🇧 EN
            </button>
            <button onClick={() => toggle('cy')} className={`px-4 py-1 rounded-full ${lang === 'cy' ? 'bg-black text-white' : ''}`}>
              🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY
            </button>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-center">
        {t("Choose Your Plan", "Dewiswch eich Cynllun")}
      </h1>
      <p className="text-center text-xl mt-4 mb-16 text-gray-600">
        {t("Powerful AI for Wales", "AI pwerus i Gymru")}
      </p>

      <div className="space-y-12">
        {/* Free */}
        <div>
          <h2 className="text-2xl font-semibold">Free</h2>
          <div className="text-5xl font-bold mt-3">£0</div>
          <ul className="mt-6 space-y-2 text-lg">
            <li>• {t("10 messages per day", "10 negeseuon y dydd")}</li>
            <li>• {t("Basic Grok AI", "Grok AI sylfaenol")}</li>
          </ul>
          <a href="/chat" className="inline-block mt-6 text-blue-600 hover:underline">Start Free →</a>
        </div>

        {/* Monthly */}
        <div>
          <div className="inline-block bg-red-100 text-red-700 text-sm font-medium px-4 py-1 rounded">MOST POPULAR</div>
          <h2 className="text-2xl font-semibold mt-4">Monthly</h2>
          <div className="text-5xl font-bold mt-3">£4.99</div>
          <p className="text-gray-500">per month</p>
          <ul className="mt-6 space-y-2 text-lg">
            <li>• {t("Unlimited messages", "Negeseuon di-ben-draw")}</li>
            <li>• {t("Image generation", "Creu delweddau")}</li>
            <li>• {t("Faster responses", "Ymatebion cyflymach")}</li>
          </ul>
          <a href="#" className="inline-block mt-6 text-blue-600 hover:underline">Subscribe Monthly →</a>
        </div>

        {/* Annual */}
        <div>
          <h2 className="text-2xl font-semibold">Annual</h2>
          <div className="text-5xl font-bold mt-3">£49</div>
          <p className="text-emerald-600">Save ~18%</p>
          <ul className="mt-6 space-y-2 text-lg">
            <li>• {t("Everything in Monthly", "Popeth yn y Misol")}</li>
            <li>• {t("Best value", "Y gwerth gorau")}</li>
          </ul>
          <a href="#" className="inline-block mt-6 text-blue-600 hover:underline">Subscribe Annually →</a>
        </div>
      </div>
    </div>
  );
}