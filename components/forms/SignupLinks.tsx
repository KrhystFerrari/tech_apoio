import Link from "next/link";

export interface SignupLinksProps {
  readonly userType: "professor" | "estudante";
  readonly loginUrl: string;
  readonly alternateLoginUrl: string;
  readonly className?: string;
}

export function SignupLinks({
  userType,
  loginUrl,
  alternateLoginUrl,
  className = "",
}: SignupLinksProps) {
  return (
    <div className={className}>
      {/* Login Link */}
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
          Já tem uma conta?
        </p>
        <Link
          href={loginUrl}
          style={{
            color: "var(--primary-blue)",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "14px",
            transition: "color 0.2s ease",
          }}
        >
          {userType === "professor"
            ? "Fazer login como professor"
            : "Fazer login como estudante"}
        </Link>
      </div>

      {/* Alternate User Type */}
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
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "12px",
            transition: "color 0.2s ease",
          }}
        >
          {userType === "professor"
            ? "Entrar como estudante"
            : "Entrar como professor"}
        </Link>
      </div>
    </div>
  );
}
