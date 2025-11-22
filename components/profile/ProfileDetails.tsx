"use client";

import { User, Mail } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface ProfileDetailsProps {
  user: User;
  className?: string;
}

export const ProfileDetails = ({
  user,
  className = "",
}: ProfileDetailsProps) => {
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
          📋 Informações do Perfil
        </h2>

        <div
          style={{
            display: "grid",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              background: "var(--gray-50)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                background: "var(--primary-blue)",
                borderRadius: "50%",
                color: "white",
              }}
            >
              <Mail className="w-5 h-5" />
            </div>

            <div>
              <div
                style={{
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  marginBottom: "4px",
                }}
              >
                📧 Email
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                }}
              >
                {user.email}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              background: "var(--gray-50)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                background: "var(--primary-green)",
                borderRadius: "50%",
                color: "white",
              }}
            >
              <User className="w-5 h-5" />
            </div>

            <div>
              <div
                style={{
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  marginBottom: "4px",
                }}
              >
                🆔 ID do Usuário
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                  fontFamily: "monospace",
                }}
              >
                {user.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
