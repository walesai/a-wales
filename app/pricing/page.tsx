'use client';

import { useState, useEffect } from 'react';

export default function Pricing() {
  const [lang, setLang] = useState<'en' | 'cy'>('en');

  useEffect(() => {
    if (navigator.language.startsWith('cy') || localStorage.getItem('lang') === 'cy') {
      setLang('cy');
    }
  }, []);

  const toggleLang = (newLang: 'en' | 'cy') => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (en: string, cy: string) => (lang === 'en' ? en : cy);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation - Matching your style */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
            <a href="/" className="text-2xl font-bold">a.wales</a>
          </div>

          <div className="flex items-center gap-8">
            <a href="/" className="hover:text-red-600">Home</a>
            <a href="/chat" className="text-red-600 font-medium">Start Chatting</a>

            {/* Language Toggle - Same style as before */}
            <div className="flex border rounded-full p-1 bg-gray-100">
              <button 
                onClick={() => toggleLang('en')}
                className={`px-5 py-2 rounded-full text-sm transition-all ${lang === 'en' ? 'bg-white shadow font-semibold' : 'text-gray-600'}`}
              >
                🇬🇧 EN
              </button>
              <button 
                onClick={() => toggleLang('cy')}
                className={`px-5 py-2 rounded-full text-sm transition-all ${lang === 'cy' ? 'bg-white shadow font-semibold' : 'text-gray-600'}`}
              >
                🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-3">
          {t('Choose Your Plan', 'Dewiswch eich Cynllun')}
        </h1>
        <p className="text-center text-gray-600 text-xl mb-12">
          {t('Powerful AI for Wales', 'AI pwerus i Gymru')}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free */}
          <div className="bg-white rounded-2xl p-8 border">
            <h2 className="text-2xl font-semibold">Free</h2>
            <div className="text-5xl font-bold mt-6 mb-1">£0</div>
            <p className="text-gray-500">per month</p>

            <ul className="mt-8 space-y-4">
              <li>✅ {t('10 messages per day', '10 negeseuon y dydd')}</li>
              <li>✅ {t('Basic Grok AI', 'Grok AI sylfaenol')}</li>
            </ul>

            <a href="/chat" className="mt-10 block w-full text-center bg-gray-900 text-white py-4 rounded-xl hover:bg-black">
              Start Free
            </a>
          </div>

          {/* Monthly - Popular */}
          <div className="bg-white rounded-2xl p-8 border-2 border-red-500 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-6 py-1 rounded-full">
              MOST POPULAR
            </div>
            
            <h2 className="text-2xl font-semibold">Monthly</h2>
            <div className="text-5xl font-bold mt-6 mb-1">£4.99</div>
            <p className="text-gray-500">per month</p>

            <ul className="mt-8 space-y-4">
              <li>✅ {t('Unlimited messages', 'Negeseuon di-ben-draw')}</li>
              <li>✅ {t('Image generation', 'Creu delweddau')}</li>
              <li>✅ {t('Faster responses', 'Ymatebion cyflymach')}</li>
            </ul>

            <a href="#" className="mt-10 block w-full text-center bg-red-600 text-white py-4 rounded-xl hover:bg-red-700">
              Subscribe Monthly
            </a>
          </div>

          {/* Annual */}
          <div className="bg-white rounded-2xl p-8 border">
            <h2 className="text-2xl font-semibold">Annual</h2>
            <div className="text-5xl font-bold mt-6 mb-1">£49</div>
            <p className="text-emerald-600">Save ~18%</p>

            <ul className="mt-8 space-y-4">
              <li>✅ {t('Everything in Monthly', 'Popeth yn y Misol')}</li>
              <li>✅ {t('Best value', 'Y gwerth gorau')}</li>
            </ul>

            <a href="#" className="mt-10 block w-full text-center bg-gray-900 text-white py-4 rounded-xl hover:bg-black">
              Subscribe Annually
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}