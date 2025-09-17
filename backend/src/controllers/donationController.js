const { preference, publicKey } = require('../config/mercadopago');

// Criar preferência de pagamento
const createPreference = async (req, res) => {
  try {
    const { amount, customAmount, donorInfo } = req.body;

    // Validar valor da doação
    const finalAmount = customAmount || amount;
    if (!finalAmount || finalAmount < 1) {
      return res.status(400).json({
        error: 'Valor de doação inválido'
      });
    }

    // Configurar preferência do Mercado Pago
    const preferenceData = {
      items: [
        {
          title: 'Doação - Rafael Vai Voar',
          description: 'Apoie o Rafael em sua jornada. Sua doação transforma vidas!',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(finalAmount)
        }
      ],
      payer: donorInfo ? {
        name: donorInfo.name || '',
        email: donorInfo.email || '',
        phone: {
          area_code: donorInfo.phone?.area_code || '',
          number: donorInfo.phone?.number || ''
        }
      } : {},
      back_urls: {
        success: 'https://rafaelvaivoar.com',
        failure: 'https://rafaelvaivoar.com',
        pending: 'https://rafaelvaivoar.com'
      },
      auto_return: 'approved',
      statement_descriptor: 'RAFAEL VAI VOAR',
      external_reference: `donation_${Date.now()}`,
      notification_url: `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/donation/webhook`,
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
    };

    // Criar preferência no Mercado Pago
    const response = await preference.create({ body: preferenceData });

    console.log('✅ Preferência criada:', {
      id: response.id,
      amount: finalAmount,
      external_reference: preferenceData.external_reference
    });

    // Retornar dados para o frontend
    res.json({
      id: response.id,
      init_point: response.init_point, // URL de checkout
      sandbox_init_point: response.sandbox_init_point, // URL de teste
      public_key: publicKey,
      external_reference: preferenceData.external_reference
    });

  } catch (error) {
    console.error('❌ Erro ao criar preferência:', error);
    res.status(500).json({
      error: 'Erro ao processar doação',
      message: error.message
    });
  }
};

// Obter status de pagamento
const getPaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: 'ID de pagamento não fornecido'
      });
    }

    // Aqui você poderia buscar o status no banco de dados
    // ou fazer uma chamada à API do Mercado Pago
    res.json({
      id,
      status: 'pending',
      message: 'Verificação de status implementada'
    });

  } catch (error) {
    console.error('❌ Erro ao buscar status:', error);
    res.status(500).json({
      error: 'Erro ao buscar status do pagamento'
    });
  }
};

// Webhook para notificações do Mercado Pago
const handleWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    console.log('📨 Webhook recebido:', {
      type,
      dataId: data?.id,
      timestamp: new Date().toISOString()
    });

    // Processar diferentes tipos de notificação
    switch (type) {
      case 'payment':
        console.log('💳 Notificação de pagamento recebida');
        // Aqui você processaria o pagamento
        // Atualizar banco de dados, enviar email, etc.
        break;

      case 'plan':
        console.log('📋 Notificação de plano recebida');
        break;

      case 'subscription':
        console.log('🔄 Notificação de assinatura recebida');
        break;

      default:
        console.log('❓ Tipo de notificação desconhecido:', type);
    }

    // Responder ao Mercado Pago que recebemos a notificação
    res.status(200).send('OK');

  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    res.status(500).json({
      error: 'Erro ao processar webhook'
    });
  }
};

// Obter chave pública (para o frontend)
const getPublicKey = (req, res) => {
  res.json({
    public_key: publicKey
  });
};

module.exports = {
  createPreference,
  getPaymentStatus,
  handleWebhook,
  getPublicKey
};