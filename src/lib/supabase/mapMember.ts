import { Member } from '@/data/membersData';
import { ProfileRow, MemberDirectoryViewRow } from './types';

export function mapProfileToMember(profile: Partial<ProfileRow | MemberDirectoryViewRow>): Member {
  const memberId = profile.member_id || profile.id || 'BDPAC-PENDING';
  const fullName = profile.full_name_en || profile.full_name_bn || 'Member';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(memberId)}`;
  
  // Extract location display names if view or row is passed
  const view = profile as Partial<MemberDirectoryViewRow>;
  const divisionName = view.division_name_en || profile.division_id || 'Dhaka Division';
  const districtName = view.district_name_en || profile.district_id || 'Dhaka District';
  const upazilaName = view.upazila_name_en || profile.upazila_id || 'Keraniganj';
  const unionName = view.union_name_en || profile.union_id || 'Kolatia Union';
  const wardName = view.ward_number ? `Ward ${view.ward_number}` : (profile.ward_id || 'Ward 01');

  return {
    id: memberId,
    name: fullName,
    fatherName: profile.father_name || 'N/A',
    motherName: profile.mother_name || 'N/A',
    dob: profile.date_of_birth || '1990-01-01',
    gender: (profile.gender as any) || 'Male',
    bloodGroup: (profile.blood_group as any) || 'O+',
    mobile: profile.phone || '',
    email: profile.email || '',
    address: profile.address || `${wardName}, ${unionName}, ${upazilaName}, ${districtName}`,
    nid: profile.nid_number || 'Pending NID Verification',
    nidVerified: Boolean(profile.nid_verified),
    faceMatched: Boolean(profile.face_verified),
    partyPosition: profile.party_designation || 'General Member',
    partyLevel: (profile.primary_role === 'super_admin' || profile.primary_role === 'national_admin') 
      ? 'Central' 
      : profile.primary_role === 'division_admin' 
        ? 'Division' 
        : profile.primary_role === 'district_admin' 
          ? 'District' 
          : 'Thana',
    division: divisionName,
    district: districtName,
    thana: upazilaName,
    union: unionName,
    ward: wardName,
    photo: profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    qrCode: qrUrl,
    isOnline: false,
    isVerified: Boolean(profile.is_verified || profile.status === 'approved'),
    joinedDate: profile.joined_date || new Date().toISOString().split('T')[0],
    emergencyContact: profile.emergency_contact_phone || 'N/A',
    committee: (profile as any).org_name_en || 'BDPAC Committee',
    bio: profile.bio || 'Dedicated political and community worker for grassroots democracy and human rights.',
    recentActivities: [
      { id: 'act-1', type: 'registration', title: 'Registered on BDPAC Platform', time: profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Recent' }
    ]
  };
}
