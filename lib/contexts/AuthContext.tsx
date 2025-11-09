"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { 
  User, 
  Student, 
  AuthContextType, 
  AuthProviderProps 
} from "@/src/interfaces/AuthContext.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();

      if (data.success && data.authenticated) {
        if (data.user) {
          setUser(data.user);
          setStudent(null);
        } else if (data.student) {
          setStudent(data.student);
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Verificar se existe uma sessão ativa ao carregar a aplicação
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return { success: false, error: "Erro de conexão" };
    } finally {
      setLoading(false);
    }
  }, []);

  const studentLogin = useCallback(async (name: string, age: string) => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/student-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });

      const data = await response.json();

      if (data.success) {
        setStudent(data.student);
        setUser(null);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error("Erro no login do estudante:", error);
      return { success: false, error: "Erro de conexão" };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);

      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setUser(null);
      setStudent(null);
    } catch (error) {
      console.error("Erro no logout:", error);
      // Mesmo com erro, limpar o estado local
      setUser(null);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    await checkSession();
  }, [checkSession]);

  const value = useMemo(
    () => ({
      user,
      student,
      loading,
      login,
      studentLogin,
      logout,
      refreshUser,
      isUser: !!user && !student,
      isStudent: !!student && !user,
    }),
    [user, student, loading, login, studentLogin, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
