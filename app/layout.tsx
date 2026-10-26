import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/components/language-provider"
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
  description:
    "Portfólio de Eduardo de Brito, desenvolvedor Full Stack com foco em software seguro, arquitetura e performance.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Eduardo de Brito | Full Stack Developer",
    description: "Desenvolvedor Full Stack com foco em software seguro, da interface à API.",
    url: "https://outzdev.me",
    siteName: "outz.dev",
    locale: "pt_BR",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo de Brito | Full Stack Developer",
    description: "Desenvolvedor Full Stack com foco em software seguro, da interface à API.",
  },
}
// Dados estruturados para o Google entender quem é o dono do site
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eduardo de Brito Soares",
  alternateName: "outz",
  url: "https://outzdev.me",
  jobTitle: "Full Stack Developer",
  email: "mailto:du.ebrits@gmail.com",
  sameAs: ["https://www.linkedin.com/in/duebrits-dev/", "https://github.com/outz1"],
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "Python",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Application Security",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div className="noise-overlay" />
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}