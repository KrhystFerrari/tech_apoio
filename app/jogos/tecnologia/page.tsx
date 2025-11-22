"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import {
  ArrowLeft,
  Play,
  Lock,
  Star,
  Trophy,
  Computer,
  BookOpen,
} from "lucide-react";
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

interface Jogo {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  icon: React.ReactNode;
  href: string;
  isLocked?: boolean;
  requiredScore?: number;
}

const jogos: Jogo[] = [
  {
    id: "programacao-basica",
    title: "🤖 Programação Básica",
    description: "Aprenda conceitos básicos de programação com blocos visuais",
    difficulty: "Fácil",
    icon: <Computer className="w-6 h-6" />,
    href: "/jogos/tecnologia/programacao-basica",
  },
  {
    id: "algoritmos",
    title: "🔄 Algoritmos",
    description: "Crie sequências lógicas para resolver problemas",
    difficulty: "Médio",
    icon: <Computer className="w-6 h-6" />,
    href: "/jogos/tecnologia/algoritmos",
    isLocked: true,
    requiredScore: 70,
  },
  {
    id: "computadores",
    title: "💻 Conhecendo o Computador",
    description: "Descubra as partes do computador e como funcionam",
    difficulty: "Fácil",
    icon: <Computer className="w-6 h-6" />,
    href: "/jogos/tecnologia/computadores",
  },
];

export default function TecnologiaPage() {
  const { student, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !student) {
      router.push("/login/estudante");
    }
  }, [student, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-800 border-green-200";
      case "Médio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Difícil":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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
                <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>
                  💻
                </div>
                <h1
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  Bem-vindo ao Mundo da Tecnologia!
                </h1>
                <p
                  style={{
                    fontSize: "1.25rem",
                    opacity: 0.9,
                    maxWidth: "600px",
                    margin: "0 auto",
                  }}
                >
                  Explore o fascinante mundo dos computadores e programação.
                  Aprenda conceitos básicos através de jogos divertidos e
                  interativos!
                </p>
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span className="font-medium">Pontos: 0</span>
                </div>
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
                🎮 Escolha Sua Aventura Tech
              </h2>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "#666666",
                  margin: 0,
                }}
              >
                Jogos incríveis para aprender tecnologia brincando!
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
                    {jogo.isLocked && (
                      <div
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          background: "rgba(0,0,0,0.7)",
                          borderRadius: "50%",
                          padding: "0.5rem",
                          color: "white",
                        }}
                      >
                        <Lock className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                      }}
                    >
                      <Computer className="w-10 h-10 text-white" />
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
                      {jogo.title}
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
                      {jogo.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                          jogo.difficulty
                        )}`}
                      >
                        {jogo.difficulty}
                      </span>

                      {!jogo.isLocked && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <Star className="w-4 h-4 text-gray-300" />
                          <Star className="w-4 h-4 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {jogo.isLocked ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "0.75rem",
                          background: "#f8f9fa",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid #e9ecef",
                          color: "#6c757d",
                          fontSize: "0.875rem",
                        }}
                      >
                        Desbloqueie com {jogo.requiredScore}% no jogo anterior
                      </div>
                    ) : (
                      <Link
                        href={jogo.href}
                        className="btn btn-primary btn-block"
                        style={{
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Play style={{ width: "1.25rem", height: "1.25rem" }} />
                        Jogar Agora
                      </Link>
                    )}
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
                  🏆 Seu Progresso em Tecnologia
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
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                      Jogos Concluídos
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
                      0%
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#666666",
                        fontWeight: "500",
                      }}
                    >
                      Taxa de Acerto
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background:
                          "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
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
                      Conceitos Aprendidos
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
