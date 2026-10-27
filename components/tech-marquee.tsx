"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { Dictionary } from "@/lib/translations"
import { useLanguage } from "./language-provider"

const getSkillGroups = (t: Dictionary["skills"]) => [
  {
    title: t.groups[0],
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python"],
  },
  {
    title: t.groups[1],
    skills: ["NestJS", "Express", "REST APIs", "PostgreSQL", "MySQL", "Redis", "BullMQ", "Swagger/OpenAPI", t.llm],
  },
  {
    title: t.groups[2],
    skills: ["Git", "Gitflow", "Docker", "GitHub Actions", "Vercel", "Linux", "Postman", "DBeaver", t.aiTooling],
  },
  {
    title: t.groups[3],
    skills: ["Tailwind CSS", "shadcn/ui", "UI/UX", t.accessibility, t.seo],
  },
  {
    title: t.groups[4],
    skills: ["Jest", "Clean Code", "Design Patterns", "JWT", "OAuth 2.0", "Rate limiting", t.apiSecurity],
  },
]

export function TechMarquee() {
  const reduceMotion = useReducedMotion()
  const { t } = useLanguage()
  const skillGroups = getSkillGroups(t.skills)

  return (
    <section className="relative px-6 py-20 md:px-12 md:py-24" aria-labelledby="skills-title">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <h2 id="skills-title" className="text-balance font-display text-4xl font-normal leading-tight md:col-span-4 md:text-5xl">
          {t.skills.title}
        </h2>

        <dl className="divide-y divide-border border-y border-border md:col-span-7 md:col-start-6">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.3, delay: Math.min(index, 2) * 0.05, ease: "easeOut" }}
              className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8"
            >
              <dt className="text-base font-medium">{group.title}</dt>
              <dd className="text-pretty text-base leading-relaxed text-muted-foreground">{group.skills.join(" · ")}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
