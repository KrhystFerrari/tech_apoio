export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  requirement: string;
  points: number;
  rarity: BadgeRarity;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentBadge {
  id: string;
  studentId: string;
  badgeId: string;
  earnedAt: Date;
  badge: Badge;
}

export enum BadgeCategory {
  PROGRESS = "PROGRESS",
  ACHIEVEMENT = "ACHIEVEMENT",
  STREAK = "STREAK",
  MASTERY = "MASTERY",
  SPECIAL = "SPECIAL",
}

export enum BadgeRarity {
  COMMON = "COMMON",
  RARE = "RARE",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY",
}

export interface BadgeProgress {
  badgeId: string;
  currentValue: number;
  targetValue: number;
  percentage: number;
}

export interface BadgesDisplayProps {
  badges: StudentBadge[];
  availableBadges?: Badge[];
  showProgress?: boolean;
  className?: string;
}

export interface BadgeCardProps {
  badge: Badge;
  isEarned?: boolean;
  earnedAt?: Date;
  progress?: BadgeProgress;
  size?: "sm" | "md" | "lg";
}

export interface BadgeNotificationProps {
  badge: Badge;
  onClose: () => void;
}

export interface BadgeSystemContextType {
  studentBadges: StudentBadge[];
  availableBadges: Badge[];
  loading: boolean;
  checkBadgeProgress: (activity: string, score: number) => Promise<Badge[]>;
  refreshBadges: () => Promise<void>;
}
