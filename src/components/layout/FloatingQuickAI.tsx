'use client';

import React, { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function FloatingQuickAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Assalamu Alaikum! I am your PPN AI Assistant. How can I assist with party circulars or member data today?' }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: `Analyzing "${userMsg}" against PPN knowledge base... According to recent Central Committee guidelines, all ward level drives are proceeding on schedule.` }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs shadow-2xl shadow-sky-600/40 hover:scale-105 transition"
        >
          <Bot className="w-5 h-5 text-amber-300 animate-bounce" />
          <span>Quick AI Assistant</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 rounded-2xl border border-sky-500/30 bg-slate-900/95 text-white backdrop-blur-xl shadow-2xl flex flex-col h-[420px]">
          <div className="flex items-center justify-between p-3.5 border-b border-slate-800 bg-slate-950/50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold">PPN AI Quick Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl ${
                  m.role === 'user'
                    ? 'bg-sky-600 text-white ml-auto max-w-[80%]'
                    : 'bg-slate-800 text-slate-200 mr-auto max-w-[85%]'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask AI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-400 outline-none focus:border-sky-500"
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="p-2 bg-slate-950/80 rounded-b-2xl text-center border-t border-slate-800">
            <Link href="/ai" onClick={() => setIsOpen(false)} className="text-[10px] text-sky-400 hover:underline">
              Open Full AI Assistant Module →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
