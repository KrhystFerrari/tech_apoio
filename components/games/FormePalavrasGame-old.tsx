"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Volume2, BookOpen } from "lucide-react";
import { toast } from "react-hot-toast";
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
      dica: "Animal felino que faz miau",
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
      dica: "Brinquedo redondo para jogar",
      categoria: "brinquedos",
      emoji: "⚽",
    },
    {
      palavra: "PATO",
      dica: "Animal aquático que faz quack",
      categoria: "animais",
      emoji: "🦆",
    },
  ],
  2: [
    {
      palavra: "FLOR",
      dica: "Planta bonita e colorida",
      categoria: "natureza",
      emoji: "🌸",
    },
    { 
      palavra: "MESA", 
      dica: "Móvel onde comemos", 
      categoria: "móveis", 
      emoji: "🍽️" 
    },
    {
      palavra: "LIVRO",
      dica: "Objeto com páginas para ler",
      categoria: "objetos",
      emoji: "📚",
    },
    {
      palavra: "CARRO",
      dica: "Veículo com quatro rodas",
      categoria: "transportes",
      emoji: "🚗",
    },
  ],
  3: [
    {
      palavra: "ESCOLA",
      dica: "Lugar onde estudamos",
      categoria: "lugares",
      emoji: "🏫",
    },
    {
      palavra: "BONECA",
      dica: "Brinquedo em forma de pessoa",
      categoria: "brinquedos",
      emoji: "🪆",
    },
    {
      palavra: "CAVALO",
      dica: "Animal que galopa e relincha",
      categoria: "animais",
      emoji: "🐴",
    },
    {
      palavra: "BORBOLETA",
      dica: "Inseto colorido que voa",
      categoria: "insetos",
      emoji: "🦋",
    },
  ],
};

export function FormePalavrasGame({
  onGameComplete,
  currentLevel,
}: Readonly<FormePalavrasGameProps>) {
  const palavrasDoNivel = palavrasPorNivel[currentLevel] || palavrasPorNivel[1];

  // Inicializar com a mesma palavra para evitar inconsistência
  const [palavraInicial] = useState(() => getRandomWord(palavrasDoNivel));

  // Estados inicializados com a mesma palavra
  const [palavraAtual, setPalavraAtual] = useState<Palavra>(palavraInicial);

  const [letrasEmbaralhadas, setLetrasEmbaralhadas] = useState<string[]>(() => {
    return shuffleWordLetters(palavraInicial.palavra);
  });

  const [letrasColocadas, setLetrasColocadas] = useState<(string | null)[]>(
    () => {
      return createEmptySlots(palavraInicial.palavra.length);
    }
  );

  const [tentativas, setTentativas] = useState(1);
  const [acertos, setAcertos] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [confettiData] = useState(() => generateConfettiData(20));
  const isProcessingWordRef = useRef(false); // Previne múltiplas execuções

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
    isProcessingWordRef.current = false; // Reset do flag
  }, [palavrasDoNivel]);

  // Verificar palavra quando posições mudarem
  useEffect(() => {
    if (letrasColocadas.every((letra) => letra !== null) && palavraAtual && !isProcessingWordRef.current) {
      const palavraFormada = letrasColocadas.join("");
      if (validateWord(palavraFormada, palavraAtual.palavra)) {
        isProcessingWordRef.current = true; // Previne múltiplas execuções
        
        // Incrementar acertos usando timeout para evitar render durante effect
        setTimeout(() => {
          const novosAcertos = acertos + 1;
          setAcertos(novosAcertos);
          setShowCelebration(true);

          // Mostrar apenas UM toast de sucesso
          toast.success(`🎉 Parabéns! Você formou ${palavraAtual.palavra}!`, {
            id: `word-success-${palavraAtual.palavra}`, // ID único para evitar duplicatas
            duration: 3000,
          });

          setTimeout(() => {
            setShowCelebration(false);
            if (isGameComplete(novosAcertos)) {
              // Completou 3 palavras
              setGameComplete(true);
              const score = calculateGameScore(novosAcertos, tentativas);
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
      <div style={{ background: "white", minHeight: "100vh", padding: "2rem 0" }}>
        <div className="container-logiclike">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              color: "white",
              padding: "3rem",
              borderRadius: "24px",
              textAlign: "center",
              border: "none",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {/* Emoji animado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: "4rem", marginBottom: "1.5rem" }}
            >
              🎉
            </motion.div>

            {/* Título principal */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              Parabéns!
            </motion.h2>

            {/* Mensagem de conclusão */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                fontSize: "1.25rem",
                opacity: 0.9,
                marginBottom: "2rem",
                color: "white",
              }}
            >
              Você completou o nível {currentLevel}! 🚀
            </motion.p>

            {/* Estatísticas */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                padding: "1.5rem",
                marginBottom: "2rem",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div style={{ 
                display: "flex", 
                justifyContent: "space-around", 
                alignItems: "center",
                gap: "1rem"
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontSize: "2rem", 
                    fontWeight: "700", 
                    color: "white",
                    marginBottom: "0.5rem"
                  }}>
                    {acertos}
                  </div>
                  <div style={{ 
                    fontSize: "0.9rem", 
                    color: "rgba(255, 255, 255, 0.8)",
                    fontWeight: "500"
                  }}>
                    Palavras
                  </div>
                </div>
                <div style={{ 
                  width: "2px", 
                  height: "3rem", 
                  background: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "1px"
                }}></div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    fontSize: "2rem", 
                    fontWeight: "700", 
                    color: "white",
                    marginBottom: "0.5rem"
                  }}>
                    {Math.round((acertos / tentativas) * 100) || 100}%
                  </div>
                  <div style={{ 
                    fontSize: "0.9rem", 
                    color: "rgba(255, 255, 255, 0.8)",
                    fontWeight: "500"
                  }}>
                    Precisão
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Botão seguindo o padrão do projeto */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <button 
                onClick={resetGame} 
                className="btn btn-large"
                style={{
                  backgroundColor: "white",
                  color: "#3b82f6",
                  fontWeight: "600",
                  boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.1)",
                }}
              >
                🎮 Jogar Novamente
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!palavraAtual) {
    return (
      <div 
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
        }}
      >
        <div className="container-logiclike">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              textAlign: "center",
            }}
          >
            {/* Ícone do livro com animação pulse */}
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#3b82f6",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              <BookOpen 
                size={40} 
                color="white"
              />
            </div>
            
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#666666",
                fontWeight: "500",
                margin: 0,
              }}
            >
              Carregando jogo...
            </p>
          </div>

          {/* CSS para animação pulse */}
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes pulse {
                0%, 100% {
                  transform: scale(1);
                  opacity: 1;
                }
                50% {
                  transform: scale(1.1);
                  opacity: 0.8;
                }
              }
            `
          }} />
        </div>
      </div>
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
          <button
            className="btn btn-outline"
            onClick={() => toast(palavraAtual.dica, { icon: "💡" })}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Volume2 style={{ width: "1rem", height: "1rem" }} />
            Dica
          </button>
          <button
            className="btn btn-secondary"
            onClick={novapalavra}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <RefreshCw style={{ width: "1rem", height: "1rem" }} />
            Nova Palavra
          </button>
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
