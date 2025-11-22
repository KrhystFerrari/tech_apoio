import { ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "TEACHER" | "ADMIN";
  studentsCount: number;
  classesCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  grade: number;
  teacherId: string;
  teacherName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextType {
  user: User | null;
  student: Student | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthLoginResponse>;
  studentLogin: (name: string, age: string) => Promise<AuthLoginResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isStudent: boolean;
  isUser: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export type UserRole = "TEACHER" | "ADMIN";
export type AuthLoginResponse = { success: boolean; error?: string };
