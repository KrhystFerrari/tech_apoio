// Types comuns para páginas
export interface PageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string | string[] | undefined>;
}

export interface LayoutProps {
  children: React.ReactNode;
  params?: Record<string, string>;
}

// Types para formulários de login
export interface LoginFormData {
  email: string;
  password: string;
}

export interface StudentLoginFormData {
  name: string;
  age: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  school?: string;
  phone?: string;
}

// Types para configurações
export interface ConfiguracaoData {
  id: string;
  chave: string;
  valor: string;
  descricao?: string;
  categoria: string;
  tipo: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
  isPublica: boolean;
  createdAt: string;
  updatedAt: string;
}

// Types para perfil
export interface PerfilFormData {
  name: string;
  email: string;
  school?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}