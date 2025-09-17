const { MercadoPagoConfig, Preference } = require('mercadopago');

// Configurar cliente do Mercado Pago com as credenciais
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: {
    timeout: 5000,
    idempotencyKey: 'rafael-vai-voar'
  }
});

// Criar instância da Preference
const preference = new Preference(client);

// Validar configuração
const validateConfig = () => {
  if (!process.env.MP_ACCESS_TOKEN) {
    throw new Error('MP_ACCESS_TOKEN não configurado');
  }
  if (!process.env.MP_PUBLIC_KEY) {
    throw new Error('MP_PUBLIC_KEY não configurado');
  }
  console.log('✅ Mercado Pago configurado com sucesso');
};

// Executar validação ao importar
validateConfig();

module.exports = {
  client,
  preference,
  publicKey: process.env.MP_PUBLIC_KEY
};