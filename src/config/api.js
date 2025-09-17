// Configuração da API para produção e desenvolvimento
const API_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:3001'
    : 'https://api.rafaelvaivoar.com'
  );

export default {
  API_URL,
  endpoints: {
    createPreference: `${API_URL}/api/donation/preference`,
    health: `${API_URL}/api/health`,
    paymentStatus: (id) => `${API_URL}/api/donation/status/${id}`
  }
};