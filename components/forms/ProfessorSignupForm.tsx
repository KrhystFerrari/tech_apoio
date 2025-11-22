import { User, Mail, Lock, GraduationCap, Building } from "lucide-react";
import { InputField } from "./InputField";

export interface ProfessorFormData {
  readonly nome: string;
  readonly email: string;
  readonly senha: string;
  readonly confirmarSenha: string;
  readonly especializacao: string;
  readonly instituicao: string;
}

export interface ProfessorSignupFormProps {
  readonly formData: ProfessorFormData;
  readonly erro: string;
  readonly carregando: boolean;
  readonly onChange: (name: string, value: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly className?: string;
}

export function ProfessorSignupForm({
  formData,
  erro,
  carregando,
  onChange,
  onSubmit,
  className = "",
}: ProfessorSignupFormProps) {
  const especializacoes = [
    { value: "", label: "Selecione uma área" },
    { value: "matematica", label: "Matemática" },
    { value: "portugues", label: "Português" },
    { value: "ciencias", label: "Ciências" },
    { value: "historia", label: "História" },
    { value: "geografia", label: "Geografia" },
    { value: "fisica", label: "Física" },
    { value: "quimica", label: "Química" },
    { value: "biologia", label: "Biologia" },
    { value: "ingles", label: "Inglês" },
    { value: "arte", label: "Arte" },
    { value: "educacao_fisica", label: "Educação Física" },
    { value: "tecnologia", label: "Tecnologia" },
    { value: "outros", label: "Outros" },
  ];

  return (
    <div className={className}>
      {erro && (
        <div
          style={{
            padding: "16px 20px",
            marginBottom: "24px",
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            borderRadius: "12px",
            fontSize: "14px",
            border: "1px solid #fecaca",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>⚠️</span>
          {erro}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Nome completo */}
        <InputField
          type="text"
          id="nome"
          label="Nome Completo *"
          value={formData.nome}
          onChange={(value) => onChange("nome", value)}
          placeholder="Digite seu nome completo"
          leftIcon={<User className="w-5 h-5" />}
          required
          disabled={carregando}
        />

        {/* E-mail */}
        <InputField
          type="email"
          id="email"
          label="E-mail *"
          value={formData.email}
          onChange={(value) => onChange("email", value)}
          placeholder="professor@escola.com"
          leftIcon={<Mail className="w-5 h-5" />}
          required
          disabled={carregando}
        />

        {/* Senhas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <InputField
            type="password"
            id="senha"
            label="Senha *"
            value={formData.senha}
            onChange={(value) => onChange("senha", value)}
            placeholder="••••••••"
            leftIcon={<Lock className="w-5 h-5" />}
            required
            disabled={carregando}
          />

          <InputField
            type="password"
            id="confirmarSenha"
            label="Confirmar Senha *"
            value={formData.confirmarSenha}
            onChange={(value) => onChange("confirmarSenha", value)}
            placeholder="••••••••"
            leftIcon={<Lock className="w-5 h-5" />}
            required
            disabled={carregando}
          />
        </div>

        {/* Especialização */}
        <div>
          <label
            htmlFor="especializacao"
            style={{
              display: "block",
              fontWeight: "500",
              color: "var(--text-primary)",
              marginBottom: "8px",
            }}
          >
            Especialização
          </label>
          <div style={{ position: "relative" }}>
            <GraduationCap
              className="w-5 h-5"
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                zIndex: 1,
              }}
            />
            <select
              id="especializacao"
              value={formData.especializacao}
              onChange={(e) => onChange("especializacao", e.target.value)}
              disabled={carregando}
              style={{
                width: "100%",
                paddingLeft: "44px",
                paddingRight: "16px",
                paddingTop: "14px",
                paddingBottom: "14px",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                fontFamily: "inherit",
                fontSize: "16px",
                transition: "all 0.2s ease",
                backgroundColor: "white",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--primary-blue)";
                e.target.style.boxShadow = "0 0 0 3px rgba(66, 133, 244, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border-light)";
                e.target.style.boxShadow = "none";
              }}
            >
              {especializacoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Instituição */}
        <InputField
          type="text"
          id="instituicao"
          label="Instituição de Ensino"
          value={formData.instituicao}
          onChange={(value) => onChange("instituicao", value)}
          placeholder="Nome da escola ou universidade"
          leftIcon={<Building className="w-5 h-5" />}
          disabled={carregando}
        />

        {/* Botão de cadastro */}
        <button
          type="submit"
          disabled={carregando}
          className="btn btn-primary btn-large"
          style={{ width: "100%" }}
        >
          {carregando ? "Criando conta..." : "Criar Conta"}
        </button>
      </form>
    </div>
  );
}
