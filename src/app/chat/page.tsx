'use client';

import React, { useState } from 'react';
import { DUMMY_CONVERSATIONS, Conversation } from '@/data/chatData';
import { MessageSquare, Phone, Video, Send, Paperclip, Smile, Mic, ShieldCheck } from 'lucide-react';
import { useCall } from '@/context/CallContext';

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(DUMMY_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>('conv-1');
  const [inputMessage, setInputMessage] = useState('');
  const { startCall } = useCall();

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    const newMsg = {
      id: Math.random().toString(36).substring(2, 9),
      senderId: 'me',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text' as const,
      content: inputMessage,
      isSeen: true
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              lastMessage: inputMessage,
              lastTime: 'Just now',
              messages: [...c.messages, newMsg]
            }
          : c
      )
    );
    setInputMessage('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl flex overflow-hidden">
      {/* Left Chat List */}
      <div className="w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-950/50">
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-500" /> Enterprise Messenger
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveConvId(c.id)}
              className={`p-3 rounded-xl cursor-pointer transition flex items-center gap-3 ${
                c.id === activeConvId
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
              }`}
            >
              <img src={c.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold truncate">{c.title}</h4>
                  <span className="text-[10px] opacity-70">{c.lastTime}</span>
                </div>
                <p className="text-[11px] opacity-80 truncate mt-0.5">{c.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col bg-slate-100/30 dark:bg-slate-900/30">
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <img src={activeConv.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                {activeConv.title} <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </h3>
              <p className="text-[10px] text-sky-500 font-semibold">{activeConv.position || 'Active Private Chat'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => startCall(activeConv.title, activeConv.avatar, activeConv.position || 'Member', 'voice')}
              className="p-2 rounded-xl border hover:bg-sky-500 hover:text-white transition"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => startCall(activeConv.title, activeConv.avatar, activeConv.position || 'Member', 'video')}
              className="p-2 rounded-xl border hover:bg-sky-500 hover:text-white transition"
            >
              <Video className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeConv.messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-end gap-2.5 max-w-[80%] ${m.senderId === 'me' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <img src={m.senderAvatar} alt="" className="w-7 h-7 rounded-lg object-cover" />
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  m.senderId === 'me'
                    ? 'bg-sky-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
                }`}
              >
                <p>{m.content}</p>
                <span className="text-[9px] opacity-70 block text-right mt-1">{m.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"><Paperclip className="w-4 h-4" /></button>
          <input
            type="text"
            placeholder="Type encrypted message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-sky-500 text-xs text-slate-900 dark:text-white outline-none"
          />
          <button onClick={handleSend} className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
