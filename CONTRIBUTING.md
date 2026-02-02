# Contribuindo para o Portfolio

Obrigado pelo interesse em contribuir! Este documento fornece diretrizes para contribuir com este projeto.

## 📁 Estrutura do Projeto

```
portfolio/
├── public/              # Arquivos públicos estáticos
│   ├── favicon.ico
│   └── CNAME
├── src/
│   ├── assets/         # Imagens e recursos
│   ├── components/     # Componentes React
│   │   ├── ui/        # Componentes UI reutilizáveis (shadcn/ui)
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── lib/           # Utilitários e helpers
│   ├── App.tsx        # Componente principal
│   ├── main.tsx       # Entry point
│   └── index.css      # Estilos globais
├── .env.example       # Template de variáveis de ambiente
├── vercel.json        # Configuração de deploy (Vercel)
└── package.json       # Dependências e scripts
```

## 🎨 Design System

### Componentes UI

Este projeto usa [shadcn/ui](https://ui.shadcn.com/) para componentes base:

- Localizados em `src/components/ui/`
- Customizáveis via Tailwind CSS
- TypeScript first

### Animações

Usamos [Framer Motion](https://www.framer.com/motion/) para animações:

```tsx
import { motion } from "framer-motion";

// Exemplo de uso
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Conteúdo
</motion.div>
```

### Estilo de Código

- **Componentes**: PascalCase (Ex: `Hero.tsx`, `ContactForm.tsx`)
- **Utilitários**: camelCase (Ex: `formatDate.ts`)
- **Constantes**: UPPER_SNAKE_CASE
- **Indentação**: 2 espaços
- **Quotes**: Aspas duplas para JSX, simples para TS

## 🛠️ Desenvolvimento

### Setup Inicial

```bash
# Clonar repositório
git clone https://github.com/Patrick-Diniz/Portfolio.git
cd Portfolio

# Instalar dependências
npm install

# Copiar .env.example para .env.local (opcional)
cp .env.example .env.local

# Iniciar servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento (porta 8080)
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Executar linter
npm audit            # Verificar vulnerabilidades
npm run deploy       # Deploy para GitHub Pages
```

## 📝 Convenções de Commit

Use commits semânticos:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Formatação, espaços, etc.
- `refactor:` Refatoração de código
- `perf:` Melhorias de performance
- `test:` Adicionar ou corrigir testes
- `chore:` Tarefas de build, configuração

**Exemplos:**
```bash
git commit -m "feat: adicionar animação de entrada na seção Hero"
git commit -m "fix: corrigir navegação mobile responsiva"
git commit -m "docs: atualizar README com instruções de setup"
```

## 🧪 Testes

Antes de submeter:

1. ✅ Executar `npm run build` sem erros
2. ✅ Testar em diferentes tamanhos de tela
3. ✅ Executar `npm run lint` e corrigir problemas
4. ✅ Testar navegação entre seções
5. ✅ Verificar que animações funcionam suavemente

## 🎯 Diretrizes de Código

### Performance

- Use `lazy loading` para imagens grandes
- Evite re-renders desnecessários
- Use `useMemo` e `useCallback` quando apropriado
- Mantenha componentes pequenos e focados

### Acessibilidade

- Use tags semânticas HTML
- Adicione `aria-label` para ícones
- Mantenha contraste adequado de cores
- Teste navegação por teclado

### Responsividade

Mobile-first:
```tsx
// ✅ Bom
<div className="text-sm md:text-base lg:text-lg">

// ❌ Evitar
<div className="text-lg md:text-base sm:text-sm">
```

## 🐛 Reportar Bugs

Ao reportar bugs, inclua:

1. Descrição clara do problema
2. Passos para reproduzir
3. Comportamento esperado vs atual
4. Capturas de tela (se aplicável)
5. Navegador e versão

## 💡 Sugerir Melhorias

Para sugestões de features:

1. Verifique se já não existe issue similar
2. Descreva detalhadamente a feature
3. Explique o caso de uso
4. Se possível, sugira implementação

## 📧 Contato

- **Email**: patricksdiniz@gmail.com
- **LinkedIn**: [diniz-patrick](https://www.linkedin.com/in/diniz-patrick/)
- **GitHub**: [patrick-diniz](https://github.com/patrick-diniz)

---

**Obrigado por contribuir!** 🎉
