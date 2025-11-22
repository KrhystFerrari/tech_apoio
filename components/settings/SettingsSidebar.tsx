import { Settings, Users, BookOpen, Palette, Shield } from "lucide-react";

export interface SettingsTab {
  id: string;
  label: string;
  icon: typeof Settings;
}

export interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function SettingsSidebar({
  activeTab,
  onTabChange,
  className = "",
}: SettingsSidebarProps) {
  const tabs: SettingsTab[] = [
    { id: "geral", label: "⚙️ Geral", icon: Settings },
    { id: "estudantes", label: "👥 Estudantes", icon: Users },
    { id: "turmas", label: "🏫 Turmas", icon: BookOpen },
    { id: "interface", label: "🎨 Interface", icon: Palette },
    { id: "privacidade", label: "🔒 Privacidade", icon: Shield },
  ];

  return (
    <div className={className}>
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
                  onClick={() => onTabChange(tab.id)}
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
                      activeTab === tab.id ? "white" : "var(--text-primary)",
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
  );
}
