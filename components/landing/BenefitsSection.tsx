"use client";

import { Target, Play, Trophy, Award } from "lucide-react";

interface BenefitsSectionProps {
  className?: string;
}

export const BenefitsSection = ({ className = "" }: BenefitsSectionProps) => {
  const benefits = [
    {
      icon: Target,
      title: "🎯 Preparar para o futuro",
      description:
        "Desenvolve habilidades digitais essenciais para a vida escolar e além! 🌟",
    },
    {
      icon: Play,
      title: "🎮 Aprender brincando",
      description:
        "Jogos educativos que transformam o aprendizado em uma grande aventura! 🚀",
    },
    {
      icon: Trophy,
      title: "🧠 Desenvolver a lógica",
      description:
        "Atividades especiais que exercitam o raciocínio e a criatividade! 💡",
    },
    {
      icon: Award,
      title: "📈 Acompanhar o progresso",
      description:
        "Professores podem ver o desenvolvimento de cada aluno em tempo real! 👨‍🏫",
    },
  ];

  return (
    <section id="beneficios" className={`section-spacing ${className}`}>
      <div className="container-logiclike">
        <div className="section-header">
          <h2 className="section-title">
            Por que as escolas amam o TechApoio? 💜
          </h2>
          <p className="section-subtitle">
            Uma plataforma completa para professores e alunos se divertirem
            aprendendo juntos!
          </p>
        </div>

        <div className="features-grid">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="card card-interactive">
              <div className="card-content feature-card">
                <div className="feature-icon blue">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="feature-title">{benefit.title}</h3>
                <p className="feature-description">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
