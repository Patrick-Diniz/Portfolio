# Contribuindo para o Portfolio

Diretrizes para mexer neste projeto. Se algo aqui divergir do código, o código
manda — e o documento está errado e precisa ser corrigido.

## Estrutura

```
portfolio/
├── public/                      # servido como está, na raiz do domínio
│   ├── .well-known/security.txt
│   ├── fonts/                   # 3 .woff2 self-hosted (ver Design System)
│   ├── favicon.ico
│   ├── og-image.png             # 1200x630, preview de link
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/                  # imagens importadas pelo bundler
│   ├── components/              # uma seção por arquivo, com o teste ao lado
│   ├── hooks/useReveal.ts       # reveal on scroll, um observer para a página
│   ├── lib/portfolio-data.ts    # TODO o conteúdo do site
│   ├── pages/                   # Index (a página) e NotFound
│   ├── test/setup.ts            # fixtures globais do Vitest
│   ├── App.tsx                  # rotas
│   ├── main.tsx                 # entry point
│   └── index.css                # @font-face, tokens, keyframes
├── docs/superpowers/            # spec e plano do redesign 2026
├── vercel.json                  # headers de segurança e rewrite da SPA
└── tailwind.config.ts
```

## Onde mexer em cada coisa

| Quero mudar | Arquivo |
|---|---|
| Um projeto, um link, uma data, a URL do currículo | `src/lib/portfolio-data.ts` |
| A cor de acento, o fundo, a tipografia | `src/index.css` (tokens em `:root`) |
| Uma animação | `src/index.css` (`@keyframes`), aplicada via `style={{ animation }}` |
| A ordem das seções | `src/pages/Index.tsx` |
| Título, descrição, preview de link | `index.html` |

**Nenhum componente carrega texto de negócio.** Trocar um projeto é editar um
arquivo só. Se você se pegar escrevendo o nome de um projeto dentro de um `.tsx`,
está no lugar errado.

## Design System

### Paleta fechada — quatro valores

| | |
|---|---|
| `#12100d` | fundo (`bg-void`) |
| `#0d0b09` | faixas profundas (`bg-void-deep`) |
| `#f2efe8` | tinta (`text-ink`) |
| `#9a6bff` | acento único (`text-violet`, `bg-violet`) |

Não introduza uma quinta cor. Preto puro é aceito apenas em `drop-shadow`.

Linhas hairline de 1px substituem cards: `rgba(242,239,232,.12)` para divisão de
seção, `.15` para linha de lista. Não há sombra, gradiente ou vidro.

### Tipografia — três famílias, self-hosted

Archivo (display e corpo), Instrument Serif (só itálico, frases de respiro),
JetBrains Mono (metadados, numeração, labels).

Os `.woff2` vivem em `public/fonts/` e são declarados em `src/index.css`.
**Não troque por `<link>` do Google Fonts:** o CSP em `vercel.json` é
`font-src 'self'` e a fonte seria bloqueada em produção.

### Animação

CSS keyframes em `src/index.css`, aplicados pelos componentes. Não há
biblioteca de animação — `framer-motion` foi removida.

Duas armadilhas reais deste projeto:

**1. A ordem das chaves de estilo importa.**

```tsx
style={{
  animation: "fadeUp .8s cubic-bezier(.22,1,.36,1) both",
  animationDelay: "calc(var(--seq) * 2.7s)",
}}
```

`animation` é atalho e zera `animation-delay`. O React aplica as chaves na ordem
do objeto, então `animationDelay` **depois**. Invertido, o delay some sem aviso.

**2. `--seq` governa a sequência de entrada.**

Vale `1` por padrão. O `Preloader` grava `0` quando não roda — o que só acontece
sob `prefers-reduced-motion`. Sem isso, a página ficaria ~2,5s em branco
esperando delays calibrados para uma animação que não tocou. A regra
`prefers-reduced-motion` zera duração **e** delay; zerar só a duração não
resolve.

O preloader roda a **cada** carregamento, inclusive num F5 — não há gate de
sessão. Se você for reintroduzir um, lembre que os delays do hero dependem de
`--seq` ir a `0` no mesmo caminho, senão a tela fica em branco pelo tempo da
sequência que não tocou.

### A coreografia de entrada

A sequência dura `SEQUENCE_S` (1,2s), declarada em `Preloader.tsx`. Os
`animation-delay` do `Hero` e da `Navigation` vão de 1,35s a 1,74s — calibrados
para caírem 0,15s depois dela.

Os números vivem em arquivos diferentes, então **encurtar um lado sem o outro
deixa a tela vazia no intervalo**. `src/components/sequence.test.tsx` trava a
relação, não os valores: você pode mudar a duração à vontade, desde que os
delays acompanhem. Ele falha se o primeiro delay ficar antes do fim da
sequência, ou mais de 0,4s depois dela.

### Reveal on scroll

`[data-reveal]` num elemento faz `useReveal` escondê-lo e revelá-lo ao entrar na
viewport. O hook é chamado uma vez, em `Index.tsx`.

**Cuidado:** ele esconde por padrão. Se o `IntersectionObserver` falhar, o
conteúdo some. Por isso ele não esconde nada sem observer nem sob movimento
reduzido, e um timer de 3s libera o que ficar preso. Não remova essas defesas.
Não aninhe um `[data-reveal]` dentro de outro.

### Responsividade

Breakpoint único: **`md` = 900px**, sobrescrito em `tailwind.config.ts`. O padrão
do Tailwind é 768px e o design pede 900 — sem a sobrescrita, o layout desktop
entra cedo demais e o painel de casos fica ilegível em tablet.

Exceção deliberada: as três colunas do painel de caso entram em `lg` (1024px),
porque entre 900 e 1023px cada coluna ficaria com ~90px e o texto transbordaria.

## Desenvolvimento

```bash
git clone https://github.com/Patrick-Diniz/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Sobe em `http://localhost:8080`. Não há `.env` — o site não tem backend, chave
nem variável de ambiente.

### Scripts

```bash
npm run dev          # servidor de desenvolvimento (porta 8080)
npm run build        # build de produção
npm run preview      # serve o build, é aqui que se verifica de verdade
npm run type-check   # tsc --noEmit
npm run lint         # eslint
npm run test         # vitest run
npm run test:watch   # vitest em watch
npm run audit:security
```

Não existe `npm run deploy`. O deploy é automático pela Vercel a cada push em
`main`.

## Antes de abrir PR

O CI roda `type-check`, `lint`, `test` e `build`, nessa ordem. Os quatro precisam
passar. Localmente:

```bash
npm run type-check && npm run lint && npm run test && npm run build
```

`lint` está em zero erros e zero avisos. Mantenha assim.

### Verificação não é teste verde

Testes rodam em jsdom, que **não aplica CSS**. Nenhum teste unitário deste
projeto detecta um problema visual — já aconteceu de o nome do dono do site
renderizar invisível em produção com a suíte inteira verde.

Para qualquer mudança visual, sirva o build e olhe:

```bash
npm run build && npm run preview
```

Confira em 1280px, ~834px e 375px. No console do navegador, esta varredura tem
que devolver `0`:

```js
[...document.querySelectorAll('body *')].filter(el => {
  const proprio = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
  const cs = getComputedStyle(el);
  return proprio && cs.color === 'rgba(0, 0, 0, 0)'
    && cs.backgroundImage === 'none' && el.getBoundingClientRect().height > 0;
}).length
```

Em correção de bug, escreva primeiro o teste que **falha** por causa do bug. Sem
o vermelho, não há prova de que era esse o problema nem de que ele não volta.

## Convenções

Commits semânticos: `feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `test:`,
`chore:`. O corpo explica **por quê**, não o quê — o diff já mostra o quê.

Componentes em PascalCase, o teste ao lado (`Works.tsx` / `Works.test.tsx`).
Indentação de 2 espaços, aspas duplas.

## Acessibilidade

Não é enfeite aqui: a lista de casos é interativa e precisa funcionar sem mouse.

- Controle que não é `<button>` nativo precisa de `role`, `tabIndex` e
  `onKeyDown` — um `div` com `role="button"` **não** ativa no Enter sozinho.
- Estado aberto/fechado reflete em `aria-expanded` e `aria-hidden`.
- Conteúdo escondido usa `visibility: hidden`, não `display: none`, que mataria a
  transição — e sai da ordem de tabulação do mesmo jeito.
- Toda imagem tem `alt`; `background-image` que carrega informação tem `role="img"`
  e `aria-label`.
- Nada deve depender só de `onMouseEnter`. Em toque, isso não existe.

## Reportar bug

Descrição, passos, esperado vs. atual, captura, navegador e **largura da janela** —
vários problemas deste site só aparecem numa faixa específica de largura.

## Contato

- **Email**: patricksdiniz@gmail.com
- **LinkedIn**: [diniz-patrick](https://www.linkedin.com/in/diniz-patrick/)
- **GitHub**: [Patrick-Diniz](https://github.com/Patrick-Diniz)
