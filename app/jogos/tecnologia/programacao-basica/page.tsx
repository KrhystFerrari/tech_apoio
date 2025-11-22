"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ProgramacaoGame } from "@/components/games/ProgramacaoGame";
import { ArrowLeft, Trophy, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ClientOnly } from "@/lib/components/ClientOnly";

// Header Component
const Header = () => {
  return (
    <header className="header-logiclike">
      <div className="container-logiclike">
        <div className="header-content">
          <Link href="/dashboard/estudante" className="logo-logiclike">
            <div className="logo-icon">
              <BookOpen className="w-6 h-6" />
            </div>
            TechApoio
          </Link>

          <nav className="nav-logiclike">
            <Link href="/jogos/tecnologia" className="nav-link">
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Jogos
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => (
  <footer className="footer-logiclike">
    <div className="container-logiclike">
      <div className="footer-content">
        <div className="footer-brand">
          <Link href="/inicio" className="footer-logo">
            <div className="logo-icon">
              <BookOpen className="w-6 h-6" />
            </div>
            TechApoio
          </Link>
          <p className="footer-description">
            A melhor plataforma educativa para crianças de 6 a 10 anos.
            Aprendizado divertido através de jogos interativos e atividades
            lúdicas.
          </p>
        </div>
        <div className="footer-column">
          <h4 className="footer-title">🎮 Para Estudantes</h4>
          <Link href="/dashboard/estudante" className="footer-link">
            🏠 Minha Área
          </Link>
          <Link href="#" className="footer-link">
            💻 Tecnologia Legal
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copyright">
          © 2025 TechApoio. Feito com 💜 para escolas e crianças do Brasil! 🇧🇷
        </div>
      </div>
    </div>
  </footer>
);

export default function ProgramacaoBasicaPage() {
  const { student, loading } = useAuth();
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !student) {
      router.push("/login/estudante");
    }
  }, [student, loading, router]);

  const handleGameComplete = (score: number) => {
    setFinalScore(score);
  };

  const handleRestart = () => {
    setGameStarted(false);
    setFinalScore(null);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando jogo...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  if (!gameStarted) {
    return (
      <div className="bg-white min-h-screen" suppressHydrationWarning={true}>
        <ClientOnly>
          <Header />
        </ClientOnly>

        <main className="main-content">
          <div className="container-logiclike">
            {/* Hero Section */}
            <section className="section-spacing">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "var(--radius-xl)",
                    padding: "3rem 2rem",
                    textAlign: "center",
                    color: "white",
                    marginBottom: "3rem",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ fontSize: "4rem", marginBottom: "1.5rem" }}
                  >
                    🤖
                  </motion.div>
                  <h1
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "700",
                      marginBottom: "1rem",
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    Programação Básica
                  </h1>
                  <p
                    style={{
                      fontSize: "1.25rem",
                      opacity: 0.9,
                      maxWidth: "600px",
                      margin: "0 auto",
                    }}
                  >
                    Aprenda os conceitos fundamentais de programação ajudando um
                    robô a navegar até sua meta usando comandos simples!
                  </p>
                </div>
              </motion.div>
            </section>

            {/* Game Features */}
            <section className="section-spacing">
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    marginBottom: "1rem",
                  }}
                >
                  ✨ O que você vai aprender
                </h2>
              </div>

              <div className="features-grid">
                <motion.div
                  className="card card-interactive"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="card-content" style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                        fontSize: "2rem",
                      }}
                    >
                      🎯
                    </div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#1a1a1a",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Objetivos Claros
                    </h3>
                    <p style={{ color: "#666666", fontSize: "1rem" }}>
                      Cada nível tem um objetivo específico para alcançar
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="card card-interactive"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="card-content" style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          "linear-gradient(135deg, #55a3ff 0%, #003d82 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                        fontSize: "2rem",
                      }}
                    >
                      🧩
                    </div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#1a1a1a",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Lógica Sequencial
                    </h3>
                    <p style={{ color: "#666666", fontSize: "1rem" }}>
                      Aprenda a criar sequências lógicas de comandos
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="card card-interactive"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="card-content" style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          "linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                        fontSize: "2rem",
                      }}
                    >
                      💡
                    </div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#1a1a1a",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Resolução de Problemas
                    </h3>
                    <p style={{ color: "#666666", fontSize: "1rem" }}>
                      Desenvolva habilidades de pensamento computacional
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Instructions */}
            <section className="section-spacing">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card"
                style={{ maxWidth: "800px", margin: "0 auto" }}
              >
                <div className="card-content">
                  <h3
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      marginBottom: "1.5rem",
                      textAlign: "center",
                    }}
                  >
                    📋 Como Jogar:
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: "1.5rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 1rem",
                          color: "white",
                          fontWeight: "700",
                          fontSize: "1.5rem",
                        }}
                      >
                        1
                      </div>
                      <p style={{ color: "#666666", fontSize: "0.95rem" }}>
                        Escolha comandos da lista disponível
                      </p>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 1rem",
                          color: "white",
                          fontWeight: "700",
                          fontSize: "1.5rem",
                        }}
                      >
                        2
                      </div>
                      <p style={{ color: "#666666", fontSize: "0.95rem" }}>
                        Monte uma sequência para levar o robô até a estrela
                      </p>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 1rem",
                          color: "white",
                          fontWeight: "700",
                          fontSize: "1.5rem",
                        }}
                      >
                        3
                      </div>
                      <p style={{ color: "#666666", fontSize: "0.95rem" }}>
                        Clique em &quot;Executar&quot; para ver o robô seguir
                        seus comandos
                      </p>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 1rem",
                          color: "white",
                          fontWeight: "700",
                          fontSize: "1.5rem",
                        }}
                      >
                        4
                      </div>
                      <p style={{ color: "#666666", fontSize: "0.95rem" }}>
                        Use dicas quando precisar de ajuda!
                      </p>
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setGameStarted(true)}
                      className="btn btn-primary btn-large"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        fontSize: "1.25rem",
                        padding: "1rem 2rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      🚀 Começar Aventura
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen" suppressHydrationWarning={true}>
      <ClientOnly>
        <Header />
      </ClientOnly>

      <main className="main-content">
        <div className="container-logiclike">
          {/* Game Header */}
          <section style={{ padding: "2rem 0 1rem" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem 2rem",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "700",
                    marginBottom: "0.25rem",
                  }}
                >
                  🤖 Programação Básica
                </h1>
                <p style={{ opacity: 0.9, margin: 0 }}>
                  Ajude o robô a chegar até a estrela!
                </p>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                {finalScore !== null && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "rgba(255,255,255,0.2)",
                      padding: "0.5rem 1rem",
                      borderRadius: "var(--radius-lg)",
                    }}
                  >
                    <Trophy className="w-5 h-5 text-yellow-300" />
                    <span className="font-semibold">Score: {finalScore}%</span>
                  </div>
                )}
                <button
                  onClick={handleRestart}
                  className="btn btn-secondary"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  🔄 Reiniciar
                </button>
              </div>
            </div>
          </section>

          {/* Game Content */}
          <section className="section-spacing">
            <ProgramacaoGame onGameComplete={handleGameComplete} />
          </section>
        </div>
      </main>

      {/* Results Modal */}
      {finalScore !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full text-center"
            style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                boxShadow: "0 8px 25px rgba(254, 202, 87, 0.3)",
              }}
            >
              <Trophy className="w-10 h-10 text-white" />
            </div>

            <h3
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#1a1a1a",
                marginBottom: "0.5rem",
              }}
            >
              Parabéns! 🎉
            </h3>
            <p
              style={{
                color: "#666666",
                marginBottom: "2rem",
                fontSize: "1.125rem",
              }}
            >
              Você completou o jogo de Programação Básica!
            </p>

            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "var(--radius-lg)",
                padding: "1.5rem",
                marginBottom: "2rem",
                color: "white",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  marginBottom: "0.25rem",
                }}
              >
                {finalScore}%
              </div>
              <div style={{ fontSize: "1rem", opacity: 0.9 }}>
                Pontuação Final
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handleRestart}
                className="btn btn-secondary"
                style={{
                  flex: 1,
                  padding: "0.875rem",
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                }}
              >
                🔄 Jogar Novamente
              </button>
              <Link
                href="/jogos/tecnologia"
                className="btn btn-primary"
                style={{
                  flex: 1,
                  padding: "0.875rem",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ➡️ Continuar
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
