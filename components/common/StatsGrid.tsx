"use client";

interface StatsCardData {
  title: string;
  value: string | number;
  subtitle: string;
  emoji: string;
  color?: string;
}

interface StatsGridProps {
  title?: string;
  stats: StatsCardData[];
  className?: string;
  columns?: number;
}

export const StatsGrid = ({
  title,
  stats,
  className = "",
  columns,
}: StatsGridProps) => {
  const gridColumns = columns
    ? `repeat(${columns}, 1fr)`
    : "repeat(auto-fit, minmax(200px, 1fr))";

  return (
    <div className={`${className}`} style={{ marginBottom: "60px" }}>
      {title && (
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "var(--text-primary)",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          {title}
        </h2>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridColumns,
          gap: "24px",
        }}
      >
        {stats.map((stat, index) => (
          <div key={`${stat.title}-${index}`} className="card">
            <div
              className="card-content"
              style={{ textAlign: "center", padding: "32px 24px" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                {stat.emoji}
              </div>

              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: stat.color || "var(--text-primary)",
                  marginBottom: "8px",
                }}
              >
                {stat.value}
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                }}
              >
                {stat.title}
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: "var(--text-muted)",
                }}
              >
                {stat.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
