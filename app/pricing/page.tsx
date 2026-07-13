'use client';

export default function PricingPage() {
  const handleCheckout = async (plan: string) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error: No checkout URL received');
      }
    } catch (error) {
      alert('Error connecting to payment system. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Simple Pricing</h1>
        <p className="text-xl text-zinc-400 mb-16">Choose the plan that works for you</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-700">
            <h3 className="text-2xl font-semibold mb-2">Free</h3>
            <div className="text-5xl font-bold mb-8">£0</div>
            <ul className="space-y-4 text-left mb-10 text-zinc-300">
              <li>✓ 20 messages per day</li>
              <li>✓ Basic AI chat</li>
              <li>✓ English only</li>
            </ul>
            <a href="/chat" className="block w-full py-4 border border-zinc-600 rounded-2xl font-medium text-white">Get Started Free</a>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 ring-2 ring-blue-500 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm px-6 py-1 rounded-full">POPULAR</div>
            <h3 className="text-2xl font-semibold mb-2">Monthly</h3>
            <div className="text-5xl font-bold mb-1">£4.99</div>
            <div className="text-zinc-400 mb-8">per month</div>
            <ul className="space-y-4 text-left mb-10 text-zinc-300">
              <li>✓ Unlimited messages</li>
              <li>✓ Image generation</li>
              <li>✓ Bilingual (EN/CY)</li>
              <li>✓ Priority responses</li>
            </ul>
            <button onClick={() => handleCheckout('monthly')} className="block w-full py-4 bg-white text-black rounded-2xl font-medium">Subscribe Monthly</button>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-700">
            <h3 className="text-2xl font-semibold mb-2">Annual</h3>
            <div className="text-5xl font-bold mb-1">£49</div>
            <div className="text-zinc-400 mb-8">per year (save £11)</div>
            <ul className="space-y-4 text-left mb-10 text-zinc-300">
              <li>✓ Everything in Monthly</li>
              <li>✓ Best value</li>
              <li>✓ Early access to new features</li>
            </ul>
            <button onClick={() => handleCheckout('annual')} className="block w-full py-4 border border-zinc-600 rounded-2xl font-medium text-white">Subscribe Annually</button>
          </div>
        </div>
      </div>
    </div>
  );
}