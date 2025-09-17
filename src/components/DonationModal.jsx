import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCopy, FiCheckCircle, FiSmartphone } from 'react-icons/fi';
import { QRCodeCanvas } from 'qrcode.react';
import { generateRafaelVaiVoarPix } from '../utils/pixGenerator';

const DonationModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const pixKey = 'rafaelregis95@gmail.com';

  // Gera código PIX válido seguindo padrão EMV do Banco Central
  const pixCode = generateRafaelVaiVoarPix();

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
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
              <div className="flex justify-between items-start mb-6">
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

              {/* Instrução PIX */}
              <div className="bg-gradient-to-br from-dourado-suave/20 to-yellow-300/10 border border-dourado-suave/30 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <FiSmartphone className="text-dourado-suave text-2xl" />
                  <h3 className="text-xl font-bold text-dourado-suave">Faça uma doação via PIX</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Escaneie o QR Code abaixo com o app do seu banco ou use a chave PIX
                </p>
              </div>

              {/* Container do QR Code e Chave PIX */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* QR Code */}
                <div className="flex flex-col items-center">
                  <div className="bg-white p-6 rounded-2xl shadow-2xl mb-4">
                    <QRCodeCanvas
                      value={pixCode}
                      size={200}
                      level="H"
                      includeMargin={false}
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      imageSettings={{
                        src: "",
                        excavate: false,
                        width: 0,
                        height: 0
                      }}
                    />
                  </div>
                  <p className="text-white/60 text-sm">Escaneie para doar</p>
                </div>

                {/* Chave PIX */}
                <div className="flex flex-col justify-center space-y-4">
                  <div>
                    <h4 className="text-white/60 text-sm mb-2">Ou use nossa chave PIX (E-mail):</h4>
                    <div className="bg-white/10 border border-white/20 rounded-xl p-4">
                      <p className="text-white font-mono text-sm md:text-base break-all mb-3">
                        {pixKey}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopyPix}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-dourado-suave text-preto-suave rounded-lg font-semibold transition-all hover:bg-yellow-300"
                      >
                        {copied ? (
                          <>
                            <FiCheckCircle className="text-lg" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <FiCopy className="text-lg" />
                            Copiar chave PIX
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Info adicional */}
                  <div className="bg-azul-horizonte/20 border border-azul-horizonte/30 rounded-lg p-3">
                    <p className="text-azul-ceu text-xs">
                      💡 Dica: Você pode doar qualquer valor. Toda contribuição faz a diferença!
                    </p>
                  </div>
                </div>
              </div>

              {/* Como doar */}
              <div className="border-t border-white/10 pt-6">
                <h4 className="text-white font-semibold mb-3">Como doar:</h4>
                <div className="space-y-2 text-white/70 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-dourado-suave">1.</span>
                    <p>Abra o app do seu banco ou carteira digital</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-dourado-suave">2.</span>
                    <p>Escolha a opção PIX e selecione "Ler QR Code" ou "Chave PIX"</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-dourado-suave">3.</span>
                    <p>Escaneie o código ou cole a chave PIX</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-dourado-suave">4.</span>
                    <p>Digite o valor que deseja doar e confirme</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-white/40 text-xs">
                  Associação Rafael Vai Voar • CNPJ: 52.277.434/0001-05
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;