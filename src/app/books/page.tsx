"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Check, Clock } from "lucide-react";
import { Book, BookCategory } from "@/lib/types";

const BOOKS: Book[] = [
  {
    id: "1",
    title: "Chemistry: The Central Science",
    author: "Brown, LeMay, Bursten",
    year: 2022,
    category: "textbook",
    description: "Comprehensive introduction to general chemistry with excellent coverage of ionic compounds and electron configurations.",
    isbn: "978-0134414232",
    gradientFrom: "#1e40af",
    gradientTo: "#1d4ed8",
    tags: ["Ionic Chemistry", "Electron Config", "Periodic Table"],
  },
  {
    id: "2",
    title: "Atkins' Physical Chemistry",
    author: "Atkins & de Paula",
    year: 2023,
    category: "textbook",
    description: "Deep treatment of quantum mechanics, spectroscopy, and thermodynamics essential for understanding electronic states.",
    isbn: "978-0198847816",
    gradientFrom: "#6b21a8",
    gradientTo: "#7c3aed",
    tags: ["Quantum Mechanics", "Spectroscopy", "Thermodynamics"],
  },
  {
    id: "3",
    title: "Inorganic Chemistry",
    author: "Miessler, Fischer & Tarr",
    year: 2021,
    category: "textbook",
    description: "Comprehensive coverage of coordination chemistry, transition metals, and their ionic properties.",
    isbn: "978-0321811059",
    gradientFrom: "#065f46",
    gradientTo: "#047857",
    tags: ["Transition Metals", "Coordination", "Ionic Bonds"],
  },
  {
    id: "4",
    title: "Ionic Liquids in Chemical Analysis",
    author: "Koel (Ed.)",
    year: 2009,
    category: "research",
    description: "Research compendium on ionic liquids as solvents and their analytical applications.",
    isbn: "978-1420046588",
    gradientFrom: "#92400e",
    gradientTo: "#b45309",
    tags: ["Research", "Ionic Liquids", "Analysis"],
  },
  {
    id: "5",
    title: "The Quantum World",
    author: "Kenneth W. Ford",
    year: 2004,
    category: "reference",
    description: "Accessible introduction to quantum physics explaining electron behavior and atomic structure.",
    gradientFrom: "#1e1b4b",
    gradientTo: "#312e81",
    tags: ["Quantum Physics", "Atoms", "Accessible"],
  },
  {
    id: "6",
    title: "NIST Atomic Spectra Database",
    author: "NIST",
    year: 2023,
    category: "online",
    description: "Official NIST database of atomic spectra, energy levels, and transition data.",
    url: "https://physics.nist.gov/asd",
    gradientFrom: "#134e4a",
    gradientTo: "#0f766e",
    tags: ["Free", "Official", "Spectra", "Data"],
  },
  {
    id: "7",
    title: "PubChem Database",
    author: "NIH/NCBI",
    year: 2023,
    category: "online",
    description: "Largest collection of chemical substances with detailed ionic and molecular properties.",
    url: "https://pubchem.ncbi.nlm.nih.gov",
    gradientFrom: "#1c1917",
    gradientTo: "#44403c",
    tags: ["Free", "Database", "Compounds"],
  },
  {
    id: "8",
    title: "Electronic Structure: Basic Theory and Methods",
    author: "Martin",
    year: 2020,
    category: "research",
    description: "Advanced treatment of electronic structure calculations and density functional theory.",
    isbn: "978-0521534406",
    gradientFrom: "#881337",
    gradientTo: "#be123c",
    tags: ["DFT", "Electronic Structure", "Advanced"],
  },
  {
    id: "9",
    title: "Organic Chemistry",
    author: "Clayden, Greeves & Warren",
    year: 2012,
    category: "textbook",
    description: "Definitive organic chemistry textbook with excellent mechanistic treatment of ionic intermediates.",
    isbn: "978-0199270293",
    gradientFrom: "#14532d",
    gradientTo: "#166534",
    tags: ["Organic", "Mechanisms", "Ions"],
  },
  {
    id: "10",
    title: "Khan Academy Chemistry",
    author: "Khan Academy",
    year: 2024,
    category: "online",
    description: "Free online chemistry courses covering atomic structure, ions, and electronic configurations.",
    url: "https://www.khanacademy.org/science/chemistry",
    gradientFrom: "#1d4ed8",
    gradientTo: "#2563eb",
    tags: ["Free", "Interactive", "Video"],
  },
];

const CATEGORIES: Array<{ value: BookCategory | "all"; label: string; emoji: string }> = [
  { value: "all", label: "All", emoji: "📚" },
  { value: "textbook", label: "Textbooks", emoji: "📘" },
  { value: "research", label: "Research", emoji: "🔬" },
  { value: "online", label: "Online", emoji: "🌐" },
  { value: "reference", label: "Reference", emoji: "📖" },
];

export default function BooksPage() {
  const [filter, setFilter] = useState<BookCategory | "all">("all");
  const [readBooks, setReadBooks] = useState<Set<string>>(new Set());
  const [readingBooks, setReadingBooks] = useState<Set<string>>(new Set());

  const filtered = filter === "all" ? BOOKS : BOOKS.filter((b) => b.category === filter);

  const toggleRead = (id: string) => {
    setReadBooks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        next.add(id);
        setReadingBooks((r) => { const rn = new Set(r); rn.delete(id); return rn; });
      }
      return next;
    });
  };

  const toggleReading = (id: string) => {
    setReadingBooks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        next.add(id);
        setReadBooks((r) => { const rn = new Set(r); rn.delete(id); return rn; });
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen px-4 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-green-400 mb-4" style={{ textShadow: "0 0 20px rgba(74,222,128,0.3)" }}>
          Books & Sources
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Curated chemistry and physics resources for exploring ions and electronic states.
        </p>
      </motion.div>

      {/* Progress Summary */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-10">
        {[
          { label: "Read", count: readBooks.size, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
          { label: "Reading", count: readingBooks.size, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
          { label: "Total", count: BOOKS.length, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-4 text-center`}>
            <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.count}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10" role="group" aria-label="Filter books by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
              filter === cat.value
                ? "bg-green-500/20 text-green-300 border border-green-500/50"
                : "bg-gray-900 text-gray-400 border border-gray-700 hover:border-gray-500"
            }`}
            aria-pressed={filter === cat.value}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <div className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-colors group">
              {/* Cover */}
              <div
                className="h-32 flex items-end p-4"
                style={{
                  background: `linear-gradient(135deg, ${book.gradientFrom}, ${book.gradientTo})`,
                }}
              >
                <BookOpen className="w-8 h-8 text-white/50" aria-hidden="true" />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-green-300 transition-colors">
                    {book.title}
                  </h3>
                  {readBooks.has(book.id) && (
                    <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" aria-label="Marked as read" />
                  )}
                  {readingBooks.has(book.id) && (
                    <Clock className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" aria-label="Currently reading" />
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-1">{book.author}</p>
                <p className="text-gray-600 text-xs mb-3">{book.year}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{book.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-800 text-gray-400 rounded-full px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRead(book.id)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      readBooks.has(book.id)
                        ? "bg-green-500/20 text-green-300 border border-green-500/40"
                        : "bg-gray-900 text-gray-400 border border-gray-700 hover:border-green-500/40 hover:text-green-400"
                    }`}
                    aria-label={readBooks.has(book.id) ? `Unmark ${book.title} as read` : `Mark ${book.title} as read`}
                  >
                    {readBooks.has(book.id) ? "✓ Read" : "Mark Read"}
                  </button>
                  <button
                    onClick={() => toggleReading(book.id)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      readingBooks.has(book.id)
                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
                        : "bg-gray-900 text-gray-400 border border-gray-700 hover:border-yellow-500/40 hover:text-yellow-400"
                    }`}
                    aria-label={readingBooks.has(book.id) ? `Unmark ${book.title} as reading` : `Mark ${book.title} as reading`}
                  >
                    {readingBooks.has(book.id) ? "📖 Reading" : "Reading"}
                  </button>
                  {book.url && (
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-900 text-gray-400 border border-gray-700 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                      aria-label={`Open ${book.title} in new tab`}
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
