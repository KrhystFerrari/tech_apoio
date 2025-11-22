// Dados dos jogos por matéria
export interface GameData {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  dificuldade: "fácil" | "médio" | "difícil";
  cor: string;
  materia: string;
  isLocked?: boolean;
  isCompleted?: boolean;
  score?: number;
  stars?: number;
  tempo?: number;
  component: string; // Nome do componente
}

// Jogos de Português
export const jogosPortugues: GameData[] = [
  {
    id: "forme-palavras",
    nome: "Forme Palavras",
    descricao: "Monte palavras juntando as letras na ordem correta!",
    emoji: "🔤",
    dificuldade: "fácil",
    cor: "#3b82f6",
    materia: "portugues",
    component: "FormePalavrasGame",
  },
];

// Jogos de Matemática
export const jogosMatematica: GameData[] = [
  {
    id: "contagem",
    nome: "Contagem Divertida",
    descricao: "Conte os animais e objetos para aprender números!",
    emoji: "🔢",
    dificuldade: "fácil",
    cor: "#22c55e",
    materia: "matematica",
    component: "ContagemGame",
  },
  {
    id: "operacoes",
    nome: "Operações Mágicas",
    descricao: "Resolva somas e subtrações de forma divertida!",
    emoji: "➕",
    dificuldade: "médio",
    cor: "#22c55e",
    materia: "matematica",
    component: "OperacoesGame",
  },
];

// Jogos de Ciências
export const jogosCiencias: GameData[] = [
  {
    id: "ciencias-quiz",
    nome: "Quiz de Ciências",
    descricao: "Teste seus conhecimentos sobre o mundo natural!",
    emoji: "🧪",
    dificuldade: "médio",
    cor: "#f59e0b",
    materia: "ciencias",
    component: "CienciasGame",
  },
];

// Dados consolidados
export const JOGOS_DATA = {
  portugues: jogosPortugues,
  matematica: jogosMatematica,
  ciencias: jogosCiencias,
};

// Todos os jogos em uma lista única
export const TODOS_JOGOS = [
  ...jogosPortugues,
  ...jogosMatematica,
  ...jogosCiencias,
];

// Informações das matérias
export const MATERIAS_INFO = {
  portugues: {
    nome: "Português Mágico",
    emoji: "📖",
    cor: "#3b82f6",
    descricao: "Aprenda português de forma divertida!",
  },
  matematica: {
    nome: "Matemática Legal",
    emoji: "🔢",
    cor: "#22c55e",
    descricao: "Números e operações nunca foram tão legais!",
  },
  ciencias: {
    nome: "Ciências Incríveis",
    emoji: "🔬",
    cor: "#f59e0b",
    descricao: "Explore os mistérios do mundo natural!",
  },
};

// Função para obter jogos por matéria
export const getJogosByMateria = (materia: string): GameData[] => {
  return JOGOS_DATA[materia as keyof typeof JOGOS_DATA] || [];
};

// Função para obter um jogo específico
export const getJogoById = (jogoId: string): GameData | null => {
  return TODOS_JOGOS.find((jogo) => jogo.id === jogoId) || null;
};

// Função para obter informações da matéria
export const getMateriaInfo = (materia: string) => {
  return MATERIAS_INFO[materia as keyof typeof MATERIAS_INFO] || null;
};

// Função para calcular estatísticas da matéria
export const calculateMateriaStats = (jogos: GameData[]) => {
  const total = jogos.length;
  const concluidos = jogos.filter((j) => j.isCompleted).length;
  const pendentes = jogos.filter((j) => !j.isCompleted && !j.isLocked).length;
  const bloqueados = jogos.filter((j) => j.isLocked).length;

  const pontuacaoTotal = jogos.reduce((acc, j) => acc + (j.score || 0), 0);
  const estrelasTotal = jogos.reduce((acc, j) => acc + (j.stars || 0), 0);

  return {
    total,
    concluidos,
    pendentes,
    bloqueados,
    progresso: total > 0 ? Math.round((concluidos / total) * 100) : 0,
    pontuacaoMedia:
      concluidos > 0 ? Math.round(pontuacaoTotal / concluidos) : 0,
    estrelasTotal,
  };
};

// Função para atualizar progresso do jogo
export const updateGameProgress = (
  jogoId: string,
  score: number,
  stars: number,
  tempo?: number
): GameData | null => {
  const jogo = getJogoById(jogoId);
  if (!jogo) return null;

  return {
    ...jogo,
    isCompleted: score >= 70, // 70% para considerar completo
    score: Math.max(jogo.score || 0, score),
    stars: Math.max(jogo.stars || 0, stars),
    tempo: tempo || jogo.tempo,
  };
};

// Função para determinar próximo jogo desbloqueado
export const getNextUnlockedGame = (
  materia: string,
  currentGameId: string
): GameData | null => {
  const jogos = getJogosByMateria(materia);
  const currentIndex = jogos.findIndex((j) => j.id === currentGameId);

  if (currentIndex === -1 || currentIndex === jogos.length - 1) {
    return null;
  }

  return jogos[currentIndex + 1];
};

// Interface para dados de progresso
export interface ProgressData {
  jogoId: string;
  isCompleted: boolean;
  score?: number;
  stars?: number;
  tempo?: number;
}

// Função para verificar se jogo está desbloqueado
export const isGameUnlocked = (
  materia: string,
  jogoId: string,
  progressData: ProgressData[]
): boolean => {
  const jogos = getJogosByMateria(materia);
  const gameIndex = jogos.findIndex((j) => j.id === jogoId);

  if (gameIndex === 0) return true; // Primeiro jogo sempre desbloqueado

  // Verificar se jogo anterior foi completado
  const previousGame = jogos[gameIndex - 1];
  const previousProgress = progressData.find(
    (p) => p.jogoId === previousGame.id
  );

  return previousProgress?.isCompleted || false;
};

// Componentes de jogos disponíveis
export const GAME_COMPONENTS = {
  FormePalavrasGame: () => import("@/components/games/FormePalavrasGame"),
  ContagemGame: () => import("@/components/games/ContagemGame"),
  OperacoesGame: () => import("@/components/games/OperacoesGame"),
  CienciasGame: () => import("@/components/games/CienciasGame"),
};

// Função para carregar componente do jogo
export const loadGameComponent = async (componentName: string) => {
  const loader = GAME_COMPONENTS[componentName as keyof typeof GAME_COMPONENTS];
  if (!loader) {
    throw new Error(`Componente ${componentName} não encontrado`);
  }

  const gameModule = await loader();
  if ("default" in gameModule) {
    return gameModule.default;
  }
  return gameModule;
};
