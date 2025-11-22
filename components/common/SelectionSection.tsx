"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SelectionOption {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: "blue" | "green" | "purple" | "orange";
}

interface SelectionSectionProps {
  title: string;
  subtitle: string;
  emoji: string;
  options: SelectionOption[];
  footerText?: string;
  footerLink?: {
    href: string;
    label: string;
    icon?: LucideIcon;
  };
  backLink?: {
    href: string;
    label: string;
  };
  className?: string;
}

export const SelectionSection = ({
  title,
  subtitle,
  emoji,
  options,
  footerText,
  footerLink,
  backLink = { href: "/inicio", label: "← Voltar ao início" },
  className = "",
}: SelectionSectionProps) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        padding: "60px 0",
      }}
      className={className}
    >
      <div className="container-logiclike">
        <div
          style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
        >
          {/* Header */}
          <div style={{ marginBottom: "60px" }}>
            <div style={{ fontSize: "64px", marginBottom: "24px" }}>
              {emoji}
            </div>
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "800",
                color: "var(--text-primary)",
                marginBottom: "24px",
                lineHeight: "1.2",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "20px",
                color: "var(--text-secondary)",
                marginBottom: "0",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Selection Cards */}
          <div
            className="features-grid"
            style={{ maxWidth: "700px", margin: "0 auto 60px" }}
          >
            {options.map((option) => (
              <Link
                key={option.href}
                href={option.href}
                className="card card-interactive"
                style={{ textDecoration: "none" }}
              >
                <div className="card-content feature-card">
                  <div className={`feature-icon ${option.color}`}>
                    <option.icon className="w-8 h-8" />
                  </div>
                  <h3 className="feature-title">{option.title}</h3>
                  <p className="feature-description">{option.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center" }}>
            {footerText && (
              <p
                style={{ color: "var(--text-secondary)", marginBottom: "16px" }}
              >
                {footerText}
              </p>
            )}

            {footerLink && (
              <Link
                href={footerLink.href}
                className="btn btn-outline btn-large"
              >
                {footerLink.icon && <footerLink.icon className="w-5 h-5" />}
                {footerLink.label}
              </Link>
            )}

            {backLink && (
              <div style={{ marginTop: "32px" }}>
                <Link
                  href={backLink.href}
                  style={{
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.2s ease",
                  }}
                >
                  {backLink.label}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
