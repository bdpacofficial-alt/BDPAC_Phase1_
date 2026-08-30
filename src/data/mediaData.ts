export interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'document';
  size: string;
  category: string;
  uploadedBy: string;
  uploadDate: string;
  url: string;
}

export const DUMMY_MEDIA: MediaAsset[] = [
  { id: 'MED-101', name: 'National_Summit_2026_Banner.png', type: 'image', size: '3.4 MB', category: 'Banners', uploadedBy: 'Abdur Rahman', uploadDate: '2026-08-01', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80' },
  { id: 'MED-102', name: 'Central_Committee_Address.mp4', type: 'video', size: '124 MB', category: 'Meeting Recordings', uploadedBy: 'Saiful Islam', uploadDate: '2026-08-04', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80' },
  { id: 'MED-103', name: 'Grassroots_Directive_V2.pdf', type: 'document', size: '2.1 MB', category: 'Circulars', uploadedBy: 'Central Secretariat', uploadDate: '2026-08-05', url: '#' }
];
