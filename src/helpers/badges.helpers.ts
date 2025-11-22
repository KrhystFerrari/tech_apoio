import {
  Badge,
  BadgeCategory,
  BadgeRarity,
} from "@/src/interfaces/Badge.types";

export interface BadgeCheckResult {
  badge: Badge;
  earned: boolean;
  progress: {
    current: number;
    target: number;
    percentage: number;
  };
}

// Predefinições de badges do sistema
export const SYSTEM_BADGES: Omit<Badge, "id" | "createdAt" | "updatedAt">[] = [
  // PROGRESS - Badges de progresso
  {
    name: "Primeiro Passo",
    description: "Complete sua primeira atividade!",
    icon: "👣",
    category: BadgeCategory.PROGRESS,
    requirement: "Completar 1 atividade",
    points: 10,
    rarity: BadgeRarity.COMMON,
    isActive: true,
  },
  {
    name: "Explorador",
    description: "Complete 5 atividades diferentes",
    icon: "🗺️",
    category: BadgeCategory.PROGRESS,
    requirement: "Completar 5 atividades",
    points: 25,
    rarity: BadgeRarity.COMMON,
    isActive: true,
  },
  {
    name: "Aventureiro",
    description: "Complete 25 atividades",
    icon: "🎒",
    category: BadgeCategory.PROGRESS,
    requirement: "Completar 25 atividades",
    points: 50,
    rarity: BadgeRarity.RARE,
    isActive: true,
  },
  {
    name: "Mestre da Jornada",
    description: "Complete 100 atividades",
    icon: "🏆",
    category: BadgeCategory.PROGRESS,
    requirement: "Completar 100 atividades",
    points: 200,
    rarity: BadgeRarity.EPIC,
    isActive: true,
  },

  // ACHIEVEMENT - Badges de conquista
  {
    name: "Perfeccionista",
    description: "Complete uma atividade com 100% de acertos",
    icon: "⭐",
    category: BadgeCategory.ACHIEVEMENT,
    requirement: "Acertar 100% em uma atividade",
    points: 30,
    rarity: BadgeRarity.RARE,
    isActive: true,
  },
  {
    name: "Velocista",
    description: "Complete uma atividade em menos de 60 segundos",
    icon: "⚡",
    category: BadgeCategory.ACHIEVEMENT,
    requirement: "Completar atividade em menos de 60s",
    points: 35,
    rarity: BadgeRarity.RARE,
    isActive: true,
  },
  {
    name: "Sem Dicas",
    description: "Complete uma atividade sem usar dicas",
    icon: "🎯",
    category: BadgeCategory.ACHIEVEMENT,
    requirement: "Completar atividade sem dicas",
    points: 40,
    rarity: BadgeRarity.RARE,
    isActive: true,
  },

  // STREAK - Badges de sequência
  {
    name: "Consistente",
    description: "Complete atividades por 3 dias seguidos",
    icon: "📅",
    category: BadgeCategory.STREAK,
    requirement: "3 dias de atividades consecutivos",
    points: 45,
    rarity: BadgeRarity.RARE,
    isActive: true,
  },
  {
    name: "Dedicado",
    description: "Complete atividades por 7 dias seguidos",
    icon: "🔥",
    category: BadgeCategory.STREAK,
    requirement: "7 dias de atividades consecutivos",
    points: 75,
    rarity: BadgeRarity.EPIC,
    isActive: true,
  },
  {
    name: "Lenda da Constância",
    description: "Complete atividades por 30 dias seguidos",
    icon: "👑",
    category: BadgeCategory.STREAK,
    requirement: "30 dias de atividades consecutivos",
    points: 300,
    rarity: BadgeRarity.LEGENDARY,
    isActive: true,
  },

  // MASTERY - Badges de maestria por matéria
  {
    name: "Mestre das Palavras",
    description: "Complete 20 atividades de Português",
    icon: "📚",
    category: BadgeCategory.MASTERY,
    requirement: "Completar 20 atividades de Português",
    points: 60,
    rarity: BadgeRarity.EPIC,
    isActive: true,
  },
  {
    name: "Gênio da Matemática",
    description: "Complete 20 atividades de Matemática",
    icon: "🧮",
    category: BadgeCategory.MASTERY,
    requirement: "Completar 20 atividades de Matemática",
    points: 60,
    rarity: BadgeRarity.EPIC,
    isActive: true,
  },
  {
    name: "Cientista Brilhante",
    description: "Complete 20 atividades de Ciências",
    icon: "🔬",
    category: BadgeCategory.MASTERY,
    requirement: "Completar 20 atividades de Ciências",
    points: 60,
    rarity: BadgeRarity.EPIC,
    isActive: true,
  },
  {
    name: "Programador Mirim",
    description: "Complete 20 atividades de Tecnologia",
    icon: "💻",
    category: BadgeCategory.MASTERY,
    requirement: "Completar 20 atividades de Tecnologia",
    points: 60,
    rarity: BadgeRarity.EPIC,
    isActive: true,
  },

  // SPECIAL - Badges especiais
  {
    name: "Primeira Conquista",
    description: "Ganhe seu primeiro badge!",
    icon: "🎖️",
    category: BadgeCategory.SPECIAL,
    requirement: "Conquistar primeiro badge",
    points: 15,
    rarity: BadgeRarity.COMMON,
    isActive: true,
  },
  {
    name: "Colecionador",
    description: "Conquiste 10 badges diferentes",
    icon: "🏅",
    category: BadgeCategory.SPECIAL,
    requirement: "Conquistar 10 badges",
    points: 100,
    rarity: BadgeRarity.EPIC,
    isActive: true,
  },
  {
    name: "Lenda do TechApoio",
    description: "Conquiste todos os badges disponíveis",
    icon: "🌟",
    category: BadgeCategory.SPECIAL,
    requirement: "Conquistar todos os badges",
    points: 500,
    rarity: BadgeRarity.LEGENDARY,
    isActive: true,
  },
];

// Funções utilitárias para verificação de badges

export function checkProgressBadges(
  totalActivities: number
): BadgeCheckResult[] {
  const progressBadges = SYSTEM_BADGES.filter(
    (badge) => badge.category === BadgeCategory.PROGRESS
  );

  return progressBadges.map((badge) => {
    let target = 0;
    if (badge.name === "Primeiro Passo") target = 1;
    else if (badge.name === "Explorador") target = 5;
    else if (badge.name === "Aventureiro") target = 25;
    else if (badge.name === "Mestre da Jornada") target = 100;

    return {
      badge: badge as Badge,
      earned: totalActivities >= target,
      progress: {
        current: Math.min(totalActivities, target),
        target,
        percentage: Math.min((totalActivities / target) * 100, 100),
      },
    };
  });
}

export function checkAchievementBadges(
  perfectScores: number,
  fastCompletions: number,
  noHintCompletions: number
): BadgeCheckResult[] {
  const achievementBadges = SYSTEM_BADGES.filter(
    (badge) => badge.category === BadgeCategory.ACHIEVEMENT
  );

  return achievementBadges.map((badge) => {
    let current = 0;
    const target = 1;

    if (badge.name === "Perfeccionista") current = perfectScores;
    else if (badge.name === "Velocista") current = fastCompletions;
    else if (badge.name === "Sem Dicas") current = noHintCompletions;

    return {
      badge: badge as Badge,
      earned: current >= target,
      progress: {
        current: Math.min(current, target),
        target,
        percentage: Math.min((current / target) * 100, 100),
      },
    };
  });
}

export function checkStreakBadges(currentStreak: number): BadgeCheckResult[] {
  const streakBadges = SYSTEM_BADGES.filter(
    (badge) => badge.category === BadgeCategory.STREAK
  );

  return streakBadges.map((badge) => {
    let target = 0;
    if (badge.name === "Consistente") target = 3;
    else if (badge.name === "Dedicado") target = 7;
    else if (badge.name === "Lenda da Constância") target = 30;

    return {
      badge: badge as Badge,
      earned: currentStreak >= target,
      progress: {
        current: Math.min(currentStreak, target),
        target,
        percentage: Math.min((currentStreak / target) * 100, 100),
      },
    };
  });
}

export function checkMasteryBadges(
  subjectCounts: Record<string, number>
): BadgeCheckResult[] {
  const masteryBadges = SYSTEM_BADGES.filter(
    (badge) => badge.category === BadgeCategory.MASTERY
  );

  return masteryBadges.map((badge) => {
    let current = 0;
    const target = 20;

    if (badge.name === "Mestre das Palavras")
      current = subjectCounts["Português"] || 0;
    else if (badge.name === "Gênio da Matemática")
      current = subjectCounts["Matemática"] || 0;
    else if (badge.name === "Cientista Brilhante")
      current = subjectCounts["Ciências"] || 0;
    else if (badge.name === "Programador Mirim")
      current = subjectCounts["Tecnologia"] || 0;

    return {
      badge: badge as Badge,
      earned: current >= target,
      progress: {
        current: Math.min(current, target),
        target,
        percentage: Math.min((current / target) * 100, 100),
      },
    };
  });
}

export function checkSpecialBadges(
  totalBadges: number,
  isFirstBadge: boolean
): BadgeCheckResult[] {
  const specialBadges = SYSTEM_BADGES.filter(
    (badge) => badge.category === BadgeCategory.SPECIAL
  );

  return specialBadges.map((badge) => {
    let current = 0;
    let target = 0;
    let earned = false;

    if (badge.name === "Primeira Conquista") {
      current = isFirstBadge ? 1 : 0;
      target = 1;
      earned = isFirstBadge;
    } else if (badge.name === "Colecionador") {
      current = totalBadges;
      target = 10;
      earned = totalBadges >= 10;
    } else if (badge.name === "Lenda do TechApoio") {
      const totalAvailableBadges = SYSTEM_BADGES.length - 1; // Excluindo este próprio badge
      current = totalBadges;
      target = totalAvailableBadges;
      earned = totalBadges >= totalAvailableBadges;
    }

    return {
      badge: badge as Badge,
      earned,
      progress: {
        current: Math.min(current, target),
        target,
        percentage: target > 0 ? Math.min((current / target) * 100, 100) : 0,
      },
    };
  });
}

// Função principal para verificar todos os badges
export function checkAllBadges(studentStats: {
  totalActivities: number;
  perfectScores: number;
  fastCompletions: number;
  noHintCompletions: number;
  currentStreak: number;
  subjectCounts: Record<string, number>;
  totalBadges: number;
  earnedBadgeNames: string[];
}): BadgeCheckResult[] {
  const results: BadgeCheckResult[] = [];

  // Check progress badges
  results.push(...checkProgressBadges(studentStats.totalActivities));

  // Check achievement badges
  results.push(
    ...checkAchievementBadges(
      studentStats.perfectScores,
      studentStats.fastCompletions,
      studentStats.noHintCompletions
    )
  );

  // Check streak badges
  results.push(...checkStreakBadges(studentStats.currentStreak));

  // Check mastery badges
  results.push(...checkMasteryBadges(studentStats.subjectCounts));

  // Check special badges
  const isFirstBadge =
    studentStats.totalBadges === 0 &&
    results.some(
      (r) => r.earned && !studentStats.earnedBadgeNames.includes(r.badge.name)
    );
  results.push(...checkSpecialBadges(studentStats.totalBadges, isFirstBadge));

  return results;
}

// Função para calcular pontos totais dos badges
export function calculateTotalBadgePoints(badges: Badge[]): number {
  return badges.reduce((total, badge) => total + badge.points, 0);
}

// Função para obter badges recém-conquistados
export function getNewlyEarnedBadges(
  allResults: BadgeCheckResult[],
  previouslyEarnedBadges: string[]
): Badge[] {
  return allResults
    .filter(
      (result) =>
        result.earned && !previouslyEarnedBadges.includes(result.badge.name)
    )
    .map((result) => result.badge);
}
