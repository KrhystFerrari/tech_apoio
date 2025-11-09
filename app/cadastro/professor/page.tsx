"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Mail,
  Lock,
  User,
  Building,
  GraduationCap,
} from "lucide-react";

export default function CadastroProfessor() {
  const [formData, setFormData] = useState({
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
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
                {erro && (
                  <div
                    style={{
                      padding: "16px 20px",
                      marginBottom: "24px",
                      backgroundColor: "#fee2e2",
                      color: "#dc2626",
                      borderRadius: "12px",
                      fontSize: "14px",
                      border: "1px solid #fecaca",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>⚠️</span>
                    {erro}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  {/* Nome completo */}
                  <div>
                    <label
                      htmlFor="nome"
                      style={{
                        display: "block",
                        fontWeight: "500",
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      Nome Completo *
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
                        id="nome"
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Digite seu nome completo"
                        required
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
                      />
                    </div>
                  </div>

                  {/* E-mail */}
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
                      E-mail *
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
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="professor@escola.com"
                        required
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
                      />
                    </div>
                  </div>

                  {/* Senhas */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <label
                        htmlFor="senha"
                        style={{
                          display: "block",
                          fontWeight: "500",
                          color: "var(--text-primary)",
                          marginBottom: "8px",
                        }}
                      >
                        Senha *
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
                          id="senha"
                          type="password"
                          name="senha"
                          value={formData.senha}
                          onChange={handleChange}
                          placeholder="••••••••"
                          required
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
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmarSenha"
                        style={{
                          display: "block",
                          fontWeight: "500",
                          color: "var(--text-primary)",
                          marginBottom: "8px",
                        }}
                      >
                        Confirmar Senha *
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
                          id="confirmarSenha"
                          type="password"
                          name="confirmarSenha"
                          value={formData.confirmarSenha}
                          onChange={handleChange}
                          placeholder="••••••••"
                          required
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
                        />
                      </div>
                    </div>
                  </div>

                  {/* Especialização */}
                  <div>
                    <label
                      htmlFor="especializacao"
                      style={{
                        display: "block",
                        fontWeight: "500",
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      Especialização
                    </label>
                    <div style={{ position: "relative" }}>
                      <GraduationCap
                        className="w-5 h-5"
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--text-muted)",
                        }}
                      />
                      <select
                        id="especializacao"
                        name="especializacao"
                        value={formData.especializacao}
                        onChange={handleChange}
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
                      >
                        <option value="">Selecione uma área</option>
                        <option value="matematica">Matemática</option>
                        <option value="portugues">Português</option>
                        <option value="ciencias">Ciências</option>
                        <option value="historia">História</option>
                        <option value="geografia">Geografia</option>
                        <option value="fisica">Física</option>
                        <option value="quimica">Química</option>
                        <option value="biologia">Biologia</option>
                        <option value="ingles">Inglês</option>
                        <option value="arte">Arte</option>
                        <option value="educacao_fisica">Educação Física</option>
                        <option value="tecnologia">Tecnologia</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>
                  </div>

                  {/* Instituição */}
                  <div>
                    <label
                      htmlFor="instituicao"
                      style={{
                        display: "block",
                        fontWeight: "500",
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                      }}
                    >
                      Instituição de Ensino
                    </label>
                    <div style={{ position: "relative" }}>
                      <Building
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
                        id="instituicao"
                        type="text"
                        name="instituicao"
                        value={formData.instituicao}
                        onChange={handleChange}
                        placeholder="Nome da escola ou universidade"
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
                      />
                    </div>
                  </div>

                  {/* Botão de cadastro */}
                  <button
                    type="submit"
                    disabled={carregando}
                    className="btn btn-primary btn-large"
                    style={{ width: "100%" }}
                  >
                    {carregando ? "Criando conta..." : "Criar Conta"}
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
                    Já tem uma conta?
                  </p>
                  <Link
                    href="/login/professor"
                    style={{
                      color: "var(--primary-blue)",
                      textDecoration: "none",
                      fontWeight: "500",
                      fontSize: "14px",
                      transition: "color 0.2s ease",
                    }}
                  >
                    Fazer login como professor
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
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      fontSize: "12px",
                      transition: "color 0.2s ease",
                    }}
                  >
                    Entrar como estudante
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
