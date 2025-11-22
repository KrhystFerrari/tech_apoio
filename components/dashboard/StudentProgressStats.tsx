import { Trophy, Star, PlayCircle } from "lucide-react";

export const StudentProgressStats = () => {
  return (
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
  );
};