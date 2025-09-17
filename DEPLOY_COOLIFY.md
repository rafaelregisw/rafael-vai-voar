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

### 2. Variáveis de Ambiente

No Coolify, configure as seguintes variáveis de ambiente:

```env
# Frontend
NODE_ENV=production
VITE_API_URL=https://api.rafaelvaivoar.com

# Backend - Mercado Pago (PRODUÇÃO)
MP_ACCESS_TOKEN=APP_USR-1230480412109407-091620-105352a4ea9446416246dbfca790a366-147800488
MP_PUBLIC_KEY=APP_USR-ec8612da-00ba-452f-8e9e-15f50f6f6e9f
MP_CLIENT_ID=1230480412109407
MP_CLIENT_SECRET=s6Fheg4CV0Rf9ieeKF9OvYpwTxUUfk2V

# URLs
FRONTEND_URL=https://rafaelvaivoar.com
SUCCESS_URL=https://rafaelvaivoar.com/#donation-success
FAILURE_URL=https://rafaelvaivoar.com/#donation-failure
PENDING_URL=https://rafaelvaivoar.com/#donation-pending
```

### 3. Configurar Domínios

No Coolify, configure:
- Frontend: `rafaelvaivoar.com` → porta 80
- Backend: `api.rafaelvaivoar.com` → porta 3001

### 4. Deploy

1. Faça push das alterações para o GitHub:
```bash
git add .
git commit -m "Configuração para deploy no Coolify"
git push origin main
```

2. No Coolify, clique em "Deploy"
3. Aguarde o build e deploy automático

## 🔍 Verificação

### Frontend
- Acesse: `https://rafaelvaivoar.com`
- Deve exibir a landing page

### Backend
- Acesse: `https://api.rafaelvaivoar.com/api/health`
- Deve retornar: `{"status":"OK","message":"Servidor funcionando corretamente"}`

## 📦 Estrutura do Projeto

```
rafael-vai-voar/
├── src/                  # Frontend React
├── backend/              # Backend Express + Mercado Pago
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml    # Configuração Docker
├── Dockerfile           # Frontend Dockerfile
└── package.json         # Frontend dependencies
```

## ⚠️ IMPORTANTE

1. **NÃO commitar o arquivo `.env`** - Use variáveis do Coolify
2. **Certificar que o `.gitignore` inclui:**
   - `.env`
   - `backend/.env`
   - `node_modules`
   - `dist`

3. **Após o deploy, configurar SSL/HTTPS** no Coolify

## 🆘 Troubleshooting

### Erro de CORS
- Verificar se `api.rafaelvaivoar.com` está nas origens permitidas no backend

### Erro de Network
- Verificar se as variáveis de ambiente estão corretas
- Confirmar que o backend está rodando na porta 3001

### Mercado Pago não funciona
- Verificar credenciais (usar PRODUÇÃO, não TESTE)
- Confirmar URLs de callback

## 📞 Suporte

Em caso de problemas, verificar:
1. Logs do Coolify
2. Health check: `https://api.rafaelvaivoar.com/api/health`
3. Console do navegador para erros de frontend