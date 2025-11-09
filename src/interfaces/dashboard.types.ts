import React from "react";

export interface Subject {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  progress: number;
  color: string;
  lessons: number;
  completed: number;
  stars: number;
  emoji: string;
}

export interface StatsData {
  title: string;
  value: string;
  subtitle: string;
  emoji: string;
}