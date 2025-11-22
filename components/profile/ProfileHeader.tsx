"use client";

import { useState } from "react";
import { BookOpen, Edit3, Save, X, Crown } from "lucide-react";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  studentsCount?: number;
  classesCount?: number;
  createdAt?: string;
}

interface ProfileHeaderProps {
  user: User;
  className?: string;
}

export const ProfileHeader = ({ user, className = "" }: ProfileHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      toast.error("Nome não pode estar vazio! 📝");
      return;
    }

    // Simular atualização do perfil (implementar API depois)
    toast.success("Perfil atualizado com sucesso! ✨");
    setIsEditing(false);
  };

  return (
    <div
      className={className}
      style={{
        textAlign: "center",
        marginBottom: "60px",
        background: "linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)",
        padding: "48px",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--border-light)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decoration */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "48px",
          opacity: 0.1,
          animation: "float 4s ease-in-out infinite",
        }}
      >
        👑
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          fontSize: "40px",
          opacity: 0.1,
          animation: "float 3s ease-in-out infinite reverse",
        }}
      >
        ⭐
      </div>

      {/* Avatar */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "120px",
          height: "120px",
          background:
            "linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-blue) 100%)",
          borderRadius: "50%",
          marginBottom: "24px",
          fontSize: "48px",
          color: "white",
          fontWeight: "700",
          border: "4px solid white",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {user.role === "ADMIN" ? "👑" : "👨‍🏫"}
      </div>

      {/* Name and Role */}
      <div style={{ marginBottom: "16px" }}>
        {isEditing ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{
                fontSize: "32px",
                fontWeight: "700",
                textAlign: "center",
                border: "2px solid var(--primary-blue)",
                borderRadius: "var(--radius-lg)",
                padding: "8px 16px",
                background: "white",
                color: "var(--text-primary)",
                outline: "none",
              }}
            />

            <button
              onClick={handleSaveProfile}
              className="btn btn-small btn-primary"
            >
              <Save className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setEditName(user.name);
                setIsEditing(false);
              }}
              className="btn btn-small btn-ghost"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              {user.name} ✨
            </h1>

            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-small btn-ghost"
              style={{ color: "var(--text-muted)" }}
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        )}

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background:
              user.role === "ADMIN"
                ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                : "linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-blue) 100%)",
            padding: "8px 16px",
            borderRadius: "var(--radius-lg)",
            color: "white",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          {user.role === "ADMIN" ? (
            <>
              <Crown className="w-4 h-4" />
              👑 Administrador
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4" />
              👨‍🏫 Professor(a)
            </>
          )}
        </div>
      </div>

      <p
        style={{
          fontSize: "18px",
          color: "var(--text-secondary)",
          margin: 0,
        }}
      >
        Inspirando mentes jovens e criando futuros brilhantes! 🌟
      </p>
    </div>
  );
};
