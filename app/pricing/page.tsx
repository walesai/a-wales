'use client';

import { useState, useEffect } from 'react';

export default function PricingPage() {
  const [lang, setLang] = useState<'en' | 'cy'>('en');

  useEffect(() => {
    // Auto-detect Welsh browser preference
    if (navigator.language.startsWith('cy')) {
      setLang('cy');
    }
  }, []);

  const t = (en: string, cy: string) => lang === 'en' ? en : cy;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-red-600">a.wales</a>
          
          <div className="flex items-center gap-8">
            <a href="/" className="hover:text-red-600">Home</a>
            <a href="/chat" className="hover:text-red-600">Start Chatting</a>
            
            {/* Language Toggle */}
            <div className="flex border rounded-full p-1 bg-gray-100">
              <button 
                onClick={() => setLang('en')}
                className={`px-4 py-1 rounded-full text-sm transition-all ${lang === 'en' ? 'bg-white shadow font-semibold' : ''}`}
              >
                🇬🇧 EN
              </button>
              <button 
                onClick={() => setLang('cy')}
                className={`px-4 py-1 rounded-full text-sm transition-all ${lang === 'cy' ? 'bg-white shadow font-semibold' : ''}`}
              >
                🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            {t("Choose Your Plan", "Dewiswch eich Cynllun")}
          </h1>
          <p className="text-xl text-gray-600">
            {t("Powerful AI for Wales", "AI pwerus i Gymru")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl shadow p-10 border">
            <h2 className="text-3xl font-semibold mb-6">Free</h2>
            <div className="text-6xl font-bold mb-2">£0</div>
            <p className="text-gray-500 mb-10">Forever</p>
            
            <ul className="space-y-5 mb-12 text-lg">
              <li>✅ {t("10 messages per day", "10 negeseuon y dydd")}</li>
              <li>✅ {t("Basic Grok AI", "Grok AI sylfaenol")}</li>
            </ul>
            <a href="/chat" className="block text-center bg-gray-900 text-white py-4 rounded-2xl font-medium hover:bg-black">
              Start Free
            </a>
          </div>

          {/* Monthly Plan - Popular */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border-2 border-red-600 relative scale-105">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-2 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
            
            <h2 className="text-3xl font-semibold mb-6">Monthly</h2>
            <div className="text-6xl font-bold mb-1">£4.99</div>
            <p className="text-gray-500 mb-10">per month</p>
            
            <ul className="space-y-5 mb-12 text-lg">
              <li>✅ {t("Unlimited messages", "Negeseuon di-ben-draw")}</li>
              <li>✅ {t("Image generation", "Creu delweddau")}</li>
              <li>✅ {t("Faster responses", "Ymatebion cyflymach")}</li>
            </ul>
            <a href="#" className="block text-center bg-red-600 text-white py-4 rounded-2xl font-medium hover:bg-red-700">
              Subscribe Monthly
            </a>
          </div>

          {/* Annual Plan */}
          <div className="bg-white rounded-3xl shadow p-10 border">
            <h2 className="text-3xl font-semibold mb-6">Annual</h2>
            <div className="text-6xl font-bold mb-1">£49</div>
            <p className="text-emerald-600 font-medium">Save ~18%</p>
            <p className="text-gray-500 mb-10">billed yearly</p>
            
            <ul className="space-y-5 mb-12 text-lg">
              <li>✅ {t("Everything in Monthly", "Popeth yn y Misol")}</li>
              <li>✅ {t("Best value", "Y gwerth gorau")}</li>
            </ul>
            <a href="#" className="block text-center bg-gray-900 text-white py-4 rounded-2xl font-medium hover:bg-black">
              Subscribe Annually
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}