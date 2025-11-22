import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

export interface StudentsSettingsProps {
  studentsCount: number;
  className?: string;
}

export function StudentsSettings({
  studentsCount,
  className = "",
}: StudentsSettingsProps) {
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentAge, setNewStudentAge] = useState("");

  const handleAddStudent = () => {
    if (!newStudentName.trim() || !newStudentAge) {
      toast.error("Preencha todos os campos! 📝");
      return;
    }

    // Simular adição de estudante
    toast.success(`Estudante ${newStudentName} adicionado! 🎉`);
    setNewStudentName("");
    setNewStudentAge("");
    setShowAddStudent(false);
  };

  return (
    <div className={`card ${className}`}>
      <div className="card-content">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "var(--text-primary)",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            👥 Gerenciar Estudantes
          </h2>

          <button
            onClick={() => setShowAddStudent(true)}
            className="btn btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Plus className="w-4 h-4" />➕ Adicionar Estudante
          </button>
        </div>

        {showAddStudent && (
          <div
            style={{
              padding: "24px",
              background: "var(--gray-50)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-light)",
              marginBottom: "32px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "var(--text-primary)",
                marginBottom: "16px",
              }}
            >
              ➕ Novo Estudante
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px",
                gap: "16px",
              }}
            >
              <input
                type="text"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="Nome do estudante"
                style={{
                  padding: "12px 16px",
                  border: "2px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "16px",
                  outline: "none",
                }}
              />

              <input
                type="number"
                value={newStudentAge}
                onChange={(e) => setNewStudentAge(e.target.value)}
                placeholder="Idade"
                min="6"
                max="12"
                style={{
                  padding: "12px 16px",
                  border: "2px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "16px",
                  outline: "none",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "16px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowAddStudent(false)}
                className="btn btn-ghost"
              >
                ❌ Cancelar
              </button>

              <button onClick={handleAddStudent} className="btn btn-primary">
                ✅ Adicionar
              </button>
            </div>
          </div>
        )}

        {/* Lista de estudantes */}
        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            📝 Lista de Estudantes ({studentsCount})
          </h3>

          {studentsCount === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px",
                color: "var(--text-muted)",
              }}
            >
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>👥</div>
              <p>Nenhum estudante cadastrado ainda.</p>
              <p>
                Clique em &ldquo;Adicionar Estudante&rdquo; para começar! ✨
              </p>
            </div>
          ) : (
            <p style={{ color: "var(--text-muted)" }}>
              Você tem {studentsCount} estudante(s) cadastrado(s). 📊
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
