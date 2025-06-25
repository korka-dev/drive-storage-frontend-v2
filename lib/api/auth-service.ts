// Définition de l'URL de base de l'API
const API_BASE_URL = "http://192.168.1.49:8000"
const API_BASE_URL_TOKEN = "http://192.168.1.49:8001"

// Types pour les requêtes et réponses
export interface LoginRequest {
  username: string // L'API utilise username pour l'email
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}

export interface UserToken {
  id: string
  email: string
  name: string
  is_active: boolean
}

// Service API pour l'authentification
export const authService = {
  // Connexion et récupération du token
  login: async (credentials: LoginRequest): Promise<TokenResponse> => {
    try {
      // L'API attend un FormData pour la connexion
      const formData = new FormData()
      formData.append("username", credentials.username)
      formData.append("password", credentials.password)

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors de la connexion")
      }

      const data = await response.json()

      // Stocker le token dans le localStorage
      localStorage.setItem("token", data.access_token)

      return data
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la connexion")
    }
  },

  // Vérification du token et récupération des informations utilisateur
  verifyToken: async (token: string): Promise<UserToken> => {
    try {
      const response = await fetch(`${API_BASE_URL_TOKEN}/auth/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Token invalide")
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la vérification du token")
    }
  },

  // Récupération du token stocké
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  },

  // Déconnexion (suppression du token)
  logout: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  },

  // Vérification si l'utilisateur est connecté
  isAuthenticated: (): boolean => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") !== null
    }
    return false
  },
}
