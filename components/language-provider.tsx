"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { translations, type Dictionary, type Language } from "@/lib/translations"

const STORAGE_KEY = "language"

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")

  // Usa a escolha salva; sem ela, segue o idioma do navegador
  useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(STORAGE_KEY)
    } catch {}

    if (stored === "pt" || stored === "en") {
      setLanguageState(stored)
    } else if (!navigator.language.toLowerCase().startsWith("pt")) {
      setLanguageState("en")
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en"
  }, [language])

  const setLanguage = (next: Language) => {
    setLanguageState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage precisa estar dentro de LanguageProvider")
  return context
}
