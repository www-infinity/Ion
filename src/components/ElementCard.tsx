"use client";

import { useState } from "react";
import { X, Zap } from "lucide-react";
import { Element } from "@/lib/types";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/elements-data";

interface ElementCardProps {
  element: Element;
}

export default function ElementCard({ element }: ElementCardProps) {
  const [showModal, setShowModal] = useState(false);
  const gradientClass = CATEGORY_COLORS[element.category] ?? "from-gray-600 to-gray-900";

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`relative group bg-gradient-to-br ${gradientClass} p-0.5 rounded-xl cursor-pointer transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
        aria-label={`View details for ${element.name}`}
      >
        <div className="bg-black/80 rounded-xl p-4 h-full flex flex-col gap-2 hover:bg-black/60 transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-xs text-gray-400 font-mono">{element.atomicNumber}</span>
            <span className="text-xs text-gray-500 font-mono">{element.atomicMass.toFixed(3)}</span>
          </div>
          <div
            className="text-4xl font-bold font-mono text-center py-2 drop-shadow-lg"
            style={{ color: element.color, textShadow: `0 0 20px ${element.color}66` }}
          >
            {element.symbol}
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-white">{element.name}</p>
            <p className="text-xs text-gray-400 mt-1">{CATEGORY_LABELS[element.category]}</p>
          </div>
          {element.commonIons.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto justify-center">
              {element.commonIons.slice(0, 2).map((ion) => (
                <span
                  key={ion.formula}
                  className="text-xs bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 rounded-full px-2 py-0.5 font-mono"
                >
                  {ion.formula}
                </span>
              ))}
            </div>
          )}
          {element.commonIons.length === 0 && (
            <div className="flex justify-center mt-auto">
              <span className="text-xs bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full px-2 py-0.5">
                Stable
              </span>
            </div>
          )}
        </div>
      </button>

      {/* Detail Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${element.name} details`}
        >
          <div
            className="relative bg-gray-950 border border-cyan-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl shadow-cyan-500/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-20 h-20 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
              >
                <span
                  className="text-3xl font-bold font-mono"
                  style={{ color: element.color, textShadow: `0 0 20px ${element.color}88` }}
                >
                  {element.symbol}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{element.name}</h2>
                <p className="text-gray-400 text-sm">Atomic Number: {element.atomicNumber}</p>
                <p className="text-gray-400 text-sm">Atomic Mass: {element.atomicMass} u</p>
                <span
                  className={`inline-block mt-1 text-xs bg-gradient-to-r ${gradientClass} text-white rounded-full px-3 py-0.5`}
                >
                  {CATEGORY_LABELS[element.category]}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-xl p-4">
                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Electron Configuration
                </h3>
                <p className="text-cyan-300 font-mono text-lg">{element.electronConfiguration}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900 rounded-xl p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Period</p>
                  <p className="text-white font-semibold">{element.period}</p>
                </div>
                <div className="bg-gray-900 rounded-xl p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Group</p>
                  <p className="text-white font-semibold">{element.group ?? "—"}</p>
                </div>
                <div className="bg-gray-900 rounded-xl p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Electronegativity
                  </p>
                  <p className="text-white font-semibold">
                    {element.electronegativity ?? "N/A"}
                  </p>
                </div>
              </div>

              {element.commonIons.length > 0 && (
                <div className="bg-gray-900 rounded-xl p-4">
                  <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" aria-hidden="true" />
                    Common Ions
                  </h3>
                  <div className="space-y-2">
                    {element.commonIons.map((ion) => (
                      <div
                        key={ion.formula}
                        className="flex items-center justify-between bg-black/40 rounded-lg px-3 py-2"
                      >
                        <span className="text-cyan-300 font-mono font-bold">{ion.formula}</span>
                        <span className="text-gray-400 text-sm">{ion.name}</span>
                        <span
                          className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                            ion.charge > 0
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {ion.charge > 0 ? `+${ion.charge}` : ion.charge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-900 rounded-xl p-4">
                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">About</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{element.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
