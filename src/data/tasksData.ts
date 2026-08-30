export interface TaskItem {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'Assigned' | 'In Progress' | 'On Hold' | 'Waiting Review' | 'Completed' | 'Cancelled';
  category: string;
  division: string;
  district: string;
  thana: string;
  assigneeName: string;
  assigneePhoto: string;
  assignedBy: string;
  dueDate: string;
  completionPercent: number;
  checklist: { id: string; text: string; done: boolean }[];
  comments: { id: string; author: string; avatar: string; text: string; time: string }[];
  attachments: { name: string; size: string; type: string }[];
}

export const DUMMY_TASKS: TaskItem[] = [
  {
    id: 'TSK-2026-001',
    title: 'Conduct Grassroots Digital Membership Audit in Kolatia Union',
    description: 'Verify 100% of ward member registrations against NID and Face biometrics before deadline.',
    priority: 'Critical',
    status: 'In Progress',
    category: 'Organization Audit',
    division: 'Dhaka Division',
    district: 'Dhaka District',
    thana: 'Keraniganj',
    assigneeName: 'Abdur Rahman',
    assigneePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    assignedBy: 'Central Steering Secretariat',
    dueDate: '2026-08-15',
    completionPercent: 65,
    checklist: [
      { id: 'c1', text: 'Verify Ward 01 & 02 Registrations', done: true },
      { id: 'c2', text: 'Inspect Face Biometric Confidence Scores', done: true },
      { id: 'c3', text: 'Submit final summary to Division Organizer', done: false }
    ],
    comments: [
      { id: 'cm1', author: 'Saiful Islam', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', text: 'Ward 01 report is 100% complete.', time: '2 hours ago' }
    ],
    attachments: [
      { name: 'Ward_01_Verification_Report.pdf', size: '1.8 MB', type: 'PDF' }
    ]
  },
  {
    id: 'TSK-2026-002',
    title: 'Draft Central Executive Committee Circular for Youth Wing',
    description: 'Prepare official policy document for the upcoming digital training workshop.',
    priority: 'High',
    status: 'Waiting Review',
    category: 'Policy Drafting',
    division: 'Dhaka Division',
    district: 'Dhaka District',
    thana: 'Central',
    assigneeName: 'Md Hasan Mahmud',
    assigneePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    assignedBy: 'Central President',
    dueDate: '2026-08-12',
    completionPercent: 90,
    checklist: [
      { id: 'c1', text: 'Draft Initial Section', done: true },
      { id: 'c2', text: 'Legal Review', done: true }
    ],
    comments: [],
    attachments: []
  }
];
