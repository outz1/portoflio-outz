"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowDownRight, FileDown } from "lucide-react"
import { RESUME_URL } from "@/lib/translations"
import { useLanguage } from "./language-provider"
import { SentientSphere } from "./sentient-sphere"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { t } = useLanguage()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, reduceMotion ? 1 : 0])
  const scale = useTransform(scrollYProgress, [0, 0.55], [1, reduceMotion ? 1 : 0.92])

  const scrollToProjects = () => {
    document.getElementById("works")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <section ref={containerRef} className="relative min-h-svh w-full overflow-hidden bg-background">
      {/* A esfera fica à direita no desktop para não passar por baixo do texto */}
      <div
        className="absolute inset-0 opacity-50 md:left-[30%] md:opacity-100 md:[mask-image:linear-gradient(to_right,transparent,black_30%)]"
        aria-hidden="true"
      >
        <SentientSphere />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="pointer-events-none relative z-10 flex min-h-svh flex-col justify-end px-6 pb-12 pt-28 md:px-12 md:pb-16"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-balance font-display text-6xl font-normal leading-[0.95] tracking-tight md:text-8xl">
            Eduardo de Brito
          </h1>
          <p className="mt-5 font-mono text-sm text-accent">{t.hero.role}</p>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground/80 md:text-xl">
            {t.hero.lead}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <button
              type="button"
              onClick={scrollToProjects}
              data-cursor-hover
              className="pointer-events-auto group flex min-h-11 cursor-pointer items-center gap-3 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-foreground"
            >
              {t.hero.viewProjects}
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              aria-label={t.hero.resumeLabel}
              className="pointer-events-auto group flex min-h-11 items-center gap-2 text-sm text-foreground/80 underline decoration-border underline-offset-8 transition-colors hover:text-foreground hover:decoration-accent"
            >
              {t.hero.resume}
              <FileDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
