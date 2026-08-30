export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  member: string;
  createdDate: string;
}

export const DUMMY_TICKETS: SupportTicket[] = [
  { id: 'TCK-801', subject: 'NID Biometric Face Match Retry Request', category: 'Registration Issue', priority: 'High', status: 'In Progress', member: 'Abdur Rahman', createdDate: '2026-08-05' },
  { id: 'TCK-802', subject: 'Encrypted Video Room Password Reset', category: 'Meeting Support', priority: 'Medium', status: 'Resolved', member: 'Saiful Islam', createdDate: '2026-08-04' }
];
