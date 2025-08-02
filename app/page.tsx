"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Shield,
  MapPin,
  Users,
  Eye,
  Fingerprint,
  ShieldAlert,
  Camera,
  Thermometer,
  QrCode,
  UserCheck,
  FileText,
  GraduationCap,
  Smartphone,
  AlertTriangle,
  BarChart3,
  Bell,
  Laptop,
  Code,
  BadgeIcon as Certificate,
  Download,
  Folder,
  Upload,
  Menu,
  X,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

// Hook simple pour les cookies
function useCookies() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  const setCookie = (name: string, value: string, days: number) => {
    if (typeof window !== "undefined") {
      const expires = new Date()
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
    }
  }

  return { preferences, setCookie, setPreferences }
}

// Composant Carrousel de témoignages
function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const testimonials = [
    {
      name: "Marie Louise D",
      position: "CEO",
      company: "TAMBEDOU",
      content:
        "Le service de gestion des sauvegardes et de récupération de données fourni par Genetics est indispensable pour nous. Leur solution de sauvegarde est simple à utiliser, et nous savons que nos données sont en sécurité. En cas de problème, leur équipe intervient rapidement pour récupérer nos informations, minimisant ainsi les risques de perte de données.",
      rating: 5,
      avatar: "MLD",
    },
    {
      name: "Djibril Guèye",
      position: "PDG",
      company: "AXONE",
      content:
        "Depuis que nous avons confié la maintenance de notre infrastructure informatique à Genetics, nous avons constaté une nette réduction des pannes imprévues. Leur équipe intervient de manière proactive, ce qui nous permet de nous concentrer sur notre activité sans nous soucier des problèmes techniques. Leur professionnalisme et leur réactivité sont un véritable atout pour notre entreprise.",
      rating: 5,
      avatar: "DG",
    },
    {
      name: "Fatou Diagne",
      position: "CTO",
      company: "Innovatech",
      content:
        "L'audit informatique réalisé par Genetics a été une étape déterminante pour nous. Leur équipe a su analyser en profondeur nos systèmes et identifier des vulnérabilités que nous n'avions pas repérées. Grâce à leurs recommandations pratiques, nous avons renforcé notre sécurité et optimisé nos infrastructures, ce qui a considérablement amélioré nos performances.",
      rating: 5,
      avatar: "FD",
    },
    {
      name: "Victorie B",
      position: "Manager",
      company: "SecureNet",
      content:
        "Grâce à Genetics, nous avons une surveillance continue de notre réseau qui détecte et prévient les menaces de manière proactive. Leur expertise en sécurité nous a permis de renforcer nos protections contre les cyberattaques, et leur réactivité en cas d'incident est remarquable. Nous nous sentons désormais beaucoup plus sereins quant à la sécurité de nos données.",
      rating: 5,
      avatar: "VB",
    },
    {
      name: "Marie Louise D",
      position: "CEO",
      company: "TAMBEDOU",
      content:
        "Le service de gestion des sauvegardes et de récupération de données fourni par Genetics est indispensable pour nous. Leur solution de sauvegarde est simple à utiliser, et nous savons que nos données sont en sécurité. En cas de problème, leur équipe intervient rapidement pour récupérer nos informations, minimisant ainsi les risques de perte de données.",
      rating: 5,
      avatar: "MLD",
    },
    {
      name: "Fatou Diagne",
      position: "CTO",
      company: "Innovatech",
      content:
        "L'audit informatique réalisé par Genetics a été une étape déterminante pour nous. Leur équipe a su analyser en profondeur nos systèmes et identifier des vulnérabilités que nous n'avions pas repérées. Grâce à leurs recommandations pratiques, nous avons renforcé notre sécurité et optimisé nos infrastructures, ce qui a considérablement amélioré nos performances.",
      rating: 5,
      avatar: "FD",
    },
    {
      name: "Victorie B",
      position: "Manager",
      company: "SecureNet",
      content:
        "Grâce à Genetics, nous avons une surveillance continue de notre réseau qui détecte et prévient les menaces de manière proactive. Leur expertise en sécurité nous a permis de renforcer nos protections contre les cyberattaques, et leur réactivité en cas d'incident est remarquable. Nous nous sentons désormais beaucoup plus sereins quant à la sécurité de nos données.",
      rating: 5,
      avatar: "VB",
    },
    {
      name: "Djibril Guèye",
      position: "PDG",
      company: "AXONE",
      content:
        "Depuis que nous avons confié la maintenance de notre infrastructure informatique à Genetics, nous avons constaté une nette réduction des pannes imprévues. Leur équipe intervient de manière proactive, ce qui nous permet de nous concentrer sur notre activité sans nous soucier des problèmes techniques. Leur professionnalisme et leur réactivité sont un véritable atout pour notre entreprise.",
      rating: 5,
      avatar: "DG",
    },
  ]

  const totalSlides = 4

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000)
    return () => clearInterval(interval)
  }, [totalSlides])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Carrousel */}
      <div className="overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 p-6 lg:p-8">
                {testimonials.slice(slideIndex * 2, slideIndex * 2 + 2).map((testimonial, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-16 h-16 bg-[#082038] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {testimonial.avatar}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 text-lg">{testimonial.name}</h4>
                          <p className="text-slate-600 text-sm">{testimonial.position}</p>
                          <p className="text-[#082038] font-medium text-sm">{testimonial.company}</p>
                        </div>
                        <div className="flex space-x-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <div key={i} className="w-5 h-5 text-[#efb83b]">
                              ⭐
                            </div>
                          ))}
                        </div>
                      </div>
                      <blockquote className="text-slate-700 leading-relaxed italic">"{testimonial.content}"</blockquote>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contrôles de navigation */}
      <div className="flex items-center justify-center mt-8 space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border-slate-300 hover:border-[#082038] hover:text-[#082038] bg-transparent"
        >
          ←
        </Button>
        {/* Indicateurs de slides */}
        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-[#082038] scale-125" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border-slate-300 hover:border-[#082038] hover:text-[#082038] bg-transparent"
        >
          →
        </Button>
      </div>
    </div>
  )
}

export default function Component() {
  const [expandedServices, setExpandedServices] = useState(new Set<number>())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showInstallInstructions, setShowInstallInstructions] = useState(false)
  const { setCookie, preferences } = useCookies()

  useEffect(() => {
    // Vérifier si l'app est déjà installée
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    // Écouter l'événement d'installation PWA
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleDownloadApp = async () => {
    // Si le prompt automatique est disponible
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        setDeferredPrompt(null)
        setIsInstalled(true)
        if (preferences.analytics) {
          setCookie("pwa-installed", "true", 30)
        }
      }
    } else {
      // Sinon, afficher les instructions manuelles
      setShowInstallInstructions(true)
    }
  }

  const toggleService = (index) => {
    const newExpanded = new Set(expandedServices)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedServices(newExpanded)
  }

  const services = [
    {
      icon: Shield,
      title: "Karàngue Digital",
      description: "Solutions de sécurité électronique connectées",
      color: "primary",
      subtitle: "Vitrine de solutions connectées du Groupe Genetics",
      subServices: [
        { icon: Camera, name: "Caméras IP & WiFi" },
        { icon: Eye, name: "Caméras analogiques" },
        { icon: ShieldAlert, name: "Détection intrusion" },
        { icon: Thermometer, name: "Surveillance environnementale" },
        { icon: Fingerprint, name: "Pointage biométrique" },
        { icon: UserCheck, name: "Contrôle d'accès" },
      ],
    },
    {
      icon: Smartphone,
      title: "Karàngue Mobile",
      description: "La sécurité au creux de votre main",
      color: "accent",
      subtitle: "Applications mobiles pour la sécurité résidentielle et professionnelle",
      subServices: [
        { icon: QrCode, name: "QR Visiteurs sécurisés" },
        { icon: MapPin, name: "Pointage mobile géolocalisé" },
        { icon: AlertTriangle, name: "Alerte incidents en temps réel" },
        { icon: BarChart3, name: "Tableau de bord gestionnaire" },
        { icon: Bell, name: "Notifications push" },
      ],
    },
    {
      icon: GraduationCap,
      title: "Jang Academy",
      description: "Centre de formation du Groupe Genetics",
      color: "primary",
      subtitle: "Formation professionnelle et technique IT",
      subServices: [
        { icon: Laptop, name: "Formations IT certifiantes" },
        { icon: Shield, name: "Sécurité électronique" },
        { icon: Code, name: "Développement digital" },
        { icon: Users, name: "Entrepreneuriat" },
        { icon: Certificate, name: "Certifications professionnelles" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Instructions d'installation PWA flottantes */}
      {showInstallInstructions && !isInstalled && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-white/95 backdrop-blur-md border-blue-200">
            <CardHeader>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <Download className="w-5 h-5" />
                {getInstallInstructions().title}
              </CardTitle>
            </CardHeader>
            <div className="p-6 pt-0">
              <div className="space-y-3 mb-4">
                {getInstallInstructions().steps.map((step, index) => (
                  <div key={index} className="text-sm text-slate-700 font-medium">
                    {step}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowInstallInstructions(false)} className="flex-1">
                  Fermer
                </Button>
                <Button
                  onClick={() => setShowInstallInstructions(false)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Compris !
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notification PWA installée */}
      {isInstalled && (
        <div className="fixed top-24 right-4 z-40 animate-in slide-in-from-right duration-500">
          <Card className="bg-green-50 border-green-200 shadow-lg">
            <div className="p-4">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold text-sm">DriveStorage installé avec succès !</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Header avec navigation responsive */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          {/* Desktop Navigation */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DriveStorage
              </span>
            </div>

            {/* Desktop Navigation Buttons */}
            <div className="hidden sm:flex items-center space-x-3 md:space-x-4">
              {/* Bouton PWA dans le header */}
              {!isInstalled && (
                <Button
                  onClick={handleDownloadApp}
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Installer
                </Button>
              )}
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-sm md:text-base">
                  Se connecter
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm md:text-base px-3 md:px-4"
                >
                  Créer un compte
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-3 pt-3 border-t border-slate-200 space-y-2 animate-in slide-in-from-top-2">
              {!isInstalled && (
                <Button
                  onClick={handleDownloadApp}
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Installer l'App
                </Button>
              )}
              <Link href="/login" className="block">
                <Button variant="ghost" className="w-full justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                  Se connecter
                </Button>
              </Link>
              <Link href="/register" className="block">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Créer un compte
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Responsive */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Votre espace de stockage personnel
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed px-2">
            Une plateforme moderne et sécurisée pour organiser, partager et gérer tous vos documents. Créez des
            dossiers, uploadez vos fichiers et accédez-y depuis n'importe où avec DriveStorage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base sm:text-lg px-6 sm:px-8 py-3"
              >
                Commencer gratuitement
              </Button>
            </Link>
            {!isInstalled && (
              <Button
                onClick={handleDownloadApp}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white text-base sm:text-lg px-6 sm:px-8 py-3 hover:scale-105 transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Installer l'App
              </Button>
            )}
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 bg-transparent"
              >
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Responsive Grid */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Fonctionnalités principales</h2>
          <p className="text-slate-600 text-base sm:text-lg px-4">
            Tout ce dont vous avez besoin pour gérer vos fichiers efficacement
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Folder className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl mb-2">Organisation intelligente</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Créez des dossiers et sous-dossiers pour organiser vos fichiers de manière intuitive
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl mb-2">Upload rapide</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Glissez-déposez vos fichiers ou utilisez notre interface simple pour les uploader
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 md:col-span-2 lg:col-span-1">
            <CardHeader className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl mb-2">Sécurité avancée</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Vos fichiers sont protégés avec un chiffrement de niveau entreprise
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section - Responsive */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Prêt à commencer ?</h2>
          <p className="text-blue-100 text-base sm:text-lg mb-6 sm:mb-8 px-4">
            Rejoignez des milliers d'utilisateurs qui font confiance à DriveStorage
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 hover:scale-105 transition-transform"
              >
                Créer mon compte gratuitement
              </Button>
            </Link>
            {!isInstalled && (
              <Button
                onClick={handleDownloadApp}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 text-base sm:text-lg px-6 sm:px-8 py-3 hover:scale-105 transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger l'App
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer - Responsive */}
      <footer className="bg-slate-900 text-slate-300 py-8 sm:py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-base sm:text-lg font-semibold">DriveStorage</span>
          </div>
          <p className="text-sm sm:text-base">&copy; 2025 DriveStorage. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )

  function getInstallInstructions() {
    const userAgent = navigator.userAgent
    const isIOS = /iPad|iPhone|iPod/.test(userAgent)
    const isAndroid = /Android/.test(userAgent)
    const isChrome = /Chrome/.test(userAgent)
    const isSafari = /Safari/.test(userAgent) && !isChrome

    if (isIOS && isSafari) {
      return {
        title: "📱 Installation sur iPhone/iPad",
        steps: [
          "1. Appuyez sur le bouton de partage (carré avec flèche vers le haut)",
          "2. Faites défiler et appuyez sur 'Sur l'écran d'accueil'",
          "3. Appuyez sur 'Ajouter' pour confirmer",
          "4. L'icône DriveStorage apparaîtra sur votre écran d'accueil !",
        ],
      }
    } else if (isAndroid && isChrome) {
      return {
        title: "📱 Installation sur Android",
        steps: [
          "1. Appuyez sur les trois points (menu) en haut à droite",
          "2. Sélectionnez 'Installer l'application' ou 'Ajouter à l'écran d'accueil'",
          "3. Confirmez l'installation",
          "4. L'icône DriveStorage apparaîtra sur votre écran d'accueil !",
        ],
      }
    } else {
      return {
        title: "💻 Installation sur ordinateur",
        steps: [
          "1. Regardez dans la barre d'adresse pour une icône d'installation (⊕)",
          "2. Ou allez dans le menu du navigateur → 'Installer DriveStorage'",
          "3. Confirmez l'installation",
          "4. L'app DriveStorage s'ouvrira dans sa propre fenêtre !",
        ],
      }
    }
  }
}
