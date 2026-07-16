<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pricing - a.wales</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    .lang-btn { transition: all 0.3s; }
    .lang-btn.active { font-weight: bold; text-decoration: underline; }
  </style>
</head>
<body class="bg-gray-50 text-gray-900">

  <!-- Navbar -->
  <nav class="bg-white shadow-sm border-b">
    <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-4">
        <a href="/" class="text-2xl font-bold">a.wales</a>
      </div>
      
      <div class="flex items-center gap-6">
        <a href="/" class="hover:text-red-600">🏴󠁧󠁢󠁷󠁬󠁳󠁿 Home</a>
        <a href="/chat" class="hover:text-red-600">Start Chatting</a>
        
        <!-- Language Toggle -->
        <div class="flex items-center gap-2 border rounded-full p-1 bg-gray-100">
          <button onclick="switchLanguage('en')" id="btn-en" 
                  class="lang-btn active px-4 py-1 rounded-full text-sm">🇬🇧 EN</button>
          <button onclick="switchLanguage('cy')" id="btn-cy" 
                  class="lang-btn px-4 py-1 rounded-full text-sm">🏴󠁧󠁢󠁷󠁬󠁳󠁿 CY</button>
        </div>
      </div>
    </div>
  </nav>

  <div class="max-w-6xl mx-auto px-6 py-12">
    <h1 id="title" class="text-4xl font-bold text-center mb-2">Choose Your Plan</h1>
    <p id="subtitle" class="text-center text-gray-600 mb-12">Powerful AI for Wales</p>

    <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      
      <!-- Free Plan -->
      <div class="bg-white rounded-2xl shadow p-8 border border-gray-200">
        <h2 id="free-title" class="text-2xl font-semibold mb-4">Free</h2>
        <div class="text-5xl font-bold mb-2" id="free-price">£0</div>
        <p id="free-period" class="text-gray-500 mb-8">Forever</p>
        
        <ul id="free-features" class="space-y-4 mb-10">
          <li>✅ <span data-en="10 messages per day" data-cy="10 negeseuon y dydd">10 messages per day</span></li>
          <li>✅ <span data-en="Basic Grok AI" data-cy="Grok AI sylfaenol">Basic Grok AI</span></li>
        </ul>
        <a href="/chat" class="block text-center bg-gray-800 text-white py-4 rounded-xl font-medium hover:bg-black">Start Free</a>
      </div>

      <!-- Monthly Plan -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-600 relative">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-sm px-6 py-1 rounded-full font-medium">MOST POPULAR</div>
        
        <h2 id="monthly-title" class="text-2xl font-semibold mb-4">Monthly</h2>
        <div class="flex items-baseline gap-2 mb-1">
          <div class="text-5xl font-bold" id="monthly-price">£4.99</div>
        </div>
        <p id="monthly-period" class="text-gray-500 mb-8">per month</p>
        
        <ul id="monthly-features" class="space-y-4 mb-10">
          <li>✅ <span data-en="Unlimited messages" data-cy="Negeseuon di-ben-draw">Unlimited messages</span></li>
          <li>✅ <span data-en="Image generation" data-cy="Creu delweddau">Image generation</span></li>
          <li>✅ <span data-en="Faster responses" data-cy="Ymatebion cyflymach">Faster responses</span></li>
        </ul>
        <a href="#" class="block text-center bg-red-600 text-white py-4 rounded-xl font-medium hover:bg-red-700">Subscribe Monthly</a>
      </div>

      <!-- Annual Plan -->
      <div class="bg-white rounded-2xl shadow p-8 border border-gray-200">
        <h2 id="annual-title" class="text-2xl font-semibold mb-4">Annual</h2>
        <div class="flex items-baseline gap-2 mb-1">
          <div class="text-5xl font-bold" id="annual-price">£49</div>
        </div>
        <p id="annual-period" class="text-emerald-600 font-medium mb-2">Save ~18%</p>
        <p id="annual-sub" class="text-gray-500 mb-8">billed yearly (£4.08/month)</p>
        
        <ul id="annual-features" class="space-y-4 mb-10">
          <li>✅ <span data-en="Everything in Monthly" data-cy="Popeth yn y Misol">Everything in Monthly</span></li>
          <li>✅ <span data-en="Best value" data-cy="Y gwerth gorau">Best value</span></li>
        </ul>
        <a href="#" class="block text-center bg-gray-800 text-white py-4 rounded-xl font-medium hover:bg-black">Subscribe Annually</a>
      </div>
    </div>
  </div>

  <script>
    function switchLanguage(lang) {
      document.documentElement.lang = lang;
      
      // Toggle active button
      document.getElementById('btn-en').classList.toggle('active', lang === 'en');
      document.getElementById('btn-cy').classList.toggle('active', lang === 'cy');

      // Translate all data attributes
      document.querySelectorAll('[data-en]').forEach(el => {
        const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-cy');
        if (text) el.textContent = text;
      });

      // Page title & subtitle
      if (lang === 'en') {
        document.getElementById('title').textContent = "Choose Your Plan";
        document.getElementById('subtitle').textContent = "Powerful AI for Wales";
      } else {
        document.getElementById('title').textContent = "Dewiswch eich Cynllun";
        document.getElementById('subtitle').textContent = "AI pwerus i Gymru";
      }
    }

    // Auto-detect Welsh preference (optional)
    if (navigator.language.startsWith('cy')) {
      switchLanguage('cy');
    }
  </script>
</body>
</html>