# DESIGN.md: outz.dev

> Brief de design do portfólio. Seções 1 e 2 são a verdade do produto; 3 a 12 são o sistema visual.
> Ordem de leitura: tokens em `app/global.css` → este arquivo → padrões da skill antiwebslop.

## 1. Verdade do produto
- **Quem visita:** recrutadores e clientes técnicos, no desktop durante uma triagem ou no celular a partir de um link do LinkedIn.
- **Propósito:** mostrar quem é Eduardo de Brito, o que ele já entregou e como falar com ele.
- **Restrições:** bilíngue (PT padrão, EN), a esfera 3D do hero é a marca do site, deve respeitar `prefers-reduced-motion`.
- **Sucesso:** o visitante abre um projeto ou o currículo, ou copia o e-mail.
- **Conteúdo real:** prints em `public/const/` (Labex, Omnia, Evento Gamificado), currículo em `public/curriculo.pdf`. A imagem da ELO é foto de banco de imagens (`TODO(content)` em `lib/translations.ts`).

## 2. Leitura de design
Portfólio para recrutadores e clientes técnicos, superfície **showcase**, linguagem editorial escura com um acento laranja, em Next.js + Tailwind 4.

| Superfície | Tipo | V | M | D |
|---|---|---|---|---|
| Página única | showcase | 7 | 5 | 3 |

## 3. Direção visual e proibições
- O trabalho lidera: cada projeto mostra o print sempre visível, um fato em destaque e a descrição.
- Cada seção tem um layout próprio: hero ancorado embaixo à esquerda, Sobre em divisão 4/7, projetos alternando lado da imagem, skills em lista densa.
- Títulos em sentença (não caixa alta), peso normal, sem itálico. O único itálico do site é a palavra de ênfase do CTA do rodapé.
- Proibido: rótulo pequeno acima de título (eyebrow), numeração decorativa (01, 02, 03), relógio ou indicadores que se mexem sem motivo, pills em excesso, glassmorphism.

## 4. Tokens de cor

```design-tokens
fonts: Playfair Display, Geist, Geist Mono
colors: #050505, #0e0e0e, #f2f2f0, #a3a3a3, #262626, #ff5f1f
radii: 0, 9999px
```

| Token | Valor | Função |
|---|---|---|
| `--background` | #050505 | fundo da página |
| `--surface` | #0e0e0e | fundo de imagens enquanto carregam |
| `--foreground` | #f2f2f0 | texto principal |
| `--muted-foreground` | #a3a3a3 | texto secundário (8:1 sobre o fundo) |
| `--border` | #262626 | linhas divisórias |
| `--accent` | #ff5f1f | ação principal, destaque de cada projeto, foco do teclado |
| `--accent-foreground` | #050505 | texto sobre o acento |

Nada de hex solto nos componentes: use as classes `bg-accent`, `text-muted-foreground`, `border-border` etc.

## 5. Tipografia
- Display: a fonte Playfair Display, peso 400. Por quê: dá o tom editorial e é a voz do site desde a primeira versão.
- Texto: a fonte Geist, 400 e 500. Corpo em 16 a 18px, `leading-relaxed`, até 65ch.
- Mono: a fonte Geist Mono, só para dados e rótulos curtos (ano, tags, cargo, nome dos grupos). Nunca parágrafo.
- Escala: 12 · 14 · 16 · 18 · 20 · 24 · 30 · 36 · 48 · 60 · 72 · 96 (escala do Tailwind). Hero até 96px.
- Títulos com `text-balance`, descrições com `text-pretty`.

## 6. Espaçamento e layout
- Escala de 4px do Tailwind. Margem lateral 24px no celular, 48px no desktop.
- Grid de 12 colunas no desktop; títulos de seção ocupam 4, conteúdo começa na coluna 6.
- Padding de seção varia por função: Sobre 144px (respira), Projetos 128px, Skills 96px (denso).

## 7. Componentes
- Raio 0 em tudo; 9999px só no ponto de "disponível" e no cursor customizado.
- Botão principal: fundo `--accent`. Secundário: link sublinhado. Um botão principal por tela.
- Listas (atividades, skills) usam `divide-y` com borda em cima e embaixo da lista, não em cada linha.

## 8. Movimento
- Entradas de seção: fade + 12 a 16px, 300 a 500ms, `easeOut`, uma vez.
- Assinatura: a esfera 3D do hero (pausa fora da tela) e a cortina laranja do CTA do rodapé.
- Tudo com `useReducedMotion` ou `motion-safe:`; o CSS global zera animações com movimento reduzido.

## 9. Imagens e conteúdo
- Prints reais dos projetos, em 16:10, cortados pelo topo, 35% em escala de cinza que some no hover.
- Voz: primeira pessoa, concreta, números reais (5 pessoas, 50 usuários simultâneos). Nada inventado.

## 10. Fazer / Não fazer
| Fazer | Não fazer |
|---|---|
| Destacar um fato real por projeto | Rótulo em caixa alta acima de cada título |
| Mono para ano, tags e cargo | Mono em parágrafo |
| Laranja só no que pede ação ou destaque | Laranja em numeração decorativa |

## 11. Registro de decisões

### 2026-10-27: Redesenho com a skill antiwebslop
- **Contexto:** todas as seções tinham a mesma forma (eyebrow + título itálico em caixa alta), texto corrido em mono e projetos só como texto, com imagem no hover.
- **Decisão:** tokens próprios no lugar do tema padrão do shadcn, fonte Geist para o corpo, nome como título do hero, projetos com print sempre visível e fato em destaque, seção "Próximos projetos" virou uma linha, relógio removido.
- **Por quê:** o visitante precisa ver o trabalho e quem é a pessoa nos primeiros segundos.
- **Não fazer:** voltar com eyebrows, numeração decorativa ou itálico em todos os títulos.
- **Superfícies:** página única.
- **Refs:** PR desta mudança.

## 12. Referências
- Site: https://outzdev.me
