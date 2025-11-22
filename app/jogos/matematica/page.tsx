"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ClientOnly } from "@/lib/components/ClientOnly";
import { getJogosByMateria } from "@/src/helpers/games.helpers";

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
            <Link href="/dashboard/estudante" className="nav-link">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Dashboard
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
            🔢 Matemática Legal
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

export default function MatematicaPage() {
  const { student } = useAuth();
  const router = useRouter();
  const [jogos] = useState(() => {
    const jogosData = getJogosByMateria("matematica");
    return jogosData.map((jogo, index) => ({
      ...jogo,
      isLocked: index > 0 && !jogosData[index - 1]?.isCompleted,
      isCompleted: Math.random() > 0.5,
      score: Math.random() > 0.5 ? Math.floor(Math.random() * 100) : undefined,
      stars: Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : 0,
      tempo:
        Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 5 : undefined,
    }));
  });

  if (!student) {
    router.push("/login/estudante");
    return null;
  }

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
                    "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  borderRadius: "var(--radius-xl)",
                  padding: "3rem 2rem",
                  textAlign: "center",
                  color: "white",
                  marginBottom: "3rem",
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>
                  🔢
                </div>
                <h1
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  Matemática Legal
                </h1>
                <p
                  style={{
                    fontSize: "1.25rem",
                    opacity: 0.9,
                    maxWidth: "600px",
                    margin: "0 auto",
                  }}
                >
                  Números e operações nunca foram tão legais! Aprenda matemática
                  brincando com jogos incríveis.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Jogos Grid */}
          <section className="section-spacing">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  marginBottom: "1rem",
                }}
              >
                🎮 Escolha Sua Aventura Matemática
              </h2>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "#666666",
                  margin: 0,
                }}
              >
                2 jogos disponíveis para você se divertir!
              </p>
            </div>

            <div
              className="features-grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              }}
            >
              {jogos.map((jogo, index) => (
                <motion.div
                  key={jogo.id}
                  className="card card-interactive"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: jogo.isLocked ? 1 : 1.05 }}
                >
                  <div
                    className="card-content"
                    style={{ position: "relative" }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          index === 0
                            ? "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)"
                            : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                        boxShadow:
                          index === 0
                            ? "0 8px 25px rgba(59, 130, 246, 0.3)"
                            : "0 8px 25px rgba(245, 158, 11, 0.3)",
                      }}
                    >
                      <span style={{ fontSize: "2rem", color: "white" }}>
                        {index === 0 ? "🔢" : "➕"}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#1a1a1a",
                        marginBottom: "0.75rem",
                        textAlign: "center",
                      }}
                    >
                      {jogo.nome}
                    </h3>

                    <p
                      style={{
                        color: "#666666",
                        fontSize: "1rem",
                        textAlign: "center",
                        marginBottom: "1.5rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {jogo.descricao}
                    </p>

                    {/* Status e Progresso */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <span
                        style={{
                          background: jogo.isCompleted ? "#dcfce7" : "#fef3c7",
                          color: jogo.isCompleted ? "#166534" : "#92400e",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                        }}
                      >
                        {jogo.isCompleted ? "Concluído" : "Fácil"}
                      </span>

                      {jogo.score && (
                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{ fontSize: "0.875rem", color: "#666666" }}
                          >
                            {jogo.score}% • ⭐{jogo.stars}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Progresso */}
                    {jogo.isCompleted && (
                      <div style={{ marginBottom: "1.5rem" }}>
                        <div
                          style={{
                            background: "#f3f4f6",
                            borderRadius: "9999px",
                            height: "8px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              background:
                                index === 0
                                  ? "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)"
                                  : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                              height: "100%",
                              width: `${jogo.score}%`,
                              borderRadius: "9999px",
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/jogos/matematica/${jogo.id}`}
                      className="btn btn-primary btn-block"
                      style={{
                        background:
                          index === 0
                            ? "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)"
                            : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        textDecoration: "none",
                      }}
                    >
                      {jogo.isCompleted ? "🔄 Continuar" : "▶️ Jogar Agora"}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="section-spacing">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
              style={{ textAlign: "center" }}
            >
              <div className="card-content">
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    marginBottom: "2rem",
                  }}
                >
                  📊 Seu Progresso em Matemática
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "2rem",
                    marginTop: "2rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      0
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#666666",
                        fontWeight: "500",
                      }}
                    >
                      Concluídos
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      1
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#666666",
                        fontWeight: "500",
                      }}
                    >
                      Pendentes
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      42%
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#666666",
                        fontWeight: "500",
                      }}
                    >
                      Pontuação Média
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                        fontSize: "2rem",
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      ⭐1
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#666666",
                        fontWeight: "500",
                      }}
                    >
                      Estrelas
                    </div>
                  </div>
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
