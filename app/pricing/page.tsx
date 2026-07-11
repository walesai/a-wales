export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      features: ["Basic AI chat", "10 messages/day", "English only", "Standard response speed"],
      button: "Get Started Free",
      popular: false
    },
    {
      name: "Monthly",
      price: "9.99",
      period: "month",
      features: ["Unlimited AI chat", "Priority responses", "Bilingual (EN/CY)", "Image generation", "Welsh news summaries"],
      button: "Subscribe Monthly",
      popular: true
    },
    {
      name: "Annual",
      price: "99",
      period: "year",
      features: ["Everything in Monthly", "Save £20/year", "Early access to new features", "Dedicated Welsh AI persona"],
      button: "Subscribe Annually",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 py-24 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Simple, fair pricing</h1>
        <p className="text-xl text-zinc-400">Choose the plan that works best for you</p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`bg-zinc-900 rounded-3xl p-8 relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-medium px-6 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}

            <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
            <div className="mb-8">
              <span className="text-5xl font-bold">£{plan.price}</span>
              <span className="text-zinc-400">/{plan.period}</span>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-2xl font-semibold text-lg transition ${plan.popular ? 'bg-white text-black hover:bg-white/90' : 'border border-white/30 hover:bg-white/10'}`}>
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}