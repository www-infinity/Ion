"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CheckCircle, XCircle, HelpCircle, Zap } from "lucide-react";
import { EnergyLevel, QuizQuestion } from "@/lib/types";

const ENERGY_LEVELS: EnergyLevel[] = [
  { level: 1, sublevel: "1s", energy: -13.6, electrons: 2, maxElectrons: 2 },
  { level: 2, sublevel: "2s", energy: -3.4, electrons: 2, maxElectrons: 2 },
  { level: 2, sublevel: "2p", energy: -3.4, electrons: 6, maxElectrons: 6 },
  { level: 3, sublevel: "3s", energy: -1.51, electrons: 2, maxElectrons: 2 },
  { level: 3, sublevel: "3p", energy: -1.51, electrons: 6, maxElectrons: 6 },
  { level: 3, sublevel: "3d", energy: -1.51, electrons: 10, maxElectrons: 10 },
  { level: 4, sublevel: "4s", energy: -0.85, electrons: 2, maxElectrons: 2 },
  { level: 4, sublevel: "4p", energy: -0.85, electrons: 6, maxElectrons: 6 },
];

const QUANTUM_NUMBERS = [
  {
    symbol: "n",
    name: "Principal",
    description: "Determines the energy level and size of the orbital. Values: 1, 2, 3, ...",
    color: "#00ffff",
    example: "n=1 (ground state), n=2 (first excited state)",
  },
  {
    symbol: "l",
    name: "Angular Momentum",
    description: "Determines the shape of the orbital. Values: 0 to (n-1)",
    color: "#8b5cf6",
    example: "l=0 (s), l=1 (p), l=2 (d), l=3 (f)",
  },
  {
    symbol: "mₗ",
    name: "Magnetic",
    description: "Determines the orientation of the orbital. Values: -l to +l",
    color: "#10b981",
    example: "For l=1: ml = -1, 0, +1",
  },
  {
    symbol: "mₛ",
    name: "Spin",
    description: "Electron spin direction. Values: +½ (up ↑) or -½ (down ↓)",
    color: "#f59e0b",
    example: "mₛ = +½ (↑) or -½ (↓)",
  },
];

const ORBITAL_CONFIGS = [
  { element: "H", config: [{ sublevel: "1s", electrons: 1 }] },
  { element: "He", config: [{ sublevel: "1s", electrons: 2 }] },
  { element: "Li", config: [{ sublevel: "1s", electrons: 2 }, { sublevel: "2s", electrons: 1 }] },
  { element: "C", config: [{ sublevel: "1s", electrons: 2 }, { sublevel: "2s", electrons: 2 }, { sublevel: "2p", electrons: 2 }] },
  { element: "Ne", config: [{ sublevel: "1s", electrons: 2 }, { sublevel: "2s", electrons: 2 }, { sublevel: "2p", electrons: 6 }] },
  { element: "Na", config: [{ sublevel: "1s", electrons: 2 }, { sublevel: "2s", electrons: 2 }, { sublevel: "2p", electrons: 6 }, { sublevel: "3s", electrons: 1 }] },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "What quantum number describes the energy level of an electron?",
    options: ["Magnetic quantum number (mₗ)", "Principal quantum number (n)", "Spin quantum number (mₛ)", "Angular momentum (l)"],
    correct: 1,
    explanation: "The principal quantum number (n) determines the main energy level or shell of an electron.",
  },
  {
    id: "q2",
    question: "How many electrons can the 3d subshell hold?",
    options: ["2", "6", "10", "14"],
    correct: 2,
    explanation: "The d subshell has 5 orbitals, each holding 2 electrons, for a total of 10.",
  },
  {
    id: "q3",
    question: "What is the maximum number of electrons in the n=2 shell?",
    options: ["2", "8", "18", "32"],
    correct: 1,
    explanation: "The n=2 shell has 2s (2 electrons) and 2p (6 electrons) = 8 electrons total.",
  },
  {
    id: "q4",
    question: "Which principle states no two electrons can have the same four quantum numbers?",
    options: ["Hund's Rule", "Aufbau Principle", "Pauli Exclusion Principle", "Heisenberg Uncertainty"],
    correct: 2,
    explanation: "The Pauli Exclusion Principle states that no two electrons in an atom can have the same set of four quantum numbers.",
  },
];

const CHART_COLORS = ["#00ffff", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899", "#3b82f6", "#ef4444", "#84cc16"];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: EnergyLevel }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-gray-900 border border-cyan-500/30 rounded-xl p-3 shadow-xl text-sm">
        <p className="text-cyan-300 font-mono font-bold">{label}</p>
        <p className="text-gray-300">Energy: {d.energy} eV</p>
        <p className="text-gray-300">Electrons: {d.electrons}/{d.maxElectrons}</p>
        <p className="text-gray-300">Shell n={d.level}</p>
      </div>
    );
  }
  return null;
}

export default function StatesPage() {
  const [selectedOrbit, setSelectedOrbit] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const handleAnswer = (idx: number) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(idx);
    if (idx === QUIZ_QUESTIONS[quizIndex].correct) {
      setQuizScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (quizIndex + 1 >= QUIZ_QUESTIONS.length) {
      setQuizDone(true);
    } else {
      setQuizIndex((i) => i + 1);
      setQuizAnswer(null);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizAnswer(null);
    setQuizScore(0);
    setQuizDone(false);
  };

  const currentQ = QUIZ_QUESTIONS[quizIndex];

  return (
    <div className="min-h-screen px-4 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold font-mono text-purple-400 glow-purple mb-4">
          Electronic States
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore energy levels, quantum numbers, and orbital filling diagrams.
        </p>
      </motion.div>

      {/* Energy Level Chart */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" aria-hidden="true" />
          Energy Level Diagram (Hydrogen-like)
        </h2>
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={ENERGY_LEVELS} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis
                dataKey="sublevel"
                tick={{ fill: "#9ca3af", fontSize: 12, fontFamily: "monospace" }}
                axisLine={{ stroke: "#374151" }}
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                axisLine={{ stroke: "#374151" }}
                label={{ value: "Energy (eV)", angle: -90, position: "insideLeft", fill: "#6b7280", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="energy" radius={[4, 4, 0, 0]}>
                {ENERGY_LEVELS.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Quantum Numbers */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Quantum Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUANTUM_NUMBERS.map((qn) => (
            <motion.div
              key={qn.symbol}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-950 border border-gray-800 rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-3xl font-bold font-mono w-12 h-12 flex items-center justify-center rounded-xl"
                  style={{
                    color: qn.color,
                    backgroundColor: `${qn.color}22`,
                    border: `1px solid ${qn.color}44`,
                  }}
                >
                  {qn.symbol}
                </span>
                <div>
                  <h3 className="text-white font-semibold">{qn.name} Quantum Number</h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-2">{qn.description}</p>
              <p className="text-xs font-mono" style={{ color: qn.color }}>
                Example: {qn.example}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Orbital Filling Diagrams */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Orbital Filling Diagrams</h2>
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
          <div className="flex flex-wrap gap-3 mb-6">
            {ORBITAL_CONFIGS.map((oc, i) => (
              <button
                key={oc.element}
                onClick={() => setSelectedOrbit(i)}
                className={`px-4 py-2 rounded-lg font-mono font-bold transition-all ${
                  selectedOrbit === i
                    ? "bg-purple-500/30 text-purple-300 border border-purple-500/60"
                    : "bg-gray-900 text-gray-400 border border-gray-700 hover:border-gray-500"
                }`}
                aria-pressed={selectedOrbit === i}
                aria-label={`Show orbital diagram for ${oc.element}`}
              >
                {oc.element}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {ORBITAL_CONFIGS[selectedOrbit].config.map((sub) => {
              const maxElectronMap: Record<string, number> = { s: 2, p: 6, d: 10, f: 14 };
              const sublevelType = ["s", "p", "d", "f"].find((t) => sub.sublevel.includes(t)) ?? "s";
              const maxEl = maxElectronMap[sublevelType] ?? 2;
              const orbitals = maxEl / 2;
              const electronPairs: Array<{ up: boolean; down: boolean }> = [];
              let remaining = sub.electrons;
              // Hund's rule: fill all orbitals singly before pairing
              const singleFill = Math.min(remaining, orbitals);
              const paired = Math.max(0, remaining - orbitals);
              for (let i = 0; i < orbitals; i++) {
                const up = i < singleFill;
                const down = i < paired;
                electronPairs.push({ up, down });
              }
              return (
                <div key={sub.sublevel} className="text-center">
                  <div className="text-sm font-mono text-gray-400 mb-2">{sub.sublevel}</div>
                  <div className="flex gap-1">
                    {electronPairs.map((pair, j) => (
                      <div
                        key={j}
                        className="w-10 h-12 border border-gray-600 rounded-md flex flex-col items-center justify-around bg-gray-900 text-sm"
                        aria-label={`Orbital ${j + 1}: ${pair.up ? "up electron" : ""} ${pair.down ? "down electron" : ""}`}
                      >
                        <span className={pair.up ? "text-cyan-400" : "text-gray-700"}>↑</span>
                        <span className={pair.down ? "text-purple-400" : "text-gray-700"}>↓</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{sub.electrons} e⁻</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Interactive Quiz</h2>
        <div className="max-w-2xl mx-auto bg-gray-950 border border-gray-800 rounded-2xl p-8">
          {quizDone ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
              <p className="text-4xl font-bold text-cyan-400 mb-4">
                {quizScore}/{QUIZ_QUESTIONS.length}
              </p>
              <p className="text-gray-400 mb-6">
                {quizScore === QUIZ_QUESTIONS.length
                  ? "Perfect score! You're a quantum expert! 🌟"
                  : quizScore >= QUIZ_QUESTIONS.length / 2
                  ? "Great job! Keep studying! 📚"
                  : "Keep exploring to improve! 💪"}
              </p>
              <button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-500">
                  Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-sm text-cyan-400 font-mono">Score: {quizScore}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5 mb-6">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-1.5 rounded-full transition-all"
                  style={{ width: `${((quizIndex) / QUIZ_QUESTIONS.length) * 100}%` }}
                  role="progressbar"
                  aria-valuenow={quizIndex}
                  aria-valuemin={0}
                  aria-valuemax={QUIZ_QUESTIONS.length}
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-6">{currentQ.question}</h3>
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt, i) => {
                  let style = "border-gray-700 text-gray-300 hover:border-gray-500";
                  if (quizAnswer !== null) {
                    if (i === currentQ.correct) style = "border-green-500 bg-green-500/10 text-green-300";
                    else if (i === quizAnswer && quizAnswer !== currentQ.correct)
                      style = "border-red-500 bg-red-500/10 text-red-300";
                    else style = "border-gray-700 text-gray-500";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={quizAnswer !== null}
                      className={`w-full text-left px-4 py-3 rounded-xl border bg-gray-900 transition-all flex items-center gap-3 ${style}`}
                      aria-label={`Option ${i + 1}: ${opt}`}
                    >
                      {quizAnswer !== null && i === currentQ.correct && (
                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" aria-hidden="true" />
                      )}
                      {quizAnswer !== null && i === quizAnswer && quizAnswer !== currentQ.correct && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" aria-hidden="true" />
                      )}
                      {(quizAnswer === null || (i !== currentQ.correct && i !== quizAnswer)) && (
                        <HelpCircle className="w-5 h-5 text-gray-600 shrink-0" aria-hidden="true" />
                      )}
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {quizAnswer !== null && (
                <div className="mb-6 p-4 rounded-xl bg-gray-900 border border-gray-700">
                  <p className="text-sm text-gray-300">{currentQ.explanation}</p>
                </div>
              )}
              {quizAnswer !== null && (
                <button
                  onClick={nextQuestion}
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  {quizIndex + 1 >= QUIZ_QUESTIONS.length ? "See Results" : "Next Question →"}
                </button>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
