'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Bore da! I'm Grok, your AI companion for Wales. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_XAI_API_KEY_HERE' // ← Add your key later
        },
        body: JSON.stringify({
          model: "grok-3",
          messages: [
            { role: "system", content: "You are a helpful AI assistant for Wales, knowledgeable about Welsh history, culture, language, news, and local topics." },
            ...messages,
            { role: "user", content: userMessage }
          ]
        })
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response right now.";

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Try again in a moment." 
      }]);
    }

    setIsLoading(false);
  };

  return (
    // ... keep the same JSX as before
  );
}