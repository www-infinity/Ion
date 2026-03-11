"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Atom,
  Zap,
  BookOpen,
  Users,
  FlaskConical,
  Layers,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import MarioEaster from "@/components/MarioEaster";

const FEATURES = [
  {
    icon: Atom,
    title: "Elements Lab",
    description:
      "Explore the periodic table with detailed ionic forms, electron configurations, and interactive element cards.",
    href: "/elements",
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Zap,
    title: "Electronic States",
    description:
      "Visualize energy levels, orbital diagrams, and quantum numbers with interactive charts.",
    href: "/states",
    color: "purple",
    gradient: "from-purple-500 to-violet-700",
  },
  {
    icon: BookOpen,
    title: "Books & Sources",
    description:
      "Curated chemistry and physics library with research papers, textbooks, and online resources.",
    href: "/books",
    color: "green",
    gradient: "from-green-500 to-teal-600",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Connect with researchers, share experiments, and discuss discoveries in the ion community.",
    href: "/community",
    color: "orange",
    gradient: "from-orange-500 to-red-600",
  },
  {
    icon: FlaskConical,
    title: "Ion Lab",
    description:
      "Build ions, simulate electron configurations, and create compounds in our virtual lab.",
    href: "/lab",
    color: "yellow",
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    icon: Layers,
    title: "Quantum Levels",
    description:
      "Deep-dive into quantum numbers, shells, subshells, and orbital theory with visual aids.",
    href: "/states",
    color: "pink",
    gradient: "from-pink-500 to-rose-600",
  },
];

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 4 + 2,
  delay: Math.random() * 3,
}));

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <MarioEaster />

      {/* Particle background */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.id % 3 === 0 ? "#00ffff" : p.id % 3 === 1 ? "#8b5cf6" : "#ffffff",
              "--duration": `${p.duration}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 text-center">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,255,255,0.15) 0%, rgba(139,92,246,0.1) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Orbiting rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="relative w-80 h-80 opacity-10">
            <div className="absolute inset-0 rounded-full border border-cyan-400" style={{ animation: "orbit 10s linear infinite" }} />
            <div className="absolute inset-8 rounded-full border border-purple-400" style={{ animation: "orbit 7s linear infinite reverse" }} />
            <div className="absolute inset-16 rounded-full border border-cyan-300" style={{ animation: "orbit 5s linear infinite" }} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" aria-hidden="true" />
            <span className="text-sm font-mono text-gray-400 tracking-widest uppercase">
              World of Ions & Electronic State Discovery
            </span>
            <Sparkles className="w-6 h-6 text-yellow-400" aria-hidden="true" />
          </div>

          <h1
            className="text-8xl md:text-[12rem] font-black font-mono tracking-widest mb-4"
            style={{
              background: "linear-gradient(135deg, #00ffff 0%, #8b5cf6 50%, #00ffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 0 40px rgba(0,255,255,0.3))",
            }}
          >
            ION
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Explore the quantum world of{" "}
            <span className="text-cyan-400 font-semibold">electrons</span>,{" "}
            <span className="text-purple-400 font-semibold">ions</span>, and{" "}
            <span className="text-pink-400 font-semibold">electronic states</span> through
            interactive visualizations and real data.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/elements"
              className="group flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-cyan-500/25"
              aria-label="Start exploring elements"
            >
              <Atom className="w-5 h-5" aria-hidden="true" />
              Explore Elements
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <Link
              href="/lab"
              className="group flex items-center gap-2 border border-purple-500/50 text-purple-300 font-semibold px-8 py-3 rounded-full hover:bg-purple-500/10 transition-all hover:scale-105"
              aria-label="Open the ion lab"
            >
              <FlaskConical className="w-5 h-5" aria-hidden="true" />
              Open Lab
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "118", label: "Elements" },
            { value: "∞", label: "Ions" },
            { value: "7", label: "Periods" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold font-mono text-cyan-400 glow-text">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Explore the World of Ions</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Six interactive modules to discover, learn, and experiment with ionic chemistry and
            electronic states.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={feature.href}
                className="group block bg-gray-950 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 h-full"
                aria-label={`Go to ${feature.title}`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                <div className="flex items-center gap-1 mt-4 text-sm text-gray-500 group-hover:text-cyan-400 transition-colors">
                  <span>Explore</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mario Easter Egg Section */}
      <section className="relative z-10 py-20 px-4 text-center border-t border-gray-800/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-600 mb-4 font-mono">
            🍄 ⭐ Level Up Your Chemistry Knowledge ⭐ 🍄
          </h2>
          <p className="text-gray-700 text-sm max-w-xl mx-auto">
            Just like Mario collects power-ups, collect your knowledge of ions and electronic states.
            Every element is a new world to explore!
          </p>
          <div className="flex justify-center gap-6 mt-6 text-3xl">
            {["🍄", "⭐", "🌟", "🪙", "🔴"].map((emoji, i) => (
              <span
                key={i}
                className="animate-float"
                style={{ animationDelay: `${i * 0.3}s` }}
                role="img"
                aria-label="Mario power-up item"
              >
                {emoji}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
