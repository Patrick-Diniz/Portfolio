# Redesign 2026 — "Automatizando o tédio"

Data: 2026-08-15
Origem: `design_handoff_portfolio_2026/` (export do Claude Design, opção 1b aprovada)
Status: design aprovado, pronto para plano de implementação

---

## 1. Objetivo

Substituir o portfólio atual — dark azulado, cards com vidro e gradiente, seções
que listam tecnologias — pelo redesign editorial aprovado: fundo preto quente,
um único acento violeta, tipografia display gigante, linhas hairline no lugar de
cards, e projetos contados como casos (Problema → Solução → Resultado).

Publicar em produção em `patrickdiniz.com.br`.

### Goals falsificáveis

1. Os 8 blocos do design (Preloader, Nav, Hero, Marquee, Trabalhos, Sobre,
   Manifesto, Contato) renderizam em produção, na ordem especificada.
2. A varredura de texto invisível no DOM da página em produção retorna `0`.
   A varredura percorre todo `body *`, considera apenas elementos com nó de
   texto próprio e altura maior que zero, e acusa os que têm
   `color: rgba(0,0,0,0)` sem `background-image` — foi o que expôs o bug do
   nome invisível na PR #29.
3. Nenhum texto visível contém `[` ou `]` (nenhum placeholder publicado).
4. Nenhuma referência sobrevive a `glass-card`, `project-card`, `skill-tag`,
   `hero-text`, `Skills`, `Projects`, `Footer`, `ScrollToTop`.
5. `framer-motion` não aparece no bundle de produção.
6. Em `≤900px`, os 3 casos são acessíveis por toque.
7. Com `prefers-reduced-motion: reduce`, o conteúdo aparece imediatamente — sem
   janela de página em branco.
8. `type-check`, `lint`, `test` e `build` passam; CI verde.

### Não-goals

- Não mexer em CI, deploy, cabeçalhos de segurança ou `vercel.json`.
- Não adicionar biblioteca nova. O design usa CSS keyframes e um
  `IntersectionObserver`.
- Não criar rota nova. O site continua sendo uma página de âncoras.
- Não implementar scroll-spy na nav (decidido: fiel à spec).
- Não migrar para Tailwind 4 (PR #25 foi fechada por isso).

---

## 2. Arquitetura

Página única de âncoras. Sem data fetching, sem formulário, sem estado global.

```
Index.tsx
  useReveal()            um IntersectionObserver para toda a página
  <Preloader/>           overlay; roda uma vez por sessão
  <Navigation/>          fixa
  <Hero/>       #topo
  <Marquee/>
  <Works/>      #trabalhos   consome cases[]
  <About/>      #sobre        consome experiences[], education[], stackGroups[], loves[]
  <Manifesto/>
  <Contact/>    #contato      consome contactLinks[]
```

### Fronteiras

`src/lib/portfolio-data.ts` é a fonte única de conteúdo. Nenhum componente
carrega texto de negócio próprio: trocar um projeto, um link ou um período é
mexer num arquivo só.

Cada seção é independente e só depende de `portfolio-data`. Os únicos elementos
compartilhados são `SectionHeading` (usado por Trabalhos e Sobre) e o subcomponente
`Field` interno de `Works`. `Works` pode ser trocado inteiro sem tocar em `About`.

### Mapa de arquivos

| Ação | Arquivos |
|---|---|
| Novos | `components/Preloader.tsx` `Marquee.tsx` `Works.tsx` `Manifesto.tsx` `SectionHeading.tsx` · `hooks/useReveal.ts` · `lib/portfolio-data.ts` · `assets/patrick-sticker.png` · `public/fonts/*.woff2` |
| Substituídos | `index.css` · `pages/Index.tsx` · `components/Navigation.tsx` `Hero.tsx` `About.tsx` `Contact.tsx` · `tailwind.config.ts` (aditivo) · `index.html` |
| Removidos | `components/Skills.tsx` `Projects.tsx` `Footer.tsx` `ScrollToTop.tsx` · `components/ui/*` órfãos · `hooks/use-toast.ts` `use-mobile.tsx` (+ teste) · `framer-motion` do `package.json` e do `manualChunks` |

---

## 3. Fundação visual

### Fontes — self-hosted

Mantém `font-src 'self'` no CSP intacto. Os `<link>` do Google Fonts do handoff
não entram.

| Família | Arquivo em `public/fonts/` | Cobre | Uso |
|---|---|---|---|
| Archivo | `archivo-variable.woff2` | 400–900 (fonte variável) | display + corpo |
| Instrument Serif | `instrument-serif-italic.woff2` | itálico 400 | frases de respiro |
| JetBrains Mono | `jetbrains-mono.woff2` | 400 | metadados, numeração, labels |

Verificado no código de referência: Archivo usa 400/600/700/800/900;
Instrument Serif é sempre itálico; JetBrains Mono nunca tem itálico nem peso
declarado. Subset `latin` + `latin-ext` (acentuação do português).
`@font-face` com `font-display: swap`. `<link rel="preload">` apenas para o
Archivo, que pinta o hero.

Origem do download: `fonts.gstatic.com`, autorizado pelo usuário.

### Tokens

`:root` do `index.css` é substituído:

| Token | Valor | Hex |
|---|---|---|
| `--background` | `36 16% 6%` | `#12100d` |
| `--background-secondary` | `30 18% 4%` | `#0d0b09` |
| `--foreground` | `42 28% 93%` | `#f2efe8` |
| `--primary` | `259 100% 71%` | `#9a6bff` |
| `--radius` | `0.25rem` | — |

Linhas hairline: `--rule: rgba(242,239,232,.12)` e `--rule-strong: rgba(242,239,232,.15)`.

As classes `@layer components` antigas (`glass-card`, `hero-text`, `skill-tag`,
`project-card`, `section-padding`, `container-width`) são removidas. Nenhuma é
usada no design novo; confirmar por grep antes de apagar.

### Tailwind

Somente aditivo em `theme.extend`, preservando todo o mapa shadcn existente
(senão os tokens HSL quebram):

- `fontFamily`: `display`/`sans` → Archivo, `serif` → Instrument Serif,
  `mono` → JetBrains Mono
- `colors`: `ink` `#f2efe8`, `void` `#12100d`, `void.deep` `#0d0b09`,
  `violet` `#9a6bff`

### Keyframes

Os 10 keyframes (`marqueeX`, `heroLine`, `fadeUp`, `floatY2`, `blinkDot`,
`spinSlow`, `scrollNudge`, `preTedioSeq`, `preStrikeSeq`, `preAutoSeq`) vivem no
`index.css` global, não em `theme.extend.keyframes`, porque os componentes os
aplicam via `style={{ animation }}` para manter os delays da sequência legíveis.

---

## 4. Correções sobre o código de referência

O `code/` do handoff entra como ponto de partida, com três defeitos corrigidos.

### 4.1 `useReveal` esconde conteúdo por padrão

O hook seta `opacity: 0` inline em todo `[data-reveal]` e só devolve quando o
`IntersectionObserver` dispara. Se o observer não existir, não disparar ou o
elemento nunca cruzar o limiar, o conteúdo fica invisível permanentemente.

É a mesma classe de defeito do bug corrigido em `Hero.tsx` na PR #29, onde o
nome "Patrick Diniz" não renderizava em produção.

Três defesas:

1. Só esconde se `IntersectionObserver` existir **e**
   `prefers-reduced-motion` for `no-preference`.
2. Com movimento reduzido, nada é escondido — o conteúdo entra visível.
3. Rede de segurança: um timer revela qualquer `[data-reveal]` ainda escondido
   3 segundos após a montagem.

### 4.2 Delay órfão quando o preloader não roda

A cadeia de entrada do hero usa `animation-delay` de 2.45s a 3.2s, calibrada
para o preloader. Se o preloader é pulado (uma vez por sessão) ou o usuário tem
movimento reduzido, a página fica ~2,5s em branco: a regra
`prefers-reduced-motion` do handoff zera a *duração* das animações, nunca o
*delay*.

Solução: os delays passam a ser `calc(var(--seq) * Xs)`. `--seq: 1` na primeira
visita da sessão; `--seq: 0` quando o preloader é pulado ou o movimento é
reduzido. Uma variável governa a sequência inteira.

Mecanismo explícito: `--seq: 1` é o valor padrão declarado no `:root` do
`index.css`. O `Preloader` decide no primeiro efeito de montagem — antes de
pintar, via `useLayoutEffect`, para não haver um quadro com o valor errado — e
grava `document.documentElement.style.setProperty("--seq", "0")` quando
`sessionStorage` já registra a visita ou quando
`matchMedia("(prefers-reduced-motion: reduce)")` casa. A chave de sessão é
`pd-preloader-seen`.

### 4.3 `Works` só responde a mouse

`onMouseEnter` não existe em toque. No mobile, apenas o caso de índice 0 fica
aberto — 2 dos 3 projetos ficam inacessíveis para quem abre pelo celular.

Ganha `onClick`, `role="button"`, `aria-expanded` e `onKeyDown` (Enter e
Espaço). O painel fechado sai da árvore de acessibilidade: hoje `max-height: 0`
mantém o texto focável por leitor de tela.

Mecanismo explícito: `display: none` não pode ser usado porque quebraria a
transição de `max-height`. O painel fechado recebe `visibility: hidden` — que
remove da ordem de tabulação e da árvore de acessibilidade, e ainda transiciona
— com `transition-delay` igual à duração do fechamento para a saída não cortar a
animação. `aria-hidden` acompanha o mesmo estado.

### 4.4 Conteúdo e limpeza

- Os `[métrica real aqui]` são cortados, restando apenas a parte qualitativa
  verdadeira de cada RESULTADO.
- `framer-motion` sai do `package.json` e do `manualChunks` do `vite.config.ts`
  (~131KB, 43KB gzip).
- Componentes shadcn órfãos, `hooks/use-toast.ts`, `hooks/use-mobile.tsx` e os
  `Toaster`/`Sonner`/`TooltipProvider` de `App.tsx` são removidos.
- `index.html`: title, description, `og:title` e `og:description` passam para a
  copy do redesign. `og-image.png` é regenerado na paleta nova.
- `overflow-x: clip` no body permanece (checklist de aceite do handoff).

---

## 5. Tratamento de erro

A página não busca dado nem tem formulário: não há estado de erro de runtime.
O risco real é ativo que não carrega.

| Ativo | Degradação |
|---|---|
| Fonte | `font-display: swap` cai em `system-ui` / Georgia / `ui-monospace` |
| `patrick-sticker.png` | `<img>` com `alt="Patrick Diniz"` |
| Preview do caso | `background-image` num elemento com `role="img"` e `aria-label`; degrada para retângulo vazio sem quebrar o layout |

---

## 6. Testes

### Sobrevivem
`App.test.tsx` (mocka as páginas, não conhece o design), `NotFound.test.tsx`.

### Substituído
`Hero.test.tsx` — trava o bug antigo (`hero-text` + spans por letra). O hero novo
não tem nem um nem outro. É reescrito para o hero novo, não deletado.

### Removido
`use-mobile.test.tsx`, junto com o hook órfão.

### Novos

| Teste | Trava |
|---|---|
| `useReveal` | com movimento reduzido ou sem `IntersectionObserver`, nada é escondido; a rede de 3s revela o que ficou preso |
| `Works` | clique e Enter abrem o caso; `aria-expanded` acompanha; painel fechado fora da árvore de acessibilidade |
| `Preloader` | segunda montagem na mesma sessão pula; ao pular, `--seq` vai a `0` |
| `Index` | as 4 âncoras existem e os 8 blocos renderizam |
| `portfolio-data` | nenhum texto contém `[` ou `]` |

---

## 7. Verificação

Teste verde não é site no ar.

1. `npm run type-check`, `lint`, `test`, `build`.
2. `vite preview` no navegador, sem depender do Vercel, em 1280×800, 1440×900 e
   375×812. Percorrer o checklist de aceite do handoff: preloader chega a 100% e
   sobe sem travar o scroll; hero não corta título nem figura; marquee sem salto
   no loop; caso abre e troca o preview; âncoras param no lugar
   (`scroll-margin-top`); links de contato deslocam 24px; em ≤900px nada estoura
   a largura; `prefers-reduced-motion` desliga as animações.
3. Varredura de texto invisível no DOM — precisa retornar `0`.
4. Grep provando ausência de `glass-card`, `project-card`, `skill-tag`,
   `hero-text`, `Skills`, `Projects`, `Footer`, `ScrollToTop`.
5. Após o merge: a mesma bateria em produção, mais console sem erro e
   `/robots.txt`, `/sitemap.xml`, `/og-image.png` e os cabeçalhos intactos.

---

## 8. Rollout

Uma PR única, com commits pequenos por seção, trabalhada em worktree isolado:

```
fundação (fontes, tokens, tailwind, keyframes)
  → dados e limpeza de conteúdo
  → Preloader + useReveal + --seq
  → Navigation
  → Hero
  → Marquee
  → Works
  → About
  → Manifesto
  → Contact
  → remoção do que morreu
  → metadata e OG
```

Rejeitadas: rota paralela `/2026` (a paleta é global em `:root`; conviver exige
escopar todos os tokens e duplicar o Tailwind) e três PRs sequenciais (a PR de
fundação sozinha quebra produção, trocando os tokens debaixo dos componentes
antigos).

Após CI verde e aprovação do usuário: merge e verificação em produção.
Reversível com um `git revert` do commit de squash.
