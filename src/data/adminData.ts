export interface AdminItem {
  id: string;
  name: string;
  role: 'Super Admin' | 'Central Admin' | 'Division Admin' | 'District Admin' | 'Thana Admin' | 'Union Admin' | 'Ward Admin';
  location: string;
  email: string;
  mobile: string;
  status: 'Active' | 'Suspended';
}

export const DUMMY_ADMINS: AdminItem[] = [
  { id: 'ADM-001', name: 'Abdur Rahman', role: 'Super Admin', location: 'Dhaka HQ', email: 'superadmin@ppn-platform.gov.bd', mobile: '+880 1700-000001', status: 'Active' },
  { id: 'ADM-002', name: 'Saiful Islam', role: 'Division Admin', location: 'Dhaka Division', email: 'saiful@ppn-platform.gov.bd', mobile: '+880 1700-000002', status: 'Active' },
  { id: 'ADM-003', name: 'Tariqul Islam', role: 'District Admin', location: 'Dhaka District', email: 'tariqul@ppn-platform.gov.bd', mobile: '+880 1700-000003', status: 'Active' },
  { id: 'ADM-004', name: 'Shakil Ahmed', role: 'Thana Admin', location: 'Keraniganj', email: 'shakil@ppn-platform.gov.bd', mobile: '+880 1700-000004', status: 'Active' }
];
