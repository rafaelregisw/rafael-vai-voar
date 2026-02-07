# 🚀 Release Notes - Sistema PIX com QR Code

## 📅 Data: 16/09/2025

## ✨ Principais Mudanças

### 1. 🧹 Limpeza Completa do Backend
- ❌ Removido todo código de backend
- ❌ Removidas dependências desnecessárias (axios, cors, express, mercadopago)
- ❌ Removido arquivo de configuração API
- ✅ Projeto agora é 100% frontend

### 2. 💳 Novo Sistema de Doação via PIX
- ✅ QR Code PIX gerado dinamicamente
- ✅ Chave PIX: rafaelregis95@gmail.com
- ✅ Botão para copiar chave com feedback visual
- ✅ Instruções claras passo a passo

### 3. 📝 CNPJ Adicionado
- ✅ CNPJ: 52.277.434/0001-05
- ✅ Exibido no modal de doação
- ✅ Exibido no rodapé do site

### 4. 🎨 Melhorias Visuais
- ✅ Modal com design glassmorphism
- ✅ Animações suaves com Framer Motion
- ✅ Layout totalmente responsivo
- ✅ Interface profissional e confiável

## 📦 Dependências
- **Adicionada:** qrcode.react (v4.2.0)
- **Removidas:** axios, cors, express, mercadopago

## ✅ Status
- Build testado e funcionando
- 0 vulnerabilidades
- Pronto para produção

## 🚀 Deploy
Projeto pronto para push e deploy automático via Coolify.

---

# 🌍 Release Notes - v2.0 - Novas Línguas de Idioma (PT/EN/ES)

## 📅 Data: 07/02/2026

## ✨ Principais Mudanças

### 1. 🌐 Internacionalização (i18n)
- ✅ Tradução do conteúdo para **Português**, **Inglês** e **Espanhol**
- ✅ Arquivos de tradução em `public/locales/{pt,en,es}/common.json`

### 2. 🧭 Detecção automática + seletor manual
- ✅ Detecta automaticamente pelo idioma do navegador do visitante
- ✅ Seletor de idioma no topo direito com preferência persistida (cookie + localStorage)

### 3. 📦 Dependências adicionadas
- **i18next**
- **react-i18next**
- **i18next-browser-languagedetector**
- **i18next-http-backend**

## ✅ Testes e verificação
- `npm ci`
- `npm run lint`
- `npm run build`
- Smoke test em navegador (preview + troca de idioma + persistência)
