"use client";

interface WelcomeSectionProps {
  title: string;
  subtitle?: string;
  emoji: string;
  userName?: string;
  badge?: {
    text: string;
    icon?: React.ReactNode;
    color?: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export const WelcomeSection = ({
  title,
  subtitle,
  emoji,
  userName,
  badge,
  className = "",
  children,
}: WelcomeSectionProps) => {
  const getPersonalizedTitle = () => {
    if (userName) {
      return title.replace("{name}", userName);
    }
    return title;
  };

  return (
    <div
      className={className}
      style={{
        textAlign: "center",
        marginBottom: "60px",
        background: "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
        padding: "40px",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--border-light)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "48px",
          opacity: 0.1,
          animation: "float 4s ease-in-out infinite",
        }}
      >
        ✨
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          fontSize: "40px",
          opacity: 0.1,
          animation: "float 3s ease-in-out infinite reverse",
        }}
      >
        🌟
      </div>

      <div style={{ fontSize: "64px", marginBottom: "20px" }}>{emoji}</div>

      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "var(--text-primary)",
          marginBottom: "8px",
        }}
      >
        {getPersonalizedTitle()}
      </h1>

      {subtitle && (
        <p
          style={{
            fontSize: "18px",
            color: "var(--text-secondary)",
            marginBottom: badge || children ? "20px" : "0",
          }}
        >
          {subtitle}
        </p>
      )}

      {badge && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "16px",
            background: badge.color || "white",
            padding: "12px 24px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-sm)",
            marginBottom: children ? "20px" : "0",
          }}
        >
          {badge.icon && <span style={{ fontSize: "20px" }}>{badge.icon}</span>}
          <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>
            {badge.text}
          </span>
        </div>
      )}

      {children}
    </div>
  );
};
