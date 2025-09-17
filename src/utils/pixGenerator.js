// Gerador de código PIX seguindo padrão EMV do Banco Central

/**
 * Calcula CRC16 conforme especificação do Banco Central
 */
function computeCRC16(str) {
  const polynomial = 0x1021;
  let crc = 0xFFFF;

  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;

    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ polynomial;
      } else {
        crc <<= 1;
      }
    }
  }

  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Formata campo com ID e tamanho
 */
function formatField(id, value) {
  const length = value.length.toString().padStart(2, '0');
  return `${id}${length}${value}`;
}

/**
 * Gera código PIX válido para QR Code
 */
export function generatePixCode(pixKey, merchantName, merchantCity, amount = null) {
  let pixCode = '';

  // Payload Format Indicator
  pixCode += formatField('00', '01');

  // Merchant Account Information
  let merchantAccount = '';
  merchantAccount += formatField('00', 'BR.GOV.BCB.PIX');
  merchantAccount += formatField('01', pixKey);

  // Se houver valor, adiciona
  if (amount) {
    merchantAccount += formatField('02', amount.toFixed(2));
  }

  pixCode += formatField('26', merchantAccount);

  // Merchant Category Code (0000 = não categorizado)
  pixCode += formatField('52', '0000');

  // Transaction Currency (986 = BRL)
  pixCode += formatField('53', '986');

  // Transaction Amount (opcional)
  if (amount) {
    pixCode += formatField('54', amount.toFixed(2));
  }

  // Country Code
  pixCode += formatField('58', 'BR');

  // Merchant Name
  pixCode += formatField('59', merchantName.substring(0, 25));

  // Merchant City
  pixCode += formatField('60', merchantCity.substring(0, 15));

  // CRC16 placeholder
  pixCode += '6304';

  // Calculate and append CRC16
  const crc = computeCRC16(pixCode);
  pixCode += crc;

  return pixCode;
}

// Gera código PIX para a Associação Rafael Vai Voar
export function generateRafaelVaiVoarPix() {
  return generatePixCode(
    'rafaelregis95@gmail.com',
    'RAFAEL VAI VOAR',
    'SAO PAULO'
  );
}