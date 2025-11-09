"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import {
  User,
  Mail,
  BookOpen,
  Settings,
  Edit3,
  Save,
  X,
  LogOut,
  ArrowLeft,
  Crown,
} from "lucide-react";
import toast from "react-hot-toast";

export default function PerfilPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");

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

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      toast.error("Nome não pode estar vazio! 📝");
      return;
    }

    // Simular atualização do perfil (implementar API depois)
    toast.success("Perfil atualizado com sucesso! ✨");
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-5">
          <div className="text-6xl">⏰</div>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)" }}>
            Carregando seu perfil...
          </p>
        </div>
      </div>
    );
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
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
            background: "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
            padding: "48px",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Decoration */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontSize: "48px",
              opacity: 0.1,
              animation: "float 4s ease-in-out infinite",
            }}
          >
            👑
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              fontSize: "40px",
              opacity: 0.1,
              animation: "float 3s ease-in-out infinite reverse",
            }}
          >
            ⭐
          </div>

          {/* Avatar */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "120px",
              height: "120px",
              background:
                "linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-blue) 100%)",
              borderRadius: "50%",
              marginBottom: "24px",
              fontSize: "48px",
              color: "white",
              fontWeight: "700",
              border: "4px solid white",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            {user.role === "ADMIN" ? "👑" : "👨‍🏫"}
          </div>

          {/* Name and Role */}
          <div style={{ marginBottom: "16px" }}>
            {isEditing ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  marginBottom: "8px",
                }}
              >
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    textAlign: "center",
                    border: "2px solid var(--primary-blue)",
                    borderRadius: "var(--radius-lg)",
                    padding: "8px 16px",
                    background: "white",
                    color: "var(--text-primary)",
                    outline: "none",
                  }}
                />

                <button
                  onClick={handleSaveProfile}
                  className="btn btn-small btn-primary"
                >
                  <Save className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setEditName(user.name);
                    setIsEditing(false);
                  }}
                  className="btn btn-small btn-ghost"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  marginBottom: "8px",
                }}
              >
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  {user.name} ✨
                </h1>

                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-small btn-ghost"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            )}

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background:
                  user.role === "ADMIN"
                    ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                    : "linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-blue) 100%)",
                padding: "8px 16px",
                borderRadius: "var(--radius-lg)",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {user.role === "ADMIN" ? (
                <>
                  <Crown className="w-4 h-4" />
                  👑 Administrador
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  👨‍🏫 Professor(a)
                </>
              )}
            </div>
          </div>

          <p
            style={{
              fontSize: "18px",
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            Inspirando mentes jovens e criando futuros brilhantes! 🌟
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          <div className="card">
            <div
              className="card-content"
              style={{ textAlign: "center", padding: "32px 24px" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>👥</div>

              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}
              >
                {user.studentsCount}
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                }}
              >
                Estudantes
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: "var(--text-muted)",
                }}
              >
                Pequenos aprendizes
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-content"
              style={{ textAlign: "center", padding: "32px 24px" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏫</div>

              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}
              >
                {user.classesCount}
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                }}
              >
                Turmas
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: "var(--text-muted)",
                }}
              >
                Salas de descoberta
              </div>
            </div>
          </div>

          <div className="card">
            <div
              className="card-content"
              style={{ textAlign: "center", padding: "32px 24px" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏰</div>

              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}
              >
                {new Date(user.createdAt || "").toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                }}
              >
                Membro desde
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: "var(--text-muted)",
                }}
              >
                Jornada iniciada
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="card">
          <div className="card-content">
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "var(--text-primary)",
                marginBottom: "32px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              📋 Informações do Perfil
            </h2>

            <div
              style={{
                display: "grid",
                gap: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px",
                  background: "var(--gray-50)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    background: "var(--primary-blue)",
                    borderRadius: "50%",
                    color: "white",
                  }}
                >
                  <Mail className="w-5 h-5" />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      marginBottom: "4px",
                    }}
                  >
                    📧 Email
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "var(--text-primary)",
                    }}
                  >
                    {user.email}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px",
                  background: "var(--gray-50)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    background: "var(--primary-green)",
                    borderRadius: "50%",
                    color: "white",
                  }}
                >
                  <User className="w-5 h-5" />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      marginBottom: "4px",
                    }}
                  >
                    🆔 ID do Usuário
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "var(--text-primary)",
                      fontFamily: "monospace",
                    }}
                  >
                    {user.id}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
