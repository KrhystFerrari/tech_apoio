"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import {
  ProfessorSignupForm,
  SignupLinks,
  ProfessorFormData,
} from "@/components";

export default function CadastroProfessor() {
  const [formData, setFormData] = useState<ProfessorFormData>({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    especializacao: "",
    instituicao: "",
  });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    // Validações
    if (
      !formData.nome ||
      !formData.email ||
      !formData.senha ||
      !formData.confirmarSenha
    ) {
      setErro("Todos os campos obrigatórios devem ser preenchidos");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    if (formData.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErro("E-mail inválido");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch("/api/auth/cadastro/professor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          especializacao: formData.especializacao,
          instituicao: formData.instituicao,
        }),
      });

      if (response.ok) {
        router.push("/login/professor?cadastro=sucesso");
      } else {
        const errorData = await response.json();
        setErro(errorData.error || "Erro no cadastro");
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setCarregando(false);
    }
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
          <div style={{ maxWidth: "500px", margin: "0 auto" }}>
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
                Cadastro de Professor
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  color: "var(--text-secondary)",
                }}
              >
                Crie sua conta para começar a ensinar
              </p>
            </div>

            {/* Card do formulário */}
            <div className="card">
              <div className="card-content" style={{ padding: "40px" }}>
                <ProfessorSignupForm
                  formData={formData}
                  erro={erro}
                  carregando={carregando}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />

                <SignupLinks
                  userType="professor"
                  loginUrl="/login/professor"
                  alternateLoginUrl="/login/estudante"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
