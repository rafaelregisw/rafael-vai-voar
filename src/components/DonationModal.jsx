import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCopy, FiCheckCircle, FiSmartphone } from 'react-icons/fi';
import { QRCodeCanvas } from 'qrcode.react';
import { Trans, useTranslation } from 'react-i18next';
import { generateRafaelVaiVoarPix } from '../utils/pixGenerator';

const DonationModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
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
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <Motion.div
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
                    <Trans i18nKey="donationModal.title" components={[<span key="0" className="text-dourado-suave" />]} />
                  </h2>
                  <p className="text-white/80">
                    {t('donationModal.subtitle')}
                  </p>
                </div>
                <Motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <FiX className="text-2xl" />
                </Motion.button>
              </div>

              {/* Instrução PIX */}
              <div className="bg-gradient-to-br from-dourado-suave/20 to-yellow-300/10 border border-dourado-suave/30 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <FiSmartphone className="text-dourado-suave text-2xl" />
                  <h3 className="text-xl font-bold text-dourado-suave">{t('donationModal.pix.title')}</h3>
                </div>
                <p className="text-white/80 text-sm">
                  {t('donationModal.pix.description')}
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
                  <p className="text-white/60 text-sm">{t('donationModal.pix.scanToDonate')}</p>
                </div>

                {/* Chave PIX */}
                <div className="flex flex-col justify-center space-y-4">
                  <div>
                    <h4 className="text-white/60 text-sm mb-2">{t('donationModal.pix.keyLabel')}</h4>
                    <div className="bg-white/10 border border-white/20 rounded-xl p-4">
                      <p className="text-white font-mono text-sm md:text-base break-all mb-3">
                        {pixKey}
                      </p>
                      <Motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopyPix}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-dourado-suave text-preto-suave rounded-lg font-semibold transition-all hover:bg-yellow-300"
                      >
                        {copied ? (
                          <>
                            <FiCheckCircle className="text-lg" />
                            {t('donationModal.pix.copied')}
                          </>
                        ) : (
                          <>
                            <FiCopy className="text-lg" />
                            {t('donationModal.pix.copyButton')}
                          </>
                        )}
                      </Motion.button>
                    </div>
                  </div>

                  {/* Info adicional */}
                  <div className="bg-azul-horizonte/20 border border-azul-horizonte/30 rounded-lg p-3">
                    <p className="text-azul-ceu text-xs">
                      {t('donationModal.tip')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Como doar */}
              <div className="border-t border-white/10 pt-6">
                <h4 className="text-white font-semibold mb-3">{t('donationModal.howTo.title')}</h4>
                <div className="space-y-2 text-white/70 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-dourado-suave">1.</span>
                    <p>{t('donationModal.howTo.steps.1')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-dourado-suave">2.</span>
                    <p>{t('donationModal.howTo.steps.2')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-dourado-suave">3.</span>
                    <p>{t('donationModal.howTo.steps.3')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-dourado-suave">4.</span>
                    <p>{t('donationModal.howTo.steps.4')}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-white/40 text-xs">
                  {t('donationModal.footer')}
                </p>
              </div>
            </div>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;
