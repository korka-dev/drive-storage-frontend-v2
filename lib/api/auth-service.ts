// Définition de l'URL de base de l'API
const API_BASE_URL = "https://drivestorage-api-v2.onrender.com"

// Types pour la requête et la réponse
export interface LoginRequest {
  username: string // L'API utilise "username" pour l'email
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}

// Service API — Login uniquement
export const authService = {
  // Connexion et récupération du token
  login: async (credentials: LoginRequest): Promise<TokenResponse> => {
    try {
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

      // Stockage du token localement
      localStorage.setItem("token", data.access_token)

      return data
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la connexion")
    }
  },

   getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  },

  logout: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  }
}
