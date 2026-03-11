"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  UserPlus,
  Check,
  Flame,
  BookOpen,
  HelpCircle,
  Telescope,
} from "lucide-react";
import { CommunityPost, Researcher } from "@/lib/types";

const POSTS: CommunityPost[] = [
  {
    id: "p1",
    author: { id: "a1", name: "Dr. Sarah Chen", title: "Quantum Chemist", avatarColor: "#0891b2", initials: "SC" },
    content: "Fascinating results from our latest study on Fe²⁺/Fe³⁺ redox transitions in hemoglobin analogs. The electron transfer rates were 3× faster than predicted by Marcus theory! 🔬",
    timestamp: "2 hours ago",
    likes: 47,
    comments: 12,
    tags: ["Iron", "Redox", "Quantum"],
    type: "discovery",
  },
  {
    id: "p2",
    author: { id: "a2", name: "Marcus Weil", title: "PhD Student", avatarColor: "#7c3aed", initials: "MW" },
    content: "Quick question for the community: why does Cu⁺ disproportionate in aqueous solution to Cu² + Cu⁰, but remains stable in complexes? Is it purely a crystal field effect?",
    timestamp: "5 hours ago",
    likes: 23,
    comments: 8,
    tags: ["Copper", "Disproportionation", "Question"],
    type: "question",
  },
  {
    id: "p3",
    author: { id: "a3", name: "Prof. Elena Vasquez", title: "Inorganic Chemistry", avatarColor: "#047857", initials: "EV" },
    content: "Just published: 'Electronic State Transitions in Lanthanide Complexes Under High Pressure' in JACS. Key finding: pressure-induced spin-crossover occurs at 8 GPa for Eu³⁺ systems.",
    timestamp: "1 day ago",
    likes: 156,
    comments: 34,
    tags: ["Lanthanides", "High Pressure", "Publication"],
    type: "resource",
  },
  {
    id: "p4",
    author: { id: "a4", name: "Aiko Tanaka", title: "MS Student", avatarColor: "#b45309", initials: "AT" },
    content: "Lab update: successfully synthesized [Fe(CN)₆]³⁻ Prussian Blue analog with modified linkers. The deep blue color from Fe²⁺ → Fe³⁺ IVCT transition is mesmerizing! 💙",
    timestamp: "2 days ago",
    likes: 89,
    comments: 22,
    tags: ["Experiment", "Iron", "Prussian Blue"],
    type: "experiment",
  },
];

const RESEARCHERS: Researcher[] = [
  {
    id: "r1",
    name: "Dr. James Hoffman",
    title: "Professor of Physical Chemistry",
    institution: "MIT",
    specialization: "Electron Transfer & Ion Transport",
    avatarColor: "#0891b2",
    initials: "JH",
    publications: 127,
    connected: false,
  },
  {
    id: "r2",
    name: "Dr. Priya Nair",
    title: "Associate Professor",
    institution: "Stanford University",
    specialization: "Quantum Spectroscopy",
    avatarColor: "#7c3aed",
    initials: "PN",
    publications: 84,
    connected: false,
  },
  {
    id: "r3",
    name: "Dr. Liu Wei",
    title: "Senior Researcher",
    institution: "Caltech",
    specialization: "Computational Ion Dynamics",
    avatarColor: "#047857",
    initials: "LW",
    publications: 63,
    connected: true,
  },
  {
    id: "r4",
    name: "Dr. Anna Kowalski",
    title: "Research Scientist",
    institution: "ETH Zürich",
    specialization: "Lanthanide Electronic States",
    avatarColor: "#b45309",
    initials: "AK",
    publications: 45,
    connected: false,
  },
];

const POST_TYPE_ICONS = {
  experiment: FlaskConicalIcon,
  question: HelpCircle,
  discovery: Telescope,
  resource: BookOpen,
};

const POST_TYPE_COLORS = {
  experiment: "text-yellow-400",
  question: "text-blue-400",
  discovery: "text-cyan-400",
  resource: "text-green-400",
};

function FlaskConicalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M9 3H15M9 3V14L4 20H20L15 14V3M9 3L15 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CommunityPage() {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [connections, setConnections] = useState<Set<string>>(
    new Set(RESEARCHERS.filter((r) => r.connected).map((r) => r.id))
  );
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleConnect = (id: string) => {
    setConnections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleShare = (postId: string) => {
    setShareStatus(postId);
    setTimeout(() => setShareStatus(null), 2000);
  };

  return (
    <div className="min-h-screen px-4 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-orange-400 mb-4" style={{ textShadow: "0 0 20px rgba(251,146,60,0.3)" }}>
          Community
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Connect with researchers, share experiments, and discuss discoveries.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" aria-hidden="true" />
            Latest Discussions
          </h2>

          {POSTS.map((post, i) => {
            const TypeIcon = POST_TYPE_ICONS[post.type];
            const typeColor = POST_TYPE_COLORS[post.type];
            const isLiked = likedPosts.has(post.id);

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-gray-950 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors"
                aria-label={`Post by ${post.author.name}`}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: post.author.avatarColor }}
                    aria-hidden="true"
                  >
                    {post.author.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div>
                        <span className="font-semibold text-white text-sm">{post.author.name}</span>
                        <span className="text-gray-500 text-xs ml-2">{post.author.title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TypeIcon className={`w-4 h-4 ${typeColor}`} aria-hidden="true" />
                        <span className="text-xs text-gray-600">{post.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">{post.content}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-800 text-gray-400 rounded-full px-2 py-0.5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 text-sm transition-colors ${
                          isLiked ? "text-red-400" : "text-gray-500 hover:text-red-400"
                        }`}
                        aria-label={isLiked ? `Unlike post by ${post.author.name}` : `Like post by ${post.author.name}`}
                        aria-pressed={isLiked}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} aria-hidden="true" />
                        <span>{post.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                      <button
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors"
                        aria-label={`Comment on post by ${post.author.name}`}
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>{post.comments}</span>
                      </button>
                      <button
                        onClick={() => handleShare(post.id)}
                        className={`flex items-center gap-1.5 text-sm transition-colors ${
                          shareStatus === post.id ? "text-green-400" : "text-gray-500 hover:text-green-400"
                        }`}
                        aria-label={`Share post by ${post.author.name}`}
                      >
                        <Share2 className="w-4 h-4" aria-hidden="true" />
                        <span>{shareStatus === post.id ? "Shared!" : "Share"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Researchers */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Connect with Researchers</h2>
          {RESEARCHERS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-gray-950 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: r.avatarColor }}
                  aria-hidden="true"
                >
                  {r.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-sm">{r.name}</p>
                  <p className="text-gray-500 text-xs">{r.title}</p>
                  <p className="text-gray-600 text-xs">{r.institution}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-2">{r.specialization}</p>
              <p className="text-xs text-gray-600 mb-3">{r.publications} publications</p>
              <button
                onClick={() => toggleConnect(r.id)}
                className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all ${
                  connections.has(r.id)
                    ? "bg-green-500/10 text-green-300 border border-green-500/30"
                    : "bg-orange-500/10 text-orange-300 border border-orange-500/30 hover:bg-orange-500/20"
                }`}
                aria-label={connections.has(r.id) ? `Disconnect from ${r.name}` : `Connect with ${r.name}`}
                aria-pressed={connections.has(r.id)}
              >
                {connections.has(r.id) ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    Connected
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" aria-hidden="true" />
                    Connect
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
