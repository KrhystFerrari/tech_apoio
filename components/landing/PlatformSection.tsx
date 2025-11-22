"use client";

import Link from "next/link";
import { BookOpen, Calculator, Computer, Microscope } from "lucide-react";

interface PlatformSectionProps {
  className?: string;
}

export const PlatformSection = ({ className = "" }: PlatformSectionProps) => {
  const features = [
    {
      icon: BookOpen,
      title: "Português Mágico",
      description:
        "Histórias interativas, jogos de palavras e aventuras de leitura!",
      color: "blue",
    },
    {
      icon: Calculator,
      title: "Matemática Divertida",
      description: "Números, operações e problemas que viram jogos incríveis!",
      color: "green",
    },
    {
      icon: Computer,
      title: "Mundo da Tecnologia",
      description: "Primeiros passos na programação e criação digital!",
      color: "purple",
    },
    {
      icon: Microscope,
      title: "Laboratório de Ciências",
      description: "Experimentos virtuais e descobertas fantásticas!",
      color: "orange",
    },
  ];

  return (
    <section
      id="como-funciona"
      className={`section-spacing bg-gray-50 ${className}`}
    >
      <div className="container-logiclike">
        <div className="section-header">
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
