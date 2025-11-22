import { ReactNode } from "react";

export interface InputFieldProps {
  readonly type: "text" | "email" | "password" | "number";
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly leftIcon?: ReactNode;
  readonly rightIcon?: ReactNode;
  readonly onRightIconClick?: () => void;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
}

export function InputField({
  type,
  id,
  label,
  value,
  onChange,
  placeholder,
  leftIcon,
  rightIcon,
  onRightIconClick,
  required = false,
  disabled = false,
  className = "",
}: InputFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontWeight: "500",
          color: "var(--text-primary)",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {leftIcon && (
          <div
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          >
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            paddingLeft: leftIcon ? "44px" : "16px",
            paddingRight: rightIcon ? "44px" : "16px",
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
          required={required}
          disabled={disabled}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "4px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "var(--text-secondary)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "var(--text-muted)")
            }
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
}
