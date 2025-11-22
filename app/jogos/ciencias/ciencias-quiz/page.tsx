"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Trophy } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CienciasGame } from "@/components/games/CienciasGame";
import { ClientOnly } from "@/lib/components/ClientOnly";

export default function CienciasQuizPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (globalThis.window !== undefined) {
        setIsInitialized(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleGameComplete = useCallback((finalScore: number) => {
    setScore(finalScore);
    setGameCompleted(true);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGameStarted(false);
    setGameCompleted(false);
    setScore(0);
  }, []);

  const getStars = useCallback(() => {
    if (score >= 90) return 3;
    if (score >= 70) return 2;
    if (score >= 50) return 1;
    return 0;
  }, [score]);

  const getResultMessage = useCallback(() => {
    if (score >= 90) return "Excelente! Você é um verdadeiro cientista! 🌟";
    if (score >= 70) return "Muito bom! Você tem talento para ciências! 👨‍🔬";
    if (score >= 50) return "Bom trabalho! Continue estudando! 📚";
    return "Continue praticando! A ciência está esperando por você! 🔬";
  }, [score]);

  const renderMainContent = () => {
    if (!gameStarted && !gameCompleted) {
      // Game Introduction
      return (
        <section className="section-spacing">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div
              style={{
                background: "linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)",
                borderRadius: "var(--radius-xl)",
                padding: "3rem 2rem",
                textAlign: "center",
                color: "white",
                marginBottom: "3rem",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: "4rem", marginBottom: "1.5rem" }}
              >
                🧪
              </motion.div>
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                Quiz de Ciências
              </h1>
              <p
                style={{
                  fontSize: "1.25rem",
                  opacity: 0.9,
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                Descubra os mistérios do mundo científico através de perguntas
                divertidas!
              </p>
            </div>

            <div
              className="card"
              style={{ maxWidth: "800px", margin: "0 auto" }}
            >
              <div className="card-content" style={{ padding: "2.5rem" }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                  <h2
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      marginBottom: "1rem",
                    }}
                  >
                    🚀 Embarque nesta Aventura Científica!
                  </h2>
                  <p
                    style={{
                      fontSize: "1.125rem",
                      color: "#666666",
                      lineHeight: "1.6",
                      marginBottom: "2rem",
                    }}
                  >
                    Teste seus conhecimentos sobre plantas, animais, corpo
                    humano e muito mais!
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1.5rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      borderRadius: "var(--radius-lg)",
                      padding: "1.25rem",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                      🌱
                    </div>
                    <div style={{ fontWeight: "600" }}>Plantas</div>
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      borderRadius: "var(--radius-lg)",
                      padding: "1.25rem",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                      🦁
                    </div>
                    <div style={{ fontWeight: "600" }}>Animais</div>
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                      borderRadius: "var(--radius-lg)",
                      padding: "1.25rem",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                      🫀
                    </div>
                    <div style={{ fontWeight: "600" }}>Corpo Humano</div>
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <motion.button
                    onClick={() => setGameStarted(true)}
                    className="btn btn-primary"
                    style={{
                      background:
                        "linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)",
                      color: "white",
                      padding: "1rem 2rem",
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      border: "none",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "0 8px 25px rgba(20, 184, 166, 0.3)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      margin: "0 auto",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🚀 Começar Quiz
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      );
    }

    if (gameCompleted) {
      // Game Results
      return (
        <section className="section-spacing">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="card">
              <div className="card-content" style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    boxShadow: "0 8px 25px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  <Trophy className="w-10 h-10 text-white" />
                </div>

                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    marginBottom: "0.5rem",
                  }}
                >
                  Parabéns! 🎉
                </h3>
                <p
                  style={{
                    color: "#666666",
                    marginBottom: "2rem",
                    fontSize: "1.125rem",
                  }}
                >
                  {getResultMessage()}
                </p>

                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)",
                    borderRadius: "var(--radius-lg)",
                    padding: "1.5rem",
                    marginBottom: "1.5rem",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "700",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {score}%
                  </div>
                  <div style={{ fontSize: "1rem", opacity: 0.9 }}>
                    Pontuação Final
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem",
                    marginBottom: "2rem",
                  }}
                >
                  {new Array(3).fill(null).map((_, i) => (
                    <Star
                      key={`result-star-${score}-${i}`}
                      className={`w-8 h-8 ${
                        i < getStars()
                          ? "text-yellow-500 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={handlePlayAgain}
                    className="btn btn-secondary"
                    style={{
                      background: "#6c757d",
                      color: "white",
                      padding: "0.875rem 1.5rem",
                    }}
                  >
                    🔄 Jogar Novamente
                  </button>
                  <Link
                    href="/jogos/ciencias"
                    className="btn btn-primary"
                    style={{
                      background:
                        "linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)",
                      color: "white",
                      padding: "0.875rem 1.5rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ➡️ Voltar aos Jogos
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      );
    }

    // Game Component
    return (
      <section className="section-spacing">
        <div
          style={{
            background: "linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)",
            borderRadius: "var(--radius-xl)",
            padding: "1.5rem 2rem",
            color: "white",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              marginBottom: "0.25rem",
            }}
          >
            🧪 Quiz de Ciências
          </h1>
          <p style={{ opacity: 0.9, margin: 0 }}>
            Descubra os mistérios da ciência!
          </p>
        </div>

        <div className="card">
          <div className="card-content">
            <CienciasGame
              key={gameStarted ? "started" : "reset"}
              onGameComplete={handleGameComplete}
            />
          </div>
        </div>
      </section>
    );
  };

  if (!isInitialized) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen" suppressHydrationWarning={true}>
      <ClientOnly>
        <Header />
      </ClientOnly>

      <main className="main-content">
        <div className="container-logiclike">{renderMainContent()}</div>
      </main>

      <Footer />
    </div>
  );
}
