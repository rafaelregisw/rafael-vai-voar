# 🚀 Deploy no Dokploy - Rafael Vai Voar

Este projeto foi preparado para deploy automático (CI/CD) via Dokploy usando `Dockerfile` (build Vite + Nginx).

## 📋 Pré-requisitos

1. Dokploy instalado e configurado
2. Repositório GitHub: `https://github.com/rafaelregisw/rafael-vai-voar`
3. Domínio configurado (ex.: `rafaelvaivoar.org.br`)

## 🔧 Configuração no Dokploy

### 1. Criar a aplicação

1. Crie uma nova aplicação no Dokploy
2. Conecte o repositório do GitHub
3. Selecione a branch `main`

### 2. Build e runtime

O deploy usa:

- `Dockerfile`: executa `npm ci` + `npm run build` e serve `dist/` com Nginx
- Porta do container: `80`

### 3. Auto-deploy

Ative o deploy automático na branch `main` para que:

- cada push/merge na `main` dispare um novo build
- o Dokploy faça o rollout automaticamente após build bem-sucedido

## ✅ Verificação pós-deploy

Após o deploy, valide:

1. Site acessível no domínio configurado
2. Seletor de idioma (topo direito) funcionando
3. Detecção automática por país (Cloudflare) funcionando
4. Traduções disponíveis:
   - `/locales/pt/common.json`
   - `/locales/en/common.json`
   - `/locales/es/common.json`

## 🌍 Idioma automático por país (Cloudflare)

Se o seu domínio estiver com proxy do Cloudflare ativo (ícone laranja), o app consegue usar a geolocalização do Cloudflare para escolher o idioma padrão na **primeira visita** (quando o usuário ainda não escolheu um idioma).

Como funciona:

- O frontend faz `GET /cdn-cgi/trace`
- Lê o `loc=XX` (código do país)
- Define o idioma padrão:
  - países lusófonos: `pt`
  - países hispanohablantes: `es`
  - demais: `en`

O usuário sempre pode trocar o idioma manualmente pelo seletor.

## 🔐 Variáveis de ambiente

Não é necessário configurar variáveis de ambiente no Dokploy.

Opcional (build-time, Vite):

- `VITE_ENABLE_CF_GEO_LANG=true` (padrão)
  - para desativar: `VITE_ENABLE_CF_GEO_LANG=false`

## 🔄 Atualizações

1. Faça commit e push para a branch `main`
2. O Dokploy detecta e faz o redeploy automaticamente
3. Verifique o status e logs no painel do Dokploy
