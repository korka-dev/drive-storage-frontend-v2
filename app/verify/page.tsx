"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Loader2, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { userService } from "@/lib/api/user-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function VerifyPage() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(0)
  const [email, setEmail] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Email manquant. Veuillez réessayer.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await userService.verifyEmail(email, code)
      setSuccess("Votre compte a été vérifié avec succès!")

      // Redirection vers le dashboard après vérification
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Erreur lors de la vérification du code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (!email) {
      setError("Email manquant. Veuillez réessayer.")
      return
    }

    setIsResending(true)
    setError(null)

    try {
      const response = await userService.resendCode(email)
      setSuccess("Un nouveau code a été envoyé à votre adresse email.")

      // Démarrer le compte à rebours
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err: any) {
      setError(err.message || "Erreur lors du renvoi du code")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DriveStorage
            </span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-500 text-green-800 bg-green-50">
            <AlertTitle>Succès</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Vérification de votre compte</CardTitle>
            <CardDescription>
              Veuillez entrer le code de vérification envoyé à {email || "votre adresse email"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Code de vérification</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Entrez le code à 6 chiffres"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  disabled={isLoading || !!success}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading || !!success}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Vérification...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Vérifié
                  </>
                ) : (
                  "Vérifier mon compte"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center w-full">
              <Button
                type="button"
                variant="ghost"
                onClick={handleResendCode}
                disabled={isResending || countdown > 0 || !!success}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Envoi en cours...
                  </>
                ) : countdown > 0 ? (
                  `Renvoyer le code (${countdown}s)`
                ) : (
                  "Je n'ai pas reçu de code"
                )}
              </Button>
            </div>
            <p className="text-sm text-slate-600 text-center">
              Retour à la{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                page de connexion
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
