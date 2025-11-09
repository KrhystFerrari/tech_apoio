"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  BookOpen,
  Users,
  Trophy,
  Star,
  Calculator,
  Computer,
  Microscope,
  Target,
  Award,
  Mail,
} from "lucide-react";
import { ClientOnly } from "@/lib/components/ClientOnly";

// Enhanced Header Component with scroll effects
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`header-logiclike ${isScrolled ? "scrolled" : ""}`}
      suppressHydrationWarning={true}
    >
      <div className="container-logiclike">
        <div className="header-content">
          <Link href="/" className="logo-logiclike">
            <div className="logo-icon">
              <BookOpen className="w-6 h-6" />
            </div>
            TechApoio
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-logiclike">
            <Link href="#beneficios" className="nav-link">
              Benefícios
            </Link>
            <Link href="#como-funciona" className="nav-link">
              Como Funciona
            </Link>
            <Link href="#depoimentos" className="nav-link">
              Depoimentos
            </Link>
            <Link href="/login" className="btn btn-primary">
              <Play className="w-4 h-4" />
              🔐 Fazer Login
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`menu-toggle ${isMobileMenuOpen ? "open" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            tabIndex={0}
          >
            <div className="menu-line"></div>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="nav-menu-mobile">
            <Link
              href="#beneficios"
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Benefícios
            </Link>
            <Link
              href="#como-funciona"
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="#depoimentos"
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Depoimentos
            </Link>
            <Link
              href="/login"
              className="btn btn-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Play className="w-4 h-4" />
              🔐 Fazer Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

// Modern Footer Component LogicLike Style
const Footer = () => (
  <footer className="footer-logiclike">
    <div className="container-logiclike">
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <div className="logo-icon">
              <BookOpen className="w-6 h-6" />
            </div>
            TechApoio
          </Link>

          <p className="footer-description">
            A melhor plataforma educativa para crianças de 6 a 10 anos.
            Aprendizado divertido através de jogos interativos e atividades
            lúdicas.
          </p>

          <div className="footer-social">
            <button className="social-link" aria-label="Facebook">
              <span className="w-5 h-5 text-lg">📘</span>
            </button>
            <button className="social-link" aria-label="Instagram">
              <span className="w-5 h-5 text-lg">📷</span>
            </button>
            <button className="social-link" aria-label="Twitter">
              <span className="w-5 h-5 text-lg">🐦</span>
            </button>
            <button className="social-link" aria-label="YouTube">
              <span className="w-5 h-5 text-lg">📺</span>
            </button>
          </div>
        </div>

        {/* Platform Column */}
        <div className="footer-column">
          <h4 className="footer-title">🎮 Para Estudantes</h4>
          <Link href="/dashboard" className="footer-link">
            🏠 Minha Área
          </Link>
          <Link href="#" className="footer-link">
            📚 Português Divertido
          </Link>
          <Link href="#" className="footer-link">
            🔢 Matemática Legal
          </Link>
          <Link href="#" className="footer-link">
            💻 Mundo Tech
          </Link>
          <Link href="#" className="footer-link">
            🔬 Ciências Incríveis
          </Link>
        </div>

        {/* Support Column */}
        <div className="footer-column">
          <h4 className="footer-title">👨‍🏫 Para Professores</h4>
          <Link href="#" className="footer-link">
            📊 Painel do Professor
          </Link>
          <Link href="#" className="footer-link">
            📈 Relatórios de Turma
          </Link>
          <Link href="#" className="footer-link">
            🎯 Criar Atividades
          </Link>
          <Link href="#" className="footer-link">
            🏆 Acompanhar Progresso
          </Link>
          <Link href="#" className="footer-link">
            💬 Suporte Pedagógico
          </Link>
        </div>

        {/* Newsletter Column */}
        <div className="footer-column">
          <div className="footer-newsletter">
            <h4 className="newsletter-title">📧 Novidades Divertidas!</h4>
            <p className="newsletter-description">
              Receba dicas, jogos novos e novidades para professores e escolas!
              🎉
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Seu e-mail da escola 📩"
                className="newsletter-input"
                aria-label="Email para newsletter"
              />
              <button type="submit" className="newsletter-btn">
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          © 2025 TechApoio. Feito com 💜 para escolas e crianças do Brasil! 🇧🇷
        </div>

        <div className="footer-legal">
          <Link href="#">Política de Privacidade</Link>
          <Link href="#">Termos de Uso</Link>
          <Link href="#">Cookies</Link>
        </div>
      </div>
    </div>
  </footer>
);

// Hero Section LogicLike Style
const HeroSection = () => (
  <section className="hero-logiclike">
    <div className="container-logiclike">
      <div className="text-5xl mb-5" suppressHydrationWarning={true}>
        🚀📚✨
      </div>

      <h1 className="hero-title">
        A plataforma educativa mais divertida
        <br />
        para escolas em 2025! 🎉
      </h1>

      <p className="hero-subtitle">
        Desenvolvida especialmente para professores e alunos do ensino
        fundamental. Funciona em qualquer dispositivo: computador, tablet ou
        celular! 📱💻
      </p>

      <div className="hero-buttons">
        <Link href="/login" className="btn btn-primary btn-large">
          <Play className="w-5 h-5" />
          🔐 Fazer Login
        </Link>

        <Link href="/cadastro" className="btn btn-outline btn-large">
          <Users className="w-5 h-5" />� Criar Conta
        </Link>
      </div>

      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-number">🏫 500+</span>
          <span className="stat-label">Escolas parceiras</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">🎮 100+</span>
          <span className="stat-label">Jogos educativos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">😊 98%</span>
          <span className="stat-label">Crianças felizes</span>
        </div>
      </div>
    </div>
  </section>
);

// Benefits Section LogicLike Style
const BenefitsSection = () => {
  const benefits = [
    {
      icon: Target,
      title: "🎯 Preparar para o futuro",
      description:
        "Desenvolve habilidades digitais essenciais para a vida escolar e além! 🌟",
    },
    {
      icon: Play,
      title: "🎮 Aprender brincando",
      description:
        "Jogos educativos que transformam o aprendizado em uma grande aventura! 🚀",
    },
    {
      icon: Trophy,
      title: "🧠 Desenvolver a lógica",
      description:
        "Atividades especiais que exercitam o raciocínio e a criatividade! 💡",
    },
    {
      icon: Award,
      title: "📈 Acompanhar o progresso",
      description:
        "Professores podem ver o desenvolvimento de cada aluno em tempo real! 👨‍🏫",
    },
  ];

  return (
    <section id="beneficios" className="section-spacing">
      <div className="container-logiclike">
        <div className="section-header">
          <div
            className="text-5xl mb-5"
            suppressHydrationWarning={true}
          >
            🌈✨🎊
          </div>
          <h2 className="section-title">
            Por que as escolas amam o TechApoio? 💜
          </h2>
          <p className="section-subtitle">
            Uma plataforma completa para professores e alunos se divertirem
            aprendendo juntos!
          </p>
        </div>

        <div className="features-grid">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="card card-interactive">
              <div className="card-content feature-card">
                <div className="feature-icon blue">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="feature-title">{benefit.title}</h3>
                <p className="feature-description">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Interactive Platform Section LogicLike Style
const PlatformSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "📖 Português Mágico",
      description:
        "Histórias interativas, jogos de palavras e aventuras de leitura! ✨",
      color: "blue",
    },
    {
      icon: Calculator,
      title: "🔢 Matemática Divertida",
      description:
        "Números, operações e problemas que viram jogos incríveis! 🎲",
      color: "green",
    },
    {
      icon: Computer,
      title: "💻 Mundo da Tecnologia",
      description: "Primeiros passos na programação e criação digital! 🤖",
      color: "purple",
    },
    {
      icon: Microscope,
      title: "🔬 Laboratório de Ciências",
      description: "Experimentos virtuais e descobertas fantásticas! 🧪",
      color: "orange",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="section-spacing bg-gray-50"
    >
      <div className="container-logiclike">
        <div className="section-header">
          <div
            className="text-5xl mb-5"
            suppressHydrationWarning={true}
          >
            🎮🏫💡
          </div>
          <h2 className="section-title">
            Mundos de Aprendizado Esperando por Você! 🌍
          </h2>
          <p className="section-subtitle">
            Cada matéria é uma aventura diferente, criada especialmente para
            escolas modernas!
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.title} className="card card-interactive">
              <div className="card-content feature-card">
                <div className={`feature-icon ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-15">
          <Link href="/dashboard" className="btn btn-primary btn-large">
            🚀 Começar a Aventura Agora!
          </Link>
        </div>
      </div>
    </section>
  );
};

// Testimonial Section LogicLike Style
const TestimonialSection = () => {
  const testimonial = {
    name: "Professora Ana Silva",
    location: "Escola Municipal de São Paulo",
    avatar: "👩‍🏫",
    text: "O TechApoio revolucionou nossas aulas! As crianças ficam empolgadas com os jogos educativos e eu consigo acompanhar o progresso de cada aluno facilmente. A plataforma funciona perfeitamente nos tablets da escola!",
    rating: 5,
  };

  return (
    <section id="depoimentos" className="section-spacing">
      <div className="container-logiclike">
        <div className="section-header">
          <div
            className="text-5xl mb-5"
            suppressHydrationWarning={true}
          >
            💬⭐🏫
          </div>
          <h2 className="section-title">
            O que os professores estão falando! 👨‍🏫💜
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div
              className="card-content text-center p-10"
            >
              <div className="text-5xl mb-5">
                {testimonial.avatar}
              </div>

              <div
                className="flex justify-center mb-5"
              >
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={`star-rating-${testimonial.name}-${i}`}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <p
                className="text-lg text-gray-600 italic mb-5 leading-relaxed"
              >
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div>
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-gray-500 text-sm">
                  {testimonial.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section LogicLike Style
const CTASection = () => (
  <section
    className="section-spacing bg-primary-500 text-white"
  >
    <div className="container-logiclike">
      <div className="text-center max-w-4xl mx-auto">
        <div
          className="text-6xl mb-6"
          suppressHydrationWarning={true}
        >
          🎉🚀📚✨
        </div>{" "}
        <h2
          className="text-4xl font-bold mb-6 text-white"
        >
          Escolas inteligentes e crianças felizes! 🏫💜
        </h2>
        <p
          className="text-xl mb-10 opacity-90"
        >
          Funciona em qualquer dispositivo: computador, tablet ou celular!
          Perfeito para salas de aula modernas em 2025! 📱💻
        </p>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {[
            "🏫 Ideal para escolas e salas de aula",
            "⚡ Funciona em tempo real",
            "🎮 Jogos que as crianças adoram",
            "📊 Relatórios para professores",
          ].map((benefit) => (
            <div key={benefit} className="text-center">
              <div
                className="text-2xl mx-auto mb-4"
              >
                {benefit.split(" ")[0]}
              </div>
              <p className="text-base opacity-90">
                {benefit.split(" ").slice(1).join(" ")}
              </p>
            </div>
          ))}
        </div>
        <div
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link href="/dashboard" className="btn btn-secondary btn-large">
            <Play className="w-5 h-5" />
            🎮 Começar Grátis!
          </Link>

          <Link
            href="#como-funciona"
            className="btn btn-outline btn-large border-white text-white"
          >
            <Users className="w-5 h-5" />
            👨‍🏫 Para Professores
          </Link>
        </div>
      </div>
    </div>
  </section>
);

// Main Page Component
export default function InicioPage() {
  return (
    <div
      className="bg-white min-h-screen"
      suppressHydrationWarning={true}
    >
      <ClientOnly>
        <Header />
      </ClientOnly>
      <HeroSection />
      <BenefitsSection />
      <PlatformSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
}
