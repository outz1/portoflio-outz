"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Image from "next/image"
import { projects } from "@/lib/translations"
import { useLanguage } from "./language-provider"

export function Works() {
  const { language, t } = useLanguage()
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
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">{t.works.eyebrow}</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">{t.works.title}</h2>
      </motion.div>

      {/* Projects List */}
      <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
        {projects.map((project, index) => {
          const isExpanded = expandedIndices.has(index)
          // Experiências não têm link: o card vira um bloco sem navegação
          const Wrapper = project.link ? "a" : "div"
          const linkProps = project.link
            ? { href: project.link, target: "_blank", rel: "noopener noreferrer", "data-cursor-hover": true }
            : {}

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
              <Wrapper
                {...linkProps}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Year + Type badge */}
                <div className="flex items-center gap-3 order-1 md:order-none">
                  <span className="font-mono text-xs text-muted-foreground tracking-widest">
                    {project.year}
                  </span>
                  <span
                    className={`font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full border ${
                      project.type === "project"
                        ? "border-[#A1AEB1]/40 text-[#A1AEB1]/80"
                        : "border-[#FF5F1F]/40 text-[#FF5F1F]/80"
                    }`}
                  >
                    {t.works.types[project.type]}
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
                  {(Array.isArray(project.tags) ? project.tags : project.tags[language]).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-wider px-3 py-1 border border-white/20 rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Wrapper>

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
                {/* No celular não há hover, então a imagem aparece dentro do card */}
                <div className="relative mb-4 aspect-video w-full max-w-md overflow-hidden rounded-lg md:hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 0px"
                    className="object-cover"
                    style={{ filter: "grayscale(50%) contrast(1.1)" }}
                  />
                  <div className="absolute inset-0 bg-[#2563eb]/10 mix-blend-overlay" />
                </div>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {project.description[language]}
                </p>
              </motion.div>
            </motion.div>
          )
        })}

        {/* Floating Image */}
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-50 hidden h-0 w-0 md:block"
          style={{ x: springX, y: springY }}
        >
          <motion.div
            className="absolute bottom-15 left-10 h-40 w-64 origin-bottom-right overflow-hidden rounded-lg md:h-48 md:w-80"
            animate={{
              opacity: hoveredIndex !== null ? 1 : 0,
              scale: hoveredIndex !== null ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          >
            {hoveredIndex !== null && (
              <motion.div
                key={hoveredIndex}
                className="absolute inset-0"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={projects[hoveredIndex].image}
                  alt={projects[hoveredIndex].title}
                  fill
                  sizes="320px"
                  className="object-cover"
                  style={{
                    filter: "grayscale(50%) contrast(1.1)",
                  }}
                />
              </motion.div>
            )}
            <div className="absolute inset-0 bg-[#2563eb]/10 mix-blend-overlay" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Border */}
      <div className="border-t border-white/10" />
    </section>
  )
}
