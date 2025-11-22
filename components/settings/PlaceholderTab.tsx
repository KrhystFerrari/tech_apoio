export interface PlaceholderTabProps {
  readonly title: string;
  readonly emoji: string;
  readonly description: string;
  readonly className?: string;
}

export function PlaceholderTab({
  title,
  emoji,
  description,
  className = "",
}: PlaceholderTabProps) {
  return (
    <div className={`card ${className}`}>
      <div className="card-content">
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "var(--text-primary)",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {title}
        </h2>

        <div
          style={{
            textAlign: "center",
            padding: "48px",
            color: "var(--text-muted)",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>{emoji}</div>
          <p>{description}</p>
          <p>Mais opções estarão disponíveis em breve! ✨</p>
        </div>
      </div>
    </div>
  );
}
