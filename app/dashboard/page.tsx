"use client"

import type React from "react"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  FileText,
  Folder,
  Upload,
  Plus,
  Search,
  MoreVertical,
  Download,
  Trash2,
  User,
  LogOut,
  Settings,
  FolderOpen,
  File,
  ImageIcon,
  Video,
  Music,
  ArrowLeft,
  Home,
  ChevronRight,
  Loader2,
  Calendar,
  Edit2,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { fileService, type DirectoryItem, type FileItem } from "@/lib/api/file-service"
import Link from "next/link"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { dir_path } = useParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [newFolderName, setNewFolderName] = useState("")
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [currentFolderName, setCurrentFolderName] = useState<string | null>(null)
  const [breadcrumb, setBreadcrumb] = useState<Array<{ id: string | null; name: string }>>([
    { id: null, name: "Mes fichiers" },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [directories, setDirectories] = useState<DirectoryItem[]>([])
  const [files, setFiles] = useState<FileItem[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [viewMode, setViewMode] = useState<"folders" | "files">("folders")
  const [isRenameFolderOpen, setIsRenameFolderOpen] = useState(false)
  const [folderToRename, setFolderToRename] = useState<{ currentName: string; newName: string } | null>(null)

  // Chargement initial des dossiers
  useEffect(() => {
    if (viewMode === "folders") {
      loadDirectories()
    }
  }, [viewMode])

  // Fonction pour charger les dossiers
  const loadDirectories = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Chargement des dossiers")
      const directoriesData = await fileService.getUserDirectories()
      console.log("Dossiers chargés:", directoriesData)
      setDirectories(directoriesData)
    } catch (err: any) {
      console.error("Erreur de chargement des dossiers:", err)
      setError(err.message || "Erreur lors du chargement des dossiers")
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour charger les fichiers d'un dossier
  const loadFiles = async (folderName: string) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("Chargement des fichiers pour:", folderName)
      const filesData = await fileService.getFiles(folderName)
      console.log("Fichiers chargés:", filesData)
      setFiles(filesData)
    } catch (err: any) {
      console.error("Erreur de chargement des fichiers:", err)
      setError(err.message || "Erreur lors du chargement des fichiers")
    } finally {
      setIsLoading(false)
    }
  }

  // Création d'un nouveau dossier
  const createFolder = async () => {
    if (newFolderName.trim()) {
      setIsLoading(true)
      setError(null)

      try {
        const newDirectory = await fileService.createDirectory(newFolderName)
        setDirectories([...directories, newDirectory])
        setNewFolderName("")
        setIsCreateFolderOpen(false)
      } catch (err: any) {
        setError(err.message || "Erreur lors de la création du dossier")
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Renommage d'un dossier
  const renameFolder = async () => {
    if (folderToRename && folderToRename.newName.trim()) {
      setIsLoading(true)
      setError(null)

      try {
        await fileService.renameDirectory(folderToRename.currentName, folderToRename.newName)
        setDirectories(
          directories.map((dir) =>
            dir.dir_name === folderToRename.currentName ? { ...dir, dir_name: folderToRename.newName } : dir
          )
        )
        setIsRenameFolderOpen(false)
        setFolderToRename(null)
      } catch (err: any) {
        setError(err.message || "Erreur lors du renommage du dossier")
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Suppression d'un dossier (à implémenter côté API)
  const deleteFolder = async (folderName: string) => {
    alert(`La suppression de dossiers n'est pas encore implémentée: ${folderName}`)
  }

  // Suppression d'un fichier
  const deleteFile = async (fileName: string, directory: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le fichier "${fileName}" ?`)) {
      setIsLoading(true)
      setError(null)

      try {
        await fileService.deleteFile(directory, fileName)
        setFiles(files.filter((file) => file.file_name !== fileName))
      } catch (err: any) {
        setError(err.message || "Erreur lors de la suppression du fichier")
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Ouverture d'un dossier
  const openFolder = async (folderName: string) => {
    console.log("Ouverture du dossier:", folderName)

    setCurrentFolderId(folderName) // Utiliser le nom comme ID
    setCurrentFolderName(folderName)
    setViewMode("files")
    setBreadcrumb([...breadcrumb, { id: folderName, name: folderName }])

    await loadFiles(folderName)
  }

  // Navigation - retour aux dossiers
  const navigateToFolder = (folderId: string | null) => {
    if (folderId === null) {
      setCurrentFolderId(null)
      setCurrentFolderName(null)
      setViewMode("folders")
      setFiles([])
      setBreadcrumb([{ id: null, name: "Mes fichiers" }])
    } else {
      const folder = directories.find((dir) => dir.dir_name === folderId)
      if (folder) {
        openFolder(folder.dir_name)
      }
    }
  }

  // Upload de fichiers
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (uploadedFiles && currentFolderName) {
      setIsUploading(true)
      setError(null)

      try {
        for (let i = 0; i < uploadedFiles.length; i++) {
          const file = uploadedFiles[i]
          const uploadedFile = await fileService.uploadFile(currentFolderName, file)
          setFiles((prevFiles) => [...prevFiles, uploadedFile])
        }
      } catch (err: any) {
        setError(err.message || "Erreur lors de l'upload des fichiers")
      } finally {
        setIsUploading(false)
      }
    }
  }

  // Téléchargement d'un fichier
  const downloadFile = async (directory: string, filename: string) => {
    try {
      const blob = await fileService.downloadFile(directory, filename)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err: any) {
      setError(err.message || "Erreur lors du téléchargement du fichier")
    }
  }

  // Détermination de l'icône du fichier selon le content_type
  const getFileIcon = (item: FileItem) => {
    const contentType = item.content_type || ""

    if (contentType.startsWith("image/")) {
      return <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
    } else if (contentType.startsWith("video/")) {
      return <Video className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
    } else if (contentType.startsWith("audio/")) {
      return <Music className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
    } else {
      return <File className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
    }
  }

  // Formatage de la taille du fichier (si disponible)
  const formatFileSize = (sizeInBytes?: number): string => {
    if (!sizeInBytes) return "N/A"

    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(1)} KB`
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`
    } else {
      return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
    }
  }

  // Formatage de la date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Formatage de la date pour mobile (plus court)
  const formatDateMobile = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date)
  }

  // Éléments à afficher selon le mode de vue
  let displayItems: Array<any> = []

  if (viewMode === "files") {
    displayItems = files.map((file) => ({
      ...file,
      type: "file",
      name: file.file_name, // Utiliser file_name
      modified: formatDate(file.created_at),
      modifiedMobile: formatDateMobile(file.created_at),
      size: formatFileSize(file.size),
      directory: file.parent.dir_name, // Récupérer le nom du dossier parent
    }))
  } else {
    displayItems = directories.map((dir) => ({
      ...dir,
      type: "folder",
      name: dir.dir_name, // Utiliser dir_name
      modified: formatDate(dir.created_at),
      modifiedMobile: formatDateMobile(dir.created_at),
    }))
  }

  // Filtrage par recherche
  const filteredItems = displayItems.filter((item) => {
    if (!item.name) {
      return false
    }
    if (!searchQuery) {
      return true
    }
    return item.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Responsive */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DriveStorage
              </span>
            </div>
            <div className="text-slate-400 hidden sm:block">|</div>

            {/* Breadcrumb - Responsive */}
            <nav className="hidden sm:flex items-center space-x-2 text-sm flex-1 min-w-0">
              {breadcrumb.map((item, index) => (
                <div key={item.id || `root-${index}`} className="flex items-center space-x-2 min-w-0">
                  {index > 0 && <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                  <button
                    onClick={() => navigateToFolder(item.id)}
                    className={`hover:text-blue-600 transition-colors truncate ${
                      index === breadcrumb.length - 1 ? "text-slate-900 font-medium" : "text-slate-600"
                    }`}
                  >
                    {index === 0 ? (
                      <div className="flex items-center space-x-1">
                        <Home className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </div>
                    ) : (
                      <span className="truncate">{item.name}</span>
                    )}
                  </button>
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Hidden on mobile, shown on larger screens */}
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-48 lg:w-64"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1 sm:space-x-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.name || "Mon compte"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/settings" className="flex items-center w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Mobile Breadcrumb */}
        <div className="px-4 pb-3 sm:hidden">
          <nav className="flex items-center space-x-2 text-sm overflow-x-auto">
            {breadcrumb.map((item, index) => (
              <div key={item.id || `root-${index}`} className="flex items-center space-x-2 flex-shrink-0">
                {index > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
                <button
                  onClick={() => navigateToFolder(item.id)}
                  className={`hover:text-blue-600 transition-colors whitespace-nowrap ${
                    index === breadcrumb.length - 1 ? "text-slate-900 font-medium" : "text-slate-600"
                  }`}
                >
                  {index === 0 ? (
                    <div className="flex items-center space-x-1">
                      <Home className="w-3 h-3" />
                      <span>{item.name}</span>
                    </div>
                  ) : (
                    item.name
                  )}
                </button>
              </div>
            ))}
          </nav>
        </div>
      </header>

      <div className="p-4 sm:p-6">
        {/* Message d'erreur */}
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Actions Bar - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {viewMode === "files" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateToFolder(null)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Retour aux dossiers</span>
                <span className="sm:hidden">Retour</span>
              </Button>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {viewMode === "files" ? (
                  <>
                    <span className="hidden sm:inline">Fichiers - {currentFolderName}</span>
                    <span className="sm:hidden">{currentFolderName}</span>
                  </>
                ) : (
                  "Mes dossiers"
                )}
              </h1>
              {viewMode === "files" && (
                <span className="text-xs sm:text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded mt-1 sm:mt-0 self-start">
                  {files.length} fichier{files.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Bouton Nouveau dossier - seulement en mode dossiers */}
            {viewMode === "folders" && (
              <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2" size="sm">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Nouveau dossier</span>
                    <span className="sm:hidden">Nouveau</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="mx-4 sm:mx-0">
                  <DialogHeader>
                    <DialogTitle>Créer un nouveau dossier</DialogTitle>
                    <DialogDescription>Donnez un nom à votre nouveau dossier</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="folderName">Nom du dossier</Label>
                      <Input
                        id="folderName"
                        placeholder="Mon nouveau dossier"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateFolderOpen(false)} disabled={isLoading}>
                      Annuler
                    </Button>
                    <Button onClick={createFolder} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Création...
                        </>
                      ) : (
                        "Créer"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            {/* Bouton Upload simple - seulement en mode fichiers */}
            {viewMode === "files" && (
              <div className="relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={isUploading}
                />
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2"
                  disabled={isUploading}
                  size="sm"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="hidden sm:inline">Upload en cours...</span>
                      <span className="sm:hidden">Upload...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span className="hidden sm:inline">Uploader des fichiers</span>
                      <span className="sm:hidden">Upload</span>
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* État de chargement */}
        {isLoading && !isUploading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-600 text-sm sm:text-base">Chargement...</span>
          </div>
        )}

        {/* Affichage des fichiers/dossiers */}
        {!isLoading && (
          <>
            {viewMode === "files" ? (
              /* Vue des fichiers - Responsive */
              <div className="space-y-2 sm:space-y-3">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <Card key={`${item.file_name}-${index}`} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-3 sm:p-4">
                        {/* Desktop Layout */}
                        <div className="hidden sm:flex items-center justify-between">
                          {/* Informations du fichier */}
                          <div className="flex items-center space-x-4 flex-1 min-w-0">
                            {/* Icône du fichier */}
                            <div className="flex-shrink-0">{getFileIcon(item)}</div>

                            {/* Nom du fichier */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-slate-900 truncate text-lg">{item.name}</h3>
                              <p className="text-sm text-slate-500">Type: {item.content_type}</p>
                            </div>

                            {/* Date de création */}
                            <div className="flex items-center space-x-1 text-slate-500 min-w-0">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm whitespace-nowrap">{item.modified}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadFile(item.directory, item.file_name)}
                              className="flex items-center space-x-1"
                            >
                              <Download className="w-4 h-4" />
                              <span>Télécharger</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteFile(item.file_name, item.directory)}
                              className="flex items-center space-x-1 text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Supprimer</span>
                            </Button>
                          </div>
                        </div>

                        {/* Mobile Layout */}
                        <div className="sm:hidden">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <div className="flex-shrink-0">{getFileIcon(item)}</div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-slate-900 truncate">{item.name}</h3>
                                <p className="text-xs text-slate-500 truncate">{item.content_type}</p>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="flex-shrink-0">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => downloadFile(item.directory, item.file_name)}>
                                  <Download className="w-4 h-4 mr-2" />
                                  Télécharger
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteFile(item.file_name, item.directory)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="flex items-center text-xs text-slate-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{item.modifiedMobile}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Dossier vide</h3>
                    <p className="text-slate-500 mb-4 sm:mb-6 px-4">
                      {searchQuery
                        ? "Aucun fichier ne correspond à votre recherche"
                        : "Ce dossier ne contient aucun fichier."}
                    </p>
                    {!searchQuery && (
                      <p className="text-slate-600 px-4">
                        Utilisez le bouton "Upload" ci-dessus pour ajouter des fichiers.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Vue des dossiers - Grille responsive */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <Card
                      key={`${item.dir_name}-${index}`}
                      className="hover:shadow-lg transition-shadow cursor-pointer group"
                      onClick={() => openFolder(item.name)}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <Folder className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-slate-900 truncate">{item.name}</h3>
                              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
                                <span className="hidden sm:inline">{item.modified}</span>
                                <span className="sm:hidden">{item.modifiedMobile}</span>
                              </div>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openFolder(item.name)
                                }}
                              >
                                <FolderOpen className="w-4 h-4 mr-2" />
                                Ouvrir
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setFolderToRename({ currentName: item.name, newName: item.name })
                                  setIsRenameFolderOpen(true)
                                }}
                              >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Renommer
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteFolder(item.name)
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 sm:py-12">
                    <Folder className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Aucun dossier</h3>
                    <p className="text-slate-500 px-4">
                      {searchQuery
                        ? "Aucun dossier ne correspond à votre recherche"
                        : "Commencez par créer votre premier dossier"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Dialogue de renommage de dossier */}
            <Dialog open={isRenameFolderOpen} onOpenChange={setIsRenameFolderOpen}>
              <DialogContent className="mx-4 sm:mx-0">
                <DialogHeader>
                  <DialogTitle>Renommer le dossier</DialogTitle>
                  <DialogDescription>Entrez le nouveau nom pour le dossier</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="renameFolderName">Nouveau nom du dossier</Label>
                    <Input
                      id="renameFolderName"
                      placeholder="Nouveau nom"
                      value={folderToRename?.newName || ""}
                      onChange={(e) =>
                        setFolderToRename(folderToRename ? { ...folderToRename, newName: e.target.value } : null)
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsRenameFolderOpen(false)} disabled={isLoading}>
                    Annuler
                  </Button>
                  <Button onClick={renameFolder} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Renommage...
                      </>
                    ) : (
                      "Renommer"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  )
}

