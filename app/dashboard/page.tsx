"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { BookOpen, Calculator, Computer, Microscope } from "lucide-react";
import {
  AppHeader,
  LoadingScreen,
  WelcomeSection,
  StatsGrid,
  SubjectCard,
  ActivityCard,
} from "@/components";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingScreen message="Carregando seu dashboard..." />;
  }

  if (!user) {
    return null; // useAuth já fará o redirecionamento
  }

  const navigationItems = [
    { href: "/perfil", label: "👤 Meu Perfil" },
    { href: "/configuracoes", label: "⚙️ Configurações" },
  ];

  const subjects = [
    {
      icon: BookOpen,
      title: "📖 Português Mágico",
      description: "Histórias e aventuras de leitura! ✨",
      progress: 65,
      color: "blue" as const,
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
      color: "green" as const,
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
      color: "purple" as const,
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
      color: "orange" as const,
      lessons: 8,
      completed: 2,
      stars: 12,
      emoji: "🌟",
    },
  ];

  const stats = [
    {
      title: "Conquistas",
      value: "0",
      subtitle: "Medalhas ganhas",
      emoji: "🏆",
    },
    {
      title: "Tempo de Diversão",
      value: "0h 0m",
      subtitle: "Esta semana",
      emoji: "⏰",
    },
    {
      title: "Nível Atual",
      value: "1",
      subtitle: "Iniciante",
      emoji: "🎯",
    },
    {
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
      <AppHeader
        navigation={navigationItems}
        showBackButton
        backHref="/inicio"
      />

      <div
        className="container-logiclike"
        style={{ paddingTop: "40px", paddingBottom: "60px" }}
      >
        {/* Welcome Section */}
        <WelcomeSection
          title={`Olá, ${user.name}! Que bom te ver de novo! 👋✨`}
          subtitle="Pronto para mais uma aventura de aprendizado? Seus amigos virtuais estão esperando! 🎮"
          emoji="🎉✨🚀"
          badge={{
            text: "Pronto para começar sua jornada de aprendizado!",
            icon: "✨",
          }}
        />

        {/* Stats Grid */}
        <StatsGrid title="📊 Suas Conquistas Incríveis! 🎯" stats={stats} />

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
              <SubjectCard
                key={subject.title}
                subject={subject}
                onPlay={() =>
                  router.push(
                    `/jogos/${subject.title
                      .toLowerCase()
                      .replaceAll(/[^a-z]/g, "")}`
                  )
                }
              />
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
              <div style={{ display: "grid", gap: "16px" }}>
                {recentActivities.map((activity, index) => (
                  <ActivityCard
                    key={activity.activity}
                    activity={activity}
                    index={index}
                    onStart={() => console.log(`Starting ${activity.activity}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
