export interface OrgCommittee {
  id: string;
  name: string;
  level: 'Central' | 'Division' | 'District' | 'Thana' | 'Union' | 'Ward';
  location: string;
  presidentName: string;
  secretaryName: string;
  totalMembers: number;
  status: 'Active' | 'Restructuring';
}

export const DUMMY_COMMITTEES: OrgCommittee[] = [
  { id: 'CMT-01', name: 'Central Executive Steering Committee', level: 'Central', location: 'Dhaka HQ', presidentName: 'Abdur Rahman', secretaryName: 'Md Hasan Mahmud', totalMembers: 45, status: 'Active' },
  { id: 'CMT-02', name: 'Dhaka Division Steering Committee', level: 'Division', location: 'Dhaka Division', presidentName: 'Saiful Islam', secretaryName: 'Kazi Nazrul Ahmed', totalMembers: 32, status: 'Active' },
  { id: 'CMT-03', name: 'Keraniganj Thana Executive Council', level: 'Thana', location: 'Keraniganj', presidentName: 'Tariqul Islam', secretaryName: 'Monirul Haque', totalMembers: 24, status: 'Active' },
  { id: 'CMT-04', name: 'Kolatia Union Executive Committee', level: 'Union', location: 'Kolatia Union', presidentName: 'Shakil Ahmed', secretaryName: 'Abdur Rahman', totalMembers: 18, status: 'Active' }
];
