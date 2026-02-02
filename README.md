# Portfolio Pessoal — Patrick Diniz

Portfolio profissional desenvolvido com React, TypeScript e Vite, apresentando projetos, habilidades e experiência em análise de dados e automação.

🌐 **Site ao vivo**: [patrickdiniz.com.br](https://patrickdiniz.com.br)

---

## 🎯 Sobre o Projeto

Portfolio de página única desenvolvido para apresentar minhas habilidades técnicas, projetos e experiência profissional de forma moderna e acessível. O design prioriza responsividade, animações suaves e uma experiência de usuário fluida.

---

## ✨ Funcionalidades

### Seções Principais

- **Hero**: Apresentação com título profissional e call-to-action
- **Sobre**: Biografia profissional e paixão por tecnologia
- **Habilidades**: Competências organizadas por categoria (Análise de Dados, Desenvolvimento, Ferramentas)
- **Projetos**: Galeria com trabalhos destacados incluindo dashboards e automações
- **Contato**: Informações de contato e redes profissionais

### Recursos Técnicos

- Design responsivo (mobile-first)
- Animações com Framer Motion
- Tema dark/light mode
- Navegação suave entre seções
- Cards 3D com efeitos de hover
- Otimizado para SEO

---

## 🛠️ Stack Tecnológica

### Core
- **React 18** - Biblioteca de UI componentizada
- **TypeScript** - Tipagem estática para maior robustez
- **Vite** - Build tool rápida com HMR

### UI/Styling
- **Tailwind CSS** - Framework utility-first
- **Framer Motion** - Animações fluidas
- **Radix UI** - Componentes acessíveis
- **Lucide Icons** - Ícones modernos

### Qualidade & Deploy
- **ESLint** - Linter para qualidade de código
- **Vercel** - Hosting com deploy automático
- **Git** - Controle de versão

---

## 🚀 Instalação e Uso

### Pré-requisitos
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Instalação
```bash
# Clone o repositório
git clone https://github.com/Patrick-Diniz/Portfolio.git
cd Portfolio

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev              # Desenvolvimento (localhost:8080)
npm run build            # Build de produção
npm run preview          # Preview do build
npm run lint             # Executar linter
npm run audit:security   # Verificar vulnerabilidades
npm run type-check       # Verificação TypeScript
```

---

## 🔒 Segurança

Este projeto implementa headers de segurança HTTP profissionais:
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security

**Score**: A no [SecurityHeaders.com](https://securityheaders.com)

Consulte [README-SECURITY.md](./README-SECURITY.md) para detalhes completos.

---

## 📁 Estrutura do Projeto

```
portfolio/
├── public/              # Arquivos estáticos
├── src/
│   ├── assets/         # Imagens e recursos
│   ├── components/     # Componentes React
│   │   ├── ui/        # Componentes UI reutilizáveis
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── lib/           # Utilitários
│   ├── App.tsx        # Componente principal
│   └── main.tsx       # Entry point
├── vercel.json        # Configuração de deploy
└── package.json       # Dependências
```

---

## 🌐 Deploy

### Vercel (Recomendado)

Deploy automático configurado via Vercel:

1. Push para a branch `main`
2. Vercel faz build automaticamente
3. Deploy em produção em ~1-2 minutos

O projeto já está configurado com `vercel.json` incluindo headers de segurança.

---

## 📈 Performance

- ✅ Build otimizado com code splitting
- ✅ Lazy loading de componentes
- ✅ Imagens otimizadas (WebP)
- ✅ CSS minificado
- ✅ CDN global (Vercel Edge Network)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Consulte [CONTRIBUTING.md](./CONTRIBUTING.md) para:
- Estrutura do projeto
- Convenções de código
- Processo de desenvolvimento
- Guidelines de commit

---

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

## 📫 Contato

**Patrick Diniz**  
Analista de Dados & Automação T.I

- 📧 Email: [patricksdiniz@gmail.com](mailto:patricksdiniz@gmail.com)
- 💼 LinkedIn: [diniz-patrick](https://www.linkedin.com/in/diniz-patrick/)
- 🐙 GitHub: [Patrick-Diniz](https://github.com/Patrick-Diniz)
- 🌐 Portfolio: [patrickdiniz.com.br](https://patrickdiniz.com.br)

---

**Desenvolvido com** ⚛️ React • 📘 TypeScript • ⚡ Vite
