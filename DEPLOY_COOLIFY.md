# 🚀 Deploy no Coolify - Rafael Vai Voar

## 📋 Pré-requisitos

1. Coolify instalado e configurado
2. GitHub repository: `https://github.com/rafaelregisw/rafael-vai-voar`
3. Domínio configurado: `rafaelvaivoar.com`

## 🔧 Configuração no Coolify

### 1. Criar Novo Projeto

1. Acesse o Coolify
2. Clique em "New Project"
3. Escolha "Docker Compose"
4. Conecte ao GitHub repository

### 2. Configuração do Deploy

O projeto utiliza Docker Compose com a seguinte estrutura:
- Frontend React com Vite
- Build otimizado para produção
- Servido via Nginx

### 3. Verificação

Após o deploy, verifique:
- ✅ Site acessível em `https://rafaelvaivoar.com`
- ✅ HTTPS funcionando (Coolify configura automaticamente)
- ✅ Todas as seções carregando corretamente

## 📱 Otimizações

O site está otimizado para:
- Carregamento rápido (< 3 segundos)
- Mobile-first design
- SEO otimizado
- Performance maximizada

## 🔄 Atualizações

Para atualizar o site:
1. Faça commit das mudanças no GitHub
2. Coolify detecta automaticamente e faz o redeploy
3. Aguarde a conclusão (geralmente 2-3 minutos)

## 📞 Suporte

Em caso de problemas, verifique:
- Logs do Coolify
- Console do navegador
- Status do GitHub Actions (se configurado)