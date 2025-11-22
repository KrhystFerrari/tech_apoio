"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Settings, LogOut, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import {
  LoadingScreen,
  StatsGrid,
  ProfileHeader,
  ProfileDetails,
} from "@/components";

export default function PerfilPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    if (confirm("Tem certeza que deseja sair? 🤔")) {
      await logout();
      toast.success("Logout realizado com sucesso! Até logo! 👋✨");
      router.push("/login");
    }
  };

  if (loading) {
    return <LoadingScreen message="Carregando seu perfil..." />;
  }

  if (!user) {
    return null;
  }

  const profileStats = [
    {
      title: "Estudantes",
      value: user.studentsCount || "0",
      subtitle: "Pequenos aprendizes",
      emoji: "👥",
    },
    {
      title: "Turmas",
      value: user.classesCount || "0",
      subtitle: "Salas de descoberta",
      emoji: "🏫",
    },
    {
      title: "Membro desde",
      value: new Date(user.createdAt || "").toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      subtitle: "Jornada iniciada",
      emoji: "⏰",
    },
  ];

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="header-logiclike"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <div
          className="container-logiclike"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => router.push("/dashboard")}
            className="btn btn-ghost"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <ArrowLeft className="w-5 h-5" />
            🏠 Voltar ao Dashboard
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => router.push("/configuracoes")}
              className="btn btn-outline"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Settings className="w-4 h-4" />
              ⚙️ Configurações
            </button>

            <button
              onClick={handleLogout}
              className="btn btn-ghost"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--danger-color)",
              }}
            >
              <LogOut className="w-4 h-4" />
              👋 Sair
            </button>
          </div>
        </div>
      </div>

      <div
        className="container-logiclike"
        style={{ paddingTop: "40px", paddingBottom: "60px" }}
      >
        {/* Profile Header */}
        <ProfileHeader user={user} />

        {/* Stats Grid */}
        <StatsGrid stats={profileStats} columns={3} />

        {/* Profile Details */}
        <ProfileDetails user={user} />
      </div>
    </div>
  );
}
