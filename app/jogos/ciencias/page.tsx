"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ArrowLeft, Play, Star, Microscope, BookOpen } from "lucide-react";
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
          <h4 className="footer-title">🔬 Para Estudantes</h4>
          <Link href="/dashboard/estudante" className="footer-link">
            🏠 Minha Área
          </Link>
          <Link href="#" className="footer-link">
            🧪 Ciências Legais
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
    id: "ciencias-quiz",
    title: "🧪 Quiz de Ciências",
    description: "Teste seus conhecimentos sobre o mundo natural",
    difficulty: "Fácil",
    icon: <Microscope className="w-6 h-6" />,
    href: "/jogos/ciencias/ciencias-quiz",
  },
];

export default function CienciasPage() {
  const { student, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !student) {
      router.push("/login/estudante");
    }
  }, [student, loading, router]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }
  if (!student) {
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
                    "linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)",
                  borderRadius: "var(--radius-xl)",
                  padding: "3rem 2rem",
                  textAlign: "center",
                  color: "white",
                  marginBottom: "3rem",
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>
                  🔬
                </div>
                <h1
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  Bem-vindo às Ciências!
                </h1>
                <p
                  style={{
                    fontSize: "1.25rem",
                    opacity: 0.9,
                    maxWidth: "600px",
                    margin: "0 auto",
                  }}
                >
                  Explore os mistérios do universo, da natureza e do mundo que
                  nos cerca. Descubra como as coisas funcionam através de
                  experimentos e descobertas!
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
                🧪 Sua Jornada Científica
              </h2>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "#666666",
                  margin: 0,
                }}
              >
                Descubra os segredos da ciência através de experiências
                divertidas!
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
                  whileHover={{ scale: 1.05 }}
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
                          "linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                        boxShadow: "0 8px 25px rgba(20, 184, 166, 0.3)",
                      }}
                    >
                      <Microscope className="w-10 h-10 text-white" />
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
                        style={{
                          background: "#dcfce7",
                          color: "#166534",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                        }}
                      >
                        {jogo.difficulty}
                      </span>

                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        {[...Array(3)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-gray-300" />
                        ))}
                      </div>
                    </div>

                    <Link
                      href={jogo.href}
                      className="btn btn-primary btn-block"
                      style={{
                        background:
                          "linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        textDecoration: "none",
                      }}
                    >
                      <Play style={{ width: "1.25rem", height: "1.25rem" }} />
                      Começar Descoberta
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
                  📊 Seu Progresso em Ciências
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
                          "linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)",
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
                      Experimentos Feitos
                    </div>
                  </div>

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
                      Descobertas
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
