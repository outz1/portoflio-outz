"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useLanguage } from "./language-provider"

export function About() {
  const reduceMotion = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section id="about" className="relative px-6 py-24 md:px-12 md:py-36">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <h2 className="text-balance font-display text-4xl font-normal leading-tight md:col-span-4 md:text-5xl">
          {t.about.title}
        </h2>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-6 md:col-span-7 md:col-start-6"
        >
          <p className="text-pretty text-2xl leading-snug text-foreground md:text-3xl">{t.about.lead}</p>
          <p className="max-w-[65ch] text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.about.body}
          </p>
        </motion.div>
      </div>

      <div className="mt-24 grid gap-6 md:mt-32 md:grid-cols-12 md:gap-12">
        <h3 className="font-mono text-sm text-accent md:col-span-4">{t.about.activitiesTitle}</h3>
        <dl className="divide-y divide-border border-y border-border md:col-span-7 md:col-start-6">
          {t.about.activities.map((activity) => (
            <div
              key={activity.title}
              className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8"
            >
              <dt className="font-display text-2xl">{activity.title}</dt>
              <dd className="text-pretty text-base leading-relaxed text-muted-foreground">{activity.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
