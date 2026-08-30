export interface Comment {
  id: string;
  author: string;
  avatar: string;
  time: string;
  text: string;
  likes?: number;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorPosition: string;
  authorAvatar: string;
  isVerified: boolean;
  time: string;
  visibility: "Official" | "Division" | "District" | "Thana" | "Public";
  content: string;
  title?: string;
  mediaUrl?: string;
  coverUrl?: string;
  mediaType?: "image" | "video" | "live" | "document";
  liveStatus?: "LIVE NOW" | "UPCOMING" | "ENDED";
  viewersCount?: number;
  isPinned?: boolean;
  isAnnouncement?: boolean;
  category: "Official" | "Images" | "Videos" | "Live Broadcast" | "Announcements";
  pollOptions?: { text: string; votes: number }[];
  reactions: {
    like: number;
    love: number;
    support: number;
    celebrate: number;
    insightful: number;
    important: number;
  };
  commentsCount: number;
  sharesCount: number;
  commentsList: Comment[];
}

export const DUMMY_POSTS: Post[] = [
  {
    id: "post-101",
    authorId: "PPN-2026-1000",
    authorName: "বাংলাদেশ আওয়ামী লীগ (কেন্দ্রীয় কার্যালয়)",
    authorPosition: "অফিসিয়াল বার্তা ও প্রচার সেল",
    authorAvatar: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    time: "১০ মিনিট আগে",
    visibility: "Official",
    category: "Announcements",
    title: "বাংলার মানুষের আশা, গণতন্ত্রের প্রহরী — দেশরত্ন শেখ হাসিনা দেশে আসছেন!",
    content: "🚨 বিশেষ জরুরি ঘোষণা: দেশরত্ন শেখ হাসিনা দেশে আসছেন! আগস্ট থেকে ডিসেম্বরের মধ্যে যেকোনো সময় ঘোষণা আসতে পারে। তাই প্রতিটি নেতা-কর্মীকে রেডি থাকার আহ্বান জানানো হচ্ছে।\n\n"আমি আমার দেশের মানুষের কাছে ফিরব, ইনশাআল্লাহ আবারও আমরা একসাথে কাজ করব।" — শেখ হাসিনা\n\n📌 নির্দেশনাবলী:\n১. মনোবল দৃঢ় রাখুন\n২. সংগঠনকে আরও শক্তিশালী করুন\n৩. ঐক্যবদ্ধ থাকুন\n৪. দলের জন্য সবসময় প্রস্তুত থাকুন\n\nএকটাই লক্ষ্য, একটাই প্রতিজ্ঞা — শেখ হাসিনার হাতকে আবার শক্তিশালী করা!",
    mediaUrl: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=1200&auto=format&fit=crop&q=80",
    mediaType: "image",
    isPinned: true,
    isAnnouncement: true,
    reactions: { like: 15420, love: 9840, support: 12100, celebrate: 4320, insightful: 2150, important: 11200 },
    commentsCount: 3840,
    sharesCount: 2950,
    commentsList: [
      { id: "c1", author: "Md Hasan Mahmud", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", time: "৮ মিনিট আগে", text: "জয় বাংলা, জয় বঙ্গবন্ধু! শেখ হাসিনার আগমনকে সফল করতে ঢাকা বিভাগ সম্পূর্ণ প্রস্তুত।" },
      { id: "c2", author: "Sultana Razia", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", time: "৫ মিনিট আগে", text: "ইনশাআল্লাহ রাজপথে আমরা ঐক্যবদ্ধ থাকব। দেশরত্ন শেখ হাসিনার জয় হোক!" }
    ]
  },
  {
    id: "post-102",
    authorId: "PPN-2026-1001",
    authorName: "বাংলাদেশ আওয়ামী লীগ ডিজিটাল মিডিয়া টিম",
    authorPosition: "স্মার্ট বাংলাদেশ আইসিটি সেল",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    time: "১ ঘন্টা আগে",
    visibility: "Official",
    category: "Live Broadcast",
    title: "বাংলাদেশ আওয়ামী লীগ ভার্চুয়াল: শেখ হাসিনার সঙ্গে",
    content: "🌐 ভার্চুয়াল নিবিড় ডিজিটাল কেন্দ্র:\nএকসাথে পথ চলা, উন্নয়নের বাংলাদেশ গড়া। দলের নেতাকর্মীদের জন্য নিবিড় ডিজিটাল কেন্দ্র — শেখ হাসিনার অংশগ্রহণ প্রত্যাশিত। নিরাপদ, নির্ভরযোগ্য ও একান্ত দলের প্ল্যাটফর্ম。\n\nমূল সুবিধাসমূহ:\n🔒 নিরাপদ ও গোপনীয়\n👥 নেতাকর্মীদের একান্ত প্ল্যাটফর্ম\n💬 দ্রুত যোগাযোগ ও সমন্বয়\n📅 অনুষ্ঠান ও কার্যক্রম\n📑 ডিজিটাল সেবা ও তথ্যভান্ডার\n\nএক দেশ | এক দল | এক লক্ষ্য | উন্নত স্মার্ট বাংলাদেশ।\nজয় বাংলা | জয় বঙ্গবন্ধু",
    mediaUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
    mediaType: "live",
    liveStatus: "LIVE NOW",
    viewersCount: 18450,
    isPinned: true,
    isAnnouncement: false,
    reactions: { like: 24500, love: 18200, support: 15400, celebrate: 8900, insightful: 3400, important: 14200 },
    commentsCount: 5120,
    sharesCount: 4100,
    commentsList: [
      { id: "c3", author: "Abdur Rahman", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", time: "৩০ মিনিট আগে", text: "নিরাপদ ও ডিজিটাল প্ল্যাটফর্মে আমরা তৃণমূলের সকল সহযোদ্ধারা যুক্ত আছি।" }
    ]
  },
  {
    id: "post-103",
    authorId: "PPN-2026-1005",
    authorName: "আওয়ামী লীগ আইটি ও সমন্বয় উইং",
    authorPosition: "তৃণমূল ডিজিটাল নেটওয়ার্ক",
    authorAvatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    time: "৩ ঘন্টা আগে",
    visibility: "Official",
    category: "Images",
    title: "তৃণমূল কর্মী নিবন্ধন ও ডিজিটাল পরিচিতিপত্র প্রদান কার্যক্রম",
    content: "📸 ৮টি বিভাগ, ৬৪টি জেলা এবং ৪৯৫টি থানার সকল নিবন্ধিত কর্মীদের জন্য প্রাইভেট নেটওয়ার্কের মাধ্যমে স্মার্ট ডিজিটাল মেম্বার কার্ড ও কিউআর কোড ভেরিফিকেশন সফলভাবে চালু করা হয়েছে।",
    mediaUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
    mediaType: "image",
    isPinned: false,
    isAnnouncement: false,
    reactions: { like: 8420, love: 3100, support: 6200, celebrate: 1900, insightful: 1200, important: 4100 },
    commentsCount: 920,
    sharesCount: 650,
    commentsList: []
  },
  {
    id: "post-104",
    authorId: "PPN-2026-1008",
    authorName: "বাংলাদেশ আওয়ামী লীগ সেন্ট্রাল মিডিয়া হাব",
    authorPosition: "সম্প্রচার ও ভিডিও সেল",
    authorAvatar: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    time: "৫ ঘন্টা আগে",
    visibility: "Public",
    category: "Videos",
    title: "স্মার্ট বাংলাদেশের দিকে অগ্রযাত্রা: ভার্চুয়াল সম্মেলনের হাইলাইটস",
    content: "🎥 কেন্দ্রীয় কার্যালয় থেকে সরাসরি সম্প্রচারিত ভার্চুয়াল মতবিনিময় সেশনের ভিডিও ক্লিপ। দেখুন এবং আপনার জেলা কমিটির সাথে শেয়ার করুন।",
    mediaUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&auto=format&fit=crop&q=80",
    mediaType: "video",
    isPinned: false,
    isAnnouncement: false,
    reactions: { like: 11200, love: 5400, support: 7800, celebrate: 3200, insightful: 1800, important: 6200 },
    commentsCount: 1240,
    sharesCount: 1890,
    commentsList: []
  }
];
