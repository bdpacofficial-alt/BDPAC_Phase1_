'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Send, Mic, Copy, RefreshCw, FileText, Speech } from 'lucide-react';
import { SUGGESTED_AI_PROMPTS } from '@/data/aiData';
import { useToast } from '@/context/ToastContext';

export default function AiPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Assalamu Alaikum! I am the Enterprise Political AI Assistant. Ask me to draft speeches, write circulars, analyze party rules, or summarize meetings.' }
  ]);
  const [input, setInput] = useState('');
  const { addToast } = useToast();

  const handleSend = (query?: string) => {
    const textToSend = query || input;
    if (!textToSend.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text: textToSend }]);
    if (!query) setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: `[AI Response Generated for "${textToSend}"]\n\n1. **Executive Objective:** Ensure 100% compliance across all 8 Divisions.\n2. **Action Directive:** Deploy biometric verification mobile suites to all Ward Secretaries.\n3. **Compliance Timeline:** Final submission by August 15, 2026.`
        }
      ]);
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-8rem)] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-950 text-white">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-amber-400" />
          <h2 className="font-bold text-sm">Enterprise Political AI Suite</h2>
        </div>
        <span className="text-[10px] text-sky-400 font-mono">LLM Air-Gapped Mode</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
              m.role === 'user'
                ? 'bg-sky-600 text-white ml-auto'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <p className="whitespace-pre-wrap">{m.text}</p>
          </div>
        ))}
      </div>

      {/* Suggested Prompts */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 overflow-x-auto flex gap-2">
        {SUGGESTED_AI_PROMPTS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSend(p.prompt)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-500/10 hover:text-sky-500 text-[11px] font-semibold whitespace-nowrap transition border border-slate-200 dark:border-slate-700"
          >
            ⚡ {p.title}
          </button>
        ))}
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask AI to draft speeches, circulars, or analyze data..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-sky-500 text-xs text-slate-900 dark:text-white outline-none"
        />
        <button onClick={() => handleSend()} className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
