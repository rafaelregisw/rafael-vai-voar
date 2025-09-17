// Configuração da API para desenvolvimento e produção
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// URLs do backend
const API_URL = isDevelopment
  ? 'http://localhost:3001'  // Backend local
  : 'https://api.rafaelvaivoar.com';  // Backend em produção

console.log(`
  🔧 API configurada
  📍 Ambiente: ${isDevelopment ? 'DESENVOLVIMENTO' : 'PRODUÇÃO'}
  🌐 URL da API: ${API_URL}
`);

// Configuração de endpoints
const endpoints = {
  // Doações
  createPreference: `${API_URL}/api/donation/preference`,
  paymentStatus: (id) => `${API_URL}/api/donation/status/${id}`,
  publicKey: `${API_URL}/api/donation/public-key`,

  // Health check
  health: `${API_URL}/api/health`,

  // Webhook (usado pelo Mercado Pago)
  webhook: `${API_URL}/api/donation/webhook`
};

// Função auxiliar para fazer requisições
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export default {
  API_URL,
  endpoints,
  apiRequest
};