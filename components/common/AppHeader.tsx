"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

interface AppHeaderProps {
  className?: string;
  navigation?: Array<{
    href: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  showBackButton?: boolean;
  backHref?: string;
  backLabel?: string;
}

export const AppHeader = ({
  className = "",
  navigation = [],
  showBackButton = false,
  backHref = "/",
  backLabel = "🏠 Início",
}: AppHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <Link href="/inicio" className="logo-logiclike">
            <div className="logo-icon">
              <BookOpen className="w-6 h-6" />
            </div>
            TechApoio
          </Link>

          {/* Navigation */}
          {navigation.length > 0 && (
            <nav className="nav-logiclike">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.icon && <item.icon className="w-4 h-4 inline mr-2" />}
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Back Button */}
          {showBackButton && (
            <Link href={backHref} className="btn btn-secondary">
              {backLabel}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
