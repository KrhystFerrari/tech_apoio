"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ArrowRight, User, Calendar, BookOpen } from "lucide-react";

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
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  <div>
                    <label
                      htmlFor="name"
                      style={{
                        display: "block",
                        fontWeight: "500",
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      Seu Nome
                    </label>
                    <div style={{ position: "relative" }}>
                      <User
                        className="w-5 h-5"
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--text-muted)",
                        }}
                      />
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite seu nome completo"
                        style={{
                          width: "100%",
                          paddingLeft: "44px",
                          paddingRight: "16px",
                          paddingTop: "14px",
                          paddingBottom: "14px",
                          border: "1px solid var(--border-light)",
                          borderRadius: "var(--radius-md)",
                          fontFamily: "inherit",
                          fontSize: "16px",
                          transition: "all 0.2s ease",
                          backgroundColor: "white",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--primary-green)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(52, 168, 83, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--border-light)";
                          e.target.style.boxShadow = "none";
                        }}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="age"
                      style={{
                        display: "block",
                        fontWeight: "500",
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      Sua Idade
                    </label>
                    <div style={{ position: "relative" }}>
                      <Calendar
                        className="w-5 h-5"
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--text-muted)",
                        }}
                      />
                      <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Ex: 8"
                        min="5"
                        max="18"
                        style={{
                          width: "100%",
                          paddingLeft: "44px",
                          paddingRight: "16px",
                          paddingTop: "14px",
                          paddingBottom: "14px",
                          border: "1px solid var(--border-light)",
                          borderRadius: "var(--radius-md)",
                          fontFamily: "inherit",
                          fontSize: "18px",
                          textAlign: "center",
                          transition: "all 0.2s ease",
                          backgroundColor: "white",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--primary-green)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(52, 168, 83, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--border-light)";
                          e.target.style.boxShadow = "none";
                        }}
                        required
                        disabled={loading}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-muted)",
                        marginTop: "8px",
                        textAlign: "center",
                      }}
                    >
                      Digite quantos anos você tem
                    </p>
                  </div>

                  {error && (
                    <div
                      style={{
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        borderRadius: "var(--radius-md)",
                        padding: "12px",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          color: "#dc2626",
                          fontSize: "14px",
                          margin: "0",
                        }}
                      >
                        {error}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !name.trim() || !age.trim()}
                    className="btn btn-primary btn-large"
                    style={{
                      width: "100%",
                      background: "var(--primary-green)",
                      border: "none",
                    }}
                    onMouseEnter={(e) => {
                      const button = e.currentTarget as HTMLButtonElement;
                      if (!button.disabled) {
                        button.style.background = "#2d7d42";
                      }
                    }}
                    onMouseLeave={(e) => {
                      const button = e.currentTarget as HTMLButtonElement;
                      if (!button.disabled) {
                        button.style.background = "var(--primary-green)";
                      }
                    }}
                  >
                    {loading ? (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className="spinner"
                          style={{ marginRight: "8px" }}
                        ></div>
                        Entrando...
                      </span>
                    ) : (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Entrar na Aventura
                        <ArrowRight
                          className="w-5 h-5"
                          style={{ marginLeft: "8px" }}
                        />
                      </span>
                    )}
                  </button>
                </form>

                {/* Footer */}
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
