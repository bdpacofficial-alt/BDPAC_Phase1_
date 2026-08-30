'use client';

import React, { useState } from 'react';
import { BANGLADESH_HIERARCHY } from '@/data/membersData';
import { ChevronRight, ChevronDown, Folder, Users, MapPin } from 'lucide-react';

interface OrgTreeProps {
  onSelectNode: (level: string, name: string) => void;
}

export function OrgTreeExplorer({ onSelectNode }: OrgTreeProps) {
  const [openDivs, setOpenDivs] = useState<Record<string, boolean>>({ "Dhaka Division": true });
  const [openDists, setOpenDists] = useState<Record<string, boolean>>({ "Dhaka District": true });
  const [openThanas, setOpenThanas] = useState<Record<string, boolean>>({ "Keraniganj": true });
  const [openUnions, setOpenUnions] = useState<Record<string, boolean>>({ "Kolatia Union": true });

  const toggleDiv = (div: string) => setOpenDivs(p => ({ ...p, [div]: !p[div] }));
  const toggleDist = (dist: string) => setOpenDists(p => ({ ...p, [dist]: !p[dist] }));
  const toggleThana = (thana: string) => setOpenThanas(p => ({ ...p, [thana]: !p[thana] }));
  const toggleUnion = (union: string) => setOpenUnions(p => ({ ...p, [union]: !p[union] }));

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 font-mono text-xs overflow-x-auto shadow-lg">
      <div className="flex items-center gap-2 text-sky-500 font-bold mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
        <MapPin className="w-4 h-4" />
        <span>BANGLADESH ORGANIZATIONAL HIERARCHY</span>
      </div>

      <div className="space-y-1">
        {Object.entries(BANGLADESH_HIERARCHY).map(([divName, districts]) => {
          const isDivOpen = !!openDivs[divName];

          return (
            <div key={divName} className="select-none">
              <div
                onClick={() => {
                  toggleDiv(divName);
                  onSelectNode('Division', divName);
                }}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-bold text-slate-800 dark:text-slate-200"
              >
                {isDivOpen ? <ChevronDown className="w-3.5 h-3.5 text-sky-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                <Folder className="w-4 h-4 text-amber-500" />
                <span>{divName}</span>
              </div>

              {isDivOpen && (
                <div className="ml-4 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-1">
                  {Object.entries(districts).map(([distName, thanas]) => {
                    const isDistOpen = !!openDists[distName];

                    return (
                      <div key={distName}>
                        <div
                          onClick={() => {
                            toggleDist(distName);
                            onSelectNode('District', distName);
                          }}
                          className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-300"
                        >
                          {isDistOpen ? <ChevronDown className="w-3.5 h-3.5 text-sky-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                          <Folder className="w-3.5 h-3.5 text-sky-500" />
                          <span>{distName}</span>
                        </div>

                        {isDistOpen && (
                          <div className="ml-4 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-1">
                            {Object.entries(thanas).map(([thanaName, unions]) => {
                              const isThanaOpen = !!openThanas[thanaName];

                              return (
                                <div key={thanaName}>
                                  <div
                                    onClick={() => {
                                      toggleThana(thanaName);
                                      onSelectNode('Thana', thanaName);
                                    }}
                                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-600 dark:text-slate-400"
                                  >
                                    {isThanaOpen ? <ChevronDown className="w-3.5 h-3.5 text-sky-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                                    <Folder className="w-3.5 h-3.5 text-emerald-500" />
                                    <span>{thanaName}</span>
                                  </div>

                                  {isThanaOpen && (
                                    <div className="ml-4 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-1">
                                      {Object.entries(unions).map(([unionName, wards]) => {
                                        const isUnionOpen = !!openUnions[unionName];

                                        return (
                                          <div key={unionName}>
                                            <div
                                              onClick={() => {
                                                toggleUnion(unionName);
                                                onSelectNode('Union', unionName);
                                              }}
                                              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-500"
                                            >
                                              {isUnionOpen ? <ChevronDown className="w-3.5 h-3.5 text-sky-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                                              <Users className="w-3.5 h-3.5 text-indigo-400" />
                                              <span>{unionName}</span>
                                            </div>

                                            {isUnionOpen && (
                                              <div className="ml-4 pl-2 border-l border-slate-200 dark:border-slate-800 space-y-0.5">
                                                {wards.map((ward) => (
                                                  <div
                                                    key={ward}
                                                    onClick={() => onSelectNode('Ward', ward)}
                                                    className="p-1 rounded hover:bg-sky-500/10 hover:text-sky-500 cursor-pointer text-[11px] text-slate-500 dark:text-slate-400"
                                                  >
                                                    • {ward}
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
