"use client";

import { Users, GraduationCap, Play } from "lucide-react";
import { AppHeader, SelectionSection } from "@/components";

export default function CadastroSelectionPage() {
  const selectionOptions = [
    {
      href: "/cadastro/professor",
      icon: Users,
      title: "👨‍🏫 Sou Professor",
      description:
        "Crie uma conta para professores e tenha acesso completo ao painel administrativo para gerenciar suas turmas",
      color: "blue" as const,
    },
    {
      href: "/cadastro/estudante",
      icon: GraduationCap,
      title: "👨‍🎓 Sou Estudante",
      description:
        "Precisa de ajuda para criar sua conta? Peça ao seu professor ou responsável para ajudar você",
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
        title="Criar nova conta"
        subtitle="Escolha o tipo de conta que deseja criar e comece a transformar o aprendizado"
        emoji="📝✨🎉"
        options={selectionOptions}
        footerText="Já tem uma conta?"
        footerLink={{
          href: "/login",
          label: "Fazer login",
          icon: Play,
        }}
      />
    </div>
  );
}
