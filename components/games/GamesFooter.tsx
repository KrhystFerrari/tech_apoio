import Link from "next/link";
import { BookOpen } from "lucide-react";

export const GamesFooter = () => {
  return (
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
              Aprendizado divertido através de jogos interativos e atividades
              lúdicas.
            </p>
          </div>
          <div className="footer-column">
            <h4 className="footer-title">🎮 Para Estudantes</h4>
            <Link href="/dashboard/estudante" className="footer-link">
              🏠 Minha Área
            </Link>
            <Link href="#" className="footer-link">
              📚 Português Divertido
            </Link>
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
};
