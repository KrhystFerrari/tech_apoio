import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export const GamesHeader = () => {
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
