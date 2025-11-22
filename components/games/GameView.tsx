import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { GameData } from "./GameGrid";

interface GameViewProps {
  jogo: GameData;
  onBackToGames: () => void;
}

export const GameView = ({ jogo, onBackToGames }: GameViewProps) => {
  if (!jogo?.component) return null;

  const GameComponent = jogo.component;

  return (
    <section className="section-spacing">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={onBackToGames}
            className="btn btn-secondary"
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <ArrowLeft style={{ width: "1rem", height: "1rem" }} />
            Voltar aos Jogos
          </button>

          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "0.5rem",
            }}
          >
            {jogo.emoji} {jogo.nome}
          </h1>
          <p style={{ color: "#666666", fontSize: "1.125rem" }}>
            {jogo.descricao}
          </p>
        </div>

        <GameComponent
          onGameComplete={(score: number) => {
            console.log(`Jogo concluído com score: ${score}`);
          }}
          currentLevel={1}
        />
      </motion.div>
    </section>
  );
};
