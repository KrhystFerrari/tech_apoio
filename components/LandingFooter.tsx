"use client";

import Link from "next/link";
import { BookOpen, Mail } from "lucide-react";

interface LandingFooterProps {
  className?: string;
}

// Modern Footer Component LogicLike Style for Landing Page
export const LandingFooter = ({ className = "" }: LandingFooterProps) => (
  <footer className={`footer-logiclike ${className}`}>
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

          {/* <div className="footer-social">
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
          </div> */}
        </div>

        {/* Platform Column */}
        <div className="footer-column">
          <h4 className="footer-title">Para Estudantes</h4>
          <Link href="/dashboard" className="footer-link">
            Minha Área
          </Link>
          <Link href="#" className="footer-link">
            Português Divertido
          </Link>
          <Link href="#" className="footer-link">
            Matemática Legal
          </Link>
          <Link href="#" className="footer-link">
            Mundo Tech
          </Link>
          <Link href="#" className="footer-link">
            Ciências Incríveis
          </Link>
        </div>

        {/* Support Column */}
        <div className="footer-column">
          <h4 className="footer-title">Para Professores</h4>
          <Link href="#" className="footer-link">
            Painel do Professor
          </Link>
          <Link href="#" className="footer-link">
            Relatórios de Turma
          </Link>
          <Link href="#" className="footer-link">
            Criar Atividades
          </Link>
          <Link href="#" className="footer-link">
            Acompanhar Progresso
          </Link>
          <Link href="#" className="footer-link">
            Suporte Pedagógico
          </Link>
        </div>

        {/* Newsletter Column */}
        <div className="footer-column">
          <div className="footer-newsletter">
            <h4 className="newsletter-title">Novidades Divertidas!</h4>
            <p className="newsletter-description">
              Receba dicas, jogos novos e novidades para professores e escolas!
              🎉
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Seu e-mail da escola"
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
          © 2025 TechApoio. Feito por Krhyst Ferrari com 💜 para escolas e
          crianças do Brasil! 🇧🇷
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
