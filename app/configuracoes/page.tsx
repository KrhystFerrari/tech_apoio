"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import {
  Settings,
  Users,
  BookOpen,
  Palette,
  Shield,
  ArrowLeft,
  Plus,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ConfiguracoesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Estados para configurações
  const [activeTab, setActiveTab] = useState("geral");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Estados para gerenciamento
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentAge, setNewStudentAge] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSaveSettings = () => {
    toast.success("Configurações salvas com sucesso! ✨");
  };

  const handleAddStudent = () => {
    if (!newStudentName.trim() || !newStudentAge) {
      toast.error("Preencha todos os campos! 📝");
      return;
    }

    // Simular adição de estudante
    toast.success(`Estudante ${newStudentName} adicionado! 🎉`);
    setNewStudentName("");
    setNewStudentAge("");
    setShowAddStudent(false);
  };

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
          <div style={{ fontSize: "64px" }}>⚙️</div>
          <p style={{ fontSize: "18px", color: "var(--text-secondary)" }}>
            Carregando configurações...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const tabs = [
    { id: "geral", label: "⚙️ Geral", icon: Settings },
    { id: "estudantes", label: "👥 Estudantes", icon: Users },
    { id: "turmas", label: "🏫 Turmas", icon: BookOpen },
    { id: "interface", label: "🎨 Interface", icon: Palette },
    { id: "privacidade", label: "🔒 Privacidade", icon: Shield },
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
          <div>
            <div className="card">
              <div className="card-content" style={{ padding: "24px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "var(--text-primary)",
                    marginBottom: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  📋 Menu
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "12px 16px",
                          border: "none",
                          borderRadius: "var(--radius-md)",
                          background:
                            activeTab === tab.id
                              ? "var(--primary-blue)"
                              : "transparent",
                          color:
                            activeTab === tab.id
                              ? "white"
                              : "var(--text-primary)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          fontSize: "14px",
                          fontWeight: "500",
                          textAlign: "left",
                          width: "100%",
                        }}
                        onMouseEnter={(e) => {
                          const target = e.target as HTMLButtonElement;
                          if (activeTab !== tab.id) {
                            target.style.background = "var(--gray-100)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          const target = e.target as HTMLButtonElement;
                          if (activeTab !== tab.id) {
                            target.style.background = "transparent";
                          }
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div>
            {activeTab === "geral" && (
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
                    ⚙️ Configurações Gerais
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "32px",
                    }}
                  >
                    {/* Notificações */}
                    <div>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "var(--text-primary)",
                          marginBottom: "16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        🔔 Notificações
                      </h3>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "16px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "16px",
                            background: "var(--gray-50)",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid var(--border-light)",
                          }}
                        >
                          <div>
                            <div
                              style={{ fontWeight: "600", marginBottom: "4px" }}
                            >
                              📱 Notificações Push
                            </div>
                            <div
                              style={{
                                fontSize: "14px",
                                color: "var(--text-muted)",
                              }}
                            >
                              Receber alertas sobre atividades dos estudantes
                            </div>
                          </div>

                          <label
                            style={{
                              position: "relative",
                              display: "inline-block",
                              width: "60px",
                              height: "34px",
                            }}
                            aria-label="Ativar notificações"
                          >
                            <input
                              type="checkbox"
                              checked={notificationsEnabled}
                              onChange={(e) =>
                                setNotificationsEnabled(e.target.checked)
                              }
                              style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span
                              style={{
                                position: "absolute",
                                cursor: "pointer",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: notificationsEnabled
                                  ? "var(--primary-green)"
                                  : "#ccc",
                                transition: "0.4s",
                                borderRadius: "34px",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  content: "",
                                  height: "26px",
                                  width: "26px",
                                  left: notificationsEnabled ? "30px" : "4px",
                                  bottom: "4px",
                                  backgroundColor: "white",
                                  transition: "0.4s",
                                  borderRadius: "50%",
                                }}
                              />
                            </span>
                          </label>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "16px",
                            background: "var(--gray-50)",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid var(--border-light)",
                          }}
                        >
                          <div>
                            <div
                              style={{ fontWeight: "600", marginBottom: "4px" }}
                            >
                              🔊 Sons do Sistema
                            </div>
                            <div
                              style={{
                                fontSize: "14px",
                                color: "var(--text-muted)",
                              }}
                            >
                              Tocar sons quando ações forem realizadas
                            </div>
                          </div>

                          <label
                            style={{
                              position: "relative",
                              display: "inline-block",
                              width: "60px",
                              height: "34px",
                            }}
                            aria-label="Ativar sons"
                          >
                            <input
                              type="checkbox"
                              checked={soundEnabled}
                              onChange={(e) =>
                                setSoundEnabled(e.target.checked)
                              }
                              style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span
                              style={{
                                position: "absolute",
                                cursor: "pointer",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: soundEnabled
                                  ? "var(--primary-green)"
                                  : "#ccc",
                                transition: "0.4s",
                                borderRadius: "34px",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  content: "",
                                  height: "26px",
                                  width: "26px",
                                  left: soundEnabled ? "30px" : "4px",
                                  bottom: "4px",
                                  backgroundColor: "white",
                                  transition: "0.4s",
                                  borderRadius: "50%",
                                }}
                              />
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Interface */}
                    <div>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "var(--text-primary)",
                          marginBottom: "16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        🎨 Interface
                      </h3>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "16px",
                          background: "var(--gray-50)",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        <div>
                          <div
                            style={{ fontWeight: "600", marginBottom: "4px" }}
                          >
                            ✨ Animações
                          </div>
                          <div
                            style={{
                              fontSize: "14px",
                              color: "var(--text-muted)",
                            }}
                          >
                            Habilitar animações e transições visuais
                          </div>
                        </div>

                        <label
                          style={{
                            position: "relative",
                            display: "inline-block",
                            width: "60px",
                            height: "34px",
                          }}
                          aria-label="Ativar animações"
                        >
                          <input
                            type="checkbox"
                            checked={animationsEnabled}
                            onChange={(e) =>
                              setAnimationsEnabled(e.target.checked)
                            }
                            style={{ opacity: 0, width: 0, height: 0 }}
                          />
                          <span
                            style={{
                              position: "absolute",
                              cursor: "pointer",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: animationsEnabled
                                ? "var(--primary-green)"
                                : "#ccc",
                              transition: "0.4s",
                              borderRadius: "34px",
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                content: "",
                                height: "26px",
                                width: "26px",
                                left: animationsEnabled ? "30px" : "4px",
                                bottom: "4px",
                                backgroundColor: "white",
                                transition: "0.4s",
                                borderRadius: "50%",
                              }}
                            />
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "estudantes" && (
              <div className="card">
                <div className="card-content">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "32px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "var(--text-primary)",
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      👥 Gerenciar Estudantes
                    </h2>

                    <button
                      onClick={() => setShowAddStudent(true)}
                      className="btn btn-primary"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Plus className="w-4 h-4" />➕ Adicionar Estudante
                    </button>
                  </div>

                  {showAddStudent && (
                    <div
                      style={{
                        padding: "24px",
                        background: "var(--gray-50)",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid var(--border-light)",
                        marginBottom: "32px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "var(--text-primary)",
                          marginBottom: "16px",
                        }}
                      >
                        ➕ Novo Estudante
                      </h3>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 120px",
                          gap: "16px",
                        }}
                      >
                        <input
                          type="text"
                          value={newStudentName}
                          onChange={(e) => setNewStudentName(e.target.value)}
                          placeholder="Nome do estudante"
                          style={{
                            padding: "12px 16px",
                            border: "2px solid var(--border-light)",
                            borderRadius: "var(--radius-md)",
                            fontSize: "16px",
                            outline: "none",
                          }}
                        />

                        <input
                          type="number"
                          value={newStudentAge}
                          onChange={(e) => setNewStudentAge(e.target.value)}
                          placeholder="Idade"
                          min="6"
                          max="12"
                          style={{
                            padding: "12px 16px",
                            border: "2px solid var(--border-light)",
                            borderRadius: "var(--radius-md)",
                            fontSize: "16px",
                            outline: "none",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginTop: "16px",
                          justifyContent: "flex-end",
                        }}
                      >
                        <button
                          onClick={() => setShowAddStudent(false)}
                          className="btn btn-ghost"
                        >
                          ❌ Cancelar
                        </button>

                        <button
                          onClick={handleAddStudent}
                          className="btn btn-primary"
                        >
                          ✅ Adicionar
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Lista de estudantes */}
                  <div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "var(--text-primary)",
                        marginBottom: "16px",
                      }}
                    >
                      📝 Lista de Estudantes ({user.studentsCount})
                    </h3>

                    {user.studentsCount === 0 ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "48px",
                          color: "var(--text-muted)",
                        }}
                      >
                        <div style={{ fontSize: "64px", marginBottom: "16px" }}>
                          👥
                        </div>
                        <p>Nenhum estudante cadastrado ainda.</p>
                        <p>
                          Clique em &ldquo;Adicionar Estudante&rdquo; para
                          começar! ✨
                        </p>
                      </div>
                    ) : (
                      <p style={{ color: "var(--text-muted)" }}>
                        Você tem {user.studentsCount} estudante(s)
                        cadastrado(s). 📊
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "turmas" && (
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
                    🏫 Gerenciar Turmas
                  </h2>

                  <div
                    style={{
                      textAlign: "center",
                      padding: "48px",
                      color: "var(--text-muted)",
                    }}
                  >
                    <div style={{ fontSize: "64px", marginBottom: "16px" }}>
                      🏫
                    </div>
                    <p>Você tem {user.classesCount} turma(s) ativa(s).</p>
                    <p>Funcionalidade em desenvolvimento! 🚧</p>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === "interface" || activeTab === "privacidade") && (
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
                    {activeTab === "interface"
                      ? "🎨 Personalização"
                      : "🔒 Privacidade & Segurança"}
                  </h2>

                  <div
                    style={{
                      textAlign: "center",
                      padding: "48px",
                      color: "var(--text-muted)",
                    }}
                  >
                    <div style={{ fontSize: "64px", marginBottom: "16px" }}>
                      {activeTab === "interface" ? "🎨" : "🔒"}
                    </div>
                    <p>Esta seção está em desenvolvimento.</p>
                    <p>Mais opções estarão disponíveis em breve! ✨</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
