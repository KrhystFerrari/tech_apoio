"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import {
  LoadingScreen,
  SettingsSidebar,
  GeneralSettings,
  StudentsSettings,
  PlaceholderTab,
} from "@/components";

export default function ConfiguracoesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Estados para configurações
  const [activeTab, setActiveTab] = useState("geral");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSaveSettings = () => {
    toast.success("Configurações salvas com sucesso! ✨");
  };

  if (loading) {
    return <LoadingScreen message="Carregando configurações..." />;
  }

  if (!user) {
    return null;
  }

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
            onClick={() => router.push("/perfil")}
            className="btn btn-ghost"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <ArrowLeft className="w-5 h-5" />
            👤 Voltar ao Perfil
          </button>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "var(--text-primary)",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ⚙️ Configurações
          </h1>

          <button
            onClick={handleSaveSettings}
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Save className="w-4 h-4" />
            💾 Salvar
          </button>
        </div>
      </div>

      <div
        className="container-logiclike"
        style={{ paddingTop: "40px", paddingBottom: "60px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "32px",
          }}
        >
          {/* Sidebar with Tabs */}
          <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main Content */}
          <div>
            {activeTab === "geral" && (
              <GeneralSettings
                notificationsEnabled={notificationsEnabled}
                soundEnabled={soundEnabled}
                animationsEnabled={animationsEnabled}
                onNotificationsChange={setNotificationsEnabled}
                onSoundChange={setSoundEnabled}
                onAnimationsChange={setAnimationsEnabled}
              />
            )}

            {activeTab === "estudantes" && (
              <StudentsSettings studentsCount={user.studentsCount || 0} />
            )}

            {activeTab === "turmas" && (
              <PlaceholderTab
                title="🏫 Gerenciar Turmas"
                emoji="🏫"
                description={`Você tem ${
                  user.classesCount || 0
                } turma(s) ativa(s). Funcionalidade em desenvolvimento! 🚧`}
              />
            )}

            {activeTab === "interface" && (
              <PlaceholderTab
                title="🎨 Personalização"
                emoji="🎨"
                description="Esta seção está em desenvolvimento."
              />
            )}

            {activeTab === "privacidade" && (
              <PlaceholderTab
                title="🔒 Privacidade & Segurança"
                emoji="🔒"
                description="Esta seção está em desenvolvimento."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
