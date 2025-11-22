export interface RankingEntry {
  id: string;
  position: number;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  points: number;
  totalActivities: number;
  totalBadges: number;
  lastActivity?: Date;
  trend?: "up" | "down" | "stable";
  previousPosition?: number;
}

export interface LeaderboardData {
  id: string;
  period: RankingPeriod;
  subjectId?: string;
  subjectName?: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  rankings: RankingEntry[];
}

export enum RankingPeriod {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
  ALL_TIME = "ALL_TIME",
}

export interface LeaderboardProps {
  leaderboardData: LeaderboardData;
  currentStudentId?: string;
  showSubjectFilter?: boolean;
  showPeriodFilter?: boolean;
  maxEntries?: number;
  className?: string;
}

export interface RankingCardProps {
  entry: RankingEntry;
  isCurrentUser?: boolean;
  showTrend?: boolean;
  size?: "sm" | "md" | "lg";
}

export interface RankingFiltersProps {
  selectedPeriod: RankingPeriod;
  selectedSubject?: string;
  subjects: { id: string; name: string }[];
  onPeriodChange: (period: RankingPeriod) => void;
  onSubjectChange: (subjectId?: string) => void;
}
