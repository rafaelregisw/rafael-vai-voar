# Dockerfile para o Backend (API do Mercado Pago)
FROM node:20-alpine

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código da aplicação
COPY . .

# Expor porta do servidor
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["node", "server.js"]