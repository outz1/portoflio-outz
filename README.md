# [Portfolio - Eduardo](https://outzdev.me/)
Portfólio pessoal desenvolvido para apresentar projetos, habilidades e experiência como desenvolvedor.

https://outzdev.me/

## Sobre o projeto

Site pessoal construído com Next.js, focado em performance, animações fluidas e uma interface moderna. Utiliza componentes acessíveis baseados em Radix UI/shadcn, scroll suave e elementos 3D interativos.

## Tecnologias

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Linguagem:** TypeScript
- **UI/Componentes:** Radix UI, shadcn/ui, Lucide Icons
- **Estilização:** Tailwind CSS v4
- **Animações:** Framer Motion, Lenis (smooth scroll)
- **3D:** Three.js + React Three Fiber
- **Formulários:** React Hook Form + Zod
- **Gráficos:** Recharts
- **Analytics:** Vercel Analytics
- **Gerenciador de pacotes:** pnpm

##  Estrutura do projeto

```
├── app/          # Rotas e páginas (App Router)
├── components/   # Componentes reutilizáveis da UI
├── hooks/        # Hooks customizados
├── lib/          # Funções utilitárias e configurações
├── public/       # Arquivos estáticos (imagens, ícones, etc.)
└── styles/       # Estilos globais
```

##  Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/outz1/portoflio-outz.git

# Acesse a pasta do projeto
cd portoflio-outz

# Instale as dependências
pnpm install

# Rode o servidor de desenvolvimento
pnpm dev
```

Abra [http://localhost:3001] no navegador para visualizar.

##  Scripts disponíveis

| Comando       | Descrição                          |
|---------------|-------------------------------------|
| `pnpm dev`    | Inicia o servidor de desenvolvimento |
| `pnpm build`  | Gera a build de produção            |
| `pnpm start`  | Inicia o servidor em modo produção  |
| `pnpm lint`   | Executa o linter                    |


##  Licença

Este projeto está disponível para fins de portfólio pessoal.