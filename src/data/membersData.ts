export interface Member {
  id: string;
  name: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  mobile: string;
  email: string;
  address: string;
  nid: string;
  nidVerified: boolean;
  faceMatched: boolean;
  partyPosition: string;
  partyLevel: 'Central' | 'Division' | 'District' | 'Thana' | 'Union' | 'Ward';
  division: string;
  district: string;
  thana: string;
  union: string;
  ward: string;
  photo: string;
  qrCode: string;
  isOnline: boolean;
  isVerified: boolean;
  joinedDate: string;
  emergencyContact: string;
  committee: string;
  bio: string;
  recentActivities: { id: string; type: string; title: string; time: string }[];
}

export const BANGLADESH_HIERARCHY: Record<string, Record<string, Record<string, Record<string, string[]>>>> = {
  "Dhaka Division": {
    "Dhaka District": {
      "Keraniganj": {
        "Kolatia Union": ["Ward 01", "Ward 02", "Ward 03", "Ward 04", "Ward 05"],
        "Hazratpur Union": ["Ward 01", "Ward 02", "Ward 03"],
        "Taranagar Union": ["Ward 01", "Ward 02", "Ward 04"]
      },
      "Savar": {
        "Savar Union": ["Ward 01", "Ward 02", "Ward 03"],
        "Dhamsona Union": ["Ward 01", "Ward 02", "Ward 03", "Ward 04"]
      },
      "Dhamrai": {
        "Kushura Union": ["Ward 01", "Ward 02"],
        "Sutarpara Union": ["Ward 01", "Ward 02", "Ward 03"]
      }
    },
    "Gazipur District": {
      "Sreepur": {
        "Maona Union": ["Ward 01", "Ward 02", "Ward 03"],
        "Kaoraid Union": ["Ward 01", "Ward 02"]
      },
      "Kaliakair": {
        "Chapai Union": ["Ward 01", "Ward 02"]
      }
    },
    "Narayanganj District": {
      "Rupganj": {
        "Kayetpara Union": ["Ward 01", "Ward 02", "Ward 03"],
        "Murapara Union": ["Ward 01", "Ward 02"]
      }
    }
  },
  "Chattogram Division": {
    "Chattogram District": {
      "Hathazari": {
        "Fatikchhari Union": ["Ward 01", "Ward 02", "Ward 03"],
        "Chittagong University Union": ["Ward 01", "Ward 02"]
      },
      "Patiya": {
        "Kusumpura Union": ["Ward 01", "Ward 02", "Ward 03"]
      }
    },
    "Cox's Bazar District": {
      "Teknaf": {
        "St. Martin Union": ["Ward 01", "Ward 02"],
        "Whykong Union": ["Ward 01", "Ward 02", "Ward 03"]
      }
    }
  },
  "Rajshahi Division": {
    "Rajshahi District": {
      "Paba": {
        "Haripur Union": ["Ward 01", "Ward 02", "Ward 03"]
      }
    }
  },
  "Khulna Division": {
    "Khulna District": {
      "Rupsha": {
        "Naihati Union": ["Ward 01", "Ward 02"]
      }
    }
  },
  "Barishal Division": {
    "Barishal District": {
      "Babuganj": {
        "Rahamatpur Union": ["Ward 01", "Ward 02"]
      }
    }
  },
  "Sylhet Division": {
    "Sylhet District": {
      "Beanibazar": {
        "Dubag Union": ["Ward 01", "Ward 02", "Ward 03"]
      }
    }
  },
  "Rangpur Division": {
    "Rangpur District": {
      "Mithapukur": {
        "Imadpur Union": ["Ward 01", "Ward 02"]
      }
    }
  },
  "Mymensingh Division": {
    "Mymensingh District": {
      "Muktagacha": {
        "Kashimpur Union": ["Ward 01", "Ward 02"]
      }
    }
  }
};

const POSITIONS = [
  "Central President", "Central Secretary", "Vice President", "Joint Secretary",
  "Division Organizer", "District President", "Thana President", "Union President",
  "Ward Secretary", "Executive Member", "Senior Advisor", "Media Coordinator",
  "Youth Wing Leader", "Student Wing Leader", "Publicity Secretary"
];

const NAMES = [
  "Abdur Rahman", "Md Hasan Mahmud", "Saiful Islam", "Kazi Nazrul Ahmed", "Tariqul Islam",
  "Fatema Begum", "Nusrat Jahan", "Dr. Kamal Hossain", "Mahfuzur Rahman", "Shakil Ahmed",
  "Ziaur Rahman", "Shirin Akhter", "Sultana Razia", "Monirul Haque", "Tanvir Hasan",
  "Anisur Rahman", "Mizanur Rahman", "Farhana Islam", "Rezaul Karim", "Sharmin Sultana"
];

export const DUMMY_MEMBERS: Member[] = Array.from({ length: 500 }).map((_, idx) => {
  const idNum = (1000 + idx).toString();
  const name = NAMES[idx % NAMES.length] + (idx > 19 ? ` (${idx + 1})` : "");
  const divisionKeys = Object.keys(BANGLADESH_HIERARCHY);
  const division = divisionKeys[idx % divisionKeys.length];
  const districtKeys = Object.keys(BANGLADESH_HIERARCHY[division] || { "Dhaka District": {} });
  const district = districtKeys[0] || "Dhaka District";
  const thanaKeys = Object.keys(BANGLADESH_HIERARCHY[division]?.[district] || { "Keraniganj": {} });
  const thana = thanaKeys[0] || "Keraniganj";
  const unionKeys = Object.keys(BANGLADESH_HIERARCHY[division]?.[district]?.[thana] || { "Kolatia Union": {} });
  const union = unionKeys[0] || "Kolatia Union";
  const wardList = BANGLADESH_HIERARCHY[division]?.[district]?.[thana]?.[union] || ["Ward 01"];
  const ward = wardList[idx % wardList.length];

  return {
    id: `PPN-2026-${idNum}`,
    name,
    fatherName: `Late ${name.split(' ')[0]} Senior`,
    motherName: `Begum ${name.split(' ')[1] || 'Sultana'}`,
    dob: '1985-06-15',
    gender: idx % 4 === 0 ? 'Female' : 'Male',
    bloodGroup: (['O+', 'A+', 'B+', 'AB+', 'O-'][idx % 5]) as any,
    mobile: `+880 17${Math.floor(10000000 + Math.random() * 90000000)}`,
    email: `member${idx + 1}@ppn-platform.gov.bd`,
    address: `${ward}, ${union}, ${thana}, ${district}`,
    nid: `1985${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    nidVerified: true,
    faceMatched: true,
    partyPosition: POSITIONS[idx % POSITIONS.length],
    partyLevel: idx < 10 ? 'Central' : idx < 30 ? 'Division' : idx < 100 ? 'District' : 'Thana',
    division,
    district,
    thana,
    union,
    ward,
    photo: `https://images.unsplash.com/photo-${1500000000000 + (idx % 50) * 10000}?w=150&auto=format&fit=crop&q=80`,
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PPN-2026-${idNum}`,
    isOnline: idx % 3 === 0,
    isVerified: true,
    joinedDate: '2024-01-15',
    emergencyContact: `+880 18${Math.floor(10000000 + Math.random() * 90000000)}`,
    committee: `${division} Steering Executive Council`,
    bio: 'Dedicated political worker and community leader striving for grassroots democracy, social equality, and economic advancement.',
    recentActivities: [
      { id: 'act-1', type: 'login', title: 'Logged into PPN Portal from Dhaka', time: '10 mins ago' },
      { id: 'act-2', type: 'meeting', title: 'Attended Central Steering Conference', time: '2 hours ago' },
      { id: 'act-3', type: 'task', title: 'Submitted Ward Member Survey Report', time: 'Yesterday' }
    ]
  };
});
