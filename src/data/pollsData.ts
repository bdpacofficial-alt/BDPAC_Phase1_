export interface PollItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'Active' | 'Closed' | 'Draft';
  endDate: string;
  totalVotes: number;
  options: { id: string; text: string; votes: number }[];
  userVotedOptionId?: string;
}

export const DUMMY_POLLS: PollItem[] = [
  {
    id: 'POL-2026-01',
    title: 'Preferred Date for Annual Central Leadership Conference 2026',
    description: 'Cast your vote regarding the venue and timing for the upcoming conference.',
    category: 'Meeting Decision',
    status: 'Active',
    endDate: '2026-08-14',
    totalVotes: 8420,
    options: [
      { id: 'o1', text: 'August 20 (Dhaka Central Auditorium)', votes: 4210 },
      { id: 'o2', text: 'August 25 (Chattogram Convention Hall)', votes: 2890 },
      { id: 'o3', text: 'September 01 (Virtual Live Room)', votes: 1320 }
    ],
    userVotedOptionId: 'o1'
  },
  {
    id: 'POL-2026-02',
    title: 'Priority Focus for Grassroots Ward Development Drive',
    description: 'Select the primary initiative for Ward Level Committees in Q3 2026.',
    category: 'Organization Survey',
    status: 'Active',
    endDate: '2026-08-18',
    totalVotes: 12500,
    options: [
      { id: 'o1', text: 'Digital Membership Verification (NID/Face)', votes: 7800 },
      { id: 'o2', text: 'Youth Leadership & Cyber Security Seminars', votes: 3100 },
      { id: 'o3', text: 'Local Community Relief & Volunteer Work', votes: 1600 }
    ]
  }
];
