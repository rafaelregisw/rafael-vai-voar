const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

const app = express();

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

// Middleware de segurança
app.use(helmet());

// Configurar CORS - Permitir múltiplas portas em desenvolvimento
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:3000',
      process.env.FRONTEND_URL
    ];

    // Permitir requisições sem origin (ex: Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// Parse JSON
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limita cada IP a 100 requisições por janela
  message: 'Muitas requisições deste IP, tente novamente em 15 minutos'
});

app.use('/api/', limiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando corretamente' });
});

// Endpoint para criar preferência de pagamento
app.post('/api/donation/preference', async (req, res) => {
  try {
    const { amount, customAmount } = req.body;

    // Validação básica
    const donationAmount = customAmount || amount;
    if (!donationAmount || donationAmount < 1 || donationAmount > 100000) {
      return res.status(400).json({
        error: 'Valor inválido. Por favor, escolha um valor entre R$ 1 e R$ 100.000'
      });
    }

    // Criar preferência no Mercado Pago
    const preference = new Preference(client);

    const preferenceData = {
      items: [
        {
          id: 'donation-rafael-vai-voar',
          title: 'Doação - Associação Rafael Vai Voar',
          description: 'Sua doação ajuda a transformar vidas e lutar por políticas públicas de saúde',
          picture_url: 'https://rafaelvaivoar.org.br/LogoRafael.png',
          category_id: 'donations',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: Number(donationAmount)
        }
      ],
      payer: {
        name: '',
        email: '',
        identification: {
          type: '',
          number: ''
        }
      },
      back_urls: {
        success: process.env.SUCCESS_URL || 'http://localhost:5175/donation-success',
        failure: process.env.FAILURE_URL || 'http://localhost:5175/donation-failure',
        pending: process.env.PENDING_URL || 'http://localhost:5175/donation-pending'
      },
      // auto_return removido temporariamente para evitar erro
      payment_methods: {
        excluded_payment_types: [],
        excluded_payment_methods: [],
        installments: 12 // Permitir até 12 parcelas
      },
      statement_descriptor: 'RAFAEL VAI VOAR',
      external_reference: `donation_${Date.now()}`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Expira em 24h
    };

    const response = await preference.create({ body: preferenceData });

    res.json({
      id: response.id,
      init_point: response.init_point, // URL para redirecionar o usuário
      sandbox_init_point: response.sandbox_init_point, // URL para testes
      public_key: process.env.MP_PUBLIC_KEY
    });

  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({
      error: 'Erro ao processar doação. Por favor, tente novamente.'
    });
  }
});

// Endpoint para verificar status de pagamento (opcional - para uso futuro)
app.get('/api/donation/status/:paymentId', async (req, res) => {
  try {
    // Implementar verificação de status quando necessário
    res.json({
      message: 'Endpoint para verificação de status - implementação futura'
    });
  } catch (error) {
    console.error('Erro ao verificar status:', error);
    res.status(500).json({ error: 'Erro ao verificar status do pagamento' });
  }
});

// Webhook para notificações do Mercado Pago (opcional - para uso futuro)
app.post('/api/webhook/mercadopago', (req, res) => {
  // Processar notificações do Mercado Pago quando implementado
  console.log('Webhook recebido:', req.body);
  res.status(200).send();
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💳 Mercado Pago configurado e pronto!`);
  console.log(`🔐 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});