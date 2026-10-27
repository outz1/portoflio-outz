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
  const [time, setTime] = useState("")
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

  useEffect(() => {
    // Horário de Brasília, igual para todos os visitantes
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    const updateTime = () => setTime(formatter.format(new Date()))

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

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
          className="absolute inset-0 bg-[#FF5F1F]"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Content */}
        <div className="relative py-16 md:py-24 px-8 md:px-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <motion.h2
                className="font-sans text-4xl md:text-6xl lg:text-8xl font-light tracking-tight text-center md:text-left"
                animate={{
                  color: isHovered ? "#050505" : "#fafafa",
                }}
                transition={{ duration: 0.3 }}
              >
                {t.footer.ctaStart} <span className="italic">{t.footer.ctaEmphasis}</span>
              </motion.h2>
              <motion.span
                className="mt-4 block text-center font-mono text-xs tracking-widest md:text-left md:text-sm"
                animate={{ color: isHovered ? "#050505" : "#a1a1a1" }}
                transition={{ duration: 0.3 }}
                aria-live="polite"
              >
                {EMAIL}
                {copied && ` · ${t.footer.emailCopied}`}
              </motion.span>
            </div>

            <motion.div
              animate={{
                rotate: isHovered ? 45 : 0,
                color: isHovered ? "#050505" : "#fafafa",
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16" />
            </motion.div>
          </div>
        </div>
      </motion.a>

      {/* Footer Info */}
      <div className="px-8 md:px-12 py-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Local Time */}
          <div className="font-mono text-xs tracking-widest text-muted-foreground">
            <span className="mr-2">{t.footer.localTime}</span>
            <span className="text-white tabular-nums">{time}</span>
          </div>

          {/* Links */}
          <div id='contact' className="flex gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex min-h-11 items-center font-mono text-xs tracking-widest text-muted-foreground hover:text-[#FF5F1F] transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs tracking-widest text-muted-foreground">© {new Date().getFullYear()} outzdev.me</p>
        </div>
      </div>
    </footer>
  )
}
