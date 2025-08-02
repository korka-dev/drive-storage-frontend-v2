import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DriveStorage - Votre espace de stockage personnel",
  description: "Une plateforme moderne et sécurisée pour organiser, partager et gérer tous vos documents",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DriveStorage",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/drivestorage-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/drivestorage-icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/drivestorage-icon.png", sizes: "any", type: "image/svg+xml" },
    ],
    apple: [{ url: "/drivestorage-icon-180.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/drivestorage-icon.png" type="image/svg+xml" />
        <link rel="icon" href="/drivestorage-icon-192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/drivestorage-icon-180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DriveStorage" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-TileImage" content="/drivestorage-icon-192.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
