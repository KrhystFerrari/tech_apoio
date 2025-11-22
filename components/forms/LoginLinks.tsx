import Link from "next/link";

export interface LoginLinksProps {
  readonly userType: "professor" | "estudante";
  readonly signupUrl: string;
  readonly alternateLoginUrl: string;
  readonly alternateLoginLabel: string;
  readonly className?: string;
}

export function LoginLinks({
  userType,
  signupUrl,
  alternateLoginUrl,
  alternateLoginLabel,
  className = "",
}: LoginLinksProps) {
  return (
    <div className={className}>
      {/* Signup Link */}
      <div
        style={{
          textAlign: "center",
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid var(--border-light)",
        }}
      >
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "12px",
            fontSize: "14px",
          }}
        >
          Não tem uma conta?
        </p>
        <Link
          href={signupUrl}
          style={{
            color: "var(--primary-blue)",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "14px",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "#3367d6")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color =
              "var(--primary-blue)")
          }
        >
          {userType === "professor"
            ? "Criar conta de professor"
            : "Criar conta de estudante"}
        </Link>
      </div>

      {/* Alternate Login */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "8px",
            fontSize: "12px",
          }}
        >
          {userType === "professor" ? "Você é estudante?" : "Você é professor?"}
        </p>
        <Link
          href={alternateLoginUrl}
          style={{
            color: "var(--primary-green)",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500",
            transition: "color 0.2s ease",
          }}
        >
          {alternateLoginLabel}
        </Link>
      </div>

      {/* Back to Login Options */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link
          href="/login"
          style={{
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "12px",
            transition: "color 0.2s ease",
          }}
        >
          ← Voltar às opções de login
        </Link>
      </div>
    </div>
  );
}
