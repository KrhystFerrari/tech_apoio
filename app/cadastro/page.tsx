"use client";

import Link from "next/link";
import { Users, GraduationCap, Play, BookOpen } from "lucide-react";

export default function CadastroSelectionPage() {
  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      {/* Header simplificado */}
      <header className="header-logiclike">
        <div className="container-logiclike">
          <div className="header-content">
            <Link href="/" className="logo-logiclike">
              <div className="logo-icon">
                <BookOpen className="w-6 h-6" />
              </div>
              TechApoio
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div
        style={{
          background: "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          padding: "60px 0",
        }}
      >
        <div className="container-logiclike">
          <div
            style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
          >
            {/* Header */}
            <div style={{ marginBottom: "60px" }}>
              <div style={{ fontSize: "64px", marginBottom: "24px" }}>
                📝✨🎉
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
                Criar nova conta
              </h1>
              <p
                style={{
                  fontSize: "20px",
                  color: "var(--text-secondary)",
                  marginBottom: "0",
                }}
              >
                Escolha o tipo de conta que deseja criar e comece a transformar
                o aprendizado
              </p>
            </div>

            {/* Selection Cards */}
            <div
              className="features-grid"
              style={{ maxWidth: "700px", margin: "0 auto 60px" }}
            >
              <Link
                href="/cadastro/professor"
                className="card card-interactive"
                style={{ textDecoration: "none" }}
              >
                <div className="card-content feature-card">
                  <div className="feature-icon blue">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="feature-title">👨‍🏫 Sou Professor</h3>
                  <p className="feature-description">
                    Crie uma conta para professores e tenha acesso completo ao
                    painel administrativo para gerenciar suas turmas
                  </p>
                </div>
              </Link>

              <Link
                href="/cadastro/estudante"
                className="card card-interactive"
                style={{ textDecoration: "none" }}
              >
                <div className="card-content feature-card">
                  <div className="feature-icon green">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="feature-title">👨‍🎓 Sou Estudante</h3>
                  <p className="feature-description">
                    Precisa de ajuda para criar sua conta? Peça ao seu professor
                    ou responsável para ajudar você
                  </p>
                </div>
              </Link>
            </div>

            {/* Footer */}
            <div style={{ textAlign: "center" }}>
              <p
                style={{ color: "var(--text-secondary)", marginBottom: "16px" }}
              >
                Já tem uma conta?
              </p>
              <Link href="/login" className="btn btn-outline btn-large">
                <Play className="w-5 h-5" />
                Fazer login
              </Link>

              <div style={{ marginTop: "32px" }}>
                <Link
                  href="/inicio"
                  style={{
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.2s ease",
                  }}
                >
                  ← Voltar ao início
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
