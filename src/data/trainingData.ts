export interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  studentsEnrolled: number;
  progressPercent: number;
  thumbnail: string;
  lessons: { id: string; title: string; duration: string; completed: boolean }[];
  quiz: {
    question: string;
    options: string[];
    answerIndex: number;
  }[];
}

export const DUMMY_COURSES: Course[] = [
  {
    id: 'CRS-101',
    title: 'Grassroots Political Governance & Party Constitution Mastery',
    category: 'Political Training',
    instructor: 'Dr. Kamal Hossain',
    duration: '4.5 Hours',
    difficulty: 'Beginner',
    rating: 4.9,
    studentsEnrolled: 12400,
    progressPercent: 75,
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=80',
    lessons: [
      { id: 'l1', title: 'Lesson 1: PPN Hierarchy & Ward Structure', duration: '20 mins', completed: true },
      { id: 'l2', title: 'Lesson 2: Election & Voting Rules in Constitution', duration: '35 mins', completed: true },
      { id: 'l3', title: 'Lesson 3: Executive Council Responsibilities', duration: '25 mins', completed: false }
    ],
    quiz: [
      {
        question: 'How many divisions are structured in PPN Org Hierarchy?',
        options: ['6 Divisions', '8 Divisions', '10 Divisions', '64 Divisions'],
        answerIndex: 1
      }
    ]
  },
  {
    id: 'CRS-102',
    title: 'Cyber Security & Air-Gapped Communication Protocol',
    category: 'Cyber Security',
    instructor: 'PPN Cyber Security Directorate',
    duration: '3.0 Hours',
    difficulty: 'Intermediate',
    rating: 4.8,
    studentsEnrolled: 8900,
    progressPercent: 30,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=80',
    lessons: [
      { id: 'l1', title: 'Lesson 1: Trusted Device Pairing & OTP Security', duration: '15 mins', completed: true },
      { id: 'l2', title: 'Lesson 2: Encrypted Video & Voice Call Hygiene', duration: '30 mins', completed: false }
    ],
    quiz: [
      {
        question: 'Which encryption cipher protects PPN Voice/Video calls?',
        options: ['DES', 'AES-256', 'Blowfish', 'Plaintext'],
        answerIndex: 1
      }
    ]
  }
];
