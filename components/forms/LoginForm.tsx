import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { InputField } from "./InputField";

export interface LoginFormProps {
  readonly email: string;
  readonly password: string;
  readonly isLoading: boolean;
  readonly onEmailChange: (email: string) => void;
  readonly onPasswordChange: (password: string) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly className?: string;
}

export function LoginForm({
  email,
  password,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  className = "",
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

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
        type="email"
        id="email"
        label="Email"
        value={email}
        onChange={onEmailChange}
        placeholder="professor@escola.com"
        leftIcon={<Mail className="w-5 h-5" />}
        required
        disabled={isLoading}
      />

      <InputField
        type={showPassword ? "text" : "password"}
        id="password"
        label="Senha"
        value={password}
        onChange={onPasswordChange}
        placeholder="••••••••"
        leftIcon={<Lock className="w-5 h-5" />}
        rightIcon={
          showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )
        }
        onRightIconClick={() => setShowPassword(!showPassword)}
        required
        disabled={isLoading}
      />

      <button
        type="submit"
        disabled={isLoading || !email.trim() || !password.trim()}
        className="btn btn-primary btn-large"
        style={{ width: "100%" }}
      >
        {isLoading ? (
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
            Entrar
            <ArrowRight className="w-5 h-5" style={{ marginLeft: "8px" }} />
          </span>
        )}
      </button>
    </form>
  );
}
