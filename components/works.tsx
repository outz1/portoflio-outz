"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const projects = [
  {
    title: "ELO Júnior",
    tags: ["Fullstack", "Automação", "Liderança"],
    image: "/const/elo.avif",
    year: "2025",
    type: "Experiência",
    link: "#",
    description:
      "Responsável técnico pelo desenvolvimento de aplicações web e automações, garantindo a qualidade e a eficiência dos processos.",
  },
  {
    title: "Labex",
    tags: ["Next.JS", "Vercel", "Typescript"],
    image: "/const/labex.jpeg",
    year: "2025",
    type: "Experiência",
    link: "https://labex-website.vercel.app/",
    description:
      "Aplicação web para uma empresa de medicina laboratorial, implementado com Next.js e deploy na Vercel. Foi utilizado conceitos de UI/UX design, SEO técnico e otimização de performance.",
  },
  {
    title: "Game Library",
    tags: ["Backend", "Nest.JS", "Swagger"],
    image: "/const/swagger.jpg",
    year: "2025",
    type: "Projeto",
    link: "https://github.com/outz1/backend-lib-games",
    description:
      "Backend de uma aplicação de biblioteca de jogos, foi implementado com Nest.js e Swagger. Foi feito com foco no aprendizado de conceitos de Rest API e CORS, permitindo a integração com diferentes serviço, foi utilizado o mock de dados para testes.",
  },
  {
    title: "Evento Gamificado",
    tags: ["TypeScript", "Redis", "API"],
    image: "/const/inf.jpg",
    year: "2026",
    type: "Projeto",
    link: "https://github.com/outz1/Projeto-CS",
    description:
      "Projeto para um evento da universidade com elementos de gamificação e scoreboard iterativo, foi feito com TypeScript e UptashRedis. Além de contar com práticas de desenvolvimento ágil e metodologias de entrega contínua e segurança de endpoints.",
  },
]

export function Works() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
  }

  const expandItem = (index: number) => {
    setExpandedIndices((prev) => {
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }

  const collapseItem = (index: number) => {
    setExpandedIndices((prev) => {
      const next = new Set(prev)
      next.delete(index)
      return next
    })
  }

  return (
    <section id="works" className="relative py-32 px-8 md:px-12 md:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">alguns pontos da minha trajetória</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">EXPERIÊNCIAS E PROJETOS PESSOAIS</h2>
      </motion.div>

      {/* Projects List */}
      <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
        {projects.map((project, index) => {
          const isExpanded = expandedIndices.has(index)

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onViewportEnter={() => expandItem(index)}
              onViewportLeave={() => collapseItem(index)}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative border-t border-white/10 py-8 md:py-12"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Year + Type badge */}
                <div className="flex items-center gap-3 order-1 md:order-none">
                  <span className="font-mono text-xs text-muted-foreground tracking-widest">
                    {project.year}
                  </span>
                  <span
                    className={`font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full border ${
                      project.type === "Projeto"
                        ? "border-[#A1AEB1]/40 text-[#A1AEB1]/80"
                        : "border-[#FF5F1F]/40 text-[#FF5F1F]/80"
                    }`}
                  >
                    {project.type}
                  </span>
                </div>

                {/* Title */}
                <motion.h3
                  className="font-sans text-4xl md:text-6xl lg:text-7xl font-light tracking-tight group-hover:text-white/70 transition-colors duration-300 flex-1"
                  animate={{
                    x: hoveredIndex === index ? 20 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {project.title}
                </motion.h3>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap order-2 md:order-none">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-wider px-3 py-1 border border-white/20 rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>

              {/* Texto expansível na parte inferior do card */}
              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                  marginTop: isExpanded ? 16 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              </motion.div>
            </motion.div>
          )
        })}

        {/* Floating Image */}
        <motion.div
          className="absolute pointer-events-none z-50 w-64 h-40 md:w-80 md:h-48 overflow-hidden rounded-lg"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-320%",
          }}
          animate={{
            opacity: hoveredIndex !== null ? 1 : 0,
            scale: hoveredIndex !== null ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        >
          {hoveredIndex !== null && (
            <motion.img
              src={projects[hoveredIndex].image}
              alt={projects[hoveredIndex].title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                filter: "grayscale(50%) contrast(1.1)",
              }}
            />
          )}
          {/* Glitch overlay */}
          <div className="absolute inset-0 bg-[#2563eb]/10 mix-blend-overlay" />
        </motion.div>
      </div>

      {/* Bottom Border */}
      <div className="border-t border-white/10" />
    </section>
  )
}