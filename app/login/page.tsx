"use client";

import { Users, GraduationCap, Play } from "lucide-react";
import { AppHeader, SelectionSection } from "@/components";

export default function LoginSelectionPage() {
  const selectionOptions = [
    {
      href: "/login/professor",
      icon: Users,
      title: "👨‍🏫 Professor(a)",
      description:
        "Acesse o painel administrativo para gerenciar turmas e acompanhar o progresso dos alunos",
      color: "blue" as const,
    },
    {
      href: "/login/estudante",
      icon: GraduationCap,
      title: "👨‍🎓 Estudante",
      description:
        "Entre na sua área de aprendizado para jogar, fazer atividades e acompanhar seu progresso",
      color: "green" as const,
    },
  ];

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <AppHeader
        showBackButton
        backHref="/inicio"
        backLabel="🏠 Voltar ao Início"
      />

      <SelectionSection
        title="Bem-vindo de volta!"
        subtitle="Escolha como deseja acessar sua conta"
        emoji="🔐✨🎓"
        options={selectionOptions}
        footerText="Ainda não tem uma conta?"
        footerLink={{
          href: "/cadastro",
          label: "Cadastre-se aqui",
          icon: Play,
        }}
      />
    </div>
  );
}
