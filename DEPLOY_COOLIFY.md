# 🚀 Deploy no Coolify - Rafael Vai Voar (Frontend + Backend)

## 📋 Pré-requisitos

1. Coolify instalado e configurado
2. GitHub repository: `https://github.com/rafaelregisw/rafael-vai-voar`
3. Domínios configurados:
   - Frontend: `rafaelvaivoar.com`
   - Backend: `api.rafaelvaivoar.com`

## 🏗️ Arquitetura

```
rafaelvaivoar.com (Frontend React)
    ↓
api.rafaelvaivoar.com (Backend Node.js)
    ↓
Mercado Pago API
```

## 🔧 Configuração no Coolify

### 1. Criar Novo Projeto

1. Acesse o Coolify
2. Clique em "New Project"
3. Escolha "Docker Compose"
4. Conecte ao GitHub repository

### 2. Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no Coolify:

```env
# === BACKEND ===
NODE_ENV=production
PORT=3001

# Mercado Pago - Credenciais de PRODUÇÃO
MP_ACCESS_TOKEN=APP_USR-1230480412109407-091620-105352a4ea9446416246dbfca790a366-147800488
MP_PUBLIC_KEY=APP_USR-ec8612da-00ba-452f-8e9e-15f50f6f6e9f
MP_CLIENT_ID=1230480412109407
MP_CLIENT_SECRET=s6Fheg4CV0Rf9ieeKF9OvYpwTxUUfk2V

# URLs de Callback
FRONTEND_URL=https://rafaelvaivoar.com
SUCCESS_URL=https://rafaelvaivoar.com/donation-success
FAILURE_URL=https://rafaelvaivoar.com/donation-failure
PENDING_URL=https://rafaelvaivoar.com/donation-pending

# Configuração de CORS
CORS_ORIGIN=https://rafaelvaivoar.com
```

### 3. Configurar Domínios

No Coolify, configure os domínios:

#### Frontend
- Domain: `rafaelvaivoar.com`
- Service: `frontend`
- Port: 80
- HTTPS: Ativar SSL automático

#### Backend
- Domain: `api.rafaelvaivoar.com`
- Service: `backend`
- Port: 3001
- HTTPS: Ativar SSL automático

### 4. Deploy

1. Faça push das alterações para o GitHub:
```bash
git add .
git commit -m "feat: Backend com integração Mercado Pago"
git push origin main
```

2. No Coolify, clique em "Deploy"
3. Aguarde o build e deploy automático
4. Verificar logs para garantir que ambos serviços iniciaram

## 🔍 Verificação

### Frontend
```bash
# Deve carregar o site
curl https://rafaelvaivoar.com
```

### Backend
```bash
# Health check
curl https://api.rafaelvaivoar.com/api/health

# Resposta esperada:
{
  "status": "OK",
  "message": "Backend Rafael Vai Voar funcionando!",
  "environment": "production"
}
```

### Teste de Doação
```bash
# Criar preferência de teste
curl -X POST https://api.rafaelvaivoar.com/api/donation/preference \
  -H "Content-Type: application/json" \
  -d '{"amount": 10}'
```

## 📦 Estrutura do Projeto

```
rafael-vai-voar/
├── src/                  # Frontend React
│   ├── components/       # Componentes
│   ├── config/          # Configuração da API
│   └── main.jsx         # Entry point
├── backend/             # Backend Node.js
│   ├── src/
│   │   ├── config/      # Configuração Mercado Pago
│   │   ├── controllers/ # Lógica de negócio
│   │   └── routes/      # Endpoints da API
│   ├── server.js        # Servidor Express
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml   # Orquestração dos serviços
└── package.json        # Frontend dependencies
```

## ⚙️ Endpoints da API

### Doação
- `POST /api/donation/preference` - Criar preferência de pagamento
- `GET /api/donation/status/:id` - Verificar status do pagamento
- `POST /api/donation/webhook` - Webhook do Mercado Pago
- `GET /api/donation/public-key` - Obter chave pública

### Health
- `GET /api/health` - Health check

## 🐳 Docker Compose

O projeto usa Docker Compose para orquestrar:

1. **Frontend**: Nginx servindo build do React
2. **Backend**: Node.js com Express e Mercado Pago SDK

## ⚠️ IMPORTANTE

### Segurança
1. **NUNCA** commitar arquivos `.env` com credenciais
2. Usar sempre HTTPS em produção
3. Validar todos os inputs no backend
4. Configurar rate limiting se necessário

### Mercado Pago
1. Usar credenciais de **PRODUÇÃO** (não teste)
2. Configurar webhook URL corretamente
3. Verificar logs de pagamento regularmente

### Monitoramento
1. Acompanhar health checks
2. Verificar logs de erro
3. Monitorar taxa de conversão

## 🆘 Troubleshooting

### Erro de CORS
```javascript
// Verificar no backend/server.js
CORS_ORIGIN=https://rafaelvaivoar.com
```

### Erro 502 Bad Gateway
- Verificar se o backend está rodando: `/api/health`
- Conferir logs do container backend

### Mercado Pago não redireciona
- Verificar `init_point` no response
- Confirmar credenciais de produção
- Testar com valores acima de R$ 1,00

### Container reiniciando
- Verificar logs: `docker logs backend`
- Conferir variáveis de ambiente
- Validar health check

## 🔄 Atualizações

Para atualizar o deploy:

1. Fazer alterações localmente
2. Testar com `docker-compose up` local
3. Commitar e push para GitHub
4. Coolify fará deploy automático

## 📊 Monitoramento

### Logs
```bash
# Frontend
docker logs frontend

# Backend
docker logs backend
```

### Métricas
- Taxa de conversão de doação
- Tempo de resposta da API
- Uptime dos serviços

## 📞 Suporte

Em caso de problemas:
1. Verificar status: `https://api.rafaelvaivoar.com/api/health`
2. Conferir logs no Coolify
3. Validar configuração do Mercado Pago
4. Testar localmente com `docker-compose up`

---

**Última atualização**: 16/09/2025
**Status**: ✅ Pronto para Deploy
**Autor**: Rafael Vai Voar Team