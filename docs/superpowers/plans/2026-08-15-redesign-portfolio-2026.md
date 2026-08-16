# Redesign 2026 do Portfólio — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o portfólio atual pelo redesign editorial "Automatizando o tédio" e publicar em `patrickdiniz.com.br`.

**Architecture:** Página única de âncoras, sem rotas novas, sem data fetching, sem formulário. `src/lib/portfolio-data.ts` é a fonte única de conteúdo; cada seção é um componente que só lê de lá. Animações são CSS keyframes globais em `src/index.css`, aplicadas pelos componentes via `style={{ animation }}`, com os delays da sequência governados por uma variável CSS `--seq`.

**Tech Stack:** Vite 8, React 19, TypeScript 5.8, Tailwind 3.4, Vitest 4 + Testing Library, jsdom.

## Global Constraints

- Branch de trabalho: `redesign/portfolio-2026`. Uma PR só, commits pequenos por tarefa.
- **Não** adicionar nenhuma dependência nova. O design usa CSS keyframes e um `IntersectionObserver`.
- **Não** tocar em `vercel.json`, `.github/workflows/`, `public/.well-known/`, `public/robots.txt`, `public/sitemap.xml`.
- **Não** migrar para Tailwind 4. Continua Tailwind 3.4 com `tailwind.config.ts`.
- Todo `theme.extend` do Tailwind é **aditivo**: o mapa de cores shadcn existente (linhas 17–70 de `tailwind.config.ts`) permanece intacto, senão os tokens HSL quebram.
- Paleta fechada, quatro valores, nada além: `#12100d` (fundo), `#0d0b09` (faixas profundas), `#f2efe8` (tinta), `#9a6bff` (violeta).
- Linhas hairline sempre 1px: `rgba(242,239,232,.12)` para divisões de seção, `rgba(242,239,232,.15)` para linhas de lista.
- Nenhum texto visível pode conter `[` ou `]`. Os `[métrica real aqui]` do handoff são cortados, não publicados.
- Alias de import é `@/` → `src/`. Componentes em `src/components`, dados em `src/lib`, hooks em `src/hooks`.
- Código de referência em `design_handoff_portfolio_2026/code/` é **leitura**. A pasta está no `.gitignore` e não entra em commit nenhum.
- Rodar `npm run type-check && npm run lint && npm run test` antes de cada commit.

---

## Estrutura de arquivos

| Arquivo | Responsabilidade |
|---|---|
| `src/index.css` | `@font-face` das 3 famílias, tokens `:root` (inclui `--seq: 1`), reset de `body`, os 10 keyframes, regra `prefers-reduced-motion` |
| `tailwind.config.ts` | aditivo: `fontFamily` e as cores `ink`/`void`/`violet` |
| `src/lib/portfolio-data.ts` | conteúdo: casos, marquee, loves, experiências, educação, stack, links de contato, `CV_URL` |
| `src/hooks/useReveal.ts` | um `IntersectionObserver` para todo `[data-reveal]`, com as três defesas |
| `src/components/Preloader.tsx` | overlay de abertura; decide `--seq` e a chave de sessão |
| `src/components/SectionHeading.tsx` | número + título + palavra serifada; usado por Trabalhos e Sobre |
| `src/components/Marquee.tsx` | faixa de stack em rolagem infinita |
| `src/components/Navigation.tsx` | nav fixa com âncoras |
| `src/components/Hero.tsx` | título de duas linhas, frase, CTAs, figura fig. 01 |
| `src/components/Works.tsx` | lista de casos, painel expansível, preview sticky |
| `src/components/About.tsx` | statement, "E EU AMO", experiência, educação, stack |
| `src/components/Manifesto.tsx` | bloco central de tipografia cinética |
| `src/components/Contact.tsx` | "Vamos conversar?", 4 canais, barra final |
| `src/pages/Index.tsx` | monta a ordem e chama `useReveal()` |
| `public/fonts/*.woff2` | 3 arquivos self-hosted |
| `src/assets/patrick-sticker.png` | figura do hero e do manifesto |

---

## Task 1: Fundação — fontes, tokens, Tailwind, keyframes

**Files:**
- Create: `public/fonts/archivo-variable.woff2`, `public/fonts/instrument-serif-italic.woff2`, `public/fonts/jetbrains-mono.woff2`
- Create: `src/assets/patrick-sticker.png`
- Replace: `src/index.css`
- Modify: `tailwind.config.ts` (adicionar `fontFamily` e cores dentro de `theme.extend`)
- Modify: `index.html` (preload da fonte do hero)

**Interfaces:**
- Consumes: nada.
- Produces: classes utilitárias `font-display`, `font-sans`, `font-serif`, `font-mono`; cores `text-ink`, `bg-void`, `bg-void-deep`, `text-violet`; a variável CSS `--seq` (padrão `1`); os keyframes `marqueeX`, `heroLine`, `fadeUp`, `floatY2`, `blinkDot`, `spinSlow`, `scrollNudge`, `preTedioSeq`, `preStrikeSeq`, `preAutoSeq`.

- [ ] **Step 1: Baixar as 3 fontes**

O subset `latin` cobre `U+0000-00FF` (toda a acentuação do português) mais `↓` e `↑`. Não é preciso `latin-ext`.

```bash
cd /Users/patricksilvateixeiradiniz/Projetos/Portfolio
mkdir -p public/fonts
curl -sSfL -o public/fonts/archivo-variable.woff2 "https://fonts.gstatic.com/s/archivo/v25/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLydOxKsv4Rn.woff2"
curl -sSfL -o public/fonts/instrument-serif-italic.woff2 "https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7Motmp5g.woff2"
curl -sSfL -o public/fonts/jetbrains-mono.woff2 "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOVk6OThhvA.woff2"
```

- [ ] **Step 2: Verificar que os 3 arquivos são woff2 de verdade**

```bash
file public/fonts/*.woff2
ls -l public/fonts/
```

Esperado: as três linhas dizem `Web Open Font Format (Version 2)`. Se alguma disser `HTML document` ou `ASCII text`, o download falhou (o Google devolve HTML de erro com 200 para User-Agent desconhecido) — refaça com `-A` de um navegador moderno.

- [ ] **Step 3: Copiar o sticker**

```bash
cp design_handoff_portfolio_2026/code/src/assets/patrick-sticker.png src/assets/patrick-sticker.png
file src/assets/patrick-sticker.png
```

Esperado: `PNG image data, 600 x 600, 8-bit/color RGBA`.

- [ ] **Step 4: Substituir `src/index.css`**

O arquivo inteiro passa a ser:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ============================================================
   Patrick Diniz — Portfólio 2026
   "Automatizando o tédio" — editorial dark + violeta.
   ============================================================ */

/* Fontes self-hosted: mantêm `font-src 'self'` do CSP intacto.
   Subset latin — cobre toda a acentuação do português. */
@font-face {
  font-family: "Archivo";
  font-style: normal;
  font-weight: 400 900;
  font-display: swap;
  src: url("/fonts/archivo-variable.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
    U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122,
    U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: "Instrument Serif";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/instrument-serif-italic.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
    U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122,
    U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/jetbrains-mono.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
    U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122,
    U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@layer base {
  :root {
    /* Governa a cadeia de entrada do hero. 1 = com preloader,
       0 = entrada imediata. O Preloader grava 0 quando pula. */
    --seq: 1;

    --background: 36 16% 6%; /* #12100d */
    --background-secondary: 30 18% 4%; /* #0d0b09 */
    --foreground: 42 28% 93%; /* #f2efe8 */
    --foreground-muted: 42 12% 68%;

    --primary: 259 100% 71%; /* #9a6bff */
    --primary-dark: 259 80% 60%;
    --primary-light: 259 100% 82%;
    --primary-foreground: 36 16% 6%;

    --card: 30 18% 4%;
    --card-hover: 36 14% 9%;
    --card-foreground: 42 28% 93%;

    --accent: 259 100% 71%;
    --accent-foreground: 36 16% 6%;
    --secondary: 36 10% 14%;
    --secondary-foreground: 42 28% 93%;

    --muted: 36 10% 12%;
    --muted-foreground: 42 12% 62%;

    --border: 42 14% 20%;
    --input: 36 10% 12%;
    --ring: 259 100% 71%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 42 28% 93%;

    --popover: 30 18% 4%;
    --popover-foreground: 42 28% 93%;

    /* O visual novo é quadrado. Botões pill usam rounded-full local. */
    --radius: 0.25rem;

    --rule: rgba(242, 239, 232, 0.12);
    --rule-strong: rgba(242, 239, 232, 0.15);
  }

  * {
    @apply border-border;
  }

  body {
    margin: 0;
    background: #12100d;
    color: #f2efe8;
    font-family: "Archivo", system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
  }

  ::selection {
    background: #9a6bff;
    color: #12100d;
  }
}

/* ============================================================
   Keyframes globais. Os componentes aplicam via style={{ animation }}
   para manter os delays da sequência legíveis no ponto de uso.
   ============================================================ */

@keyframes marqueeX {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes heroLine {
  from { opacity: 0; transform: translateY(110%); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes floatY2 {
  0%, 100% { transform: rotate(-2deg) translateY(0); }
  50% { transform: rotate(-2deg) translateY(-10px); }
}
@keyframes blinkDot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}
@keyframes spinSlow {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}
@keyframes scrollNudge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
@keyframes preTedioSeq {
  0% { opacity: 0; transform: translateY(26px); }
  12% { opacity: 1; transform: translateY(0); }
  62% { opacity: 1; transform: translateY(0); }
  76% { opacity: 0; transform: translateY(-36px); }
  100% { opacity: 0; transform: translateY(-36px); }
}
@keyframes preStrikeSeq {
  0%, 28% { transform: scaleX(0); opacity: 1; }
  54% { transform: scaleX(1); opacity: 1; }
  64% { opacity: 1; }
  72% { opacity: 0; }
  100% { opacity: 0; transform: scaleX(1); }
}
@keyframes preAutoSeq {
  0%, 70% { transform: translateY(112%); opacity: 0; }
  76% { opacity: 1; }
  88% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
}

/* Movimento reduzido: zera duração E delay. A regra do handoff só zerava
   a duração, o que deixava a página em branco durante os 2,45s de delay. */
@media (prefers-reduced-motion: reduce) {
  :root {
    --seq: 0;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
  }
}
```

- [ ] **Step 5: Adicionar o aditivo ao `tailwind.config.ts`**

Dentro de `theme.extend`, logo **depois** do bloco `colors` existente que termina na linha 70 com `},`, e **sem remover nada dele**, inserir:

```ts
      fontFamily: {
        display: ["Archivo", "system-ui", "sans-serif"],
        sans: ["Archivo", "system-ui", "sans-serif"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
```

E dentro do bloco `colors` existente, junto às outras chaves (não substituindo nenhuma), acrescentar:

```ts
        ink: "#f2efe8",
        void: {
          DEFAULT: "#12100d",
          deep: "#0d0b09",
        },
        violet: "#9a6bff",
```

- [ ] **Step 6: Pré-carregar a fonte do hero no `index.html`**

Logo antes de `<link rel="icon" ...>`, inserir:

```html
  <link
    rel="preload"
    href="/fonts/archivo-variable.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
```

- [ ] **Step 7: Verificar que build e tokens saíram certos**

```bash
npm run build
grep -c "@font-face" dist/assets/*.css
grep -o "archivo-variable.woff2" dist/assets/*.css | head -1
grep -o "36 16% 6%" dist/assets/*.css | head -1
ls dist/fonts/
```

Esperado: `3` ocorrências de `@font-face`; a referência ao woff2 aparece; o token `36 16% 6%` aparece; `dist/fonts/` contém os 3 arquivos.

O site ainda está com os componentes antigos e vai parecer quebrado neste ponto — é esperado, a paleta mudou debaixo deles. As tarefas seguintes trocam os componentes.

- [ ] **Step 8: Commit**

```bash
git add public/fonts src/assets/patrick-sticker.png src/index.css tailwind.config.ts index.html
git commit -m "feat(design): add 2026 foundation — self-hosted fonts, tokens, keyframes"
```

---

## Task 2: Conteúdo — `portfolio-data.ts` e a trava contra placeholder

**Files:**
- Create: `src/lib/portfolio-data.ts`
- Test: `src/lib/portfolio-data.test.ts`

**Interfaces:**
- Consumes: `src/assets/project-dashboard.webp`, `project-automation.webp`, `project-portal.webp` (já no repo), da Task 1 nada.
- Produces:
  - `CV_URL: string`
  - `type CaseItem = { num: string; title: string; type: string; stack: string; image: string; problem: string; solution: string; result: string }`
  - `cases: CaseItem[]` (3 itens, `num` = `"001" | "002" | "003"`)
  - `marqueeItems: string[]`
  - `loves: string[]`
  - `experiences: { period: string; role: string; company: string }[]`
  - `education: { period: string; degree: string; institution: string }[]`
  - `stackGroups: { label: string; items: string }[]`
  - `contactLinks: { meta: string; label: string; href: string }[]`

- [ ] **Step 1: Escrever o teste que falha**

Create `src/lib/portfolio-data.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import * as data from "./portfolio-data";

/** Coleta recursivamente toda string exportada pelo módulo. */
function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

describe("portfolio-data", () => {
  it("não contém nenhum placeholder entre colchetes", () => {
    for (const text of collectStrings(data)) {
      expect(text).not.toMatch(/[[\]]/);
    }
  });

  it("expõe exatamente os 3 casos, numerados em sequência", () => {
    expect(data.cases.map((c) => c.num)).toEqual(["001", "002", "003"]);
  });

  it("dá a todo caso um resultado não vazio", () => {
    for (const c of data.cases) {
      expect(c.result.trim().length).toBeGreaterThan(0);
    }
  });

  it("aponta todo link de contato para um destino utilizável", () => {
    for (const link of data.contactLinks) {
      expect(link.href).toMatch(/^(https:\/\/|mailto:)/);
    }
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
npx vitest run src/lib/portfolio-data.test.ts
```

Esperado: FAIL — `Failed to resolve import "./portfolio-data"`.

- [ ] **Step 3: Criar `src/lib/portfolio-data.ts`**

Idêntico ao de referência, **exceto** os três `result`, de onde a frase `[métrica real aqui]` foi cortada:

```ts
import projectDashboard from "@/assets/project-dashboard.webp";
import projectAutomation from "@/assets/project-automation.webp";
import projectPortal from "@/assets/project-portal.webp";

export const CV_URL =
  "https://drive.google.com/file/d/1YgNbnXKP43306sia4YMR7_wA9-rMpM8d/view";

export type CaseItem = {
  num: string;
  title: string;
  type: string;
  stack: string;
  image: string;
  problem: string;
  solution: string;
  result: string;
};

export const cases: CaseItem[] = [
  {
    num: "001",
    title: "Análise Contratual",
    type: "DADOS + BI",
    stack: "Power BI · SQL · Python",
    image: projectDashboard,
    problem:
      "Métricas de contratos espalhadas em planilhas manuais — sem visão consolidada de KPIs nem alertas de risco.",
    solution:
      "Dashboard interativo em Power BI com pipeline SQL + Python para consolidar, tratar e atualizar os dados automaticamente.",
    result:
      "Relatórios estratégicos em minutos e oportunidades identificadas por dado, não por intuição.",
  },
  {
    num: "002",
    title: "Automação de Fluxos",
    type: "AUTOMAÇÃO",
    stack: "Power Automate · Python · M365",
    image: projectAutomation,
    problem:
      "Geração de relatórios e gestão de tarefas 100% manuais, consumindo horas recorrentes da equipe de TI.",
    solution:
      "Fluxos em Power Automate orquestrados com scripts Python sobre o Microsoft 365, do gatilho à entrega.",
    result: "Trabalho manual recorrente eliminado do fluxo da equipe.",
  },
  {
    num: "003",
    title: "Portal de Chamados",
    type: "PRODUTO WEB",
    stack: "Vue.js 3 · GLPI 10 · Tailwind",
    image: projectPortal,
    problem:
      "A interface padrão do GLPI confundia usuários na abertura e no acompanhamento de tickets de TI.",
    solution:
      "Portal web em Vue.js 3 integrado a um backend customizado do GLPI 10, redesenhando o fluxo de ponta a ponta.",
    result:
      "Abertura de chamados simplificada e acompanhamento transparente.",
  },
];

export const marqueeItems = [
  "PYTHON",
  "POWER BI",
  "SQL",
  "POWER AUTOMATE",
  "VUE.JS",
  "EXCEL",
  "M365",
  "LINUX",
  "GIT",
  "GLPI",
  "TAILWIND",
  "JAVASCRIPT",
];

export const loves = ["Dados", "Automação", "Web", "Impacto"];

export const experiences = [
  { period: "2021—hoje", role: "Analista de Dados", company: "Setor de TI" },
  {
    period: "2021—hoje",
    role: "Desenvolvedor de Automações",
    company: "Power Automate & Python",
  },
  {
    period: "2022—2024",
    role: "Desenvolvedor Web",
    company: "Projetos Institucionais",
  },
];

export const education = [
  {
    period: "2023—2027",
    degree: "Licenciatura em Computação",
    institution: "IFRJ — Instituto Federal do Rio de Janeiro",
  },
  {
    period: "2019—2021",
    degree: "Técnico em Informática",
    institution: "Ensino Técnico",
  },
];

export const stackGroups = [
  { label: "DADOS", items: "Python · SQL · Power BI · Excel" },
  { label: "AUTOMAÇÃO", items: "Power Automate · M365 · GLPI" },
  { label: "WEB", items: "Vue.js · JavaScript · Tailwind" },
  { label: "BASE", items: "Git · Linux" },
];

export const contactLinks = [
  {
    meta: "EMAIL",
    label: "patricksdiniz@gmail.com",
    href: "mailto:patricksdiniz@gmail.com",
  },
  {
    meta: "REDE",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/diniz-patrick/",
  },
  { meta: "CÓDIGO", label: "GitHub", href: "https://github.com/Patrick-Diniz" },
  { meta: "PDF", label: "Currículo", href: CV_URL },
];
```

- [ ] **Step 4: Rodar e confirmar que passa**

```bash
npx vitest run src/lib/portfolio-data.test.ts
```

Esperado: PASS, 4 testes.

- [ ] **Step 5: Commit**

```bash
git add src/lib/portfolio-data.ts src/lib/portfolio-data.test.ts
git commit -m "feat(content): add portfolio data, guarded against shipping placeholders"
```

---

## Task 3: `useReveal` blindado

**Files:**
- Create: `src/hooks/useReveal.ts`
- Test: `src/hooks/useReveal.test.tsx`

**Interfaces:**
- Consumes: nada.
- Produces: `export function useReveal(): void` — chamada uma única vez, em `Index.tsx`.

- [ ] **Step 1: Escrever os testes que falham**

Create `src/hooks/useReveal.test.tsx`:

```tsx
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { useReveal } from "./useReveal";

const Probe = () => {
  useReveal();
  return <div data-reveal data-testid="alvo">conteúdo</div>;
};

/** Substitui matchMedia para simular a preferência de movimento. */
function setReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduce,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

const matchMediaOriginal = window.matchMedia;

/** Observer que nunca dispara — o cenário que a rede de segurança cobre. */
class ObserverInerte {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

beforeEach(() => {
  vi.useFakeTimers();
  setReducedMotion(false);
  // Este arquivo é dono da própria fixture de IntersectionObserver.
  // `vi.unstubAllGlobals()` no afterEach derrubaria também o stub que
  // src/test/setup.ts instala uma vez por arquivo, deixando os testes
  // seguintes sem observer nenhum — e eles passariam pelo motivo errado,
  // caindo na defesa "sem IntersectionObserver" em vez de exercitar o
  // caminho que pretendem testar.
  vi.stubGlobal("IntersectionObserver", ObserverInerte);
});

afterEach(() => {
  vi.useRealTimers();
  window.matchMedia = matchMediaOriginal;
});

describe("useReveal", () => {
  it("não esconde nada quando o usuário pede movimento reduzido", () => {
    setReducedMotion(true);
    const { getByTestId } = render(<Probe />);
    expect(getByTestId("alvo").style.opacity).toBe("");
  });

  it("não esconde nada quando não há IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { getByTestId } = render(<Probe />);
    expect(getByTestId("alvo").style.opacity).toBe("");
  });

  it("esconde para revelar depois quando há suporte e movimento normal", () => {
    const { getByTestId } = render(<Probe />);
    expect(getByTestId("alvo").style.opacity).toBe("0");
  });

  it("revela pela rede de segurança se o observer nunca disparar", () => {
    const { getByTestId } = render(<Probe />);
    expect(getByTestId("alvo").style.opacity).toBe("0");
    vi.advanceTimersByTime(3000);
    expect(getByTestId("alvo").style.opacity).toBe("1");
  });
});
```

Nota: `src/test/setup.ts` também injeta um `IntersectionObserver` de mentira que
nunca dispara. Este arquivo instala o seu próprio no `beforeEach` em vez de
depender daquele — e por isso **não** chama `vi.unstubAllGlobals()`, que
restauraria todos os stubs rastreados, inclusive o do `setup.ts`, e deixaria os
testes seguintes do arquivo sem observer. Não alterar `src/test/setup.ts`.

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
npx vitest run src/hooks/useReveal.test.tsx
```

Esperado: FAIL — `Failed to resolve import "./useReveal"`.

- [ ] **Step 3: Criar `src/hooks/useReveal.ts`**

```ts
import { useEffect } from "react";

const TRANSITION =
  "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)";

/** Tempo após o qual qualquer elemento ainda escondido é revelado à força. */
const FAILSAFE_MS = 3000;

/**
 * Reveal on scroll para todo [data-reveal] do documento. Um observer só,
 * montado uma vez pela página — chame em Index.tsx, não em cada componente.
 *
 * O hook esconde o conteúdo para poder animá-lo, o que significa que uma falha
 * aqui deixa a página em branco. Três defesas contra isso:
 *   1. não esconde nada sem IntersectionObserver;
 *   2. não esconde nada sob prefers-reduced-motion;
 *   3. revela à força o que sobrar depois de FAILSAFE_MS.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (els.length === 0) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const supported = typeof IntersectionObserver === "function";

    // Sem animação, o conteúdo simplesmente já está visível.
    if (prefersReduced || !supported) return;

    const show = (el: HTMLElement) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    };

    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = TRANSITION;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          window.setTimeout(() => show(el), 80 * (idx % 4));
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));

    const failsafe = window.setTimeout(() => els.forEach(show), FAILSAFE_MS);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);
}
```

- [ ] **Step 4: Rodar e confirmar que passa**

```bash
npx vitest run src/hooks/useReveal.test.tsx
```

Esperado: PASS, 4 testes.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useReveal.ts src/hooks/useReveal.test.tsx
git commit -m "feat(reveal): add scroll reveal hook that never strands content"
```

---

## Task 4: `Preloader` e a variável `--seq`

**Files:**
- Create: `src/components/Preloader.tsx`
- Test: `src/components/Preloader.test.tsx`

**Interfaces:**
- Consumes: keyframes `preTedioSeq`, `preStrikeSeq`, `preAutoSeq` da Task 1.
- Produces: `export default Preloader` (sem props). Efeito colateral contratual: grava `--seq` em `document.documentElement` e a chave `pd-preloader-seen` em `sessionStorage`.

- [ ] **Step 1: Escrever os testes que falham**

Create `src/components/Preloader.test.tsx`:

```tsx
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import Preloader from "./Preloader";

const matchMediaOriginal = window.matchMedia;

function setReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduce,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

beforeEach(() => {
  sessionStorage.clear();
  document.documentElement.style.removeProperty("--seq");
  setReducedMotion(false);
});

afterEach(() => {
  window.matchMedia = matchMediaOriginal;
});

describe("Preloader", () => {
  it("roda na primeira visita da sessão e mantém a sequência ligada", () => {
    const { container } = render(<Preloader />);

    expect(container.textContent).toContain("TÉDIO");
    expect(document.documentElement.style.getPropertyValue("--seq")).toBe("");
    expect(sessionStorage.getItem("pd-preloader-seen")).toBe("1");
  });

  it("pula na segunda montagem da mesma sessão e zera a sequência", () => {
    const primeira = render(<Preloader />);
    primeira.unmount();

    const { container } = render(<Preloader />);

    expect(container.textContent).toBe("");
    expect(document.documentElement.style.getPropertyValue("--seq")).toBe("0");
  });

  it("pula sob movimento reduzido, mesmo na primeira visita", () => {
    setReducedMotion(true);

    const { container } = render(<Preloader />);

    expect(container.textContent).toBe("");
    expect(document.documentElement.style.getPropertyValue("--seq")).toBe("0");
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
npx vitest run src/components/Preloader.test.tsx
```

Esperado: FAIL — `Failed to resolve import "./Preloader"`.

- [ ] **Step 3: Criar `src/components/Preloader.tsx`**

```tsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const SEEN_KEY = "pd-preloader-seen";

/** sessionStorage lança em modo privado de alguns navegadores. */
function readSeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* sem sessão persistente: o preloader roda de novo, o que é aceitável */
  }
}

/**
 * "TÉDIO" entra, é riscado por uma barra violeta e sai; "AUTOMATIZADO." sobe
 * no lugar. Sequência de 2,3s, depois o painel inteiro sobe.
 *
 * Roda uma vez por sessão. Quando pula — segunda visita ou movimento reduzido —
 * grava `--seq: 0`, o que colapsa os delays de entrada do resto da página.
 * Sem isso a página ficaria ~2,5s em branco esperando delays calibrados para
 * um preloader que não rodou.
 */
const Preloader = () => {
  // A decisão sai no primeiro render, não num efeito: `sessionStorage` e
  // `matchMedia` respondem de forma síncrona e não mudam durante a vida do
  // componente. Resolver aqui evita um render extra e satisfaz a regra
  // `react-hooks/set-state-in-effect` sem precisar suprimi-la — a regra está
  // certa, o `setState` dentro do efeito é que era desnecessário.
  const [skip] = useState(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    return prefersReduced || readSeen();
  });
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const progressRef = useRef(0);

  // useLayoutEffect: grava antes do primeiro quadro, para não existir um
  // instante com a sequência errada. Só escreve — não chama setState.
  useLayoutEffect(() => {
    if (skip) {
      document.documentElement.style.setProperty("--seq", "0");
    } else {
      markSeen();
    }
  }, [skip]);

  useEffect(() => {
    if (skip) return;

    const id = setInterval(() => {
      const next = Math.min(
        100,
        progressRef.current + 1.5 + Math.random() * 3.5
      );
      progressRef.current = next;
      setProgress(next);
      if (next >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 300);
      }
    }, 75);

    return () => clearInterval(id);
  }, [skip]);

  if (skip) return null;

  const pct = Math.round(progress);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-void-deep transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(.76,0,.24,1)]"
      style={{
        transform: done ? "translateY(-100%)" : "translateY(0)",
        pointerEvents: done ? "none" : "auto",
      }}
    >
      <div className="relative flex h-[180px] w-full items-center justify-center overflow-hidden">
        <div
          className="absolute font-display text-[clamp(56px,10vw,110px)] font-black tracking-[-.04em] text-ink"
          style={{ animation: "preTedioSeq 2.3s cubic-bezier(.22,1,.36,1) both" }}
        >
          TÉDIO
          <div
            className="absolute -left-[4%] -right-[4%] top-[52%] h-2 origin-left bg-violet"
            style={{
              animation: "preStrikeSeq 2.3s cubic-bezier(.4,0,.2,1) both",
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div
            className="whitespace-nowrap font-display text-[clamp(34px,6vw,64px)] font-black tracking-[-.03em] text-violet"
            style={{
              animation: "preAutoSeq 2.3s cubic-bezier(.22,1,.36,1) both",
            }}
          >
            AUTOMATIZADO<span className="text-ink">.</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-9 left-[22px] font-mono text-[11px] tracking-[.16em] text-[rgba(242,239,232,.45)] md:left-11">
        PD<span className="text-violet">®</span> — PORTFÓLIO 2026
      </div>
      <div className="absolute bottom-9 right-[22px] font-mono text-[15px] text-violet md:right-11">
        {pct}%
      </div>
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-violet transition-[width] duration-[120ms] ease-linear"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

export default Preloader;
```

- [ ] **Step 4: Rodar e confirmar que passa**

```bash
npx vitest run src/components/Preloader.test.tsx
```

Esperado: PASS, 3 testes.

- [ ] **Step 5: Commit**

```bash
git add src/components/Preloader.tsx src/components/Preloader.test.tsx
git commit -m "feat(preloader): add opening sequence, once per session"
```

---

## Task 5: Moldura — `SectionHeading`, `Marquee`, `Navigation`

Três componentes de apresentação sem estado. Ficam juntos porque nenhum tem
comportamento próprio a testar: a verificação deles é visual, na Task 14.

**Files:**
- Create: `src/components/SectionHeading.tsx`
- Create: `src/components/Marquee.tsx`
- Replace: `src/components/Navigation.tsx`

**Interfaces:**
- Consumes: `marqueeItems` da Task 2; keyframes `marqueeX`, `fadeUp`, `blinkDot` da Task 1.
- Produces:
  - `SectionHeading` — props `{ num: string; title: string; tail: string }`
  - `Marquee` — sem props
  - `Navigation` — sem props

- [ ] **Step 1: Criar `src/components/SectionHeading.tsx`**

```tsx
/**
 * Cabeçalho de seção: número mono violeta + título display + palavra
 * serifada itálica. Usado por Trabalhos (01) e Sobre (02).
 */
const SectionHeading = ({
  num,
  title,
  tail,
}: {
  num: string;
  title: string;
  tail: string;
}) => (
  <div data-reveal className="mb-[10px] flex flex-wrap items-baseline gap-5">
    <span className="font-mono text-xs text-violet">{num}</span>
    <h2 className="m-0 font-display text-[clamp(44px,5.5vw,72px)] font-black uppercase tracking-[-.03em]">
      {title}
    </h2>
    <span className="font-serif text-[26px] italic text-violet">{tail}</span>
  </div>
);

export default SectionHeading;
```

- [ ] **Step 2: Criar `src/components/Marquee.tsx`**

```tsx
import { marqueeItems } from "@/lib/portfolio-data";

/**
 * Faixa de stack em rolagem infinita. A lista é duplicada e o translate vai
 * até -50%, por isso o loop é contínuo. Não remover a duplicação: sem ela o
 * laço salta ao reiniciar.
 */
const Marquee = () => (
  <div className="overflow-hidden border-y border-[rgba(242,239,232,.12)] bg-void-deep">
    <div
      className="flex w-max"
      style={{ animation: "marqueeX 24s linear infinite" }}
    >
      {[...marqueeItems, ...marqueeItems].map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="inline-flex items-center gap-[26px] whitespace-nowrap px-[13px] py-[17px] font-display text-sm font-bold tracking-[.14em] text-[rgba(242,239,232,.55)]"
        >
          {item}
          <span className="text-violet">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
```

- [ ] **Step 3: Substituir `src/components/Navigation.tsx`**

O arquivo inteiro passa a ser:

```tsx
const links = [
  { href: "#trabalhos", label: "TRABALHOS" },
  { href: "#sobre", label: "SOBRE" },
  { href: "#contato", label: "CONTATO" },
];

/**
 * Nav fixa. Entra depois do preloader — o delay acompanha `--seq`, que vai a 0
 * quando o preloader é pulado.
 */
const Navigation = () => (
  <nav
    className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-[22px] py-5 backdrop-blur-lg md:px-11"
    style={{
      background:
        "linear-gradient(180deg,rgba(18,16,13,.92),rgba(18,16,13,.75) 70%,transparent)",
      animation: "fadeUp .8s cubic-bezier(.22,1,.36,1) both",
      animationDelay: "calc(var(--seq) * 2.7s)",
    }}
  >
    <a
      href="#topo"
      className="font-display text-[17px] font-black tracking-[-.02em] text-ink no-underline"
    >
      PD<span className="text-violet">®</span>
    </a>

    <div className="hidden items-center gap-8 font-display text-xs font-bold tracking-[.12em] md:flex">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="text-[rgba(242,239,232,.65)] no-underline transition-colors hover:text-violet"
        >
          {l.label}
        </a>
      ))}
      <span className="flex items-center gap-2 text-[11.5px] text-violet">
        <i
          className="h-[7px] w-[7px] rounded-full bg-violet"
          style={{ animation: "blinkDot 2s ease-in-out infinite" }}
        />
        DISPONÍVEL
      </span>
    </div>
  </nav>
);

export default Navigation;
```

Atenção ao padrão de animação usado aqui e em todas as tarefas seguintes: a
propriedade `animation` vem **primeiro** no objeto de estilo e `animationDelay`
**depois**. O atalho `animation` zera o delay, então a ordem importa — React
aplica as chaves na ordem do objeto.

- [ ] **Step 4: Verificar tipos e lint**

```bash
npm run type-check && npm run lint
```

Esperado: `tsc` sem saída; lint com 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/SectionHeading.tsx src/components/Marquee.tsx src/components/Navigation.tsx
git commit -m "feat(chrome): add section heading, marquee and the 2026 nav"
```

---

## Task 6: `Hero`

**Files:**
- Replace: `src/components/Hero.tsx`
- Replace: `src/components/Hero.test.tsx`

**Interfaces:**
- Consumes: `CV_URL` da Task 2; `patrick-sticker.png` da Task 1; keyframes `heroLine`, `fadeUp`, `floatY2`, `spinSlow`, `scrollNudge`.
- Produces: `export default Hero` (sem props). Fornece a âncora `#topo`.

- [ ] **Step 1: Reescrever o teste**

`src/components/Hero.test.tsx` hoje trava o bug antigo (classe `hero-text` com
spans por letra). O hero novo não tem nem um nem outro, então o teste é
substituído — não apagado. O arquivo inteiro passa a ser:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";
import { CV_URL } from "@/lib/portfolio-data";

describe("Hero", () => {
  it("anuncia o título em um h1 e o expõe como texto legível", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Automatizando");
    expect(heading.textContent).toContain("o tédio");
  });

  it("aponta o CTA de currículo para a URL do portfolio-data, em nova aba e sem vazar referrer", () => {
    render(<Hero />);

    const cv = screen.getByRole("link", { name: /currículo/i });
    expect(cv).toHaveAttribute("href", CV_URL);
    expect(cv).toHaveAttribute("target", "_blank");
    expect(cv).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  });

  it("liga o CTA principal à âncora de trabalhos", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: /ver trabalhos/i })).toHaveAttribute(
      "href",
      "#trabalhos"
    );
  });

  it("descreve a figura do autor para leitor de tela", () => {
    render(<Hero />);

    expect(screen.getByAltText("Patrick Diniz")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
npx vitest run src/components/Hero.test.tsx
```

Esperado: FAIL — o Hero antigo renderiza "Patrick Diniz" no h1, não "Automatizando".

- [ ] **Step 3: Substituir `src/components/Hero.tsx`**

O arquivo inteiro passa a ser:

```tsx
import sticker from "@/assets/patrick-sticker.png";
import { CV_URL } from "@/lib/portfolio-data";

/**
 * Hero — duas linhas display sob máscara de overflow, frase serifada, dois CTAs
 * e a figura fig. 01. Todos os delays multiplicam `--seq`: quando o preloader
 * não roda, a entrada é imediata em vez de esperar 2,5s por nada.
 */
const Hero = () => (
  <section
    id="topo"
    className="relative box-border flex min-h-screen scroll-mt-10 flex-col justify-center overflow-hidden px-[22px] pt-24 md:px-11"
  >
    <div className="relative z-[1] flex flex-1 flex-col justify-center">
      <div
        className="mb-8 font-mono text-[12.5px] text-[rgba(242,239,232,.5)]"
        style={{
          animation: "fadeUp .7s cubic-bezier(.22,1,.36,1) both",
          animationDelay: "calc(var(--seq) * 2.45s)",
        }}
      >
        RIO DE JANEIRO, BR — ANALISTA DE DADOS &amp; AUTOMAÇÃO T.I
      </div>

      <h1 className="m-0 font-display font-black uppercase leading-[.9] tracking-[-.045em] text-ink">
        <span className="block overflow-hidden">
          <span
            className="block text-[min(8.6vw,120px,14vh)]"
            style={{
              animation: "heroLine .85s cubic-bezier(.22,1,.36,1) both",
              animationDelay: "calc(var(--seq) * 2.5s)",
            }}
          >
            Automatizando
          </span>
        </span>
        <span className="block overflow-hidden">
          <span
            className="mt-6 block text-[min(9.8vw,136px,15.5vh)]"
            style={{
              animation: "heroLine .85s cubic-bezier(.22,1,.36,1) both",
              animationDelay: "calc(var(--seq) * 2.62s)",
            }}
          >
            o tédio<span className="text-violet">.</span>
          </span>
        </span>
      </h1>

      <div className="mt-2 grid grid-cols-1 items-end gap-12 pb-7 md:grid-cols-[1fr_auto]">
        <div>
          <p
            className="m-0 max-w-[24ch] font-serif text-[clamp(20px,2.1vw,29px)] italic leading-[1.25] text-[rgba(242,239,232,.85)]"
            style={{
              animation: "fadeUp .8s cubic-bezier(.22,1,.36,1) both",
              animationDelay: "calc(var(--seq) * 2.85s)",
            }}
          >
            …e transformando dados <br />
            em decisões que a sua equipe consegue defender.
          </p>

          <div
            className="mt-[26px] flex flex-wrap gap-4"
            style={{
              animation: "fadeUp .8s cubic-bezier(.22,1,.36,1) both",
              animationDelay: "calc(var(--seq) * 3s)",
            }}
          >
            <a
              href="#trabalhos"
              className="rounded-full bg-ink px-[34px] py-[17px] font-display text-[13px] font-extrabold tracking-[.06em] text-void no-underline transition-colors duration-[250ms] hover:bg-violet hover:text-ink"
            >
              VER TRABALHOS ↓
            </a>
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[rgba(242,239,232,.3)] px-[34px] py-[17px] font-display text-[13px] font-semibold tracking-[.06em] text-ink no-underline transition-colors duration-[250ms] hover:border-violet hover:text-violet"
            >
              CURRÍCULO ↗
            </a>
          </div>
        </div>

        {/* fig. 01 — sticker sobre placa violeta rotacionada */}
        <div
          className="relative mx-auto h-[274px] w-[250px] flex-none md:mx-0"
          style={{
            animation: "fadeUp .9s cubic-bezier(.22,1,.36,1) both",
            animationDelay: "calc(var(--seq) * 2.9s)",
          }}
        >
          <div className="absolute inset-x-0 bottom-0 top-[18px] rotate-[3deg] rounded-[2px] bg-violet" />
          <div
            className="absolute inset-0 flex items-end justify-center"
            style={{ animation: "floatY2 5.5s ease-in-out infinite" }}
          >
            <img
              src={sticker}
              alt="Patrick Diniz"
              width={264}
              height={272}
              className="h-[272px] w-[264px] [filter:drop-shadow(0_18px_30px_rgba(0,0,0,.45))]"
            />
          </div>
          <div className="absolute -bottom-4 -left-5 -rotate-2 border border-[rgba(242,239,232,.25)] bg-void px-[14px] py-2 font-mono text-[11px] text-ink">
            fig. 01 — o autor
          </div>
          <div
            className="absolute -right-[26px] -top-[26px] h-[76px] w-[76px]"
            style={{ animation: "spinSlow 14s linear infinite" }}
          >
            <svg viewBox="0 0 100 100" width="76" height="76" aria-hidden="true">
              <defs>
                <path
                  id="hero-circ"
                  d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0"
                />
              </defs>
              <text className="font-mono text-[11.5px] tracking-[.22em] [fill:rgba(242,239,232,.5)]">
                <textPath href="#hero-circ">DADOS · AUTOMAÇÃO · CÓDIGO ·</textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div
      className="absolute bottom-[26px] left-[22px] flex items-center gap-[10px] font-mono text-[11px] text-[rgba(242,239,232,.45)] md:left-11"
      style={{
        animation: "fadeUp .8s cubic-bezier(.22,1,.36,1) both",
        animationDelay: "calc(var(--seq) * 3.2s)",
      }}
    >
      <span style={{ animation: "scrollNudge 1.8s ease-in-out infinite" }}>↓</span>{" "}
      SCROLL
    </div>
  </section>
);

export default Hero;
```

- [ ] **Step 4: Rodar e confirmar que passa**

```bash
npx vitest run src/components/Hero.test.tsx
```

Esperado: PASS, 4 testes.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.test.tsx
git commit -m "feat(hero): replace hero with the 2026 two-line display type"
```

---

## Task 7: `Works` — casos acessíveis por toque e teclado

**Files:**
- Create: `src/components/Works.tsx`
- Test: `src/components/Works.test.tsx`

**Interfaces:**
- Consumes: `cases` da Task 2; `SectionHeading` da Task 5.
- Produces: `export default Works`. Fornece a âncora `#trabalhos`.

- [ ] **Step 1: Escrever os testes que falham**

Create `src/components/Works.test.tsx`:

`@testing-library/user-event` **não** está instalado neste projeto, e a
constraint global proíbe adicionar dependência. Use `fireEvent`, que vem de
`@testing-library/react`.

```tsx
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Works from "./Works";
import { cases } from "@/lib/portfolio-data";

const linhas = () => screen.getAllByRole("button");

describe("Works", () => {
  it("abre o primeiro caso por padrão e mantém os outros fechados", () => {
    render(<Works />);

    const [primeira, ...resto] = linhas();
    expect(primeira).toHaveAttribute("aria-expanded", "true");
    for (const linha of resto) {
      expect(linha).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("abre um caso no clique — o caminho que o toque usa", () => {
    render(<Works />);

    fireEvent.click(linhas()[2]);

    expect(linhas()[2]).toHaveAttribute("aria-expanded", "true");
    expect(linhas()[0]).toHaveAttribute("aria-expanded", "false");
  });

  it("abre um caso com Enter — focar sozinho não abre", () => {
    render(<Works />);

    linhas()[1].focus();
    // Um div com role="button" não dispara click no Enter como um <button>
    // nativo dispararia. Se focar já abrisse, este teste não provaria que o
    // handler de teclado existe.
    expect(linhas()[1]).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(linhas()[1], { key: "Enter" });

    expect(linhas()[1]).toHaveAttribute("aria-expanded", "true");
  });

  it("abre um caso com Espaço", () => {
    render(<Works />);

    fireEvent.keyDown(linhas()[1], { key: " " });

    expect(linhas()[1]).toHaveAttribute("aria-expanded", "true");
  });

  it("tira o painel fechado da árvore de acessibilidade", () => {
    render(<Works />);

    const paineis = screen.getAllByTestId("case-panel");
    expect(paineis[0]).toHaveAttribute("aria-hidden", "false");
    expect(paineis[1]).toHaveAttribute("aria-hidden", "true");
    expect(paineis[1].style.visibility).toBe("hidden");
  });

  it("mostra o preview do caso ativo com rótulo acessível", () => {
    render(<Works />);

    fireEvent.click(linhas()[1]);

    expect(
      screen.getByRole("img", { name: `Preview do projeto ${cases[1].title}` })
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
npx vitest run src/components/Works.test.tsx
```

Esperado: FAIL — `Failed to resolve import "./Works"`.

- [ ] **Step 3: Criar `src/components/Works.tsx`**

```tsx
import { useState } from "react";
import { cases } from "@/lib/portfolio-data";
import SectionHeading from "@/components/SectionHeading";

const PANEL_TRANSITION = "max-height .45s cubic-bezier(.4,0,.2,1), opacity .35s";

/**
 * Trabalhos — lista editorial. A linha ativa acende e expande o painel
 * Problema/Solução/Resultado; o preview sticky troca de imagem.
 *
 * A linha responde a mouse, clique e teclado. O código de referência só tinha
 * onMouseEnter, o que deixava dois dos três casos inalcançáveis em toque.
 *
 * Sem `onFocus`: um div com role="button" não ativa no Enter como um <button>
 * nativo, então o handler de teclado é o que de fato faz o teclado funcionar.
 * Ativar no foco mascararia isso — tabular abriria o caso e o handler poderia
 * estar quebrado sem ninguém notar.
 *
 * O painel fechado usa `visibility: hidden` — não `display: none`, que mataria
 * a transição de max-height — para sair da ordem de tabulação e da árvore de
 * acessibilidade. O delay de visibility espera o fecho terminar.
 */
const Works = () => {
  const [active, setActive] = useState(0);
  const current = cases[active];

  return (
    <section
      id="trabalhos"
      className="scroll-mt-10 px-[22px] pb-[90px] pt-[110px] md:px-11"
    >
      <SectionHeading num="01" title="Trabalhos" tail="selecionados" />
      <p
        data-reveal
        className="mb-10 mt-0 max-w-[60ch] text-sm leading-[1.6] text-[rgba(242,239,232,.55)]"
      >
        Cada caso conta o que importa: o problema real, a solução construída e o
        que mudou.
      </p>

      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_400px]">
        <div data-reveal>
          {cases.map((cs, i) => {
            const on = active === i;
            return (
              <div
                key={cs.num}
                className="border-t border-[rgba(242,239,232,.15)]"
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={on}
                  aria-controls={`case-panel-${cs.num}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                  className="flex cursor-pointer flex-wrap items-baseline gap-[22px] px-1 pb-6 pt-7 outline-none focus-visible:ring-1 focus-visible:ring-violet"
                >
                  <span
                    className="font-mono text-[13px] transition-colors"
                    style={{ color: on ? "#9a6bff" : "rgba(242,239,232,.4)" }}
                  >
                    {cs.num}
                  </span>
                  <h3
                    className="m-0 font-display text-[clamp(26px,3vw,38px)] font-extrabold uppercase tracking-[-.02em] transition-colors duration-[250ms]"
                    style={{ color: on ? "#f2efe8" : "rgba(242,239,232,.45)" }}
                  >
                    {cs.title}
                  </h3>
                  <span className="ml-auto whitespace-nowrap text-right font-mono text-[11px] text-[rgba(242,239,232,.45)]">
                    {cs.type}
                    <br />
                    {cs.stack}
                  </span>
                </div>

                <div
                  id={`case-panel-${cs.num}`}
                  data-testid="case-panel"
                  aria-hidden={!on}
                  className="overflow-hidden"
                  style={{
                    maxHeight: on ? 560 : 0,
                    opacity: on ? 1 : 0,
                    visibility: on ? "visible" : "hidden",
                    transition: on
                      ? `${PANEL_TRANSITION}, visibility 0s`
                      : `${PANEL_TRANSITION}, visibility 0s .45s`,
                  }}
                >
                  <div className="grid grid-cols-1 gap-[26px] pb-8 pl-1 pr-1 pt-0.5 md:grid-cols-3 md:pl-[57px]">
                    <Field label="PROBLEMA" text={cs.problem} />
                    <Field label="SOLUÇÃO" text={cs.solution} />
                    <Field label="RESULTADO" text={cs.result} accent />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t border-[rgba(242,239,232,.15)]" />
        </div>

        <div
          data-reveal
          className="sticky top-[110px] hidden h-[440px] overflow-hidden rounded border border-[rgba(242,239,232,.15)] md:block"
        >
          <div
            role="img"
            aria-label={`Preview do projeto ${current.title}`}
            className="absolute inset-0 bg-cover bg-center [filter:saturate(.85)]"
            style={{ backgroundImage: `url(${current.image})` }}
          />
          <div
            className="absolute inset-x-0 bottom-0 p-4 font-mono text-[11px] text-ink"
            style={{
              background: "linear-gradient(0deg,rgba(13,11,9,.92),transparent)",
            }}
          >
            fig. 0{active + 1} — {current.title}
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label,
  text,
  accent,
}: {
  label: string;
  text: string;
  accent?: boolean;
}) => (
  <div>
    <div
      className="mb-2 font-mono text-[10px] tracking-[.14em]"
      style={{ color: accent ? "#9a6bff" : "rgba(242,239,232,.45)" }}
    >
      {label}
    </div>
    <p className="m-0 text-[13px] leading-[1.65] text-[rgba(242,239,232,.75)]">
      {text}
    </p>
  </div>
);

export default Works;
```

- [ ] **Step 4: Rodar e confirmar que passa**

```bash
npx vitest run src/components/Works.test.tsx
```

Esperado: PASS, 6 testes.

- [ ] **Step 5: Commit**

```bash
git add src/components/Works.tsx src/components/Works.test.tsx
git commit -m "feat(works): add case list reachable by touch and keyboard"
```

---

## Task 8: `About`

**Files:**
- Replace: `src/components/About.tsx`

**Interfaces:**
- Consumes: `experiences`, `education`, `loves`, `stackGroups` da Task 2; `SectionHeading` da Task 5.
- Produces: `export default About`. Fornece a âncora `#sobre`.

- [ ] **Step 1: Substituir `src/components/About.tsx`**

O arquivo inteiro passa a ser:

```tsx
import SectionHeading from "@/components/SectionHeading";
import {
  education,
  experiences,
  loves,
  stackGroups,
} from "@/lib/portfolio-data";

/**
 * Sobre — statement e "E EU AMO" à esquerda; experiência, educação e stack
 * à direita. A antiga seção Skills não existe mais: a stack vive aqui.
 */
const About = () => (
  <section
    id="sobre"
    className="scroll-mt-10 border-t border-[rgba(242,239,232,.12)] bg-void-deep px-[22px] py-[100px] md:px-11"
  >
    <div className="mb-11">
      <SectionHeading num="02" title="Sobre" tail="mim" />
    </div>

    <div className="grid grid-cols-1 items-start gap-11 md:grid-cols-[1.2fr_1fr] md:gap-16">
      <div>
        <p
          data-reveal
          className="m-0 font-display text-[clamp(24px,2.4vw,32px)] font-bold leading-[1.3] tracking-[-.01em] text-ink"
        >
          Sou o Patrick — 3+ anos convertendo trabalho repetitivo em código e
          dados dispersos em decisões, com Python, Power BI e Power Automate.
        </p>
        <p
          data-reveal
          className="mb-0 mt-[22px] max-w-[56ch] text-[15px] leading-[1.75] text-[rgba(242,239,232,.6)]"
        >
          Cursando Licenciatura em Computação no IFRJ. Procuro os problemas que
          ninguém quer fazer duas vezes na mão — e construo a ferramenta que faz
          por nós.
        </p>

        <div data-reveal className="mt-12">
          <div className="mb-[14px] font-mono text-[11px] tracking-[.14em] text-[rgba(242,239,232,.45)]">
            E EU AMO
          </div>
          {loves.map((lv) => (
            <div
              key={lv}
              className="cursor-default font-display text-[clamp(40px,4.6vw,60px)] font-black uppercase leading-[1.12] tracking-[-.03em] text-[rgba(242,239,232,.35)] transition-[color,padding-left] duration-[300ms] hover:pl-[18px] hover:text-violet"
            >
              {lv}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-11">
        <div data-reveal>
          <Label>EXPERIÊNCIA</Label>
          {experiences.map((ex) => (
            <Row
              key={ex.role}
              period={ex.period}
              title={ex.role}
              sub={ex.company}
            />
          ))}
        </div>

        <div data-reveal>
          <Label>EDUCAÇÃO</Label>
          {education.map((ed) => (
            <Row
              key={ed.degree}
              period={ed.period}
              title={ed.degree}
              sub={ed.institution}
            />
          ))}
        </div>

        <div data-reveal>
          <Label>STACK</Label>
          <div className="mt-4 grid grid-cols-2 gap-x-7 gap-y-5">
            {stackGroups.map((sg) => (
              <div key={sg.label}>
                <div className="mb-2 font-mono text-[10px] tracking-[.14em] text-violet">
                  {sg.label}
                </div>
                <div className="text-[14.5px] leading-[1.9] text-[rgba(242,239,232,.75)]">
                  {sg.items}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-1.5 font-mono text-[11px] tracking-[.14em] text-[rgba(242,239,232,.45)]">
    {children}
  </div>
);

const Row = ({
  period,
  title,
  sub,
}: {
  period: string;
  title: string;
  sub: string;
}) => (
  <div className="flex items-baseline gap-[22px] border-b border-[rgba(242,239,232,.1)] py-4">
    <span className="w-[86px] flex-none whitespace-nowrap font-mono text-[11px] text-[rgba(242,239,232,.4)]">
      {period}
    </span>
    <div>
      <div className="text-base font-bold">{title}</div>
      <div className="mt-0.5 text-[13px] text-[rgba(242,239,232,.55)]">{sub}</div>
    </div>
  </div>
);

export default About;
```

- [ ] **Step 2: Verificar tipos e lint**

```bash
npm run type-check && npm run lint
```

Esperado: `tsc` sem saída; lint 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat(about): replace about with the 2026 editorial layout"
```

---

## Task 9: `Manifesto`

**Files:**
- Create: `src/components/Manifesto.tsx`

**Interfaces:**
- Consumes: `patrick-sticker.png` da Task 1.
- Produces: `export default Manifesto` (sem props, sem âncora).

- [ ] **Step 1: Criar `src/components/Manifesto.tsx`**

```tsx
import sticker from "@/assets/patrick-sticker.png";

/**
 * Manifesto — bloco central de tipografia cinética, alternando display
 * uppercase e serifada itálica. Fecha com o sticker sobre círculo violeta.
 */
const Manifesto = () => (
  <section className="relative overflow-hidden border-t border-[rgba(242,239,232,.12)] px-[22px] py-[140px] text-center md:px-11">
    <div
      data-reveal
      className="mb-9 font-mono text-xs text-[rgba(242,239,232,.45)]"
    >
      ENTÃO…
    </div>
    <div
      data-reveal
      className="font-display text-[clamp(40px,5.2vw,68px)] font-black uppercase leading-[1.08] tracking-[-.035em] text-ink"
    >
      Conheça seu próximo
    </div>
    <div
      data-reveal
      className="font-display text-[clamp(40px,5.2vw,68px)] font-black uppercase leading-[1.08] tracking-[-.035em] text-violet"
    >
      analista de dados<span className="text-ink">.</span>
    </div>
    <div
      data-reveal
      className="mt-[18px] font-serif text-[clamp(26px,3vw,40px)] italic text-[rgba(242,239,232,.8)]"
    >
      perfeccionista do pixel à pipeline,
    </div>
    <div
      data-reveal
      className="mt-[18px] font-display text-[clamp(40px,5.2vw,68px)] font-black uppercase leading-[1.08] tracking-[-.035em] text-ink"
    >
      do dado bruto{" "}
      <span className="font-serif font-normal normal-case italic text-violet">
        à decisão.
      </span>
    </div>

    <div data-reveal className="mt-14 flex justify-center">
      <div className="relative h-[200px] w-[190px]">
        <div className="absolute inset-x-1.5 bottom-0 top-[14px] rotate-[3deg] rounded-full bg-violet" />
        <img
          src={sticker}
          alt="Patrick Diniz"
          width={190}
          height={200}
          className="absolute inset-0 h-auto w-full [filter:drop-shadow(0_12px_22px_rgba(0,0,0,.4))]"
        />
      </div>
    </div>
    <div
      data-reveal
      className="mt-[18px] font-mono text-xs text-[rgba(242,239,232,.5)]"
    >
      @patrick-diniz
    </div>
  </section>
);

export default Manifesto;
```

- [ ] **Step 2: Verificar tipos e lint**

```bash
npm run type-check && npm run lint
```

Esperado: `tsc` sem saída; lint 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Manifesto.tsx
git commit -m "feat(manifesto): add the kinetic type block"
```

---

## Task 10: `Contact` e a barra final

**Files:**
- Replace: `src/components/Contact.tsx`
- Test: `src/components/Contact.test.tsx`

**Interfaces:**
- Consumes: `contactLinks` da Task 2.
- Produces: `export default Contact`. Fornece a âncora `#contato` e a barra de
  rodapé — não existe mais componente `Footer` separado.

- [ ] **Step 1: Escrever os testes que falham**

Create `src/components/Contact.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";
import { contactLinks } from "@/lib/portfolio-data";

describe("Contact", () => {
  it("expõe um link por canal, apontando para o destino dos dados", () => {
    render(<Contact />);

    for (const canal of contactLinks) {
      expect(
        screen.getByRole("link", { name: new RegExp(canal.label, "i") })
      ).toHaveAttribute("href", canal.href);
    }
  });

  it("abre só os canais externos em nova aba, e sem vazar referrer", () => {
    render(<Contact />);

    const email = screen.getByRole("link", { name: /patricksdiniz/i });
    expect(email).not.toHaveAttribute("target");

    const linkedin = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  });

  it("não oferece formulário — o design novo não tem nenhum", () => {
    const { container } = render(<Contact />);

    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input")).toBeNull();
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
npx vitest run src/components/Contact.test.tsx
```

Esperado: FAIL — o Contact antigo tem formulário, então o terceiro teste quebra
e os dois primeiros não acham os links.

- [ ] **Step 3: Substituir `src/components/Contact.tsx`**

O arquivo inteiro passa a ser:

```tsx
import { contactLinks } from "@/lib/portfolio-data";

/**
 * Contato + rodapé numa seção só: a barra final é desta seção, não há
 * componente Footer separado. Sem formulário — os canais são linhas de
 * largura inteira.
 */
const Contact = () => (
  <section
    id="contato"
    className="scroll-mt-10 border-t border-[rgba(242,239,232,.12)] bg-void-deep px-[22px] pb-[60px] pt-[110px] md:px-11"
  >
    <div
      data-reveal
      className="mb-5 font-mono text-xs text-[rgba(242,239,232,.45)]"
    >
      03 — OBRIGADO PELA VISITA
    </div>
    <h2
      data-reveal
      className="m-0 font-display text-[clamp(64px,10vw,150px)] font-black uppercase leading-[.92] tracking-[-.045em] text-ink"
    >
      Vamos
      <br />
      conversar<span className="text-violet">?</span>
    </h2>
    <p
      data-reveal
      className="mb-0 mt-7 max-w-[30ch] font-serif text-[clamp(20px,2.2vw,28px)] italic text-[rgba(242,239,232,.75)]"
    >
      Tem um processo manual custando horas da sua equipe? Fala comigo.
    </p>

    <div data-reveal className="mt-14 max-w-[760px]">
      {contactLinks.map((lk) => {
        const external = lk.href.startsWith("http");
        return (
          <a
            key={lk.meta}
            href={lk.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="flex items-center gap-5 border-t border-[rgba(242,239,232,.15)] px-2.5 py-[22px] text-ink no-underline transition-[background,padding-left] duration-[300ms] hover:bg-[rgba(154,107,255,.08)] hover:pl-6"
          >
            <span className="w-[70px] flex-none font-mono text-[11px] text-[rgba(242,239,232,.4)]">
              {lk.meta}
            </span>
            <span className="font-display text-[clamp(20px,2.4vw,30px)] font-extrabold uppercase tracking-[-.015em]">
              {lk.label}
            </span>
            <span aria-hidden="true" className="ml-auto text-[22px] text-violet">
              ↗
            </span>
          </a>
        );
      })}
      <div className="border-t border-[rgba(242,239,232,.15)]" />
    </div>

    <div className="mt-[90px] flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(242,239,232,.12)] pt-6 font-mono text-[11px] text-[rgba(242,239,232,.4)]">
      <span>© 2026 PATRICK DINIZ — RIO DE JANEIRO, BR</span>
      <span className="font-display text-sm font-black text-[rgba(242,239,232,.6)]">
        PD<span className="text-violet">®</span>
      </span>
      <span>REACT · TYPESCRIPT · TAILWIND</span>
    </div>
  </section>
);

export default Contact;
```

- [ ] **Step 4: Rodar e confirmar que passa**

```bash
npx vitest run src/components/Contact.test.tsx
```

Esperado: PASS, 3 testes.

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.tsx src/components/Contact.test.tsx
git commit -m "feat(contact): replace contact with channel lines and the closing bar"
```

---

## Task 11: `Index` — montagem e teste de integração

**Files:**
- Replace: `src/pages/Index.tsx`
- Test: `src/pages/Index.test.tsx`

**Interfaces:**
- Consumes: todos os componentes das Tasks 4–10 e `useReveal` da Task 3.
- Produces: `export default Index`, a rota `/` de `App.tsx`.

- [ ] **Step 1: Escrever os testes que falham**

Create `src/pages/Index.test.tsx`:

```tsx
import { beforeEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Index from "./Index";

beforeEach(() => {
  sessionStorage.clear();
  document.documentElement.style.removeProperty("--seq");
});

describe("Index", () => {
  it("expõe as 4 âncoras que a navegação usa, cada uma na seção certa", () => {
    const { container } = render(<Index />);

    const ancora = (id: string) => container.querySelector(`#${id}`);

    for (const id of ["topo", "trabalhos", "sobre", "contato"]) {
      expect(ancora(id)).not.toBeNull();
    }

    // Existir não basta. Um id no elemento errado — #sobre no Works, digamos —
    // resolveria os quatro seletores e passaria verde, enquanto todo link da
    // nav levaria à seção errada. Amarrar cada id ao conteúdo da sua seção é o
    // que torna esta verificação capaz de falhar pelo motivo certo.
    expect(ancora("topo")?.textContent).toContain("Automatizando");
    expect(ancora("trabalhos")?.textContent).toContain("Trabalhos");
    expect(ancora("sobre")?.textContent).toContain("Sobre");
    expect(ancora("contato")?.textContent).toContain("conversar");
  });

  it("monta os blocos do design na ordem especificada", () => {
    const { container } = render(<Index />);

    const texto = container.textContent ?? "";
    const ordem = [
      "Automatizando",
      "Trabalhos",
      "Sobre",
      "Conheça seu próximo",
      "conversar",
    ];

    const posicoes = ordem.map((t) => texto.indexOf(t));
    expect(posicoes.every((p) => p >= 0)).toBe(true);
    expect([...posicoes].sort((a, b) => a - b)).toEqual(posicoes);
  });

  it("não deixa resquício do design antigo", () => {
    const { container } = render(<Index />);

    expect(container.innerHTML).not.toContain("glass-card");
    expect(container.innerHTML).not.toContain("hero-text");
    expect(container.innerHTML).not.toContain("project-card");
    expect(container.innerHTML).not.toContain("skill-tag");
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
npx vitest run src/pages/Index.test.tsx
```

Esperado: FAIL — o Index antigo importa `Skills`/`Projects`/`Footer` e não tem
a âncora `#trabalhos`.

- [ ] **Step 3: Substituir `src/pages/Index.tsx`**

O arquivo inteiro passa a ser:

```tsx
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Works from "@/components/Works";
import About from "@/components/About";
import Manifesto from "@/components/Manifesto";
import Contact from "@/components/Contact";
import { useReveal } from "@/hooks/useReveal";

/**
 * Ordem definitiva da página. O design novo não tem seção Skills separada — a
 * stack vive dentro de Sobre — nem Footer separado: a barra final é do Contato.
 * ScrollToTop saiu; a nav fixa resolve.
 */
const Index = () => {
  useReveal();

  return (
    <div className="dark relative bg-void text-ink [overflow-x:clip]">
      <Preloader />
      <Navigation />
      <Hero />
      <Marquee />
      <Works />
      <About />
      <Manifesto />
      <Contact />
    </div>
  );
};

export default Index;
```

- [ ] **Step 4: Rodar e confirmar que passa**

```bash
npx vitest run src/pages/Index.test.tsx
```

Esperado: PASS, 3 testes.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Index.tsx src/pages/Index.test.tsx
git commit -m "feat(page): wire the 2026 section order"
```

---

## Task 12: Limpeza — o que o design novo não usa

**Files:**
- Delete: `src/components/Skills.tsx`, `src/components/Projects.tsx`, `src/components/Footer.tsx`, `src/components/ScrollToTop.tsx`
- Delete: `src/hooks/use-toast.ts`, `src/hooks/use-mobile.tsx`, `src/hooks/use-mobile.test.tsx`
- Delete: `src/components/ui/` (os 12 componentes), `src/lib/utils.ts`
- Modify: `src/App.tsx`
- Modify: `vite.config.ts` (remover o chunk `framer-motion`)
- Modify: `tailwind.config.ts` (remover plugin, `keyframes`, `animation`, `backgroundImage`, `boxShadow` mortos)
- Modify: `package.json` (remover 15 dependências sem consumidor)

**Interfaces:**
- Consumes: o `Index.tsx` da Task 11, que já não importa nada disso.
- Produces: nada novo. `App.tsx` continua exportando `default App` com as mesmas
  duas rotas.

- [ ] **Step 1: Substituir `src/App.tsx`**

Os provedores de toast e tooltip existiam para os componentes shadcn. O design
novo não usa nenhum. O arquivo inteiro passa a ser:

```tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-void text-ink">
    <p className="font-mono text-xs tracking-[.16em]">Carregando...</p>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* Qualquer rota nova entra ACIMA do catch-all "*" */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
```

`src/App.test.tsx` continua válido: ele mocka as duas páginas e só verifica o
fallback e a rota. Não mexer nele.

- [ ] **Step 2: Apagar os componentes e hooks mortos**

```bash
git rm src/components/Skills.tsx src/components/Projects.tsx \
       src/components/Footer.tsx src/components/ScrollToTop.tsx \
       src/hooks/use-toast.ts src/hooks/use-mobile.tsx src/hooks/use-mobile.test.tsx
```

- [ ] **Step 3: Apagar `src/components/ui/` inteiro e o `cn`**

Levantamento feito no planejamento: dos 12 componentes, oito (`button`,
`dialog`, `input`, `label`, `separator`, `sheet`, `skeleton`, `toggle`) já não
têm consumidor nenhum hoje. Os outros quatro só eram importados por
`src/App.tsx` (`sonner`, `toaster`, `tooltip`, `toast`), por `use-toast.ts` e por
`toaster.tsx` — todos removidos nos passos 1 e 2. O design novo não usa nenhum.

`src/lib/utils.ts` só existe para o helper `cn`, que nenhum componente novo usa.

```bash
git rm -r src/components/ui
git rm src/lib/utils.ts
```

Confirmar que a conta fecha:

```bash
grep -rn "components/ui\|lib/utils\|{ cn }" src || echo "ui/ e cn: sem referencia"
```

- [ ] **Step 4: Remover as dependências que ficaram sem consumidor**

Levantadas percorrendo cada dependência de produção contra os imports que
sobrevivem ao redesign. Ficam só `react`, `react-dom` e `react-router-dom`.

```bash
npm uninstall \
  @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-separator \
  @radix-ui/react-slot @radix-ui/react-toast @radix-ui/react-toggle \
  @radix-ui/react-tooltip class-variance-authority next-themes sonner \
  framer-motion lucide-react clsx tailwind-merge tailwindcss-animate
```

Motivo de cada grupo: os sete `@radix-ui/*`, `class-variance-authority`,
`next-themes` e `sonner` existiam só para os componentes shadcn; `framer-motion`
era usado pelos Hero/About/Contact antigos; `lucide-react` fornecia os ícones
deles — o design novo desenha as setas com texto; `clsx` e `tailwind-merge`
existiam só para o `cn`; `tailwindcss-animate` fornecia as classes
`animate-in`/`animate-out` do shadcn.

- [ ] **Step 5: Limpar `vite.config.ts` e `tailwind.config.ts`**

Em `vite.config.ts`, dentro de `manualChunks`, apagar o bloco:

```ts
          if (id.includes("node_modules/framer-motion")) {
            return "framer-motion";
          }
```

Em `tailwind.config.ts`:

1. Remover `import tailwindcssAnimate from "tailwindcss-animate";` e trocar
   `plugins: [tailwindcssAnimate],` por `plugins: [],`.
2. Remover os blocos `keyframes` e `animation` inteiros de `theme.extend` — as
   entradas `accordion-*`, `fade-in`, `slide-in-*`, `scale-in` e `glow` eram do
   design antigo; os keyframes do design novo vivem em `src/index.css`.
3. Remover os blocos `backgroundImage` e `boxShadow` de `theme.extend`. Eles
   apontam para `--gradient-primary`, `--gradient-secondary`, `--gradient-hero` e
   `--shadow-purple`, que deixaram de existir no `:root` na Task 1 — hoje
   emitiriam utilitários que resolvem para nada.

Preservar `container`, o mapa de cores (com os aditivos `ink`/`void`/`violet` da
Task 1), `borderRadius` e `fontFamily`.

- [ ] **Step 6: Provar que não sobrou referência**

```bash
grep -rn "framer-motion" src vite.config.ts package.json || echo "framer-motion: limpo"
grep -rn "glass-card\|hero-text\|skill-tag\|project-card\|section-padding\|container-width" src || echo "classes antigas: limpo"
grep -rn "Skills\|Projects\|Footer\|ScrollToTop\|use-toast\|use-mobile" src || echo "componentes antigos: limpo"
grep -rn "tailwindcss-animate\|lucide-react\|next-themes" src tailwind.config.ts || echo "deps removidas: limpo"
```

Esperado: as quatro linhas de "limpo". Qualquer resultado é referência pendente —
resolva antes de seguir.

- [ ] **Step 7: Rodar a suíte inteira**

```bash
npm run type-check && npm run lint && npm run test && npm run build
```

Esperado: `tsc` sem saída; lint 0 errors; todos os testes passam; build ok.
No sumário do build, **não deve existir** um chunk `framer-motion`, e o total de
JS deve cair bem abaixo dos ~525 kB do design antigo.

Se o build quebrar por import faltando, é uma dependência removida cedo demais —
o erro diz qual. Reinstale só essa e registre no relatório final.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: drop what the 2026 design does not use"
```

---

## Task 13: Metadata e OG image na identidade nova

**Files:**
- Modify: `index.html`
- Replace: `public/og-image.png`

**Interfaces:**
- Consumes: `src/assets/patrick-sticker.png` da Task 1.
- Produces: nada consumido por código.

- [ ] **Step 1: Alinhar a copy do `index.html`**

Trocar os quatro textos, mantendo intactos `canonical`, `og:url`, `og:image`,
dimensões, `twitter:image`, `og:locale`, `og:site_name` e o `<link rel="preload">`
da Task 1:

```html
  <title>Patrick Diniz — Automatizando o tédio</title>
  <meta name="description"
    content="Analista de Dados & Automação T.I no Rio de Janeiro. Transformo trabalho repetitivo em código e dados dispersos em decisões, com Python, Power BI e Power Automate." />
```

```html
  <meta property="og:title" content="Patrick Diniz — Automatizando o tédio" />
  <meta property="og:description"
    content="Analista de Dados & Automação T.I no Rio de Janeiro. Transformo trabalho repetitivo em código e dados dispersos em decisões." />
```

E os equivalentes de Twitter:

```html
  <meta name="twitter:title" content="Patrick Diniz — Automatizando o tédio" />
  <meta name="twitter:description"
    content="Analista de Dados & Automação T.I no Rio de Janeiro. Transformo trabalho repetitivo em código e dados dispersos em decisões." />
```

Atualizar também os dois `og:image:alt` / `twitter:image:alt` para
`"Patrick Diniz — Automatizando o tédio"`.

- [ ] **Step 2: Gerar o OG image na paleta nova**

Escrever o script em `/tmp` — ele não faz parte do repositório:

```python
# /tmp/make_og_2026.py
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os

W, H = 1200, 630
VOID = (18, 16, 13)        # #12100d
INK = (242, 239, 232)      # #f2efe8
VIOLET = (154, 107, 255)   # #9a6bff
MUTED = (150, 146, 138)

ROOT = "/Users/patricksilvateixeiradiniz/Projetos/Portfolio"
STICKER = os.path.join(ROOT, "src/assets/patrick-sticker.png")
OUT = os.path.join(ROOT, "public/og-image.png")


def font(size, bold=False):
    path = ("/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold
            else "/System/Library/Fonts/Supplemental/Arial.ttf")
    return ImageFont.truetype(path, size)


img = Image.new("RGB", (W, H), VOID)
d = ImageDraw.Draw(img)

# Placa violeta rotacionada, ecoando a fig. 01 do hero
plate = Image.new("RGBA", (330, 360), VIOLET + (255,))
plate = plate.rotate(-3, expand=True, resample=Image.BICUBIC)
img.paste(plate, (800, 150), plate)

sticker = Image.open(STICKER).convert("RGBA")
sticker.thumbnail((340, 340), Image.LANCZOS)
shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
shadow.paste(sticker, (810, 170), sticker)
shadow = shadow.filter(ImageFilter.GaussianBlur(18))
img = Image.alpha_composite(img.convert("RGBA"), shadow).convert("RGB")
img.paste(sticker, (805, 155), sticker)
d = ImageDraw.Draw(img)

# Texto à esquerda: eyebrow mono, duas linhas display, régua e domínio
d.text((80, 120), "RIO DE JANEIRO, BR", font=font(20), fill=MUTED)
d.text((80, 190), "AUTOMATIZANDO", font=font(74, bold=True), fill=INK)
w = d.textlength("O TÉDIO", font=font(86, bold=True))
d.text((80, 280), "O TÉDIO", font=font(86, bold=True), fill=INK)
d.text((80 + w + 6, 280), ".", font=font(86, bold=True), fill=VIOLET)

d.text((80, 410), "Analista de Dados & Automação T.I", font=font(28), fill=MUTED)
d.rectangle([80, 480, 142, 484], fill=VIOLET)
d.text((80, 506), "patrickdiniz.com.br", font=font(23, bold=True), fill=INK)

img.save(OUT, "PNG", optimize=True)
print(f"{OUT} -> {img.size[0]}x{img.size[1]}, {os.path.getsize(OUT) // 1024} KB")
```

```bash
python3 /tmp/make_og_2026.py
```

- [ ] **Step 3: Conferir a imagem com os próprios olhos**

Abrir `public/og-image.png` e confirmar: fundo preto quente (não azulado), nada
cortado nas bordas, o sticker inteiro dentro do quadro, 1200×630. Se algum texto
colidir com o sticker, ajustar as coordenadas e rodar de novo.

- [ ] **Step 4: Commit**

```bash
git add index.html public/og-image.png
git commit -m "feat(meta): move title, description and link preview to the 2026 identity"
```

---

## Task 14: Verificação no navegador e abertura da PR

Nenhum código novo. Esta tarefa existe porque suíte verde não é site no ar — a
única falha que chegou em produção neste repositório passou por typecheck, lint,
test e build.

**Files:** nenhum.

- [ ] **Step 1: Suíte completa**

```bash
npm run type-check && npm run lint && npm run test && npm run build
```

Esperado: tudo verde, 0 errors de lint.

- [ ] **Step 2: Servir o build e abrir no navegador**

```bash
npm run preview
```

Abrir a URL impressa (normalmente `http://localhost:4173`).

- [ ] **Step 3: Percorrer o checklist de aceite do handoff em 1280×800**

Marcar um a um:

- preloader chega a 100% e sobe sem travar o scroll
- recarregar a página: na segunda vez o preloader **não** roda e o conteúdo
  entra imediatamente, sem espera
- hero ocupa a tela sem cortar título nem figura
- marquee roda contínuo, sem salto no ponto de reinício
- passar o mouse num caso acende a linha, expande o painel e troca o preview
- clicar num caso faz o mesmo
- `Tab` alcança as três linhas de caso e `Enter` abre
- os quatro links da nav param na posição certa
- links de contato deslocam 24px no hover e o `↗` é violeta

- [ ] **Step 4: Repetir em 1440×900 e em 375×812**

Em 375×812 verificar especificamente:

- os links da nav somem, sobra o `PD®`
- as grades de duas colunas viram uma
- o preview de Trabalhos some
- **os três casos abrem no toque**
- nada estoura a largura: rolagem horizontal não existe

- [ ] **Step 5: Rodar a varredura de texto invisível**

No console do navegador, na página servida:

```js
(() => {
  const bad = [];
  document.querySelectorAll('body *').forEach(el => {
    const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (!own) return;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if ((cs.color === 'rgba(0, 0, 0, 0)' || cs.color === 'transparent')
        && cs.backgroundImage === 'none' && r.height > 0) {
      bad.push({ tag: el.tagName, txt: el.textContent.trim().slice(0, 30) });
    }
  });
  return { invisiveis: bad.length, amostra: bad.slice(0, 5) };
})()
```

Esperado: `{ invisiveis: 0 }`. Qualquer valor acima de zero é um bug de contraste
ou de clipping — investigar antes de abrir a PR.

- [ ] **Step 6: Verificar movimento reduzido**

Emular `prefers-reduced-motion: reduce` (DevTools → Rendering → Emulate CSS
media feature) e recarregar com a sessão limpa
(`sessionStorage.clear()` antes do reload).

Esperado: sem preloader, sem animação, e o conteúdo visível **imediatamente** —
nenhuma janela de página em branco.

- [ ] **Step 7: Confirmar que as fontes carregaram do próprio domínio**

Na aba Network, filtrar por `font`.

Esperado: três requisições `.woff2`, todas de `localhost`, nenhuma para
`fonts.gstatic.com` ou `fonts.googleapis.com`.

- [ ] **Step 8: Abrir a PR**

```bash
git push -u origin redesign/portfolio-2026
gh pr create --title "feat: redesign 2026 — Automatizando o tédio" --body-file docs/superpowers/specs/2026-08-15-redesign-portfolio-2026-design.md
```

- [ ] **Step 9: Esperar o CI e relatar**

```bash
gh pr checks
```

Esperado: `build` pass. Reportar ao usuário o resultado dos passos 3 a 7 —
inclusive o que **não** deu para verificar — e aguardar a aprovação dele para o
merge. Não mergear sozinho.

---

## Task 15: Merge e verificação em produção

**Files:** nenhum.

- [ ] **Step 1: Mergear depois da aprovação do usuário**

```bash
gh pr merge --squash --delete-branch
git checkout main && git pull --ff-only
```

- [ ] **Step 2: Esperar o deploy de produção subir**

```bash
for i in $(seq 1 40); do
  if curl -s https://www.patrickdiniz.com.br/ | grep -q "Automatizando"; then
    echo "no ar apos $i tentativas"; break
  fi
  sleep 15
done
```

- [ ] **Step 3: Conferir que nada do que já estava certo quebrou**

```bash
for p in "" og-image.png robots.txt sitemap.xml nao-existe.png .well-known/security.txt; do
  printf "%-28s " "/$p"
  curl -s -o /dev/null -w "HTTP %{http_code}  %{content_type}\n" "https://www.patrickdiniz.com.br/$p"
done
curl -sI https://www.patrickdiniz.com.br/ | grep -iE "content-security-policy|strict-transport"
```

Esperado, igual à verificação da PR #29: raiz 200 `text/html`; `og-image.png`
200 `image/png`; `robots.txt` 200 `text/plain`; `sitemap.xml` 200
`application/xml`; `nao-existe.png` **404**; `security.txt` 200 `text/plain`;
CSP e HSTS presentes e inalterados.

- [ ] **Step 4: Conferir que as fontes vêm do próprio domínio em produção**

```bash
for f in archivo-variable instrument-serif-italic jetbrains-mono; do
  printf "%-30s " "/fonts/$f.woff2"
  curl -s -o /dev/null -w "HTTP %{http_code}  %{content_type}\n" \
    "https://www.patrickdiniz.com.br/fonts/$f.woff2"
done
```

Esperado: três `HTTP 200` com `font/woff2`.

- [ ] **Step 5: Repetir no navegador, contra produção**

Refazer os passos 3 a 7 da Task 14 apontando para `https://www.patrickdiniz.com.br/`,
mais:

- console sem erro
- a varredura de invisível retorna `0`
- `/rota-que-nao-existe` mostra a página 404 tematizada

- [ ] **Step 6: Relatar**

Dizer o que foi verificado e como, e o que não deu para verificar. Se algo
estiver errado em produção, o desfazer é um comando:

```bash
git revert <sha-do-squash> && git push
```
