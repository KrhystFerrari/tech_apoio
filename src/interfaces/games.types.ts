// Types para jogos e atividades
export interface GameActivity {
  id: string;
  title: string;
  description: string;
  type: ActivityType;
  difficulty: Difficulty;
  minAge: number;
  maxAge: number;
  instructions: string;
  content: Record<string, unknown>; // JSON content
  subjectId: string;
  subject?: GameSubject;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GameSubject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GameRequest {
  title: string;
  description: string;
  type: ActivityType;
  difficulty?: Difficulty;
  minAge?: number;
  maxAge?: number;
  instructions: string;
  content: Record<string, unknown>;
  subjectId: string;
}

export interface GameResponse {
  success: boolean;
  data?: GameActivity | GameActivity[];
  count?: number;
  error?: string;
}

export interface GameFilters {
  subject?: string;
  difficulty?: Difficulty;
  type?: ActivityType;
}

// Enums (devem corresponder aos do Prisma)
export enum ActivityType {
  QUIZ = "QUIZ",
  MEMORY = "MEMORY",
  WORD_FORMATION = "WORD_FORMATION",
  MATH_OPERATIONS = "MATH_OPERATIONS",
  LOGICAL_SEQUENCE = "LOGICAL_SEQUENCE",
  DRAG_DROP = "DRAG_DROP",
  TYPING = "TYPING",
  DRAWING = "DRAWING",
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
