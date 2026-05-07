export enum VisualMode {
  LUXURY = 'LUXURY',
  CHAOS = 'CHAOS'
}

export interface CodeResponse {
  code: string;
  explanation: string;
  complexity: string;
}

export const LANGUAGES = [
  // Easiest / High Level
  { name: 'Python', category: 'High Level', difficulty: 'Easy' },
  { name: 'JavaScript', category: 'Web', difficulty: 'Easy' },
  { name: 'Ruby', category: 'Scripting', difficulty: 'Easy' },
  
  // Moderate
  { name: 'Go', category: 'Systems', difficulty: 'Medium' },
  { name: 'Rust', category: 'Systems', difficulty: 'Hard' },
  { name: 'Haskell', category: 'Functional', difficulty: 'Hard' },
  
  // Hard / Low Level
  { name: 'Assembly (x86)', category: 'Low Level', difficulty: 'Very Hard' },
  
  // Esoteric / The "Impossible"
  { name: 'Brainfuck', category: 'Esoteric', difficulty: 'Extreme' },
  { name: 'Malbolge', category: 'Esoteric', difficulty: 'Impossible' },
  { name: 'Whitespace', category: 'Esoteric', difficulty: 'Extreme' },
  { name: 'Cow', category: 'Esoteric', difficulty: 'Meme' }
] as const;

export type LanguageName = typeof LANGUAGES[number]['name'];