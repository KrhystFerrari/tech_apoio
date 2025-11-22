import { ToggleSwitch } from "./ToggleSwitch";

export interface GeneralSettingsProps {
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  onNotificationsChange: (enabled: boolean) => void;
  onSoundChange: (enabled: boolean) => void;
  onAnimationsChange: (enabled: boolean) => void;
  className?: string;
}

export function GeneralSettings({
  notificationsEnabled,
  soundEnabled,
  animationsEnabled,
  onNotificationsChange,
  onSoundChange,
  onAnimationsChange,
  className = "",
}: GeneralSettingsProps) {
  return (
    <div className={`card ${className}`}>
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
                  <div style={{ fontWeight: "600", marginBottom: "4px" }}>
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

                <ToggleSwitch
                  checked={notificationsEnabled}
                  onChange={onNotificationsChange}
                  ariaLabel="Ativar notificações"
                />
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
                  <div style={{ fontWeight: "600", marginBottom: "4px" }}>
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

                <ToggleSwitch
                  checked={soundEnabled}
                  onChange={onSoundChange}
                  ariaLabel="Ativar sons"
                />
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
                <div style={{ fontWeight: "600", marginBottom: "4px" }}>
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

              <ToggleSwitch
                checked={animationsEnabled}
                onChange={onAnimationsChange}
                ariaLabel="Ativar animações"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
