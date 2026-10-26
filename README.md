# [Portfolio - Eduardo](https://outzdev.me/)
Portfólio pessoal desenvolvido para apresentar projetos, habilidades e experiência como desenvolvedor.

https://outzdev.me/

## Sobre o projeto

Site pessoal construído com Next.js, focado em performance, animações fluidas e uma interface moderna. Landing page única, em português e inglês, com scroll suave e uma esfera 3D interativa.

## Tecnologias

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Animações:** Framer Motion, Lenis (scroll suave)
- **3D:** Three.js + React Three Fiber
- **Ícones:** Lucide
- **Idiomas:** português e inglês, com textos em `lib/translations.ts`
- **Analytics:** Vercel Analytics
- **Qualidade:** ESLint, TypeScript estrito no build e CI no GitHub Actions
- **Gerenciador de pacotes:** pnpm

##  Estrutura do projeto

```
├── app/          # Página, metadados, imagem de prévia social e estilos globais
├── components/   # Seções da landing page
├── lib/          # Traduções, dados dos projetos e utilitários
└── public/       # Imagens, currículo em PDF e ícones
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

Abra http://localhost:3000 no navegador para visualizar.

##  Scripts disponíveis

| Comando       | Descrição                          |
|---------------|-------------------------------------|
| `pnpm dev`    | Inicia o servidor de desenvolvimento |
| `pnpm build`  | Gera a build de produção            |
| `pnpm start`  | Inicia o servidor em modo produção  |
| `pnpm lint`   | Executa o linter                    |
| `pnpm typecheck` | Confere os tipos do TypeScript   |


##  Licença

Este projeto está disponível para fins de portfólio pessoal.