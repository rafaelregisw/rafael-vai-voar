# 🚀 Associação Rafael Vai Voar

## 📖 Sobre o Projeto

Landing page cinematográfica que conta a história inspiradora de Rafael Regis Azevedo, que enfrentou 10 anos com a "pior dor do mundo" (neuralgia do nervo intermédio) e hoje advoga por políticas públicas de saúde para doenças raras no Brasil.

### 🎯 Características

- ✨ Design cinematográfico e emocional
- 📱 100% responsivo (mobile-first)
- ⚡ Performance otimizada (< 2s loading)
- 🎨 Animações suaves com Framer Motion
- 🌍 Tradução automática (PT/EN/ES) + seletor de idioma
- 🌐 SEO otimizado
- ♿ Acessível

## 🛠️ Tecnologias

- **Vite** - Build tool ultrarrápida
- **React 19** - Framework JavaScript
- **TailwindCSS 3** - Estilização utility-first
- **Framer Motion** - Animações avançadas
- **React Icons** - Biblioteca de ícones
- **i18next / react-i18next** - Internacionalização (PT/EN/ES)

## 🚀 Desenvolvimento Local

### Pré-requisitos

- Node.js 18+ instalado
- NPM ou Yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/rafaelregisw/rafael-vai-voar.git

# Entre na pasta do projeto
cd rafael-vai-voar

# Instale as dependências
npm install
```

### Executar em Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# O site estará disponível em http://localhost:5173
```

### Build para Produção

```bash
# Gera build otimizado
npm run build

# Preview do build de produção
npm run preview
```

## 🌍 Idiomas (i18n)

O site detecta automaticamente o idioma do visitante (com fallback para `pt`) e também permite escolher manualmente pelo seletor no canto superior direito.

Detecção automática (ordem):
1. Preferência salva (`localStorage` / cookie `lang`)
2. Cloudflare Geo-IP (quando o domínio está proxied, orange cloud): usa `/cdn-cgi/trace` (`loc=XX`)
3. Idioma do navegador (`navigator.language`)

### Arquivos de tradução

- `public/locales/pt/common.json`
- `public/locales/en/common.json`
- `public/locales/es/common.json`

Preferência do usuário:
- `localStorage`: `lang`
- `cookie`: `lang`

Configuração (opcional):
- `.env.example`: `VITE_ENABLE_CF_GEO_LANG` (padrão: `true`)

## 📦 Estrutura do Projeto

```
rafael-vai-voar/
├── src/
│   ├── components/
│   │   ├── CTA.jsx
│   │   ├── DonationModal.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Journey.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   ├── Manifesto.jsx
│   │   ├── Numbers.jsx
│   │   ├── Story.jsx
│   │   └── Video.jsx
│   ├── i18n/
│   │   └── index.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
│   ├── assets/
│   ├── locales/
│   ├── robots.txt
│   └── sitemap.xml
├── Dockerfile
├── docker-compose.yml
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🌐 Deploy no Dokploy

Este repositório está pronto para deploy automático via Dokploy: ao fazer push na branch `main`, o Dokploy (quando configurado) faz o build do `Dockerfile` e publica o site via Nginx.

Documentação: `DEPLOY_DOKPLOY.md`

Se você usa Coolify, veja `DEPLOY_COOLIFY.md` (legado).

## 📊 Performance

### Lighthouse Scores Target

- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 100

### Otimizações Implementadas

- Lazy loading de imagens
- Code splitting automático
- Minificação de assets
- Compressão gzip
- Cache headers otimizados
- Fontes com preload

## 🎨 Paleta de Cores

```css
--azul-ceu: #87CEEB;
--azul-horizonte: #5B9BD5;
--dourado-suave: #FFD700;
--branco-nuvem: #FFFFFF;
--preto-suave: #1a1a1a;
--cinza-suave: #F5F5F5;
```

## 📱 Breakpoints

- **Mobile**: 375px (base)
- **SM**: 640px
- **MD**: 768px
- **LG**: 1024px
- **XL**: 1280px
- **2XL**: 1536px

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **Website**: [rafaelvaivoar.org.br](https://rafaelvaivoar.org.br)
- **Instagram**: [@rafaelvaivoar](https://instagram.com/rafaelvaivoar)
- **Email**: contato@rafaelvaivoar.org.br

## 🙏 Agradecimentos

- Rafael Regis Azevedo - Por sua coragem e inspiração
- Luana Azevedo - Pelo amor e suporte incondicional
- Todos os apoiadores - Por tornarem este movimento possível

---

**Desenvolvido com ❤️ para transformar vidas**

*"Nenhuma dor deveria ser invisível. Nenhum sonho deveria morrer por falta de acesso à saúde."*
