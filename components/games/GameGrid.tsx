import { motion } from "framer-motion";
import { Play, Target } from "lucide-react";

export interface GameData {
  id: string;
  nome: string;
  descricao: string;
  dificuldade: string;
  component: React.ComponentType<{
    onGameComplete: (score: number) => void;
    currentLevel: number;
  }> | null;
  cor: string;
  emoji: string;
}

interface GameGridProps {
  jogos: GameData[];
  onGameSelect: (gameId: string) => void;
}

export const GameGrid = ({ jogos, onGameSelect }: GameGridProps) => {
  return (
    <section className="section-spacing">
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#1a1a1a",
            marginBottom: "1rem",
          }}
        >
          🎮 Escolha Sua Aventura
        </h2>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#666666",
            margin: 0,
          }}
        >
          Jogos divertidos para aprender português brincando!
        </p>
      </div>

      <div
        className="features-grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {jogos.map((jogo, index) => (
          <motion.div
            key={jogo.id}
            className="card card-interactive"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              cursor: jogo.component ? "pointer" : "not-allowed",
              opacity: jogo.component ? 1 : 0.6,
            }}
            onClick={() => {
              if (jogo.component) {
                onGameSelect(jogo.id);
              }
            }}
          >
            <div className="card-content" style={{ padding: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "16px",
                    backgroundColor: jogo.cor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                  }}
                >
                  {jogo.emoji}
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    backgroundColor: "#f3f4f6",
                    color: "#666666",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    fontWeight: "500",
                  }}
                >
                  {jogo.dificuldade}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  marginBottom: "0.75rem",
                }}
              >
                {jogo.nome}
              </h3>

              <p
                style={{
                  color: "#666666",
                  fontSize: "1rem",
                  marginBottom: "1.5rem",
                  lineHeight: "1.5",
                }}
              >
                {jogo.descricao}
              </p>

              <button
                className="btn btn-primary"
                style={{
                  width: "100%",
                  backgroundColor: jogo.component ? jogo.cor : "#d1d5db",
                  cursor: jogo.component ? "pointer" : "not-allowed",
                }}
                disabled={!jogo.component}
              >
                {jogo.component ? (
                  <>
                    <Play style={{ width: "1.25rem", height: "1.25rem" }} />
                    Jogar Agora
                  </>
                ) : (
                  <>
                    <Target style={{ width: "1.25rem", height: "1.25rem" }} />
                    Em Breve
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
