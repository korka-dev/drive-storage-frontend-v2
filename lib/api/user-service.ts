const API_BASE_URL = "https://drivestorage-api-v2.onrender.com"

// Types pour les requêtes et réponses
export interface UserCreateRequest {
  name: string
  email: string
  password: string
}

export interface UserResponse {
  id: number
  name: string
  email: string
  is_active: boolean
  created_at: string
}

export interface VerifyCodeRequest {
  code: string
}

export interface ResetPasswordRequest {
  code: string
  new_password: string
}

// Service API pour les utilisateurs
export const userService = {
  // Inscription d'un nouvel utilisateur
  register: async (userData: UserCreateRequest): Promise<UserResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors de l'inscription")
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de l'inscription")
    }
  },

  // Vérification du code d'activation
  verifyEmail: async (email: string, code: string): Promise<UserResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/verify/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors de la vérification du code")
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la vérification du code")
    }
  },

  // Renvoi du code de confirmation
  resendCode: async (email: string): Promise<{ detail: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/resend-code?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors du renvoi du code")
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors du renvoi du code")
    }
  },

  // Récupération de tous les utilisateurs
  getAllUsers: async (): Promise<UserResponse[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors de la récupération des utilisateurs")
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la récupération des utilisateurs")
    }
  },

  // Demande de réinitialisation de mot de passe
  forgotPassword: async (email: string): Promise<{ detail: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/forgot-password?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors de la demande de réinitialisation")
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la demande de réinitialisation")
    }
  },

  // Réinitialisation du mot de passe
  resetPassword: async (email: string, data: ResetPasswordRequest): Promise<{ detail: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/reset-password?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors de la réinitialisation du mot de passe")
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la réinitialisation du mot de passe")
    }
  },
}
