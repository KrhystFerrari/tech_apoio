// Union type para os diferentes tipos de dados de relatório
export type ReportDataContent =
  | StudentProgressReport
  | ClassOverviewReport
  | SubjectPerformanceReport
  | ActivityAnalyticsReport
  | EngagementReport;

export interface ReportData {
  id: string;
  title: string;
  description?: string;
  type: ReportType;
  data: ReportDataContent;
  period: string;
  createdAt: Date;
  teacherId: string;
  studentId?: string;
  subjectId?: string;
}

export enum ReportType {
  STUDENT_PROGRESS = "STUDENT_PROGRESS",
  CLASS_OVERVIEW = "CLASS_OVERVIEW",
  SUBJECT_PERFORMANCE = "SUBJECT_PERFORMANCE",
  ACTIVITY_ANALYTICS = "ACTIVITY_ANALYTICS",
  ENGAGEMENT_REPORT = "ENGAGEMENT_REPORT",
}

export interface StudentProgressReport {
  studentId: string;
  studentName: string;
  totalActivities: number;
  completedActivities: number;
  averageScore: number;
  totalTime: number;
  badgesEarned: number;
  subjectProgress: {
    subjectName: string;
    activities: number;
    averageScore: number;
    timeSpent: number;
  }[];
  recentActivities: {
    activityName: string;
    subject: string;
    score: number;
    timeSpent: number;
    completedAt: Date;
  }[];
  strengths: string[];
  improvements: string[];
}

export interface ClassOverviewReport {
  className: string;
  totalStudents: number;
  activeStudents: number; // Estudantes ativos na última semana
  totalActivitiesCompleted: number;
  averageClassScore: number;
  totalClassTime: number;
  topPerformers: {
    studentId: string;
    studentName: string;
    score: number;
  }[];
  strugglingStudents: {
    studentId: string;
    studentName: string;
    issuesCount: number;
  }[];
  subjectPerformance: {
    subject: string;
    completionRate: number;
    averageScore: number;
    engagement: number;
  }[];
  weeklyProgress: {
    week: string;
    activitiesCompleted: number;
    averageScore: number;
    activeStudents: number;
  }[];
}

export interface SubjectPerformanceReport {
  subjectName: string;
  totalActivities: number;
  completedActivities: number;
  averageScore: number;
  completionRate: number;
  timeSpent: number;
  difficultyAnalysis: {
    level: string;
    completionRate: number;
    averageScore: number;
    timeSpent: number;
  }[];
  activityPerformance: {
    activityName: string;
    attempts: number;
    completionRate: number;
    averageScore: number;
    averageTime: number;
  }[];
  studentPerformance: {
    studentName: string;
    activitiesCompleted: number;
    averageScore: number;
    timeSpent: number;
  }[];
}

export interface ActivityAnalyticsReport {
  activityName: string;
  subject: string;
  totalAttempts: number;
  uniqueStudents: number;
  completionRate: number;
  averageScore: number;
  averageTime: number;
  difficulty: string;
  commonMistakes: {
    mistake: string;
    frequency: number;
  }[];
  performanceByDifficulty: {
    level: number;
    attempts: number;
    completionRate: number;
    averageScore: number;
  }[];
  timeDistribution: {
    timeRange: string; // "0-30s", "30s-1m", etc.
    count: number;
    percentage: number;
  }[];
}

export interface EngagementReport {
  period: string;
  totalSessions: number;
  totalTime: number;
  averageSessionTime: number;
  dailyActivity: {
    date: string;
    sessions: number;
    timeSpent: number;
    uniqueStudents: number;
  }[];
  peakUsageHours: {
    hour: number;
    sessions: number;
  }[];
  studentEngagement: {
    studentName: string;
    sessions: number;
    totalTime: number;
    lastActivity: Date;
    engagementScore: number; // 0-100
  }[];
  subjectEngagement: {
    subject: string;
    sessions: number;
    timeSpent: number;
    completionRate: number;
  }[];
}

export interface ReportCardProps {
  report: ReportData;
  onView: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

export interface ReportGeneratorProps {
  onGenerate: (type: ReportType, filters: ReportFilters) => void;
  loading?: boolean;
}

export interface ReportFilters {
  startDate: Date;
  endDate: Date;
  studentIds?: string[];
  subjectIds?: string[];
  activityIds?: string[];
}

export interface ReportsListProps {
  reports: ReportData[];
  loading?: boolean;
  onViewReport: (report: ReportData) => void;
  onGenerateReport: () => void;
}
