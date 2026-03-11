"use client";

interface MarioItem {
  id: number;
  emoji: string;
  label: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  size: number;
}

const MARIO_ITEMS: MarioItem[] = [
  { id: 1, emoji: "🍄", label: "mushroom", x: 5, y: 80, duration: 8, delay: 0, size: 28 },
  { id: 2, emoji: "⭐", label: "star", x: 8, y: 60, duration: 6, delay: 1, size: 24 },
  { id: 3, emoji: "🌟", label: "super star", x: 2, y: 40, duration: 10, delay: 2, size: 20 },
  { id: 4, emoji: "🍄", label: "mushroom", x: 92, y: 75, duration: 7, delay: 0.5, size: 26 },
  { id: 5, emoji: "⭐", label: "star", x: 95, y: 55, duration: 9, delay: 1.5, size: 22 },
  { id: 6, emoji: "🔴", label: "1-up", x: 90, y: 35, duration: 11, delay: 3, size: 18 },
  { id: 7, emoji: "🪙", label: "coin", x: 50, y: 5, duration: 5, delay: 2.5, size: 16 },
  { id: 8, emoji: "🌟", label: "star", x: 85, y: 15, duration: 8, delay: 4, size: 20 },
  { id: 9, emoji: "🍄", label: "mushroom", x: 15, y: 10, duration: 12, delay: 1, size: 22 },
  { id: 10, emoji: "⭐", label: "star", x: 70, y: 90, duration: 7, delay: 3.5, size: 18 },
];

export default function MarioEaster() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {MARIO_ITEMS.map((item) => (
        <div
          key={item.id}
          className="absolute select-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
            animation: `marioFloat ${item.duration}s ease-in-out ${item.delay}s infinite`,
            opacity: 0.15,
            filter: "drop-shadow(0 0 4px rgba(255,255,0,0.5))",
          }}
          title={item.label}
        >
          {item.emoji}
        </div>
      ))}

      <style>{`
        @keyframes marioFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(5deg);
          }
          50% {
            transform: translateY(-8px) rotate(-3deg);
          }
          75% {
            transform: translateY(-20px) rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
}
