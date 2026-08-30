export interface NotificationItem {
  id: string;
  title: string;
  category: 'Announcement' | 'Emergency' | 'Meeting' | 'Task' | 'Event' | 'Training' | 'Security';
  message: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  priority: 'Normal' | 'High' | 'Urgent';
}

export const DUMMY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOT-101',
    title: 'EMERGENCY: Digital Verification Deadline Extended',
    category: 'Emergency',
    message: 'Central Secretariat extended the NID & Face verification deadline to August 15, 2026.',
    time: '10 mins ago',
    isRead: false,
    isStarred: true,
    priority: 'Urgent'
  },
  {
    id: 'NOT-102',
    title: 'Meeting Scheduled: Dhaka Strategy Sync',
    category: 'Meeting',
    message: 'Dhaka Division Organizer scheduled a strategy sync for tomorrow at 10:00 AM.',
    time: '1 hour ago',
    isRead: false,
    isStarred: false,
    priority: 'High'
  },
  {
    id: 'NOT-103',
    title: 'Task Assigned: Kolatia Ward Audit',
    category: 'Task',
    message: 'You have been assigned to lead the Keraniganj audit team.',
    time: '3 hours ago',
    isRead: true,
    isStarred: false,
    priority: 'Normal'
  }
];
