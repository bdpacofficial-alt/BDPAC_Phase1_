export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  time: string;
  type: 'text' | 'image' | 'file' | 'voice' | 'system' | 'location';
  content: string;
  mediaUrl?: string;
  fileMeta?: { name: string; size: string; ext: string };
  isSeen?: boolean;
  reactions?: Record<string, number>;
}

export interface Conversation {
  id: string;
  type: 'direct' | 'group' | 'broadcast';
  title: string;
  avatar: string;
  position?: string;
  isOnline?: boolean;
  isVerified?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
  isFavorite?: boolean;
  unreadCount: number;
  lastMessage: string;
  lastTime: string;
  membersCount?: number;
  messages: ChatMessage[];
}

export const DUMMY_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    type: 'direct',
    title: 'Abdur Rahman',
    position: 'Central President',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    isVerified: true,
    isPinned: true,
    unreadCount: 2,
    lastMessage: 'Please review the draft for tomorrow's central committee meeting.',
    lastTime: '10:45 AM',
    messages: [
      { id: 'm1', senderId: 'PPN-2026-1000', senderName: 'Abdur Rahman', senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', time: '10:30 AM', type: 'text', content: 'Assalamu Alaikum. Did you receive the latest ward report from Keraniganj?', isSeen: true },
      { id: 'm2', senderId: 'me', senderName: 'You', senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', time: '10:32 AM', type: 'text', content: 'Walaikum Assalam. Yes, sir. I have verified all 5 ward entries.', isSeen: true },
      { id: 'm3', senderId: 'PPN-2026-1000', senderName: 'Abdur Rahman', senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', time: '10:45 AM', type: 'text', content: 'Please review the draft for tomorrow's central committee meeting.', isSeen: false }
    ]
  },
  {
    id: 'conv-2',
    type: 'group',
    title: 'Dhaka Division Executive Steering',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    unreadCount: 5,
    lastMessage: 'Saiful: Attached the meeting minutes from Savar unit.',
    lastTime: '09:15 AM',
    membersCount: 42,
    messages: [
      { id: 'gm1', senderId: 'PPN-2026-1002', senderName: 'Saiful Islam', senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', time: '09:15 AM', type: 'file', content: 'Savar_Meeting_Minutes.pdf', fileMeta: { name: 'Savar_Meeting_Minutes.pdf', size: '2.4 MB', ext: 'PDF' } }
    ]
  }
];
