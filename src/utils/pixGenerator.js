// Gerador de código PIX seguindo padrão EMV BRCODE do Banco Central
// Baseado na documentação oficial do BACEN

/**
 * Calcula CRC16 CCITT conforme especificação do Banco Central
 * Polinômio: 0x1021 (padrão CCITT)
 */
function computeCRC16(payload) {
  const polynomial = 0x1021;
  let result = 0xFFFF;

  for (let i = 0; i < payload.length; i++) {
    result ^= (payload.charCodeAt(i) << 8);

    for (let j = 0; j < 8; j++) {
      if (result & 0x8000) {
        result = (result << 1) ^ polynomial;
      } else {
        result <<= 1;
      }
    }
  }

  return (result & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Formata campo com ID e tamanho (formato TLV - Tag Length Value)
 */
function formatEmvField(id, value) {
  const length = value.length.toString().padStart(2, '0');
  return `${id}${length}${value}`;
}

/**
 * Gera código PIX válido para QR Code estático
 * Segue o padrão EMV BRCODE definido pelo Banco Central
 */
export function generatePixCode(pixKey, merchantName, merchantCity, amount = null) {
  let pixPayload = '';

  // ID 00 - Payload Format Indicator (obrigatório)
  // Sempre "01" indicando formato EMV versão 1
  pixPayload += formatEmvField('00', '01');

  // ID 01 - Point of Initiation Method (opcional para QR estático)
  // Omitido para QR estático (equivale a "11")
  // Se fosse dinâmico seria: pixPayload += formatEmvField('01', '12');

  // ID 26 - Merchant Account Information - PIX (obrigatório)
  // Contém as informações da conta PIX
  let merchantAccount = '';
  // Sub ID 00 - GUI (Globally Unique Identifier) para PIX
  merchantAccount += formatEmvField('00', 'br.gov.bcb.pix');
  // Sub ID 01 - Chave PIX
  merchantAccount += formatEmvField('01', pixKey);
  // Adiciona o campo 26 completo
  pixPayload += formatEmvField('26', merchantAccount);

  // ID 52 - Merchant Category Code (obrigatório)
  // "0000" = não categorizado (padrão para PIX)
  pixPayload += formatEmvField('52', '0000');

  // ID 53 - Transaction Currency (obrigatório)
  // "986" = código ISO para Real Brasileiro (BRL)
  pixPayload += formatEmvField('53', '986');

  // ID 54 - Transaction Amount (opcional)
  // Formato: valor com ponto decimal (ex: "10.00")
  if (amount && amount > 0) {
    pixPayload += formatEmvField('54', amount.toFixed(2));
  }

  // ID 58 - Country Code (obrigatório)
  // "BR" = Brasil
  pixPayload += formatEmvField('58', 'BR');

  // ID 59 - Merchant Name (obrigatório)
  // Nome do recebedor (máx 25 caracteres, sem acentos)
  const cleanName = merchantName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .toUpperCase()
    .substring(0, 25);
  pixPayload += formatEmvField('59', cleanName);

  // ID 60 - Merchant City (obrigatório)
  // Cidade do recebedor (máx 15 caracteres, sem acentos)
  const cleanCity = merchantCity
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .toUpperCase()
    .substring(0, 15);
  pixPayload += formatEmvField('60', cleanCity);

  // ID 62 - Additional Data Field Template (opcional mas recomendado)
  // Sub ID 05 - Reference Label (TXID)
  // "***" indica que não há TXID específico (padrão para QR estático)
  const additionalData = formatEmvField('05', '***');
  pixPayload += formatEmvField('62', additionalData);

  // ID 63 - CRC16 (obrigatório)
  // Adiciona o campo 63 com placeholder de 4 caracteres
  pixPayload += '6304';

  // Calcula o CRC16 de todo o payload incluindo o "6304"
  const crc = computeCRC16(pixPayload);

  // Adiciona o CRC16 calculado ao final
  pixPayload += crc;

  return pixPayload;
}

/**
 * Gera código PIX para a Associação Rafael Vai Voar
 * Chave PIX: rafaelregis95@gmail.com
 */
export function generateRafaelVaiVoarPix(amount = null) {
  return generatePixCode(
    'rafaelregis95@gmail.com',
    'RAFAEL VAI VOAR',
    'SAO PAULO',
    amount
  );
}