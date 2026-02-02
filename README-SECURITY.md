# Documentação de Segurança do Portfolio

Este documento descreve as práticas de segurança implementadas neste projeto.

## 🔒 Medidas de Segurança Implementadas

### 1. Headers HTTP de Segurança

O projeto está configurado com os seguintes headers de segurança:

- **X-Content-Type-Options: nosniff** - Previne ataques MIME sniffing
- **X-Frame-Options: DENY** - Protege contra clickjacking
- **X-XSS-Protection: 1; mode=block** - Ativa proteção contra XSS no navegador
- **Referrer-Policy: strict-origin-when-cross-origin** - Controla informações de referência
- **Permissions-Policy** - Desabilita recursos desnecessários (câmera, microfone, geolocalização)
- **Content-Security-Policy (CSP)** - Define fontes confiáveis para recursos

### 2. Proteção de Dados Sensíveis

- ✅ Arquivo `.gitignore` configurado para excluir `.env*` files
- ✅ Variáveis de ambiente documentadas em `.env.example`
- ✅ Sem API keys ou tokens hardcoded no código
- ✅ Dados pessoais são públicos (email, LinkedIn, GitHub) - apropriado para portfolio

### 3. Configurações de Build

- ✅ Source maps desabilitados em produção
- ✅ Minificação ativada para builds de produção
- ✅ Code splitting implementado para otimização
- ✅ Chunks separados para vendors (React, Framer Motion)

### 4. Meta Tags de Segurança

Adicionadas no `index.html`:
- Meta tags para prevenir sniffing
- Configuração de referrer policy
- Meta tags de SEO e compartilhamento social

## 📋 Checklist de Segurança

Antes de fazer deploy, verifique:

- [ ] Nenhum arquivo `.env` commitado no Git
- [ ] Build de produção executado com sucesso
- [ ] Headers de segurança configurados no servidor (Vercel/Netlify)
- [ ] Dependências atualizadas (sem vulnerabilidades críticas)
- [ ] Imagens de preview (og:image) configuradas

## 🔄 Manutenção de Segurança

### Verificar Vulnerabilidades

```bash
# Auditar dependências
npm audit

# Ver apenas vulnerabilidades de produção
npm audit --production

# Corrigir automaticamente (cuidado!)
npm audit fix
```

### Atualizar Dependências

```bash
# Ver dependências desatualizadas
npm outdated

# Atualizar dependências (versões minor/patch)
npm update

# Atualizar dependências major (cuidado!)
npx npm-check-updates -u
npm install
```

## 🌐 Deploy Seguro

### Vercel

O arquivo `vercel.json` já está configurado com headers de segurança.

```bash
# Deploy para Vercel
npm run deploy

# Ou usando Vercel CLI
vercel --prod
```

### Netlify

Se usar Netlify, renomeie `netlify.toml.example` para `netlify.toml`:

```bash
mv netlify.toml.example netlify.toml
```

### GitHub Pages

O projeto já está configurado para GitHub Pages. Execute:

```bash
npm run deploy
```

## 📞 Relatar Problemas de Segurança

Se você descobrir uma vulnerabilidade de segurança, por favor:

1. **NÃO** abra uma issue pública
2. Entre em contato diretamente via email: patricksdiniz@gmail.com
3. Descreva o problema detalhadamente
4. Aguarde resposta antes de divulgar publicamente

## 🔗 Recursos Úteis

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)

---

**Última atualização**: 2026-02-02
**Versão do documento**: 1.0
