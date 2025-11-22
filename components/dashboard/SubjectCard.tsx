"use client";

import { Play, LucideIcon } from "lucide-react";

interface Subject {
  icon: LucideIcon;
  title: string;
  description: string;
  progress: number;
  color: "blue" | "green" | "purple" | "orange";
  lessons: number;
  completed: number;
  stars: number;
  emoji: string;
}

interface SubjectCardProps {
  subject: Subject;
  onPlay?: () => void;
  className?: string;
}

export const SubjectCard = ({
  subject,
  onPlay,
  className = "",
}: SubjectCardProps) => {
  const getProgressColor = () => {
    if (subject.color === "blue") return "var(--primary-blue)";
    if (subject.color === "green") return "var(--primary-green)";
    if (subject.color === "purple") return "var(--primary-purple)";
    return "var(--primary-orange)";
  };

  return (
    <div className={`card card-interactive ${className}`}>
      <div className="card-content">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            className={`feature-icon ${subject.color}`}
            style={{ margin: "0 auto 16px" }}
          >
            <subject.icon className="w-8 h-8" />
          </div>
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>
            {subject.emoji}
          </div>
        </div>

        <h3
          className="feature-title"
          style={{ textAlign: "center", marginBottom: "8px" }}
        >
          {subject.title}
        </h3>

        <p
          className="feature-description"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          {subject.description}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            🎯 Progresso
          </span>
          <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>
            {subject.progress}%
          </span>
        </div>

        <div
          style={{
            width: "100%",
            height: "8px",
            background: "var(--gray-200)",
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: `${subject.progress}%`,
              height: "100%",
              background: getProgressColor(),
              borderRadius: "20px",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            fontSize: "14px",
            color: "var(--text-muted)",
          }}
        >
          <span>
            🎮 {subject.completed}/{subject.lessons} jogos
          </span>
          <span>⭐ {subject.stars} estrelas</span>
        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          onClick={onPlay}
        >
          <Play className="w-4 h-4" />
          🚀 Continuar Aventura!
        </button>
      </div>
    </div>
  );
};
