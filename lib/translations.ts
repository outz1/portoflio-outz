export type Language = "pt" | "en"

// Caminho do currículo em PDF dentro de /public
export const RESUME_URL = "/curriculo.pdf"

type ProjectType = "experience" | "project"

export type Project = {
  title: string
  tags: string[] | Record<Language, string[]>
  image: string
  year: string
  type: ProjectType
  link?: string
  description: Record<Language, string>
}

export const projects: Project[] = [
  {
    title: "ELO Júnior",
    tags: { pt: ["Full Stack", "Automação", "Liderança"], en: ["Full Stack", "Automation", "Leadership"] },
    image: "/const/elo.webp",
    year: "2025",
    type: "experience",
    description: {
      pt: "Liderei uma equipe de 5 pessoas na área de desenvolvimento da empresa júnior, coordenando demandas e entregas para clientes reais. Desenvolvi interfaces responsivas com React, Next.js e TypeScript a partir de protótipos de design e implementei automações e integrações entre sistemas, com deploy contínuo na Vercel.",
      en: "Led a team of 5 people in the junior enterprise's development area, coordinating requests and deliveries for real clients. Built responsive interfaces with React, Next.js and TypeScript from design prototypes and implemented automations and system integrations, with continuous deployment on Vercel.",
    },
  },
  {
    title: "Labex",
    tags: ["Next.js", "TypeScript", "Vercel"],
    image: "/const/labex.webp",
    year: "2025",
    type: "experience",
    link: "https://labex-website.vercel.app/",
    description: {
      pt: "Site institucional para um laboratório clínico, desenvolvido para cliente real a partir de protótipos de design. Componentes React reutilizáveis, layout responsivo, SEO técnico e otimização de performance, com Next.js e deploy na Vercel.",
      en: "Institutional website for a clinical laboratory, built for a real client from design prototypes. Reusable React components, responsive layout, technical SEO and performance optimization, with Next.js and deployment on Vercel.",
    },
  },
  {
    title: "Omnia",
    tags: { pt: ["NestJS", "IA", "WhatsApp"], en: ["NestJS", "AI", "WhatsApp"] },
    image: "/const/omnia.webp",
    year: "2026",
    type: "project",
    link: "https://github.com/insignia-corp/omnia",
    description: {
      pt: "Agente de IA que avisa o dono de mercadinho pelo WhatsApp o que importa no negócio: margem, reajuste de fornecedor, giro e produtos parados. Lê notas de compra com visão, calcula as métricas em funções determinísticas e um verificador confere cada número antes do envio. Desenvolvido em equipe com NestJS, PostgreSQL, Redis + BullMQ e Docker para o hackathon AKCIT Camp.",
      en: "AI agent that tells small grocery store owners on WhatsApp what matters in their business: margins, supplier price increases, turnover and stalled products. It reads purchase receipts with vision, computes metrics in deterministic functions, and a verifier checks every number before sending. Built as a team with NestJS, PostgreSQL, Redis + BullMQ and Docker for the AKCIT Camp hackathon.",
    },
  },
  {
    title: "Evento Gamificado",
    tags: ["Next.js", "TypeScript", "Redis"],
    image: "/const/inf.webp",
    year: "2026",
    type: "project",
    link: "https://github.com/outz1/Projeto-CS",
    description: {
      pt: "Plataforma gamificada para um evento da UFG, com ranking em tempo real que atendeu 50 pessoas simultaneamente. A API de pontuação é protegida por tokens de sessão, rate limiting em várias camadas e detecção de anomalias com Redis. Feito com Next.js, TypeScript e Upstash Redis, com entrega contínua na Vercel.",
      en: "Gamified platform for a UFG event, with a real-time leaderboard that served 50 people simultaneously. The scoring API is protected by session tokens, multi-layer rate limiting and anomaly detection with Redis. Built with Next.js, TypeScript and Upstash Redis, with continuous delivery on Vercel.",
    },
  },
]

export const translations = {
  pt: {
    nav: {
      links: [
        { label: "Sobre", href: "#about" },
        { label: "Portfólio", href: "#works" },
        { label: "Contato", href: "#contact" },
      ],
      status: "disponível",
      toggleMenu: "Abrir menu",
      switchLanguage: "Switch to English",
    },
    hero: {
      title: "Full Stack Developer",
      subtitle: "com foco em software seguro.",
      intro:
        "Desenvolvo aplicações web completas, da interface à API, com foco em arquitetura, performance e segurança.",
      viewProjects: "VER PROJETOS",
      resume: "CURRÍCULO",
      resumeLabel: "Baixar currículo em PDF",
      copyEmail: "COPIAR E-MAIL",
      emailCopied: "E-MAIL COPIADO",
      copyEmailLabel: "Copiar endereço de e-mail",
    },
    about: {
      eyebrow: "sobre",
      title: "ENTRE PRODUTO, CÓDIGO E SEGURANÇA",
      lead: "Sou desenvolvedor Full Stack com experiência na construção de aplicações web, APIs e automações, conectando decisões técnicas às necessidades reais de cada produto.",
      body: "Minha trajetória inclui desenvolvimento, liderança técnica e colaboração em equipe. Atualmente aprofundo meus estudos em arquitetura e segurança de aplicações para criar sistemas mais confiáveis, performáticos e fáceis de manter.",
      principles: [
        "Problemas bem entendidos.",
        "Interfaces que impactam.",
        "Arquitetura sustentável.",
        "Segurança desde o início.",
      ],
      activitiesTitle: "ALÉM DO TRABALHO",
      activities: [
        {
          title: "Bug bounty",
          description:
            "Pesquisador em programa privado de bug bounty na Bugcrowd, com foco em segurança de APIs, OAuth 2.0 e agentes de IA (MCP).",
        },
        {
          title: "Hackathons",
          description:
            "Participo de hackathons para tirar ideias do papel em pouco tempo e em equipe. O Omnia nasceu no hackathon AKCIT Camp.",
        },
      ],
    },
    works: {
      eyebrow: "alguns pontos da minha trajetória",
      title: "EXPERIÊNCIAS E PROJETOS PESSOAIS",
      types: { experience: "Experiência", project: "Projeto" },
    },
    skills: {
      eyebrow: "competências",
      title: "TECNOLOGIAS & FERRAMENTAS",
      groups: ["Principal", "Backend & dados", "Ferramentas", "Produto & interface", "Qualidade & segurança"],
      aiTooling: "IA para desenvolvimento",
      seo: "SEO técnico",
      accessibility: "Acessibilidade",
      llm: "Agentes de IA (LLM)",
      apiSecurity: "Segurança de APIs",
    },
    upcoming: {
      eyebrow: "em construção",
      title: "PRÓXIMOS PROJETOS",
      descriptions: [
        "Construindo objetivos por meio de código.",
        "Um novo tempo para construção e arquitetura.",
        "Experiências gamificadas na vida real.",
      ],
    },
    footer: {
      ctaStart: "Vamos",
      ctaEmphasis: "colaborar",
      localTime: "BRASIL",
    },
  },
  en: {
    nav: {
      links: [
        { label: "About", href: "#about" },
        { label: "Work", href: "#works" },
        { label: "Contact", href: "#contact" },
      ],
      status: "available",
      toggleMenu: "Open menu",
      switchLanguage: "Mudar para português",
    },
    hero: {
      title: "Full Stack Developer",
      subtitle: "focused on secure software.",
      intro:
        "I build complete web applications, from interface to API, with a focus on architecture, performance and security.",
      viewProjects: "VIEW PROJECTS",
      resume: "RESUME",
      resumeLabel: "Download resume as PDF",
      copyEmail: "COPY E-MAIL",
      emailCopied: "E-MAIL COPIED",
      copyEmailLabel: "Copy e-mail address",
    },
    about: {
      eyebrow: "about",
      title: "BETWEEN PRODUCT, CODE AND SECURITY",
      lead: "I'm a Full Stack developer experienced in building web applications, APIs and automations, connecting technical decisions to the real needs of each product.",
      body: "My path includes development, technical leadership and teamwork. I'm currently deepening my studies in software architecture and application security to build systems that are more reliable, performant and easy to maintain.",
      principles: [
        "Well-understood problems.",
        "Interfaces that matter.",
        "Sustainable architecture.",
        "Security from day one.",
      ],
      activitiesTitle: "BEYOND WORK",
      activities: [
        {
          title: "Bug bounty",
          description:
            "Researcher in a private bug bounty program on Bugcrowd, focused on API security, OAuth 2.0 and AI agents (MCP).",
        },
        {
          title: "Hackathons",
          description:
            "I take part in hackathons to turn ideas into working products fast and as a team. Omnia was born at the AKCIT Camp hackathon.",
        },
      ],
    },
    works: {
      eyebrow: "highlights from my journey",
      title: "EXPERIENCE AND PERSONAL PROJECTS",
      types: { experience: "Experience", project: "Project" },
    },
    skills: {
      eyebrow: "skills",
      title: "TECHNOLOGIES & TOOLS",
      groups: ["Core", "Backend & data", "Tools", "Product & interface", "Quality & security"],
      aiTooling: "AI-assisted development",
      seo: "Technical SEO",
      accessibility: "Accessibility",
      llm: "AI agents (LLM)",
      apiSecurity: "API security",
    },
    upcoming: {
      eyebrow: "in progress",
      title: "UPCOMING PROJECTS",
      descriptions: [
        "Constructing objectives via code.",
        "New time for building and architecture.",
        "Real-life gamified experiences.",
      ],
    },
    footer: {
      ctaStart: "Let's",
      ctaEmphasis: "collaborate",
      localTime: "BRAZIL",
    },
  },
} satisfies Record<Language, unknown>

export type Dictionary = (typeof translations)["pt"]
