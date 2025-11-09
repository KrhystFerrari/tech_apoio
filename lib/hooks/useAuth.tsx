'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/AuthContext'

export function useRequireAuth() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  return { user, loading, isAuthenticated: !!user }
}

// HOC para proteger componentes que precisam de autenticação
export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { user, loading } = useRequireAuth()

    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-white">
          <div className="flex flex-col items-center gap-5">
            <div className="text-6xl">🔐</div>
            <p className="text-lg text-gray-600">
              Verificando autenticação...
            </p>
          </div>
        </div>
      )
    }

    if (!user) {
      return null // O hook já redireciona para login
    }

    return <Component {...props} />
  }
}