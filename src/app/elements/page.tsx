"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import ElementCard from "@/components/ElementCard";
import { ELEMENTS, CATEGORY_LABELS } from "@/lib/elements-data";
import { ElementCategory } from "@/lib/types";

const CATEGORIES: Array<{ value: ElementCategory | "all"; label: string }> = [
  { value: "all", label: "All Elements" },
  { value: "alkali-metal", label: "Alkali Metals" },
  { value: "alkaline-earth-metal", label: "Alkaline Earth" },
  { value: "transition-metal", label: "Transition Metals" },
  { value: "post-transition-metal", label: "Post-Transition" },
  { value: "metalloid", label: "Metalloids" },
  { value: "nonmetal", label: "Nonmetals" },
  { value: "halogen", label: "Halogens" },
  { value: "noble-gas", label: "Noble Gases" },
];

export default function ElementsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ElementCategory | "all">("all");

  const filtered = useMemo(() => {
    return ELEMENTS.filter((el) => {
      const matchesSearch =
        search === "" ||
        el.name.toLowerCase().includes(search.toLowerCase()) ||
        el.symbol.toLowerCase().includes(search.toLowerCase()) ||
        el.atomicNumber.toString().includes(search);
      const matchesCategory = category === "all" || el.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen px-4 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold font-mono text-cyan-400 glow-text mb-4">
          Elements Explorer
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover the ionic forms, electron configurations, and properties of chemical elements.
        </p>
      </motion.div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, symbol, or atomic number..."
            className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            aria-label="Search elements"
          />
        </div>
        <div className="relative">
          <Filter
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
            aria-hidden="true"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ElementCategory | "all")}
            className="bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-8 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors appearance-none cursor-pointer"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Quick category filters">
        {CATEGORIES.slice(1).map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === cat.value
                ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/50"
                : "bg-gray-900 text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-gray-300"
            }`}
            aria-pressed={category === cat.value}
          >
            {CATEGORY_LABELS[cat.value]}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-gray-500 text-sm mb-6">
        Showing <span className="text-cyan-400 font-semibold">{filtered.length}</span> of{" "}
        {ELEMENTS.length} elements
      </p>

      {/* Elements Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No elements found</p>
          <p className="text-sm mt-2">Try a different search term or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((element, i) => (
            <motion.div
              key={element.atomicNumber}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <ElementCard element={element} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
