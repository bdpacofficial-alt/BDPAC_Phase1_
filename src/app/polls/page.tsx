'use client';

import React, { useState } from 'react';
import { DUMMY_POLLS, PollItem } from '@/data/pollsData';
import { Vote, BarChart2, CheckCircle2, Plus } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function PollsPage() {
  const [polls, setPolls] = useState<PollItem[]>(DUMMY_POLLS);
  const { addToast } = useToast();

  const handleVote = (pollId: string, optionId: string) => {
    setPolls(prev => prev.map(p => {
      if (p.id === pollId) {
        const updatedOpts = p.options.map(o => o.id === optionId ? { ...o, votes: o.votes + 1 } : o);
        return { ...p, options: updatedOpts, totalVotes: p.totalVotes + 1, userVotedOptionId: optionId };
      }
      return p;
    }));
    addToast({ type: 'success', title: 'Vote Submitted', message: '✔ Your vote has been recorded securely.' });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Vote className="w-6 h-6 text-sky-400" /> Enterprise Poll & Survey System
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Grassroots decision voting, meeting resolution surveys, and policy feedback polling.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {polls.map((poll) => (
          <div key={poll.id} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-4">
            <div>
              <span className="text-[10px] font-bold text-sky-500 uppercase">{poll.category} • Total Votes: {poll.totalVotes}</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{poll.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{poll.description}</p>
            </div>

            <div className="space-y-2">
              {poll.options.map((opt) => {
                const percent = Math.round((opt.votes / (poll.totalVotes || 1)) * 100);
                const isSelected = poll.userVotedOptionId === opt.id;

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleVote(poll.id, opt.id)}
                    className={`p-3 rounded-xl border transition cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'border-sky-500 bg-sky-500/10'
                        : 'border-slate-200 dark:border-slate-800 hover:border-sky-500/50'
                    }`}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-sky-500/10 pointer-events-none transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                    <div className="relative z-10 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                      <span>{opt.text} {isSelected && '✔'}</span>
                      <span className="text-sky-500 font-mono">{percent}% ({opt.votes})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
