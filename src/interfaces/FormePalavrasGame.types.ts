export interface FormePalavrasGameProps {
  onGameComplete: (score: number) => void;
  currentLevel: number;
}

export interface Palavra {
  palavra: string;
  dica: string;
  categoria: string;
  emoji: string;
}

export interface ConfettiData {
  id: number;
  x: number;
  y: number;
  delay: number;
  emoji: string;
}

export type PalavrasPorNivel = Record<number, Palavra[]>;