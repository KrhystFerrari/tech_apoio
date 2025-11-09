"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Play, Target } from "lucide-react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import FormePalavrasGame from "@/app/components/games/FormePalavrasGame";
import { ClientOnly } from "@/lib/components/ClientOnly";

// Header Component com layout fluido
const Header = () => {
  return (
    <header className="header-logiclike">
      <div className="container-logiclike">
        <div className="header-content">
          <Link href="/dashboard/estudante" className="logo-logiclike">
            <div className="logo-icon">
              <BookOpen className="w-6 h-6" />
            </div>
            TechApoio
          </Link>

          <nav className="nav-logiclike">
            <Link href="/dashboard/estudante" className="nav-link">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Footer Component com layout fluido
const Footer = () => (
  <footer className="footer-logiclike">
    <div className="container-logiclike">
      <div className="footer-content">
        <div className="footer-brand">
          <Link href="/inicio" className="footer-logo">
            <div className="logo-icon">
              <BookOpen className="w-6 h-6" />
            </div>
            TechApoio
          </Link>
          <p className="footer-description">
            A melhor plataforma educativa para crianças de 6 a 10 anos.
            Aprendizado divertido através de jogos interativos e atividades lúdicas.
          </p>
        </div>
        <div className="footer-column">
          <h4 className="footer-title">🎮 Para Estudantes</h4>
          <Link href="/dashboard/estudante" className="footer-link">🏠 Minha Área</Link>
          <Link href="#" className="footer-link">📚 Português Divertido</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copyright">
          © 2025 TechApoio. Feito com 💜 para escolas e crianças do Brasil! 🇧🇷
        </div>
      </div>
    </div>
  </footer>
);

// Interfaces para TypeScript
interface Jogo {
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

// Componente GameSelector separado
const GameSelector = ({ jogos, setJogoAtivo }: { 
  jogos: Jogo[]; 
  setJogoAtivo: (id: string) => void; 
}) => (
  <div className="bg-white min-h-screen" suppressHydrationWarning={true}>
    <ClientOnly>
      <Header />
    </ClientOnly>
    
    <main className="main-content">
      <div className="container-logiclike">
        {/* Hero Section */}
        <section className="section-spacing" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <div className="card" style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            color: "white",
            padding: "2.5rem",
            borderRadius: "24px",
            textAlign: "center",
            border: "none",
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📚</div>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "1rem",
              color: "white",
            }}>
              Português Mágico
            </h1>
            <p style={{
              fontSize: "1.25rem",
              opacity: 0.9,
              marginBottom: "0",
              color: "white",
            }}>
              Explore palavras, histórias e aventuras incríveis! 🌟
            </p>
          </div>
        </section>

        {/* Jogos Grid */}
        <section className="section-spacing">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "1rem",
            }}>
              🎮 Escolha Sua Aventura
            </h2>
            <p style={{
              fontSize: "1.125rem",
              color: "#666666",
              margin: 0,
            }}>
              Jogos divertidos para aprender português brincando!
            </p>
          </div>

          <div className="features-grid" style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}>
            {jogos.map((jogo, index) => (
              <motion.div
                key={jogo.id}
                className="card card-interactive"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ 
                  cursor: jogo.component ? "pointer" : "not-allowed",
                  opacity: jogo.component ? 1 : 0.6 
                }}
                onClick={() => {
                  if (jogo.component) {
                    setJogoAtivo(jogo.id);
                  }
                }}
              >
                <div className="card-content" style={{ padding: "2rem" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.5rem",
                  }}>
                    <div style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "16px",
                      backgroundColor: jogo.cor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                    }}>
                      {jogo.emoji}
                    </div>
                    <span style={{
                      fontSize: "0.75rem",
                      backgroundColor: "#f3f4f6",
                      color: "#666666",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "12px",
                      fontWeight: "500",
                    }}>
                      {jogo.dificuldade}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#1a1a1a",
                    marginBottom: "0.75rem",
                  }}>
                    {jogo.nome}
                  </h3>

                  <p style={{
                    color: "#666666",
                    fontSize: "1rem",
                    marginBottom: "1.5rem",
                    lineHeight: "1.5",
                  }}>
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
      </div>
    </main>

    <Footer />
  </div>
);

// Componente GameView separado
const GameView = ({ 
  jogo, 
  setJogoAtivo 
}: { 
  jogo: Jogo; 
  setJogoAtivo: (id: string | null) => void; 
}) => {
  if (!jogo?.component) return null;
  
  const GameComponent = jogo.component;
  
  return (
    <div className="bg-white min-h-screen" suppressHydrationWarning={true}>
      <ClientOnly>
        <Header />
      </ClientOnly>
      
      <main className="main-content">
        <div className="container-logiclike">
          <section className="section-spacing">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto"
            >
              <div style={{ marginBottom: "2rem" }}>
                <Button
                  onClick={() => setJogoAtivo(null)}
                  variant="secondary"
                  className="mb-4"
                >
                  <ArrowLeft style={{ width: "1rem", height: "1rem" }} />
                  Voltar aos Jogos
                </Button>
                
                <h1 style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: "700", 
                  color: "#1a1a1a",
                  marginBottom: "0.5rem" 
                }}>
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default function JogosPortugues() {
  const [jogoAtivo, setJogoAtivo] = useState<string | null>(null);

  const jogos = [
    {
      id: "forme-palavras",
      nome: "🔤 Forme Palavras",
      descricao: "Arraste as letras e forme palavras divertidas!",
      dificuldade: "Fácil",
      component: FormePalavrasGame,
      cor: "#3b82f6",
      emoji: "🔤"
    },
    {
      id: "encontre-rimas",
      nome: "🎵 Encontre as Rimas",
      descricao: "Descubra palavras que rimam umas com as outras!",
      dificuldade: "Médio",
      component: null,
      cor: "#10b981",
      emoji: "🎵"
    },
    {
      id: "complete-historia",
      nome: "📚 Complete a História",
      descricao: "Use sua criatividade para completar histórias incríveis!",
      dificuldade: "Médio",
      component: null,
      cor: "#8b5cf6",
      emoji: "📚"
    },
    {
      id: "cacador-palavras",
      nome: "🔍 Caçador de Palavras",
      descricao: "Encontre palavras escondidas no caça-palavras!",
      dificuldade: "Difícil",
      component: null,
      cor: "#f59e0b",
      emoji: "🔍"
    }
  ];

  const jogoSelecionado = jogos.find(j => j.id === jogoAtivo);

  return jogoAtivo && jogoSelecionado ? 
    <GameView jogo={jogoSelecionado} setJogoAtivo={setJogoAtivo} /> : 
    <GameSelector jogos={jogos} setJogoAtivo={setJogoAtivo} />;
}