"use client";

import Link from "next/link";
import { Play, Users } from "lucide-react";

interface CTASectionProps {
  className?: string;
}

export const CTASection = ({ className = "" }: CTASectionProps) => {
  const benefits = [
    "🏫 Ideal para escolas e salas de aula",
    "⚡ Funciona em tempo real",
    "🎮 Jogos que as crianças adoram",
    "📊 Relatórios para professores",
  ];

  return (
    <section
      className={`section-spacing bg-primary-500 text-white ${className}`}
    >
      <div className="container-logiclike">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-6xl mb-6" suppressHydrationWarning={true}>
            🎉🚀📚✨
          </div>
          <h2 className="text-4xl font-bold mb-6 text-white">
            Escolas inteligentes e crianças felizes! 🏫💜
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Funciona em qualquer dispositivo: computador, tablet ou celular!
            Perfeito para salas de aula modernas em 2025! 📱💻
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {benefits.map((benefit) => (
              <div key={benefit} className="text-center">
                <div className="text-2xl mx-auto mb-4">
                  {benefit.split(" ")[0]}
                </div>
                <p className="text-base opacity-90">
                  {benefit.split(" ").slice(1).join(" ")}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard" className="btn btn-secondary btn-large">
              <Play className="w-5 h-5" />
              🎮 Começar Grátis!
            </Link>

            <Link
              href="#como-funciona"
              className="btn btn-outline btn-large border-white text-white"
            >
              <Users className="w-5 h-5" />
              👨‍🏫 Para Professores
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
