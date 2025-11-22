"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, CheckCircle2, Shuffle } from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
  processBadgesAfterGameAction,
  GameAction,
} from "@/src/helpers/badge-actions.helpers";
import {
  BadgeNotificationSystem,
  useBadgeNotifications,
} from "@/components/badges/BadgeNotificationSystem";
import { useAuth } from "@/lib/contexts/AuthContext";

interface FormePalavrasGameProps {
  onGameComplete: (score: number) => void;
}

interface Palavra {
  palavra: string;
  dica: string;
  categoria: string;
  emoji: string;
}

interface LetterSlot {
  letter: string | null;
  isCorrect: boolean;
  index: number;
}

// Palavras simples e divertidas
const palavras: Palavra[] = [
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
    emoji: "🍽️",
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
];

export function FormePalavrasGame({
  onGameComplete,
}: Readonly<FormePalavrasGameProps>) {
  const { student } = useAuth();
  const { notifications, dismissNotification } = useBadgeNotifications();

  const [currentWord, setCurrentWord] = useState<Palavra | null>(null);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [wordSlots, setWordSlots] = useState<LetterSlot[]>([]);
  const [acertos, setAcertos] = useState(0);
  const [tentativas, setTentativas] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [isChecking, setIsChecking] = useState(false);
  const [showDica, setShowDica] = useState(false);

  // Embaralhar array
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Gerar nova palavra
  const gerarNovaPalavra = useCallback(() => {
    const palavra = palavras[Math.floor(Math.random() * palavras.length)];
    const letters = palavra.palavra.split("");
    const shuffled = shuffleArray(letters);

    setCurrentWord(palavra);
    setShuffledLetters(shuffled);
    setWordSlots(
      letters.map((_, index) => ({
        letter: null,
        isCorrect: false,
        index,
      }))
    );
    setIsChecking(false);
    setShowDica(false);
  }, []);

  // Inicializar primeira palavra
  useEffect(() => {
    // Use a timeout to avoid cascading renders
    setTimeout(() => {
      gerarNovaPalavra();
    }, 0);
  }, [gerarNovaPalavra]);

  // Colocar letra no slot
  const placeLetter = useCallback(
    (letter: string, slotIndex: number) => {
      if (isChecking || !currentWord) return;

      const newSlots = [...wordSlots];
      const newShuffled = [...shuffledLetters];

      // Remover letra se já estiver no slot
      if (newSlots[slotIndex].letter) {
        newShuffled.push(newSlots[slotIndex].letter);
      }

      // Colocar nova letra
      newSlots[slotIndex] = {
        ...newSlots[slotIndex],
        letter: letter,
      };

      // Remover letra das disponíveis
      const letterIndex = newShuffled.indexOf(letter);
      if (letterIndex > -1) {
        newShuffled.splice(letterIndex, 1);
      }

      setWordSlots(newSlots);
      setShuffledLetters(newShuffled);
    },
    [wordSlots, shuffledLetters, isChecking, currentWord]
  );

  // Remover letra do slot
  const removeLetter = useCallback(
    (slotIndex: number) => {
      if (isChecking || !currentWord) return;

      const newSlots = [...wordSlots];
      const newShuffled = [...shuffledLetters];

      if (newSlots[slotIndex].letter) {
        newShuffled.push(newSlots[slotIndex].letter);
        newSlots[slotIndex] = {
          ...newSlots[slotIndex],
          letter: null,
        };

        setWordSlots(newSlots);
        setShuffledLetters(newShuffled);
      }
    },
    [wordSlots, shuffledLetters, isChecking, currentWord]
  );

  // Verificar palavra
  const verificarPalavra = useCallback(async () => {
    if (!currentWord || isChecking) return;

    // Verificar se todos os slots estão preenchidos
    const formedWord = wordSlots.map((slot) => slot.letter).join("");
    if (formedWord.length !== currentWord.palavra.length) {
      toast.error("Complete todas as letras!");
      return;
    }

    setIsChecking(true);

    // Verificar cada letra
    const newSlots = wordSlots.map((slot, index) => ({
      ...slot,
      isCorrect: slot.letter === currentWord.palavra[index],
    }));

    setWordSlots(newSlots);

    setTimeout(async () => {
      const correct = formedWord === currentWord.palavra;

      if (correct) {
        setAcertos((prev) => prev + 1);
        toast.success(
          `🎉 Correto! A palavra era ${currentWord.palavra} ${currentWord.emoji}!`
        );
        setShowCelebration(true);

        setTimeout(async () => {
          setShowCelebration(false);
          setTentativas((prev) => prev + 1);

          if (acertos + 1 >= 5) {
            setGameComplete(true);
            const score = Math.round(((acertos + 1) / (tentativas + 1)) * 100);
            const timeSpent = Math.round((Date.now() - startTime) / 1000);

            onGameComplete(score);

            // Processar badges após completar o jogo
            if (student) {
              const gameAction: GameAction = {
                studentId: student.id,
                gameId: "forme-palavras",
                materia: "portugues",
                questionsAnswered: tentativas + 1,
                correctAnswers: acertos + 1,
                scorePercentage: score,
                timeSpent: timeSpent,
                hintsUsed: showDica ? 1 : 0,
              };

              try {
                const badgeResult = await processBadgesAfterGameAction(
                  gameAction
                );
                if (badgeResult.earned) {
                  toast.success(`🏆 ${badgeResult.message}`);
                }
              } catch (error) {
                console.error("Erro ao processar badges:", error);
              }
            }
          } else {
            gerarNovaPalavra();
          }
        }, 2000);
      } else {
        toast.error(
          `Ops! A palavra era ${currentWord.palavra}. Tente novamente!`
        );
        setTimeout(() => {
          setTentativas((prev) => prev + 1);
          gerarNovaPalavra();
        }, 3000);
      }
    }, 1000);
  }, [
    currentWord,
    wordSlots,
    isChecking,
    acertos,
    tentativas,
    onGameComplete,
    gerarNovaPalavra,
    student,
    startTime,
    showDica,
  ]);

  // Embaralhar letras disponíveis
  const embaralharLetras = useCallback(() => {
    if (!isChecking) {
      setShuffledLetters((prev) => shuffleArray(prev));
    }
  }, [isChecking]);

  const resetGame = () => {
    setAcertos(0);
    setTentativas(0);
    setGameComplete(false);
    setShowCelebration(false);
    gerarNovaPalavra();
  };

  if (!currentWord) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparando as palavras...</p>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-xl max-w-md mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl mb-4"
          >
            📝
          </motion.div>

          <h3 className="text-2xl font-bold mb-2">Incrível!</h3>
          <p className="text-green-100 mb-6">Você é um mestre das palavras!</p>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold">{acertos}</div>
                <div className="text-sm text-green-100">Acertos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {Math.round((acertos / tentativas) * 100) || 100}%
                </div>
                <div className="text-sm text-green-100">Precisão</div>
              </div>
            </div>
          </div>

          <button
            onClick={resetGame}
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            🔤 Formar Novamente
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header do Jogo */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">🔤 Forme Palavras</h2>
            <p className="text-green-100">
              Arraste as letras para formar a palavra
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-green-100 mb-2">
              Progresso: {acertos}/5 palavras
            </div>
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(acertos / 5) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Área do Jogo */}
      <div className="bg-white rounded-xl shadow-lg border p-8">
        {/* Emoji e categoria */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-8xl mb-4"
          >
            {currentWord.emoji}
          </motion.div>
          <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
            {currentWord.categoria}
          </div>
        </div>

        {/* Dica */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowDica(!showDica)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
          >
            <span>💡</span>
            <span>{showDica ? "Esconder Dica" : "Ver Dica"}</span>
          </button>

          <AnimatePresence>
            {showDica && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4"
              >
                <p className="text-yellow-800 font-medium">
                  {currentWord.dica}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Slots para formar a palavra */}
        <div className="flex justify-center space-x-2 mb-8">
          {wordSlots.map((slot, index) => (
            <motion.button
              key={index}
              onClick={() => slot.letter && removeLetter(index)}
              className={cn(
                "w-16 h-16 rounded-lg border-2 font-bold text-xl transition-all",
                slot.letter
                  ? isChecking
                    ? slot.isCorrect
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-red-500 text-white border-red-500"
                    : "bg-green-100 border-green-300 hover:bg-green-200 text-green-800"
                  : "bg-gray-100 border-gray-300 border-dashed"
              )}
              whileHover={{ scale: slot.letter && !isChecking ? 1.05 : 1 }}
              whileTap={{ scale: slot.letter && !isChecking ? 0.95 : 1 }}
              disabled={isChecking}
            >
              {slot.letter || ""}
            </motion.button>
          ))}
        </div>

        {/* Botões de ação */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={embaralharLetras}
            disabled={isChecking}
            className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <Shuffle className="w-4 h-4" />
            <span>Embaralhar</span>
          </button>

          <button
            onClick={verificarPalavra}
            disabled={isChecking || wordSlots.some((slot) => !slot.letter)}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isChecking ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Verificando...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Verificar</span>
              </>
            )}
          </button>

          <button
            onClick={gerarNovaPalavra}
            disabled={isChecking}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Nova Palavra</span>
          </button>
        </div>

        {/* Letras disponíveis */}
        <div className="text-center">
          <p className="text-gray-600 mb-4 font-medium">Letras disponíveis:</p>
          <div className="flex justify-center flex-wrap gap-2">
            {shuffledLetters.map((letter, index) => (
              <motion.button
                key={`${letter}-${index}`}
                onClick={() => {
                  const emptySlotIndex = wordSlots.findIndex(
                    (slot) => !slot.letter
                  );
                  if (emptySlotIndex !== -1) {
                    placeLetter(letter, emptySlotIndex);
                  }
                }}
                className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-bold text-lg transition-all shadow-md disabled:opacity-50"
                whileHover={{ scale: !isChecking ? 1.05 : 1 }}
                whileTap={{ scale: !isChecking ? 0.95 : 1 }}
                disabled={isChecking}
              >
                {letter}
              </motion.button>
            ))}
          </div>
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
            <motion.div
              className="text-8xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sistema de Notificações de Badges */}
      <BadgeNotificationSystem
        notifications={notifications}
        onDismiss={dismissNotification}
        position="top-right"
      />
    </div>
  );
}
