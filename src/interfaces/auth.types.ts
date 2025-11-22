// Types para requests de autenticação
export interface LoginRequest {
  email: string;
  password: string;
}

export interface StudentLoginRequest {
  name: string;
  age: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  school?: string;
  phone?: string;
}

// Types para responses de autenticação
export interface LoginResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    studentsCount: number;
    classesCount: number;
  };
}

export interface StudentLoginResponse {
  success: boolean;
  message?: string;
  error?: string;
  student?: {
    id: string;
    name: string;
    age: number;
    grade: number;
    teacherId: string;
    teacherName: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface MeResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    studentsCount: number;
    classesCount: number;
  };
  student?: {
    id: string;
    name: string;
    age: number;
    grade: number;
    teacherId: string;
    teacherName: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message?: string;
}

// Types para sessão
export interface SessionData {
  id: string;
  email?: string;
  name: string;
  role?: string;
  loginTime: string;
  isStudent?: boolean;
}

export interface StudentSessionData {
  id: string;
  name: string;
  age: number;
  grade: number;
  teacherId: string;
  teacherName: string;
  loginTime: string;
  isStudent: boolean;
}
