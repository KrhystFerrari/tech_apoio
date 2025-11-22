"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, LogOut } from "lucide-react";

interface StudentHeaderProps {
  student: { name: string; age: number; grade?: number } | null;
  onLogout: () => void;
}

export const StudentHeader = ({ student, onLogout }: StudentHeaderProps) => {
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
    <header className={`header-logiclike ${isScrolled ? "scrolled" : ""}`}>
      <div className="container-logiclike">
        <div className="header-content">
          <Link href="/dashboard/estudante" className="logo-logiclike">
            <div className="logo-icon">
              <BookOpen className="w-6 h-6" />
            </div>
            TechApoio
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-logiclike">
            <span className="nav-text">
              👋 Olá, {student?.name}! ({student?.age} anos)
            </span>
            <button
              onClick={onLogout}
              className="btn btn-outline"
              style={{ fontSize: "0.875rem" }}
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
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
            <span
              className="nav-text"
              style={{ padding: "0.75rem", color: "white" }}
            >
              👋 {student?.name}
            </span>
            <button
              onClick={() => {
                onLogout();
                setIsMobileMenuOpen(false);
              }}
              className="btn btn-outline"
              style={{ margin: "0.5rem" }}
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};