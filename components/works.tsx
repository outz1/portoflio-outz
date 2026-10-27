"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { projects, type Project } from "@/lib/translations"
import { useLanguage } from "./language-provider"

// Ainda sem link ou página própria; entram como lista até virarem projetos
const inProgress = ["INSIGNIA", "NewArch", "Braquiara"]

export function Works() {
  const { t } = useLanguage()
  const groups = (["experience", "project"] as const).map((type) => ({
    type,
    items: projects.filter((project) => project.type === type),
  }))

  return (
    <section id="works" className="relative px-6 py-24 md:px-12 md:py-32">
      <h2 className="text-balance font-display text-4xl font-normal md:text-6xl">{t.works.title}</h2>

      {groups.map((group) => (
        <div key={group.type} className="mt-16 md:mt-24">
          <h3 className="flex items-baseline gap-3 border-b border-border pb-4 font-mono text-sm text-accent">
            {t.works.groups[group.type]}
            <span className="text-muted-foreground tabular-nums">{group.items.length}</span>
          </h3>
          {group.items.map((project, index) => (
            <ProjectRow key={project.title} project={project} flip={index % 2 === 1} />
          ))}
        </div>
      ))}

      <p className="mt-16 text-base text-muted-foreground">
        {t.works.inProgress}: <span className="text-foreground">{inProgress.join(", ")}</span>
      </p>
    </section>
  )
}

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  const { language, t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const tags = Array.isArray(project.tags) ? project.tags : project.tags[language]

  // Experiências sem link: imagem e título ficam sem navegação.
  // A imagem repete o link do título, então sai da ordem de tabulação e do leitor de tela.
  const Wrapper = project.link ? "a" : "div"
  const linkProps = project.link
    ? {
        href: project.link,
        target: "_blank",
        rel: "noopener noreferrer",
        tabIndex: -1,
        "aria-hidden": true,
        "data-cursor-hover": true,
      }
    : {}

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="grid gap-6 border-b border-border py-10 md:grid-cols-12 md:items-center md:gap-12 md:py-14"
    >
      <Wrapper
        {...linkProps}
        className={`group relative block aspect-[16/10] overflow-hidden bg-surface md:col-span-6 ${
          flip ? "md:order-2 md:col-start-7" : ""
        }`}
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top grayscale-[35%] transition-[filter,scale] duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
        />
      </Wrapper>

      <div className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
        <p className="font-mono text-sm text-muted-foreground tabular-nums">{project.year}</p>
        <h4 className="mt-3 font-display text-4xl leading-none md:text-5xl">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group inline-flex items-start gap-2 transition-colors hover:text-accent"
            >
              {project.title}
              <ArrowUpRight aria-hidden="true" className="h-6 w-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only">({t.works.opensInNewTab})</span>
            </a>
          ) : (
            project.title
          )}
        </h4>
        <p className="mt-5 text-lg text-accent">{project.highlight[language]}</p>
        <p className="mt-3 max-w-[60ch] text-pretty text-base leading-relaxed text-muted-foreground">
          {project.description[language]}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}
