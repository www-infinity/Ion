"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Plus, Trash2, Download, RefreshCw } from "lucide-react";
import IonDisplay from "@/components/IonDisplay";
import { ELEMENTS } from "@/lib/elements-data";
import { ExperimentLog, Ion } from "@/lib/types";

const CHARGE_OPTIONS = [-3, -2, -1, 0, 1, 2, 3, 4];

function getIonForCharge(elementSymbol: string, charge: number): Ion {
  const supMap: Record<string, string> = {
    "-3": "³⁻", "-2": "²⁻", "-1": "⁻", "0": "", "1": "⁺", "2": "²⁺", "3": "³⁺", "4": "⁴⁺",
  };
  const sup = supMap[charge.toString()] ?? "";
  return {
    formula: `${elementSymbol}${sup}`,
    charge,
    name: charge === 0
      ? `${elementSymbol} (neutral)`
      : `${elementSymbol} ion (${charge > 0 ? "+" : ""}${charge})`,
  };
}

function generateLogId(): string {
  return `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export default function LabPage() {
  const [selectedElementIdx, setSelectedElementIdx] = useState(0);
  const [selectedCharge, setSelectedCharge] = useState(1);
  const [logs, setLogs] = useState<ExperimentLog[]>([]);
  const [cation, setCation] = useState<{ elementIdx: number; charge: number } | null>(null);
  const [anion, setAnion] = useState<{ elementIdx: number; charge: number } | null>(null);

  const selectedElement = ELEMENTS[selectedElementIdx];
  const currentIon = getIonForCharge(selectedElement.symbol, selectedCharge);

  const addToLog = useCallback((action: string, element: string, charge: number, result: string) => {
    const entry: ExperimentLog = {
      id: generateLogId(),
      timestamp: new Date().toLocaleTimeString(),
      action,
      element,
      charge,
      result,
    };
    setLogs((prev) => [entry, ...prev.slice(0, 19)]);
  }, []);

  const handleSetCation = () => {
    if (selectedCharge <= 0) {
      addToLog("Error", selectedElement.symbol, selectedCharge, "Cation must have positive charge");
      return;
    }
    setCation({ elementIdx: selectedElementIdx, charge: selectedCharge });
    addToLog("Set Cation", selectedElement.symbol, selectedCharge, `${currentIon.formula} added as cation`);
  };

  const handleSetAnion = () => {
    if (selectedCharge >= 0) {
      addToLog("Error", selectedElement.symbol, selectedCharge, "Anion must have negative charge");
      return;
    }
    setAnion({ elementIdx: selectedElementIdx, charge: selectedCharge });
    addToLog("Set Anion", selectedElement.symbol, selectedCharge, `${currentIon.formula} added as anion`);
  };

  const handleFormCompound = () => {
    if (!cation || !anion) {
      addToLog("Error", "—", 0, "Need both cation and anion");
      return;
    }
    const catEl = ELEMENTS[cation.elementIdx];
    const anEl = ELEMENTS[anion.elementIdx];
    const catIon = getIonForCharge(catEl.symbol, cation.charge);
    const anIon = getIonForCharge(anEl.symbol, anion.charge);
    const lcm = Math.abs(cation.charge * anion.charge) / gcd(Math.abs(cation.charge), Math.abs(anion.charge));
    const catCount = lcm / Math.abs(cation.charge);
    const anCount = lcm / Math.abs(anion.charge);
    const formula = `${catEl.symbol}${catCount > 1 ? catCount : ""}${anEl.symbol}${anCount > 1 ? anCount : ""}`;
    addToLog(
      "Form Compound",
      formula,
      0,
      `${catIon.formula} + ${anIon.formula} → ${formula} (ionic compound)`
    );
  };

  const clearLog = () => setLogs([]);
  const clearBuild = () => { setCation(null); setAnion(null); };

  return (
    <div className="min-h-screen px-4 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-yellow-400 mb-4" style={{ textShadow: "0 0 20px rgba(250,204,21,0.3)" }}>
          Ion Lab
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Build ions, visualize electron configurations, and simulate ionic bonding.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ion Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Controls */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-yellow-400" aria-hidden="true" />
              Ion Builder
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="element-select" className="block text-sm text-gray-400 mb-2">
                  Select Element
                </label>
                <select
                  id="element-select"
                  value={selectedElementIdx}
                  onChange={(e) => setSelectedElementIdx(Number(e.target.value))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                >
                  {ELEMENTS.map((el, i) => (
                    <option key={el.atomicNumber} value={i}>
                      {el.symbol} — {el.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Select Charge</label>
                <div className="flex flex-wrap gap-2">
                  {CHARGE_OPTIONS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCharge(c)}
                      className={`px-3 py-2 rounded-lg font-mono font-bold text-sm transition-all ${
                        selectedCharge === c
                          ? c > 0
                            ? "bg-blue-500/30 text-blue-300 border border-blue-500/60"
                            : c < 0
                            ? "bg-red-500/30 text-red-300 border border-red-500/60"
                            : "bg-gray-500/30 text-gray-300 border border-gray-500/60"
                          : "bg-gray-900 text-gray-500 border border-gray-700 hover:border-gray-500"
                      }`}
                      aria-pressed={selectedCharge === c}
                      aria-label={`Set charge to ${c > 0 ? `+${c}` : c}`}
                    >
                      {c > 0 ? `+${c}` : c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Ion Visualization */}
            <div className="flex justify-center py-6 bg-gray-900 rounded-xl">
              <IonDisplay
                elementSymbol={selectedElement.symbol}
                elementColor={selectedElement.color}
                ion={currentIon}
              />
            </div>

            {/* Element Details */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-gray-900 rounded-xl p-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Configuration</p>
                <p className="text-cyan-300 font-mono text-sm">{selectedElement.electronConfiguration}</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Category</p>
                <p className="text-white text-sm">{selectedElement.category.replace(/-/g, " ")}</p>
              </div>
            </div>
          </div>

          {/* Compound Builder */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-green-400" aria-hidden="true" />
                Compound Simulator
              </h2>
              <button
                onClick={clearBuild}
                className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Clear compound build"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              {/* Cation slot */}
              <div
                className={`border-2 border-dashed rounded-xl p-4 text-center min-h-24 flex flex-col items-center justify-center transition-colors ${
                  cation ? "border-blue-500/50 bg-blue-500/5" : "border-gray-700"
                }`}
              >
                {cation ? (
                  <>
                    <div className="text-2xl font-bold font-mono text-blue-300">
                      {getIonForCharge(ELEMENTS[cation.elementIdx].symbol, cation.charge).formula}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Cation (+)</div>
                  </>
                ) : (
                  <p className="text-gray-600 text-sm">Cation (+) slot</p>
                )}
              </div>

              {/* Bond */}
              <div className="text-center">
                <div className="text-4xl text-gray-600">⊕</div>
                <p className="text-xs text-gray-600 mt-1">Ionic Bond</p>
                {cation && anion && (
                  <button
                    onClick={handleFormCompound}
                    className="mt-3 bg-gradient-to-r from-green-500 to-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Form Compound
                  </button>
                )}
              </div>

              {/* Anion slot */}
              <div
                className={`border-2 border-dashed rounded-xl p-4 text-center min-h-24 flex flex-col items-center justify-center transition-colors ${
                  anion ? "border-red-500/50 bg-red-500/5" : "border-gray-700"
                }`}
              >
                {anion ? (
                  <>
                    <div className="text-2xl font-bold font-mono text-red-300">
                      {getIonForCharge(ELEMENTS[anion.elementIdx].symbol, anion.charge).formula}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Anion (−)</div>
                  </>
                ) : (
                  <p className="text-gray-600 text-sm">Anion (−) slot</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSetCation}
                className="flex-1 bg-blue-500/20 border border-blue-500/40 text-blue-300 py-2 rounded-xl text-sm font-medium hover:bg-blue-500/30 transition-colors"
                aria-label="Set current ion as cation"
              >
                Set as Cation
              </button>
              <button
                onClick={handleSetAnion}
                className="flex-1 bg-red-500/20 border border-red-500/40 text-red-300 py-2 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-colors"
                aria-label="Set current ion as anion"
              >
                Set as Anion
              </button>
            </div>
          </div>
        </div>

        {/* Experiment Log */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 flex flex-col max-h-screen sticky top-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-purple-400" aria-hidden="true" />
              Experiment Log
            </h2>
            {logs.length > 0 && (
              <button
                onClick={clearLog}
                className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-gray-800 transition-colors"
                aria-label="Clear experiment log"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
            {logs.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                <FlaskConical className="w-10 h-10 mx-auto mb-3 opacity-30" aria-hidden="true" />
                <p className="text-sm">Start building ions to see your experiment log here.</p>
              </div>
            ) : (
              logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-xl border text-xs ${
                    log.action === "Error"
                      ? "bg-red-500/5 border-red-500/20 text-red-300"
                      : log.action === "Form Compound"
                      ? "bg-green-500/5 border-green-500/20 text-green-300"
                      : "bg-gray-900 border-gray-800 text-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white">{log.action}</span>
                    <span className="text-gray-600 font-mono">{log.timestamp}</span>
                  </div>
                  <p>{log.result}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
