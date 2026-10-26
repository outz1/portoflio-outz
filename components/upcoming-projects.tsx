"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "./language-provider"

const upcomingProjects = [
  {
    title: "INSIGNIA",
    image: "/favicon.svg",
  },
  {
    title: "NewArch",
    image: "/upcoming/newarch.png",
  },
  {
    title: "Braquiara",
    image: "/upcoming/braquiara.png",
  },
]

export function UpcomingProjects() {
  const { t } = useLanguage()

  return (
    <section className="relative px-8 py-24 md:px-12 md:py-32" aria-labelledby="upcoming-projects-title">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16"
      >
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">
          {t.upcoming.eyebrow}
        </p>
        <h2
          id="upcoming-projects-title"
          className="font-sans text-3xl font-light italic md:text-5xl"
        >
          {t.upcoming.title}
        </h2>
      </motion.div>

      <div className="grid border-l border-t border-white/10 md:grid-cols-3">
        {upcomingProjects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            className="group border-b border-r border-white/10"
          >
            <div className="relative flex h-32 items-center justify-center overflow-hidden bg-white/[0.02] md:h-36">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]" />
              <motion.div
                className="relative h-12 w-12 opacity-70"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain"
                  style={{
                    filter: "grayscale(75%) saturate(35%) brightness(1.15) contrast(0.9)",
                  }}
                />
              </motion.div>
            </div>

            <div className="border-t border-white/10 p-4 md:p-6">
              <h3 className="font-sans text-2xl font-light leading-tight tracking-tight transition-colors duration-500 group-hover:text-white/65 md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 max-w-sm font-mono text-xs leading-relaxed text-muted-foreground/80">
                {t.upcoming.descriptions[index]}
              </p>

            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
