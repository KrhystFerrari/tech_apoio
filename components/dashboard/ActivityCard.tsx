"use client";

import { Star } from "lucide-react";

interface Activity {
  subject: string;
  activity: string;
  score: number;
  time: string;
  emoji: string;
}

interface ActivityCardProps {
  activity: Activity;
  index: number;
  onStart?: () => void;
  className?: string;
}

export const ActivityCard = ({
  activity,
  index,
  onStart,
  className = "",
}: ActivityCardProps) => {
  const getScoreBackground = () => {
    let bgColor = "#f3f4f6"; // Cinza claro para não iniciado
    if (activity.score >= 90) {
      bgColor = "#dcfce7"; // Verde claro
    } else if (activity.score >= 80) {
      bgColor = "#fef3c7"; // Amarelo claro
    } else if (activity.score > 0) {
      bgColor = "#fee2e2"; // Vermelho claro
    }
    return bgColor;
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        background: index % 2 === 0 ? "var(--gray-50)" : "white",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-light)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ fontSize: "32px" }}>{activity.emoji}</div>
        <div>
          <div
            style={{
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "4px",
            }}
          >
            {activity.activity}
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "var(--text-muted)",
            }}
          >
            {activity.subject} • ⏱️ {activity.time}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: getScoreBackground(),
            padding: "6px 12px",
            borderRadius: "var(--radius-md)",
          }}
        >
          <Star
            className="w-4 h-4"
            style={{
              color: activity.score > 0 ? "#ffc107" : "#9ca3af",
            }}
          />
          <span
            style={{
              fontWeight: "600",
              color: "var(--text-primary)",
            }}
          >
            {activity.score > 0 ? `${activity.score}%` : "Novo"}
          </span>
        </div>

        <button className="btn btn-small btn-outline" onClick={onStart}>
          🎮 Começar Agora
        </button>
      </div>
    </div>
  );
};
