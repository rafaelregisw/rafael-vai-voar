// Configuração da API para produção e desenvolvimento
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Detecta automaticamente o ambiente
const API_URL = isDevelopment
  ? 'http://localhost:3001'  // Backend local
  : 'https://api.rafaelvaivoar.com';  // Backend em produção (configurar no Coolify)

console.log(`🔧 API configurada para: ${isDevelopment ? 'DESENVOLVIMENTO' : 'PRODUÇÃO'}`);
console.log(`📡 URL da API: ${API_URL}`);

export default {
  API_URL,
  endpoints: {
    createPreference: `${API_URL}/api/donation/preference`,
    health: `${API_URL}/api/health`,
    paymentStatus: (id) => `${API_URL}/api/donation/status/${id}`
  }
};