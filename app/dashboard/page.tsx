"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import {
  BookOpen,
  Calculator,
  Computer,
  Microscope,
  Trophy,
  Star,
  Clock,
  Target,
  Play,
} from "lucide-react";
import { Subject, StatsData } from "@/src/interfaces/dashboard.types";

// Enhanced Dashboard Header with scroll effects
const DashboardHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <Link href="/inicio" className="logo-logiclike">
            <div className="logo-icon">
              <BookOpen className="w-6 h-6" />
            </div>
            TechApoio
          </Link>

          <nav className="nav-logiclike">
            <Link href="/perfil" className="nav-link">
              👤 Meu Perfil
            </Link>
            <Link href="/configuracoes" className="nav-link">
              ⚙️ Configurações
            </Link>
            <Link href="/inicio" className="btn btn-secondary">
              🏠 Voltar ao Início
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Fun Subject Card Component
const SubjectCard = ({ subject }: { subject: Subject }) => (
  <div className="card card-interactive">
    <div className="card-content">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          className={`feature-icon ${subject.color}`}
          style={{ margin: "0 auto 16px" }}
        >
          <subject.icon className="w-8 h-8" />
        </div>
        <div style={{ fontSize: "32px", marginBottom: "8px" }}>
          {subject.emoji}
        </div>
      </div>

      <h3
        className="feature-title"
        style={{ textAlign: "center", marginBottom: "8px" }}
      >
        {subject.title}
      </h3>

      <p
        className="feature-description"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        {subject.description}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          🎯 Progresso
        </span>
        <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>
          {subject.progress}%
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "8px",
          background: "var(--gray-200)",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: `${subject.progress}%`,
            height: "100%",
            background: (() => {
              if (subject.color === "blue") return "var(--primary-blue)";
              if (subject.color === "green") return "var(--primary-green)";
              if (subject.color === "purple") return "var(--primary-purple)";
              return "var(--primary-orange)";
            })(),
            borderRadius: "20px",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          fontSize: "14px",
          color: "var(--text-muted)",
        }}
      >
        <span>
          🎮 {subject.completed}/{subject.lessons} jogos
        </span>
        <span>⭐ {subject.stars} estrelas</span>
      </div>

      <button className="btn btn-primary" style={{ width: "100%" }}>
        <Play className="w-4 h-4" />
        🚀 Continuar Aventura!
      </button>
    </div>
  </div>
);

// Fun Stats Card Component
const StatsCard = ({ title, value, subtitle, emoji }: StatsData) => (
  <div className="card">
    <div
      className="card-content"
      style={{ textAlign: "center", padding: "32px 24px" }}
    >
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>{emoji}</div>

      <div
        style={{
          fontSize: "32px",
          fontWeight: "800",
          color: "var(--text-primary)",
          marginBottom: "8px",
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "var(--text-primary)",
          marginBottom: "4px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "14px",
          color: "var(--text-muted)",
        }}
      >
        {subtitle}
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Redirecionamento se não estiver logado será feito pelo useEffect acima
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div style={{ fontSize: "64px" }}>⏰</div>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)" }}>
            Carregando seu dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // useAuth já fará o redirecionamento
  }

  const subjects = [
    {
      icon: BookOpen,
      title: "📖 Português Mágico",
      description: "Histórias e aventuras de leitura! ✨",
      progress: 65,
      color: "blue",
      lessons: 24,
      completed: 16,
      stars: 48,
      emoji: "📚",
    },
    {
      icon: Calculator,
      title: "🔢 Matemática Legal",
      description: "Números que viram jogos! 🎲",
      progress: 45,
      color: "green",
      lessons: 18,
      completed: 8,
      stars: 32,
      emoji: "🧮",
    },
    {
      icon: Computer,
      title: "💻 Mundo Tech",
      description: "Programação para iniciantes! 🤖",
      progress: 30,
      color: "purple",
      lessons: 12,
      completed: 4,
      stars: 18,
      emoji: "⚡",
    },
    {
      icon: Microscope,
      title: "🔬 Laboratório",
      description: "Experimentos incríveis! 🧪",
      progress: 20,
      color: "orange",
      lessons: 8,
      completed: 2,
      stars: 12,
      emoji: "🌟",
    },
  ];

  const stats = [
    {
      icon: Trophy,
      title: "Conquistas",
      value: "0",
      subtitle: "Medalhas ganhas",
      emoji: "🏆",
    },
    {
      icon: Clock,
      title: "Tempo de Diversão",
      value: "0h 0m",
      subtitle: "Esta semana",
      emoji: "⏰",
    },
    {
      icon: Target,
      title: "Nível Atual",
      value: "1",
      subtitle: "Iniciante",
      emoji: "🎯",
    },
    {
      icon: Star,
      title: "Estrelas",
      value: "0",
      subtitle: "Total coletado",
      emoji: "⭐",
    },
  ];

  const recentActivities = [
    {
      subject: "📖 Português",
      activity: "Explore as primeiras palavras mágicas",
      score: 0,
      time: "0 min",
      emoji: "🌟",
    },
    {
      subject: "🔢 Matemática",
      activity: "Comece sua jornada dos números",
      score: 0,
      time: "0 min",
      emoji: "🚀",
    },
    {
      subject: "🔬 Ciências",
      activity: "Descubra o mundo da ciência",
      score: 0,
      time: "0 min",
      emoji: "🌈",
    },
  ];

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <DashboardHeader />

      <div
        className="container-logiclike"
        style={{ paddingTop: "40px", paddingBottom: "60px" }}
      >
        {/* Welcome Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
            background: "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
            padding: "40px",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎉✨🚀</div>

          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "var(--text-primary)",
              marginBottom: "8px",
            }}
          >
            {user
              ? `Olá, ${user.name}! Que bom te ver de novo! 👋✨`
              : "Bem-vindo! 👋✨"}
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "var(--text-secondary)",
              marginBottom: "20px",
            }}
          >
            Pronto para mais uma aventura de aprendizado? Seus amigos virtuais
            estão esperando! 🎮
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              background: "white",
              padding: "12px 24px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-light)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span style={{ fontSize: "20px" }}>✨</span>
            <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>
              Pronto para começar sua jornada de aprendizado!
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            📊 Suas Conquistas Incríveis! 🎯
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
            }}
          >
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            🌟 Seus Mundos de Aventura! 🗺️
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {subjects.map((subject) => (
              <SubjectCard key={subject.title} subject={subject} />
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            🎮 Suas Últimas Aventuras! 🌈
          </h2>

          <div className="card">
            <div className="card-content">
              <div
                style={{
                  display: "grid",
                  gap: "16px",
                }}
              >
                {recentActivities.map((activity, index) => (
                  <div
                    key={activity.activity}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px",
                      background: index % 2 === 0 ? "var(--gray-50)" : "white",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div style={{ fontSize: "32px" }}>{activity.emoji}</div>
                      <div>
                        <div
                          style={{
                            fontWeight: "600",
                            color: "var(--text-primary)",
                            marginBottom: "4px",
                          }}
                        >
                          {activity.activity}
                        </div>

                        <div
                          style={{
                            fontSize: "14px",
                            color: "var(--text-muted)",
                          }}
                        >
                          {activity.subject} • ⏱️ {activity.time}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {(() => {
                        let bgColor = "#f3f4f6"; // Cinza claro para não iniciado
                        if (activity.score >= 90) {
                          bgColor = "#dcfce7"; // Verde claro
                        } else if (activity.score >= 80) {
                          bgColor = "#fef3c7"; // Amarelo claro
                        } else if (activity.score > 0) {
                          bgColor = "#fee2e2"; // Vermelho claro
                        }

                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              background: bgColor,
                              padding: "6px 12px",
                              borderRadius: "var(--radius-md)",
                            }}
                          >
                            <Star
                              className="w-4 h-4"
                              style={{
                                color:
                                  activity.score > 0 ? "#ffc107" : "#9ca3af",
                              }}
                            />
                            <span
                              style={{
                                fontWeight: "600",
                                color: "var(--text-primary)",
                              }}
                            >
                              {activity.score > 0
                                ? `${activity.score}%`
                                : "Novo"}
                            </span>
                          </div>
                        );
                      })()}

                      <button className="btn btn-small btn-outline">
                        🎮 Começar Agora
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
