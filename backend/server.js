require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Importar rotas
const donationRoutes = require('./src/routes/donationRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração de CORS
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CORS_ORIGIN.split(',');
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares
app.use(helmet()); // Segurança
app.use(cors(corsOptions)); // CORS
app.use(morgan('dev')); // Logging
app.use(bodyParser.json()); // Parse JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend Rafael Vai Voar funcionando!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Rotas da API
app.use('/api/donation', donationRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({
    message: 'API Rafael Vai Voar - Sistema de Doações',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      createPreference: 'POST /api/donation/preference',
      getStatus: 'GET /api/donation/status/:id',
      webhook: 'POST /api/donation/webhook'
    }
  });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Erro interno do servidor',
      status: err.status || 500,
      timestamp: new Date().toISOString()
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Endpoint não encontrado',
      status: 404,
      path: req.originalUrl
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
    🚀 Backend Rafael Vai Voar
    ✅ Servidor rodando na porta ${PORT}
    📍 URL: http://localhost:${PORT}
    🌍 Ambiente: ${process.env.NODE_ENV}
    💳 Mercado Pago: Configurado
    🔒 CORS: ${process.env.CORS_ORIGIN}
  `);
});