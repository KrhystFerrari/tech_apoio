"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { LoginForm, LoginLinks } from "@/components";

export default function ProfessorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
                <LoginForm
                  email={email}
                  password={password}
                  isLoading={isLoading}
                  onEmailChange={setEmail}
                  onPasswordChange={setPassword}
                  onSubmit={handleSubmit}
                />

                <LoginLinks
                  userType="professor"
                  signupUrl="/cadastro/professor"
                  alternateLoginUrl="/login/estudante"
                  alternateLoginLabel="Acesso para Estudantes"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
