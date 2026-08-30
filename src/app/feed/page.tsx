'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { DUMMY_POSTS, Post } from '@/data/postsData';
import { useToast } from '@/context/ToastContext';
import {
  ShieldCheck,
  Radio,
  Image as ImageIcon,
  Video,
  Megaphone,
  ThumbsUp,
  Heart,
  Award,
  Sparkles,
  MessageSquare,
  Share2,
  Bookmark,
  Pin,
  Send,
  Lock,
  Users,
  Calendar,
  FileText,
  PlusCircle,
  MoreHorizontal
} from 'lucide-react';

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(DUMMY_POSTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<'Official' | 'Images' | 'Videos' | 'Live Broadcast' | 'Announcements'>('Official');
  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [userReactions, setUserReactions] = useState<{ [postId: string]: string }>({});
  const { addToast } = useToast();

  const filteredPosts = posts.filter(post => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Official Posts') return post.visibility === 'Official';
    if (activeCategory === 'Images') return post.mediaType === 'image';
    if (activeCategory === 'Videos') return post.mediaType === 'video';
    if (activeCategory === 'Live Broadcast') return post.mediaType === 'live';
    if (activeCategory === 'Announcements') return post.isAnnouncement || post.category === 'Announcements';
    return true;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) {
      addToast({ type: 'error', title: 'পোস্ট ফাঁকা হতে পারে না', message: 'অনুগ্রহ করে পোস্টের বিবরণ লিখুন।' });
      return;
    }

    const createdPost: Post = {
      id: `post-${Date.now()}`,
      authorId: 'PPN-2026-USER',
      authorName: 'বাংলাদেশ আওয়ামী লীগ ডিজিটাল মিডিয়া সেল',
      authorPosition: 'স্মার্ট বাংলাদেশ প্রচার ইউনিট',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      time: 'এখনই',
      visibility: 'Official',
      category: newPostCategory,
      title: newPostTitle || undefined,
      content: newPostContent,
      mediaUrl: newPostCategory === 'Images' ? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80' : undefined,
      mediaType: newPostCategory === 'Videos' ? 'video' : newPostCategory === 'Live Broadcast' ? 'live' : 'image',
      liveStatus: newPostCategory === 'Live Broadcast' ? 'LIVE NOW' : undefined,
      viewersCount: newPostCategory === 'Live Broadcast' ? 1240 : undefined,
      reactions: { like: 1, love: 0, support: 0, celebrate: 0, insightful: 0, important: 0 },
      commentsCount: 0,
      sharesCount: 0,
      commentsList: []
    };

    setPosts([createdPost, ...posts]);
    setNewPostContent('');
    setNewPostTitle('');
    addToast({ type: 'success', title: 'পোস্ট প্রকাশ সফল!', message: 'আপনার পোস্টটি নেটওয়ার্ক ফিডে প্রকাশ করা হয়েছে।' });
  };

  const handleReaction = (postId: string, reactionType: keyof Post['reactions']) => {
    setPosts(prevPosts =>
      prevPosts.map(p => {
        if (p.id === postId) {
          const currentReaction = userReactions[postId];
          const newReactions = { ...p.reactions };

          if (currentReaction === reactionType) {
            newReactions[reactionType] = Math.max(0, newReactions[reactionType] - 1);
            const copyUserReacts = { ...userReactions };
            delete copyUserReacts[postId];
            setUserReactions(copyUserReacts);
          } else {
            if (currentReaction && currentReaction in newReactions) {
              const prevType = currentReaction as keyof Post['reactions'];
              newReactions[prevType] = Math.max(0, newReactions[prevType] - 1);
            }
            newReactions[reactionType] += 1;
            setUserReactions({ ...userReactions, [postId]: reactionType });
          }

          return { ...p, reactions: newReactions };
        }
        return p;
      })
    );
    addToast({ type: 'info', title: 'প্রতিক্রিয়া নথিভুক্ত হয়েছে', message: `আপনি ${reactionType} রিয়েকশন দিয়েছেন।` });
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPosts(prevPosts =>
      prevPosts.map(p => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: 'আমার প্রোফাইল',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            time: 'এখনই',
            text: text.trim()
          };
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            commentsList: [newComment, ...p.commentsList]
          };
        }
        return p;
      })
    );

    setCommentInputs({ ...commentInputs, [postId]: '' });
    addToast({ type: 'success', title: 'মন্তব্য যোগ হয়েছে', message: 'আপনার মন্তব্য সফলভাবে প্রকাশ হয়েছে।' });
  };

  const handleShare = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(p => (p.id === postId ? { ...p, sharesCount: p.sharesCount + 1 } : p))
    );
    addToast({ type: 'success', title: 'শেয়ার সফল', message: 'পোস্টের লিংক আপনার মেম্বার প্রোফাইল ও নেটওয়ার্কে শেয়ার হয়েছে।' });
  };

  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto px-2 sm:px-4">
      {/* Official Cover Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-green-900 to-slate-950 border border-emerald-500/40 shadow-2xl text-white p-6 sm:p-8">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> BDPAC - বাংলাদেশ আওয়ামী লীগ অফিসিয়াল নেটওয়ার্ক
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              বাংলাদেশ আওয়ামী লীগ ভার্চুয়াল: <span className="text-emerald-400">শেখ হাসিনার সঙ্গে</span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl font-medium leading-relaxed">
              একসাথে পথ চলা, উন্নয়নের বাংলাদেশ গড়া। দলের নেতাকর্মীদের জন্য নিবিড় ডিজিটাল কেন্দ্র — নিরাপদ, নির্ভরযোগ্য ও একান্ত দলের প্রাইভেট প্ল্যাটফর্ম।
            </p>

            <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start text-[11px] font-semibold text-emerald-200">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-900/60 border border-emerald-500/30 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> নিরাপদ ও গোপনীয়
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-900/60 border border-emerald-500/30 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-400" /> নেতাকর্মীদের একান্ত প্ল্যাটফর্ম
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-900/60 border border-emerald-500/30 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-emerald-400" /> দ্রুত যোগাযোগ ও সমন্বয়
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-900/60 border border-emerald-500/30 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> অনুষ্ঠান ও কার্যক্রম
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-900/60 border border-emerald-500/30 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-emerald-400" /> ডিজিটাল সেবা ও তথ্যভান্ডার
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 text-center space-y-2">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-900/80 border-2 border-emerald-400 p-1 flex items-center justify-center mx-auto shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&auto=format&fit=crop&q=80"
                alt="Awami League Emblem"
                className="w-full h-full rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
                ✓
              </span>
            </div>
            <p className="text-xs font-black text-emerald-300">এক দেশ • এক দল • এক লক্ষ্য</p>
            <p className="text-[11px] font-bold text-amber-300">উন্নত স্মার্ট বাংলাদেশ</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-emerald-500/20 flex flex-wrap items-center justify-between text-[11px] text-emerald-300 font-bold gap-2">
          <span>🇧🇩 জয় বাংলা | জয় বঙ্গবন্ধু</span>
          <span className="text-amber-300">শেখ হাসিনার হাতকে শক্তিমান করুন</span>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {[
          { label: 'All', name: 'সকল পোস্ট', icon: Sparkles },
          { label: 'Official Posts', name: 'Official Posts', icon: ShieldCheck },
          { label: 'Images', name: 'Images', icon: ImageIcon },
          { label: 'Videos', name: 'Videos', icon: Video },
          { label: 'Live Broadcast', name: 'Live Broadcast', icon: Radio },
          { label: 'Announcements', name: 'Announcements', icon: Megaphone }
        ].map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Post Composer */}
      <Card className="p-5 space-y-4 border-emerald-500/20 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
            AL
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              অফিসিয়াল পোস্ট তৈরি করুন <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 inline" />
            </p>
            <p className="text-[10px] text-slate-500">প্রাইভেট নেটওয়ার্কের সকল মেম্বার ও দায়িত্বপ্রাপ্ত নেতৃবৃন্দের কাছে পৌঁছাবে</p>
          </div>
        </div>

        <form onSubmit={handleCreatePost} className="space-y-3">
          <input
            type="text"
            placeholder="পোস্টের শিরোনাম (ঐচ্ছিক)..."
            value={newPostTitle}
            onChange={e => setNewPostTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-emerald-500 transition"
          />
          <textarea
            placeholder="নতুন বার্তা, সিদ্ধান্ত বা ঘোষণা লিখুন..."
            value={newPostContent}
            onChange={e => setNewPostContent(e.target.value)}
            rows={3}
            className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-emerald-500 transition resize-none"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <select
                value={newPostCategory}
                onChange={e => setNewPostCategory(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none"
              >
                <option value="Official">Official Post</option>
                <option value="Images">Images Post</option>
                <option value="Videos">Videos Post</option>
                <option value="Live Broadcast">Live Broadcast</option>
                <option value="Announcements">Announcement</option>
              </select>

              <button
                type="button"
                onClick={() => addToast({ type: 'info', title: 'ছবি নির্বাচন', message: 'ডেমো ছবি সংযুক্ত করা হয়েছে।' })}
                className="p-2 rounded-xl text-slate-500 hover:text-emerald-500 hover:bg-emerald-500/10 transition"
                title="Add Image"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => addToast({ type: 'info', title: 'ভিডিও স্ট্রিমিং', message: 'লাইভ ও ভিডিও সম্প্রচার লিংক যুক্ত করা হয়েছে।' })}
                className="p-2 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition"
                title="Add Video"
              >
                <Video className="w-4 h-4" />
              </button>
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> প্রকাশ করুন
            </button>
          </div>
        </form>
      </Card>

      {/* Posts Stream */}
      <div className="space-y-6">
        {filteredPosts.map(post => {
          const isCommentsOpen = openCommentPostId === post.id;
          const userReact = userReactions[post.id];

          return (
            <Card key={post.id} className="p-6 space-y-4 border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 transition shadow-xl relative overflow-hidden">
              {post.isPinned && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                  <Pin className="w-3 h-3" /> পিন করা অফিসিয়াল বার্তা
                </div>
              )}

              {/* Author Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-11 h-11 rounded-2xl object-cover border-2 border-emerald-500/40 shadow"
                  />
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      {post.authorName}
                      {post.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-500 inline" />}
                    </h3>
                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">{post.authorPosition}</p>
                    <p className="text-[10px] text-slate-400">{post.time} • {post.visibility} Network</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {post.liveStatus === 'LIVE NOW' && (
                    <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-black animate-pulse flex items-center gap-1">
                      <Radio className="w-3 h-3" /> LIVE NOW ({post.viewersCount} Viewers)
                    </span>
                  )}
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title & Body */}
              {post.title && (
                <h2 className="text-base font-black text-slate-900 dark:text-white leading-snug">
                  {post.title}
                </h2>
              )}

              <p className="text-xs text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed font-medium">
                {post.content}
              </p>

              {/* Media Player / Banner Image */}
              {post.mediaUrl && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 group">
                  <img
                    src={post.mediaUrl}
                    alt="Post Media"
                    className="w-full max-h-[450px] object-cover group-hover:scale-102 transition duration-500"
                  />

                  {post.mediaType === 'live' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-emerald-400">সরাসরি সম্প্রচারিত হচ্ছে</p>
                          <p className="text-sm font-black">শেখ হাসিনার ভার্চুয়াল অধিবেশন</p>
                        </div>
                        <button
                          onClick={() => addToast({ type: 'success', title: 'লাইভ রুমে যোগদান', message: 'আপনি সরাসরি সম্প্রচারে যুক্ত হয়েছেন।' })}
                          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg flex items-center gap-1.5"
                        >
                          <Radio className="w-3.5 h-3.5 animate-spin" /> ওয়াচ লাইভ
                        </button>
                      </div>
                    </div>
                  )}

                  {post.mediaType === 'video' && (
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <button
                        onClick={() => addToast({ type: 'info', title: 'ভিডিও প্লেয়ার', message: 'ভিডিও প্লে ব্যাক শুরু হয়েছে।' })}
                        className="w-14 h-14 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl transition hover:scale-110"
                      >
                        <Video className="w-6 h-6 ml-0.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Reaction Bar & Stats Summary */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-1 font-bold text-[11px]">
                  <span className="flex -space-x-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">👍</span>
                    <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">❤️</span>
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">✊</span>
                  </span>
                  <span className="ml-1.5 text-slate-700 dark:text-slate-300">
                    {(Object.values(post.reactions).reduce((a, b) => a + b, 0)).toLocaleString()} জন প্রতিক্রিয়া দিয়েছেন
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-semibold">
                  <span>{post.commentsCount} টি মন্তব্য</span>
                  <span>{post.sharesCount} টি শেয়ার</span>
                </div>
              </div>

              {/* Reaction Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 pt-1 border-t border-slate-100 dark:border-slate-800">
                {[
                  { key: 'like', label: 'লাইক', icon: ThumbsUp, color: 'text-emerald-500' },
                  { key: 'love', label: 'লাভ', icon: Heart, color: 'text-red-500' },
                  { key: 'support', label: 'সমর্থন', icon: ShieldCheck, color: 'text-amber-500' },
                  { key: 'celebrate', label: 'অভিনন্দন', icon: Award, color: 'text-purple-500' },
                  { key: 'insightful', label: 'ইনসাইট', icon: Sparkles, color: 'text-sky-500' },
                  { key: 'important', label: 'গুরুত্বপূর্ণ', icon: Pin, color: 'text-emerald-600' }
                ].map(r => {
                  const Icon = r.icon;
                  const isReacted = userReact === r.key;
                  return (
                    <button
                      key={r.key}
                      onClick={() => handleReaction(post.id, r.key as any)}
                      className={`flex items-center justify-center gap-1 py-2 rounded-xl text-[11px] font-bold transition ${
                        isReacted
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isReacted ? r.color : ''}`} />
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons: Comment & Share */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setOpenCommentPostId(isCommentsOpen ? null : post.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-500" /> মন্তব্য করুন ({post.commentsCount})
                </button>

                <button
                  onClick={() => handleShare(post.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Share2 className="w-4 h-4 text-sky-500" /> শেয়ার করুন ({post.sharesCount})
                </button>

                <button
                  onClick={() => addToast({ type: 'info', title: 'বুকমার্ক', message: 'পোস্টটি আপনার সংরক্ষিত তালিকায় যুক্ত হয়েছে।' })}
                  className="p-2 rounded-xl text-slate-400 hover:text-emerald-500 transition"
                  title="Save Post"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Comment Drawer / Section */}
              {isCommentsOpen && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-2xl">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> সকল মন্তব্য ({post.commentsList.length})
                  </h4>

                  {/* Add Comment Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="আপনার মন্তব্য লিখুন..."
                      value={commentInputs[post.id] || ''}
                      onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyDown={e => e.key === 'Enter' && handleAddComment(post.id)}
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-emerald-500"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" /> মন্তব্য
                    </button>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {post.commentsList.map(c => (
                      <div key={c.id} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{c.author}</span>
                          <span className="text-[10px] text-slate-400">{c.time}</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
