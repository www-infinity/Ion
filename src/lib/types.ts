export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  electronConfiguration: string;
  commonIons: Ion[];
  electronegativity: number | null;
  period: number;
  group: number | null;
  color: string;
  description: string;
}

export type ElementCategory =
  | "alkali-metal"
  | "alkaline-earth-metal"
  | "transition-metal"
  | "post-transition-metal"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble-gas"
  | "lanthanide"
  | "actinide";

export interface Ion {
  formula: string;
  charge: number;
  name: string;
}

export interface QuantumNumbers {
  n: number;
  l: number;
  ml: number;
  ms: number;
}

export interface OrbitalShell {
  shell: string;
  subshells: Subshell[];
}

export interface Subshell {
  name: string;
  capacity: number;
  electrons: number;
  type: "s" | "p" | "d" | "f";
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: BookCategory;
  description: string;
  isbn?: string;
  url?: string;
  gradientFrom: string;
  gradientTo: string;
  tags: string[];
}

export type BookCategory = "textbook" | "research" | "online" | "reference";

export interface CommunityPost {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
  type: "experiment" | "question" | "discovery" | "resource";
}

export interface Author {
  id: string;
  name: string;
  title: string;
  avatarColor: string;
  initials: string;
}

export interface Researcher {
  id: string;
  name: string;
  title: string;
  institution: string;
  specialization: string;
  avatarColor: string;
  initials: string;
  publications: number;
  connected: boolean;
}

export interface ExperimentLog {
  id: string;
  timestamp: string;
  action: string;
  element: string;
  charge: number;
  result: string;
}

export interface Compound {
  id: string;
  name: string;
  formula: string;
  cation: Ion & { element: string };
  anion: Ion & { element: string };
  bondType: "ionic";
  color: string;
}

export interface EnergyLevel {
  level: number;
  sublevel: string;
  energy: number;
  electrons: number;
  maxElectrons: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}
