"use client"

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react"
import { translations, type Dictionary, type Language } from "@/lib/translations"

const STORAGE_KEY = "language"

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

// Store mínimo sobre o localStorage para o useSyncExternalStore
const listeners = new Set<() => void>()
let fallback: Language | null = null

function readLanguage(): Language {
  let stored: string | null = fallback
  try {
    stored = localStorage.getItem(STORAGE_KEY) ?? fallback
  } catch {}

  if (stored === "pt" || stored === "en") return stored
  // Sem escolha salva, segue o idioma do navegador
  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en"
}

function writeLanguage(language: Language) {
  fallback = language
  try {
    localStorage.setItem(STORAGE_KEY, language)
  } catch {}
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, readLanguage, () => "pt" as const)

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en"
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage: writeLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage precisa estar dentro de LanguageProvider")
  return context
}
