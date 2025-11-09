"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Eye, EyeOff, Mail, Lock, ArrowRight, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfessorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useAuth();
  const router = useRouter();

  // Se já está logado, redirecionar
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos! 📝");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast.success("Login realizado com sucesso! 🎉");
        router.push("/dashboard");
      } else {
        toast.error(result.error || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro inesperado. Tente novamente!");
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-4xl">⏰</div>
      </div>
    );
  }

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
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>👨‍🏫✨</div>
              <h1
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "var(--text-primary)",
                  marginBottom: "16px",
                }}
              >
                Área do Professor
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  color: "var(--text-secondary)",
                }}
              >
                Entre com suas credenciais para acessar o painel
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
                      htmlFor="email"
                      style={{
                        display: "block",
                        fontWeight: "500",
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      Email
                    </label>
                    <div style={{ position: "relative" }}>
                      <Mail
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
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="professor@escola.com"
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
                          e.target.style.borderColor = "var(--primary-blue)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(66, 133, 244, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--border-light)";
                          e.target.style.boxShadow = "none";
                        }}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      style={{
                        display: "block",
                        fontWeight: "500",
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      Senha
                    </label>
                    <div style={{ position: "relative" }}>
                      <Lock
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
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{
                          width: "100%",
                          paddingLeft: "44px",
                          paddingRight: "44px",
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
                          e.target.style.borderColor = "var(--primary-blue)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(66, 133, 244, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--border-light)";
                          e.target.style.boxShadow = "none";
                        }}
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          color: "var(--text-muted)",
                          cursor: "pointer",
                          padding: "4px",
                          borderRadius: "4px",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLButtonElement).style.color =
                            "var(--text-secondary)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLButtonElement).style.color =
                            "var(--text-muted)")
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !email.trim() || !password.trim()}
                    className="btn btn-primary btn-large"
                    style={{ width: "100%" }}
                  >
                    {isLoading ? (
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
                        Entrar
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
                    Não tem uma conta?
                  </p>
                  <Link
                    href="/cadastro/professor"
                    style={{
                      color: "var(--primary-blue)",
                      textDecoration: "none",
                      fontWeight: "500",
                      fontSize: "14px",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "#3367d6")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--primary-blue)")
                    }
                  >
                    Criar conta de professor
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
                    Você é estudante?
                  </p>
                  <Link
                    href="/login/estudante"
                    style={{
                      color: "var(--primary-green)",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "color 0.2s ease",
                    }}
                  >
                    Acesso para Estudantes
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
