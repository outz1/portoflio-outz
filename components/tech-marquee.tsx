"use client"

import { motion, useReducedMotion } from "framer-motion"

const skillGroups = [
  {
    number: "01",
    title: "Principal",
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python"],
  },
  {
    number: "02",
    title: "Backend & dados",
    skills: ["REST APIs", "JWT", "SQL", "Redis", "Swagger", "OpenAPI"],
  },
  {
    number: "03",
    title: "Ferramentas",
    skills: ["Git", "Gitflow", "Docker", "Linux", "Postman", "DBeaver"],
  },
  {
    number: "04",
    title: "Produto & interface",
    skills: ["Tailwind CSS", "shadcn/ui", "UI/UX", "SEO técnico"],
  },
]

export function TechMarquee() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative px-8 py-24 md:px-12 md:py-32" aria-labelledby="skills-title">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16"
      >
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">competências</p>
        <h2 id="skills-title" className="font-sans text-3xl font-light italic md:text-5xl">
          TECNOLOGIAS &amp; FERRAMENTAS
        </h2>
      </motion.div>

      <div className="border-t border-white/10">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: index * 0.05 }}
            className="grid gap-5 border-b border-white/10 py-7 md:grid-cols-[3rem_0.65fr_1.35fr] md:items-center md:gap-8"
          >
            <span className="font-mono text-[10px] tracking-widest text-[#FF5F1F]">{group.number}</span>
            <h3 className="font-sans text-2xl font-light italic md:text-3xl">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-white/15 px-3 py-1.5 font-mono text-[10px] tracking-wider text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
