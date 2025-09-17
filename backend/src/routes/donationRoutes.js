const express = require('express');
const router = express.Router();
const {
  createPreference,
  getPaymentStatus,
  handleWebhook,
  getPublicKey
} = require('../controllers/donationController');

// Middleware de validação
const validateDonation = (req, res, next) => {
  const { amount, customAmount } = req.body;

  const finalAmount = customAmount || amount;

  if (!finalAmount || isNaN(finalAmount) || finalAmount < 1) {
    return res.status(400).json({
      error: 'Valor de doação inválido. Mínimo: R$ 1,00'
    });
  }

  next();
};

// Rotas
router.post('/preference', validateDonation, createPreference);
router.get('/status/:id', getPaymentStatus);
router.post('/webhook', handleWebhook);
router.get('/public-key', getPublicKey);

// Rota de teste
router.get('/test', (req, res) => {
  res.json({
    message: 'API de doação funcionando!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;