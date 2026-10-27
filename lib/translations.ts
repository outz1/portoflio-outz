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
  // Fato mais forte do projeto, mostrado em destaque acima da descrição
  highlight: Record<Language, string>
  description: Record<Language, string>
}

export const projects: Project[] = [
  {
    title: "ELO Júnior",
    tags: { pt: ["Full Stack", "Automação", "Liderança"], en: ["Full Stack", "Automation", "Leadership"] },
    // TODO(content): foto de banco de imagens; trocar por um print de algo entregue na ELO
    image: "/const/elo.webp",
    year: "2025",
    type: "experience",
    highlight: { pt: "Liderei uma equipe de 5 pessoas", en: "Led a team of 5 people" },
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
    highlight: { pt: "No ar para um cliente real", en: "Live for a real client" },
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
    highlight: { pt: "Cada número conferido antes do envio", en: "Every number checked before it is sent" },
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
    highlight: { pt: "50 pessoas no ranking ao mesmo tempo", en: "50 people on the leaderboard at once" },
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
      closeMenu: "Fechar menu",
      switchLanguage: "Switch to English",
      skipToContent: "Pular para o conteúdo",
      backToTop: "Voltar ao topo",
    },
    hero: {
      role: "Full Stack Developer · Segurança de aplicações",
      lead: "Construo aplicações web da interface à API e testo a segurança delas do lado de quem ataca.",
      viewProjects: "Ver projetos",
      resume: "Currículo (PDF)",
      resumeLabel: "Baixar currículo em PDF",
    },
    about: {
      title: "Entre produto, código e segurança",
      lead: "Sou desenvolvedor Full Stack com experiência na construção de aplicações web, APIs e automações, conectando decisões técnicas às necessidades reais de cada produto.",
      body: "Minha trajetória inclui desenvolvimento, liderança técnica e colaboração em equipe. Atualmente aprofundo meus estudos em arquitetura e segurança de aplicações para criar sistemas mais confiáveis, performáticos e fáceis de manter.",
      activitiesTitle: "Além do trabalho",
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
      title: "Experiência e projetos",
      groups: { experience: "Experiência", project: "Projetos pessoais" },
      opensInNewTab: "abre em nova aba",
      inProgress: "Em andamento",
    },
    skills: {
      title: "Tecnologias e ferramentas",
      groups: ["Principal", "Backend & dados", "Ferramentas", "Produto & interface", "Qualidade & segurança"],
      aiTooling: "IA para desenvolvimento",
      seo: "SEO técnico",
      accessibility: "Acessibilidade",
      llm: "Agentes de IA (LLM)",
      apiSecurity: "Segurança de APIs",
    },
    footer: {
      ctaStart: "Vamos",
      ctaEmphasis: "colaborar",
      emailCopied: "e-mail copiado",
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
      closeMenu: "Close menu",
      switchLanguage: "Mudar para português",
      skipToContent: "Skip to content",
      backToTop: "Back to top",
    },
    hero: {
      role: "Full Stack Developer · Application security",
      lead: "I build web applications from interface to API, then test their security from the attacker's side.",
      viewProjects: "View projects",
      resume: "Resume (PDF)",
      resumeLabel: "Download resume as PDF",
    },
    about: {
      title: "Between product, code and security",
      lead: "I'm a Full Stack developer experienced in building web applications, APIs and automations, connecting technical decisions to the real needs of each product.",
      body: "My path includes development, technical leadership and teamwork. I'm currently deepening my studies in software architecture and application security to build systems that are more reliable, performant and easy to maintain.",
      activitiesTitle: "Beyond work",
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
      title: "Experience and projects",
      groups: { experience: "Experience", project: "Personal projects" },
      opensInNewTab: "opens in a new tab",
      inProgress: "In progress",
    },
    skills: {
      title: "Technologies and tools",
      groups: ["Core", "Backend & data", "Tools", "Product & interface", "Quality & security"],
      aiTooling: "AI-assisted development",
      seo: "Technical SEO",
      accessibility: "Accessibility",
      llm: "AI agents (LLM)",
      apiSecurity: "API security",
    },
    footer: {
      ctaStart: "Let's",
      ctaEmphasis: "collaborate",
      emailCopied: "e-mail copied",
    },
  },
} satisfies Record<Language, unknown>

export type Dictionary = (typeof translations)["pt"]
