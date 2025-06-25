"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Folder, Upload, Shield, Menu, X } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-3 pt-3 border-t border-slate-200 space-y-2 animate-in slide-in-from-top-2">
              <Link href="/login" className="block">
                <Button 
                  variant="ghost" 
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Se connecter
                </Button>
              </Link>
              <Link href="/register" className="block">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => setMobileMenuOpen(false)}
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
            <Link href="/login" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3"
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
          <Link href="/register">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-base sm:text-lg px-6 sm:px-8 py-3 hover:scale-105 transition-transform"
            >
              Créer mon compte gratuitement
            </Button>
          </Link>
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
}