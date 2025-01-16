export interface Challenge {
  id: number;
  title: string;
  description: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  boilerplate: string | null;
}

const levelDescriptions: Record<number, string> = {
  0: 'super easy',
  1: 'easy',
  2: 'medium',
  3: 'hard',
  4: 'extra hard',
  5: 'extremely hard',
};

export default function getLevelDescription(level: number): string {
  return levelDescriptions[level];
}

