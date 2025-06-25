"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authService, type UserToken } from "@/lib/api/auth-service"

interface AuthContextType {
  user: UserToken | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserToken | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Vérification de l'authentification au chargement
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth()
      setIsLoading(false)
    }
    initAuth()
  }, [])

  // Vérification du token et récupération des informations utilisateur
  const checkAuth = async (): Promise<boolean> => {
    try {
      const token = authService.getToken()
      if (!token) {
        setUser(null)
        return false
      }

      const userData = await authService.verifyToken(token)
      setUser(userData)
      return true
    } catch (error) {
      console.error("Erreur d'authentification:", error)
      authService.logout()
      setUser(null)
      return false
    }
  }

  // Connexion
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await authService.login({ username: email, password })
      await checkAuth()
    } finally {
      setIsLoading(false)
    }
  }

  // Déconnexion
  const logout = () => {
    authService.logout()
    setUser(null)
    router.push("/login")
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}
