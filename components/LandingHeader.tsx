"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Play, BookOpen } from "lucide-react";

interface LandingHeaderProps {
  className?: string;
}

// Enhanced Header Component with scroll effects for Landing Page
export const LandingHeader = ({ className = "" }: LandingHeaderProps) => {
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
      className={`header-logiclike ${
        isScrolled ? "scrolled" : ""
      } ${className}`}
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
              if (e.key === "Enter" || e.key === " ") {
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
