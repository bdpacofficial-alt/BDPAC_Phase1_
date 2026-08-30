export interface SecurityLog {
  id: string;
  event: string;
  member: string;
  ip: string;
  location: string;
  device: string;
  time: string;
  severity: 'Low' | 'Medium' | 'Critical';
  status: 'Successful' | 'Blocked' | 'Under Investigation';
}

export const DUMMY_SECURITY_LOGS: SecurityLog[] = [
  {
    id: 'SOC-901',
    event: 'Air-Gapped Node Authentication',
    member: 'Abdur Rahman (PPN-2026-88492)',
    ip: '103.145.22.84',
    location: 'Dhaka, Bangladesh',
    device: 'Desktop-PC (Windows 11 / Chrome)',
    time: '5 mins ago',
    severity: 'Low',
    status: 'Successful'
  },
  {
    id: 'SOC-902',
    event: 'Failed Biometric Face Match Attempt',
    member: 'Unknown User Attempt',
    ip: '185.220.101.4',
    location: 'Foreign Proxy IP',
    device: 'Linux / Firefox',
    time: '42 mins ago',
    severity: 'Critical',
    status: 'Blocked'
  }
];
