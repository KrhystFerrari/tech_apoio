"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { BookOpen } from "lucide-react";
import { StudentLoginForm } from "@/components";

export default function StudentLoginPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { studentLogin } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await studentLogin(name, age);

    if (result.success) {
      router.push("/dashboard/estudante");
    } else {
      setError(result.error || "Erro no login");
    }

    setLoading(false);
  };

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      {/* Header simplificado */}
      <header className="header-logiclike">
        <div className="container-logiclike">
          <div className="header-content">
            <Link href="/" className="logo-logiclike">
              <div className="logo-icon">
                <BookOpen className="w-6 h-6" />
              </div>
              TechApoio
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div
        style={{
          background: "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          padding: "60px 0",
        }}
      >
        <div className="container-logiclike">
          <div style={{ maxWidth: "480px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>👨‍🎓🎮</div>
              <h1
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "var(--text-primary)",
                  marginBottom: "16px",
                }}
              >
                Olá, estudante!
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  color: "var(--text-secondary)",
                }}
              >
                Digite suas informações para entrar na aventura
              </p>
            </div>

            {/* Form Card */}
            <div className="card">
              <div className="card-content" style={{ padding: "40px" }}>
                <StudentLoginForm
                  name={name}
                  age={age}
                  error={error}
                  loading={loading}
                  onNameChange={setName}
                  onAgeChange={setAge}
                  onSubmit={handleSubmit}
                />

                {/* Footer Links */}
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
                    Primeira vez aqui?
                  </p>
                  <Link
                    href="/cadastro/estudante"
                    style={{
                      color: "var(--primary-green)",
                      textDecoration: "none",
                      fontWeight: "500",
                      fontSize: "14px",
                      transition: "color 0.2s ease",
                    }}
                  >
                    Pedir ajuda ao professor
                  </Link>
                </div>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      marginBottom: "8px",
                      fontSize: "12px",
                    }}
                  >
                    Você é professor?
                  </p>
                  <Link
                    href="/login/professor"
                    style={{
                      color: "var(--primary-blue)",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "color 0.2s ease",
                    }}
                  >
                    Acesso para Professores
                  </Link>
                </div>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
