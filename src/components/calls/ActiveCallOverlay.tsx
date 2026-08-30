'use client';

import React, { useState, useEffect } from 'react';
import { useCall } from '@/context/CallContext';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Monitor, Shield, Maximize2, Minimize2 } from 'lucide-react';

export function ActiveCallOverlay() {
  const { activeCall, endCall, toggleMute, toggleCamera, toggleScreenShare, toggleMiniView } = useCall();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (activeCall && activeCall.status === 'connected') {
      const timer = setInterval(() => setSeconds(s => s + 1), 1000);
      return () => clearInterval(timer);
    } else {
      setSeconds(0);
    }
  }, [activeCall]);

  if (!activeCall) return null;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  if (activeCall.isMiniView) {
    return (
      <div className="fixed bottom-6 left-6 z-50 p-3 rounded-2xl bg-slate-900/90 text-white border border-sky-500/40 backdrop-blur-xl shadow-2xl flex items-center gap-3 animate-slideUp">
        <img src={activeCall.callerPhoto} alt="" className="w-10 h-10 rounded-xl object-cover border border-sky-400" />
        <div>
          <p className="text-xs font-bold">{activeCall.callerName}</p>
          <p className="text-[10px] text-emerald-400 font-mono">{formatTime(seconds)}</p>
        </div>
        <button onClick={toggleMiniView} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700">
          <Maximize2 className="w-4 h-4" />
        </button>
        <button onClick={endCall} className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500">
          <PhoneOff className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-between p-6 animate-fadeIn text-white">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-sky-400" />
          <span className="text-xs font-bold uppercase text-slate-300">PPN Encrypted Call • 256-Bit</span>
        </div>
        <button onClick={toggleMiniView} className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300">
          <Minimize2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center my-auto text-center">
        {activeCall.type === 'video' && activeCall.isCameraOn ? (
          <div className="relative w-72 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden border-2 border-sky-500/50 shadow-2xl bg-slate-900">
            <img
              src={activeCall.callerPhoto}
              alt={activeCall.callerName}
              className="w-full h-full object-cover"
            />
            {activeCall.isScreenSharing && (
              <div className="absolute inset-0 bg-sky-950/80 backdrop-blur-xs flex items-center justify-center p-4">
                <p className="text-xs font-bold text-sky-300">🖥 Screen Sharing Demo Active...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-sky-500/40 p-1 animate-pulse">
              <img src={activeCall.callerPhoto} alt="" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mt-4">{activeCall.callerName}</h2>
        <p className="text-xs text-sky-400 font-semibold mt-1">{activeCall.callerPosition}</p>
        <p className="text-sm font-mono text-emerald-400 mt-2">{formatTime(seconds)}</p>
      </div>

      <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-3xl backdrop-blur-xl shadow-2xl">
        <button
          onClick={toggleMute}
          className={`p-4 rounded-2xl transition ${activeCall.isMuted ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}`}
        >
          {activeCall.isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        {activeCall.type === 'video' && (
          <button
            onClick={toggleCamera}
            className={`p-4 rounded-2xl transition ${!activeCall.isCameraOn ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            {!activeCall.isCameraOn ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </button>
        )}

        <button
          onClick={toggleScreenShare}
          className={`p-4 rounded-2xl transition ${activeCall.isScreenSharing ? 'bg-sky-600' : 'bg-slate-800 hover:bg-slate-700'}`}
        >
          <Monitor className="w-6 h-6" />
        </button>

        <button
          onClick={endCall}
          className="p-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white transition shadow-lg shadow-red-600/40"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
