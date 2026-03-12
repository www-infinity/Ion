"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Atom, Zap } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/elements", label: "Elements" },
  { href: "/states", label: "States" },
  { href: "/books", label: "Books" },
  { href: "/lab", label: "Lab" },
  { href: "/community", label: "Community" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="ION Home">
            <div className="relative">
              <Atom
                className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors"
                aria-hidden="true"
              />
              <div className="absolute inset-0 animate-ping opacity-20 text-cyan-400">
                <Atom className="w-8 h-8" aria-hidden="true" />
              </div>
            </div>
            <span className="text-xl font-bold font-mono tracking-widest text-cyan-400 group-hover:text-cyan-300 transition-colors glow-text">
              ION
            </span>
            <Zap className="w-4 h-4 text-purple-400" aria-hidden="true" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                      : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-b border-cyan-500/20 px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  active
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
