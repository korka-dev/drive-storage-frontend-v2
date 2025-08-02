import { authService } from "./auth-service"

const API_BASE_URL = "https://drivestorage-api-v2.onrender.com"

// Types pour les fichiers et dossiers - MISE À JOUR selon votre structure
export interface DirectoryItem {
  dir_name: string
  owner_id: string
  created_at: string
  owner: string
}

export interface FileItem {
  file_name: string
  content_type: string
  created_at: string
  owner_id: string
  owner: string
  parent: DirectoryItem
  size?: number
}

// Fonction utilitaire pour les requêtes authentifiées
const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = authService.getToken()

  if (!token) {
    throw new Error("Vous devez être connecté pour effectuer cette action")
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    // Token expiré ou invalide
    authService.logout()
    window.location.href = "/login"
    throw new Error("Session expirée. Veuillez vous reconnecter.")
  }

  return response
}

// Service API pour la gestion des fichiers
export const fileService = {
  // Création d'un nouveau dossier
  createDirectory: async (directoryName: string): Promise<DirectoryItem> => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/files/${directoryName}`, {
        method: "POST",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors de la création du dossier")
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la création du dossier")
    }
  },

  // Récupération de tous les dossiers de l'utilisateur
  getUserDirectories: async (): Promise<DirectoryItem[]> => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/files/directories`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors de la récupération des dossiers")
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la récupération des dossiers")
    }
  },

  // Upload d'un fichier
  uploadFile: async (directory: string, file: File): Promise<FileItem> => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await authenticatedFetch(`${API_BASE_URL}/files/upload/${directory}`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors de l'upload du fichier")
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de l'upload du fichier")
    }
  },

  // Téléchargement d'un fichier
  downloadFile: async (directory: string, filename: string): Promise<Blob> => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/files/download/${directory}/${filename}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors du téléchargement du fichier")
      }

      return await response.blob()
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors du téléchargement du fichier")
    }
  },

  // Récupération des fichiers dans un dossier
  getFiles: async (directory: string): Promise<FileItem[]> => {
    try {
      console.log("Récupération des fichiers pour le dossier:", directory)

      if (!directory || directory.trim() === "") {
        console.error("Nom de dossier invalide")
        return []
      }

      const url = `${API_BASE_URL}/files/list?directory=${encodeURIComponent(directory)}&limit=50&skip=0`
      console.log("URL de requête:", url)

      const response = await authenticatedFetch(url)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Erreur API:", response.status, errorText)
        try {
          const errorData = JSON.parse(errorText)
          throw new Error(errorData.detail || `Erreur ${response.status} lors de la récupération des fichiers`)
        } catch (e) {
          throw new Error(`Erreur ${response.status} lors de la récupération des fichiers`)
        }
      }

      const data = await response.json()
      console.log("Fichiers récupérés:", data)
      return data
    } catch (error: any) {
      console.error("Erreur getFiles:", error)
      throw new Error(error.message || "Erreur lors de la récupération des fichiers")
    }
  },

  // Suppression d'un fichier
  deleteFile: async (directory: string, filename: string): Promise<void> => {
    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/files/delete/${directory}/${filename}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors de la suppression du fichier")
      }
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors de la suppression du fichier")
    }
  },

  // Renommage d'un dossier
  renameDirectory: async (currentDirectoryName: string, newDirectoryName: string): Promise<DirectoryItem> => {
    try {
      const response = await authenticatedFetch(
        `${API_BASE_URL}/files/rename-directory/${currentDirectoryName}?new_directory_name=${encodeURIComponent(newDirectoryName)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
       
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Erreur lors du renommage du dossier")
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(error.message || "Erreur lors du renommage du dossier")
    }
  }
}
