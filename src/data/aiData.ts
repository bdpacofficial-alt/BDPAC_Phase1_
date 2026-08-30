export interface AiPrompt {
  id: string;
  category: string;
  title: string;
  prompt: string;
}

export const SUGGESTED_AI_PROMPTS: AiPrompt[] = [
  { id: 'p1', category: 'Notice', title: 'Create Emergency Meeting Circular', prompt: 'Draft an urgent meeting notice for all District Presidents regarding the upcoming digital voter audit.' },
  { id: 'p2', category: 'Speech', title: 'Prepare Grassroots Welcome Speech', prompt: 'Write a 3-minute motivational welcome speech for new ward members joining PPN.' },
  { id: 'p3', category: 'Analysis', title: 'Summarize Party Constitution Rules', prompt: 'Summarize Section 4 regarding election procedures of grassroots union leaders.' },
  { id: 'p4', category: 'Tasks', title: 'Generate Weekly Action Items', prompt: 'Create a 5-step action plan for ward-level voter registration campaigns.' }
];

export const KNOWLEDGE_BASE_ARTICLES = [
  { id: 'kb1', title: 'PPN Security & Encryption Standards', category: 'Security', snippet: 'PPN utilizes AES-256 end-to-end encryption for all messages, video conferences, and document storage.' },
  { id: 'kb2', title: 'Grassroots Hierarchy Structure Guide', category: 'Governance', snippet: 'Explains the 6-tier administrative flow: Central -> Division -> District -> Thana -> Union -> Ward.' }
];
