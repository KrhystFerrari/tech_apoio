"use client";

import Link from "next/link";
import { Play, Users } from "lucide-react";

interface HeroSectionProps {
  className?: string;
}

export const HeroSection = ({ className = "" }: HeroSectionProps) => (
  <section className={`hero-logiclike ${className}`}>
    <div className="container-logiclike">
      <div className="text-5xl mb-5" suppressHydrationWarning={true}>
        &ldquo;Iniciando a jornada do conhecimento com diversão e
        aprendizado!&rdquo;
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
          Fazer Login
        </Link>

        <Link href="/cadastro" className="btn btn-outline btn-large">
          <Users className="w-5 h-5" />
          Criar Conta
        </Link>
      </div>
    </div>
  </section>
);
