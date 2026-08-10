"use client"

import { motion, useReducedMotion } from "framer-motion"

const principles = [
  "Problemas bem entendidos.",
  "Interfaces que impactam.",
  "Arquitetura sustentável.",
  "Segurança desde o início.",
]

export function About() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="about" className="relative overflow-hidden px-8 py-24 md:px-12 md:py-32">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">sobre</p>
        <h2 className="max-w-4xl font-sans text-3xl font-light italic md:text-5xl">
          ENTRE PRODUTO, CÓDIGO E SEGURANÇA
        </h2>
      </motion.div>

      <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[0.7fr_1.3fr] md:gap-20 md:pt-14">
        <p className="font-mono text-xs leading-relaxed tracking-[0.18em] text-[#FF5F1F]">
          FULL STACK DEVELOPMENT
          <br />
          &amp; APPLICATION SECURITY
        </p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-6"
        >
          <p className="max-w-3xl font-sans text-2xl font-light leading-snug text-white/90 md:text-4xl">
            Sou desenvolvedor Full Stack com experiência na construção de aplicações web,
            APIs e automações, conectando decisões técnicas às necessidades reais de cada produto.
          </p>
          <p className="max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
            Minha trajetória inclui desenvolvimento, liderança técnica e colaboração em equipe.
            Atualmente aprofundo meus estudos em arquitetura e segurança de aplicações para criar
            sistemas mais confiáveis, performáticos e fáceis de manter.
          </p>
        </motion.div>
      </div>

      <div className="mt-16 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((principle, index) => (
          <div key={principle} className="border-b border-r border-white/10 p-5 md:p-6">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
              0{index + 1}
            </span>
            <p className="mt-8 font-sans text-xl font-light italic text-white/80">{principle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
