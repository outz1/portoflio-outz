"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "./language-provider"


const EMAIL = "du.ebrits@gmail.com"

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/duebrits-dev/",
  },
  {
    name: "GitHub",
    href: "https://github.com/outz1",
  },
  {
    name: "E-mail",
    href: `mailto:${EMAIL}`,
  },
];


export function Footer() {
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current)
    }
  }, [])

  // O mailto não faz nada sem programa de e-mail configurado, então o endereço também vai para a área de transferência
  const copyEmail = () => {
    navigator.clipboard
      ?.writeText(EMAIL)
      .then(() => {
        setCopied(true)
        if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current)
        copiedTimeoutRef.current = setTimeout(() => setCopied(false), 2400)
      })
      .catch(() => {})
  }

  return (
    <footer className="relative">
      {/* Main CTA */}
      <motion.a
        href={`mailto:${EMAIL}`}
        data-cursor-hover
        className="relative block overflow-hidden"
        onClick={copyEmail}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        {/* Background Curtain */}
        <motion.div
          className="absolute inset-0 bg-accent"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Content */}
        <div className="relative border-t border-border px-6 py-16 md:px-12 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2
                className={`text-balance font-display text-5xl font-normal tracking-tight text-center transition-colors duration-300 md:text-left md:text-7xl lg:text-8xl ${
                  isHovered ? "text-accent-foreground" : "text-foreground"
                }`}
              >
                {t.footer.ctaStart} <span className="italic">{t.footer.ctaEmphasis}</span>
              </h2>
              <span
                className={`mt-4 block text-center font-mono text-sm transition-colors duration-300 md:text-left ${
                  isHovered ? "text-accent-foreground" : "text-muted-foreground"
                }`}
                aria-live="polite"
              >
                {EMAIL}
                {copied && ` · ${t.footer.emailCopied}`}
              </span>
            </div>

            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className={`transition-colors duration-300 ${isHovered ? "text-accent-foreground" : "text-foreground"}`}
            >
              <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16" />
            </motion.div>
          </div>
        </div>
      </motion.a>

      {/* Footer Info */}
      <div className="border-t border-border px-6 py-6 md:px-12">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <div id="contact" className="flex gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors duration-300 hover:text-accent"
              >
                {link.name}
              </a>
            ))}
          </div>

          <p className="font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} outzdev.me</p>
        </div>
      </div>
    </footer>
  )
}
