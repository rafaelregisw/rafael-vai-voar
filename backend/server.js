const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

const app = express();

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || 'APP_USR-1230480412109407-091620-105352a4ea9446416246dbfca790a366-147800488',
});

// Middleware de segurança
app.use(helmet());

// Configurar CORS - Permitir múltiplas origens
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:3000',
      'https://rafaelvaivoar.com',
      'https://www.rafaelvaivoar.com'
    ];

    // Permitir requisições sem origin (ex: Postman, curl) ou de origens permitidas
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Origin bloqueada:', origin);
      callback(null, true); // Temporariamente permitir todas para debug
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

    console.log('Criando preferência para doação de R$', donationAmount);

    // Criar preferência no Mercado Pago
    const preference = new Preference(client);

    const preferenceData = {
      items: [
        {
          id: 'donation-rafael-vai-voar',
          title: 'Doação - Associação Rafael Vai Voar',
          description: 'Sua doação ajuda a transformar vidas e lutar por políticas públicas de saúde',
          picture_url: 'https://rafaelvaivoar.com/LogoRafael.png',
          category_id: 'donations',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: Number(donationAmount)
        }
      ],
      payer: {
        name: '',
        email: ''
      },
      back_urls: {
        success: 'http://localhost:5173/donation-success',
        failure: 'http://localhost:5173/donation-failure',
        pending: 'http://localhost:5173/donation-pending'
      },
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

    console.log('Preferência criada:', response.id);

    res.json({
      id: response.id,
      init_point: response.init_point, // URL para redirecionar o usuário
      sandbox_init_point: response.sandbox_init_point, // URL para testes
      public_key: process.env.MP_PUBLIC_KEY || 'APP_USR-ec8612da-00ba-452f-b55a-f9cb8ca4c5f9'
    });

  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({
      error: 'Erro ao processar doação. Por favor, tente novamente.',
      details: error.message
    });
  }
});

// Endpoint para verificar status de pagamento
app.get('/api/donation/status/:paymentId', async (req, res) => {
  try {
    res.json({
      message: 'Endpoint para verificação de status - implementação futura'
    });
  } catch (error) {
    console.error('Erro ao verificar status:', error);
    res.status(500).json({ error: 'Erro ao verificar status do pagamento' });
  }
});

// Webhook para notificações do Mercado Pago
app.post('/api/webhook/mercadopago', (req, res) => {
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