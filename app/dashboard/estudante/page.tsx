"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Computer,
  Microscope,
  Trophy,
  Star,
  LogOut,
  PlayCircle,
  Mail,
} from "lucide-react";

// Enhanced Header Component matching home
const Header = ({
  student,
  onLogout,
}: {
  student: { name: string; age: number; grade?: number } | null;
  onLogout: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header-logiclike ${isScrolled ? "scrolled" : ""}`}>
      <div className="container-logiclike">
        <div className="header-content">
          <Link href="/dashboard/estudante" className="logo-logiclike">
            <div className="logo-icon">
              <BookOpen className="w-6 h-6" />
            </div>
            TechApoio
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-logiclike">
            <span className="nav-text">
              👋 Olá, {student?.name}! ({student?.age} anos)
            </span>
            <button
              onClick={onLogout}
              className="btn btn-outline"
              style={{ fontSize: "0.875rem" }}
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`menu-toggle ${isMobileMenuOpen ? "open" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            tabIndex={0}
          >
            <div className="menu-line"></div>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="nav-menu-mobile">
            <span
              className="nav-text"
              style={{ padding: "0.75rem", color: "white" }}
            >
              👋 {student?.name}
            </span>
            <button
              onClick={() => {
                onLogout();
                setIsMobileMenuOpen(false);
              }}
              className="btn btn-outline"
              style={{ margin: "0.5rem" }}
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

// Modern Footer Component matching home
const Footer = () => (
  <footer className="footer-logiclike">
    <div className="container-logiclike">
      <div className="footer-content">
        {/* Brand Column */}
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

          <div className="footer-social">
            <button className="social-link" aria-label="Facebook">
              <span className="w-5 h-5 text-lg">📘</span>
            </button>
            <button className="social-link" aria-label="Instagram">
              <span className="w-5 h-5 text-lg">📷</span>
            </button>
            <button className="social-link" aria-label="Twitter">
              <span className="w-5 h-5 text-lg">🐦</span>
            </button>
            <button className="social-link" aria-label="YouTube">
              <span className="w-5 h-5 text-lg">📺</span>
            </button>
          </div>
        </div>

        {/* Platform Column */}
        <div className="footer-column">
          <h4 className="footer-title">🎮 Para Estudantes</h4>
          <Link href="/dashboard/estudante" className="footer-link">
            🏠 Minha Área
          </Link>
          <Link href="#" className="footer-link">
            📚 Português Divertido
          </Link>
          <Link href="#" className="footer-link">
            🔢 Matemática Legal
          </Link>
          <Link href="#" className="footer-link">
            💻 Mundo Tech
          </Link>
          <Link href="#" className="footer-link">
            🔬 Ciências Incríveis
          </Link>
        </div>

        {/* Support Column */}
        <div className="footer-column">
          <h4 className="footer-title">👨‍🏫 Para Professores</h4>
          <Link href="#" className="footer-link">
            📊 Painel do Professor
          </Link>
          <Link href="#" className="footer-link">
            📈 Relatórios de Turma
          </Link>
          <Link href="#" className="footer-link">
            🎯 Criar Atividades
          </Link>
          <Link href="#" className="footer-link">
            🏆 Acompanhar Progresso
          </Link>
          <Link href="#" className="footer-link">
            💬 Suporte Pedagógico
          </Link>
        </div>

        {/* Newsletter Column */}
        <div className="footer-column">
          <div className="footer-newsletter">
            <h4 className="newsletter-title">📧 Novidades Divertidas!</h4>
            <p className="newsletter-description">
              Receba dicas, jogos novos e novidades para professores e escolas!
              🎉
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Seu e-mail da escola 📩"
                className="newsletter-input"
                aria-label="Email para newsletter"
              />
              <button type="submit" className="newsletter-btn">
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          © 2025 TechApoio. Feito com 💜 para escolas e crianças do Brasil! 🇧🇷
        </div>

        <div className="footer-legal">
          <Link href="#">Política de Privacidade</Link>
          <Link href="#">Termos de Uso</Link>
          <Link href="#">Cookies</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default function StudentDashboard() {
  const { student, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !student) {
      router.push("/login/estudante");
    }
  }, [student, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-purple) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎮</div>
          <p style={{ fontSize: "1.25rem" }}>Carregando sua área...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  const subjects = [
    {
      id: "portugues",
      name: "📖 Português Mágico",
      description: "Histórias e palavras divertidas!",
      color: "#3b82f6",
      icon: BookOpen,
      activities: 5,
      completed: 3,
    },
    {
      id: "matematica",
      name: "🔢 Matemática Legal",
      description: "Números e jogos incríveis!",
      color: "#22c55e",
      icon: Calculator,
      activities: 8,
      completed: 4,
    },
    {
      id: "tecnologia",
      name: "💻 Mundo Tech",
      description: "Computadores e programação!",
      color: "#8b5cf6",
      icon: Computer,
      activities: 3,
      completed: 1,
    },
    {
      id: "ciencias",
      name: "🔬 Ciências Incríveis",
      description: "Experimentos fantásticos!",
      color: "#f59e0b",
      icon: Microscope,
      activities: 6,
      completed: 2,
    },
  ];

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <Header student={student} onLogout={handleLogout} />

      {/* Main Content */}
      <main style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <div className="container-logiclike">
          {/* Welcome Section */}
          <section
            className="section-spacing"
            style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
          >
            <div
              className="card"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                color: "white",
                padding: "2.5rem",
                borderRadius: "24px",
                textAlign: "center",
                border: "none",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌟</div>
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                  color: "white",
                }}
              >
                Bem-vindo de volta, {student.name}!
              </h1>
              <p
                style={{
                  fontSize: "1.25rem",
                  opacity: 0.9,
                  marginBottom: "0",
                  color: "white",
                }}
              >
                Que tal continuar suas aventuras de aprendizado hoje? 🚀
              </p>
            </div>
          </section>

          {/* Progress Overview */}
          <section className="section-spacing">
            <div
              className="features-grid"
              style={{ maxWidth: "900px", margin: "0 auto" }}
            >
              <div className="card">
                <div
                  className="card-content"
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#fbbf24",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                    }}
                  >
                    <Trophy
                      style={{ width: "32px", height: "32px", color: "white" }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      marginBottom: "0.5rem",
                    }}
                  >
                    10
                  </h3>
                  <p style={{ color: "#666666", margin: 0 }}>
                    Atividades Concluídas
                  </p>
                </div>
              </div>

              <div className="card">
                <div
                  className="card-content"
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#22c55e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                    }}
                  >
                    <Star
                      style={{ width: "32px", height: "32px", color: "white" }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      marginBottom: "0.5rem",
                    }}
                  >
                    45
                  </h3>
                  <p style={{ color: "#666666", margin: 0 }}>
                    Estrelas Conquistadas
                  </p>
                </div>
              </div>

              <div className="card">
                <div
                  className="card-content"
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#3b82f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1rem",
                    }}
                  >
                    <PlayCircle
                      style={{ width: "32px", height: "32px", color: "white" }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Português
                  </h3>
                  <p style={{ color: "#666666", margin: 0 }}>
                    Próxima Atividade
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Subjects Section */}
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
                🎯 Suas Matérias Favoritas
              </h2>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "#666666",
                  margin: 0,
                }}
              >
                Continue de onde parou e desbloqueie novos desafios!
              </p>
            </div>

            <div
              className="features-grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              }}
            >
              {subjects.map((subject) => {
                const Icon = subject.icon;
                const progress = (subject.completed / subject.activities) * 100;

                return (
                  <div key={subject.id} className="card card-interactive">
                    <div className="card-content" style={{ padding: "2rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            backgroundColor: subject.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon
                            style={{
                              width: "24px",
                              height: "24px",
                              color: "white",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            backgroundColor: "#f3f4f6",
                            color: "#666666",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "12px",
                          }}
                        >
                          {subject.completed}/{subject.activities}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "700",
                          color: "#1a1a1a",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {subject.name}
                      </h3>

                      <p
                        style={{
                          color: "#666666",
                          fontSize: "0.875rem",
                          marginBottom: "1.5rem",
                        }}
                      >
                        {subject.description}
                      </p>

                      {/* Progress Bar */}
                      <div
                        style={{
                          width: "100%",
                          height: "8px",
                          backgroundColor: "#e5e7eb",
                          borderRadius: "4px",
                          overflow: "hidden",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <div
                          style={{
                            width: `${progress}%`,
                            height: "100%",
                            backgroundColor: subject.color,
                            borderRadius: "4px",
                            transition: "width 0.3s ease",
                          }}
                        ></div>
                      </div>

                      <button
                        className="btn btn-primary"
                        style={{ width: "100%" }}
                      >
                        🎮 Continuar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="section-spacing">
            <div className="card">
              <div className="card-content" style={{ padding: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  ⚡ Ações Rápidas
                </h3>

                <div className="features-grid">
                  <button
                    className="card card-interactive"
                    style={{
                      background: "rgba(59, 130, 246, 0.1)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className="card-content"
                      style={{
                        padding: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <BookOpen
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "#3b82f6",
                        }}
                      />
                      <span style={{ fontWeight: "600", color: "#3b82f6" }}>
                        📚 Continuar Leitura
                      </span>
                    </div>
                  </button>

                  <button
                    className="card card-interactive"
                    style={{
                      background: "rgba(34, 197, 94, 0.1)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className="card-content"
                      style={{
                        padding: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Calculator
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "#22c55e",
                        }}
                      />
                      <span style={{ fontWeight: "600", color: "#22c55e" }}>
                        🔢 Jogar Matemática
                      </span>
                    </div>
                  </button>

                  <button
                    className="card card-interactive"
                    style={{
                      background: "rgba(168, 85, 247, 0.1)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className="card-content"
                      style={{
                        padding: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Trophy
                        style={{
                          width: "24px",
                          height: "24px",
                          color: "#a855f7",
                        }}
                      />
                      <span style={{ fontWeight: "600", color: "#a855f7" }}>
                        🏆 Ver Conquistas
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
