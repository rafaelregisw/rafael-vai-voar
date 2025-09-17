import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHeart, FiGift, FiDollarSign, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import apiConfig from '../config/api';

const DonationModal = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Valores predefinidos de doação
  const predefinedAmounts = [
    { value: 10, label: 'R$ 10', description: 'Café com esperança' },
    { value: 25, label: 'R$ 25', description: 'Combustível para voar' },
    { value: 50, label: 'R$ 50', description: 'Asas para sonhar' },
    { value: 100, label: 'R$ 100', description: 'Transforme uma vida' },
    { value: 250, label: 'R$ 250', description: 'Seja um anjo' },
  ];

  // Reset do estado quando o modal fecha
  useEffect(() => {
    if (!isOpen) {
      setSelectedAmount(null);
      setCustomAmount('');
      setShowCustomInput(false);
      setError(null);
    }
  }, [isOpen]);

  const handleDonation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const amount = showCustomInput ? parseFloat(customAmount) : selectedAmount;

      // Validação
      if (!amount || amount < 1) {
        throw new Error('Por favor, escolha um valor válido');
      }

      // Fazer requisição ao backend
      const response = await apiConfig.apiRequest(apiConfig.endpoints.createPreference, {
        method: 'POST',
        body: JSON.stringify({
          amount,
          customAmount: showCustomInput ? amount : null
        })
      });

      // Redirecionar para o checkout do Mercado Pago
      if (response.init_point) {
        window.location.href = response.init_point;
      } else {
        throw new Error('Erro ao criar link de pagamento');
      }
    } catch (err) {
      console.error('Erro na doação:', err);
      setError(err.response?.data?.error || err.message || 'Erro ao processar doação. Tente novamente.');
      setIsLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="glass-dark backdrop-blur-xl rounded-3xl p-8 md:p-10 max-w-2xl w-full pointer-events-auto border border-dourado-suave/30 shadow-2xl">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                    Apoie o <span className="text-dourado-suave">Movimento</span>
                  </h2>
                  <p className="text-white/80">
                    Sua doação transforma vidas e luta por políticas públicas
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <FiX className="text-2xl" />
                </motion.button>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center gap-3"
                >
                  <FiAlertCircle className="text-red-500 text-xl flex-shrink-0" />
                  <p className="text-red-200">{error}</p>
                </motion.div>
              )}

              {/* Predefined Amounts */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {predefinedAmounts.map((amount) => (
                  <motion.button
                    key={amount.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedAmount(amount.value);
                      setShowCustomInput(false);
                      setCustomAmount('');
                    }}
                    className={`relative p-4 rounded-xl transition-all ${
                      selectedAmount === amount.value && !showCustomInput
                        ? 'bg-gradient-to-br from-dourado-suave to-yellow-300 text-preto-suave shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                  >
                    <div className="text-xl font-bold mb-1">{amount.label}</div>
                    <div className="text-xs opacity-80">{amount.description}</div>
                    {selectedAmount === amount.value && !showCustomInput && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                      >
                        <FiCheckCircle className="text-white text-sm" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}

                {/* Custom Amount Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowCustomInput(!showCustomInput);
                    setSelectedAmount(null);
                  }}
                  className={`relative p-4 rounded-xl transition-all ${
                    showCustomInput
                      ? 'bg-gradient-to-br from-azul-horizonte to-azul-ceu text-white shadow-lg'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <div className="text-xl font-bold mb-1">Outro</div>
                  <div className="text-xs opacity-80">Escolha o valor</div>
                </motion.button>
              </div>

              {/* Custom Amount Input */}
              <AnimatePresence>
                {showCustomInput && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 overflow-hidden"
                  >
                    <div className="relative">
                      <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dourado-suave text-xl" />
                      <input
                        type="number"
                        placeholder="Digite o valor da doação"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        min="1"
                        max="100000"
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-dourado-suave transition-colors"
                      />
                    </div>
                    <p className="text-white/60 text-sm mt-2">
                      Digite um valor entre R$ 1 e R$ 100.000
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-6 py-4 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all"
                >
                  Cancelar
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDonation}
                  disabled={!selectedAmount && !customAmount || isLoading}
                  className={`flex-1 px-6 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
                    (!selectedAmount && !customAmount) || isLoading
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-dourado-suave to-yellow-300 text-preto-suave shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-preto-suave border-t-transparent rounded-full"
                      />
                      Processando...
                    </>
                  ) : (
                    <>
                      <FiHeart className="text-xl" />
                      Doar {selectedAmount ? formatCurrency(selectedAmount) : customAmount ? formatCurrency(customAmount) : ''}
                    </>
                  )}
                </motion.button>
              </div>

              {/* Footer Info */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-6 text-white/60 text-sm">
                  <div className="flex items-center gap-2">
                    <FiGift className="text-dourado-suave" />
                    <span>100% seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://www.mercadopago.com/org-img/MP3/home/logomp3.gif"
                      alt="Mercado Pago"
                      className="h-4"
                    />
                    <span>Powered by Mercado Pago</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;