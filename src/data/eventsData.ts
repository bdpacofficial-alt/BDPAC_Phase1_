export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: 'Conference' | 'Training' | 'Seminar' | 'Campaign' | 'Emergency Program' | 'Meeting';
  locationType: 'Online' | 'Offline' | 'Hybrid';
  venue: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  organizer: string;
  speaker: string;
  banner: string;
  maxParticipants: number;
  registeredCount: number;
  isRegistered: boolean;
  qrCode: string;
}

export const DUMMY_EVENTS: EventItem[] = [
  {
    id: 'EVT-2026-101',
    title: 'National Grassroots Leadership & Digital Democracy Summit 2026',
    description: 'Annual gathering of all Central, Division, and District executive committee leaders.',
    category: 'Conference',
    locationType: 'Hybrid',
    venue: 'Central Auditorium, Dhaka / PPN Live Room 1',
    startDate: '2026-08-20',
    endDate: '2026-08-21',
    startTime: '09:00 AM',
    endTime: '17:00 PM',
    organizer: 'Central Steering Secretariat',
    speaker: 'Abdur Rahman (Central President)',
    banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    maxParticipants: 5000,
    registeredCount: 3420,
    isRegistered: true,
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EVT-2026-101'
  },
  {
    id: 'EVT-2026-102',
    title: 'Youth Wing Cyber Security & PPN Platform Training',
    description: 'Hands-on e-learning & security workshop for Ward Secretaries.',
    category: 'Training',
    locationType: 'Online',
    venue: 'PPN Virtual Classroom Alpha',
    startDate: '2026-08-15',
    endDate: '2026-08-15',
    startTime: '10:00 AM',
    endTime: '13:00 PM',
    organizer: 'IT & Cyber Directorate',
    speaker: 'Eng. Tanvir Hasan',
    banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    maxParticipants: 1200,
    registeredCount: 980,
    isRegistered: false,
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EVT-2026-102'
  }
];
