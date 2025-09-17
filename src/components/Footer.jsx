import { motion } from 'framer-motion';
import { FiInstagram, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-preto-suave to-black text-white">
      {/* Decorative Top Wave */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12"
        >
          <path
            d="M0,0 C150,60 350,0 600,0 C850,0 1050,60 1200,0 L1200,120 L0,120 Z"
            className="fill-white opacity-10"
          />
        </svg>
      </div>

      <div className="relative z-10 max-container section-padding pt-20 pb-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-3xl font-serif font-bold mb-4">
                Associação <span className="gradient-gold">Rafael Vai Voar</span>
              </h3>
              <p className="text-white/70 leading-relaxed">
                Transformando dor em propósito, lutamos por políticas públicas
                que garantam acesso a tratamentos para doenças raras e dor crônica
                extrema no Brasil.
              </p>
            </motion.div>

            {/* Mission Quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-l-4 border-dourado-suave pl-4 italic text-white/60"
            >
              "Nenhuma dor deveria ser invisível. Nenhum sonho deveria morrer
              por falta de acesso à saúde."
            </motion.blockquote>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold mb-4 text-dourado-suave">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#story"
                  className="text-white/70 hover:text-dourado-suave transition-colors"
                >
                  Nossa História
                </a>
              </li>
              <li>
                <a
                  href="#manifesto"
                  className="text-white/70 hover:text-dourado-suave transition-colors"
                >
                  Manifesto
                </a>
              </li>
              <li>
                <a
                  href="#video"
                  className="text-white/70 hover:text-dourado-suave transition-colors"
                >
                  Depoimento
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/70 hover:text-dourado-suave transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-xl font-semibold mb-4 text-dourado-suave">
              Conecte-se
            </h4>

            {/* Email */}
            <a
              href="mailto:internacional@rafaelvaivoar.org"
              className="flex items-center gap-2 text-white/70 hover:text-dourado-suave transition-colors mb-4"
            >
              <FiMail className="text-lg" />
              <span className="text-sm">internacional@rafaelvaivoar.org</span>
            </a>

            {/* Social Icons */}
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/rafaelvaivoar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <FiInstagram className="text-white text-lg" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/19146093655"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <FaWhatsapp className="text-white text-lg" />
              </motion.a>
              <motion.div
                className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed relative group"
                title="Em breve"
              >
                <FaFacebookF className="text-white text-lg" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Em breve
                </span>
              </motion.div>
              <motion.a
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.youtube.com/@rafaelvaivoar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <FaYoutube className="text-white text-lg" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white/60 text-sm text-center md:text-left"
            >
              <p>
                © {currentYear} Associação Rafael Vai Voar. Todos os direitos reservados.
              </p>
              <p className="mt-1">
                CNPJ: 52.277.434/0001-05
              </p>
              <p className="flex items-center justify-center md:justify-start gap-1 mt-2">
                Feito com <FiHeart className="text-red-500 animate-pulse" /> para transformar vidas
              </p>
            </motion.div>

            {/* Back to Top */}
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <span className="text-white/70 group-hover:text-dourado-suave transition-colors">
                Voltar ao topo
              </span>
              <div className="w-8 h-8 bg-dourado-suave rounded-full flex items-center justify-center group-hover:translate-y-[-2px] transition-transform">
                <FiArrowUp className="text-preto-suave" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Flying Airplane Animation */}
        <motion.div
          animate={{
            x: ['-100px', '100vw'],
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            x: { duration: 30, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 left-0 opacity-20 pointer-events-none"
        >
          ✈️
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;