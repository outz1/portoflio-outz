"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "./language-provider"

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <button
      type="button"
      onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
      data-cursor-hover
      aria-label={t.nav.switchLanguage}
      className="flex min-h-9 items-center gap-1.5 border border-border px-3 py-1.5 font-mono text-xs transition-colors hover:border-muted-foreground"
    >
      <span className={language === "pt" ? "text-foreground" : "text-muted-foreground"}>PT</span>
      <span aria-hidden="true" className="text-muted-foreground/50">/</span>
      <span className={language === "en" ? "text-foreground" : "text-muted-foreground"}>EN</span>
    </button>
  )
}

export function Navbar() {
  const { t } = useLanguage()
  const navLinks = t.nav.links
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Esc fecha o menu do celular
  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:bg-accent focus:px-4 focus:py-3 focus:text-sm focus:text-accent-foreground"
      >
        {t.nav.skipToContent}
      </a>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
          isScrolled ? "border-border bg-background" : "border-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-4 md:px-12 md:py-5">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            aria-label={t.nav.backToTop}
            className="group flex min-h-11 items-center gap-2"
          >
            <span aria-hidden="true" className="font-mono text-lg text-muted-foreground">&lt;/&gt;</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="group relative text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">{t.nav.status}</span>
            </div>
            <LanguageToggle />
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <LanguageToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.5"
              aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="w-6 h-px bg-foreground origin-center"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-6 h-px bg-foreground"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="w-6 h-px bg-foreground origin-center"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="font-display text-4xl tracking-tight text-foreground"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}