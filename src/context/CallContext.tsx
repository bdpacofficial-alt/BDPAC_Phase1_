'use client';

import React, { createContext, useContext, useState } from 'react';

export interface ActiveCall {
  id: string;
  callerName: string;
  callerPhoto: string;
  callerPosition: string;
  type: 'voice' | 'video';
  status: 'ringing' | 'connected' | 'ended';
  isMuted: boolean;
  isCameraOn: boolean;
  isScreenSharing: boolean;
  isMiniView: boolean;
  durationSeconds: number;
}

interface CallContextType {
  activeCall: ActiveCall | null;
  startCall: (name: string, photo: string, position: string, type: 'voice' | 'video') => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleCamera: () => void;
  toggleScreenShare: () => void;
  toggleMiniView: () => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export function CallProvider({ children }: { children: React.ReactNode }) {
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);

  const startCall = (name: string, photo: string, position: string, type: 'voice' | 'video') => {
    setActiveCall({
      id: Math.random().toString(36).substring(2, 9),
      callerName: name,
      callerPhoto: photo,
      callerPosition: position,
      type,
      status: 'connected',
      isMuted: false,
      isCameraOn: type === 'video',
      isScreenSharing: false,
      isMiniView: false,
      durationSeconds: 0
    });
  };

  const endCall = () => {
    setActiveCall(null);
  };

  const toggleMute = () => {
    if (activeCall) setActiveCall({ ...activeCall, isMuted: !activeCall.isMuted });
  };

  const toggleCamera = () => {
    if (activeCall) setActiveCall({ ...activeCall, isCameraOn: !activeCall.isCameraOn });
  };

  const toggleScreenShare = () => {
    if (activeCall) setActiveCall({ ...activeCall, isScreenSharing: !activeCall.isScreenSharing });
  };

  const toggleMiniView = () => {
    if (activeCall) setActiveCall({ ...activeCall, isMiniView: !activeCall.isMiniView });
  };

  return (
    <CallContext.Provider value={{
      activeCall,
      startCall,
      endCall,
      toggleMute,
      toggleCamera,
      toggleScreenShare,
      toggleMiniView
    }}>
      {children}
    </CallContext.Provider>
  );
}

export function useCall() {
  const context = useContext(CallContext);
  if (!context) throw new Error('useCall must be used within CallProvider');
  return context;
}
