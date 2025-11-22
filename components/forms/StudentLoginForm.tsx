import { ArrowRight, User, Calendar } from "lucide-react";
import { InputField } from "./InputField";

export interface StudentLoginFormProps {
  readonly name: string;
  readonly age: string;
  readonly error: string;
  readonly loading: boolean;
  readonly onNameChange: (name: string) => void;
  readonly onAgeChange: (age: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly className?: string;
}

export function StudentLoginForm({
  name,
  age,
  error,
  loading,
  onNameChange,
  onAgeChange,
  onSubmit,
  className = "",
}: StudentLoginFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <InputField
        type="text"
        id="name"
        label="Seu Nome"
        value={name}
        onChange={onNameChange}
        placeholder="Digite seu nome completo"
        leftIcon={<User className="w-5 h-5" />}
        required
        disabled={loading}
      />

      <div>
        <InputField
          type="number"
          id="age"
          label="Sua Idade"
          value={age}
          onChange={onAgeChange}
          placeholder="Ex: 8"
          leftIcon={<Calendar className="w-5 h-5" />}
          required
          disabled={loading}
        />
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            marginTop: "8px",
            textAlign: "center",
          }}
        >
          Digite quantos anos você tem
        </p>
      </div>

      {error && (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "var(--radius-md)",
            padding: "12px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#dc2626",
              fontSize: "14px",
              margin: "0",
            }}
          >
            {error}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !name.trim() || !age.trim()}
        className="btn btn-primary btn-large"
        style={{
          width: "100%",
          background: "var(--primary-green)",
          border: "none",
        }}
        onMouseEnter={(e) => {
          const button = e.currentTarget as HTMLButtonElement;
          if (!button.disabled) {
            button.style.background = "#2d7d42";
          }
        }}
        onMouseLeave={(e) => {
          const button = e.currentTarget as HTMLButtonElement;
          if (!button.disabled) {
            button.style.background = "var(--primary-green)";
          }
        }}
      >
        {loading ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="spinner" style={{ marginRight: "8px" }}></div>
            Entrando...
          </span>
        ) : (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Entrar na Aventura
            <ArrowRight className="w-5 h-5" style={{ marginLeft: "8px" }} />
          </span>
        )}
      </button>
    </form>
  );
}
