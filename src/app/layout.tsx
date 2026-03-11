import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "ION — World of Electronic Discovery",
  description:
    "Explore the world of ions and electronic states. Interactive periodic table, energy level diagrams, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0a0a0f] text-gray-100 min-h-screen">
        <Navigation />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
