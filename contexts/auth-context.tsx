"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/api/auth-service"

interface AuthContextType {
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const getToken = (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  }

  const clearToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  }

  const checkAuth = (): boolean => {
    const token = getToken()
    const loggedIn = !!token
    setIsAuthenticated(loggedIn)
    return loggedIn
  }

  useEffect(() => {
    checkAuth()
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await authService.login({ username: email, password })
      checkAuth()
      router.push("/dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    clearToken()
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, login, logout, checkAuth }}>
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
