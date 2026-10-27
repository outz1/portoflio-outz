"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { Dictionary } from "@/lib/translations"
import { useLanguage } from "./language-provider"

const getSkillGroups = (t: Dictionary["skills"]) => [
  {
    number: "01",
    title: t.groups[0],
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python"],
  },
  {
    number: "02",
    title: t.groups[1],
    skills: ["NestJS", "Express", "REST APIs", "PostgreSQL", "MySQL", "Redis", "BullMQ", "Swagger/OpenAPI", t.llm],
  },
  {
    number: "03",
    title: t.groups[2],
    skills: ["Git", "Gitflow", "Docker", "GitHub Actions", "Vercel", "Linux", "Postman", "DBeaver", t.aiTooling],
  },
  {
    number: "04",
    title: t.groups[3],
    skills: ["Tailwind CSS", "shadcn/ui", "UI/UX", t.accessibility, t.seo],
  },
  {
    number: "05",
    title: t.groups[4],
    skills: ["Jest", "Clean Code", "Design Patterns", "JWT", "OAuth 2.0", "Rate limiting", t.apiSecurity],
  },
]

export function TechMarquee() {
  const reduceMotion = useReducedMotion()
  const { t } = useLanguage()
  const skillGroups = getSkillGroups(t.skills)

  return (
    <section className="relative px-8 py-24 md:px-12 md:py-32" aria-labelledby="skills-title">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16"
      >
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">{t.skills.eyebrow}</p>
        <h2 id="skills-title" className="font-sans text-3xl font-light italic md:text-5xl">
          {t.skills.title}
        </h2>
      </motion.div>

      <div className="border-t border-white/10">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.number}
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
