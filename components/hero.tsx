"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowDownRight, Check, Copy } from "lucide-react"
import { SentientSphere } from "./sentient-sphere"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [copied, setCopied] = useState(false)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, reduceMotion ? 1 : 0])
  const scale = useTransform(scrollYProgress, [0, 0.55], [1, reduceMotion ? 1 : 0.92])

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  const copyEmail = async () => {
    await navigator.clipboard.writeText("du.ebrits@gmail.com")
    setCopied(true)

    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 2400)
  }

  const scrollToProjects = () => {
    document.getElementById("works")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <section ref={containerRef} className="relative min-h-svh w-full overflow-hidden bg-[#050505]">
      <div className="absolute inset-0" aria-hidden="true">
        <SentientSphere />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="pointer-events-none relative z-10 flex min-h-svh flex-col justify-between px-8 pb-10 pt-24 md:px-12 md:pb-12 md:pt-28"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p className="mb-4 font-mono text-xs tracking-[0.25em] text-muted-foreground">
            EDUARDO DE BRITO SOARES
          </p>
          <h1 className="max-w-5xl text-balance font-sans text-5xl font-light leading-[0.98] tracking-tight md:text-7xl lg:text-8xl">
            Full Stack Developer
            <br />
            <span className="italic text-white/65">com foco em software seguro.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="ml-auto flex w-full max-w-2xl flex-col items-start gap-7 md:items-end"
        >
          <p className="max-w-xl font-mono text-sm leading-relaxed text-muted-foreground md:text-right md:text-base">
            Desenvolvo aplicações web completas, da interface à API, com foco em arquitetura,
            performance e segurança.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={scrollToProjects}
              data-cursor-hover
              className="pointer-events-auto group flex cursor-pointer items-center gap-3 border border-white/20 px-5 py-3 font-mono text-xs tracking-[0.16em] transition-colors hover:bg-white hover:text-[#050505]"
            >
              VER PROJETOS
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
            <motion.button
              type="button"
              onClick={copyEmail}
              data-cursor-hover
              aria-label={copied ? "E-mail copiado" : "Copiar endereço de e-mail"}
              aria-live="polite"
              animate={{
                backgroundColor: copied ? "#FF5F1F" : "rgba(0, 0, 0, 0)",
                borderColor: copied ? "#FF5F1F" : "rgba(255, 255, 255, 0.15)",
                color: copied ? "#050505" : "rgba(255, 255, 255, 0.7)",
              }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto flex min-w-48 cursor-pointer items-center justify-center gap-3 border px-5 py-3 font-mono text-xs tracking-[0.16em] hover:border-white/35 hover:text-white"
            >
              <motion.span
                key={copied ? "copied" : "copy"}
                initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                {copied ? "E-MAIL COPIADO" : "COPIAR E-MAIL"}
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
