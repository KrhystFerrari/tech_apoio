import { BookOpen, Calculator, Trophy } from "lucide-react";

export const StudentQuickActions = () => {
  return (
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
  );
};