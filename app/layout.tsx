import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./global.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://outzdev.me"), // Substitua pelo seu domínio real
  title: {
    default: "outz.dev - Eduardo de Brito | Portfólio",
    template: "%s | outz.dev",
  },
  description: "Fullstack Developer & Cybersecurity Enthusiast focado em Clean Architecture.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Eduardo de Brito - Fullstack Developer",
    description: "Portfólio de Eduardo de Brito, desenvolvedor Fullstack.",
    url: "https://outzdev.me",
    siteName: "outz.dev",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo de Brito - Fullstack Developer",
    description: "Fullstack Developer & Cybersecurity Enthusiast",
  },
}
export const viewport: Viewport = {
  themeColor: "#1a1a1a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning é vital se você for adicionar next-themes (dark mode) no futuro,
    // pois evita erros de hidratação entre o servidor (que não sabe o tema) e o cliente.
    <html lang="pt-BR" className={`${playfair.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased overflow-x-hidden">
        <div className="noise-overlay" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}