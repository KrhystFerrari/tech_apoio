export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
}

export function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
}: ToggleSwitchProps) {
  return (
    <label
      style={{
        position: "relative",
        display: "inline-block",
        width: "60px",
        height: "34px",
      }}
      aria-label={ariaLabel}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ opacity: 0, width: 0, height: 0 }}
      />
      <span
        style={{
          position: "absolute",
          cursor: "pointer",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: checked ? "var(--primary-green)" : "#ccc",
          transition: "0.4s",
          borderRadius: "34px",
        }}
      >
        <span
          style={{
            position: "absolute",
            content: "",
            height: "26px",
            width: "26px",
            left: checked ? "30px" : "4px",
            bottom: "4px",
            backgroundColor: "white",
            transition: "0.4s",
            borderRadius: "50%",
          }}
        />
      </span>
    </label>
  );
}
