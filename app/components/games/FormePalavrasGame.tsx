"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Volume2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { cn } from "@/lib/utils";
import { 
  FormePalavrasGameProps, 
  Palavra, 
  ConfettiData 
} from "@/src/interfaces/FormePalavrasGame.types";
import {
  shuffleWordLetters,
  getRandomWord,
  calculateGameScore,
  validateWord,
  createEmptySlots,
  generateConfettiData,
  isGameComplete,
  getGameProgress,
  removeLetter,
  placeLetter
} from "@/src/helpers/FormePalavrasGame.helpers";

// Palavras organizadas por nível de dificuldade
const palavrasPorNivel: Record<number, Palavra[]> = {
  1: [
    {
      palavra: "GATO",
      dica: "Animal que faz miau",
      categoria: "animais",
      emoji: "🐱",
    },
    {
      palavra: "CASA",
      dica: "Lugar onde moramos",
      categoria: "lugares",
      emoji: "🏠",
    },
    {
      palavra: "BOLA",
      dica: "Brinquedo redondo",
      categoria: "brinquedos",
      emoji: "⚽",
    },
    {
      palavra: "PATO",
      dica: "Animal que nada",
      categoria: "animais",
      emoji: "🦆",
    },
  ],
  2: [
    {
      palavra: "FLOR",
      dica: "É bonita e cheirosa",
      categoria: "natureza",
      emoji: "🌸",
    },
    { palavra: "MESA", dica: "Onde comemos", categoria: "móveis", emoji: "🪑" },
    {
      palavra: "LIVRO",
      dica: "Tem muitas páginas",
      categoria: "objetos",
      emoji: "📚",
    },
    {
      palavra: "ÁRVORE",
      dica: "É grande e verde",
      categoria: "natureza",
      emoji: "🌳",
    },
  ],
  3: [
    {
      palavra: "ESCOLA",
      dica: "Lugar de aprender",
      categoria: "lugares",
      emoji: "🏫",
    },
    {
      palavra: "BONECA",
      dica: "Brinquedo de menina",
      categoria: "brinquedos",
      emoji: "👨‍🎓",
    },
    {
      palavra: "CAVALO",
      dica: "Animal que galopa",
      categoria: "animais",
      emoji: "🐴",
    },
    {
      palavra: "FAMÍLIA",
      dica: "Papai, mamãe e filhos",
      categoria: "pessoas",
      emoji: "👨‍👩‍👧‍👦",
    },
  ],
};

export default function FormePalavrasGame({
  onGameComplete,
  currentLevel,
}: Readonly<FormePalavrasGameProps>) {
  const palavrasDoNivel = palavrasPorNivel[currentLevel] || palavrasPorNivel[1];

  // Estados inicializados diretamente
  const [palavraAtual, setPalavraAtual] = useState<Palavra>(() => {
    const palavra = getRandomWord(palavrasDoNivel);
    return palavra;
  });

  const [letrasEmbaralhadas, setLetrasEmbaralhadas] = useState<string[]>(() => {
    const palavra = getRandomWord(palavrasDoNivel);
    return shuffleWordLetters(palavra.palavra);
  });

  const [letrasColocadas, setLetrasColocadas] = useState<(string | null)[]>(
    () => {
      const palavra = getRandomWord(palavrasDoNivel);
      return createEmptySlots(palavra.palavra.length);
    }
  );

  const [tentativas, setTentativas] = useState(1);
  const [acertos, setAcertos] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [confettiData] = useState(() => generateConfettiData(20));

  // Inicializar nova palavra
  const novapalavra = useCallback(() => {
    const palavra = getRandomWord(palavrasDoNivel);
    setPalavraAtual(palavra);

    // Embaralhar letras
    const embaralhadas = shuffleWordLetters(palavra.palavra);
    setLetrasEmbaralhadas(embaralhadas);

    // Reset das posições
    setLetrasColocadas(createEmptySlots(palavra.palavra.length));
    setTentativas((prev) => prev + 1);
  }, [palavrasDoNivel]);

  // Verificar palavra quando posições mudarem
  useEffect(() => {
    if (letrasColocadas.every((letra) => letra !== null) && palavraAtual) {
      const palavraFormada = letrasColocadas.join("");
      if (validateWord(palavraFormada, palavraAtual.palavra)) {
        // Usar timeout para evitar setState em render
        setTimeout(() => {
          setAcertos((prev) => prev + 1);
          setShowCelebration(true);

          // Som de sucesso (simulado com toast)
          toast.success(`🎉 Parabéns! Você formou ${palavraAtual.palavra}!`);

          setTimeout(() => {
            setShowCelebration(false);
            if (isGameComplete(acertos + 1)) {
              // Completou 3 palavras
              setGameComplete(true);
              const score = calculateGameScore(acertos + 1, tentativas);
              onGameComplete(score);
            } else {
              novapalavra();
            }
          }, 2000);
        }, 0);
      }
    }
  }, [
    letrasColocadas,
    palavraAtual,
    acertos,
    tentativas,
    onGameComplete,
    novapalavra,
  ]);

  // Handlers de drag and drop
  const handleDragStart = (letter: string, index: number) => {
    setDraggedLetter(letter);
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();

    if (draggedLetter && draggedIndex !== null) {
      const newLetrasEmbaralhadas = [...letrasEmbaralhadas];

      // Se já há uma letra na posição, volte para as embaralhadas
      if (letrasColocadas[position] !== null) {
        newLetrasEmbaralhadas.push(letrasColocadas[position]);
      }

      // Use o helper para colocar a letra na posição
      const newLetrasColocadas = placeLetter(letrasColocadas, draggedLetter, position);

      // Remova a letra das embaralhadas
      newLetrasEmbaralhadas.splice(draggedIndex, 1);

      setLetrasColocadas(newLetrasColocadas);
      setLetrasEmbaralhadas(newLetrasEmbaralhadas);
      setDraggedLetter(null);
      setDraggedIndex(null);
    }
  };

  const handleLetterClick = (position: number) => {
    if (letrasColocadas[position] !== null) {
      // Remover letra da posição e voltar para embaralhadas
      const { slots: newSlots, removedLetter } = removeLetter(letrasColocadas, position);
      setLetrasColocadas(newSlots);

      if (removedLetter) {
        setLetrasEmbaralhadas([...letrasEmbaralhadas, removedLetter]);
      }
    }
  };

  const resetGame = () => {
    setAcertos(0);
    setTentativas(0);
    setGameComplete(false);
    novapalavra();
  };

  if (gameComplete) {
    return (
      <Card className="text-center p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="space-y-6"
        >
          <div className="text-6xl">🎉</div>
          <h2 className="text-3xl font-bold text-primary-600">Parabéns!</h2>
          <p className="text-xl text-gray-600">
            Você completou o nível {currentLevel}!
          </p>
          <p className="text-lg">
            Acertou {acertos} de {tentativas} palavras
          </p>
          <Button onClick={resetGame} variant="primary" size="lg">
            Jogar Novamente
          </Button>
        </motion.div>
      </Card>
    );
  }

  if (!palavraAtual) {
    return (
      <Card className="text-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando jogo...</p>
      </Card>
    );
  }

  return (
    <div className="container-logiclike">
      {/* Header do Jogo com layout fluido */}
      <div className="card" style={{ marginBottom: "2rem", padding: "1.5rem" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <div>
            <h2 style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "0.5rem"
            }}>
              Forme Palavras - Nível {currentLevel}
            </h2>
            <p style={{ color: "#666666", margin: 0 }}>
              Arraste as letras para formar a palavra
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.875rem", color: "#666666", marginBottom: "0.5rem" }}>
              Progresso: {acertos}/3 palavras
            </div>
            <div style={{
              width: "200px",
              height: "8px",
              backgroundColor: "#e5e7eb",
              borderRadius: "4px",
              overflow: "hidden"
            }}>
              <motion.div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                  borderRadius: "4px",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${getGameProgress(acertos)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Área do Jogo com layout responsivo */}
      <div className="card" style={{
        padding: "2rem",
        textAlign: "center",
        background: "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
        marginBottom: "2rem"
      }}>
        {/* Categoria e Emoji */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{palavraAtual.emoji}</div>
          <div style={{
            fontSize: "0.875rem",
            color: "#666666",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: "500"
          }}>
            {palavraAtual.categoria}
          </div>
        </div>

        {/* Botões de Ação */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap"
        }}>
          <Button
            variant="accent"
            size="sm"
            icon={Volume2}
            onClick={() => toast(palavraAtual.dica, { icon: "💡" })}
          >
            Dica
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={novapalavra}
          >
            Nova Palavra
          </Button>
        </div>

        {/* Área de Colocação das Letras - Responsiva */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap"
        }}>
          {letrasColocadas.map((letra, index) => (
            <motion.div
              key={`slot-${palavraAtual.palavra}-${index}`}
              className={cn(
                "border-2 border-dashed border-gray-300 rounded-lg",
                "flex items-center justify-center text-2xl font-bold",
                "bg-white cursor-pointer hover:bg-gray-50 transition-all",
                letra && "border-green-400 bg-green-50 border-solid"
              )}
              style={{
                width: "3.5rem",
                height: "3.5rem",
                minWidth: "3.5rem"
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => handleLetterClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {letra}
            </motion.div>
          ))}
        </div>

        {/* Letras Embaralhadas - Responsivas */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          {letrasEmbaralhadas.map((letra, index) => (
            <motion.div
              key={`letter-${letra}-${index}`}
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: "#3b82f6",
                color: "white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                fontWeight: "700",
                cursor: "grab",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                userSelect: "none"
              }}
              draggable
              onDragStart={() => handleDragStart(letra, index)}
              whileHover={{ scale: 1.1, y: -2 }}
              whileDrag={{ scale: 1.2, rotate: 5, zIndex: 1000 }}
              whileTap={{ scale: 0.9 }}
            >
              {letra}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Celebração */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Emoji Central */}
            <motion.div
              className="text-8xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              🎉
            </motion.div>
            {/* Confetti */}
            {confettiData.map((confetti: ConfettiData) => (
              <motion.div
                key={confetti.id}
                className="absolute text-2xl"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  x: confetti.x,
                  y: confetti.y,
                  opacity: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 2,
                  delay: confetti.delay,
                }}
              >
                {confetti.emoji}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
