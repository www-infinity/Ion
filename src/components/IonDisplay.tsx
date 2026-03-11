"use client";

import { useMemo } from "react";
import { Ion } from "@/lib/types";

interface IonDisplayProps {
  elementSymbol: string;
  elementColor: string;
  ion: Ion;
}

export default function IonDisplay({ elementSymbol, elementColor, ion }: IonDisplayProps) {
  const electronDots = useMemo(() => {
    const baseElectrons = 8;
    const adjusted = ion.charge < 0 ? baseElectrons + Math.abs(ion.charge) : baseElectrons - ion.charge;
    return Math.max(0, Math.min(8, adjusted));
  }, [ion.charge]);

  const dotPositions = [
    { top: "0%", left: "50%", transform: "translate(-50%, -50%)" },
    { top: "0%", left: "75%", transform: "translate(-50%, -50%)" },
    { top: "50%", left: "100%", transform: "translate(-50%, -50%)" },
    { top: "75%", left: "100%", transform: "translate(-50%, -50%)" },
    { top: "100%", left: "50%", transform: "translate(-50%, -50%)" },
    { top: "100%", left: "25%", transform: "translate(-50%, -50%)" },
    { top: "50%", left: "0%", transform: "translate(-50%, -50%)" },
    { top: "25%", left: "0%", transform: "translate(-50%, -50%)" },
  ];

  return (
    <div
      className="flex flex-col items-center gap-4"
      role="img"
      aria-label={`Ion display for ${ion.formula}`}
    >
      <div className="relative w-32 h-32">
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full opacity-20 blur-xl"
          style={{ backgroundColor: elementColor }}
          aria-hidden="true"
        />
        {/* Ion shell */}
        <div
          className="absolute inset-2 rounded-full border-2 opacity-50"
          style={{ borderColor: elementColor }}
          aria-hidden="true"
        />
        {/* Nucleus */}
        <div
          className="absolute inset-8 rounded-full flex items-center justify-center shadow-lg"
          style={{
            backgroundColor: `${elementColor}33`,
            borderColor: elementColor,
            borderWidth: 2,
            boxShadow: `0 0 20px ${elementColor}66`,
          }}
        >
          <span
            className="text-xl font-bold font-mono"
            style={{ color: elementColor }}
          >
            {elementSymbol}
          </span>
        </div>
        {/* Electron dots */}
        {dotPositions.slice(0, electronDots).map((pos, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              ...pos,
              backgroundColor: elementColor,
              boxShadow: `0 0 6px ${elementColor}`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Ion info */}
      <div className="text-center">
        <div className="text-2xl font-bold font-mono" style={{ color: elementColor }}>
          {ion.formula}
        </div>
        <div className="text-sm text-gray-400 mt-1">{ion.name}</div>
        <div
          className={`inline-block mt-2 text-sm font-mono px-3 py-1 rounded-full ${
            ion.charge > 0
              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
              : ion.charge < 0
              ? "bg-red-500/20 text-red-300 border border-red-500/30"
              : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
          }`}
        >
          Charge: {ion.charge > 0 ? `+${ion.charge}` : ion.charge}
        </div>
      </div>
    </div>
  );
}
